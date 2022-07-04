export interface IContractReadOperationData {
	executed_at: {
		"period": number,
		"thread": number
	};
	result: string; // "ok" or error message
	output_events: any;
}
