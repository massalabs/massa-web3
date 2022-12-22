import { EventEmitter } from "events";
import { IEvent } from "../interfaces/IEvent";
import { IEventFilter } from "../interfaces/IEventFilter";
import { IEventRegexFilter } from "../interfaces/IEventRegexFilter";
import { ISlot } from "../interfaces/ISlot";
import { Timeout } from "../utils/Timeout";
import { JsonRpcClient } from "./JsonRpcClient";

/** Smart Contracts Event Poller */
export const ON_MASSA_EVENT_DATA = "ON_MASSA_EVENT";
export const ON_MASSA_EVENT_ERROR = "ON_MASSA_ERROR";

const sortByThreadAndPeriod = (a: ISlot, b: ISlot): number => {
	const periodOrder = a.period - b.period;
	if (periodOrder === 0) {
		const threadOrder = a.thread - b.thread;
		return threadOrder;
	}
	return periodOrder;
};

/** Smart Contracts Event Poller */
export class EventPoller extends EventEmitter {

	private timeoutId: Timeout|null = null;
	private lastSlot: ISlot;

	public constructor(private readonly eventsFilter: IEventFilter | IEventRegexFilter,
						private readonly pollIntervalMillis: number,
						private readonly web3Client: JsonRpcClient) {
		super();

		// bind class methods
		this.callback = this.callback.bind(this);
		this.stopPolling = this.stopPolling.bind(this);
		this.startPolling = this.startPolling.bind(this);
	}

	private async callback() {
		try {
            // get all events using the filter
			const events: Array<IEvent> = await this.web3Client
			.smartContracts()
			.getFilteredScOutputEvents(this.eventsFilter);

            // filter further using regex and last scanned slot
            const filteredEvents: Array<IEvent> = events.filter(event => {

				// check if regex condition is met
                let meetsRegex = true;
				if ((this.eventsFilter as IEventRegexFilter).eventsNameRegex) {
					meetsRegex = event.data.includes((this.eventsFilter as IEventRegexFilter).eventsNameRegex);
				}

				// check if after last slot
                let isAfterLastSlot = true;
                if (this.lastSlot) {
					isAfterLastSlot = sortByThreadAndPeriod(event.context.slot, this.lastSlot) > 0;
                }

                return meetsRegex && isAfterLastSlot;
            });

			// sort after highest period and thread
			const sortedByHighestThreadAndPeriod = filteredEvents.sort((a, b) => {
				return sortByThreadAndPeriod(a.context.slot, b.context.slot);
			});

            if (sortedByHighestThreadAndPeriod.length > 0) {
				// update slot to be the very last slot
				this.lastSlot = sortedByHighestThreadAndPeriod[sortedByHighestThreadAndPeriod.length - 1].context.slot;

				// emit the filtered events
                this.emit(ON_MASSA_EVENT_DATA, sortedByHighestThreadAndPeriod);
            }
		} catch (ex) {
            this.emit(ON_MASSA_EVENT_ERROR, ex);
		}

        // reset the interval
        this.timeoutId = new Timeout(this.pollIntervalMillis, () => this.callback());
	}

	public stopPolling(): void {
		if (this.timeoutId) this.timeoutId.clear();
	}

	public startPolling(): void {
        const that = this;
        if (this.timeoutId) {
            return;
        }
		this.timeoutId = new Timeout(this.pollIntervalMillis, () => that.callback());
	}

    public static startEventsPolling(eventsFilter: IEventFilter | IEventRegexFilter,
										pollIntervalMillis: number,
										web3Client: JsonRpcClient,
                                        onData?: (data: Array<IEvent>) => void,
                                        onError?: (err: Error) => void): EventPoller {
		const eventPoller = new EventPoller(eventsFilter, pollIntervalMillis, web3Client);
		eventPoller.startPolling();
		if (onData) {
			eventPoller.on(ON_MASSA_EVENT_DATA, (data: [IEvent]) => {
				onData(data);
			});
		}
		if (onError) {
			eventPoller.on(ON_MASSA_EVENT_ERROR, (e) => {
				onError(e);
			});
		}
		return eventPoller;
	}

	public static getEventsOnce(eventsFilter: IEventFilter | IEventRegexFilter,
								web3Client: JsonRpcClient): Promise<Array<IEvent>> {
		return new Promise(async (resolve, reject) => {
			try {
				const events: Array<IEvent> = await web3Client.smartContracts().getFilteredScOutputEvents(eventsFilter);
				return resolve(events);
			} catch (ex) {
				return reject(ex);
			}
		});
	}
}
