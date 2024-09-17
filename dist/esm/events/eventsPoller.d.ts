import { Provider } from '../provider';
import { EventFilter, SCEvent } from '../client';
import EventEmitter from 'eventemitter3';
/** Smart Contracts Event Poller */
export declare const ON_MASSA_EVENT_DATA = "ON_MASSA_EVENT";
export declare const ON_MASSA_EVENT_ERROR = "ON_MASSA_ERROR";
export declare const DEFAULT_POLL_INTERVAL_MS = 1000;
/**
 * The EventPoller class provides a convenient way to poll events from the Massa network.
 */
export declare class EventPoller extends EventEmitter {
    private readonly provider;
    private readonly eventsFilter;
    private readonly pollIntervalMs;
    private intervalId;
    private lastSlot;
    /**
     * Constructor of the EventPoller object.
     *
     * @param provider - The provider to use for polling.
     * @param eventsFilter - The filter to use for the events.
     * @param pollIntervalMs - The interval in milliseconds to poll for events.
     */
    constructor(provider: Provider, eventsFilter: EventFilter, pollIntervalMs: number);
    private poll;
    /**
     * Stops polling for events.
     */
    private stop;
    /**
     * Starts polling for events.
     */
    private start;
    /**
     * Starts polling for events and returns the stopPolling function.
     *
     * @param provider - The provider to use for polling.
     * @param eventsFilter - The filter to use for the events.
     * @param onData - The callback function to call when new events are found.
     * @param onError - The callback function to call when an error occurs.
     * @param pollIntervalMs - The interval in milliseconds to poll for events. Default is 1000Ms.
     *
     * @returns An object containing the stopPolling function.
     */
    static start(provider: Provider, eventsFilter: EventFilter, onData?: (data: SCEvent[]) => void, onError?: (err: Error) => void, pollIntervalMs?: number): {
        stopPolling: () => void;
    };
}
