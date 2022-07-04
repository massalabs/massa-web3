import { IClientConfig } from "../interfaces/IClientConfig";
import { IAccount } from "../interfaces/IAccount";
import { PrivateApiClient } from "./PrivateApiClient";
import { PublicApiClient } from "./PublicApiClient";
import { WalletClient } from "./WalletClient";
import { SmartContractsClient } from "./SmartContractsClient";
import { VaultClient } from "./VaultClient";
import { IProvider, ProviderType } from "../interfaces/IProvider";
import { DefaultProviderUrls } from "./ClientFactory";
import { IClient } from "../interfaces/IClient";



/** Massa Web3 Client wrapping all public, private, wallet and smart-contracts-related functionalities */
export class Client implements IClient {
	private publicApiClient: PublicApiClient;
	private privateApiClient: PrivateApiClient;
	private walletClient: WalletClient;
	private smartContractsClient: SmartContractsClient;
	private vaultClient: VaultClient;

	public constructor(clientConfig: IClientConfig, baseAccount?: IAccount) {
		this.publicApiClient = new PublicApiClient(clientConfig);
		this.privateApiClient = new PrivateApiClient(clientConfig);
		this.walletClient = new WalletClient(clientConfig, this.publicApiClient, baseAccount);
		this.smartContractsClient = new SmartContractsClient(clientConfig, this.publicApiClient, this.walletClient);
		this.vaultClient = new VaultClient(clientConfig, this.walletClient);

		// exposed and bound class methods
		this.privateApi = this.privateApi.bind(this);
		this.publicApi = this.publicApi.bind(this);
		this.wallet = this.wallet.bind(this);
		this.smartContracts = this.smartContracts.bind(this);
		this.setCustomProviders = this.setCustomProviders.bind(this);
		this.setNewDefaultProvider = this.setNewDefaultProvider.bind(this);
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

	/** Vault related methods */
	public vault(): VaultClient {
		return this.vaultClient;
	}

	/** set new providers */
	public setCustomProviders(providers: Array<IProvider>): void {
		this.publicApiClient.setProviders(providers);
		this.privateApiClient.setProviders(providers);
		this.walletClient.setProviders(providers);
		this.smartContractsClient.setProviders(providers);
	}

	public setNewDefaultProvider(provider: DefaultProviderUrls): void {
		const providers = new Array({
			url: provider,
			type: ProviderType.PUBLIC
		} as IProvider,
		{
			url: provider,
			type: ProviderType.PRIVATE
		} as IProvider);
		this.publicApiClient.setProviders(providers);
		this.privateApiClient.setProviders(providers);
		this.walletClient.setProviders(providers);
		this.smartContractsClient.setProviders(providers);
	}
}
