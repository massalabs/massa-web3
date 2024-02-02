import { ClientFactory } from '../../src/web3/ClientFactory'
import { WalletClient } from '../../src/web3/WalletClient'
import { ProviderType } from '../../src/interfaces/IProvider'
import { Client } from '../../src/web3/Client'
import { IAccount } from '../../src/interfaces/IAccount'
import { BUILDNET_CHAIN_ID } from './mockData'
import { DefaultProviderUrls } from '@massalabs/web3-utils'

const publicApi = 'https://mock-public-api.com'
const privateApi = 'https://mock-private-api.com'
const chainId = BUILDNET_CHAIN_ID

describe('ClientFactory', () => {
  describe('createDefaultClient', () => {
    test('should create a default client with the specified provider', async () => {
      const provider = DefaultProviderUrls.TESTNET
      const baseAccount: IAccount =
        await WalletClient.walletGenerateNewAccount()

      const client = await ClientFactory.createDefaultClient(
        provider,
        chainId,
        true,
        baseAccount
      )

      expect(client).toBeInstanceOf(Client)
      expect(client.getProviders()).toHaveLength(2)

      const publicProvider = client.getPublicProviders()[0]
      const privateProvider = client.getPrivateProviders()[0]

      expect(publicProvider?.url).toBe(provider)
      expect(privateProvider?.url).toBe(provider)
    })

    test('should create a default client without a base account if not provided', async () => {
      const provider = DefaultProviderUrls.MAINNET

      const client = await ClientFactory.createDefaultClient(
        provider,
        chainId,
        true
      )

      expect(client).toBeInstanceOf(Client)
      expect(client.getProviders()).toHaveLength(2)
      expect(client.wallet().getBaseAccount()).toBeUndefined()
    })
  })

  describe('createCustomClient', () => {
    test('should create a custom client with the specified providers', async () => {
      const providers = [
        { url: publicApi, type: ProviderType.PUBLIC },
        { url: privateApi, type: ProviderType.PRIVATE },
      ]
      const baseAccount: IAccount =
        await WalletClient.walletGenerateNewAccount()

      const client = await ClientFactory.createCustomClient(
        providers,
        chainId,
        true,
        baseAccount
      )

      expect(client).toBeInstanceOf(Client)
      expect(client.getProviders()).toHaveLength(2)
      expect(client.getProviders()).toEqual(providers)
    })

    test('should create a custom client without a base account if not provided', async () => {
      const providers = [
        { url: publicApi, type: ProviderType.PUBLIC },
        { url: privateApi, type: ProviderType.PRIVATE },
      ]

      const client = await ClientFactory.createCustomClient(
        providers,
        chainId,
        true
      )

      expect(client).toBeInstanceOf(Client)
      expect(client.getProviders()).toHaveLength(2)
      expect(client.getProviders()).toEqual(providers)
      expect(client.wallet().getBaseAccount()).toBeUndefined()
    })
  })
})
