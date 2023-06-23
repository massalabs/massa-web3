/* eslint-disable @typescript-eslint/no-explicit-any */
import { EOperationStatus } from '../../src/interfaces/EOperationStatus';
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
const TX_POLL_INTERVAL_MS = 10000;
const TX_STATUS_CHECK_RETRY_COUNT = 100;

// Mock to not wait for the timeout to finish
jest.mock('../../src/utils/time', () => {
  return {
    Timeout: jest.fn(),
    wait: jest.fn(() => Promise.resolve()),
  };
});

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

  describe.only('awaitRequiredOperationStatus', () => {
    const opId = '1';
    const requiredStatus = EOperationStatus.FINAL;

    beforeEach(() => {
      // Reset the getOperationStatus function
      smartContractsClient.getOperationStatus = jest.fn();
    });

    test('waiting for NOT_FOUND status to become the required status', async () => {
      let callCount = 0;
      smartContractsClient.getOperationStatus = jest
        .fn()
        .mockImplementation(() => {
          callCount++;
          if (callCount === 1) {
            return Promise.resolve(EOperationStatus.NOT_FOUND);
          } else {
            return Promise.resolve(requiredStatus);
          }
        });

      const promise = smartContractsClient.awaitRequiredOperationStatus(
        opId,
        requiredStatus,
      );

      const status = await promise;

      expect(status).toBe(requiredStatus);
      expect(smartContractsClient.getOperationStatus).toHaveBeenCalledTimes(2);
    });

    test('fails after reaching the error limit', async () => {
      // Always throw an error
      const expectedErrorMessage = 'Test error';
      smartContractsClient.getOperationStatus = jest
        .fn()
        .mockRejectedValue(new Error(expectedErrorMessage));

      const error = await smartContractsClient
        .awaitRequiredOperationStatus(opId, requiredStatus)
        .catch((e) => e);

      expect(error).toBeInstanceOf(Error);
      expect(error.message).toEqual(expectedErrorMessage);
      expect(smartContractsClient.getOperationStatus).toHaveBeenCalledTimes(
        101,
      );
    });

    test('fails after reaching the pending limit', async () => {
      // Always return a status other than the requiredStatus
      smartContractsClient.getOperationStatus = jest
        .fn()
        .mockResolvedValue(EOperationStatus.NOT_FOUND);

      await expect(
        smartContractsClient.awaitRequiredOperationStatus(opId, requiredStatus),
      ).rejects.toThrow(
        `Getting the tx status for operation Id ${opId} took too long to conclude. We gave up after ${
          TX_POLL_INTERVAL_MS * TX_STATUS_CHECK_RETRY_COUNT
        }ms.`,
      );

      expect(smartContractsClient.getOperationStatus).toHaveBeenCalledTimes(
        1001,
      );
    });
  });
});
