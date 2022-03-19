import { IProvider, ProviderType } from "../interfaces/IProvider";
import { IAccount } from "../interfaces/IAccount";
import { Client } from "./Client";
import { IClientConfig } from "../interfaces/IClientConfig";

// TODO: put the correct apis later!
export enum DefaultProviderUrls {
	MAINNET = "https://massa.net/api/v2",
	TESTNET = "https://test.massa.net/api/v2",
	LABNET = "http://145.239.66.206:33035/api/v2"
}

export class ClientFactory {
	public static createDefaultClient(provider: DefaultProviderUrls, retryStrategyOn: boolean = false, baseAccount?: IAccount): Client {
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

	public static createCustomClient(providers: Array<IProvider>, retryStrategyOn: boolean = false, baseAccount?: IAccount): Client {
		const client: Client = new Client({
			retryStrategyOn,
			providers
		} as IClientConfig, baseAccount);
		return client;
	}
}