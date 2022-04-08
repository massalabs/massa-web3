export interface IContractReadOperationData {
    executed_at: {
        "period": number;
        "thread": number;
    };
    result: string;
    output_events: any;
}
