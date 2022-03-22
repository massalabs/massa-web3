import { EventEmitter } from "events";
import { IProvider, ProviderType } from "../interfaces/IProvider";
import { IClientConfig } from "../interfaces/IClientConfig";
import { Buffer } from "buffer";
import {base58checkDecode, varintEncode} from "../utils/Xbqcrypto";
import { BN }  from "bn.js";
import { IAccount } from "../interfaces/IAccount";
import { IContractData } from "../interfaces/IContractData";
import { JsonRpcResponseData } from "../interfaces/JsonRpcResponseData";
import axios, { AxiosResponse, AxiosRequestHeaders } from "axios";
import { HTTP_GET_REQUEST_METHOD, JSON_RPC_REQUEST_METHOD } from "../interfaces/JsonRpcMethods";
import { ITransactionData } from "../interfaces/ITransactionData";
import { OperationTypeId } from "../interfaces/OperationTypes";
import { IRollsData } from "../interfaces/IRollsData";

type DataType = IContractData | ITransactionData | IRollsData;

const requestHeaders = {
	"Accept": "application/json,text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
	'Access-Control-Allow-Origin': '*'
} as AxiosRequestHeaders;

export class BaseClient extends EventEmitter {
	protected clientConfig: IClientConfig;

	public constructor(clientConfig: IClientConfig) {
		super();
		this.clientConfig = clientConfig;
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
		this.getUrlHttpMethod = this.getUrlHttpMethod.bind(this);
		this.sendJsonRPCRequest = this.sendJsonRPCRequest.bind(this);
		this.sendGetRequest = this.sendGetRequest.bind(this);
		this.executeSC = this.executeSC.bind(this);
		this.compactBytesForOperation = this.compactBytesForOperation.bind(this);
	}

	public getPrivateProviders(): Array<IProvider> {
		return this.clientConfig.providers.filter((provider) => provider.type === ProviderType.PRIVATE);
	}

	public getPublicProviders(): Array<IProvider> {
		return this.clientConfig.providers.filter((provider) => provider.type === ProviderType.PUBLIC);
	}

	private getProviderForRpcMethod(requestMethod: JSON_RPC_REQUEST_METHOD | HTTP_GET_REQUEST_METHOD): IProvider {
		switch (requestMethod) {
			case JSON_RPC_REQUEST_METHOD.GET_ADDRESSES:
			case JSON_RPC_REQUEST_METHOD.GET_STATUS:
			case JSON_RPC_REQUEST_METHOD.SEND_OPERATIONS:
			case JSON_RPC_REQUEST_METHOD.GET_OPERATIONS:
			case JSON_RPC_REQUEST_METHOD.GET_BLOCKS:
			case JSON_RPC_REQUEST_METHOD.GET_ENDORSEMENTS:
			case JSON_RPC_REQUEST_METHOD.GET_CLIQEUS:
			case JSON_RPC_REQUEST_METHOD.GET_STAKERS:
			case HTTP_GET_REQUEST_METHOD.GET_LATEST_PERIOD: {
					return this.getPublicProviders()[0]; //TODO: choose the first available public provider ?
				}
			case JSON_RPC_REQUEST_METHOD.STOP_NODE:
			case JSON_RPC_REQUEST_METHOD.BAN:
			case JSON_RPC_REQUEST_METHOD.UNBAN:
			case JSON_RPC_REQUEST_METHOD.GET_STAKING_ADDRESSES:
			case JSON_RPC_REQUEST_METHOD.REMOVE_STAKING_ADDRESSES:
			case JSON_RPC_REQUEST_METHOD.ADD_STAKING_PRIVATE_KEYS:
			case JSON_RPC_REQUEST_METHOD.NODE_SIGN_MESSAGE: {
				return this.getPrivateProviders()[0]; //TODO: choose the first available private provider ?
			}
			default: throw new Error("Unknown Json rpc method")
		}
	}

	private getUrlHttpMethod(requestMethod: HTTP_GET_REQUEST_METHOD): string {
		switch (requestMethod) {
			case HTTP_GET_REQUEST_METHOD.GET_LATEST_PERIOD: {
					return this.getPublicProviders()[0].url + "/info"; //choose the first available public provider
				}
			default: throw new Error("Unknown Json rpc method")
		}
	}

	// send a post JSON rpc request to the node
	protected async sendJsonRPCRequest<T>(resource: JSON_RPC_REQUEST_METHOD, params: Object, is_get: boolean=false): Promise<T> {
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
					error: new Error('JSON.parse error: ' + String(ex))
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

	// send get request method
	protected async sendGetRequest<T>(resource: HTTP_GET_REQUEST_METHOD): Promise<T> {
		const promise = new Promise<JsonRpcResponseData<T>>(async (resolve, reject) => {
			let resp: AxiosResponse = null;

			try {
				resp = await axios.get(this.getUrlHttpMethod(resource), requestHeaders);
			} catch (ex) {
				return resolve({
					isError: true,
					result: null,
					error: new Error('JSON.parse error: ' + String(ex))
				} as JsonRpcResponseData<T>);
			}

			return resolve({
				isError: false,
				result: resp.data as T,
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

	// create and send an operation containing byte code
	public async executeSC<T>(contractData: IContractData, executor: IAccount): Promise<Array<string>> {
		const signature = null; //this.signOperation(contractData, executor, 0);
		const data = {
			content: {
				//expire_period: contractData.expirePeriod,
				fee: contractData.fee.toString(),
				op: {
					ExecuteSC: {
						data: Array.from(atob(contractData.contractData), c => c.charCodeAt(0)),
						max_gas: contractData.maxGas,
						coins: contractData.coins.toString(),
						gas_price: contractData.gasPrice.toString()
					}
				},
				sender_public_key: executor.publicKey
			},
			signature,
		}
		// returns operation ids
		const res: JsonRpcResponseData<Array<string>> = await this.sendJsonRPCRequest(JSON_RPC_REQUEST_METHOD.SEND_OPERATIONS, [[data]]);
		return res.result;
	}

	protected scaleAmount(inputAmount: number | string): number {
		const amount = new BN(inputAmount);
		const scaleFactor = (new BN(10)).pow(new BN(9));
		const amountScaled = amount.mul(scaleFactor);
		return amountScaled.toNumber();
	}
	
	protected compactBytesForOperation(data: DataType, opTypeId: OperationTypeId, account: IAccount, expirePeriod: number): Buffer {
		const feeEncoded = Buffer.from(varintEncode(this.scaleAmount(data.fee)));
		const expirePeriodEncoded = Buffer.from(varintEncode(expirePeriod));
		const publicKeyEncoded: Buffer = base58checkDecode(account.publicKey);
		const typeIdEncoded = Buffer.from(varintEncode(opTypeId.valueOf()));

		switch (opTypeId) {
			case OperationTypeId.ExecuteSC: {

				const maxGasEncoded = Buffer.from(varintEncode((data as IContractData).maxGas));
				const coinsEncoded = Buffer.from(varintEncode((data as IContractData).coins));
				const gasPriceEncoded = Buffer.from(varintEncode((data as IContractData).gasPrice));
				const dataLengthEncoded = Buffer.from(varintEncode((data as IContractData).contractData.length));
				const contractDataEncoded = Uint8Array.from(atob((data as IContractData).contractData), c => c.charCodeAt(0));
		
				return Buffer.concat([feeEncoded, expirePeriodEncoded, publicKeyEncoded, typeIdEncoded, maxGasEncoded, coinsEncoded, gasPriceEncoded, dataLengthEncoded, contractDataEncoded]);
			}
			case OperationTypeId.Transaction: {
				// transfer amount
				const transferAmountEncoded = Buffer.from(varintEncode(this.scaleAmount((data as ITransactionData).amount)));
				// recipient
				const recipientAddressEncoded =  base58checkDecode((data as ITransactionData).recipientAddress);

				return Buffer.concat([feeEncoded, expirePeriodEncoded, publicKeyEncoded, typeIdEncoded, recipientAddressEncoded, transferAmountEncoded]);
			}
			case OperationTypeId.RollBuy:
			case OperationTypeId.RollSell: {
				const amount = new BN((data as IRollsData).amount);
				const rollsAmountEncoded = Buffer.from(varintEncode(amount.toNumber()));
		
				return Buffer.concat([feeEncoded, expirePeriodEncoded, publicKeyEncoded, typeIdEncoded, rollsAmountEncoded]);
			}
		}
	}

	//OTHER OPERATIONS (TODO)
	public readonlySmartContract = (bytecode, maxGas, gasPrice, address) => { /* TODO */ } // execute byte code, address is optionnal. Nothing is really executed on chain
	public getFilteredScOutputEvents = (startSlot, endSlot, emitterAddress, originalCallerAddress, operationId)  => { /* TODO */ }
}