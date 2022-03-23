import { IClientConfig } from "../interfaces/IClientConfig";
import { IAccount } from "../interfaces/IAccount";
import { PrivateApiClient } from "./PrivateApiClient";
import { PublicApiClient } from "./PublicApiClient";
import { WalletClient } from "./WalletClient";
import { SmartContractsClient } from "./SmartContractsClient";

/** Massa Web3 Client wrapping all public, private, wallet and smart-contracts-related functionalities */
export class Client {
	private publicApiClient: PublicApiClient;
	private privateApiClient: PrivateApiClient;
	private walletClient: WalletClient;
	private smartContractsClient: SmartContractsClient;

	public constructor(clientConfig: IClientConfig, baseAccount?: IAccount) {
		this.publicApiClient =  new PublicApiClient(clientConfig);
		this.privateApiClient =  new PrivateApiClient(clientConfig);
		this.walletClient =  new WalletClient(clientConfig, this.publicApiClient, baseAccount);
		this.smartContractsClient = new SmartContractsClient(clientConfig, this.publicApiClient, this.walletClient);

		// exposed and bound class methods
		this.privateApi = this.privateApi.bind(this);
		this.publicApi = this.publicApi.bind(this);
		this.wallet = this.wallet.bind(this);
		this.smartContracts = this.smartContracts.bind(this);
	}

	/** Private Api related RPC methods */
	public privateApi(): PrivateApiClient {
		return this.privateApiClient;
	}

	/** Public Api related RPC methods */
	public publicApi(): PublicApiClient {
		return this.publicApiClient;
	}

	/** Wallet related methods */
	public wallet(): WalletClient {
		return this.walletClient;
	}

	/** Smart Contracts related methods */
	public smartContracts(): SmartContractsClient {
		return this.smartContractsClient;
	}
}