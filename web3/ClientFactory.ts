import { IProvider, ProviderType } from "../interfaces/IProvider";
import { IAccount } from "../interfaces/IAccount";
import { Client } from "./Client";
import { IClientConfig } from "../interfaces/IClientConfig";

// TODO: put the correct apis later!
export enum DefaultProviderUrls {
	MAINNET = "http://145.239.66.206:33035/api/v2",
	TESTNET = "http://145.239.66.206:33035/api/v2",
	LABNET = "http://145.239.66.206:33035/api/v2"
}

export class ClientFactory {
	public static createDefaultClient(provider: DefaultProviderUrls, baseAccount?: IAccount): Client {
		const providers = new Array({
			url: provider,
			type: ProviderType.PUBLIC
		} as IProvider);

		const client: Client = new Client({
			retryStrategyOn: true,
			providers,
		} as IClientConfig, baseAccount);
		return client;
	}

	public static createCustomClient(providers: Array<IProvider>, baseAccount?: IAccount): Client {
		const client: Client = new Client({
			retryStrategyOn: true,
			providers
		} as IClientConfig, baseAccount);
		return client;
	}
}