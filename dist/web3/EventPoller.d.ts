/// <reference types="node" />
import { EventEmitter } from "events";
import { IEvent } from "../interfaces/IEvent";
import { IEventFilter } from "../interfaces/IEventFilter";
import { Client } from "./Client";
/** Smart Contracts Event Poller */
export declare const ON_MASSA_EVENT_DATA = "ON_MASSA_EVENT";
export declare const ON_MASSA_EVENT_ERROR = "ON_MASSA_ERROR";
/** Smart Contracts Event Poller */
export declare class EventPoller extends EventEmitter {
    private readonly eventsFilter;
    private readonly pollIntervalMillis;
    private readonly web3Client;
    private timeoutId;
    constructor(eventsFilter: IEventFilter, pollIntervalMillis: number, web3Client: Client);
    private callback;
    stopPolling(): void;
    startPolling(): void;
    static startEventsPollingAsync(eventsFilter: IEventFilter, pollIntervalMillis: number, web3Client: Client, onData: (data: Array<IEvent>) => void, onError: (err: Error) => void): Promise<EventPoller>;
    static startEventPoller(eventsFilter: IEventFilter, pollIntervalMillis: number, web3Client: Client): EventPoller;
    static getEventsOnce(eventsFilter: IEventFilter, web3Client: Client): Promise<Array<IEvent>>;
}
