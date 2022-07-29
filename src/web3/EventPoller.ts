import { EventEmitter } from "events";
import { IEvent } from "../interfaces/IEvent";
import { IEventFilter } from "../interfaces/IEventFilter";
import { Timeout } from "../utils/Timeout";
import { Client } from "./Client";

/** Smart Contracts Event Poller */
export const ON_MASSA_EVENT_DATA = "ON_MASSA_EVENT";
export const ON_MASSA_EVENT_ERROR = "ON_MASSA_ERROR";

/** Smart Contracts Event Poller */
export class EventPoller extends EventEmitter {

	private timeoutId: Timeout|null = null;

	public constructor(private readonly eventsFilter: IEventFilter,
						private readonly pollIntervalMillis: number,
						private readonly web3Client: Client) {
		super();

		// bind class methods
		this.callback = this.callback.bind(this);
		this.stopPolling = this.stopPolling.bind(this);
		this.startPolling = this.startPolling.bind(this);
	}

	private async callback() {
		try {
			const events: Array<IEvent> = await this.web3Client.smartContracts().getFilteredScOutputEvents(this.eventsFilter);
            if(events.length > 0) {
                this.emit(ON_MASSA_EVENT_DATA, events);
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

    public static async startEventsPollingAsync(eventsFilter: IEventFilter,
										pollIntervalMillis: number,
										web3Client: Client,
                                        onData: (data: Array<IEvent>) => void,
                                        onError: (err: Error) => void): Promise<EventPoller> {
		const eventPoller = new EventPoller(eventsFilter, pollIntervalMillis, web3Client);
		eventPoller.startPolling();
		return new Promise((resolve, reject) => {
			eventPoller.on(ON_MASSA_EVENT_DATA, (data: [IEvent]) => {
				onData(data);
			});
			eventPoller.on(ON_MASSA_EVENT_ERROR, (e) => {
				onError(e);
			});

            return resolve(eventPoller)
		});
	}

    public static startEventPoller(eventsFilter: IEventFilter,
										pollIntervalMillis: number,
										web3Client: Client): EventPoller {
		const eventPoller = new EventPoller(eventsFilter, pollIntervalMillis, web3Client);
		eventPoller.startPolling();
        return eventPoller;
	}
}
