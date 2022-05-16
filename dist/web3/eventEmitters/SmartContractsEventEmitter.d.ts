/// <reference types="node" />
import EventEmitter from "events";
import { IAccount } from "../../interfaces/IAccount";
import { IContractData } from "../../interfaces/IContractData";
import { ISignature } from "../../interfaces/ISignature";
export interface ISignedScDeployment {
    expiryPeriod: number;
    contractData: IContractData;
    sender: IAccount;
    bytesCompact: Buffer;
    signature?: ISignature;
}
export declare class SmartContractsEventEmitter extends EventEmitter {
    emitScDeploySign(payload: ISignedScDeployment): void;
    emitScDeploySigned(payload: ISignedScDeployment): void;
    emitScDeploySubmitted(operationIds: Array<string>): void;
    emitScDeployFailed(reason: string, ex: Error): void;
}
