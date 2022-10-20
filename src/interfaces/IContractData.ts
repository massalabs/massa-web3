export interface IContractData {
	/// storage fee for taking place in books
	fee: number;
	/// The maximum amount of gas that the execution of the contract is allowed to cost.
	maxGas: number;
	/// The price per unit of gas that the caller is willing to pay for the execution.
	gasPrice: number;
	/// Extra coins that are spent by consensus and are available in the execution context of the contract.
	coins: number;
	/// Smart contract data as bytecode, text and base64 encoded.
	contractDataBase64?: string;
	contractDataText?: string;
	contractDataBinary?: Uint8Array;
	/// smart contract address
	address?: string;
	datastore?: Map<Uint8Array, Uint8Array>;
}
