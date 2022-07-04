import { DefaultProviderUrls } from "../web3/ClientFactory";
import { IPrivateApiClient } from "./IPrivateApiClient";
import { IProvider } from "./IProvider";
import { IPublicApiClient } from "./IPublicApiClient";
import { ISmartContractsClient } from "./ISmartContractsClient";
import { IVaultClient } from "./IVaultClient";
import { IWalletClient } from "./IWalletClient";
export interface IClient {
    privateApi(): IPrivateApiClient;
    publicApi(): IPublicApiClient;
    wallet(): IWalletClient;
    smartContracts(): ISmartContractsClient;
    vault(): IVaultClient;
    setCustomProviders(providers: Array<IProvider>): void;
    setNewDefaultProvider(provider: DefaultProviderUrls): void;
}
