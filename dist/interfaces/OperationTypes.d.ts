export interface ITransactionOpType {
    Transaction: {
        amount: string;
        recipient_address: string;
    };
}
export interface IRollBuyOpType {
    RollBuy: {
        roll_count: number;
    };
}
export interface IRollSellOpType {
    RollSell: {
        roll_count: number;
    };
}
export interface IExecSmartContractOpType {
    ExecuteSC: {
        data: [number];
        max_gas: number;
        coins: string;
        gas_price: string;
    };
}
export interface ICallSmartContractOpType {
    CallSC: {
        gas_price: string;
        max_gas: number;
        parallel_coins: string;
        param: string;
        sequential_coins: string;
        target_addr: string;
        target_func: string;
    };
}
export declare enum OperationTypeId {
    Transaction = 0,
    RollBuy = 1,
    RollSell = 2,
    ExecuteSC = 3,
    CallSC = 4
}
export declare type OpType = ITransactionOpType | IRollSellOpType | IRollBuyOpType | IExecSmartContractOpType | ICallSmartContractOpType;
