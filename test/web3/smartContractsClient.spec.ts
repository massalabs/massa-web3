/* eslint-disable @typescript-eslint/no-explicit-any */
import { JSON_RPC_REQUEST_METHOD } from '../../src/interfaces/JsonRpcMethods';
import { PublicApiClient } from '../../src/web3/PublicApiClient';
import { SmartContractsClient } from '../../src/web3/SmartContractsClient';
import { WalletClient } from '../../src/web3/WalletClient';
import {
  mockClientConfig,
  mockDeployerAccount,
  mockCallData,
  mockContractData,
  mockNodeStatusInfo,
  mockOpIds,
  mockContractReadOperationData,
  mockContractReadOperationResponse,
  mockReadData,
} from './mockData';

const MAX_READ_BLOCK_GAS = BigInt(4_294_967_295);

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

  describe('deploySmartContract', () => {
    test('should call sendJsonRPCRequest with correct arguments', async () => {
      await smartContractsClient.deploySmartContract(
        mockContractData,
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
      const result = await smartContractsClient.deploySmartContract(
        mockContractData,
      );

      expect(result).toBe(mockOpIds[0]);
    });

    // Write additional tests to handle any edge cases or error scenarios
    test('should handle errors correctly', async () => {
      const mockError = new Error('Error message');
      (smartContractsClient as any).sendJsonRPCRequest = jest
        .fn()
        .mockRejectedValue(mockError);

      await expect(
        smartContractsClient.deploySmartContract(mockContractData),
      ).rejects.toThrow(mockError);
    });

    test('should throw error when no executor is provided and base account is not set', async () => {
      mockWalletClient.getBaseAccount = jest.fn().mockReturnValue(null);
      await expect(
        smartContractsClient.deploySmartContract(mockContractData),
      ).rejects.toThrow(`No tx sender available`);
    });

    test('should use default account when no executor is provided', async () => {
      await smartContractsClient.deploySmartContract(mockContractData);
      expect(mockWalletClient.getBaseAccount).toHaveBeenCalled();
    });

    test('should warn when contractDataBinary size exceeded half of the maximum size of a block', async () => {
      const max_block_size = mockNodeStatusInfo.config.max_block_size;
      mockContractData.contractDataBinary = new Uint8Array(
        max_block_size / 2 + 1,
      ); // value > max_block_size / 2

      const consoleWarnSpy = jest.spyOn(console, 'warn');
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      consoleWarnSpy.mockImplementation(() => {});

      await smartContractsClient.deploySmartContract(mockContractData);

      expect(consoleWarnSpy).toHaveBeenCalledWith(
        'bytecode size exceeded half of the maximum size of a block, operation will certainly be rejected',
      );

      // Restore console.warn
      consoleWarnSpy.mockRestore();
    });

    test('should throw error when contractDataBinary does not exist', async () => {
      const modifiedMockContractData = { ...mockContractData };
      delete modifiedMockContractData.contractDataBinary;

      await expect(
        smartContractsClient.deploySmartContract(modifiedMockContractData),
      ).rejects.toThrow(
        `Expected non-null contract bytecode, but received null.`,
      );
    });

    test('should throw error when no opId is returned', async () => {
      (smartContractsClient as any).sendJsonRPCRequest = jest
        .fn()
        .mockResolvedValue([]);

      await expect(
        smartContractsClient.deploySmartContract(mockContractData),
      ).rejects.toThrow(
        `Deploy smart contract operation bad response. No results array in json rpc response. Inspect smart contract`,
      );
    });
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
  describe('readSmartContract', () => {
    test('should send the correct JSON RPC request', async () => {
      (smartContractsClient as any).sendJsonRPCRequest = jest
        .fn()
        .mockResolvedValue(mockContractReadOperationData);

      await smartContractsClient.readSmartContract(mockReadData);

      expect(
        (smartContractsClient as any).sendJsonRPCRequest,
      ).toHaveBeenCalledWith(JSON_RPC_REQUEST_METHOD.EXECUTE_READ_ONLY_CALL, [
        [
          {
            max_gas: Number(mockReadData.maxGas),
            target_address: mockReadData.targetAddress,
            target_function: mockReadData.targetFunction,
            parameter: mockReadData.parameter,
            caller_address: mockReadData.callerAddress,
          },
        ],
      ]);
    });

    test('should return correct result', async () => {
      (smartContractsClient as any).sendJsonRPCRequest = jest
        .fn()
        .mockResolvedValue(mockContractReadOperationData);

      const result = await smartContractsClient.readSmartContract(mockReadData);

      expect(result).toEqual(mockContractReadOperationResponse);
    });

    test('should throw error when the gas submitted exceeds the maximum allowed block gas', async () => {
      const mockReadDataWithLargeMaxGas = {
        ...mockReadData,
        maxGas: BigInt(4_294_967_296),
      }; // value > MAX_READ_BLOCK_GAS

      await expect(
        smartContractsClient.readSmartContract(mockReadDataWithLargeMaxGas),
      ).rejects.toThrow(
        `The gas submitted ${mockReadDataWithLargeMaxGas.maxGas.toString()} exceeds the max. allowed block gas of ${MAX_READ_BLOCK_GAS.toString()}`,
      );
    });

    test('should throw error when no results array in json rpc response', async () => {
      (smartContractsClient as any).sendJsonRPCRequest = jest
        .fn()
        .mockResolvedValue([]);

      await expect(
        smartContractsClient.readSmartContract(mockReadData),
      ).rejects.toThrow(
        `Read operation bad response. No results array in json rpc response. Inspect smart contract`,
      );
    });

    test('should throw error when json rpc response has error', async () => {
      const mockContractReadOperationDataWithError = [
        {
          result: {
            Error:
              'Some error message. Inspect smart contract for more details',
          },
        },
      ];

      (smartContractsClient as any).sendJsonRPCRequest = jest
        .fn()
        .mockResolvedValue(mockContractReadOperationDataWithError);

      await expect(
        smartContractsClient.readSmartContract(mockReadData),
      ).rejects.toThrow(mockContractReadOperationDataWithError[0].result.Error);
    });

    test('should call trySafeExecute if retryStrategyOn is true', async () => {
      (smartContractsClient as any).sendJsonRPCRequest = jest
        .fn()
        .mockResolvedValue(mockContractReadOperationData);

      const originalRetryStrategy = (smartContractsClient as any).clientConfig
        .retryStrategyOn;
      (smartContractsClient as any).clientConfig.retryStrategyOn = true;

      await smartContractsClient.readSmartContract(mockReadData);

      expect(
        (smartContractsClient as any).sendJsonRPCRequest,
      ).toHaveBeenCalledWith(JSON_RPC_REQUEST_METHOD.EXECUTE_READ_ONLY_CALL, [
        [
          {
            max_gas: Number(mockReadData.maxGas),
            target_address: mockReadData.targetAddress,
            target_function: mockReadData.targetFunction,
            parameter: mockReadData.parameter,
            caller_address: mockReadData.callerAddress,
          },
        ],
      ]);

      (smartContractsClient as any).clientConfig.retryStrategyOn =
        originalRetryStrategy;
    });
  });
});
