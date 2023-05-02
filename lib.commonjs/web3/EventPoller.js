"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventPoller = exports.ON_MASSA_EVENT_ERROR = exports.ON_MASSA_EVENT_DATA = void 0;
const events_1 = require("events");
const time_1 = require("../utils/time");
/** Smart Contracts Event Poller */
exports.ON_MASSA_EVENT_DATA = 'ON_MASSA_EVENT';
exports.ON_MASSA_EVENT_ERROR = 'ON_MASSA_ERROR';
const sortByThreadAndPeriod = (a, b) => {
    const periodOrder = a.period - b.period;
    if (periodOrder === 0) {
        const threadOrder = a.thread - b.thread;
        return threadOrder;
    }
    return periodOrder;
};
/** Smart Contracts Event Poller */
class EventPoller extends events_1.EventEmitter {
    eventsFilter;
    pollIntervalMillis;
    web3Client;
    timeoutId = null;
    lastSlot;
    constructor(eventsFilter, pollIntervalMillis, web3Client) {
        super();
        this.eventsFilter = eventsFilter;
        this.pollIntervalMillis = pollIntervalMillis;
        this.web3Client = web3Client;
        // bind class methods
        this.callback = this.callback.bind(this);
        this.stopPolling = this.stopPolling.bind(this);
        this.startPolling = this.startPolling.bind(this);
    }
    async callback() {
        try {
            // get all events using the filter
            const events = await this.web3Client
                .smartContracts()
                .getFilteredScOutputEvents(this.eventsFilter);
            // filter further using regex and last scanned slot
            const filteredEvents = events.filter((event) => {
                // check if regex condition is met
                let meetsRegex = true;
                if (this.eventsFilter.eventsNameRegex) {
                    meetsRegex = event.data.includes(this.eventsFilter.eventsNameRegex);
                }
                // check if after last slot
                let isAfterLastSlot = true;
                if (this.lastSlot) {
                    isAfterLastSlot =
                        sortByThreadAndPeriod(event.context.slot, this.lastSlot) > 0;
                }
                return meetsRegex && isAfterLastSlot;
            });
            // sort after highest period and thread
            const sortedByHighestThreadAndPeriod = filteredEvents.sort((a, b) => {
                return sortByThreadAndPeriod(a.context.slot, b.context.slot);
            });
            if (sortedByHighestThreadAndPeriod.length > 0) {
                // update slot to be the very last slot
                this.lastSlot =
                    sortedByHighestThreadAndPeriod[sortedByHighestThreadAndPeriod.length - 1].context.slot;
                // emit the filtered events
                this.emit(exports.ON_MASSA_EVENT_DATA, sortedByHighestThreadAndPeriod);
            }
        }
        catch (ex) {
            this.emit(exports.ON_MASSA_EVENT_ERROR, ex);
        }
        // reset the interval
        this.timeoutId = new time_1.Timeout(this.pollIntervalMillis, () => this.callback());
    }
    stopPolling() {
        if (this.timeoutId)
            this.timeoutId.clear();
    }
    startPolling() {
        const that = this;
        if (this.timeoutId) {
            return;
        }
        this.timeoutId = new time_1.Timeout(this.pollIntervalMillis, () => that.callback());
    }
    static startEventsPolling(eventsFilter, pollIntervalMillis, web3Client, onData, onError) {
        const eventPoller = new EventPoller(eventsFilter, pollIntervalMillis, web3Client);
        eventPoller.startPolling();
        if (onData) {
            eventPoller.on(exports.ON_MASSA_EVENT_DATA, (data) => {
                onData(data);
            });
        }
        if (onError) {
            eventPoller.on(exports.ON_MASSA_EVENT_ERROR, (e) => {
                onError(e);
            });
        }
        return eventPoller;
    }
    static async getEventsOnce(eventsFilter, web3Client) {
        const events = await web3Client
            .smartContracts()
            .getFilteredScOutputEvents(eventsFilter);
        return events;
    }
}
exports.EventPoller = EventPoller;
//# sourceMappingURL=EventPoller.js.map