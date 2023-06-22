import { JSON_RPC_REQUEST_METHOD } from '../../src/interfaces/JsonRpcMethods';
import { PublicApiClient } from '../../src/web3/PublicApiClient';
import { SmartContractsClient } from '../../src/web3/SmartContractsClient';
import { WalletClient } from '../../src/web3/WalletClient';
import {
  mockClientConfig,
  mockDeployerAccount,
  mockContractData,
  mockNodeStatusInfo,
  mockOpIds,
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
      ).rejects.toThrow(`Contract data required. Got null`);
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
});
