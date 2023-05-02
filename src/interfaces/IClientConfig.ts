import { IProvider } from './IProvider';

/**
 * Represents the configuration for the main client interface.
 * @remarks
 * This interface is used to configure the client with an array of providers,
 * retry strategy, period offset, and ping timeout settings.
 */
export interface IClientConfig {
  providers: Array<IProvider>;
  retryStrategyOn?: boolean;
  periodOffset: number | null;
  pingTimeoutMs?: number;
}
