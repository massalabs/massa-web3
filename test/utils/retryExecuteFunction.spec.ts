import { JSON_RPC_REQUEST_METHOD } from '../../src/interfaces/JsonRpcMethods';
import { trySafeExecute } from '../../src/utils/retryExecuteFunction';
import { wait } from '../../src/utils/time';

jest.mock('../../src/utils/time');

describe('trySafeExecute function', () => {
  beforeEach(() => {
    jest.spyOn(global, 'setTimeout');
    (wait as jest.Mock).mockImplementation((delay: number) => {
      return new Promise((resolve) => setTimeout(resolve, delay));
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should execute a function successfully on the first attempt', async () => {
    const mockFunc = jest.fn().mockResolvedValue('success');
    const result = await trySafeExecute(mockFunc, [
      JSON_RPC_REQUEST_METHOD.GET_STATUS,
      {},
    ]);
    expect(result).toEqual('success');
    expect(mockFunc).toHaveBeenCalledTimes(1);
  });

  it('should retry the function upon failure and succeed', async () => {
    const mockFunc = jest
      .fn()
      .mockRejectedValueOnce(new Error('failed'))
      .mockResolvedValue('success');
    const result = await trySafeExecute(mockFunc, [
      JSON_RPC_REQUEST_METHOD.GET_STATUS,
      {},
    ]);
    expect(result).toEqual('success');
    expect(mockFunc).toHaveBeenCalledTimes(2);
  });

  it('should retry the function the correct number of times and then throw an error', async () => {
    const mockFunc = jest.fn().mockRejectedValue(new Error('failed'));
    await expect(
      trySafeExecute(mockFunc, [JSON_RPC_REQUEST_METHOD.GET_STATUS, {}], 3),
    ).rejects.toThrow('failed');
    expect(mockFunc).toHaveBeenCalledTimes(3);
  });

  it('should throw an error when no function is provided', async () => {
    await expect(
      trySafeExecute(null, [JSON_RPC_REQUEST_METHOD.GET_STATUS, {}]),
    ).rejects.toThrow(`Function execution init conditions are erroneous: null`);
  });
});
