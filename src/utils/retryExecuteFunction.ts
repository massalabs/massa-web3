import { wait } from './time';

const MAX_NUMBER_RETRIALS = 5;
type CallbackFunctionVariadicAnyReturn = (...args: any[]) => any; // eslint-disable-line

/**
 * Tries to execute a function and retries if it fails.
 *
 * @param func - The function to execute
 * @param args - The arguments to pass to the function (optional)
 * @param retryTimes - The number of times to retry (default: 5)
 *
 * @throws If the function is not defined or if it fails after the number of retries
 *
 * @returns The result of the function upon successful execution
 */
export const trySafeExecute = async <T>(
  func: CallbackFunctionVariadicAnyReturn,
  args?: any[],
  retryTimes: number = MAX_NUMBER_RETRIALS,
): Promise<T> => {
  args = args || [];

  if (!func)
    throw new Error(
      `Function execution init conditions are erroneous: ${func}`,
    );

  let failureCounter = 0;
  let res: T = null;
  while (true) {
    try {
      res = await func(...args);
      break;
    } catch (ex) {
      const msg = `Failed to execute function ${
        func.name
      }. Retrying for ${++failureCounter}th time in 1s.`;
      console.error(msg);
      await wait(200 * (failureCounter + 1));

      if (failureCounter === retryTimes) {
        throw ex;
      }
    }
  }
  return res;
};
