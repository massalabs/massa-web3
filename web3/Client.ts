import { IClientConfig } from "../interfaces/IClientConfig";
import { IAccount } from "../interfaces/IAccount";
import { BaseClient } from "./BaseClient";
import { PrivateApiClient } from "./PrivateApiClient";
import { PublicApiClient } from "./PublicApiClient";
import { WalletClient } from "./WalletClient";
import { SmartContractUtils } from "./SmartContractUtils";

export class Client {
	private smartContractUtils: SmartContractUtils;
	private privateApiClient: PrivateApiClient;
	private publicApiClient: PublicApiClient;
	private massaWallet: WalletClient;

	public constructor(clientConfig: IClientConfig, baseAccount?: IAccount) {
		this.publicApiClient =  new PublicApiClient(clientConfig);
		this.privateApiClient =  new PrivateApiClient(clientConfig);
		this.massaWallet =  new WalletClient(clientConfig, this.publicApiClient, baseAccount);
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
	public wallet(): WalletClient {
		return this.massaWallet;
	}
	public smartContracts(): SmartContractUtils {
		return this.smartContractUtils;
	}
}