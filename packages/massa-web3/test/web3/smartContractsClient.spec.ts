/* eslint-disable @typescript-eslint/no-empty-function, @typescript-eslint/no-explicit-any */
import { IBalance } from '../../src/interfaces/IBalance';
import { JSON_RPC_REQUEST_METHOD } from '../../src/interfaces/JsonRpcMethods';
import { EOperationStatus } from '../../src/interfaces/EOperationStatus';
import { fromMAS, MAX_GAS_CALL } from '@massalabs/web3-utils';
import { PublicApiClient } from '../../src/web3/PublicApiClient';
import { SmartContractsClient } from '../../src/web3/SmartContractsClient';
import { WalletClient } from '../../src/web3/WalletClient';
import {
  mockClientConfig,
  mockDeployerAccount as importedMockDeployerAccount,
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
  mockBalance,
  BUILDNET_CHAIN_ID,
} from './mockData';
import { IExecuteReadOnlyResponse } from '../../src/interfaces/IExecuteReadOnlyResponse';
import { Web3Account } from '../../src/web3/accounts/Web3Account';

// Mock to not wait for the timeout to finish
jest.mock('../../src/utils/time', () => {
  return {
    Timeout: jest.fn(),
    wait: jest.fn().mockResolvedValue(true),
  };
});

describe('SmartContractsClient', () => {
  let smartContractsClient: SmartContractsClient;
  let mockPublicApiClient: PublicApiClient;
  let mockWalletClient: WalletClient;
  let mockDeployerAccount: Web3Account;

  beforeEach(() => {
    // Initialize the mock objects
    mockPublicApiClient = new PublicApiClient(mockClientConfig);
    mockDeployerAccount = new Web3Account(
      importedMockDeployerAccount,
      mockPublicApiClient,
      BUILDNET_CHAIN_ID,
    );
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
    (mockDeployerAccount as any).sign = jest
      .fn()
      .mockResolvedValue(validSignature);
    // Mock the sendJsonRPCRequest function
    (mockDeployerAccount as any).sendJsonRPCRequest = jest
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
        (mockDeployerAccount as any).sendJsonRPCRequest,
      ).toHaveBeenCalledWith(JSON_RPC_REQUEST_METHOD.SEND_OPERATIONS, [
        [
          {
            serialized_content: expect.any(Array),
            creator_public_key: importedMockDeployerAccount.publicKey,
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
      (mockDeployerAccount as any).sendJsonRPCRequest = jest
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
        'Bytecode size exceeded half of the maximum size of a block, operation will certainly be rejected',
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
      (mockDeployerAccount as any).sendJsonRPCRequest = jest
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
    beforeEach(() => {
      // mock getAccountBalance
      mockWalletClient.getAccountBalance = jest
        .fn()
        .mockResolvedValue(mockBalance);
    });
    afterEach(() => {
      jest.clearAllMocks();
    });

    test('should call sendJsonRPCRequest with correct arguments', async () => {
      await smartContractsClient.callSmartContract(
        mockCallData,
        mockDeployerAccount,
      );

      expect(
        (mockDeployerAccount as any).sendJsonRPCRequest,
      ).toHaveBeenCalledWith(JSON_RPC_REQUEST_METHOD.SEND_OPERATIONS, [
        [
          {
            serialized_content: expect.any(Array),
            creator_public_key: importedMockDeployerAccount.publicKey,
            signature: validSignature.base58Encoded,
          },
        ],
      ]);
    });

    test('should default coins to 0 if not provided', async () => {
      const mockCallDataWithoutCoins = {
        ...mockCallData,
        coins: undefined,
      };

      const spy = jest.spyOn(smartContractsClient, 'callSmartContract');

      const result = await smartContractsClient.callSmartContract(
        mockCallDataWithoutCoins,
        mockDeployerAccount,
      );

      expect(result).toBe(mockOpIds[0]);
      expect(spy).toHaveBeenCalledWith(
        expect.objectContaining({
          ...mockCallDataWithoutCoins,
          coins: BigInt(0),
        }),
        mockDeployerAccount,
      );

      spy.mockRestore();
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
      (mockDeployerAccount as any).sendJsonRPCRequest.mockRejectedValue(
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
      const originalRetryStrategy = (mockDeployerAccount as any).clientConfig
        .retryStrategyOn;
      (mockDeployerAccount as any).clientConfig.retryStrategyOn = true;

      await smartContractsClient.callSmartContract(mockCallData);

      expect(
        (mockDeployerAccount as any).sendJsonRPCRequest,
      ).toHaveBeenCalledWith(JSON_RPC_REQUEST_METHOD.SEND_OPERATIONS, [
        [
          {
            serialized_content: expect.any(Array),
            creator_public_key: importedMockDeployerAccount.publicKey,
            signature: validSignature.base58Encoded,
          },
        ],
      ]);

      (smartContractsClient as any).clientConfig.retryStrategyOn =
        originalRetryStrategy;
    });

    test('should throw error when no opId is returned', async () => {
      (mockDeployerAccount as any).sendJsonRPCRequest = jest
        .fn()
        .mockResolvedValue([]);

      await expect(
        smartContractsClient.callSmartContract(mockCallData),
      ).rejects.toThrow(
        `Call smart contract operation bad response. No results array in json rpc response. Inspect smart contract`,
      );
    });

    test('should throw error when maxGas is superior to the maximum gas allowed', async () => {
      const modifiedMockCallData = { ...mockCallData };
      modifiedMockCallData.maxGas = MAX_GAS_CALL + BigInt(1);

      await expect(
        smartContractsClient.callSmartContract(modifiedMockCallData),
      ).rejects.toThrow(
        `The gas submitted ${modifiedMockCallData.maxGas.toString()} exceeds the max. allowed block gas of ${MAX_GAS_CALL.toString()}`,
      );
    });

    test('should throw error when coins is superior to coins possessed by sender', async () => {
      const modifiedMockCallData = { ...mockCallData };
      modifiedMockCallData.coins =
        BigInt(mockAddressesInfo[2].final_balance) + BigInt(1);

      await expect(
        smartContractsClient.callSmartContract(modifiedMockCallData),
      ).rejects.toThrow(
        `The sender ${mockDeployerAccount.address()} does not have enough balance to pay for the coins`,
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
            coins: mockReadData.coins?.toString(),
            fee: mockReadData.fee?.toString(),
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
      }; // value > MAX_GAS_CALL

      await expect(
        smartContractsClient.readSmartContract(mockReadDataWithLargeMaxGas),
      ).rejects.toThrow(
        `The gas submitted ${mockReadDataWithLargeMaxGas.maxGas.toString()} exceeds the max. allowed block gas of ${MAX_GAS_CALL.toString()}`,
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
            coins: mockReadData.coins?.toString(),
            fee: mockReadData.fee?.toString(),
          },
        ],
      ]);

      (smartContractsClient as any).clientConfig.retryStrategyOn =
        originalRetryStrategy;
    });
  });

  describe('getOperationStatus', () => {
    test('should return EOperationStatus.NOT_FOUND when operation does not exist', async () => {
      const opId = '0x005'; // Doesn't exist
      const status = await smartContractsClient.getOperationStatus(opId);
      expect(status).toBe(EOperationStatus.NOT_FOUND);
    });

    test('should return EOperationStatus.FINAL_SUCCESS when operation executed as final and no error', async () => {
      const opId = mockOpIds[0];
      const status = await smartContractsClient.getOperationStatus(opId);
      expect(status).toBe(EOperationStatus.FINAL_SUCCESS);
    });

    test('should return EOperationStatus.FINAL_ERROR when operation executed as final and error occured', async () => {
      const opId = mockOpIds[1];
      const status = await smartContractsClient.getOperationStatus(opId);
      expect(status).toBe(EOperationStatus.FINAL_ERROR);
    });

    test('should return EOperationStatus.SPECULATIVE_SUCCESS when operation executed as speculative and was a success', async () => {
      const opId = mockOpIds[2];
      const status = await smartContractsClient.getOperationStatus(opId);
      expect(status).toBe(EOperationStatus.SPECULATIVE_SUCCESS);
    });

    test('should return EOperationStatus.SPECULATIVE_ERROR when operation executed as speculative and error occured', async () => {
      const opId = mockOpIds[3];
      const status = await smartContractsClient.getOperationStatus(opId);
      expect(status).toBe(EOperationStatus.SPECULATIVE_ERROR);
    });
    test('should return EOperationStatus.AWAITING_INCLUSION when operation not executed, or executed & expired & was forgotten', async () => {
      const opId = mockOpIds[4];
      const status = await smartContractsClient.getOperationStatus(opId);
      expect(status).toBe(EOperationStatus.AWAITING_INCLUSION);
    });
    test('should return EOperationStatus.UNEXECUTED_OR_EXPIRED when operation not executed, or executed & expired & was forgotten', async () => {
      const opId = mockOpIds[5];
      const status = await smartContractsClient.getOperationStatus(opId);
      expect(status).toBe(EOperationStatus.UNEXECUTED_OR_EXPIRED);
    });
    test('should return EOperationStatus.INCONSISTENT when no conditions are met', async () => {
      const opId = mockOpIds[6];
      const status = await smartContractsClient.getOperationStatus(opId);
      expect(status).toBe(EOperationStatus.INCONSISTENT);
    });
    test.skip('should return EOperationStatus.INCLUDED_PENDING when operation is included in blocks', async () => {
      const opId = mockOpIds[7];
      const status = await smartContractsClient.getOperationStatus(opId);
      expect(status).toBe(EOperationStatus.INCLUDED_PENDING);
    });
  });

  describe('awaitRequiredOperationStatus', () => {
    const opId = mockOpIds[0];
    const requiredStatus = EOperationStatus.FINAL_SUCCESS;
    let getOperationStatusMock;

    beforeEach(() => {
      getOperationStatusMock = jest.spyOn(
        smartContractsClient,
        'getOperationStatus',
      );
    });

    afterEach(() => {
      getOperationStatusMock.mockReset();
    });

    test('waiting for NOT_FOUND status to become the required status', async () => {
      getOperationStatusMock
        .mockResolvedValueOnce(EOperationStatus.NOT_FOUND)
        .mockResolvedValueOnce(requiredStatus);

      const status = await smartContractsClient.awaitRequiredOperationStatus(
        opId,
        requiredStatus,
      );

      expect(status).toBe(requiredStatus);
      expect(smartContractsClient.getOperationStatus).toHaveBeenCalledTimes(2);
    });
  });

  describe('awaitMultipleRequiredOperationStatuses', () => {
    const opId = mockOpIds[0];
    const requiredStatus = EOperationStatus.FINAL_SUCCESS;
    const timeout = 1000;
    let getOperationStatusMock;

    beforeEach(() => {
      getOperationStatusMock = jest.spyOn(
        smartContractsClient,
        'getOperationStatus',
      );
    });

    afterEach(() => {
      getOperationStatusMock.mockReset();
    });

    it('should return the expected status when all required statuses are met', async () => {
      getOperationStatusMock
        .mockResolvedValueOnce(EOperationStatus.NOT_FOUND)
        .mockResolvedValueOnce(requiredStatus);

      const requiredStatuses = [
        EOperationStatus.FINAL_SUCCESS,
        EOperationStatus.FINAL_ERROR,
      ];

      const result =
        await smartContractsClient.awaitMultipleRequiredOperationStatus(
          opId,
          requiredStatuses,
          timeout,
        );

      expect(result).toEqual(requiredStatus);
      expect(smartContractsClient.getOperationStatus).toHaveBeenCalledTimes(2);
    });

    it('should throw an error when the required statuses are not met within the timeout', async () => {
      getOperationStatusMock.mockResolvedValue(EOperationStatus.NOT_FOUND); // Always return NOT_FOUND

      const requiredStatuses = [
        EOperationStatus.FINAL_SUCCESS,
        EOperationStatus.FINAL_ERROR,
      ];

      await expect(
        smartContractsClient.awaitMultipleRequiredOperationStatus(
          opId,
          requiredStatuses,
          timeout,
        ),
      ).rejects.toThrow(
        `Failed to retrieve status of operation id: ${opId}: Timeout reached.`,
      );
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
