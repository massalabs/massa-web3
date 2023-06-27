import {
  EventPoller,
  ON_MASSA_EVENT_DATA,
  ON_MASSA_EVENT_ERROR,
} from '../../src/web3/EventPoller';
import { EventFilter } from '../../src/interfaces/EventFilter';
import { EventRegexFilter } from '../../src/interfaces/EventRegexFilter';
import { Event } from '../../src/interfaces/Event';
import { Slot } from '../../src/interfaces/Slot';
import { Client } from '../../src/web3/Client';
import { WalletClient } from '../../src/web3/WalletClient';
import {
  ClientFactory,
  DefaultProviderUrls,
} from '../../src/web3/ClientFactory';
import { Account } from '../../src/interfaces/Account';
import { Timeout } from '../../src/utils/time';

// Mock the Timeout class
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

const mockedEvents: Event[] = [
  {
    id: 'event1',
    data: '{"key1": "value1"}',
    context: {
      slot: {
        period: 1,
        thread: 1,
      },
      block: null,
      read_only: false,
      call_stack: ['address1'],
      index_in_slot: 0,
      origin_operation_id: null,
      is_final: true,
      is_error: false,
    },
  },
  {
    id: 'event2',
    data: '{"key2": "value2"}',
    context: {
      slot: {
        period: 2,
        thread: 2,
      },
      block: null,
      read_only: false,
      call_stack: ['address2'],
      index_in_slot: 0,
      origin_operation_id: null,
      is_final: true,
      is_error: false,
    },
  },
  {
    id: 'event3',
    data: '{"key3": "value3"}',
    context: {
      slot: {
        period: 3,
        thread: 3,
      },
      block: null,
      read_only: false,
      call_stack: ['address3'],
      index_in_slot: 0,
      origin_operation_id: null,
      is_final: true,
      is_error: false,
    },
  },
];

describe('EventPoller', () => {
  let eventPoller: EventPoller;
  let baseAccount: Account;
  let web3Client: Client;

  const pollIntervalMillis = 1000;
  const eventFilter: EventFilter | EventRegexFilter = {
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
  });

  test('should poll for events, filter them, sort them, and emit ON_MASSA_EVENT_DATA event', async () => {
    // Mock the getFilteredScOutputEvents method to return the mocked events
    jest
      .spyOn(web3Client.smartContracts(), 'getFilteredScOutputEvents')
      .mockResolvedValue(mockedEvents);
    jest.spyOn(eventPoller, 'emit');

    // Set lastSlot to simulate an existing value
    eventPoller['lastSlot'] = { period: 1, thread: 1 } as Slot;

    await eventPoller['callback']();

    // Verify the correct methods were called with the correct arguments
    expect(
      web3Client.smartContracts().getFilteredScOutputEvents,
    ).toHaveBeenCalledWith(eventFilter);
    expect(eventPoller.emit).toHaveBeenCalledWith(
      ON_MASSA_EVENT_DATA,
      mockedEvents.slice(1), // The events with a slot after { period: 1, thread: 1 }
    );
    expect(eventPoller['lastSlot']).toEqual(
      mockedEvents[mockedEvents.length - 1].context.slot,
    );
  });

  test('should emit ON_MASSA_EVENT_ERROR event if an error occurs', async () => {
    const errorMessage = 'An error occurred';
    // Mock the getFilteredScOutputEvents method to throw an error
    jest
      .spyOn(web3Client.smartContracts(), 'getFilteredScOutputEvents')
      .mockRejectedValue(new Error(errorMessage));
    jest.spyOn(eventPoller, 'emit');

    await eventPoller['callback']();
    // Verify the error event was emitted
    expect(eventPoller.emit).toHaveBeenCalledWith(
      ON_MASSA_EVENT_ERROR,
      new Error(errorMessage),
    );
  });

  test('should reset the interval and call callback again after the specified poll interval', async () => {
    const consoleSpy = jest.spyOn(console, 'error');
    consoleSpy.mockImplementation(() => null);

    // Set lastSlot to simulate an existing value
    eventPoller['lastSlot'] = { period: 1, thread: 1 } as Slot;

    // Replacing setTimeout with jest's fake timers
    jest.useFakeTimers();
    await eventPoller['callback']();

    // Assert that setTimeout was called once and with the correct arguments
    expect(Timeout).toHaveBeenCalledTimes(1);
    expect(Timeout).toHaveBeenCalledWith(
      pollIntervalMillis,
      expect.any(Function),
    );

    // Fast-forward the timer and assert callback is called again
    jest.runOnlyPendingTimers();

    // Assert that getFilteredScOutputEvents was called twice
    expect(
      web3Client.smartContracts().getFilteredScOutputEvents,
    ).toHaveBeenCalledTimes(2);

    jest.useRealTimers();

    consoleSpy.mockRestore();
  });
});
