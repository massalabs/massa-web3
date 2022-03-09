import { EventEmitter } from "events";
import { IProvider } from "../interfaces/IProvider";
import { IClientConfig } from "../interfaces/IClientConfig";
import { Buffer } from "buffer";
import {base58checkDecode, base58checkEncode, hashSha256, varintEncode} from "../utils/Xbqcrypto";
import { ecdsaSign, ecdsaVerify } from "secp256k1"
import { BN }  from "bn.js";
import { IAccount } from "../interfaces/IAccount";
import { IContractData } from "../interfaces/IContractData";
import { JsonRpcResponseData } from "../interfaces/JsonRpcResponseData";
import axios, { AxiosResponse, AxiosRequestHeaders } from "axios";

export function typedArrayToBuffer(array: Uint8Array): ArrayBuffer {
    return array.buffer.slice(array.byteOffset, array.byteLength + array.byteOffset)
}

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

	public async sendJsonRPCRequest<T>(resource: string, params: Object): Promise<JsonRpcResponseData<T>> {
		return new Promise<JsonRpcResponseData<T>>(async (resolve, reject) => {
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
	public node_stop = () => { /* TODO */ } // stops the node
	public node_get_staking_addresses = () => { /* TODO */ } // show staking addresses
	public node_remove_staking_addresses = addresses => { /* TODO */ } // remove staking addresses
	public node_add_staking_private_keys = privateKeys => { /* TODO */ } // add staking private keys

	/* web3/public.js node instrumentation relying on public Node API */
	public get_status = () => { /* TODO */ } // show the status of the node (reachable? number of peers connected, consensus, version, config parameter summary...)
	public get_addresses = addresses => { /* TODO */ } // get info about a list of addresses (balances, block creation, ...)
	public get_blocks = blockIds => { /* TODO */ } // show info about a block (content, finality ...)
	public get_endorsements = endorsementIds => { /* TODO */ } // show info about a list of endorsements (content, finality ...)
	public get_operations = operationIds => { /* TODO */ } // show info about a list of operations = (content, finality ...)
	public buy_rolls = (address, rollCount, fee) => { /* TODO */ } // buy rolls with wallet address
	public sell_rolls = (address, rollCount, fee) => { /* TODO */ } // sell rolls with wallet address
	public send_transaction = (senderAddress, receiverAddress, amount, fee) => { /* TODO */ } // send coins from a wallet address
	public send_smart_contract = (senderAddress, bytecode, maxGas, gasPrice, coins, fee) => { /* TODO */ } // create and send an operation containing byte code
	public read_only_smart_contract = (bytecode, maxGas, gasPrice, address) => { /* TODO */ } // execute byte code, address is optionnal. Nothing is really executed on chain

	/* web3/wallet.js module that will under the hood interact with WebExtension, native client or interactively with user */
	public wallet_info = () => { /* TODO */ } // show wallet info (private keys, public keys, addresses, balances ...)
	public wallet_generate_private_key = () => { /* TODO */ } // generate a private key and add it into the wallet
	public wallet_add_private_keys = privateKeys => { /* TODO */ } // add a list of private keys to the wallet
	public wallet_remove_addresses = addresses => { /* TODO */ } // remove a list of addresses from the wallet
	public wallet_sign = (address, string) => { /* TODO */ } // sign provided string with given address (address must be in the wallet)

}