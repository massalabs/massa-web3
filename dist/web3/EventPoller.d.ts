/// <reference types="node" />
import { EventEmitter } from "stream";
import { IEvent } from "../interfaces/IEvent";
import { IEventFilter } from "../interfaces/IEventFilter";
import { SmartContractsClient } from "./SmartContractsClient";
export declare const ON_EVENT = "ON_EVENT";
/** Smart Contracts Event Poller */
export declare class EventPoller extends EventEmitter {
    private readonly eventsFilter;
    private readonly pollIntervalMillis;
    private readonly smartContractsClient;
    private timeoutId;
    constructor(eventsFilter: IEventFilter, pollIntervalMillis: number, smartContractsClient: SmartContractsClient);
    private callback;
    stopPolling(): void;
    startPolling(): void;
    static getEventsAsync(eventsFilter: IEventFilter, pollIntervalMillis: number, smartContractsClient: SmartContractsClient): Promise<Array<IEvent>>;
}
