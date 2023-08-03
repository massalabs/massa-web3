import { EventEmitter } from 'events';
import { IEventFilter } from '../interfaces/IEventFilter';
import { IEventRegexFilter } from '../interfaces/IEventRegexFilter';
import { Timeout } from '../utils/time';
import { Client } from './Client';
import { ISlot, IEvent } from '@massalabs/web3-utils';

/** Smart Contracts Event Poller */
export const ON_MASSA_EVENT_DATA = 'ON_MASSA_EVENT';
export const ON_MASSA_EVENT_ERROR = 'ON_MASSA_ERROR';

/**
 * Compares two ISlot instances based on their `period` and `thread` properties.
 *
 * @remarks
 * The comparison is primarily based on the 'period' property.  If the 'period' values are the same,
 * the comparison is then based on the 'thread' property.
 *
 * @param a - The first ISlot instance to be compared.
 * @param b - The second ISlot instance to be compared.
 *
 * @returns A positive number if 'a' should come after 'b', a negative number if 'a' should come before 'b',
 * or 0 if 'a' and 'b' are considered equal.
 */
const compareByThreadAndPeriod = (a: ISlot, b: ISlot): number => {
  const periodOrder = a.period - b.period;
  if (periodOrder === 0) {
    const threadOrder = a.thread - b.thread;
    return threadOrder;
  }
  return periodOrder;
};

/**
 * The EventPoller class provides a convenient way to poll events from the Massa network.
 */
export class EventPoller extends EventEmitter {
  private timeoutId: Timeout | null = null;
  private lastSlot: ISlot;

  /**
   * Constructor of the EventPoller object.
   *
   * @param eventsFilter - The filter to use for the events.
   * @param pollIntervalMillis - The interval in milliseconds to poll for events.
   * @param web3Client - The web3 client to use for polling.
   */
  public constructor(
    private readonly eventsFilter: IEventFilter | IEventRegexFilter,
    private readonly pollIntervalMillis: number,
    private readonly web3Client: Client,
  ) {
    super();

    // bind class methods.
    this.callback = this.callback.bind(this);
    this.stopPolling = this.stopPolling.bind(this);
    this.startPolling = this.startPolling.bind(this);
  }

  /**
   * Polls for new events that match a specified filter and emits them.
   *
   * @remarks
   * It uses the Web3 client to retrieve events from a smart contract and filters them further.
   * based on regular expression and last scanned slot.
   * If any matching events are found, it sorts them based on the highest period and thread and emits them.
   */
  private async callback() {
    try {
      // get all events using the filter.
      const events: Array<IEvent> = await this.web3Client
        .smartContracts()
        .getFilteredScOutputEvents(this.eventsFilter);

      // filter further using regex and last scanned slot.
      const filteredEvents: Array<IEvent> = events.filter((event) => {
        // check if regex condition is met.
        let meetsRegex = true;
        if ((this.eventsFilter as IEventRegexFilter).eventsNameRegex) {
          meetsRegex = event.data.includes(
            (this.eventsFilter as IEventRegexFilter).eventsNameRegex,
          );
        }

        // check if after last slot.
        let isAfterLastSlot = true;
        if (this.lastSlot) {
          isAfterLastSlot =
            compareByThreadAndPeriod(event.context.slot, this.lastSlot) > 0;
        }

        return meetsRegex && isAfterLastSlot;
      });

      // sort after highest period and thread.
      const sortedByHighestThreadAndPeriod = filteredEvents.sort((a, b) => {
        return compareByThreadAndPeriod(a.context.slot, b.context.slot);
      });

      if (sortedByHighestThreadAndPeriod.length > 0) {
        // update slot to be the very last slot.
        this.lastSlot =
          sortedByHighestThreadAndPeriod[
            sortedByHighestThreadAndPeriod.length - 1
          ].context.slot;

        // emit the filtered events.
        this.emit(ON_MASSA_EVENT_DATA, sortedByHighestThreadAndPeriod);
      }
    } catch (ex) {
      this.emit(ON_MASSA_EVENT_ERROR, ex);
    }

    // reset the interval.
    this.timeoutId = new Timeout(this.pollIntervalMillis, () =>
      this.callback(),
    );
  }

  /**
   * Stops polling for events.
   */
  public stopPolling(): void {
    if (this.timeoutId) this.timeoutId.clear();
  }

  /**
   * Starts polling for events.
   */
  public startPolling(): void {
    const that = this;
    if (this.timeoutId) {
      return;
    }
    this.timeoutId = new Timeout(this.pollIntervalMillis, () =>
      that.callback(),
    );
  }

  /**
   * Starts polling for events and returns the EventPoller object.
   *
   * @param eventsFilter - The filter to use for the events.
   * @param pollIntervalMillis - The interval in milliseconds to poll for events.
   * @param web3Client - The web3 client to use for polling.
   * @param onData - The callback function to call when new events are found.
   * @param onError - The callback function to call when an error occurs.
   *
   * @returns The EventPoller object created.
   */
  public static startEventsPolling(
    eventsFilter: IEventFilter | IEventRegexFilter,
    pollIntervalMillis: number,
    web3Client: Client,
    onData?: (data: Array<IEvent>) => void,
    onError?: (err: Error) => void,
  ): EventPoller {
    const eventPoller = new EventPoller(
      eventsFilter,
      pollIntervalMillis,
      web3Client,
    );
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

  /**
   * Get only the events that match the filter once.
   *
   * @param eventsFilter - The filter to use for the events.
   * @param web3Client - The web3 client to use for polling.
   *
   * @returns The events that match the filter as a promise.
   */
  public static async getEventsOnce(
    eventsFilter: IEventFilter | IEventRegexFilter,
    web3Client: Client,
  ): Promise<Array<IEvent>> {
    const events: Array<IEvent> = await web3Client
      .smartContracts()
      .getFilteredScOutputEvents(eventsFilter);
    return events;
  }
}
