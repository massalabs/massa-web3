import { BaseClient } from '../../src/web3/BaseClient';
import { IProvider, ProviderType } from '../../src/interfaces/IProvider';
import { IClientConfig } from '../../src/interfaces/IClientConfig';
import { JSON_RPC_REQUEST_METHOD } from '../../src/interfaces/JsonRpcMethods';
import axios, { AxiosRequestHeaders } from 'axios';

jest.mock('axios');

const publicApi = 'http://mock-public-api.com';
const privateApi = 'http://mock-private-api.com';

// For local testing:
// const publicApi = 'http://127.0.0.1:33035';
// const privateApi = 'http://127.0.0.1:33034';

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
}

describe('BaseClient', () => {
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
