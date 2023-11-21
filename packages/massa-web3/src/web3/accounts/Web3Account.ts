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

export class Web3Account extends BaseClient implements IBaseAccount {
  private account: IAccount;
  private publicApiClient: IPublicApiClient;
  constructor(account: IAccount, publicApiClient: IPublicApiClient) {
    super(publicApiClient.clientConfig);
    this.account = account;
    this.publicApiClient = publicApiClient;
  }

  /**
   * Verifies the integrity of account details including public key and address.
   * @throws Throws an error if the public key or address does not match the submitted account details.
   */
  public async verify(): Promise<void> {
    try {
      // Create the secret key object
      const secretKeyBase58Encoded: string = this.account.secretKey;
      const secretKey: SecretKey = new SecretKey(secretKeyBase58Encoded);

      // Get the public key object from the secret key
      const publicKey: PublicKey = await secretKey.getPublicKey();

      // Validate the public key
      if (
        this.account.publicKey &&
        this.account.publicKey !== publicKey.base58Encode
      ) {
        throw new Error(
          'Public key does not correspond to the private key submitted',
        );
      }

      // Get the account's address
      const address: Address = Address.fromPublicKey(publicKey);

      // Validate the account address
      if (
        this.account.address &&
        this.account.address !== address.base58Encode
      ) {
        throw new Error(
          'Account address does not correspond to the submitted address',
        );
      }
    } catch (error) {
      throw new Error(`Failed to verify account: ${error.message}`);
    }
  }

  public async sign(data: Buffer | Uint8Array | string): Promise<ISignature> {
    // check private keys to sign the message with.
    if (!this.account.secretKey) {
      throw new Error('No private key to sign the message with');
    }

    // check public key to verify the message with.
    if (!this.account.publicKey) {
      throw new Error('No public key to verify the signed message with');
    }

    if (data instanceof Uint8Array) {
      data = Buffer.from(data);
    }
    if (typeof data === 'string') {
      data = Buffer.from(data, 'utf-8');
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
      publicKey: this.account.publicKey,
      base58Encoded: base58Encoded,
    };
  }

  /**
   * Retrieves the address associated with the account.
   * @returns The account address.
   * @throws Throws an error if the account address is not available.
   */
  public address(): string {
    try {
      if (!this.account || !this.account.address) {
        throw new Error('No account or no address available');
      }
      return this.account.address;
    } catch (error) {
      throw new Error(`Failed to retrieve account address: ${error.message}`);
    }
  }

  /**
   * Initiates the selling of rolls based on provided transaction data.
   * @param txData - The transaction data for the roll sale.
   * @returns The ID of the initiated buy operation.
   * @throws Throws an error if the sell operation fails.
   */
  public async sellRolls(txData: IRollsData): Promise<string> {
    if (!this.account || !this.account.publicKey) {
      throw new Error(`Invalid account or no public key available`);
    }

    // Ensure txData is provided and valid
    if (!txData) {
      throw new Error(`Invalid transaction data provided`);
    }

    try {
      // Get next period info
      const nodeStatusInfo: INodeStatus =
        await this.publicApiClient.getNodeStatus();
      const expiryPeriod: number =
        nodeStatusInfo.next_slot.period + this.clientConfig.periodOffset;

      // Compact bytes for operation
      const bytesCompact: Buffer = this.compactBytesForOperation(
        txData,
        OperationTypeId.RollSell,
        expiryPeriod,
      );

      // Sign payload
      const publicKeyBytes = getBytesPublicKey(this.account.publicKey);
      const signature: ISignature = await this.sign(
        Buffer.concat([publicKeyBytes, bytesCompact]),
      );

      // Prepare data for operation
      const data = {
        serialized_content: Array.from(bytesCompact), // Use Array.from for conversion
        creator_public_key: this.account.publicKey,
        signature: signature.base58Encoded,
      };

      // Send operation request
      const opIds: Array<string> = await this.sendJsonRPCRequest(
        JSON_RPC_REQUEST_METHOD.SEND_OPERATIONS,
        [[data]],
      );

      if (opIds.length === 0) {
        throw new Error(`Failed to retrieve operation ID`);
      }

      return opIds[0]; // Return the first operation ID
    } catch (error) {
      throw new Error(`Failed to sell rolls: ${error.message}`);
    }
  }

  /**
   * Initiates a request to buy rolls.
   * @param txData - The transaction data for buying rolls.
   * @returns The ID of the initiated buy operation.
   * @throws Throws an error if the buy operation fails.
   */
  public async buyRolls(txData: IRollsData): Promise<string> {
    try {
      // Get next period info
      const nodeStatusInfo: INodeStatus =
        await this.publicApiClient.getNodeStatus();
      const expiryPeriod: number =
        nodeStatusInfo.next_slot.period + this.clientConfig.periodOffset;

      // Compact bytes for the buy operation
      const bytesCompact: Buffer = this.compactBytesForOperation(
        txData,
        OperationTypeId.RollBuy,
        expiryPeriod,
      );

      // Sign the payload
      const publicKeyBytes = getBytesPublicKey(this.account.publicKey);
      const signature: ISignature = await this.sign(
        Buffer.concat([publicKeyBytes, bytesCompact]),
      );

      // Prepare data for the buy operation
      const data = {
        serialized_content: Array.from(bytesCompact), // Use Array.from for conversion
        creator_public_key: this.account.publicKey,
        signature: signature.base58Encoded,
      };

      // Send operation request
      const opIds: Array<string> = await this.sendJsonRPCRequest(
        JSON_RPC_REQUEST_METHOD.SEND_OPERATIONS,
        [[data]],
      );

      if (opIds.length === 0) {
        throw new Error(`Failed to retrieve operation ID`);
      }

      return opIds[0]; // Return the ID of the initiated buy operation
    } catch (error) {
      throw new Error(`Failed to initiate buy operation: ${error.message}`);
    }
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
