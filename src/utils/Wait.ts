import { Timeout } from "./Timeout";

export const wait = async (timeMilli: number): Promise<void> => {
	return new Promise<void>((resolve, reject) => {
		const timeout = new Timeout(timeMilli, () => {
			timeout.clear();
			return resolve();
		});
	});
};

export const promiseWithTimeout = async (timeLimit: number, task: Promise<any>, failureValue: any): Promise<any> => {
	let timeout: NodeJS.Timer;
	const timeoutPromise = new Promise((resolve, reject) => {
	  timeout = setTimeout(() => {
		resolve(failureValue);
	  }, timeLimit);
	});
	const response = await Promise.race([task, timeoutPromise]);
	if (timeout) {
	  clearTimeout(timeout);
	}
	return response;
}
