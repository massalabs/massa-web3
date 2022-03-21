import { IClientConfig } from "../interfaces/IClientConfig";
import { IAccount } from "../interfaces/IAccount";
import { BaseClient } from "./BaseClient";
import { PrivateApiClient } from "./PrivateApiClient";
import { PublicApiClient } from "./PublicApiClient";
import { Wallet } from "./Wallet";
import { SmartContractUtils } from "./SmartContractUtils";

export class Client {
	private smartContractUtils: SmartContractUtils;
	private privateApiClient: PrivateApiClient;
	private publicApiClient: PublicApiClient;
	private massaWallet: Wallet;

	public constructor(clientConfig: IClientConfig, baseAccount?: IAccount) {
		this.publicApiClient =  new PublicApiClient(clientConfig, baseAccount);
		this.privateApiClient =  new PrivateApiClient(clientConfig, baseAccount);
		this.massaWallet =  new Wallet(clientConfig, this.publicApiClient, baseAccount);
		this.smartContractUtils = new SmartContractUtils();

		// exposed and bound class methods
		this.privateApi = this.privateApi.bind(this);
		this.publicApi = this.publicApi.bind(this);
		this.wallet = this.wallet.bind(this);
		this.smartContracts = this.smartContracts.bind(this);
	}

	public privateApi(): PrivateApiClient {
		return this.privateApiClient;
	}
	public publicApi(): PublicApiClient {
		return this.publicApiClient;
	}
	public wallet(): Wallet {
		return this.massaWallet;
	}
	public smartContracts(): SmartContractUtils {
		return this.smartContractUtils;
	}
}