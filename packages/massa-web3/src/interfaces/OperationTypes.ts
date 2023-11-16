/**
 * Represents an operation which transfers of coins from one account to another.
 *
 * @see Transaction.amount - represent an Amount in coins (string)
 * @see Transaction.recipient_address - the address of the recipient
 */
export interface ITransactionOpType {
  Transaction: {
    amount: string; // represent an Amount in coins
    recipient_address: string;
  };
}

/**
 * Represents an operation which buys rolls.
 *
 * @see RollBuy.roll_count - the number of rolls to buy
 */
export interface IRollBuyOpType {
  RollBuy: {
    roll_count: number;
  };
}

/**
 * Represents an operation which sells rolls.
 *
 * @see RollSell.roll_count - the number of rolls to sell
 */
export interface IRollSellOpType {
  RollSell: {
    roll_count: number;
  };
}

/**
 * Represents an operation which executes a smart contract.
 *
 * @see ExecuteSC.data - vec of bytes to execute
 * @see ExecuteSC.max_gas - maximum amount of gas that the execution of the contract is allowed to cost
 * @see ExecuteSC.datastore - key-value pairs of data to be used by the smart contract
 */
export interface IExecSmartContractOpType {
  ExecuteSC: {
    data: number[]; // vec of bytes to execute
    max_gas: number; // maximum amount of gas that the execution of the contract is allowed to cost
    datastore: Map<Uint8Array, Uint8Array>;
  };
}

/**
 * Represents an operation which calls a smart contract.
 *
 * @see CallSC.max_gas - maximum amount of gas that the execution of the contract is allowed to cost
 * @see CallSC.param - parameter to pass to the target function
 * @see CallSC.coins - coins to transfer
 * @see CallSC.target_addr - target smart contract address
 * @see CallSC.target_func - target function name. No function is called if empty.
 * @see CallSC.caller_addr - caller address
 */
export interface ICallSmartContractOpType {
  CallSC: {
    max_gas: number;
    param: Array<number>;
    coins: string;
    target_addr: string;
    target_func: string;
  };
}

/**
 * Associates an operation type with a number.
 */
export enum OperationTypeId {
  Transaction = 0,
  RollBuy = 1,
  RollSell = 2,
  ExecuteSC = 3,
  CallSC = 4,
}

export type OpType =
  | ITransactionOpType
  | IRollSellOpType
  | IRollBuyOpType
  | IExecSmartContractOpType
  | ICallSmartContractOpType;
