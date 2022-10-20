export interface ITransactionOpType {
    Transaction: {
        amount: string, // represent an Amount in coins
        recipient_address: string
    };
}

export interface IRollBuyOpType {
    RollBuy: {
        roll_count: number
    };
}

export interface IRollSellOpType {
    RollSell: {
        roll_count: number
    };
}

export interface IExecSmartContractOpType {
    ExecuteSC: {
        data: [number], // vec of bytes to execute
        max_gas: number, // maximum amount of gas that the execution of the contract is allowed to cost
        gas_price: string, // represent an Amount in coins, price per unit of gas that the caller is willing to pay for the execution.
        datastore: Map<Uint8Array, Uint8Array>,
    };
}

export interface ICallSmartContractOpType {
    CallSC: {
        gas_price: string;
        max_gas: number;
        param: string;
        coins: string;
        target_addr: string;
        target_func: string;
    };
}

export enum OperationTypeId {
    Transaction = 0,
    RollBuy = 1,
    RollSell = 2,
    ExecuteSC = 3,
    CallSC = 4,
}

export type OpType = ITransactionOpType | IRollSellOpType | IRollBuyOpType | IExecSmartContractOpType | ICallSmartContractOpType;
