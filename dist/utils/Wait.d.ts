export declare const wait: (timeMilli: number) => Promise<void>;
export declare const promiseWithTimeout: (timeLimit: number, task: Promise<any>, failureValue: any) => Promise<any>;
