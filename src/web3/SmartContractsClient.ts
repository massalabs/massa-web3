/**
 * This file includes the implementation for the {@link SmartContractsClient} class. This class provides methods for interacting with smart contracts
 * in the Massa blockchain. Such methods include {@link SmartContractsClient#deploySmartContract|deploying}, {@link SmartContractsClient#callSmartContract|calling},
 * and {@link SmartContractsClient#readSmartContract|reading} smart contracts, as well as retrieving smart contract {@link SmartContractsClient#getFilteredScOutputEvents|events}
 * and {@link SmartContractsClient#getContractBalance|balances}.
 *
 * @module SmartContractsClient
 */
import { EOperationStatus } from '../interfaces/EOperationStatus';
import { Account } from '../interfaces/Account';
import { AddressInfo } from '../interfaces/AddressInfo';
import { Balance } from '../interfaces/Balance';
import { CallData } from '../interfaces/CallData';
import { ClientConfig } from '../interfaces/ClientConfig';
import { ContractData } from '../interfaces/ContractData';
import { ContractReadOperationData } from '../interfaces/ContractReadOperationData';
import { ContractReadOperationResponse } from '../interfaces/ContractReadOperationResponse';
import { Event } from '../interfaces/Event';
import { EventFilter } from '../interfaces/EventFilter';
import { ExecuteReadOnlyData } from '../interfaces/ExecuteReadOnlyData';
import { ExecuteReadOnlyResponse } from '../interfaces/ExecuteReadOnlyResponse';
import { NodeStatus } from '../interfaces/NodeStatus';
import { OperationData } from '../interfaces/OperationData';
import { ReadData } from '../interfaces/ReadData';
import { Signature } from '../interfaces/Signature';
import { SmartContractsClient as ISmartContractsClient } from '../interfaces/SmartContractsClient';
import { JSON_RPC_REQUEST_METHOD } from '../interfaces/JsonRpcMethods';
import { OperationTypeId } from '../interfaces/OperationTypes';
import { MassaProtoFile } from '../interfaces/MassaProtoFile';
import { fromMAS } from '../utils/converters';
import { trySafeExecute } from '../utils/retryExecuteFunction';
import { wait } from '../utils/time';
import { strToBytes } from '../utils/serializers/strings';
import { BaseClient } from './BaseClient';
import { PublicApiClient } from './PublicApiClient';
import { WalletClient } from './WalletClient';
import { WalletClient as IWalletClient } from '../interfaces/WalletClient';
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
    clientConfig: ClientConfig,
    private readonly publicApiClient: PublicApiClient,
    private readonly walletClient: IWalletClient,
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
   * @returns A promise that resolves to the operation D of the deployment operation.
   */
  public async deploySmartContract(
    contractData: ContractData,
    executor?: Account,
  ): Promise<string> {
    // get next period info
    const nodeStatusInfo: NodeStatus =
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
    const sender: Account = executor || this.walletClient.getBaseAccount();
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
    const signature: Signature = await WalletClient.walletSignMessage(
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
   * @returns A promise that resolves to the operation D of the call operation as a string.
   */
  public async callSmartContract(
    callData: CallData,
    executor?: Account,
  ): Promise<string> {
    // get next period info
    const nodeStatusInfo: NodeStatus =
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
    const signature: Signature = await WalletClient.walletSignMessage(
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
    readData: ReadData,
  ): Promise<ContractReadOperationResponse> {
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
    let jsonRpcCallResult: Array<ContractReadOperationData> = [];
    if (this.clientConfig.retryStrategyOn) {
      jsonRpcCallResult = await trySafeExecute<
        Array<ContractReadOperationData>
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
      info: jsonRpcCallResult[0],
    } as ContractReadOperationResponse;
  }

  /**
   * Returns the balance of the smart contract.
   *
   * @param address - The address of the smart contract.
   *
   * @returns A promise that resolves to the balance of the smart contract.
   */
  public async getContractBalance(address: string): Promise<Balance | null> {
    const addresses: Array<AddressInfo> =
      await this.publicApiClient.getAddresses([address]);
    if (addresses.length === 0) return null;
    const addressInfo: AddressInfo = addresses.at(0);
    return {
      candidate: fromMAS(addressInfo.candidate_balance),
      final: fromMAS(addressInfo.final_balance),
    } as Balance;
  }

  /**
   * Get filtered smart contract output events.
   *
   * @param eventFilterData - The filter data for the events.
   *
   * @returns A promise that resolves to an array of Event objects containing the filtered events.
   */
  public async getFilteredScOutputEvents(
    eventFilterData: EventFilter,
  ): Promise<Array<Event>> {
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
      return await trySafeExecute<Array<Event>>(this.sendJsonRPCRequest, [
        jsonRpcRequestMethod,
        [data],
      ]);
    } else {
      return await this.sendJsonRPCRequest<Array<Event>>(jsonRpcRequestMethod, [
        data,
      ]);
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
    contractData: ContractData,
  ): Promise<ExecuteReadOnlyResponse> {
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

    let jsonRpcCallResult: Array<ExecuteReadOnlyData> = [];
    const jsonRpcRequestMethod =
      JSON_RPC_REQUEST_METHOD.EXECUTE_READ_ONLY_BYTECODE;
    if (this.clientConfig.retryStrategyOn) {
      jsonRpcCallResult = await trySafeExecute<Array<ExecuteReadOnlyData>>(
        this.sendJsonRPCRequest,
        [jsonRpcRequestMethod, [[data]]],
      );
    } else {
      jsonRpcCallResult = await this.sendJsonRPCRequest<
        Array<ExecuteReadOnlyData>
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
      info: jsonRpcCallResult[0] as ExecuteReadOnlyData,
    } as ExecuteReadOnlyResponse;
  }

  /**
   * Get the status of a specific operation.
   *
   * @param opId - The operation id.
   *
   * @returns A promise that resolves to the status of the operation.
   */
  public async getOperationStatus(opId: string): Promise<EOperationStatus> {
    const operationData: Array<OperationData> =
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

    return EOperationStatus.NCONSISTENT;
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
   * @returns A promise that resolves to the array of ProtoFiles corresponding
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
      let protoFiles: MassaProtoFile[];
      // parse response
      const json = await response.json();
      for (let proto of json) {
        let content = proto['final_value'].toString();
        let protos = content.split('syntax = "proto3";'); // splitting all the proto functions to make separate proto file for each functions
        for (let func of protos) {
          const rName = /message (.+)RHelper /gm;
          const fName = rName.exec(func)[0]; // retrieving the proto function name
          const filepath = path.join(outputDirectory, fName + '.proto');
          writeFileSync(filepath, func); // writing the proto file
          protoFiles.push({
            data: func,
            filePath: filepath,
            protoFuncName: fName,
          });
        }
      }
      return protoFiles;
    } catch (ex) {
      const msg = `Failed to retrieve the proto files.`;
      console.error(msg, ex);
      throw ex;
    }
  }
}
