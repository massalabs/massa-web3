"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventPoller = exports.ON_MASSA_EVENT_ERROR = exports.ON_MASSA_EVENT_DATA = void 0;
const tslib_1 = require("tslib");
const events_1 = require("events");
const Timeout_1 = require("../utils/Timeout");
/** Smart Contracts Event Poller */
exports.ON_MASSA_EVENT_DATA = "ON_MASSA_EVENT";
exports.ON_MASSA_EVENT_ERROR = "ON_MASSA_ERROR";
/** Smart Contracts Event Poller */
class EventPoller extends events_1.EventEmitter {
    constructor(eventsFilter, pollIntervalMillis, web3Client) {
        super();
        this.eventsFilter = eventsFilter;
        this.pollIntervalMillis = pollIntervalMillis;
        this.web3Client = web3Client;
        this.timeoutId = null;
        // bind class methods
        this.callback = this.callback.bind(this);
        this.stopPolling = this.stopPolling.bind(this);
        this.startPolling = this.startPolling.bind(this);
    }
    callback() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const events = yield this.web3Client.smartContracts().getFilteredScOutputEvents(this.eventsFilter);
                if (events.length > 0) {
                    this.emit(exports.ON_MASSA_EVENT_DATA, events);
                }
            }
            catch (ex) {
                this.emit(exports.ON_MASSA_EVENT_ERROR, ex);
            }
            // reset the interval
            this.timeoutId = new Timeout_1.Timeout(this.pollIntervalMillis, () => this.callback());
        });
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
        this.timeoutId = new Timeout_1.Timeout(this.pollIntervalMillis, () => that.callback());
    }
    static startEventsPollingAsync(eventsFilter, pollIntervalMillis, web3Client, onData, onError) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const eventPoller = new EventPoller(eventsFilter, pollIntervalMillis, web3Client);
            eventPoller.startPolling();
            return new Promise((resolve, reject) => {
                eventPoller.on(exports.ON_MASSA_EVENT_DATA, (data) => {
                    onData(data);
                });
                eventPoller.on(exports.ON_MASSA_EVENT_ERROR, (e) => {
                    onError(e);
                });
                return resolve(eventPoller);
            });
        });
    }
    static startEventPoller(eventsFilter, pollIntervalMillis, web3Client) {
        const eventPoller = new EventPoller(eventsFilter, pollIntervalMillis, web3Client);
        eventPoller.startPolling();
        return eventPoller;
    }
    static getEventsOnce(eventsFilter, web3Client) {
        return new Promise((resolve, reject) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const events = yield web3Client.smartContracts().getFilteredScOutputEvents(eventsFilter);
                return resolve(events);
            }
            catch (ex) {
                return reject(ex);
            }
        }));
    }
}
exports.EventPoller = EventPoller;
//# sourceMappingURL=EventPoller.js.map