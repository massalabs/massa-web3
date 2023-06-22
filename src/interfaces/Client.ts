import { DefaultProviderUrls } from '../web3/ClientFactory';
import { PrivateApiClient } from './PrivateApiClient';
import { Provider } from './Provider';
import { PublicApiClient } from './PublicApiClient';
import { SmartContractsClient } from './SmartContractsClient';
import { WalletClient } from './WalletClient';

/**
 * Represents the client object.
 *
 * @remarks
 * This interface is used to set private and public APIs. It also provides methods for setting
 * custom and default providers. The default providers are the global connection URLs
 * for Massa's MAINNET, TESTNET, and LABNET.
 *
 * @see privateApi() - A function that returns an instance of the private API client.
 * @see publicApi() - A function that returns an instance of the public API client.
 * @see wallet() - A function that returns an instance of the wallet client.
 * @see smartContracts() - A function that returns an instance of the smart contracts client.
 * @see setCustomProviders - A method for setting custom providers.
 * @see setNewDefaultProvider - A method for setting a new default provider.
 */
export interface Client {
  privateApi(): PrivateApiClient;
  publicApi(): PublicApiClient;
  wallet(): WalletClient;
  smartContracts(): SmartContractsClient;
  setCustomProviders(providers: Array<Provider>): void;
  setNewDefaultProvider(provider: DefaultProviderUrls): void;
}
