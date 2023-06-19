import { EventPoller } from '../../src/web3/EventPoller';
import { IEventFilter } from '../../src/interfaces/IEventFilter';
import { IEventRegexFilter } from '../../src/interfaces/IEventRegexFilter';
import { WalletClient } from '../../src/web3/WalletClient';
import {
  ClientFactory,
  DefaultProviderUrls,
} from '../../src/web3/ClientFactory';
import { IAccount } from '../../src/interfaces/IAccount';

describe('EventPoller', async () => {
  let eventPoller: EventPoller;

  const baseAccount: IAccount = await WalletClient.walletGenerateNewAccount();
  const provider = DefaultProviderUrls.TESTNET;
  const web3Client = await ClientFactory.createDefaultClient(
    provider,
    true,
    baseAccount,
  );

  const eventFilter: IEventFilter | IEventRegexFilter = {
    start: null,
    end: null,
    emitter_address: null,
    original_caller_address: null,
    original_operation_id: null,
    is_final: null,
  };
  const pollIntervalMillis = 1000;

  beforeEach(async () => {
    eventPoller = new EventPoller(eventFilter, pollIntervalMillis, web3Client);
  });

  afterEach(() => {
    eventPoller.stopPolling();
  });
});
