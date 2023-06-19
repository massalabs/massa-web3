import { EventPoller, ON_MASSA_EVENT_DATA } from '../../src/web3/EventPoller';
import { IEventFilter } from '../../src/interfaces/IEventFilter';
import { IEventRegexFilter } from '../../src/interfaces/IEventRegexFilter';
import { IEvent } from '../../src/interfaces/IEvent';
import { Client } from '../../src/web3/Client';
import { WalletClient } from '../../src/web3/WalletClient';
import {
  ClientFactory,
  DefaultProviderUrls,
} from '../../src/web3/ClientFactory';
import { IAccount } from '../../src/interfaces/IAccount';
import { ISlot } from '../../src/interfaces/ISlot';
import { Timeout } from '../../src/utils/time';

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

describe('EventPoller', () => {
  let eventPoller: EventPoller;
  let baseAccount: IAccount;
  let web3Client: Client;

  const pollIntervalMillis = 1000;
  const eventFilter: IEventFilter | IEventRegexFilter = {
    start: null,
    end: null,
    emitter_address: null,
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
    jest.resetAllMocks();
  });

  describe('compareByThreadAndPeriod', () => {
    test('callback should sort events by thread and period correctly', async () => {
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
});
