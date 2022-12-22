import { IProvider, ProviderType } from "../interfaces/IProvider";
import { IClientConfig } from "../interfaces/IClientConfig";
import { Buffer } from "buffer";
import { base58Decode, varintEncode } from "../utils/Xbqcrypto";
import { BN } from "bn.js";
import { IAccount } from "../interfaces/IAccount";
import { IContractData } from "../interfaces/IContractData";
import { JsonRpcResponseData } from "../interfaces/JsonRpcResponseData";
import axios, { AxiosResponse, AxiosRequestHeaders } from "axios";
import { JSON_RPC_REQUEST_METHOD } from "../interfaces/JsonRpcMethods";
import { ITransactionData } from "../interfaces/ITransactionData";
import { OperationTypeId } from "../interfaces/OperationTypes";
import { IRollsData } from "../interfaces/IRollsData";
import { ICallData } from "../interfaces/ICallData";

export type DataType = IContractData | ITransactionData | IRollsData | ICallData;

const requestHeaders = {
	"Accept": "application/json,text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
	"Access-Control-Allow-Origin": "*"
} as AxiosRequestHeaders;

export const PERIOD_OFFSET = 5;

/**  Base Client which is to be extended by other clients as it provides core methods */
export class BaseJsonRpcClient {
	protected clientConfig: IClientConfig;

	public constructor(clientConfig: IClientConfig) {
		this.clientConfig = clientConfig;
		this.clientConfig.periodOffset = this.clientConfig.periodOffset | PERIOD_OFFSET;
		if (this.getPrivateProviders().length === 0) {
			throw new Error("Cannot initialize web3 with no private providers. Need at least one");
		}
		if (this.getPublicProviders().length === 0) {
			throw new Error("Cannot initialize web3 with no public providers. Need at least one");
		}

		// bind class methods
		this.getPrivateProviders = this.getPrivateProviders.bind(this);
		this.getProviderForRpcMethod = this.getProviderForRpcMethod.bind(this);
		this.getPublicProviders = this.getPublicProviders.bind(this);
		this.sendJsonRPCRequest = this.sendJsonRPCRequest.bind(this);
		this.compactBytesForOperation = this.compactBytesForOperation.bind(this);
		this.setProviders = this.setProviders.bind(this);
	}

	/** set new providers */
	public setProviders(providers: Array<IProvider>): void {
		this.clientConfig.providers = providers;
	}

	/** return all private providers */
	protected getPrivateProviders(): Array<IProvider> {
		return this.clientConfig.providers.filter((provider) => provider.type === ProviderType.PRIVATE);
	}

	/** return all public providers */
	protected getPublicProviders(): Array<IProvider> {
		return this.clientConfig.providers.filter((provider) => provider.type === ProviderType.PUBLIC);
	}

	/** find provider for a concrete rpc method */
	private getProviderForRpcMethod(requestMethod: JSON_RPC_REQUEST_METHOD): IProvider {
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
					return this.getPublicProviders()[0]; // TODO: choose the first available public provider ?
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
				return this.getPrivateProviders()[0]; // TODO: choose the first available private provider ?
			}
			default: throw new Error(`Unknown Json rpc method: ${requestMethod}`);
		}
	}

	/** send a post JSON rpc request to the node */
	protected async sendJsonRPCRequest<T>(resource: JSON_RPC_REQUEST_METHOD, params: Object): Promise<T> {
		const promise = new Promise<JsonRpcResponseData<T>>(async (resolve, reject) => {
			let resp: AxiosResponse = null;

			const body = {
				"jsonrpc": "2.0",
				"method": resource,
				"params": params,
				"id": 0
			};

			try {
				resp = await axios.post(this.getProviderForRpcMethod(resource).url, body, requestHeaders);
			} catch (ex) {
				return resolve({
					isError: true,
					result: null,
					error: new Error("JSON.parse error: " + String(ex))
				} as JsonRpcResponseData<T>);
			}

			const responseData: any = resp.data;

			if (responseData.error) {
				return resolve({
					isError: true,
					result: null,
					error: new Error(responseData.error.message)
				} as JsonRpcResponseData<T>);
			}

			return resolve({
				isError: false,
				result: responseData.result as T,
				error: null
			} as JsonRpcResponseData<T>);
		});

		let resp: JsonRpcResponseData<T> = null;
		try {
			resp = await promise;
		} catch (ex) {
			throw ex;
		}

		// in case of rpc error, rethrow the error
		if (resp.error && resp.error) {
			throw resp.error;
		}

		return resp.result;
	}

	/** scale an amount to blockchain precision */
	protected scaleAmount(inputAmount: number | string): number {
		const amount = new BN(inputAmount);
		const scaleFactor = (new BN(10)).pow(new BN(9));
		const amountScaled = amount.mul(scaleFactor);
		return amountScaled.toNumber();
	}

	/** compact bytes payload per operation */
	protected compactBytesForOperation(data: DataType, opTypeId: OperationTypeId, account: IAccount, expirePeriod: number): Buffer {
		const feeEncoded = Buffer.from(varintEncode(this.scaleAmount(data.fee)));
		const expirePeriodEncoded = Buffer.from(varintEncode(expirePeriod));
		const typeIdEncoded = Buffer.from(varintEncode(opTypeId.valueOf()));

		switch (opTypeId) {
			case OperationTypeId.ExecuteSC: {

				// get sc data binary
				const scBinaryCode = (data as IContractData).contractDataBinary;

				// max gas
				const maxGasEncoded = Buffer.from(varintEncode((data as IContractData).maxGas));

				// contract data
				const contractDataEncoded = Buffer.from(scBinaryCode);
				const dataLengthEncoded = Buffer.from(varintEncode(contractDataEncoded.length));

				// smart contract operation datastore
				const datastoreKeyMap = (data as IContractData).datastore ? (data as IContractData).datastore : new Map<Uint8Array, Uint8Array>();
				let datastoreSerializedBuffer = Buffer.from(new Uint8Array());
				for (const [key, value] of datastoreKeyMap) {
					const encodedKeyBytes = Buffer.from(key);
					const encodedKeyLen = Buffer.from(varintEncode(encodedKeyBytes.length));
					const encodedValueBytes = Buffer.from(value);
					const encodedValueLen = Buffer.from(varintEncode(encodedValueBytes.length));
					datastoreSerializedBuffer = Buffer.concat([datastoreSerializedBuffer, encodedKeyLen, encodedKeyBytes, encodedValueLen, encodedValueBytes]);
				}
				const datastoreSerializedBufferLen = Buffer.from(varintEncode(datastoreKeyMap.size));
				if (datastoreSerializedBuffer.length === 0) {
					return Buffer.concat([feeEncoded, expirePeriodEncoded, typeIdEncoded, maxGasEncoded, dataLengthEncoded, contractDataEncoded, datastoreSerializedBufferLen]);
				}

				return Buffer.concat([feeEncoded, expirePeriodEncoded, typeIdEncoded, maxGasEncoded, dataLengthEncoded, contractDataEncoded, datastoreSerializedBufferLen, datastoreSerializedBuffer]);
			}
			case OperationTypeId.CallSC: {
				// max gas
				const maxGasEncoded = Buffer.from(varintEncode((data as ICallData).maxGas));

				// coins to send
				const coinsEncoded = Buffer.from(varintEncode((data as ICallData).coins));

				// target address
				const targetAddressEncoded = base58Decode((data as ICallData).targetAddress.slice(1)).slice(1);

				// target function name and name length
				const functionNameEncoded = new Uint8Array(Buffer.from((data as ICallData).functionName, "utf8"));
				const functionNameLengthEncoded = Buffer.from(varintEncode(functionNameEncoded.length));

				// parameter
				const parametersEncoded = new Uint8Array((data as ICallData).parameter);
				const parametersLengthEncoded = Buffer.from(varintEncode(parametersEncoded.length));

				return Buffer.concat([feeEncoded, expirePeriodEncoded, typeIdEncoded, maxGasEncoded, coinsEncoded, targetAddressEncoded,
                                      functionNameLengthEncoded, functionNameEncoded, parametersLengthEncoded, parametersEncoded]);
			}
			case OperationTypeId.Transaction: {
				// transfer amount
				const transferAmountEncoded = Buffer.from(varintEncode(this.scaleAmount((data as ITransactionData).amount)));
				// recipient
				const recipientAddressEncoded = base58Decode((data as ITransactionData).recipientAddress.slice(1)).slice(1);

				return Buffer.concat([feeEncoded, expirePeriodEncoded, typeIdEncoded, recipientAddressEncoded, transferAmountEncoded]);
			}
			case OperationTypeId.RollBuy:
			case OperationTypeId.RollSell: {
				// rolls amount
				const amount = new BN((data as IRollsData).amount);
				const rollsAmountEncoded = Buffer.from(varintEncode(amount.toNumber()));

				return Buffer.concat([feeEncoded, expirePeriodEncoded, typeIdEncoded, rollsAmountEncoded]);
			}
		}
	}
}
