import { PublicApiClient } from '../../src/web3/PublicApiClient';
import { JSON_RPC_REQUEST_METHOD } from '../../src/interfaces/JsonRpcMethods';
import { IGetGraphInterval } from '../../src/interfaces/IGetGraphInterval';
import { ISlot } from '../../src/interfaces/ISlot';
import { IClientConfig } from '../../src/interfaces/IClientConfig';
import { ProviderType, IProvider } from '../../src/interfaces/IProvider';

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
      const mockGraphInterval: IGetGraphInterval = {
        start: 1624153200000,
        end: 1624156800000,
      };

      mockSendJsonRPCRequest.mockResolvedValue(Promise.resolve([]));

      await client.getGraphInterval(mockGraphInterval);

      expect(mockSendJsonRPCRequest).toHaveBeenCalledWith(
        JSON_RPC_REQUEST_METHOD.GET_GRAPH_INTERVAL,
        [mockGraphInterval],
      );
    });

    test('should call sendJsonRPCRequest with correct arguments', async () => {
      const mockSlot: ISlot = { period: 1, thread: 2 };

      mockSendJsonRPCRequest.mockResolvedValue(Promise.resolve({}));

      await client.getBlockcliqueBlockBySlot(mockSlot);

      expect(mockSendJsonRPCRequest).toHaveBeenCalledWith(
        JSON_RPC_REQUEST_METHOD.GET_BLOCKCLIQUE_BLOCK_BY_SLOT,
        [mockSlot],
      );
    });
  });
});
