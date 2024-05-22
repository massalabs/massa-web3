import { IClientConfig } from '../interfaces/IClientConfig'
import { PrivateApiClient } from './PrivateApiClient'
import { PublicApiClient } from './PublicApiClient'
import { WalletClient } from './WalletClient'
import { SmartContractsClient } from './SmartContractsClient'
import { IProvider, ProviderType } from '../interfaces/IProvider'
import { IClient } from '../interfaces/IClient'
import { IBaseAccount } from '../interfaces/IBaseAccount'
import { DefaultProviderUrls } from '@massalabs/web3-utils'
import { MnsResolver } from './MnsResolver'

/**
 * Massa Web3 Client object wraps all public, private, wallet and smart-contracts-related functionalities.
 */
export class Client implements IClient {
  private mnsResolverVar: MnsResolver
  private publicApiClient: PublicApiClient
  private privateApiClient: PrivateApiClient
  private walletClient: WalletClient
  private smartContractsClient: SmartContractsClient

  /**
   * Constructor of the Client class.
   *
   * @param clientConfig - client configuration object.
   * @param baseAccount - base account to use for signing transactions (optional).
   * @param publicApiClient - public api client to use (optional).
   * @param mnsResolverAddress - MNS resolver address to use (optional).
   */
  public constructor(
    private clientConfig: IClientConfig,
    baseAccount?: IBaseAccount,
    publicApiClient?: PublicApiClient,
    mnsResolverAddress?: string
  ) {
    this.mnsResolverVar = new MnsResolver(clientConfig, mnsResolverAddress)
    this.publicApiClient = publicApiClient || new PublicApiClient(clientConfig)
    this.privateApiClient = new PrivateApiClient(clientConfig)
    this.walletClient = new WalletClient(
      clientConfig,
      this.publicApiClient,
      this.mnsResolverVar,
      baseAccount
    )
    this.smartContractsClient = new SmartContractsClient(
      clientConfig,
      this.publicApiClient,
      this.walletClient,
      this.mnsResolverVar
    )

    // subclients
    this.privateApi = this.privateApi.bind(this)
    this.publicApi = this.publicApi.bind(this)
    this.wallet = this.wallet.bind(this)
    this.smartContracts = this.smartContracts.bind(this)
    this.mnsResolver = this.mnsResolver.bind(this)
    // setters
    this.setCustomProviders = this.setCustomProviders.bind(this)
    this.setNewDefaultProvider = this.setNewDefaultProvider.bind(this)
    // getters
    this.getProviders = this.getProviders.bind(this)
    this.getPrivateProviders = this.getPrivateProviders.bind(this)
    this.getPublicProviders = this.getPublicProviders.bind(this)
  }

  /**
   * Get the private api related RPC methods.
   *
   * @returns PrivateApiClient object.
   */
  public privateApi(): PrivateApiClient {
    return this.privateApiClient
  }

  /**
   * Get the public api related RPC methods.
   *
   * @returns PublicApiClient object.
   */
  public publicApi(): PublicApiClient {
    return this.publicApiClient
  }

  /**
   * Get the Wallet related methods.
   *
   * @returns WalletClient object.
   */
  public wallet(): WalletClient {
    return this.walletClient
  }

  /**
   * Get the smart Contracts related methods.
   *
   * @returns SmartContractsClient object.
   */
  public smartContracts(): SmartContractsClient {
    return this.smartContractsClient
  }

  /**
   * Get the MNS resolver object.
   *
   * @returns MnsResolver object.
   */
  public mnsResolver(): MnsResolver {
    return this.mnsResolverVar
  }

  /**
   * Set new providers.
   *
   * @param providers - array of providers to set.
   */
  public setCustomProviders(providers: Array<IProvider>): void {
    this.publicApiClient.setProviders(providers)
    this.privateApiClient.setProviders(providers)
    this.walletClient.setProviders(providers)
    this.smartContractsClient.setProviders(providers)
  }

  /**
   * Get the currently set providers.
   *
   * @returns array of the known providers.
   */
  public getProviders(): Array<IProvider> {
    return this.clientConfig.providers
  }

  /**
   * Get all private providers.
   *
   * @returns all private providers.
   */
  public getPrivateProviders(): Array<IProvider> {
    return this.clientConfig.providers.filter(
      (provider) => provider.type === ProviderType.PRIVATE
    )
  }

  /**
   * Get all public providers
   *
   * @returns all public providers
   */
  public getPublicProviders(): Array<IProvider> {
    return this.clientConfig.providers.filter(
      (provider) => provider.type === ProviderType.PUBLIC
    )
  }

  /**
   * Set a new default json rpc provider.
   *
   * @param provider - The new default provider to set.
   */
  public setNewDefaultProvider(provider: DefaultProviderUrls): void {
    const providers = [
      {
        url: provider,
        type: ProviderType.PUBLIC,
      } as IProvider,
      {
        url: provider,
        type: ProviderType.PRIVATE,
      } as IProvider,
    ]
    this.publicApiClient.setProviders(providers)
    this.privateApiClient.setProviders(providers)
    this.walletClient.setProviders(providers)
    this.smartContractsClient.setProviders(providers)
  }

  /**
   * Set a new MNS resolver address.
   *
   * @param contractAddress - The new MNS resolver contract address.
   */
  public setNewMnsResolver(contractAddress: string): void {
    this.mnsResolverVar.setMnsResolver(contractAddress)
  }
}
