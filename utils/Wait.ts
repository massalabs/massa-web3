import Timeout from "./Timeout";

export const wait = async (timeMilli: number): Promise<void> => {
	return new Promise<void>((resolve, reject) => {
		const timeout = new Timeout(timeMilli, () => {
			timeout.clear();
			resolve();
		});
	});
};