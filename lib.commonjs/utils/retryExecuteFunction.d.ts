type CallbackFunctionVariadicAnyReturn = (...args: any[]) => any;
export declare const trySafeExecute: <T>(func: CallbackFunctionVariadicAnyReturn, args?: any[], retryTimes?: number) => Promise<T>;
export {};
