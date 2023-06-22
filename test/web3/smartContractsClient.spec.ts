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

    test('should throw error when gas submitted exceeds the maximum allowed block gas', async () => {
      const mockContractReadOperationDataWithError = [
        {
          result: {
            Error:
              'The gas submitted 100000000000000000 exceeds the max. allowed block gas of 4294967295',
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
  });
});
