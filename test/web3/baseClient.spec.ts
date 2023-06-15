import { BaseClient } from '../../src/web3/BaseClient';
import { IProvider, ProviderType } from '../../src/interfaces/IProvider';
import { IClientConfig } from '../../src/interfaces/IClientConfig';

// for CI testing:
// const publicApi = 'https://test.massa.net/api/v2:33035';
// const privateApi = 'https://test.massa.net/api/v2:33034';

// For local testing:
const publicApi = 'http://127.0.0.1:33035';
const privateApi = 'http://127.0.0.1:33034';

export const PERIOD_OFFSET = 5;

describe('BaseClient', () => {
  describe('setProviders', () => {
    test('setProviders should correctly set the new providers', () => {
      const clientConfig: IClientConfig = {
        providers: [
          {
            url: 'https://oldRpcUrlPublic/api',
            type: ProviderType.PUBLIC,
          } as IProvider,
          {
            url: 'https://oldRpcUrlPrivate/api',
            type: ProviderType.PRIVATE,
          } as IProvider,
        ],
        periodOffset: PERIOD_OFFSET,
      };

      const newProviders: Array<IProvider> = [
        {
          url: publicApi,
          type: ProviderType.PUBLIC,
        } as IProvider,
        {
          url: privateApi,
          type: ProviderType.PRIVATE,
        } as IProvider,
      ];

      const baseClient = new BaseClient(clientConfig);
      const oldPrivateProviders = baseClient.getPrivateProviders();
      const oldPublicProviders = baseClient.getPublicProviders();

      baseClient.setProviders(newProviders);

      const privateProviders = baseClient.getPrivateProviders();
      const publicProviders = baseClient.getPublicProviders();

      expect(oldPrivateProviders).toHaveLength(1);
      expect(oldPrivateProviders[0].url).toBe('https://oldRpcUrlPrivate/api');
      expect(oldPrivateProviders[0].type).toBe(ProviderType.PRIVATE);

      expect(oldPublicProviders).toHaveLength(1);
      expect(oldPublicProviders[0].url).toBe('https://oldRpcUrlPublic/api');
      expect(oldPublicProviders[0].type).toBe(ProviderType.PUBLIC);

      expect(privateProviders).toHaveLength(1);
      expect(privateProviders[0].url).toBe(privateApi);
      expect(privateProviders[0].type).toBe(ProviderType.PRIVATE);

      expect(publicProviders).toHaveLength(1);
      expect(publicProviders[0].url).toBe(publicApi);
      expect(publicProviders[0].type).toBe(ProviderType.PUBLIC);
    });

    test('setProviders should throw an error when passed an empty array', () => {
      const clientConfig: IClientConfig = {
        providers: [
          { url: publicApi, type: ProviderType.PUBLIC } as IProvider,
          { url: privateApi, type: ProviderType.PRIVATE } as IProvider,
        ],
        periodOffset: PERIOD_OFFSET,
      };

      const baseClient = new BaseClient(clientConfig);

      expect(() =>
        baseClient.setProviders([
          { url: privateApi, type: ProviderType.PRIVATE } as IProvider,
        ]),
      ).toThrow(
        'Cannot set providers with no public providers. Need at least one',
      );
      expect(() =>
        baseClient.setProviders([
          { url: publicApi, type: ProviderType.PUBLIC } as IProvider,
        ]),
      ).toThrow(
        'Cannot set providers with no private providers. Need at least one',
      );
    });

    test('setProviders should correctly set multiple providers of the same type', () => {
      const clientConfig: IClientConfig = {
        providers: [
          { url: publicApi, type: ProviderType.PUBLIC } as IProvider,
          { url: privateApi, type: ProviderType.PRIVATE } as IProvider,
        ],
        periodOffset: PERIOD_OFFSET,
      };

      const newProviders: Array<IProvider> = [
        {
          url: 'http://new-public-api-1.com',
          type: ProviderType.PUBLIC,
        } as IProvider,
        {
          url: 'http://new-public-api-2.com',
          type: ProviderType.PUBLIC,
        } as IProvider,
        {
          url: 'http://new-private-api-1.com',
          type: ProviderType.PRIVATE,
        } as IProvider,
        {
          url: 'http://new-private-api-2.com',
          type: ProviderType.PRIVATE,
        } as IProvider,
      ];

      const baseClient = new BaseClient(clientConfig);
      baseClient.setProviders(newProviders);

      const privateProviders = baseClient.getPrivateProviders();
      const publicProviders = baseClient.getPublicProviders();

      expect(privateProviders).toHaveLength(2);
      expect(privateProviders[0].url).toBe('http://new-private-api-1.com');
      expect(privateProviders[1].url).toBe('http://new-private-api-2.com');

      expect(publicProviders).toHaveLength(2);
      expect(publicProviders[0].url).toBe('http://new-public-api-1.com');
      expect(publicProviders[1].url).toBe('http://new-public-api-2.com');
    });
  });

  describe('getPrivateProviders', () => {
    test('getPrivateProviders should return an array of private providers', () => {
      const clientConfig: IClientConfig = {
        providers: [
          { url: publicApi, type: ProviderType.PUBLIC } as IProvider,
          { url: privateApi, type: ProviderType.PRIVATE } as IProvider,
        ],
        periodOffset: PERIOD_OFFSET,
      };

      const baseClient = new BaseClient(clientConfig);
      const privateProviders = baseClient.getPrivateProviders();

      expect(privateProviders).toHaveLength(1);
      expect(privateProviders[0].url).toBe(privateApi);
      expect(privateProviders[0].type).toBe(ProviderType.PRIVATE);
    });
  });

  describe('getPublicProviders', () => {
    test('getPublicProviders should return an array of public providers', () => {
      const clientConfig: IClientConfig = {
        providers: [
          { url: publicApi, type: ProviderType.PUBLIC } as IProvider,
          { url: privateApi, type: ProviderType.PRIVATE } as IProvider,
        ],
        periodOffset: PERIOD_OFFSET,
      };

      const baseClient = new BaseClient(clientConfig);
      const publicProviders = baseClient.getPublicProviders();

      expect(publicProviders).toHaveLength(1);
      expect(publicProviders[0].url).toBe(publicApi);
      expect(publicProviders[0].type).toBe(ProviderType.PUBLIC);
    });
  });
});
