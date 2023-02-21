/* eslint-disable @typescript-eslint/no-var-requires */
import { IAccount } from '../../src/interfaces/IAccount';
import { IEventFilter } from '../../src/interfaces/IEventFilter';
import {
  ClientFactory,
  DefaultProviderUrls,
} from '../../src/web3/ClientFactory';
import { IEvent } from '../../src/interfaces/IEvent';
import { IReadData } from '../../src/interfaces/IReadData';
import { WalletClient } from '../../src/web3/WalletClient';
import { awaitTxConfirmation, deploySmartContracts } from './deployer';
import { Args } from '../../src/utils/arguments';
import { readFileSync } from 'fs';
import { MassaCoin } from '../../src/web3/MassaCoin';
import { Client } from '../../src/web3/Client';
import {
  EventPoller,
  ON_MASSA_EVENT_DATA,
  ON_MASSA_EVENT_ERROR,
} from '../../src/web3/EventPoller';
import { INodeStatus } from '../../src/interfaces/INodeStatus';
const path = require('path');
const chalk = require('chalk');
const ora = require('ora');

const MASSA_EXEC_ERROR = 'massa_execution_error';

const DEPLOYER_SECRET_KEY =
  'S1NA786im4CFL5cHSmsGkGZFEPxqvgaRP8HXyThQSsVnWj4tR7d';

export async function withTimeoutRejection<T>(
  promise: Promise<T>,
  timeoutMs: number,
): Promise<T> {
  const sleep = new Promise((resolve, reject) =>
    setTimeout(
      () =>
        reject(
          new Error(
            `Timeout of ${timeoutMs} has passed and promise did not resolve`,
          ),
        ),
      timeoutMs,
    ),
  );
  return Promise.race([promise, sleep]) as Promise<T>;
}

interface IEventPollerResult {
  isError: boolean;
  eventPoller: EventPoller;
  events: IEvent[];
}

const pollAsyncEvents = async (
  web3Client: Client,
  opId: string,
): Promise<IEventPollerResult> => {
  // determine the last slot
  let nodeStatusInfo: INodeStatus | null | undefined = await web3Client
    .publicApi()
    .getNodeStatus();

  // set the events filter
  const eventsFilter = {
    start: (nodeStatusInfo as INodeStatus).last_slot,
    end: null,
    original_caller_address: null,
    original_operation_id: opId,
    emitter_address: null,
    is_final: false,
  } as IEventFilter;

  const eventPoller = EventPoller.startEventsPolling(
    eventsFilter,
    1000,
    web3Client,
  );

  return new Promise((resolve, reject) => {
    eventPoller.on(ON_MASSA_EVENT_DATA, (events: Array<IEvent>) => {
      console.log('Event Data Received:', events);
      let errorEvents: IEvent[] = events.filter((e) =>
        e.data.includes(MASSA_EXEC_ERROR),
      );
      if (errorEvents.length > 0) {
        return resolve({
          isError: true,
          eventPoller,
          events: errorEvents,
        } as IEventPollerResult);
      }

      if (events.length) {
        return resolve({
          isError: false,
          eventPoller,
          events,
        } as IEventPollerResult);
      } else {
        console.log('No events have been emitted during deployment');
      }
    });
    eventPoller.on(ON_MASSA_EVENT_ERROR, (error: Error) => {
      console.log('Event Data Error:', error);
      return reject(error);
    });
  });
};

(async () => {
  const header = '='.repeat(process.stdout.columns - 1);
  console.log(header);
  console.log(
    `${chalk.green.bold('Massa Smart Contract Interaction Example')}`,
  );
  console.log(header);

  let spinner;
  try {
    // init client
    const deployerAccount: IAccount =
      await WalletClient.getAccountFromSecretKey(DEPLOYER_SECRET_KEY);
    const web3Client = await ClientFactory.createDefaultClient(
      DefaultProviderUrls.TESTNET,
      true,
      deployerAccount,
    );
    const deployerAccountBalance = await web3Client
      .wallet()
      .getAccountBalance(deployerAccount.address as string);
    console.log(
      `Deployer Wallet Address: ${
        deployerAccount.address
      } with balance (candidate, final) = (${deployerAccountBalance?.candidate.rawValue()}, ${deployerAccountBalance?.final.rawValue()})`,
    );

    // deploy smart contract
    spinner = ora(
      `Running ${chalk.green('deployment')} of deployer smart contract....`,
    ).start();
    const deploymentOperationId = await deploySmartContracts(
      [
        {
          data: readFileSync(
            path.join(__dirname, '.', 'contracts', '/sc.wasm'),
          ),
          args: undefined,
          coins: new MassaCoin(0.1),
        },
      ],
      web3Client,
      0,
      1_000_000,
      deployerAccount,
    );
    spinner.succeed(
      `Deployed Smart Contract ${chalk.green(
        'successfully',
      )} with opId ${deploymentOperationId}`,
    );

    // async poll events in the background for the given opId
    const { isError, eventPoller, events }: IEventPollerResult =
      await withTimeoutRejection<IEventPollerResult>(
        pollAsyncEvents(web3Client, deploymentOperationId),
        20000,
      );

    // stop polling
    eventPoller.stopPolling;

    // if errors, dont await finalization
    if (isError) {
      throw new Error(
        `Massa Deployment Error: ${JSON.stringify(events, null, 4)}`,
      );
    }

    // await finalization
    await awaitTxConfirmation(web3Client, deploymentOperationId);

    // find an event that contains the emitted sc address
    spinner = ora(`Extracting deployed sc address from events....`).start();
    const addressEvent: IEvent | undefined = events.find((event) =>
      event.data.includes('Contract deployed at address'),
    );
    if (!addressEvent) {
      throw new Error(
        'No events were emitted from contract containing a message `SC created at:...`. Please make sure to include such a message in order to fetch the sc address',
      );
    }
    const scAddress: string = addressEvent.data.split(':')[1].trim();
    spinner.succeed(`Smart Contract Address: ${chalk.yellow(scAddress)}`);

    // finally get some read state
    spinner = ora(`Reading a smart contract state...`).start();
    const args = new Args();
    const result = await web3Client.smartContracts().readSmartContract({
      fee: 0,
      maxGas: 700000,
      targetAddress: scAddress,
      targetFunction: 'event',
      parameter: args.serialize(),
    } as IReadData);
    spinner.succeed(
      `Called read contract with operation ID ${chalk.yellow(
        JSON.stringify(result, null, 4),
      )}`,
    );
    console.info(
      'Read Operation Result',
      Buffer.from(result.returnValue).toString('utf-8'),
    );

    // read contract balance
    const contractBalance = await web3Client
      .smartContracts()
      .getContractBalance(scAddress);
    console.info(
      `Deployed smart contract balance (candidate, final) = $(${contractBalance?.candidate.rawValue()},${contractBalance?.final.rawValue()})`,
    );
    process.exit(0);
  } catch (ex) {
    const msg = chalk.red(`Error = ${ex}`);
    if (spinner) spinner.fail(msg);
    process.exit(-1);
  }
})();
