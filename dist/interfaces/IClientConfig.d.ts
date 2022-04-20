import { IProvider } from "./IProvider";
export interface IClientConfig {
    providers: Array<IProvider>;
    retryStrategyOn?: boolean;
    periodOffset: number | null;
}
