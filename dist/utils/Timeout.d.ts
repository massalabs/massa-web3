export declare class Timeout {
    constructor(timeoutMil: number, callback: () => void);
    private id;
    private isCleared;
    private isCalled;
    private timeoutHook;
    getId(): string;
    clear(): void;
}
export declare class Interval {
    constructor(timeoutMil: number, callback: () => void);
    private id;
    private isCleared;
    private isCalled;
    private intervalHook;
    getId(): string;
    clear(): void;
}
