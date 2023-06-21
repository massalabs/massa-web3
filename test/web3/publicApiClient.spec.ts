import { PublicApiClient } from '../../src/web3/PublicApiClient';
import { JSON_RPC_REQUEST_METHOD } from '../../src/interfaces/JsonRpcMethods';
import { IClientConfig } from '../../src/interfaces/IClientConfig';
import { ProviderType, IProvider } from '../../src/interfaces/IProvider';
import { mockGraphInterval } from './mockData';

export const PERIOD_OFFSET = 5;

describe('PublicApiClient', () => {
  let client: PublicApiClient;
  let mockSendJsonRPCRequest: jest.SpyInstance;

  beforeEach(() => {
    const clientConfig: IClientConfig = {
      providers: [
        {
          url: 'https://mock-public-api.com',
          type: ProviderType.PUBLIC,
        } as IProvider,
        {
          url: 'https://mock-private-api.com',
          type: ProviderType.PRIVATE,
        } as IProvider,
      ],
      periodOffset: PERIOD_OFFSET,
    };
    client = new PublicApiClient(clientConfig);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mockSendJsonRPCRequest = jest.spyOn(client as any, 'sendJsonRPCRequest');
  });

  describe('getGraphInterval', () => {
    test('should call sendJsonRPCRequest with correct arguments', async () => {
      mockSendJsonRPCRequest.mockResolvedValue(
        Promise.resolve(mockGraphInterval),
      );

      await client.getGraphInterval(mockGraphInterval);

      expect(mockSendJsonRPCRequest).toHaveBeenCalledWith(
        JSON_RPC_REQUEST_METHOD.GET_GRAPH_INTERVAL,
        [mockGraphInterval],
      );
    });

    test('should return the correct result', async () => {
      mockSendJsonRPCRequest.mockResolvedValue(
        Promise.resolve(mockGraphInterval),
      );

      const result = await client.getGraphInterval(mockGraphInterval);

      expect(result).toEqual(mockGraphInterval);
    });

    // Write additional tests to handle any edge cases or error scenarios
    test('should handle errors correctly', async () => {
      const mockError = new Error('Error message');
      mockSendJsonRPCRequest.mockRejectedValue(mockError);

      await expect(client.getGraphInterval(mockGraphInterval)).rejects.toThrow(
        mockError,
      );
    });

    test('should call trySafeExecute if retryStrategyOn is true', async () => {
      // Enable retry strategy
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const originalRetryStrategy = (client as any).clientConfig
        .retryStrategyOn;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (client as any).clientConfig.retryStrategyOn = true;

      mockSendJsonRPCRequest.mockResolvedValue(
        Promise.resolve(mockGraphInterval),
      );

      await client.getGraphInterval(mockGraphInterval);

      expect(mockSendJsonRPCRequest).toHaveBeenCalledWith(
        JSON_RPC_REQUEST_METHOD.GET_GRAPH_INTERVAL,
        [mockGraphInterval],
      );

      // Restore retry strategy
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (client as any).clientConfig.retryStrategyOn = originalRetryStrategy;
    });
  });
});
