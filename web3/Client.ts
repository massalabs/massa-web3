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
import { PrivateApiClient } from "./PrivateApiClient";
import { PublicApiClient } from "./PublicApiClient";
import { WalletClient } from "./WalletClient";
import { SmartContractLoader } from "./SmartContractLoader";

export class Client {

	private smartContractLoader: SmartContractLoader;
	private baseClient: BaseClient;
	private privateApiClient: PrivateApiClient;
	private publicApiClient: PublicApiClient;
	private walletClient: WalletClient;

	public constructor(clientConfig: IClientConfig, baseAccount?: IAccount) {
		this.baseClient = new BaseClient(clientConfig, baseAccount);
		this.privateApiClient =  new PrivateApiClient(clientConfig);
		this.publicApiClient =  new PublicApiClient(clientConfig);
		this.walletClient =  new WalletClient(clientConfig, this.publicApiClient);
		this.smartContractLoader = new SmartContractLoader();

		// bind class methods
		this.privateApi = this.privateApi.bind(this);
		this.publicApi = this.publicApi.bind(this);
		this.wallet = this.wallet.bind(this);
	}

	public privateApi(): PrivateApiClient {
		return this.privateApiClient;
	}
	public publicApi(): PublicApiClient {
		return this.publicApiClient;
	}
	public wallet(): WalletClient {
		return this.walletClient;
	}
	public smartContractUtils(): WalletClient {
		return this.walletClient;
	}
}