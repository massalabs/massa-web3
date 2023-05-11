import { DefaultProviderUrls } from '../web3/ClientFactory';
import { IPrivateApiClient } from './IPrivateApiClient';
import { IProvider } from './IProvider';
import { IPublicApiClient } from './IPublicApiClient';
import { ISmartContractsClient } from './ISmartContractsClient';
import { IWalletClient } from './IWalletClient';

/**
 * Represents the client object.
 * 
 * @remarks
 * This interface is used to set private and public APIs. It also provides methods for setting
 * custom and default providers. The default providers are the global connection URLs
 * for Massa's MAINNET, TESTNET and LABNET.
 */
export interface IClient {
  privateApi(): IPrivateApiClient;
  publicApi(): IPublicApiClient;
  wallet(): IWalletClient;
  smartContracts(): ISmartContractsClient;
  setCustomProviders(providers: Array<IProvider>): void;
  setNewDefaultProvider(provider: DefaultProviderUrls): void;
}
