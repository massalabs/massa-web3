export interface ICallData {
	/// storage fee for taking place in books
	fee: number;
	/// The maximum amount of gas that the execution of the contract is allowed to cost.
	maxGas: number;
	 /// The price per unit of gas that the caller is willing to pay for the execution.
	gasPrice: number;
	 /// Extra coins that are spent from the caller's parallel balance and transferred to the target
	parallelCoins: number;
	/// Extra coins that are spent from the caller's sequential balance and transferred to the target
	sequentialCoins: number;
	/// Target smart contract address
	targetAddress: string;
	/// Target function name. No function is called if empty.
	functionName: string;
	/// Parameter to pass to the target function
	parameter: string;
}
