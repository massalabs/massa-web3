/* eslint-disable @typescript-eslint/no-unused-vars */
import { BaseClient } from '../../src/web3/BaseClient';
import { IProvider, ProviderType } from '../../src/interfaces/IProvider';
import { IClientConfig } from '../../src/interfaces/IClientConfig';
import { JSON_RPC_REQUEST_METHOD } from '../../src/interfaces/JsonRpcMethods';
import { JsonRpcResponseData } from '../../src/interfaces/JsonRpcResponseData';
import nock from 'nock';

// for CI testing:
const publicApi = 'https://test.massa.net/api/v2:33035';
const privateApi = 'https://test.massa.net/api/v2:33034';

// For local testing:
// const publicApi = 'http://127.0.0.1:33035';
// const privateApi = 'http://127.0.0.1:33034';

export const PERIOD_OFFSET = 5;

describe('BaseClient', () => {
  describe('sendJsonRPCRequest', () => {
    let clientConfig: IClientConfig;
    beforeEach(() => {
      clientConfig = {
        providers: [
          { url: publicApi, type: ProviderType.PUBLIC } as IProvider,
          { url: privateApi, type: ProviderType.PRIVATE } as IProvider,
        ],
        periodOffset: PERIOD_OFFSET,
      };
    });

    test('should correctly handle successful JSON RPC request', async () => {
      const expectedResult = { success: true };
      const baseClient = new BaseClient(clientConfig);

      // Mock promisifyJsonRpcCall
      baseClient.promisifyJsonRpcCall = jest.fn().mockResolvedValue({
        error: null,
        result: expectedResult,
      } as JsonRpcResponseData<typeof expectedResult>);

      const result = await baseClient.sendJsonRPCRequest(
        JSON_RPC_REQUEST_METHOD.GET_STATUS,
        {},
      );

      expect(baseClient.promisifyJsonRpcCall).toHaveBeenCalled();
      expect(result).toBe(expectedResult);
    });

    test('should throw an error if JSON RPC request fails', async () => {
      const expectedError = { message: 'Some error' };

      const baseClient = new BaseClient(clientConfig);

      // Mock promisifyJsonRpcCall
      baseClient.promisifyJsonRpcCall = jest.fn().mockResolvedValue({
        error: expectedError,
        result: null,
      } as JsonRpcResponseData<null>);

      await expect(
        baseClient.sendJsonRPCRequest(JSON_RPC_REQUEST_METHOD.GET_STATUS, {}),
      ).rejects.toEqual(expectedError);
      expect(baseClient.promisifyJsonRpcCall).toHaveBeenCalled();
    });
  });
});
