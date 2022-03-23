import { IProvider, ProviderType } from "../interfaces/IProvider";
import { IAccount } from "../interfaces/IAccount";
import { Client } from "./Client";
import { IClientConfig } from "../interfaces/IClientConfig";

/** Global connection urls, for Massa's MAINNET, TESTNET and LABNET */
export enum DefaultProviderUrls {
	MAINNET = "https://massa.net/api/v2",
	TESTNET = "https://test.massa.net/api/v2",
	LABNET = "http://145.239.66.206:33035/api/v2"
}

/** Massa Web3 Client Factory for easy initialization */
export class ClientFactory {

	/** Factory Method for easy initializing a client using a default provider */
	public static createDefaultClient(provider: DefaultProviderUrls, retryStrategyOn: boolean = true, baseAccount?: IAccount): Client {
		const providers = new Array({
			url: provider,
			type: ProviderType.PUBLIC
		} as IProvider,
		{
			url: provider,
			type: ProviderType.PRIVATE
		} as IProvider);

		const client: Client = new Client({
			retryStrategyOn,
			providers,
		} as IClientConfig, baseAccount);
		return client;
	}

	/** Factory Method for easy initializing a client using a custom set of private and public providers. Suitable for local node interaction */
	public static createCustomClient(providers: Array<IProvider>, retryStrategyOn: boolean = true, baseAccount?: IAccount): Client {
		const client: Client = new Client({
			retryStrategyOn,
			providers
		} as IClientConfig, baseAccount);
		return client;
	}
}