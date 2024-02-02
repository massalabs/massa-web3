import { IProvider } from './IProvider'

/**
 * This interface is used to configure the client.
 *
 * @see providers of type `Array<IProvider>` is an array of providers used for API requests.
 * @see retryStrategyOn of type `boolean` (optional) is a flag to enable or disable the retry strategy.
 * @see periodOffset of type `number | null` is the period offset in seconds for syncing with the blockchain.
 * @see pingTimeoutMs of type `number` (optional) is the ping timeout in milliseconds for the provider.
 */
export interface IClientConfig {
  providers: Array<IProvider>
  retryStrategyOn?: boolean
  periodOffset?: number | null
  pingTimeoutMs?: number
}
