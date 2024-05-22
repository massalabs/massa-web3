import { DefaultProviderUrls } from '@massalabs/web3-utils'
import { IPrivateApiClient } from './IPrivateApiClient'
import { IProvider } from './IProvider'
import { IPublicApiClient } from './IPublicApiClient'
import { ISmartContractsClient } from './ISmartContractsClient'
import { IWalletClient } from './IWalletClient'
import { MnsResolver } from '../web3/MnsResolver'

/**
 * Represents the client object.
 *
 * @remarks
 * This interface is used to set private and public APIs. It also provides methods for setting
 * custom and default providers. The default providers are the global connection URLs
 * for Massa's MAINNET, TESTNET, LABNET, LOCALNET and BUILDNET.
 *
 * @see privateApi() - A function that returns an instance of the private API client.
 * @see publicApi() - A function that returns an instance of the public API client.
 * @see wallet() - A function that returns an instance of the wallet client.
 * @see smartContracts() - A function that returns an instance of the smart contracts client.
 * @see mnsResolver() - A function that returns an instance of the MNS resolver.
 * @see setCustomProviders - A method for setting custom providers.
 * @see setNewDefaultProvider - A method for setting a new default provider.
 * @see setNewMnsResolver - A method for setting a new MNS resolver.
 */
export interface IClient {
  privateApi(): IPrivateApiClient
  publicApi(): IPublicApiClient
  wallet(): IWalletClient
  smartContracts(): ISmartContractsClient
  mnsResolver(): MnsResolver
  setCustomProviders(providers: Array<IProvider>): void
  setNewDefaultProvider(provider: DefaultProviderUrls): void
  setNewMnsResolver(contractAddress: string): void
}
