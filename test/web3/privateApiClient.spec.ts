/* eslint-disable @typescript-eslint/no-explicit-any */
import { JSON_RPC_REQUEST_METHOD } from '../../src/interfaces/JsonRpcMethods';
import { IClientConfig } from '../../src/interfaces/IClientConfig';
import { ProviderType, IProvider } from '../../src/interfaces/IProvider';
import { PrivateApiClient } from '../../src';

export const PERIOD_OFFSET = 5;

describe('PrivateApiClient', () => {
  let client: PrivateApiClient;
  let mockSendJsonRPCRequest: jest.SpyInstance;

  // Function to generate tests for a set of similar operations to avoid code duplication
  function generateAPITests(
    operation: string,
    mockData: any,
    mockResponse: any,
    jsonRpcRequestMethod: JSON_RPC_REQUEST_METHOD,
    wrapArgsInArray = true,
  ) {
    test(`should call sendJsonRPCRequest with correct arguments`, async () => {
      mockSendJsonRPCRequest.mockResolvedValue(Promise.resolve(mockResponse));

      await (client as any)[operation](mockData);

      let rpcArgs;

      if (wrapArgsInArray) {
        rpcArgs = [Array.isArray(mockData) ? mockData : [mockData]];
      } else {
        rpcArgs = Array.isArray(mockData) ? mockData : [mockData];
      }

      expect(mockSendJsonRPCRequest).toHaveBeenCalledWith(
        jsonRpcRequestMethod,
        rpcArgs,
      );
    });

    test(`should return the correct result`, async () => {
      mockSendJsonRPCRequest.mockResolvedValue(Promise.resolve(mockResponse));

      const result = await (client as any)[operation](mockData);

      expect(result).toEqual(mockResponse);
    });

    test(`should handle errors correctly`, async () => {
      const mockError = new Error('Error message');
      mockSendJsonRPCRequest.mockRejectedValue(mockError);

      await expect((client as any)[operation](mockData)).rejects.toThrow(
        mockError,
      );
    });

    test(`should call trySafeExecute if retryStrategyOn is true`, async () => {
      // Enable retry strategy
      const originalRetryStrategy = (client as any).clientConfig
        .retryStrategyOn;
      (client as any).clientConfig.retryStrategyOn = true;

      mockSendJsonRPCRequest.mockResolvedValue(Promise.resolve(mockResponse));

      const result = await (client as any)[operation](mockData);

      let rpcArgs;
      if (wrapArgsInArray) {
        rpcArgs = [Array.isArray(mockData) ? mockData : [mockData]];
      } else {
        rpcArgs = Array.isArray(mockData) ? mockData : [mockData];
      }

      expect(mockSendJsonRPCRequest).toHaveBeenCalledWith(
        jsonRpcRequestMethod,
        rpcArgs,
      );

      expect(result).toEqual(mockResponse);

      // Restore retry strategy
      (client as any).clientConfig.retryStrategyOn = originalRetryStrategy;
    });
  }

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
    client = new PrivateApiClient(clientConfig);
    mockSendJsonRPCRequest = jest.spyOn(client as any, 'sendJsonRPCRequest');
  });

  describe('nodeAddToPeersWhitelist', () => {
    generateAPITests(
      'nodeAddToPeersWhitelist',
      '192.168.0.1',
      undefined,
      JSON_RPC_REQUEST_METHOD.NODE_ADD_TO_PEERS_WHITELIST,
    );
  });

  describe('nodeRemoveFromWhitelist', () => {
    generateAPITests(
      'nodeRemoveFromWhitelist',
      '192.168.0.1',
      undefined,
      JSON_RPC_REQUEST_METHOD.NODE_REMOVE_FROM_WHITELIST,
    );
  });

  describe('nodeUnbanByIpAddress', () => {
    generateAPITests(
      'nodeUnbanByIpAddress',
      '192.168.0.1',
      undefined,
      JSON_RPC_REQUEST_METHOD.NODE_UNBAN_BY_IP,
    );
  });

  describe('nodeUnbanById', () => {
    generateAPITests(
      'nodeUnbanById',
      'nodeIdExample',
      undefined,
      JSON_RPC_REQUEST_METHOD.NODE_UNBAN_BY_ID,
      true,
    );
  });

  describe('nodeBanByIpAddress', () => {
    generateAPITests(
      'nodeBanByIpAddress',
      '127.0.0.1',
      undefined,
      JSON_RPC_REQUEST_METHOD.NODE_BAN_BY_IP,
      true,
    );
  });

  describe('nodeBanById', () => {
    generateAPITests(
      'nodeBanById',
      'nodeIdExample',
      undefined,
      JSON_RPC_REQUEST_METHOD.NODE_BAN_BY_ID,
      true,
    );
  });

  describe('nodeStop', () => {
    generateAPITests(
      'nodeStop',
      [],
      undefined,
      JSON_RPC_REQUEST_METHOD.STOP_NODE,
      false,
    );
  });

  describe('nodeSignMessage', () => {
    generateAPITests(
      'nodeSignMessage',
      new Uint8Array([]),
      { signature: 'mockSignature' },
      JSON_RPC_REQUEST_METHOD.NODE_SIGN_MESSAGE,
      false,
    );
  });

  describe('nodeGetStakingAddresses', () => {
    generateAPITests(
      'nodeGetStakingAddresses',
      [],
      ['address1', 'address2'],
      JSON_RPC_REQUEST_METHOD.GET_STAKING_ADDRESSES,
      false,
    );
  });

  describe('nodeRemoveStakingAddresses', () => {
    generateAPITests(
      'nodeRemoveStakingAddresses',
      ['address1', 'address2'],
      undefined,
      JSON_RPC_REQUEST_METHOD.REMOVE_STAKING_ADDRESSES,
      true,
    );
  });

  describe('nodeAddStakingSecretKeys', () => {
    generateAPITests(
      'nodeAddStakingSecretKeys',
      ['key1', 'key2'],
      undefined,
      JSON_RPC_REQUEST_METHOD.ADD_STAKING_PRIVATE_KEYS,
      true,
    );
  });
});
