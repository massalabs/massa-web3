import { MassaCoin } from "../web3/MassaCoin";

export interface ICallData {
	/// storage fee for taking place in books
	fee: number;
	/// The maximum amount of gas that the execution of the contract is allowed to cost.
	maxGas: number;
	 /// Extra coins that are spent from the caller's balance and transferred to the target
	coins: MassaCoin;
	/// Target smart contract address
	targetAddress: string;
	/// Target function name. No function is called if empty.
	functionName: string;
	/// Parameter to pass to the target function
	parameter: Array<number>;
}
