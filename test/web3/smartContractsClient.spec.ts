/* eslint-disable @typescript-eslint/no-explicit-any */
import { JSON_RPC_REQUEST_METHOD } from '../../src/interfaces/JsonRpcMethods';
import { PublicApiClient } from '../../src/web3/PublicApiClient';
import { SmartContractsClient } from '../../src/web3/SmartContractsClient';
import { WalletClient } from '../../src/web3/WalletClient';
import {
  mockClientConfig,
  mockDeployerAccount,
  mockNodeStatusInfo,
  mockOpIds,
  mockCallData,
} from './mockData';

describe('SmartContractsClient', () => {
  let smartContractsClient: SmartContractsClient;
  let mockPublicApiClient: PublicApiClient;
  let mockWalletClient: WalletClient;

  beforeEach(() => {
    // Initialize the mock objects
    mockPublicApiClient = new PublicApiClient(mockClientConfig);
    mockWalletClient = new WalletClient(
      mockClientConfig,
      mockPublicApiClient,
      mockDeployerAccount,
    );
    smartContractsClient = new SmartContractsClient(
      mockClientConfig,
      mockPublicApiClient,
      mockWalletClient,
    );

    // Mock returned values
    mockPublicApiClient.getNodeStatus = jest
      .fn()
      .mockResolvedValue(mockNodeStatusInfo);
    // Mock the getBaseAccount function
    mockWalletClient.getBaseAccount = jest
      .fn()
      .mockReturnValue(mockDeployerAccount);
    // Mock the walletSignMessage function
    WalletClient.walletSignMessage = jest
      .fn()
      .mockResolvedValue({ base58Encoded: 'signature' });
    // Mock the sendJsonRPCRequest function
    (smartContractsClient as any).sendJsonRPCRequest = jest
      .fn()
      .mockResolvedValue(mockOpIds);
  });

  describe('callSmartContract', () => {
    test('should call sendJsonRPCRequest with correct arguments', async () => {
      await smartContractsClient.callSmartContract(
        mockCallData,
        mockDeployerAccount,
      );

      expect(
        (smartContractsClient as any).sendJsonRPCRequest,
      ).toHaveBeenCalledWith(JSON_RPC_REQUEST_METHOD.SEND_OPERATIONS, [
        [
          {
            serialized_content: expect.any(Array),
            creator_public_key: mockDeployerAccount.publicKey,
            signature: 'signature',
          },
        ],
      ]);
    });

    test('should return the correct result', async () => {
      const result = await smartContractsClient.callSmartContract(
        mockCallData,
        mockDeployerAccount,
      );

      expect(result).toBe(mockOpIds[0]);
    });

    test('should use default account when no executor is provided', async () => {
      await smartContractsClient.callSmartContract(mockCallData);
      expect(mockWalletClient.getBaseAccount).toHaveBeenCalled();
    });

    test('should handle errors correctly', async () => {
      const mockError = new Error('Error message');
      (smartContractsClient as any).sendJsonRPCRequest.mockRejectedValue(
        mockError,
      );

      await expect(
        smartContractsClient.callSmartContract(mockCallData),
      ).rejects.toThrow(mockError);
    });

    test('should throw error when no executor is provided and base account is not set', async () => {
      mockWalletClient.getBaseAccount = jest.fn().mockReturnValue(null);
      await expect(
        smartContractsClient.callSmartContract(mockCallData),
      ).rejects.toThrow(`No tx sender available`);
    });

    test('should call trySafeExecute if retryStrategyOn is true', async () => {
      const originalRetryStrategy = (smartContractsClient as any).clientConfig
        .retryStrategyOn;
      (smartContractsClient as any).clientConfig.retryStrategyOn = true;

      await smartContractsClient.callSmartContract(mockCallData);

      expect(
        (smartContractsClient as any).sendJsonRPCRequest,
      ).toHaveBeenCalledWith(JSON_RPC_REQUEST_METHOD.SEND_OPERATIONS, [
        [
          {
            serialized_content: expect.any(Array),
            creator_public_key: mockDeployerAccount.publicKey,
            signature: 'signature',
          },
        ],
      ]);

      (smartContractsClient as any).clientConfig.retryStrategyOn =
        originalRetryStrategy;
    });

    test('should throw error when no opId is returned', async () => {
      (smartContractsClient as any).sendJsonRPCRequest = jest
        .fn()
        .mockResolvedValue([]);

      await expect(
        smartContractsClient.callSmartContract(mockCallData),
      ).rejects.toThrow(
        `Call smart contract operation bad response. No results array in json rpc response. Inspect smart contract`,
      );
    });
  });
});
