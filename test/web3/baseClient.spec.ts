import { BaseClient } from '../../src/web3/BaseClient';
import { IProvider, ProviderType } from '../../src/interfaces/IProvider';
import { IClientConfig } from '../../src/interfaces/IClientConfig';

// for CI testing:
// const publicApi = 'https://test.massa.net/api/v2:33035';
// const privateApi = 'https://test.massa.net/api/v2:33034';

// For local testing:
const publicApi = 'http://127.0.0.1:33035';
const privateApi = 'http://127.0.0.1:33034';

describe('BaseClient', () => {
  describe('getPrivateProviders', () => {
    test('getPrivateProviders should return an array of private providers', () => {
      const clientConfig: IClientConfig = {
        providers: [
          { url: publicApi, type: ProviderType.PUBLIC } as IProvider,
          { url: privateApi, type: ProviderType.PRIVATE } as IProvider,
        ],
        periodOffset: 0,
      };

      const baseClient = new BaseClient(clientConfig);
      const privateProviders = baseClient.getPrivateProviders();

      expect(privateProviders).toHaveLength(1);
      expect(privateProviders[0].url).toBe(privateApi);
      expect(privateProviders[0].type).toBe(ProviderType.PRIVATE);
    });
  });
});
