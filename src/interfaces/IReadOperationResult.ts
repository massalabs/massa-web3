export interface IReadOperationResult {
	Ok?: Uint8Array; // Included in case of success. The result of the execution
	Error?: string; // Included in case of error. The error message
}
