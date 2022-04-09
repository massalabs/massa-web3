"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventPoller = exports.ON_EVENT = void 0;
const tslib_1 = require("tslib");
const events_1 = require("events");
const Timeout_1 = require("../utils/Timeout");
exports.ON_EVENT = "ON_EVENT";
/** Smart Contracts Event Poller */
class EventPoller extends events_1.EventEmitter {
    constructor(eventsFilter, pollIntervalMillis, smartContractsClient) {
        super();
        this.eventsFilter = eventsFilter;
        this.pollIntervalMillis = pollIntervalMillis;
        this.smartContractsClient = smartContractsClient;
        this.timeoutId = null;
        // bind class methods
        this.callback = this.callback.bind(this);
        this.stopPolling = this.stopPolling.bind(this);
        this.startPolling = this.startPolling.bind(this);
    }
    callback() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            try {
                const events = yield this.smartContractsClient.getFilteredScOutputEvents(this.eventsFilter);
                this.emit(exports.ON_EVENT, events);
            }
            catch (ex) {
                console.error(ex);
            }
        });
    }
    stopPolling() {
        if (this.timeoutId)
            this.timeoutId.clear();
    }
    startPolling() {
        this.timeoutId = new Timeout_1.Timeout(this.pollIntervalMillis, () => this.callback());
    }
    static getEventsAsync(eventsFilter, pollIntervalMillis, smartContractsClient) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const eventPoller = new EventPoller(eventsFilter, pollIntervalMillis, smartContractsClient);
            eventPoller.startPolling();
            return new Promise((resolve, reject) => {
                eventPoller.on(exports.ON_EVENT, (data) => {
                    eventPoller.stopPolling();
                    return resolve(data);
                });
                eventPoller.on("error", (e) => {
                    eventPoller.stopPolling();
                    return reject(e);
                });
            });
        });
    }
}
exports.EventPoller = EventPoller;
//# sourceMappingURL=EventPoller.js.map