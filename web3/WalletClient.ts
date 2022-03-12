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
import { INodeStatus } from "../interfaces/INodeStatus";
import { IAddressInfo, IFullAddressInfo } from "../interfaces/IAddressInfo";
import { trySafeExecute } from "../utils/retryExecuteFunction";
import { JSON_RPC_REQUEST_METHOD } from "../interfaces/JsonRpcMethods";
import { IBlockInfo } from "../interfaces/IBlockInfo";
import { IEndorsement } from "../interfaces/IEndorsement";
import { IOperationData } from "../interfaces/IOperationData";
import { IClique } from "../interfaces/IClique";
import { IStakingAddresses } from "../interfaces/IStakingAddresses";
import { ISignedMessage } from "../interfaces/ISignedMessage";
import * as secp from "@noble/secp256k1";
import { BaseClient } from "./BaseClient";
import { PublicApiClient } from "./PublicApiClient";

export class WalletClient extends BaseClient {
	public constructor(clientConfig: IClientConfig, private readonly publicApiClient: PublicApiClient) {
		super(clientConfig);
		
		// ========== bind api methods ========= //

		// wallet methods
		this.walletInfo = this.walletInfo.bind(this);
		this.walletGenerateNewAccount = this.walletGenerateNewAccount.bind(this);
		this.walletSign = this.walletSign.bind(this);
		this.walletAddPrivateKeys = this.walletAddPrivateKeys.bind(this);
		this.walletRemoveAddresses = this.walletRemoveAddresses.bind(this);
	}

	/* web3/wallet.js module that will under the hood interact with WebExtension, native client or interactively with user */
	// show wallet info (private keys, public keys, addresses, balances ...)
	public async walletInfo(accounts: Array<IAccount>): Promise<Array<IFullAddressInfo>> {
		if (accounts.length === 0) {
			throw new Error("No addresses supplied");
		}
		const addresses: Array<string> = accounts.map((account) => account.address);
		const addressesInfo: Array<IAddressInfo> = await this.publicApiClient.getAddresses(addresses);

		if (addressesInfo.length !== accounts.length) {
			throw new Error(`Requested wallets not fully returned. Got ${addressesInfo.length}, expected: ${accounts.length}`);
		}

		return addressesInfo.map((info, index) => {
			return {
				publicKey: accounts[index].publicKey,
				privateKey: accounts[index].privateKey,
				...info
			} as IFullAddressInfo
		});
	} 

	 // generate a private key and add it into the wallet
	public walletGenerateNewAccount = () => {
		// generate private key
		const privateKey: Uint8Array = secp.utils.randomPrivateKey();
		const privateKeyHex: string = secp.utils.bytesToHex(privateKey);

		// generate public key
		const publicKey: Uint8Array = secp.getPublicKey(privateKey);
		const publicKeyHex: string = secp.utils.bytesToHex(publicKey);

		return {
			address: null, // TODO: get the address
			privateKey: privateKeyHex,
			publicKey: publicKeyHex
		} as IAccount;
	}
	public walletSign = (address, string) => { /* TODO */ } // sign provided string with given address (address must be in the wallet)

	// NOT SUPPORTED HERE
	public walletAddPrivateKeys = privateKeys => { /* TODO */ } // add a list of private keys to the wallet
	public walletRemoveAddresses = addresses => { /* TODO */ } // remove a list of addresses from the wallet
}