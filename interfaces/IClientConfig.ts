import { IProvider } from "./IProvider";

export interface IClientConfig {
	providers: Array<IProvider>;
	defaultProviderIndex?: number;
	retryStrategyOn?: boolean;
}
