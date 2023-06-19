import { EventPoller, ON_MASSA_EVENT_DATA } from '../../src/web3/EventPoller';
import { IEventFilter } from '../../src/interfaces/IEventFilter';
import { IEventRegexFilter } from '../../src/interfaces/IEventRegexFilter';
import { IEvent } from '../../src/interfaces/IEvent';
import { ISlot } from '../../src/interfaces/ISlot';
import { Client } from '../../src/web3/Client';
import { WalletClient } from '../../src/web3/WalletClient';
import {
  ClientFactory,
  DefaultProviderUrls,
} from '../../src/web3/ClientFactory';
import { IAccount } from '../../src/interfaces/IAccount';

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
  });

  test('should poll for events, filter them, sort them, and emit ON_MASSA_EVENT_DATA event', async () => {
    const mockedEvents: IEvent[] = [
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

    // Mock the getFilteredScOutputEvents method to return the mocked events
    jest
      .spyOn(web3Client.smartContracts(), 'getFilteredScOutputEvents')
      .mockResolvedValue(mockedEvents);
    jest.spyOn(eventPoller, 'emit');

    // Set lastSlot to simulate an existing value
    eventPoller['lastSlot'] = { period: 1, thread: 1 } as ISlot;

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
});
