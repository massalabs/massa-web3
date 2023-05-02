import { DefaultProviderUrls } from '../web3/Client';
import { IPrivateApiClient } from './IPrivateApiClient';
import { IProvider } from './IProvider';
import { IPublicApiClient } from './IPublicApiClient';
import { ISmartContractsClient } from './ISmartContractsClient';
import { IWalletClient } from './IWalletClient';
export interface IClient {
    privateApi(): IPrivateApiClient;
    publicApi(): IPublicApiClient;
    wallet(): IWalletClient;
    smartContracts(): ISmartContractsClient;
    setCustomProviders(providers: Array<IProvider>): void;
    setNewDefaultProvider(provider: DefaultProviderUrls): void;
}
