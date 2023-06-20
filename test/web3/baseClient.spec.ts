import { BaseClient } from '../../src/web3/BaseClient';
import { IProvider, ProviderType } from '../../src/interfaces/IProvider';
import { IClientConfig } from '../../src/interfaces/IClientConfig';

import { JSON_RPC_REQUEST_METHOD } from '../../src/interfaces/JsonRpcMethods';
import axios, { AxiosRequestHeaders } from 'axios';

jest.mock('axios');

const publicApi = 'https://mock-public-api.com';
const privateApi = 'https://mock-private-api.com';

export const PERIOD_OFFSET = 5;

const requestHeaders = {
  Accept:
    'application/json,text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Credentials': true,
  'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
} as AxiosRequestHeaders;

class TestBaseClient extends BaseClient {
  constructor(config: IClientConfig) {
    super(config);
  }

  public getSendJsonRPCRequest(
    method: JSON_RPC_REQUEST_METHOD,
    params: object,
  ) {
    return this.sendJsonRPCRequest(method, params);
  }

  public getPrivateProviders() {
    return super.getPrivateProviders();
  }

  public getPublicProviders() {
    return super.getPublicProviders();
  }
}

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

      const baseClient = new TestBaseClient(clientConfig);
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
          url: 'https://new-public-api-1.com',
          type: ProviderType.PUBLIC,
        } as IProvider,
        {
          url: 'https://new-public-api-2.com',
          type: ProviderType.PUBLIC,
        } as IProvider,
        {
          url: 'https://new-private-api-1.com',
          type: ProviderType.PRIVATE,
        } as IProvider,
        {
          url: 'https://new-private-api-2.com',
          type: ProviderType.PRIVATE,
        } as IProvider,
      ];

      const baseClient = new TestBaseClient(clientConfig);
      baseClient.setProviders(newProviders);

      const privateProviders = baseClient.getPrivateProviders();
      const publicProviders = baseClient.getPublicProviders();

      expect(privateProviders).toHaveLength(2);
      expect(privateProviders[0].url).toBe('https://new-private-api-1.com');
      expect(privateProviders[1].url).toBe('https://new-private-api-2.com');

      expect(publicProviders).toHaveLength(2);
      expect(publicProviders[0].url).toBe('https://new-public-api-1.com');
      expect(publicProviders[1].url).toBe('https://new-public-api-2.com');
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

      const baseClient = new TestBaseClient(clientConfig);
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

      const baseClient = new TestBaseClient(clientConfig);
      const publicProviders = baseClient.getPublicProviders();

      expect(publicProviders).toHaveLength(1);
      expect(publicProviders[0].url).toBe(publicApi);
      expect(publicProviders[0].type).toBe(ProviderType.PUBLIC);
    });
  });

  describe('sendJsonRPCRequest', () => {
    let baseClient: TestBaseClient;
    const mockAxios = axios as jest.Mocked<typeof axios>;

    beforeEach(() => {
      const clientConfig: IClientConfig = {
        providers: [
          { url: publicApi, type: ProviderType.PUBLIC } as IProvider,
          { url: privateApi, type: ProviderType.PRIVATE } as IProvider,
        ],
        periodOffset: PERIOD_OFFSET,
      };

      baseClient = new TestBaseClient(clientConfig);
      jest.resetAllMocks();
    });

    test('should use public provider for public RPC methods', async () => {
      const mockResponse = {
        data: {
          result: {
            error: null,
            isError: false,
            result: 'some data returned from the API',
          },
          error: null,
          isError: false,
        },
      };

      mockAxios.post.mockResolvedValueOnce(mockResponse);

      const result = await baseClient.getSendJsonRPCRequest(
        JSON_RPC_REQUEST_METHOD.GET_STATUS, // public method
        {},
      );

      expect(mockAxios.post).toHaveBeenCalledTimes(1);
      expect(mockAxios.post).toHaveBeenCalledWith(
        publicApi, // <-- We check here that the public API is used
        {
          jsonrpc: '2.0',
          id: 0,
          method: JSON_RPC_REQUEST_METHOD.GET_STATUS,
          params: {},
        },
        requestHeaders,
      );

      expect(result).toEqual(mockResponse.data.result);
    });

    test('should use private provider for private RPC methods', async () => {
      const mockResponse = {
        data: {
          result: {
            error: null,
            isError: false,
            result: 'some data returned from the API',
          },
          error: null,
          isError: false,
        },
      };

      mockAxios.post.mockResolvedValueOnce(mockResponse);

      const result = await baseClient.getSendJsonRPCRequest(
        JSON_RPC_REQUEST_METHOD.STOP_NODE, // private method
        {},
      );

      expect(mockAxios.post).toHaveBeenCalledTimes(1);
      expect(mockAxios.post).toHaveBeenCalledWith(
        privateApi, // <-- We check here that the private API is used
        {
          jsonrpc: '2.0',
          id: 0,
          method: JSON_RPC_REQUEST_METHOD.STOP_NODE,
          params: {},
        },
        requestHeaders,
      );

      expect(result).toEqual(mockResponse.data.result);
    });

    test('should throw an error for unknown RPC methods', async () => {
      const mockResponse = {
        data: {
          result: {
            error: null,
            isError: false,
            result: 'some data returned from the API',
          },
          error: null,
          isError: false,
        },
      };

      mockAxios.post.mockResolvedValueOnce(mockResponse);

      const unknownMethod = 'unknownMethod' as JSON_RPC_REQUEST_METHOD;

      await expect(
        baseClient.getSendJsonRPCRequest(unknownMethod, {}),
      ).rejects.toThrowError(`Unknown Json rpc method: ${unknownMethod}`);
    });

    test('should throw an error if no private providers are configured', async () => {
      const clientConfig: IClientConfig = {
        providers: [{ url: publicApi, type: ProviderType.PUBLIC } as IProvider],
        periodOffset: PERIOD_OFFSET,
      };

      const createClient = () => {
        baseClient = new TestBaseClient(clientConfig);
      };

      expect(createClient).toThrowError(
        'Cannot initialize web3 with no private providers. Need at least one',
      );
    });

    test('should throw an error if no public providers are configured', async () => {
      const clientConfig: IClientConfig = {
        providers: [
          { url: privateApi, type: ProviderType.PRIVATE } as IProvider,
        ],
        periodOffset: PERIOD_OFFSET,
      };

      const createClient = () => {
        baseClient = new TestBaseClient(clientConfig);
      };

      expect(createClient).toThrowError(
        'Cannot initialize web3 with no public providers. Need at least one',
      );
    });

    test('should handle JSON-RPC error responses', async () => {
      const mockResponse = {
        data: {
          result: null,
          error: {
            code: -32600,
            message: 'Invalid Request',
          },
          id: null,
          jsonrpc: '2.0',
        },
      };

      mockAxios.post.mockResolvedValueOnce(mockResponse);

      await expect(
        baseClient.getSendJsonRPCRequest(
          JSON_RPC_REQUEST_METHOD.GET_STATUS,
          {},
        ),
      ).rejects.toThrowError('Invalid Request');
    });
  });
});
