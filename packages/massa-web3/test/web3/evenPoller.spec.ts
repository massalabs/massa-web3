import {
  EventPoller,
  ON_MASSA_EVENT_DATA,
  ON_MASSA_EVENT_ERROR,
} from '../../src/web3/EventPoller';
import { IEventFilter } from '../../src/interfaces/IEventFilter';
import { IEventRegexFilter } from '../../src/interfaces/IEventRegexFilter';
import { Client } from '../../src/web3/Client';
import { WalletClient } from '../../src/web3/WalletClient';
import {
  ClientFactory,
  DefaultProviderUrls,
} from '../../src/web3/ClientFactory';
import { IAccount } from '../../src/interfaces/IAccount';
import { Timeout } from '../../src/utils/time';
import { IEvent, ISlot } from '@massalabs/web3-utils';

// mock axios to intercept any axios POST request and resolve it immediately with an empty object, so
// no request is pending before Jest finishes the test
jest.mock('axios', () => ({
  post: jest.fn(() => Promise.resolve({ data: {} })),
}));

jest.mock('../../src/utils/time', () => {
  function Timeout(timeoutMil, callback) {
    this.isCleared = false;
    this.isCalled = false;
    this.timeoutHook = setTimeout(() => {
      if (!this.isCleared) {
        this.isCalled = true;
        callback();
      }
    }, timeoutMil);
    this.clear = function () {
      if (!this.isCleared) {
        clearTimeout(this.timeoutHook);
        this.isCleared = true;
      }
    };
  }
  return {
    Timeout: jest.fn(Timeout),
  };
});

// util function to create an event, only for that test file to avoid code duplication
function createEvent(
  id: string,
  data: string,
  slot: ISlot,
  callStack: string[],
): IEvent {
  return {
    id,
    data: JSON.stringify(data),
    context: {
      slot,
      block: null,
      read_only: false,
      call_stack: callStack,
      index_in_slot: 0,
      origin_operation_id: null,
      is_final: true,
      is_error: false,
    },
  };
}

describe('EventPoller', () => {
  let eventPoller: EventPoller;
  let baseAccount: IAccount;
  let web3Client: Client;

  const pollIntervalMillis = 1000;
  const eventFilter: IEventFilter | IEventRegexFilter = {
    start: { period: 2, thread: 1 },
    end: { period: 3, thread: 2 },
    emitter_address: 'address4',
    original_caller_address: null,
    original_operation_id: null,
    is_final: null,
  };

  beforeAll(async () => {
    baseAccount = await WalletClient.walletGenerateNewAccount();
    const provider = DefaultProviderUrls.TESTNET;
    web3Client = await ClientFactory.createDefaultClient(
      provider,
      true,
      baseAccount,
    );
  });

  beforeEach(async () => {
    eventPoller = new EventPoller(eventFilter, pollIntervalMillis, web3Client);
  });

  afterEach(() => {
    eventPoller.stopPolling();
    jest.clearAllMocks();
  });

  describe('compareByThreadAndPeriod', () => {
    test('callback should sort events by thread and period correctly', async () => {
      const mockedEvents: IEvent[] = [
        createEvent('event1', 'value1', { period: 1, thread: 1 }, ['address1']), // n°1
        createEvent('event2', 'value2', { period: 2, thread: 1 }, ['address2']), // n°3
        createEvent('event3', 'value3', { period: 1, thread: 2 }, ['address3']), // n°2
        createEvent('event5', 'value5', { period: 2, thread: 2 }, ['address4']), // n°4
        createEvent('event4', 'value4', { period: 1, thread: 2 }, ['address4']), // n°2
        createEvent('event6', 'value6', { period: 3, thread: 2 }, ['address4']), // n°5
      ];
      jest
        .spyOn(web3Client.smartContracts(), 'getFilteredScOutputEvents')
        .mockResolvedValue(mockedEvents);

      jest.spyOn(eventPoller, 'emit');

      await eventPoller['callback']();

      // The ON_MASSA_EVENT_DATA event should have been emitted with the events sorted by period and thread
      expect(eventPoller.emit).toHaveBeenCalledWith(ON_MASSA_EVENT_DATA, [
        mockedEvents[0],
        mockedEvents[2],
        mockedEvents[4],
        mockedEvents[1],
        mockedEvents[3],
        mockedEvents[5],
      ]);
    });
  });

  describe('startPolling', () => {
    test('should create a new Timeout instance and call callback function after delay', () => {
      jest.useFakeTimers();
      jest.spyOn(web3Client.smartContracts(), 'getFilteredScOutputEvents');

      eventPoller.startPolling();

      expect((Timeout as jest.Mock).mock.calls.length).toBe(1);
      expect((Timeout as jest.Mock).mock.calls[0][0]).toBe(pollIntervalMillis);

      // Fast-forward the timer and assert callback is called
      jest.runOnlyPendingTimers();
      expect(
        web3Client.smartContracts().getFilteredScOutputEvents,
      ).toHaveBeenCalledTimes(1);

      jest.useRealTimers();
    });
  });

  describe('startEventsPolling', () => {
    const onData = jest.fn();
    const onError = jest.fn();

    beforeEach(() => {
      jest.restoreAllMocks();
    });

    test('should start events polling and set onData and onError when both are provided', () => {
      const eventPoller = EventPoller.startEventsPolling(
        eventFilter,
        pollIntervalMillis,
        web3Client,
        onData,
        onError,
      );

      expect(eventPoller).toBeInstanceOf(EventPoller);
      expect(eventPoller.listenerCount(ON_MASSA_EVENT_DATA)).toBe(1);
      expect(eventPoller.listenerCount(ON_MASSA_EVENT_ERROR)).toBe(1);
    });

    test('should start events polling and set onData only when onError is not provided', () => {
      const eventPoller = EventPoller.startEventsPolling(
        eventFilter,
        pollIntervalMillis,
        web3Client,
        onData,
      );

      expect(eventPoller).toBeInstanceOf(EventPoller);
      expect(eventPoller.listenerCount(ON_MASSA_EVENT_DATA)).toBe(1);
      expect(eventPoller.listenerCount(ON_MASSA_EVENT_ERROR)).toBe(0);
    });

    test('should start events polling and set onError only when onData is not provided', () => {
      const eventPoller = EventPoller.startEventsPolling(
        eventFilter,
        pollIntervalMillis,
        web3Client,
        undefined,
        onError,
      );

      expect(eventPoller).toBeInstanceOf(EventPoller);
      expect(eventPoller.listenerCount(ON_MASSA_EVENT_DATA)).toBe(0);
      expect(eventPoller.listenerCount(ON_MASSA_EVENT_ERROR)).toBe(1);
    });
  });

  describe('getEventsOnce', () => {
    let spygetFilteredEvents;

    beforeEach(() => {
      spygetFilteredEvents = jest.spyOn(
        web3Client.smartContracts(),
        'getFilteredScOutputEvents',
      );
    });

    test('should return events when they match the filter', async () => {
      const expectedEvents: Array<IEvent> = [
        createEvent('1', 'data1', { period: 2, thread: 1 }, ['address1']),
        createEvent('2', 'data2', { period: 2, thread: 2 }, ['address2']),
        createEvent('3', 'data3', { period: 3, thread: 2 }, ['address3']),
      ];

      spygetFilteredEvents.mockResolvedValue(expectedEvents);
      const events = await EventPoller.getEventsOnce(eventFilter, web3Client);

      expect(
        web3Client.smartContracts().getFilteredScOutputEvents,
      ).toHaveBeenCalledWith(eventFilter);
      expect(events).toEqual(expectedEvents);
    });

    test('should return empty array when no events match the filter', async () => {
      spygetFilteredEvents.mockResolvedValue([]);

      const events = await EventPoller.getEventsOnce(eventFilter, web3Client);

      expect(
        web3Client.smartContracts().getFilteredScOutputEvents,
      ).toHaveBeenCalledTimes(1);
      expect(events).toEqual([]);
    });
  });
});
