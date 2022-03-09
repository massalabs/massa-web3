export interface JsonRpcResponseData {
	isError: boolean;
	result: any;
	error: Error | null;
}