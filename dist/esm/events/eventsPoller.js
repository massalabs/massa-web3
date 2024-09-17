import { NB_THREADS } from '../client';
import EventEmitter from 'eventemitter3';
/** Smart Contracts Event Poller */
export const ON_MASSA_EVENT_DATA = 'ON_MASSA_EVENT';
export const ON_MASSA_EVENT_ERROR = 'ON_MASSA_ERROR';
export const DEFAULT_POLL_INTERVAL_MS = 1000;
// get the next slot
function nextSlot(prevSlot) {
    const slot = prevSlot;
    if (slot.thread < NB_THREADS - 1) {
        slot.thread++;
    }
    else {
        slot.thread = 0;
        slot.period++;
    }
    return slot;
}
/**
 * The EventPoller class provides a convenient way to poll events from the Massa network.
 */
export class EventPoller extends EventEmitter {
    provider;
    eventsFilter;
    pollIntervalMs;
    intervalId;
    lastSlot;
    /**
     * Constructor of the EventPoller object.
     *
     * @param provider - The provider to use for polling.
     * @param eventsFilter - The filter to use for the events.
     * @param pollIntervalMs - The interval in milliseconds to poll for events.
     */
    constructor(provider, eventsFilter, pollIntervalMs) {
        super();
        this.provider = provider;
        this.eventsFilter = eventsFilter;
        this.pollIntervalMs = pollIntervalMs;
    }
    poll = async () => {
        try {
            if (this.lastSlot) {
                this.eventsFilter.start = nextSlot(this.lastSlot);
            }
            const events = await this.provider.getEvents(this.eventsFilter);
            if (events.length) {
                this.emit(ON_MASSA_EVENT_DATA, events);
                this.lastSlot = events[events.length - 1].context.slot;
            }
        }
        catch (ex) {
            this.emit(ON_MASSA_EVENT_ERROR, ex);
        }
    };
    /**
     * Stops polling for events.
     */
    stop = () => {
        if (this.intervalId) {
            clearInterval(this.intervalId);
        }
    };
    /**
     * Starts polling for events.
     */
    start() {
        this.stop();
        this.intervalId = setInterval(this.poll, this.pollIntervalMs);
    }
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
    // eslint-disable-next-line max-params
    static start(provider, eventsFilter, onData, onError, pollIntervalMs = DEFAULT_POLL_INTERVAL_MS) {
        const eventPoller = new EventPoller(provider, eventsFilter, pollIntervalMs);
        if (onData) {
            eventPoller.on(ON_MASSA_EVENT_DATA, onData);
        }
        if (onError) {
            eventPoller.on(ON_MASSA_EVENT_ERROR, onError);
        }
        eventPoller.start();
        return {
            stopPolling: eventPoller.stop,
        };
    }
}
//# sourceMappingURL=eventsPoller.js.map