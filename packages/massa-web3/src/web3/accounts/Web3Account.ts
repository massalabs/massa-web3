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

function getOperationBufferToSign(
  chainId: bigint,
  bytesPublicKey: Uint8Array,
  bytesCompact: Buffer,
): Buffer {
  // Chain id is an 64-bit unsigned integer, convert to byte array (big endian)
  const chainIdBuffer = new ArrayBuffer(8);
  const view = new DataView(chainIdBuffer);
  view.setBigUint64(0, chainId, false);

  return Buffer.concat([
    Buffer.from(chainIdBuffer),
    bytesPublicKey,
    bytesCompact,
  ]);
}

export class Web3Account extends BaseClient implements IBaseAccount {
  private account: IAccount;
  private publicApiClient: IPublicApiClient;
  private chainId: bigint;

  constructor(
    account: IAccount,
    publicApiClient: IPublicApiClient,
    chainId: bigint,
  ) {
    super(publicApiClient.clientConfig);
    this.account = account;
    this.publicApiClient = publicApiClient;
    this.chainId = chainId;
  }

  /**
   * Executes a blockchain operation
   *
   * @param txData - The transaction data for the operation.
   * @param operationType - The type of operation to be executed.
   * @param useRetry - Determines whether to use retry logic in case of failures.
   * @param errorMessage - Custom error message to throw if operation fails.
   * @param preExecutionCallback - An optional callback function to be executed before the operation, for any pre-execution logic or validation.
   * @returns Returns a promise that resolves to the operation ID.
   */
  private async executeOperation(
    txData: IRollsData | ICallData | IContractData,
    operationType: OperationTypeId,
    useRetry: boolean = false,
    errorMessage: string = 'Operation did not return a valid response',
    preExecutionCallback?: (
      data: IRollsData | ICallData | IContractData,
    ) => Promise<void>,
  ): Promise<string> {
    // Run pre-execution logic if provided
    if (preExecutionCallback) {
      await preExecutionCallback(txData);
    }

    const nodeStatusInfo: INodeStatus =
      await this.publicApiClient.getNodeStatus();

    const expiryPeriod: number =
      nodeStatusInfo.next_slot.period + this.clientConfig.periodOffset;

    const bytesCompact: Buffer = this.compactBytesForOperation(
      txData,
      operationType,
      expiryPeriod,
    );

    const signature: ISignature = await this.sign(
      getOperationBufferToSign(
        this.chainId,
        getBytesPublicKey(this.account.publicKey),
        bytesCompact,
      ),
    );

    const data = {
      serialized_content: Array.prototype.slice.call(bytesCompact),
      creator_public_key: this.account.publicKey,
      signature: signature.base58Encoded,
    };

    let opIds: Array<string>;
    const jsonRpcRequestMethod = JSON_RPC_REQUEST_METHOD.SEND_OPERATIONS;

    if (useRetry) {
      opIds = await trySafeExecute<Array<string>>(this.sendJsonRPCRequest, [
        jsonRpcRequestMethod,
        [[data]],
      ]);
    } else {
      opIds = await this.sendJsonRPCRequest(jsonRpcRequestMethod, [[data]]);
    }

    if (opIds.length <= 0) throw new Error(errorMessage);

    return opIds[0];
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
    const address: Address = Address.fromPublicKey(publicKey);
    if (this.account.address && this.account.address !== address.base58Encode) {
      throw new Error(
        'Account address not correspond the the address submitted',
      );
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

  public address(): string {
    return this.account.address;
  }

  public async sellRolls(txData: IRollsData): Promise<string> {
    return this.executeOperation(txData, OperationTypeId.RollSell);
  }
  public async buyRolls(txData: IRollsData): Promise<string> {
    return this.executeOperation(txData, OperationTypeId.RollBuy);
  }

  public async sendTransaction(txData: IRollsData): Promise<string> {
    return this.executeOperation(txData, OperationTypeId.Transaction);
  }

  public async callSmartContract(callData: ICallData): Promise<string> {
    return this.executeOperation(
      callData,
      OperationTypeId.CallSC,
      this.clientConfig.retryStrategyOn,
      'Call smart contract operation bad response. No results array in json rpc response. Inspect smart contract',
    );
  }

  public async deploySmartContract(
    contractData: IContractData,
  ): Promise<string> {
    const preExecutionLogic = async (data: IContractData) => {
      // Check if SC data exists
      if (!data.contractDataBinary) {
        throw new Error(
          'Expected non-null contract bytecode, but received null.',
        );
      }

      // Get the block size
      const nodeStatusInfo: INodeStatus =
        await this.publicApiClient.getNodeStatus();
      if (
        data.contractDataBinary.length >
        nodeStatusInfo.config.max_block_size / 2
      ) {
        console.warn(
          'Bytecode size exceeded half of the maximum size of a block, operation will certainly be rejected',
        );
      }
    };

    return this.executeOperation(
      contractData,
      OperationTypeId.ExecuteSC,
      false,
      'Deploy smart contract operation bad response. No results array in json rpc response. Inspect smart contract',
      preExecutionLogic,
    );
  }
}
