import { EventEmitter } from "events";
import { IProvider } from "../interfaces/IProvider";
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

export class Client extends EventEmitter {
	private clientConfig: IClientConfig;
	private baseAccount: IAccount;

	public constructor(clientConfig: IClientConfig, baseAccount?: IAccount) {
		super();
		this.clientConfig = clientConfig;
		if (this.clientConfig.providers.length < 1) throw new Error("Cannot initialize web3 with less than one provider. Need at least one");
		this.clientConfig.defaultProviderIndex = this.clientConfig.defaultProviderIndex || 0;
		if (this.clientConfig.defaultProviderIndex || 0 > this.clientConfig.providers.length) {
			throw new Error(`Providers length and index mismatch. Providers: ${this.clientConfig.providers.length}. 
			Required default index ${this.clientConfig.defaultProviderIndex}`)
		}

		if (baseAccount) {
			this.setBaseAccount(baseAccount);
		}

		this.getDefaultProvider = this.getDefaultProvider.bind(this);
		this.getDefaultProviderIndex = this.getDefaultProviderIndex.bind(this);
		this.setBaseAccount = this.setBaseAccount.bind(this);
		this.getBaseAccount = this.getBaseAccount.bind(this);
		this.sendJsonRPCRequest = this.sendJsonRPCRequest.bind(this);
		this.executeSC = this.executeSC.bind(this);
		this.signOperation = this.signOperation.bind(this);
		this.computeBytesCompact = this.computeBytesCompact.bind(this);
	}

	public getDefaultProvider(): IProvider {
		return this.clientConfig.providers[this.clientConfig.defaultProviderIndex];
	}

	public getDefaultProviderIndex(): number {
		return this.clientConfig.defaultProviderIndex;
	}

	public setBaseAccount(baseAccount: IAccount): void {
		this.baseAccount = baseAccount;
	}

	public getBaseAccount(): IAccount {
		return this.baseAccount;
	}

	private async sendJsonRPCRequest<T>(resource: string, params: Object): Promise<T> {
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
				resp = await axios.post(this.getDefaultProvider().url, body, headers);
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
					error: new Error(responseData.error)
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

		// rethrow the error
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
		return await this.sendJsonRPCRequest('send_operations', [[data]]);
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

	public unban = ipAddrs => { /* TODO */ } // unban a given IP addresses
	public ban = ipAddrs => { /* TODO */ } // ban a given IP addresses
	public nodeStop = () => { /* TODO */ } // stops the node
	public nodeGetStakingAddresses = () => { /* TODO */ } // show staking addresses
	public nodeRemoveStakingAddresses = addresses => { /* TODO */ } // remove staking addresses
	public nodeAddStakingPrivateKeys = privateKeys => { /* TODO */ } // add staking private keys

	/* web3/public.js node instrumentation relying on public Node API */

	// show the status of the node (reachable? number of peers connected, consensus, version, config parameter summary...)
	public async getStatus(): Promise<IStatus> {
		if (this.clientConfig.retryStrategyOn) {
			return await trySafeExecute<IStatus>(this.sendJsonRPCRequest,['get_status', []]);
		} else {
			return await this.sendJsonRPCRequest('get_status', []);
		}
	}

	// get info about a list of addresses (balances, block creation, ...)
	public async getAddresses(addresses: Array<string>): Promise<Array<IAddressInfo>> {
		if (this.clientConfig.retryStrategyOn) {
			return await trySafeExecute<Array<IAddressInfo>>(this.sendJsonRPCRequest,['get_addresses', [addresses]]);
		} else {
			return await this.sendJsonRPCRequest('get_addresses', [addresses])
		}
	} 
	public getBlocks = blockIds => { /* TODO */ } // show info about a block (content, finality ...)
	public getEndorsements = endorsementIds => { /* TODO */ } // show info about a list of endorsements (content, finality ...)
	public getOperations = operationIds => { /* TODO */ } // show info about a list of operations = (content, finality ...)
	public buyRolls = (address, rollCount, fee) => { /* TODO */ } // buy rolls with wallet address
	public sellRolls = (address, rollCount, fee) => { /* TODO */ } // sell rolls with wallet address
	public sendTransaction = (senderAddress, receiverAddress, amount, fee) => { /* TODO */ } // send coins from a wallet address
	public sendSmartContract = (senderAddress, bytecode, maxGas, gasPrice, coins, fee) => { /* TODO */ } // create and send an operation containing byte code
	public readonlySmartContract = (bytecode, maxGas, gasPrice, address) => { /* TODO */ } // execute byte code, address is optionnal. Nothing is really executed on chain

	/* web3/wallet.js module that will under the hood interact with WebExtension, native client or interactively with user */
	public walletInfo = () => { /* TODO */ } // show wallet info (private keys, public keys, addresses, balances ...)
	public walletGeneratePrivateKey = () => { /* TODO */ } // generate a private key and add it into the wallet
	public walletAddPrivateKeys = privateKeys => { /* TODO */ } // add a list of private keys to the wallet
	public walletRemoveAddresses = addresses => { /* TODO */ } // remove a list of addresses from the wallet
	public walletSign = (address, string) => { /* TODO */ } // sign provided string with given address (address must be in the wallet)

}