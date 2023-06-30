/**
 * This file includes the implementation for the {@link SmartContractsClient} class. This class provides methods for interacting with smart contracts
 * in the Massa blockchain. Such methods include {@link SmartContractsClient#deploySmartContract|deploying}, {@link SmartContractsClient#callSmartContract|calling},
 * and {@link SmartContractsClient#readSmartContract|reading} smart contracts, as well as retrieving smart contract {@link SmartContractsClient#getFilteredScOutputEvents|events}
 * and {@link SmartContractsClient#getContractBalance|balances}.
 *
 * @module SmartContractsClient
 */
import { EOperationStatus } from '../interfaces/EOperationStatus';
import { IAccount } from '../interfaces/IAccount';
import { IAddressInfo } from '../interfaces/IAddressInfo';
import { IBalance } from '../interfaces/IBalance';
import { ICallData } from '../interfaces/ICallData';
import { IClientConfig } from '../interfaces/IClientConfig';
import { IContractData } from '../interfaces/IContractData';
import { IContractReadOperationData } from '../interfaces/IContractReadOperationData';
import { IContractReadOperationResponse } from '../interfaces/IContractReadOperationResponse';
import { IEvent } from '../interfaces/IEvent';
import { IEventFilter } from '../interfaces/IEventFilter';
import { IExecuteReadOnlyData } from '../interfaces/IExecuteReadOnlyData';
import { IExecuteReadOnlyResponse } from '../interfaces/IExecuteReadOnlyResponse';
import { INodeStatus } from '../interfaces/INodeStatus';
import { IOperationData } from '../interfaces/IOperationData';
import { IReadData } from '../interfaces/IReadData';
import { ISignature } from '../interfaces/ISignature';
import { ISmartContractsClient } from '../interfaces/ISmartContractsClient';
import { JSON_RPC_REQUEST_METHOD } from '../interfaces/JsonRpcMethods';
import { OperationTypeId } from '../interfaces/OperationTypes';
import { MassaProtoFile } from '../interfaces/MassaProtoFile';
import { fromMAS } from '../utils/converters';
import { trySafeExecute } from '../utils/retryExecuteFunction';
import { wait } from '../utils/time';
import { strToBytes } from '../utils/serializers/strings';
import { bytesArrayToString } from '../utils/uint8ArrayToString';
import { BaseClient } from './BaseClient';
import { PublicApiClient } from './PublicApiClient';
import { WalletClient } from './WalletClient';
import { getBytesPublicKey } from '../utils/bytes';
import { writeFileSync } from 'fs';
import path from 'path';

const MAX_READ_BLOCK_GAS = BigInt(4_294_967_295);
const TX_POLL_INTERVAL_MS = 10000;
const TX_STATUS_CHECK_RETRY_COUNT = 100;

/**
 * The key name (as a string) to look for when we are retrieving the proto file from a contract
 */
const MASSA_PROTOFILE_KEY = 'protoMassa';
/**
 * The separator used to split the proto file content into separate proto files
 */
const protoFileSeparator = '|||||';
/**
 * Smart Contracts Client object enables smart contract deployment, calls and streaming of events.
 */
export class SmartContractsClient
  extends BaseClient
  implements ISmartContractsClient
{
  /**
   * Constructor for {@link SmartContractsClient} objects.
   */
  public constructor(
    clientConfig: IClientConfig,
    private readonly publicApiClient: PublicApiClient,
    private readonly walletClient: WalletClient,
  ) {
    super(clientConfig);

    // bind class methods
    this.deploySmartContract = this.deploySmartContract.bind(this);
    this.getFilteredScOutputEvents = this.getFilteredScOutputEvents.bind(this);
    this.executeReadOnlySmartContract =
      this.executeReadOnlySmartContract.bind(this);
    this.awaitRequiredOperationStatus =
      this.awaitRequiredOperationStatus.bind(this);
    this.getOperationStatus = this.getOperationStatus.bind(this);
    this.callSmartContract = this.callSmartContract.bind(this);
    this.readSmartContract = this.readSmartContract.bind(this);
    this.getContractBalance = this.getContractBalance.bind(this);
  }

  /**
   * Deploy a smart contract on th massa blockchain by creating and sending
   * an operation containing byte code.
   *
   * @remarks
   * If no executor is provided, the default wallet account from the provided {@link WalletClient}
   * will be used.
   *
   * @param contractData - The deployment contract data.
   * @param executor - The account to use for the deployment.
   *
   * @returns A promise that resolves to the operation ID of the deployment operation.
   */
  public async deploySmartContract(
    contractData: IContractData,
    executor?: IAccount,
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

    // check sender account
    const sender: IAccount = executor || this.walletClient.getBaseAccount();
    if (!sender) {
      throw new Error(`No tx sender available`);
    }

    // bytes compaction
    const bytesCompact: Buffer = this.compactBytesForOperation(
      contractData,
      OperationTypeId.ExecuteSC,
      expiryPeriod,
    );

    // sign payload
    const bytesPublicKey: Uint8Array = getBytesPublicKey(sender.publicKey);
    const signature: ISignature = await WalletClient.walletSignMessage(
      Buffer.concat([bytesPublicKey, bytesCompact]),
      sender,
    );

    const data = {
      serialized_content: Array.prototype.slice.call(bytesCompact),
      creator_public_key: sender.publicKey,
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

  /**
   * Calls a smart contract method.
   *
   * @remarks
   * If no executor is provided, the default wallet account will be used.
   *
   * @param callData -  The data required for the smart contract call.
   * @param executor - The account that will execute the call (default: the default
   * wallet account from {@link WalletClient}).
   *
   * @returns A promise that resolves to the operation ID of the call operation as a string.
   */
  public async callSmartContract(
    callData: ICallData,
    executor?: IAccount,
  ): Promise<string> {
    // get next period info
    const nodeStatusInfo: INodeStatus =
      await this.publicApiClient.getNodeStatus();
    const expiryPeriod: number =
      nodeStatusInfo.next_slot.period + this.clientConfig.periodOffset;

    // check sender account
    const sender = executor || this.walletClient.getBaseAccount();
    if (!sender) {
      throw new Error(`No tx sender available`);
    }

    // bytes compaction
    const bytesCompact: Buffer = this.compactBytesForOperation(
      callData,
      OperationTypeId.CallSC,
      expiryPeriod,
    );

    // sign payload
    const bytesPublicKey: Uint8Array = getBytesPublicKey(sender.publicKey);
    const signature: ISignature = await WalletClient.walletSignMessage(
      Buffer.concat([bytesPublicKey, bytesCompact]),
      sender,
    );
    // request data
    const data = {
      serialized_content: Array.prototype.slice.call(bytesCompact),
      creator_public_key: sender.publicKey,
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

  /**
   * Execute a dry run Smart contract call and returns some data regarding its execution
   * such as the changes of in the states that would have happen if the transaction was really executed on chain.
   *
   * @param readData - The data required for the a read operation of a smart contract.
   *
   * @returns A promise that resolves to an object which represents the result of the operation and contains data about its execution.
   */
  public async readSmartContract(
    readData: IReadData,
  ): Promise<IContractReadOperationResponse> {
    // check the max. allowed gas
    if (readData.maxGas > MAX_READ_BLOCK_GAS) {
      throw new Error(
        `The gas submitted ${readData.maxGas.toString()} exceeds the max. allowed block gas of ${MAX_READ_BLOCK_GAS.toString()}`,
      );
    }

    // request data
    let baseAccountSignerAddress: string | null = null;
    if (this.walletClient.getBaseAccount()) {
      baseAccountSignerAddress = this.walletClient.getBaseAccount().address;
    }
    const data = {
      max_gas: Number(readData.maxGas),
      target_address: readData.targetAddress,
      target_function: readData.targetFunction,
      parameter: readData.parameter,
      caller_address: readData.callerAddress || baseAccountSignerAddress,
    };
    // returns operation ids
    const jsonRpcRequestMethod = JSON_RPC_REQUEST_METHOD.EXECUTE_READ_ONLY_CALL;
    let jsonRpcCallResult: Array<IContractReadOperationData> = [];
    if (this.clientConfig.retryStrategyOn) {
      jsonRpcCallResult = await trySafeExecute<
        Array<IContractReadOperationData>
      >(this.sendJsonRPCRequest, [jsonRpcRequestMethod, [[data]]]);
    } else {
      jsonRpcCallResult = await this.sendJsonRPCRequest(jsonRpcRequestMethod, [
        [data],
      ]);
    }

    if (jsonRpcCallResult.length <= 0) {
      throw new Error(
        `Read operation bad response. No results array in json rpc response. Inspect smart contract`,
      );
    }
    if (jsonRpcCallResult[0].result.Error) {
      throw new Error(jsonRpcCallResult[0].result.Error);
    }
    return {
      returnValue: jsonRpcCallResult[0].result.Ok as Uint8Array,
      info: jsonRpcCallResult[0] as IContractReadOperationData,
    } as IContractReadOperationResponse;
  }

  /**
   * Returns the balance of the smart contract.
   *
   * @param address - The address of the smart contract.
   *
   * @returns A promise that resolves to the balance of the smart contract.
   */
  public async getContractBalance(address: string): Promise<IBalance | null> {
    const addresses: Array<IAddressInfo> =
      await this.publicApiClient.getAddresses([address]);
    if (addresses.length === 0) return null;
    const addressInfo: IAddressInfo = addresses.at(0);
    return {
      candidate: fromMAS(addressInfo.candidate_balance),
      final: fromMAS(addressInfo.final_balance),
    } as IBalance;
  }

  /**
   * Get filtered smart contract output events.
   *
   * @param eventFilterData - The filter data for the events.
   *
   * @returns A promise that resolves to an array of IEvent objects containing the filtered events.
   */
  public async getFilteredScOutputEvents(
    eventFilterData: IEventFilter,
  ): Promise<Array<IEvent>> {
    const data = {
      start: eventFilterData.start,
      end: eventFilterData.end,
      emitter_address: eventFilterData.emitter_address,
      original_caller_address: eventFilterData.original_caller_address,
      original_operation_id: eventFilterData.original_operation_id,
      is_final: eventFilterData.is_final,
    };

    const jsonRpcRequestMethod =
      JSON_RPC_REQUEST_METHOD.GET_FILTERED_SC_OUTPUT_EVENT;

    // returns filtered events
    if (this.clientConfig.retryStrategyOn) {
      return await trySafeExecute<Array<IEvent>>(this.sendJsonRPCRequest, [
        jsonRpcRequestMethod,
        [data],
      ]);
    } else {
      return await this.sendJsonRPCRequest<Array<IEvent>>(
        jsonRpcRequestMethod,
        [data],
      );
    }
  }

  /**
   * Send a read-only smart contract execution request.
   *
   * @remarks
   * This method is used to dry-run a smart contract execution and get the changes of the states that would
   * have happen if the transaction was really executed on chain.
   * This operation does not modify the blockchain state.
   *
   * @param contractData - The data required for the operation.
   *
   * @returns A promise which resolves to an object containing data about the operation.
   *
   * @throws
   * - If the contract binary data is missing.
   * - If the contract contract address is missing.
   * - If the result is empty.
   * - If the result contains an error.
   */
  public async executeReadOnlySmartContract(
    contractData: IContractData,
  ): Promise<IExecuteReadOnlyResponse> {
    if (!contractData.contractDataBinary) {
      throw new Error(
        `Expected non-null contract bytecode, but received null.`,
      );
    }

    if (!contractData.address) {
      throw new Error(`Expected contract address, but received null.`);
    }

    const data = {
      max_gas: Number(contractData.maxGas),
      bytecode: Array.from(contractData.contractDataBinary),
      address: contractData.address,
    };

    let jsonRpcCallResult: Array<IExecuteReadOnlyData> = [];
    const jsonRpcRequestMethod =
      JSON_RPC_REQUEST_METHOD.EXECUTE_READ_ONLY_BYTECODE;
    if (this.clientConfig.retryStrategyOn) {
      jsonRpcCallResult = await trySafeExecute<Array<IExecuteReadOnlyData>>(
        this.sendJsonRPCRequest,
        [jsonRpcRequestMethod, [[data]]],
      );
    } else {
      jsonRpcCallResult = await this.sendJsonRPCRequest<
        Array<IExecuteReadOnlyData>
      >(jsonRpcRequestMethod, [[data]]);
    }

    if (jsonRpcCallResult.length <= 0) {
      throw new Error(
        `Read operation bad response. No results array in json rpc response. Inspect smart contract`,
      );
    }
    if (jsonRpcCallResult[0].result.Error) {
      throw new Error('Execute read-only smart contract error', {
        cause: jsonRpcCallResult[0].result.Error,
      });
    }
    return {
      returnValue: jsonRpcCallResult[0].result.Ok as Uint8Array,
      info: jsonRpcCallResult[0] as IExecuteReadOnlyData,
    } as IExecuteReadOnlyResponse;
  }

  /**
   * Get the status of a specific operation.
   *
   * @param opId - The operation id.
   *
   * @returns A promise that resolves to the status of the operation.
   */
  public async getOperationStatus(opId: string): Promise<EOperationStatus> {
    const operationData: Array<IOperationData> =
      await this.publicApiClient.getOperations([opId]);
    if (!operationData || operationData.length === 0)
      return EOperationStatus.NOT_FOUND;
    const opData = operationData[0];
    if (opData.is_operation_final) {
      return EOperationStatus.FINAL;
    }
    if (opData.in_blocks.length > 0) {
      return EOperationStatus.INCLUDED_PENDING;
    }
    if (opData.in_pool) {
      return EOperationStatus.AWAITING_INCLUSION;
    }

    return EOperationStatus.INCONSISTENT;
  }

  /**
   * Get the status of a specific operation and wait until it reaches the required status.
   *
   * @param opId - The required operation id.
   * @param requiredStatus - The required status.
   *
   * @returns A promise that resolves to the status of the operation.
   */
  public async awaitRequiredOperationStatus(
    opId: string,
    requiredStatus: EOperationStatus,
  ): Promise<EOperationStatus> {
    let errCounter = 0;
    let pendingCounter = 0;
    while (true) {
      let status = EOperationStatus.NOT_FOUND;
      try {
        status = await this.getOperationStatus(opId);
      } catch (ex) {
        if (++errCounter > 100) {
          const msg = `Failed to retrieve the tx status after 100 failed attempts for operation id: ${opId}.`;
          console.error(msg, ex);
          throw ex;
        }

        await wait(TX_POLL_INTERVAL_MS);
      }

      if (status == requiredStatus) {
        return status;
      }

      if (++pendingCounter > 1000) {
        const msg = `Getting the tx status for operation Id ${opId} took too long to conclude. We gave up after ${
          TX_POLL_INTERVAL_MS * TX_STATUS_CHECK_RETRY_COUNT
        }ms.`;
        console.warn(msg);
        throw new Error(msg);
      }

      await wait(TX_POLL_INTERVAL_MS);
    }
  }

  /**
   * Get the proto file of the contracts from the Massa Blockchain.
   *
   * @param contractAddresses - An array of contract addresses (as strings)
   *
   * @returns A promise that resolves to the array of IProtoFiles corresponding
   * to the proto file associated with each contract or the values are null if the file is unavailable.
   */
  public async getProtoFiles(
    contractAddresses: string[],
    outputDirectory: string,
  ): Promise<MassaProtoFile[]> {
    // prepare request body
    const requestProtoFiles: object[] = [];
    for (let address of contractAddresses) {
      requestProtoFiles.push({
        address: address,
        key: Array.from(strToBytes(MASSA_PROTOFILE_KEY)),
      });
    }
    const body = {
      jsonrpc: '2.0',
      method: 'get_datastore_entries',
      params: [requestProtoFiles],
      id: 1,
    };

    // send request
    let response = null;
    try {
      response = await fetch(this.clientConfig.providers[0].url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      // parse response
      const json = await response.json();

      if (!json.result[0].final_value) {
        throw new Error('No proto file found');
      }

      const retrievedProtoFiles = bytesArrayToString(
        json.result[0].final_value,
      ); // converting the Uint8Array to string
      // splitting all the proto functions to make separate proto file for each functions
      const protos = retrievedProtoFiles.split(protoFileSeparator);

      let protoFiles: MassaProtoFile[] = [];

      for (let protoContent of protos) {
        // remove all the text before the first appearance of the 'syntax' keyword
        protoContent = protoContent.substring(protoContent.indexOf('syntax'));

        // get the function name from the proto file
        const functionName = protoContent
          .substring(
            protoContent.indexOf('message '),
            protoContent.indexOf('Helper'),
          )
          .replace('message ', '')
          .trim();
        // save the proto file
        const filepath = path.join(outputDirectory, functionName + '.proto');
        writeFileSync(filepath, protoContent);
        const extractedProto: MassaProtoFile = {
          data: protoContent,
          filePath: filepath,
          protoFuncName: functionName,
        };
        protoFiles.push(extractedProto);
      }
      return protoFiles;
    } catch (ex) {
      const msg = `Failed to retrieve the proto files.`;
      console.error(msg, ex);
      throw ex;
    }
  }
}
