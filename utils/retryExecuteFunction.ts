import { wait } from "./Wait";

const MAX_NUMBER_RETRIALS: number = 5;

export const trySafeExecute = async <T>(func: Function, args?: any[], retryTimes: number = MAX_NUMBER_RETRIALS): Promise<T> => {
	args = args || [];

	if (!func)
		throw new Error(`Function execution init conditions are erroneous: ${func}`);

	let failureCounter = 0;
	let res: any = null;
	while (true) {
		try {
			res = await func(...args);
			break;
		}
		catch (ex) {
			const msg = `Failed to execute function. Retrying for ${++failureCounter}th time in 1s.`;
			console.error(msg);
			await wait(200 * (failureCounter + 1));

			if (failureCounter === retryTimes) {
				throw ex;
			}
		}
	}
	return res;
};