import EventEmitter from "events";
import { IAccount } from "../../interfaces/IAccount";
import { IContractData } from "../../interfaces/IContractData";
import { ISignature } from "../../interfaces/ISignature";
import { SMART_CONTRACT_EVENTS } from "./SmartContractEvents";

export interface ISignedScDeployment {
    expiryPeriod: number;
    contractData: IContractData;
    sender: IAccount;
    bytesCompact: Buffer;
    signature?: ISignature;
}

export class SmartContractsEventEmitter extends EventEmitter {
	public emitScDeploySignature(payload: ISignedScDeployment): void {
		this.emit(SMART_CONTRACT_EVENTS.SC_DEPLOY_SIGN, payload);
	}

    public emitScDeploySubmitted(operationIds: Array<string>): void {
		this.emit(SMART_CONTRACT_EVENTS.SC_DEPLOY_SUBMITTED, operationIds);
	}

    public emitScDeployFailed(reason: string, ex: Error): void {
		this.emit(SMART_CONTRACT_EVENTS.SC_DEPLOY_FAILED, reason, ex);
	}
}