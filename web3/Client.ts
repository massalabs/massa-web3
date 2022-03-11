import { EventEmitter } from "events";
import { IProvider, ProviderType } from "../interfaces/IProvider";
import { IClientConfig } from "../interfaces/IClientConfig";
import { Buffer } from "buffer";
import {base58checkDecode, base58checkEncode, hashSha256, typedArrayToBuffer, varintEncode} from "../utils/Xbqcrypto";
import { ecdsaSign, ecdsaVerify } from "secp256k1"
import { BN }  from "bn.js";
import { IAccount } from "../interfaces/IAccount";
import { IContractData } from "../interfaces/IContractData";
import { JsonRpcResponseData } from "../interfaces/JsonRpcResponseData";
import axios, { AxiosResponse, AxiosRequestHeaders } from "axios";
import { IStatus } from "../interfaces/IStatus";
import { IAddressInfo } from "../interfaces/IAddressInfo";
import { trySafeExecute } from "../utils/retryExecuteFunction";
import { JSON_RPC_REQUEST_METHOD } from "../interfaces/JsonRpcMethods";
import { IBlockInfo } from "../interfaces/IBlockInfo";
import { IEndorsement } from "../interfaces/IEndorsement";
import { IOperationData } from "../interfaces/IOperationData";

export class Client extends EventEmitter {
	private clientConfig: IClientConfig;
	private baseAccount: IAccount;

	public constructor(clientConfig: IClientConfig, baseAccount?: IAccount) {
		super();
		this.clientConfig = clientConfig;
		if (this.getPrivateProviders().length === 0) {
			throw new Error("Cannot initialize web3 with no private providers. Need at least one");
		}
		if (this.getPublicProviders().length === 0) {
			throw new Error("Cannot initialize web3 with no public providers. Need at least one");
		}
		if (baseAccount) {
			this.setBaseAccount(baseAccount);
		}

		// bind class methods
		this.getPrivateProviders = this.getPrivateProviders.bind(this);
		this.getProviderForRpcMethod = this.getProviderForRpcMethod.bind(this);
		this.getPublicProviders = this.getPublicProviders.bind(this);
		this.setBaseAccount = this.setBaseAccount.bind(this);
		this.getBaseAccount = this.getBaseAccount.bind(this);
		this.sendJsonRPCRequest = this.sendJsonRPCRequest.bind(this);
		this.executeSC = this.executeSC.bind(this);
		this.signOperation = this.signOperation.bind(this);
		this.computeBytesCompact = this.computeBytesCompact.bind(this);

		// ========== bind api methods ========= //

		// public api methods
		this.getStatus = this.getStatus.bind(this);
		this.getAddresses = this.getAddresses.bind(this);
		this.getBlocks = this.getBlocks.bind(this);
		this.getEndorsements = this.getEndorsements.bind(this);
		this.getOperations = this.getOperations.bind(this);

		// private api methods
		this.nodeStop = this.nodeStop.bind(this);
		this.banIpAddress = this.banIpAddress.bind(this);
		this.unbanIpAddress = this.unbanIpAddress.bind(this);
		this.nodeAddStakingPrivateKeys = this.nodeAddStakingPrivateKeys.bind(this);
	}

	public getPrivateProviders(): Array<IProvider> {
		return this.clientConfig.providers.filter((provider) => provider.type === ProviderType.PRIVATE);
	}

	public getPublicProviders(): Array<IProvider> {
		return this.clientConfig.providers.filter((provider) => provider.type === ProviderType.PUBLIC);
	}

	private getProviderForRpcMethod(jsonRpcRequestMethod: JSON_RPC_REQUEST_METHOD): IProvider {
		switch (jsonRpcRequestMethod) {
			case JSON_RPC_REQUEST_METHOD.GET_ADDRESSES:
			case JSON_RPC_REQUEST_METHOD.GET_STATUS:
			case JSON_RPC_REQUEST_METHOD.SEND_OPERATIONS:
			case JSON_RPC_REQUEST_METHOD.GET_BLOCKS: {
					return this.getPublicProviders()[0]; //choose the first available public provider
				}
			case JSON_RPC_REQUEST_METHOD.STOP_NODE:
			case JSON_RPC_REQUEST_METHOD.BAN:
			case JSON_RPC_REQUEST_METHOD.UNBAN:
			case JSON_RPC_REQUEST_METHOD.GET_STAKING_ADDRESSES:
			case JSON_RPC_REQUEST_METHOD.REMOVE_STAKING_ADDRESSES:
			case JSON_RPC_REQUEST_METHOD.ADD_STAKING_PRIVATE_KEYS: {
				return this.getPrivateProviders()[0]; //choose the first available private provider
			}
			default: throw new Error("Unknown Json rpc method")
		}
	}

	public setBaseAccount(baseAccount: IAccount): void {
		this.baseAccount = baseAccount;
	}

	public getBaseAccount(): IAccount {
		return this.baseAccount;
	}

	private async sendJsonRPCRequest<T>(resource: JSON_RPC_REQUEST_METHOD, params: Object): Promise<T> {
		const promise = new Promise<JsonRpcResponseData<T>>(async (resolve, reject) => {
			let resp: AxiosResponse = null;

			const headers = {
				"Accept": "application/json",
				'Access-Control-Allow-Origin': '*'
			} as AxiosRequestHeaders;
		
			const body = {
				"jsonrpc": "2.0",
				"method": resource,
				"params": params,
				"id": 0
			};
		
			try {
				resp = await axios.post(this.getProviderForRpcMethod(resource).url, body, headers);
			} catch (ex) {
				return resolve({
					isError: true,
					result: null,
					error: new Error('JSON.parse error: ' + String(ex))
				} as JsonRpcResponseData<T>);
			}

			const responseData = resp.data;

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
	
	public async executeSC<T>(contractData: IContractData, executor?: IAccount): Promise<JsonRpcResponseData<T>> {
		const signature = this.signOperation(contractData, executor);
		const data = {
			content: {
				expire_period: contractData.expirePeriod,
				fee: contractData.fee.toString(),
				op: {
					ExecuteSC: {
						data: Array.from(atob(contractData.contractData), c => c.charCodeAt(0)),
						max_gas: contractData.maxGas,
						coins: contractData.coins.toString(),
						gas_price: contractData.gasPrice.toString()
					}
				},
				sender_public_key: executor.publicKey || this.baseAccount.publicKey
			},
			signature,
		}
		return await this.sendJsonRPCRequest(JSON_RPC_REQUEST_METHOD.SEND_OPERATIONS, [[data]]);
	}

	private signOperation(contractData: IContractData, executor?: IAccount) {
		// bytes compaction
		const bytesCompact: Buffer = this.computeBytesCompact(contractData, 3, executor);
	
		// Hash byte compact
		const hashEncodedData: Buffer = hashSha256(bytesCompact);
	
		// Signing a digest
		const digest = new BN(hashEncodedData.valueOf());
		const privateKeyBase58Decoded = base58checkDecode(executor.privateKey || this.baseAccount.privateKey);
		const publicKeyBase58Decoded = base58checkDecode(executor.publicKey || this.baseAccount.publicKey);
		const base58PrivateKey = new BN(privateKeyBase58Decoded, 16);
		const base58PublicKey = new BN(publicKeyBase58Decoded, 16);

		const sig = ecdsaSign(digest.toBuffer(), base58PrivateKey.toBuffer());

		const isSigOk: boolean = ecdsaVerify(sig.signature, digest.toBuffer(), base58PublicKey.toBuffer());
		if (!isSigOk) {
			throw new Error("Malformed signature");
		}

		const r: Uint8Array = sig.signature.slice(0, 32);
		const s: Uint8Array = sig.signature.slice(32, 64);
		const rr: Uint8Array = Buffer.from(typedArrayToBuffer(r).toString(), "hex").valueOf();
		const ss: Uint8Array = Buffer.from(typedArrayToBuffer(s).toString(), "hex").valueOf();

		return base58checkEncode(Buffer.concat([rr, ss]));
	}
	
	private computeBytesCompact(contractData: IContractData,  typeId: number = 3, account?: IAccount): Buffer {
		const feeEncoded = Buffer.from(varintEncode(contractData.fee));
		const expirePeriodEncoded = Buffer.from(varintEncode(contractData.expirePeriod));
		const publicKeyEncoded = base58checkDecode(account.publicKey || this.baseAccount.publicKey)
		const typeIdEncoded = Buffer.from(varintEncode(typeId));
		const maxGasEncoded = Buffer.from(varintEncode(contractData.maxGas));
		const coinsEncoded = Buffer.from(varintEncode(contractData.coins));
		const gasPriceEncoded = Buffer.from(varintEncode(contractData.gasPrice));
		const dataLengthEncoded = Buffer.from(varintEncode(contractData.contractData.length));
		const contractDataEncoded = Uint8Array.from(atob(contractData.contractData), c => c.charCodeAt(0));

		return Buffer.concat([feeEncoded, expirePeriodEncoded, publicKeyEncoded, typeIdEncoded, maxGasEncoded, coinsEncoded, gasPriceEncoded, dataLengthEncoded, contractDataEncoded]);
	}

	// unban a given IP addresses
	public async unbanIpAddress(ipAddress: string): Promise<void> {
		const jsonRpcRequestMethod = JSON_RPC_REQUEST_METHOD.UNBAN;
		if (this.clientConfig.retryStrategyOn) {
			return await trySafeExecute<void>(this.sendJsonRPCRequest,[jsonRpcRequestMethod, [[ipAddress]]]);
		} else {
			return await this.sendJsonRPCRequest<void>(jsonRpcRequestMethod, [[ipAddress]]);
		}
	} 
	// ban a given IP addresses
	public async banIpAddress(ipAddress: string): Promise<void> {
		const jsonRpcRequestMethod = JSON_RPC_REQUEST_METHOD.BAN;
		if (this.clientConfig.retryStrategyOn) {
			return await trySafeExecute<void>(this.sendJsonRPCRequest,[jsonRpcRequestMethod, [[ipAddress]]]);
		} else {
			return await this.sendJsonRPCRequest<void>(jsonRpcRequestMethod, [[ipAddress]]);
		}
	} 
	
	// stops the node
	public async nodeStop(): Promise<void> {
		const jsonRpcRequestMethod = JSON_RPC_REQUEST_METHOD.STOP_NODE;
		if (this.clientConfig.retryStrategyOn) {
			return await trySafeExecute<void>(this.sendJsonRPCRequest,[jsonRpcRequestMethod, []]);
		} else {
			return await this.sendJsonRPCRequest<void>(jsonRpcRequestMethod, []);
		}
	}
	// show staking addresses
	public async nodeGetStakingAddresses(): Promise<Array<string>> {
		const jsonRpcRequestMethod = JSON_RPC_REQUEST_METHOD.GET_STAKING_ADDRESSES;
		if (this.clientConfig.retryStrategyOn) {
			return await trySafeExecute<Array<string>>(this.sendJsonRPCRequest,[jsonRpcRequestMethod, []]);
		} else {
			return await this.sendJsonRPCRequest<Array<string>>(jsonRpcRequestMethod, []);
		}
	}
	// remove staking addresses
	public async nodeRemoveStakingAddresses(addresses: Array<string>): Promise<void> {
		const jsonRpcRequestMethod = JSON_RPC_REQUEST_METHOD.REMOVE_STAKING_ADDRESSES;
		if (this.clientConfig.retryStrategyOn) {
			return await trySafeExecute<void>(this.sendJsonRPCRequest,[jsonRpcRequestMethod, [addresses]]);
		} else {
			return await this.sendJsonRPCRequest<void>(jsonRpcRequestMethod, [addresses]);
		}
	}
	// add staking private keys
	public async nodeAddStakingPrivateKeys(privateKeys: Array<string>): Promise<void> {
		const jsonRpcRequestMethod = JSON_RPC_REQUEST_METHOD.ADD_STAKING_PRIVATE_KEYS;
		if (this.clientConfig.retryStrategyOn) {
			return await trySafeExecute<void>(this.sendJsonRPCRequest,[jsonRpcRequestMethod, [privateKeys]]);
		} else {
			return await this.sendJsonRPCRequest<void>(jsonRpcRequestMethod, [privateKeys]);
		}
	}

	/* web3/public.js node instrumentation relying on public Node API */

	// show the status of the node (reachable? number of peers connected, consensus, version, config parameter summary...)
	public async getStatus(): Promise<IStatus> {
		const jsonRpcRequestMethod = JSON_RPC_REQUEST_METHOD.GET_STATUS;
		if (this.clientConfig.retryStrategyOn) {
			return await trySafeExecute<IStatus>(this.sendJsonRPCRequest,[jsonRpcRequestMethod, []]);
		} else {
			return await this.sendJsonRPCRequest<IStatus>(jsonRpcRequestMethod, []);
		}
	}

	// get info about a list of addresses (balances, block creation, ...)
	public async getAddresses(addresses: Array<string>): Promise<Array<IAddressInfo>> {
		const jsonRpcRequestMethod = JSON_RPC_REQUEST_METHOD.GET_ADDRESSES;
		if (this.clientConfig.retryStrategyOn) {
			return await trySafeExecute<Array<IAddressInfo>>(this.sendJsonRPCRequest,[jsonRpcRequestMethod, [addresses]]);
		} else {
			return await this.sendJsonRPCRequest<Array<IAddressInfo>>(jsonRpcRequestMethod, [addresses]);
		}
	} 
	
	//show info about a block (content, finality ...)
	public async getBlocks(blockIds: Array<string>): Promise<Array<IBlockInfo>> {
		const jsonRpcRequestMethod = JSON_RPC_REQUEST_METHOD.GET_BLOCKS;
		if (this.clientConfig.retryStrategyOn) {
			return await trySafeExecute<Array<IBlockInfo>>(this.sendJsonRPCRequest,[jsonRpcRequestMethod, [blockIds]]);
		} else {
			return await this.sendJsonRPCRequest<Array<IBlockInfo>>(jsonRpcRequestMethod, [blockIds]);
		}
	} 
	// show info about a list of endorsements (content, finality ...)
	public async getEndorsements(endorsementIds: Array<string>): Promise<Array<IEndorsement>> {
		const jsonRpcRequestMethod = JSON_RPC_REQUEST_METHOD.GET_ENDORSEMENTS;
		if (this.clientConfig.retryStrategyOn) {
			return await trySafeExecute<Array<IEndorsement>>(this.sendJsonRPCRequest,[jsonRpcRequestMethod, [endorsementIds]]);
		} else {
			return await this.sendJsonRPCRequest<Array<IEndorsement>>(jsonRpcRequestMethod, [endorsementIds]);
		}
	} 
	// show info about a list of operations = (content, finality ...)
	public async getOperations(operationIds: Array<string>): Promise<Array<IOperationData>> {
		const jsonRpcRequestMethod = JSON_RPC_REQUEST_METHOD.GET_OPERATIONS;
		if (this.clientConfig.retryStrategyOn) {
			return await trySafeExecute<Array<IOperationData>>(this.sendJsonRPCRequest,[jsonRpcRequestMethod, [operationIds]]);
		} else {
			return await this.sendJsonRPCRequest<Array<IOperationData>>(jsonRpcRequestMethod, [operationIds]);
		}
	}

	//NATIVE OPERATIONS
	public buyRolls = (address, rollCount, fee) => { /* TODO */ } // buy rolls with wallet address
	public sellRolls = (address, rollCount, fee) => { /* TODO */ } // sell rolls with wallet address
	public sendTransaction = (senderAddress, receiverAddress, amount, fee) => { /* TODO */ } // send coins from a wallet address
	public sendSmartContract = (senderAddress, bytecode, maxGas, gasPrice, coins, fee) => { /* TODO */ } // create and send an operation containing byte code
	public readonlySmartContract = (bytecode, maxGas, gasPrice, address) => { /* TODO */ } // execute byte code, address is optionnal. Nothing is really executed on chain
	public getFilteredScOutputEvents = (startSlot, endSlot, emitterAddress, originalCallerAddress, operationId)  => { /* TODO */ }

	/* web3/wallet.js module that will under the hood interact with WebExtension, native client or interactively with user */
	public walletInfo = () => { /* TODO */ } // show wallet info (private keys, public keys, addresses, balances ...)
	public walletGeneratePrivateKey = () => { /* TODO */ } // generate a private key and add it into the wallet
	public walletAddPrivateKeys = privateKeys => { /* TODO */ } // add a list of private keys to the wallet
	public walletRemoveAddresses = addresses => { /* TODO */ } // remove a list of addresses from the wallet
	public walletSign = (address, string) => { /* TODO */ } // sign provided string with given address (address must be in the wallet)

}