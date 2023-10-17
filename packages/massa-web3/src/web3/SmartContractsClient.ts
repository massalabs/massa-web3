/**
 * This file includes the implementation for the {@link SmartContractsClient} class. This class provides methods for interacting with smart contracts
 * in the Massa blockchain. Such methods include {@link SmartContractsClient#deploySmartContract|deploying}, {@link SmartContractsClient#callSmartContract|calling},
 * and {@link SmartContractsClient#readSmartContract|reading} smart contracts, as well as retrieving smart contract {@link SmartContractsClient#getFilteredScOutputEvents|events}
 * and {@link SmartContractsClient#getContractBalance|balances}.
 *
 * @module SmartContractsClient
 */
import { EOperationStatus } from '../interfaces/EOperationStatus';
import { IAddressInfo } from '../interfaces/IAddressInfo';
import { IBalance } from '../interfaces/IBalance';
import { ICallData } from '../interfaces/ICallData';
import { IClientConfig } from '../interfaces/IClientConfig';
import { IContractData } from '../interfaces/IContractData';

import { IEventFilter } from '../interfaces/IEventFilter';
import { IExecuteReadOnlyData } from '../interfaces/IExecuteReadOnlyData';
import { IExecuteReadOnlyResponse } from '../interfaces/IExecuteReadOnlyResponse';
import { IOperationData } from '../interfaces/IOperationData';
import { IReadData } from '../interfaces/IReadData';
import { ISmartContractsClient } from '../interfaces/ISmartContractsClient';
import { JSON_RPC_REQUEST_METHOD } from '../interfaces/JsonRpcMethods';
import { fromMAS } from '../utils/converters';
import { trySafeExecute } from '../utils/retryExecuteFunction';
import { BaseClient } from './BaseClient';
import { PublicApiClient } from './PublicApiClient';
import { IWalletClient } from '../interfaces/IWalletClient';
import { IBaseAccount } from '../interfaces/IBaseAccount';
import {
  IContractReadOperationResponse,
  IContractReadOperationData,
  IEvent,
  Args,
} from '@massalabs/web3-utils';
import { wait } from '../utils/time';

export const MAX_READ_BLOCK_GAS = BigInt(4_294_967_295);

const WAIT_STATUS_TIMEOUT = 60000;
const TX_POLL_INTERVAL_MS = 1000;

/**
 * The key name (as a string) to look for when we are retrieving the proto file from a contract
 */
export const MASSA_PROTOFILE_KEY = 'protoMassa';
/**
 * The separator used to split the proto file content into separate proto files
 */
export const PROTO_FILE_SEPARATOR = '|||||';
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
   * Deploy a smart contract on the massa blockchain by creating and sending
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
    executor?: IBaseAccount,
  ): Promise<string> {
    const sender = executor || this.walletClient.getBaseAccount();
    if (!sender) {
      throw new Error(`No tx sender available`);
    }
    return await sender.deploySmartContract(contractData);
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
    executor?: IBaseAccount,
  ): Promise<string> {
    const sender = executor || this.walletClient.getBaseAccount();
    if (!sender) {
      throw new Error(`No tx sender available`);
    }
    // check the max. allowed gas
    if (callData.maxGas > MAX_READ_BLOCK_GAS) {
      throw new Error(
        `The gas submitted ${callData.maxGas.toString()} exceeds the max. allowed block gas of ${MAX_READ_BLOCK_GAS.toString()}`,
      );
    }

    callData.coins = callData.coins || BigInt(0);

    // check that the sender has enough balance to pay for coins
    const senderBalance: IBalance = await this.walletClient.getAccountBalance(
      sender.address(),
    );
    if (senderBalance.final < callData.coins) {
      throw new Error(
        `The sender ${sender.address()} does not have enough balance to pay for the coins`,
      );
    }
    return await sender.callSmartContract(callData);
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

    if (readData.parameter instanceof Args)
      readData.parameter = readData.parameter.serialize();

    // request data
    let baseAccountSignerAddress: string | null = null;
    if (this.walletClient.getBaseAccount()) {
      baseAccountSignerAddress = this.walletClient.getBaseAccount().address();
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
      returnValue: new Uint8Array(jsonRpcCallResult[0].result.Ok),
      info: jsonRpcCallResult[0],
    };
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
      returnValue: new Uint8Array(jsonRpcCallResult[0].result.Ok),
      info: jsonRpcCallResult[0],
    };
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

    if (!operationData?.length) return EOperationStatus.NOT_FOUND;

    const { is_operation_final, op_exec_status, in_pool, in_blocks } =
      operationData[0];

    if (is_operation_final === null && op_exec_status === null)
      return EOperationStatus.UNEXECUTED_OR_EXPIRED;

    if (in_pool) return EOperationStatus.AWAITING_INCLUSION;

    if (is_operation_final) {
      if (op_exec_status) return EOperationStatus.FINAL_SUCCESS;
      // We explicitly check for false here because null means that the operation was not executed
      if (op_exec_status === false) return EOperationStatus.FINAL_ERROR;
    } else {
      if (op_exec_status) return EOperationStatus.SPECULATIVE_SUCCESS;
      if (op_exec_status === false) return EOperationStatus.SPECULATIVE_ERROR;
    }

    if (in_blocks.length > 0) return EOperationStatus.INCLUDED_PENDING;

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
    timeout?: number,
  ): Promise<EOperationStatus> {
    return await this.awaitOperationStatusHelper(
      opId,
      timeout,
      (currentStatus) => currentStatus === requiredStatus,
    );
  }

  /**
   * Get the status of a specific operation and wait until it reaches one of the required statuses.
   *
   * @param opId - The required operation id.
   * @param requiredStatuses - An array of required statuses.
   *
   * @returns A promise that resolves to the status of the operation.
   */
  public async awaitMultipleRequiredOperationStatus(
    opId: string,
    requiredStatuses: EOperationStatus[],
    timeout?: number,
  ): Promise<EOperationStatus> {
    return await this.awaitOperationStatusHelper(
      opId,
      timeout,
      (currentStatus) => requiredStatuses.includes(currentStatus),
    );
  }

  /**
   * Helper method to wait for a specific condition on an operation's status.
   *
   * @param opId - The operation id to check.
   * @param statusCheck - A callback function that defines the condition for the operation status.
   *
   * @returns A promise that resolves to the status of the operation.
   *
   * @private
   */
  private async awaitOperationStatusHelper(
    opId: string,
    timeout = WAIT_STATUS_TIMEOUT,
    statusCheck: (status: EOperationStatus) => boolean,
  ): Promise<EOperationStatus> {
    const startTime = Date.now();

    while (Date.now() - startTime < timeout) {
      let currentStatus = EOperationStatus.NOT_FOUND;

      try {
        currentStatus = await this.getOperationStatus(opId);

        if (statusCheck(currentStatus)) {
          return currentStatus;
        }
      } catch (ex) {
        console.warn(ex);
      }
      await wait(TX_POLL_INTERVAL_MS);
    }

    throw new Error(
      `Failed to retrieve status of operation id: ${opId}: Timeout reached.`,
    );
  }
}
