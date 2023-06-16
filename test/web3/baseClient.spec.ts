import { BaseClient } from '../../src/web3/BaseClient';
import { IProvider, ProviderType } from '../../src/interfaces/IProvider';
import { IClientConfig } from '../../src/interfaces/IClientConfig';
import { JSON_RPC_REQUEST_METHOD } from '../../src/interfaces/JsonRpcMethods';
import nock from 'nock';

// for CI testing:
const publicApi = 'https://test.massa.net/api/v2:33035';
const privateApi = 'https://test.massa.net/api/v2:33034';

// For local testing:
// const publicApi = 'http://127.0.0.1:33035';
// const privateApi = 'http://127.0.0.1:33034';

export const PERIOD_OFFSET = 5;

class TestBaseClient extends BaseClient {
  constructor(config: IClientConfig) {
    super(config);
  }

  public getPrivateProviders() {
    return super.getPrivateProviders();
  }

  public getPublicProviders() {
    return super.getPublicProviders();
  }
}

describe('BaseClient', () => {
  describe('getProviderForRpcMethod', () => {
    test('getProviderForRpcMethod should return a public provider for public RPC methods', () => {
      const clientConfig: IClientConfig = {
        providers: [
          { url: publicApi, type: ProviderType.PUBLIC } as IProvider,
          { url: privateApi, type: ProviderType.PRIVATE } as IProvider,
        ],
        periodOffset: PERIOD_OFFSET,
      };

      const baseClient = new BaseClient(clientConfig);
      const provider = baseClient.getProviderForRpcMethod(
        JSON_RPC_REQUEST_METHOD.GET_ADDRESSES,
      );

      expect(provider.url).toBe(publicApi);
      expect(provider.type).toBe(ProviderType.PUBLIC);
    });

    test('getProviderForRpcMethod should return a private provider for private RPC methods', () => {
      const clientConfig: IClientConfig = {
        providers: [
          { url: publicApi, type: ProviderType.PUBLIC } as IProvider,
          { url: privateApi, type: ProviderType.PRIVATE } as IProvider,
        ],
        periodOffset: PERIOD_OFFSET,
      };

      const baseClient = new BaseClient(clientConfig);
      const provider = baseClient.getProviderForRpcMethod(
        JSON_RPC_REQUEST_METHOD.STOP_NODE,
      );

      expect(provider.url).toBe(privateApi);
      expect(provider.type).toBe(ProviderType.PRIVATE);
    });

    test('getProviderForRpcMethod should throw an error for unknown RPC methods', () => {
      const clientConfig: IClientConfig = {
        providers: [
          { url: publicApi, type: ProviderType.PUBLIC } as IProvider,
          { url: privateApi, type: ProviderType.PRIVATE } as IProvider,
        ],
        periodOffset: PERIOD_OFFSET,
      };

      const baseClient = new BaseClient(clientConfig);

      expect(() => {
        baseClient.getProviderForRpcMethod(
          'UNKNOWN_METHOD' as JSON_RPC_REQUEST_METHOD,
        );
      }).toThrow(Error);
    });
  });

  describe('promisifyJsonRpcCall', () => {
    let baseClient: BaseClient;
    const clientConfig: IClientConfig = {
      providers: [
        {
          url: 'http://mock-public-api.com',
          type: ProviderType.PUBLIC,
        } as IProvider,
        {
          url: 'http://mock-private-api.com',
          type: ProviderType.PRIVATE,
        } as IProvider,
      ],
      periodOffset: PERIOD_OFFSET,
    };

    beforeEach(() => {
      baseClient = new BaseClient(clientConfig);
    });

    afterEach(() => {
      nock.cleanAll();
    });

    test('should return a successful response', async () => {
      nock('http://mock-public-api.com').post('/').reply(200, {
        jsonrpc: '2.0',
        id: 0,
        result: 'success',
      });

      // posting public method to public API
      const result = await baseClient['promisifyJsonRpcCall'](
        JSON_RPC_REQUEST_METHOD.GET_STATUS,
        {},
      );

      expect(result.isError).toBeFalsy();
      expect(result.result).toEqual('success');
    });

    test('should return an error response', async () => {
      // error when trying to post the request
      nock('http://mock-public-api.com')
        .post('/')
        .replyWithError('Something went wrong');

      const result = await baseClient['promisifyJsonRpcCall'](
        JSON_RPC_REQUEST_METHOD.GET_STATUS,
        {},
      );

      expect(result.isError).toBeTruthy();
      expect(result.error).toBeInstanceOf(Error);
      expect(result.error?.message).toEqual(
        'JSON.parse error: Error: Something went wrong',
      );
    });

    test('should handle RPC errors', async () => {
      // post is successful, but the RPC method returns an error
      nock('http://mock-public-api.com')
        .post('/')
        .reply(200, {
          jsonrpc: '2.0',
          id: 0,
          error: { message: 'RPC error', code: -32603 },
        });

      const result = await baseClient['promisifyJsonRpcCall'](
        JSON_RPC_REQUEST_METHOD.GET_STATUS,
        {},
      );

      expect(result.isError).toBeTruthy();
      expect(result.error).toBeInstanceOf(Error);
      expect(result.error?.message).toEqual('RPC error');
    });
  });
});
