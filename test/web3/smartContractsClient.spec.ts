/* eslint-disable @typescript-eslint/no-empty-function, @typescript-eslint/no-explicit-any */
import { IBalance } from '../../src/interfaces/IBalance';
import { JSON_RPC_REQUEST_METHOD } from '../../src/interfaces/JsonRpcMethods';
import { EOperationStatus } from '../../src/interfaces/EOperationStatus';
import { fromMAS } from '../../src/utils/converters';
import { PublicApiClient } from '../../src/web3/PublicApiClient';
import {
  SmartContractsClient,
  MAX_READ_BLOCK_GAS,
} from '../../src/web3/SmartContractsClient';
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
  mockOperationDataDetailed,
  mockAddressesInfo,
  mockEventFilter,
  mockedEvents,
  mockContractReadOnlyOperationResponse,
  validSignature,
  mockContractReadOperationDataWithError,
  mockAddresses,
} from './mockData';
import { IExecuteReadOnlyResponse } from '../../src/interfaces/IExecuteReadOnlyResponse';

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

    // Mock getOperations
    mockPublicApiClient.getOperations = jest
      .fn()
      .mockImplementation((operationIds: string[]) => {
        return Promise.resolve(
          mockOperationDataDetailed.filter((operation) =>
            operationIds.includes(operation.id),
          ),
        );
      });

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
      .mockResolvedValue(validSignature);
    // Mock the sendJsonRPCRequest function
    (smartContractsClient as any).sendJsonRPCRequest = jest
      .fn()
      .mockResolvedValue(mockOpIds);
  });

  describe('deploySmartContract', () => {
    let consoleWarnSpy: jest.SpyInstance;
    beforeEach(() => {
      consoleWarnSpy = jest.spyOn(console, 'warn');
      consoleWarnSpy.mockImplementation(() => {});
    });

    afterEach(() => {
      consoleWarnSpy.mockRestore();
    });

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
            signature: validSignature.base58Encoded,
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
      consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {});

      const max_block_size = mockNodeStatusInfo.config.max_block_size;
      mockContractData.contractDataBinary = new Uint8Array(
        max_block_size / 2 + 1,
      ); // value > max_block_size / 2

      await smartContractsClient.deploySmartContract(mockContractData);

      expect(consoleWarnSpy).toHaveBeenCalledWith(
        'bytecode size exceeded half of the maximum size of a block, operation will certainly be rejected',
      );
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
            signature: validSignature.base58Encoded,
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
            signature: validSignature.base58Encoded,
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

  describe('getOperationStatus', () => {
    test('should return EOperationStatus.INCLUDED_PENDING when operation is included in blocks', async () => {
      const opId = mockOpIds[0];
      const status = await smartContractsClient.getOperationStatus(opId);
      expect(status).toBe(EOperationStatus.INCLUDED_PENDING);
    });

    test('should return EOperationStatus.FINAL when operation is final', async () => {
      const opId = mockOpIds[1];
      const status = await smartContractsClient.getOperationStatus(opId);
      expect(status).toBe(EOperationStatus.FINAL);
    });

    test('should return EOperationStatus.AWAITING_INCLUSION when operation is in the pool', async () => {
      const opId = mockOpIds[2];
      const status = await smartContractsClient.getOperationStatus(opId);
      expect(status).toBe(EOperationStatus.AWAITING_INCLUSION);
    });

    test('should return EOperationStatus.INCONSISTENT when operation is neither in blocks nor in the pool', async () => {
      const opId = mockOpIds[3];
      const status = await smartContractsClient.getOperationStatus(opId);
      expect(status).toBe(EOperationStatus.INCONSISTENT);
    });

    test('should return EOperationStatus.NOT_FOUND when operation does not exist', async () => {
      const opId = '0x005'; // Doesn't exist
      const status = await smartContractsClient.getOperationStatus(opId);
      expect(status).toBe(EOperationStatus.NOT_FOUND);
    });
  });

  describe('awaitRequiredOperationStatus', () => {
    const opId = mockOpIds[0];
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
      console.error = jest.fn();

      // Always throw an error
      const expectedErrorMessage = 'Test error';
      smartContractsClient.getOperationStatus = jest
        .fn()
        .mockRejectedValue(new Error(expectedErrorMessage));

      const consoleErrorSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      const error = await smartContractsClient
        .awaitRequiredOperationStatus(opId, requiredStatus)
        .catch((e) => e);

      expect(error).toBeInstanceOf(Error);
      expect(error.message).toEqual(expectedErrorMessage);
      expect(smartContractsClient.getOperationStatus).toHaveBeenCalledTimes(
        101,
      );

      // Restore console.error
      consoleErrorSpy.mockRestore();
    });

    test('fails after reaching the pending limit', async () => {
      console.warn = jest.fn();
      // Always return a status other than the requiredStatus
      smartContractsClient.getOperationStatus = jest
        .fn()
        .mockResolvedValue(EOperationStatus.NOT_FOUND);

      const consoleWarnSpy = jest
        .spyOn(console, 'warn')
        .mockImplementation(() => {});

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

      // Restore console.warn
      consoleWarnSpy.mockRestore();
    });
  });

  describe('getContractBalance', () => {
    const expectedBalance: IBalance = {
      candidate: fromMAS(mockAddressesInfo[0].candidate_balance),
      final: fromMAS(mockAddressesInfo[0].final_balance),
    };

    test('should return the correct balance when the address exists', async () => {
      mockPublicApiClient.getAddresses = jest
        .fn()
        .mockResolvedValue(mockAddressesInfo);

      const balance = await smartContractsClient.getContractBalance(
        mockAddresses[0],
      );

      expect(balance).toEqual(expectedBalance);
      expect(mockPublicApiClient.getAddresses).toHaveBeenCalledWith([
        mockAddresses[0],
      ]);
    });

    test('should return null when the address does not exist', async () => {
      mockPublicApiClient.getAddresses = jest.fn().mockResolvedValue([]);

      const balance = await smartContractsClient.getContractBalance(
        mockAddresses[0],
      );

      expect(balance).toBeNull();
      expect(mockPublicApiClient.getAddresses).toHaveBeenCalledWith([
        mockAddresses[0],
      ]);
    });
  });

  describe('getFilteredScOutputEvents', () => {
    test('should send the correct JSON RPC request', async () => {
      (smartContractsClient as any).sendJsonRPCRequest = jest
        .fn()
        .mockResolvedValue(mockedEvents);

      await smartContractsClient.getFilteredScOutputEvents(mockEventFilter);

      expect(
        (smartContractsClient as any).sendJsonRPCRequest,
      ).toHaveBeenCalledWith(
        JSON_RPC_REQUEST_METHOD.GET_FILTERED_SC_OUTPUT_EVENT,
        [mockEventFilter],
      );
    });

    test('should return the correct array of IEvent objects', async () => {
      (smartContractsClient as any).sendJsonRPCRequest = jest
        .fn()
        .mockResolvedValue(mockedEvents);

      const result = await smartContractsClient.getFilteredScOutputEvents(
        mockEventFilter,
      );

      expect(result).toEqual(mockedEvents);
    });

    test('should call trySafeExecute if retryStrategyOn is true', async () => {
      (smartContractsClient as any).sendJsonRPCRequest = jest
        .fn()
        .mockResolvedValue(mockedEvents);

      const originalRetryStrategy = (smartContractsClient as any).clientConfig
        .retryStrategyOn;
      (smartContractsClient as any).clientConfig.retryStrategyOn = true;

      await smartContractsClient.getFilteredScOutputEvents(mockEventFilter);

      expect(
        (smartContractsClient as any).sendJsonRPCRequest,
      ).toHaveBeenCalledWith(
        JSON_RPC_REQUEST_METHOD.GET_FILTERED_SC_OUTPUT_EVENT,
        [mockEventFilter],
      );

      (smartContractsClient as any).clientConfig.retryStrategyOn =
        originalRetryStrategy;
    });
  });

  describe('executeReadOnlySmartContract', () => {
    test('should throw error if contractDataBinary is missing', async () => {
      const consoleErrorSpy = jest
        .spyOn(console, 'error')
        .mockImplementation(() => {});

      await expect(
        smartContractsClient.executeReadOnlySmartContract({
          ...mockContractData,
          contractDataBinary: undefined,
        }),
      ).rejects.toThrow(
        `Expected non-null contract bytecode, but received null.`,
      );

      // Restore console.error
      consoleErrorSpy.mockRestore();
    });

    test('should throw error if address is missing', async () => {
      await expect(
        smartContractsClient.executeReadOnlySmartContract({
          ...mockContractData,
          address: undefined,
        }),
      ).rejects.toThrow(`Expected contract address, but received null.`);
    });

    test('should send correct request', async () => {
      (smartContractsClient as any).sendJsonRPCRequest = jest
        .fn()
        .mockResolvedValue([{ result: { Ok: new Uint8Array([11, 22, 33]) } }]);

      await smartContractsClient.executeReadOnlySmartContract(mockContractData);

      expect(
        (smartContractsClient as any).sendJsonRPCRequest,
      ).toHaveBeenCalledWith(
        JSON_RPC_REQUEST_METHOD.EXECUTE_READ_ONLY_BYTECODE,
        [
          [
            {
              max_gas: Number(mockContractData.maxGas),
              bytecode: mockContractData.contractDataBinary
                ? Array.from(mockContractData.contractDataBinary)
                : [],
              address: mockContractData.address,
            },
          ],
        ],
      );
    });

    test('should return correct result', async () => {
      const expectedResponse: IExecuteReadOnlyResponse =
        mockContractReadOnlyOperationResponse;

      (smartContractsClient as any).sendJsonRPCRequest = jest
        .fn()
        .mockResolvedValue(mockContractReadOperationData);

      const result = await smartContractsClient.executeReadOnlySmartContract(
        mockContractData,
      );

      expect(result).toEqual(expectedResponse);
    });

    test('should throw error if no result is returned', async () => {
      (smartContractsClient as any).sendJsonRPCRequest = jest
        .fn()
        .mockResolvedValue([]);

      await expect(
        smartContractsClient.executeReadOnlySmartContract(mockContractData),
      ).rejects.toThrow(
        `Read operation bad response. No results array in json rpc response. Inspect smart contract`,
      );
    });

    test('should throw error if result contains an error', async () => {
      const error = 'Some error';
      (smartContractsClient as any).sendJsonRPCRequest = jest
        .fn()
        .mockResolvedValue([{ result: { Error: error } }]);

      await expect(
        smartContractsClient.executeReadOnlySmartContract(mockContractData),
      ).rejects.toThrow(`Execute read-only smart contract error`);
    });

    test('should call trySafeExecute if retryStrategyOn is true', async () => {
      const originalRetryStrategy = (smartContractsClient as any).clientConfig
        .retryStrategyOn;
      (smartContractsClient as any).clientConfig.retryStrategyOn = true;

      (smartContractsClient as any).sendJsonRPCRequest = jest
        .fn()
        .mockResolvedValue(mockContractReadOperationData);

      await smartContractsClient.executeReadOnlySmartContract(mockContractData);

      expect(
        (smartContractsClient as any).sendJsonRPCRequest,
      ).toHaveBeenCalledWith(
        JSON_RPC_REQUEST_METHOD.EXECUTE_READ_ONLY_BYTECODE,
        [
          [
            {
              max_gas: Number(mockContractData.maxGas),
              bytecode: mockContractData.contractDataBinary
                ? Array.from(mockContractData.contractDataBinary)
                : [],
              address: mockContractData.address,
            },
          ],
        ],
      );

      (smartContractsClient as any).clientConfig.retryStrategyOn =
        originalRetryStrategy;
    });
  });
});
