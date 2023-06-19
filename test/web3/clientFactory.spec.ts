import {
  ClientFactory,
  DefaultProviderUrls,
} from '../../src/web3/ClientFactory';
import { WalletClient } from '../../src/web3/WalletClient';
import { Client } from '../../src/web3/Client';
import { IAccount } from '../../src/interfaces/IAccount';

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
});
