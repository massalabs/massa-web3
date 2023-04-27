export declare class Timeout {
    constructor(timeoutMil: number, callback: () => void);
    private isCleared;
    private isCalled;
    private timeoutHook;
    clear(): void;
}
export declare class Interval {
    constructor(timeoutMil: number, callback: () => void);
    private isCleared;
    private isCalled;
    private intervalHook;
    clear(): void;
}
export declare const wait: (timeMilli: number) => Promise<void>;
export declare function withTimeoutRejection<T>(promise: Promise<T>, timeoutMs: number): Promise<T>;
