import { EventEmitter } from "stream";
import { IEvent } from "../interfaces/IEvent";
import { IEventFilter } from "../interfaces/IEventFilter";
import { Timeout } from "../utils/Timeout";
import { SmartContractsClient } from "./SmartContractsClient";

export const ON_EVENT = "ON_EVENT";

/** Smart Contracts Event Poller */
export class EventPoller extends EventEmitter {

	private timeoutId: Timeout = null;

	public constructor(private readonly eventsFilter: IEventFilter,
						private readonly pollIntervalMillis: number,
						private readonly smartContractsClient: SmartContractsClient) {
		super();

		// bind class methods
		this.callback = this.callback.bind(this);
		this.stopPolling = this.stopPolling.bind(this);
		this.startPolling = this.startPolling.bind(this);
	}

	private async callback() {
		try {
			const events: Array<IEvent> = await this.smartContractsClient.getFilteredScOutputEvents(this.eventsFilter);
			this.emit(ON_EVENT, events);
		} catch (ex) {
			console.error(ex);
		}	
	}

	public stopPolling(): void {
		if (this.timeoutId) this.timeoutId.clear();
	}

	public startPolling(): void {
		this.timeoutId = new Timeout(this.pollIntervalMillis, () => this.callback());
	}

	public static async getEventsAsync(eventsFilter: IEventFilter,
										pollIntervalMillis: number,
										smartContractsClient: SmartContractsClient): Promise<Array<IEvent>> {
		const eventPoller = new EventPoller(eventsFilter, pollIntervalMillis, smartContractsClient);
		eventPoller.startPolling();
		return new Promise((resolve, reject) => {
			eventPoller.on(ON_EVENT, (data: [IEvent]) => {
				eventPoller.stopPolling();
				return resolve(data)
			});
			eventPoller.on("error", (e) => {
				eventPoller.stopPolling();
				return reject(e);
			});
		});
	}
}
