import { IAccount } from '../../interfaces/IAccount';
import { IBaseAccount } from '../../interfaces/IBaseAccount';
import { INodeStatus } from '../../interfaces/INodeStatus';
import { IPublicApiClient } from '../../interfaces/IPublicApiClient';
import { IRollsData } from '../../interfaces/IRollsData';
import { ISignature } from '../../interfaces/ISignature';
import { base58Encode, hashBlake3, varintEncode } from '../../utils/Xbqcrypto';
import { Address, PublicKey, SecretKey } from '../../utils/keyAndAddresses';
import * as ed from '@noble/ed25519';
import { BaseClient } from '../BaseClient';
import { OperationTypeId } from '../../interfaces/OperationTypes';
import { getBytesPublicKey } from '../../utils/bytes';
import { JSON_RPC_REQUEST_METHOD } from '../../interfaces/JsonRpcMethods';
import { ICallData } from '../../interfaces/ICallData';
import { IContractData } from '../../interfaces/IContractData';
import { trySafeExecute } from '../../utils/retryExecuteFunction';

export const MAX_READ_BLOCK_GAS = BigInt(4_294_967_295);

export class Web3Account extends BaseClient implements IBaseAccount {
  private account: IAccount;
  private publicApiClient: IPublicApiClient;
  constructor(account: IAccount, publicApiClient: IPublicApiClient) {
    super(publicApiClient.clientConfig);
    this.account = account;
    this.publicApiClient = publicApiClient;
  }

  public async verify(): Promise<void> {
    // Create the secret key object
    const secretKeyBase58Encoded: string = this.account.secretKey;
    const secretKey: SecretKey = new SecretKey(secretKeyBase58Encoded);

    // create the public key object
    const publicKey: PublicKey = await secretKey.getPublicKey();
    if (
      this.account.publicKey &&
      this.account.publicKey !== publicKey.base58Encode
    ) {
      throw new Error(
        'Public key does not correspond the the private key submitted',
      );
    }

    // get wallet account address
    const address: Address = new Address(publicKey);
    if (this.account.address && this.account.address !== address.base58Encode) {
      throw new Error(
        'Account address not correspond the the address submitted',
      );
    }
  }

  public async sign(data: Buffer): Promise<ISignature> {
    // check private keys to sign the message with.
    if (!this.account.secretKey) {
      throw new Error('No private key to sign the message with');
    }

    // check public key to verify the message with.
    if (!this.account.publicKey) {
      throw new Error('No public key to verify the signed message with');
    }

    // get private key
    const secretKey: SecretKey = new SecretKey(this.account.secretKey);

    // bytes compaction
    const bytesCompact: Buffer = Buffer.from(data);
    // Hash byte compact
    const messageHashDigest: Uint8Array = hashBlake3(bytesCompact);

    // sign the digest
    const sig = await secretKey.signDigest(messageHashDigest);

    // check sig length
    if (sig.length != 64) {
      throw new Error(
        `Invalid signature length. Expected 64, got ${sig.length}`,
      );
    }

    // verify signature
    if (this.account.publicKey) {
      const publicKey: PublicKey = await secretKey.getPublicKey();

      const isVerified = await ed.verify(
        sig,
        messageHashDigest,
        publicKey.bytes,
      );

      if (!isVerified) {
        throw new Error(
          `Signature could not be verified with public key. Please inspect`,
        );
      }
    }

    // convert signature to base58
    const version = Buffer.from(varintEncode(secretKey.version));
    const base58Encoded = base58Encode(Buffer.concat([version, sig]));

    return {
      base58Encoded,
    } as ISignature;
  }

  public address(): string {
    return this.account.address;
  }

  public async sellRolls(txData: IRollsData): Promise<string> {
    if (!this.account) {
      throw new Error(`No tx sender available`);
    }

    // get next period info
    const nodeStatusInfo: INodeStatus =
      await this.publicApiClient.getNodeStatus();
    const expiryPeriod: number =
      nodeStatusInfo.next_slot.period + this.clientConfig.periodOffset;

    // bytes compaction
    const bytesCompact: Buffer = this.compactBytesForOperation(
      txData,
      OperationTypeId.RollSell,
      expiryPeriod,
    );

    // sign payload
    const signature: ISignature = await this.sign(
      Buffer.concat([getBytesPublicKey(this.account.publicKey), bytesCompact]),
    );

    const data = {
      serialized_content: Array.prototype.slice.call(bytesCompact),
      creator_public_key: this.account.publicKey,
      signature: signature.base58Encoded,
    };
    // returns operation ids
    const opIds: Array<string> = await this.sendJsonRPCRequest(
      JSON_RPC_REQUEST_METHOD.SEND_OPERATIONS,
      [[data]],
    );
    return opIds[0];
  }

  public async buyRolls(txData: IRollsData): Promise<string> {
    // get next period info
    const nodeStatusInfo: INodeStatus =
      await this.publicApiClient.getNodeStatus();
    const expiryPeriod: number =
      nodeStatusInfo.next_slot.period + this.clientConfig.periodOffset;

    // bytes compaction
    const bytesCompact: Buffer = this.compactBytesForOperation(
      txData,
      OperationTypeId.RollBuy,
      expiryPeriod,
    );

    // sign payload
    const signature: ISignature = await this.sign(
      Buffer.concat([getBytesPublicKey(this.account.publicKey), bytesCompact]),
    );

    const data = {
      serialized_content: Array.prototype.slice.call(bytesCompact),
      creator_public_key: this.account.publicKey,
      signature: signature.base58Encoded,
    };
    // returns operation ids
    const opIds: Array<string> = await this.sendJsonRPCRequest(
      JSON_RPC_REQUEST_METHOD.SEND_OPERATIONS,
      [[data]],
    );
    return opIds[0];
  }

  public async sendTransaction(txData: IRollsData): Promise<string> {
    // get next period info
    const nodeStatusInfo: INodeStatus =
      await this.publicApiClient.getNodeStatus();
    const expiryPeriod: number =
      nodeStatusInfo.next_slot.period + this.clientConfig.periodOffset;

    // bytes compaction
    const bytesCompact: Buffer = this.compactBytesForOperation(
      txData,
      OperationTypeId.Transaction,
      expiryPeriod,
    );

    // sign payload
    const bytesPublicKey: Uint8Array = getBytesPublicKey(
      this.account.publicKey,
    );
    const signature: ISignature = await this.sign(
      Buffer.concat([bytesPublicKey, bytesCompact]),
    );

    // prepare tx data
    const data = {
      serialized_content: Array.prototype.slice.call(bytesCompact),
      creator_public_key: this.account.publicKey,
      signature: signature.base58Encoded,
    };
    // returns operation ids
    const opIds: Array<string> = await this.sendJsonRPCRequest(
      JSON_RPC_REQUEST_METHOD.SEND_OPERATIONS,
      [[data]],
    );
    return opIds[0];
  }

  public async callSmartContract(callData: ICallData): Promise<string> {
    let serializedParam: number[]; // serialized parameter
    if (callData.parameter instanceof Array) {
      serializedParam = callData.parameter;
    } else {
      serializedParam = callData.parameter.serialize();
    }
    const call: ICallData = {
      fee: callData.fee,
      maxGas: callData.maxGas,
      coins: callData.coins,
      targetAddress: callData.targetAddress,
      functionName: callData.functionName,
      parameter: serializedParam,
    };
    // get next period info
    const nodeStatusInfo: INodeStatus =
      await this.publicApiClient.getNodeStatus();
    const expiryPeriod: number =
      nodeStatusInfo.next_slot.period + this.clientConfig.periodOffset;

    // bytes compaction
    const bytesCompact: Buffer = this.compactBytesForOperation(
      call,
      OperationTypeId.CallSC,
      expiryPeriod,
    );

    // sign payload
    const bytesPublicKey: Uint8Array = getBytesPublicKey(
      this.account.publicKey,
    );
    const signature: ISignature = await this.sign(
      Buffer.concat([bytesPublicKey, bytesCompact]),
    );
    // request data
    const data = {
      serialized_content: Array.prototype.slice.call(bytesCompact),
      creator_public_key: this.account.publicKey,
      signature: signature.base58Encoded,
    };
    // returns operation ids
    let opIds: Array<string> = [];
    const jsonRpcRequestMethod = JSON_RPC_REQUEST_METHOD.SEND_OPERATIONS;
    if (this.clientConfig.retryStrategyOn) {
      opIds = await trySafeExecute<Array<string>>(this.sendJsonRPCRequest, [
        jsonRpcRequestMethod,
        [[data]],
      ]);
    } else {
      opIds = await this.sendJsonRPCRequest(jsonRpcRequestMethod, [[data]]);
    }
    if (opIds.length <= 0) {
      throw new Error(
        `Call smart contract operation bad response. No results array in json rpc response. Inspect smart contract`,
      );
    }
    return opIds[0];
  }

  public async deploySmartContract(
    contractData: IContractData,
  ): Promise<string> {
    // get next period info
    const nodeStatusInfo: INodeStatus =
      await this.publicApiClient.getNodeStatus();
    const expiryPeriod: number =
      nodeStatusInfo.next_slot.period + this.clientConfig.periodOffset;

    // Check if SC data exists
    if (!contractData.contractDataBinary) {
      throw new Error(
        `Expected non-null contract bytecode, but received null.`,
      );
    }

    // get the block size
    if (
      contractData.contractDataBinary.length >
      nodeStatusInfo.config.max_block_size / 2
    ) {
      console.warn(
        'bytecode size exceeded half of the maximum size of a block, operation will certainly be rejected',
      );
    }

    // bytes compaction
    const bytesCompact: Buffer = this.compactBytesForOperation(
      contractData,
      OperationTypeId.ExecuteSC,
      expiryPeriod,
    );

    // sign payload
    const bytesPublicKey: Uint8Array = getBytesPublicKey(
      this.account.publicKey,
    );
    const signature: ISignature = await this.sign(
      Buffer.concat([bytesPublicKey, bytesCompact]),
    );

    const data = {
      serialized_content: Array.prototype.slice.call(bytesCompact),
      creator_public_key: this.account.publicKey,
      signature: signature.base58Encoded,
    };
    // returns operation ids
    const opIds: Array<string> = await this.sendJsonRPCRequest(
      JSON_RPC_REQUEST_METHOD.SEND_OPERATIONS,
      [[data]],
    );
    if (opIds.length <= 0) {
      throw new Error(
        `Deploy smart contract operation bad response. No results array in json rpc response. Inspect smart contract`,
      );
    }
    return opIds[0];
  }
}
