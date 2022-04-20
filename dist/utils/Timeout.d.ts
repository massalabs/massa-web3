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
