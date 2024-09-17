import { Operation } from '../operation';
import { CallSCOptions, ReadSCOptions, SmartContract } from '../smartContracts';
export declare class MRC20 extends SmartContract {
    version(options?: ReadSCOptions): Promise<string>;
    name(options?: ReadSCOptions): Promise<string>;
    symbol(options?: ReadSCOptions): Promise<string>;
    decimals(options?: ReadSCOptions): Promise<number>;
    totalSupply(options?: ReadSCOptions): Promise<bigint>;
    balanceOf(address: string, options?: ReadSCOptions): Promise<bigint>;
    transfer(to: string, amount: bigint, options?: CallSCOptions): Promise<Operation>;
    allowance(ownerAddress: string, spenderAddress: string, options?: ReadSCOptions): Promise<bigint>;
    increaseAllowance(spenderAddress: string, amount: bigint, options?: CallSCOptions): Promise<Operation>;
    decreaseAllowance(spenderAddress: string, amount: bigint, options?: CallSCOptions): Promise<Operation>;
    transferFrom(spenderAddress: string, recipientAddress: string, amount: bigint, options?: CallSCOptions): Promise<Operation>;
}
