import { IProvider, ProviderType } from '../interfaces/IProvider';
import { IClientConfig } from '../interfaces/IClientConfig';
import { Buffer } from 'buffer';
import { base58Decode, varintEncode } from '../utils/Xbqcrypto';
import { IContractData } from '../interfaces/IContractData';
import { JsonRpcResponseData } from '../interfaces/JsonRpcResponseData';
import axios, { AxiosResponse, AxiosRequestHeaders } from 'axios';
import { JSON_RPC_REQUEST_METHOD } from '../interfaces/JsonRpcMethods';
import { ITransactionData } from '../interfaces/ITransactionData';
import { OperationTypeId } from '../interfaces/OperationTypes';
import { IRollsData } from '../interfaces/IRollsData';
import { ICallData } from '../interfaces/ICallData';
import { Args } from '@massalabs/web3-utils';

// encode a string address to bytes.
const encodeAddressToBytes = (
  address: string,
  isSmartContract = false,
): Buffer => {
  let targetAddressEncoded = base58Decode(address.slice(2));
  targetAddressEncoded = Buffer.concat([
    isSmartContract ? Buffer.from([1]) : Buffer.from([0]),
    targetAddressEncoded,
  ]);

  return targetAddressEncoded;
};

export type DataType =
  | IContractData
  | ITransactionData
  | IRollsData
  | ICallData;

export const requestHeaders = {
  Accept:
    'application/json,text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Credentials': true,
  'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
} as AxiosRequestHeaders;

export const PERIOD_OFFSET = 5;

/**
 * The Base Client object is the main entry point for interacting with the massa blockchain.
 *
 * @remarks
 * The `BaseClient` class should not be instantiated directly; instead, it should
 * be extended by other client classes to provide additional functionality on top of the core
 * methods provided by this class.
 *
 * @throws Will throw an error if no public providers are included in client configuration.
 * @throws Will throw an error if no private providers are included in client configuration.
 */
export class BaseClient {
  public clientConfig: IClientConfig;

  /**
   * Constructor of the BaseClient class
   *
   * @param clientConfig - The client configuration object as defined in {@link IClientConfig}
   */
  public constructor(clientConfig: IClientConfig) {
    this.clientConfig = clientConfig;
    this.clientConfig.periodOffset =
      this.clientConfig.periodOffset | PERIOD_OFFSET;
    if (this.getPublicProviders().length === 0) {
      throw new Error(
        'Cannot initialize web3 with no public providers. Need at least one',
      );
    }

    // bind class methods
    this.getPrivateProviders = this.getPrivateProviders.bind(this);
    this.getProviderForRpcMethod = this.getProviderForRpcMethod.bind(this);
    this.getPublicProviders = this.getPublicProviders.bind(this);
    this.sendJsonRPCRequest = this.sendJsonRPCRequest.bind(this);
    this.compactBytesForOperation = this.compactBytesForOperation.bind(this);
    this.setProviders = this.setProviders.bind(this);
    this.promisifyJsonRpcCall = this.promisifyJsonRpcCall.bind(this);
  }

  /**
   * Set new providers as {@link IProvider}.
   *
   * @privateRemarks
   * This methods add the providers to the existing ones in the clientConfig object.
   *
   * @param providers - The new providers to set as an array of IProvider.
   *
   * @throws Will throw an error if no public providers are included in the given array of providers.
   * @throws Will throw an error if no private providers are included in the given array of providers.
   */
  public setProviders(providers: Array<IProvider>): void {
    const hasPublicProvider = providers.some(
      (provider) => provider.type === ProviderType.PUBLIC,
    );

    if (!hasPublicProvider) {
      throw new Error(
        'Cannot set providers with no public providers. Need at least one',
      );
    }

    this.clientConfig.providers = providers;
  }

  /**
   * Returns all the private providers.
   *
   * @returns An array of IProvider containing all the private providers.
   */
  protected getPrivateProviders(): Array<IProvider> {
    return this.clientConfig.providers.filter(
      (provider) => provider.type === ProviderType.PRIVATE,
    );
  }

  /**
   * Returns all the public providers.
   *
   * @returns An array of IProvider containing all the public providers.
   */
  protected getPublicProviders(): Array<IProvider> {
    return this.clientConfig.providers.filter(
      (provider) => provider.type === ProviderType.PUBLIC,
    );
  }

  /**
   * Find provider for a concrete rpc method
   *
   * @remarks
   * This method chooses the provider to use for a given rpc method.
   *  - If the rpc method is about getting or sending data to the blockchain,
   *    it will choose a public provider.
   *  - If the rpc method is meant to be used by the node itself, it will choose a private provider.
   *  - An error is thrown if no provider is found for the rpc method.
   *
   * @param requestMethod - The rpc method to find the provider for.
   *
   * @returns The provider for the rpc method.
   */
  private getProviderForRpcMethod(
    requestMethod: JSON_RPC_REQUEST_METHOD,
  ): IProvider {
    switch (requestMethod) {
      case JSON_RPC_REQUEST_METHOD.GET_ADDRESSES:
      case JSON_RPC_REQUEST_METHOD.GET_STATUS:
      case JSON_RPC_REQUEST_METHOD.SEND_OPERATIONS:
      case JSON_RPC_REQUEST_METHOD.GET_OPERATIONS:
      case JSON_RPC_REQUEST_METHOD.GET_BLOCKS:
      case JSON_RPC_REQUEST_METHOD.GET_ENDORSEMENTS:
      case JSON_RPC_REQUEST_METHOD.GET_CLIQUES:
      case JSON_RPC_REQUEST_METHOD.GET_STAKERS:
      case JSON_RPC_REQUEST_METHOD.GET_FILTERED_SC_OUTPUT_EVENT:
      case JSON_RPC_REQUEST_METHOD.EXECUTE_READ_ONLY_BYTECODE:
      case JSON_RPC_REQUEST_METHOD.EXECUTE_READ_ONLY_CALL:
      case JSON_RPC_REQUEST_METHOD.GET_DATASTORE_ENTRIES:
      case JSON_RPC_REQUEST_METHOD.GET_BLOCKCLIQUE_BLOCK_BY_SLOT:
      case JSON_RPC_REQUEST_METHOD.GET_GRAPH_INTERVAL: {
        let providers = this.getPublicProviders();
        let idx = Math.floor(Math.random() * providers.length);
        return providers[idx];
      }
      case JSON_RPC_REQUEST_METHOD.STOP_NODE:
      case JSON_RPC_REQUEST_METHOD.NODE_BAN_BY_ID:
      case JSON_RPC_REQUEST_METHOD.NODE_BAN_BY_IP:
      case JSON_RPC_REQUEST_METHOD.NODE_UNBAN_BY_ID:
      case JSON_RPC_REQUEST_METHOD.NODE_UNBAN_BY_IP:
      case JSON_RPC_REQUEST_METHOD.GET_STAKING_ADDRESSES:
      case JSON_RPC_REQUEST_METHOD.REMOVE_STAKING_ADDRESSES:
      case JSON_RPC_REQUEST_METHOD.ADD_STAKING_PRIVATE_KEYS:
      case JSON_RPC_REQUEST_METHOD.NODE_SIGN_MESSAGE:
      case JSON_RPC_REQUEST_METHOD.NODE_REMOVE_FROM_WHITELIST: {
        let providers = this.getPrivateProviders();
        let idx = Math.floor(Math.random() * providers.length);
        return providers[idx];
      }
      default:
        throw new Error(`Unknown Json rpc method: ${requestMethod}`);
    }
  }

  /**
   * Converts a json rpc call to a promise that resolves as a JsonRpcResponseData
   *
   * @privateRemarks
   * If there is an error while sending the request, the function catches the error, the isError
   * property is set to true, the result property set to null, and the error property set to a
   * new Error object with a message indicating that there was an error.
   *
   * @param resource - The rpc method to call.
   * @param params - The parameters to pass to the rpc method.
   *
   * @returns A promise that resolves as a JsonRpcResponseData.
   */
  private async promisifyJsonRpcCall<T>(
    resource: JSON_RPC_REQUEST_METHOD,
    params: object,
  ): Promise<JsonRpcResponseData<T>> {
    let resp: AxiosResponse<JsonRpcResponseData<T>> = null;

    const body = {
      jsonrpc: '2.0',
      method: resource,
      params: params,
      id: 0,
    };

    try {
      resp = await axios.post(
        this.getProviderForRpcMethod(resource).url,
        body,
        requestHeaders,
      );
    } catch (ex) {
      return {
        isError: true,
        result: null,
        error: new Error('JSON.parse error: ' + String(ex)),
      } as JsonRpcResponseData<T>;
    }

    const responseData: JsonRpcResponseData<T> = resp.data;

    if (responseData.error) {
      return {
        isError: true,
        result: null,
        error: new Error(responseData.error.message),
      } as JsonRpcResponseData<T>;
    }

    return {
      isError: false,
      result: responseData.result as T,
      error: null,
    } as JsonRpcResponseData<T>;
  }

  /**
   * Sends a post JSON rpc request to the node.
   *
   * @param resource - The rpc method to call.
   * @param params - The parameters to pass to the rpc method.
   *
   * @throws An error if the rpc method returns an error.
   *
   * @returns A promise that resolves as the result of the rpc method.
   */
  protected async sendJsonRPCRequest<T>(
    resource: JSON_RPC_REQUEST_METHOD,
    params: object,
  ): Promise<T> {
    let resp: JsonRpcResponseData<T> = null;
    resp = await this.promisifyJsonRpcCall(resource, params);

    // in case of rpc error, rethrow the error.
    if (resp.error && resp.error) {
      throw resp.error;
    }

    return resp.result;
  }

  /**
   * Compacts bytes payload per operation.
   *
   * @param data - The operation data.
   * @param opTypeId - The operation type id.
   * @param account - The account used.
   * @param expirePeriod - The expire period.
   *
   * @returns The compacted bytes payload.
   */
  protected compactBytesForOperation(
    data: DataType,
    opTypeId: OperationTypeId,
    expirePeriod: number,
  ): Buffer {
    const feeEncoded = Buffer.from(varintEncode(data.fee));
    const expirePeriodEncoded = Buffer.from(varintEncode(expirePeriod));
    const typeIdEncoded = Buffer.from(varintEncode(opTypeId.valueOf()));

    switch (opTypeId) {
      case OperationTypeId.ExecuteSC: {
        // get sc data binary
        const scBinaryCode = (data as IContractData).contractDataBinary;

        // max gas
        const maxGasEncoded = Buffer.from(
          varintEncode((data as IContractData).maxGas),
        );

        // max coins amount
        const maxCoinEncoded = Buffer.from(
          varintEncode((data as IContractData).maxCoins),
        );

        // contract data
        const contractDataEncoded = Buffer.from(scBinaryCode);
        const dataLengthEncoded = Buffer.from(
          varintEncode(contractDataEncoded.length),
        );

        // smart contract operation datastore
        const datastoreKeyMap = (data as IContractData).datastore
          ? (data as IContractData).datastore
          : new Map<Uint8Array, Uint8Array>();
        let datastoreSerializedBuffer = Buffer.from(new Uint8Array());
        for (const [key, value] of datastoreKeyMap) {
          const encodedKeyBytes = Buffer.from(key);
          const encodedKeyLen = Buffer.from(
            varintEncode(encodedKeyBytes.length),
          );
          const encodedValueBytes = Buffer.from(value);
          const encodedValueLen = Buffer.from(
            varintEncode(encodedValueBytes.length),
          );
          datastoreSerializedBuffer = Buffer.concat([
            datastoreSerializedBuffer,
            encodedKeyLen,
            encodedKeyBytes,
            encodedValueLen,
            encodedValueBytes,
          ]);
        }
        const datastoreSerializedBufferLen = Buffer.from(
          varintEncode(datastoreKeyMap.size),
        );
        if (datastoreSerializedBuffer.length === 0) {
          return Buffer.concat([
            feeEncoded,
            expirePeriodEncoded,
            typeIdEncoded,
            maxGasEncoded,
            maxCoinEncoded,
            dataLengthEncoded,
            contractDataEncoded,
            datastoreSerializedBufferLen,
          ]);
        }

        return Buffer.concat([
          feeEncoded,
          expirePeriodEncoded,
          typeIdEncoded,
          maxGasEncoded,
          maxCoinEncoded,
          dataLengthEncoded,
          contractDataEncoded,
          datastoreSerializedBufferLen,
          datastoreSerializedBuffer,
        ]);
      }
      case OperationTypeId.CallSC: {
        // max gas
        const maxGasEncoded = Buffer.from(
          varintEncode((data as ICallData).maxGas),
        );

        // coins to send
        const coinsEncoded = Buffer.from(
          varintEncode((data as ICallData).coins),
        );

        // target address
        const targetAddressEncoded = encodeAddressToBytes(
          (data as ICallData).targetAddress,
          true,
        );

        // target function name and name length
        const functionNameEncoded = new Uint8Array(
          Buffer.from((data as ICallData).functionName, 'utf8'),
        );
        const functionNameLengthEncoded = Buffer.from(
          varintEncode(functionNameEncoded.length),
        );

        // parameter
        const param = (data as ICallData).parameter;
        let serializedParam: number[]; // serialized parameter
        if (param instanceof Array) {
          serializedParam = param;
        } else {
          serializedParam = param.serialize();
        }
        const parametersEncoded = new Uint8Array(serializedParam);
        const parametersLengthEncoded = Buffer.from(
          varintEncode(parametersEncoded.length),
        );

        return Buffer.concat([
          feeEncoded,
          expirePeriodEncoded,
          typeIdEncoded,
          maxGasEncoded,
          coinsEncoded,
          targetAddressEncoded,
          functionNameLengthEncoded,
          functionNameEncoded,
          parametersLengthEncoded,
          parametersEncoded,
        ]);
      }
      case OperationTypeId.Transaction: {
        // transfer amount
        const amount = (data as ITransactionData).amount;
        const transferAmountEncoded = Buffer.from(varintEncode(amount));
        // recipient
        const recipientAddressEncoded = encodeAddressToBytes(
          (data as ITransactionData).recipientAddress,
          false,
        );

        return Buffer.concat([
          feeEncoded,
          expirePeriodEncoded,
          typeIdEncoded,
          recipientAddressEncoded,
          transferAmountEncoded,
        ]);
      }
      case OperationTypeId.RollBuy:
      case OperationTypeId.RollSell: {
        // rolls amount
        const rollsAmountEncoded = Buffer.from(
          varintEncode((data as IRollsData).amount),
        );

        return Buffer.concat([
          feeEncoded,
          expirePeriodEncoded,
          typeIdEncoded,
          rollsAmountEncoded,
        ]);
      }
    }
  }
}
