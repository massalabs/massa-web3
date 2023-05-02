import { DefaultProviderUrls } from '../web3/ClientFactory';
import { IPrivateApiClient } from './IPrivateApiClient';
import { IProvider } from './IProvider';
import { IPublicApiClient } from './IPublicApiClient';
import { ISmartContractsClient } from './ISmartContractsClient';
import { IWalletClient } from './IWalletClient';

/**
 * Represents the main client interface for interacting with the blockchain.
 * @remarks
 * This interface is used to access various APIs, including private and public
 * APIs, wallet, and smart contracts. It also provides methods for setting
 * custom and default providers.
 */
export interface IClient {
  privateApi(): IPrivateApiClient;
  publicApi(): IPublicApiClient;
  wallet(): IWalletClient;
  smartContracts(): ISmartContractsClient;
  setCustomProviders(providers: Array<IProvider>): void;
  setNewDefaultProvider(provider: DefaultProviderUrls): void;
}
