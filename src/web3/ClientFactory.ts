import { IProvider, ProviderType } from "../interfaces/IProvider";
import { IAccount } from "../interfaces/IAccount";
import { Client, getWsProvider } from "./Client";
import { IClientConfig } from "../interfaces/IClientConfig";

/**
 * Default Provider Urls
 * @enum
 */
export enum DefaultProviderUrls {
	/**
     * Massa's Mainnet json-rpc url
     */
	MAINNET = "https://massa.net/api/v2",
	/**
     * Massa's Testnet json-rpc url
     */
	TESTNET = "https://test.massa.net/api/v2",
	/**
     * Massa's Labnet json-rpc url (experimental)
     */
	LABNET = "https://labnet.massa.net/api/v2",
	/**
     * Massa's Localnet json-rpc url (local node)
     */
	LOCALNET = "http://127.0.0.1",
}

/**
 * Default Wesocket Provider Urls
 * @enum
 */
export enum DefaultWsProviderUrls {
	/**
     * Massa's Mainnet websocket url
     */
	MAINNET = "wss://massa.net/api/websocket",
	/**
     * Massa's Testnet websocket url
     */
	TESTNET = "wss://test.massa.net/api/websocket",
	/**
     * Massa's Labnet websocket url (experimental)
     */
	LABNET = "wss://labnet.massa.net/api/websocket",
	/**
     * Massa's Localnet websocket url (local node)
     */
	LOCALNET = "ws://localhost",
}

/**
 * Massa Web3 Client Factory for easy initialization of a Web3 Client
 *
 */
export class ClientFactory {

  /**
   * Factory Method for easy initializing a client using a default provider
   * 
   * @param provider - the default web3 provider
   * @param retryStrategyOn - a boolean showing if retry strategy is on or off
   * @param baseAccount - the executing base account
   * @returns a promise with the web3 `Client`
   */
  public static async createDefaultClient(provider: DefaultProviderUrls, retryStrategyOn = true, baseAccount?: IAccount): Promise<Client> {
    let publicProviderUrl = provider.toString();
    let privateProviderUrl = provider.toString();
    switch (provider) {
      // in the case of localnet append specific default ports to url
      case DefaultProviderUrls.LOCALNET: {
        privateProviderUrl = `${privateProviderUrl}:33034`;
        publicProviderUrl = `${publicProviderUrl}:33035`;
        break;
      }
      // all other networks should be public only access
      default: {
        break;
      }
    }

    const providers = [{
      url: publicProviderUrl,
      type: ProviderType.PUBLIC
    } as IProvider,
		{
		  url: privateProviderUrl,
		  type: ProviderType.PRIVATE
		} as IProvider,
		{
		  url: getWsProvider(provider),
		  type: ProviderType.WS
		} as IProvider];

    const client: Client = new Client({
      retryStrategyOn,
      providers,
    } as IClientConfig, baseAccount);

    await client.wallet().setBaseAccount(baseAccount);

    return client;
  }

  /**
   * Factory Method for easy initializing a client using a custom set of private and public providers.
   * 
   * @param provider - the custom web3 providers
   * @param retryStrategyOn - a boolean showing if retry strategy is on or off
   * @param baseAccount - the executing base account
   * @returns a promise with the web3 `Client`
   */
  public static async createCustomClient(providers: Array<IProvider>, retryStrategyOn = true, baseAccount?: IAccount): Promise<Client> {
    const client: Client = new Client({
      retryStrategyOn,
      providers
    } as IClientConfig, baseAccount);

    await client.wallet().setBaseAccount(baseAccount);

    return client;
  }
}
