import {
  ClientFactory,
  DefaultProviderUrls,
} from '../../src/web3/ClientFactory';
import { WalletClient } from '../../src/web3/WalletClient';
import { ProviderType } from '../../src/interfaces/IProvider';
import { Client } from '../../src/web3/Client';
import { IAccount } from '../../src/interfaces/IAccount';
import { expect, test, describe } from '@jest/globals';

const publicApi = 'https://mock-public-api.com';
const privateApi = 'https://mock-private-api.com';

describe('ClientFactory', () => {
  describe('createDefaultClient', () => {
    test('should create a default client with the specified provider', async () => {
      const provider = DefaultProviderUrls.TESTNET;
      const baseAccount: IAccount =
        await WalletClient.walletGenerateNewAccount();

      const client = await ClientFactory.createDefaultClient(
        provider,
        true,
        baseAccount,
      );

      expect(client).toBeInstanceOf(Client);
      expect(client.getProviders()).toHaveLength(2);

      const publicProvider = client.getPublicProviders()[0];
      const privateProvider = client.getPrivateProviders()[0];

      expect(publicProvider?.url).toBe(provider);
      expect(privateProvider?.url).toBe(provider);
    });

    test('should create a default client without a base account if not provided', async () => {
      const provider = DefaultProviderUrls.MAINNET;

      const client = await ClientFactory.createDefaultClient(provider, true);

      expect(client).toBeInstanceOf(Client);
      expect(client.getProviders()).toHaveLength(2);
      expect(client.wallet().getBaseAccount()).toBeUndefined();
    });
  });

  describe('createCustomClient', () => {
    test('should create a custom client with the specified providers', async () => {
      const providers = [
        { url: publicApi, type: ProviderType.PUBLIC },
        { url: privateApi, type: ProviderType.PRIVATE },
      ];
      const baseAccount: IAccount =
        await WalletClient.walletGenerateNewAccount();

      const client = await ClientFactory.createCustomClient(
        providers,
        true,
        baseAccount,
      );

      expect(client).toBeInstanceOf(Client);
      expect(client.getProviders()).toHaveLength(2);
      expect(client.getProviders()).toEqual(providers);
    });

    test('should create a custom client without a base account if not provided', async () => {
      const providers = [
        { url: publicApi, type: ProviderType.PUBLIC },
        { url: privateApi, type: ProviderType.PRIVATE },
      ];

      const client = await ClientFactory.createCustomClient(providers, true);

      expect(client).toBeInstanceOf(Client);
      expect(client.getProviders()).toHaveLength(2);
      expect(client.getProviders()).toEqual(providers);
      expect(client.wallet().getBaseAccount()).toBeUndefined();
    });
  });
});
