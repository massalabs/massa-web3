/* eslint-disable @typescript-eslint/no-var-requires */
import { IAccount } from '../../src/interfaces/IAccount';
import { IEventFilter } from '../../src/interfaces/IEventFilter';
import { ClientFactory } from '../../src/web3/ClientFactory';
import { IEvent } from '../../src/interfaces/IEvent';
import { IReadData } from '../../src/interfaces/IReadData';
import { WalletClient } from '../../src/web3/WalletClient';
import { awaitTxConfirmation, deploySmartContracts } from './deployer';
import { Args } from '../../src/utils/arguments';
import { readFileSync } from 'fs';
import { Client } from '../../src/web3/Client';
import {
  EventPoller,
  ON_MASSA_EVENT_DATA,
  ON_MASSA_EVENT_ERROR,
} from '../../src/web3/EventPoller';
import { INodeStatus } from '../../src/interfaces/INodeStatus';
import { withTimeoutRejection } from '../../src/utils/time';
import { bytesToStr, strToBytes } from '../../src/utils/serializers';
import { IDatastoreEntryInput } from '../../src/interfaces/IDatastoreEntryInput';
import { ICallData } from '../../src/interfaces/ICallData';
import * as dotenv from 'dotenv';
import { IProvider, ProviderType } from '../../src/interfaces/IProvider';
import { MassaAmount, MASSA_UNIT } from '../../src/web3/MassaAmount';
const path = require('path');
const chalk = require('chalk');
const ora = require('ora');

dotenv.config({
  path: path.resolve(__dirname, '..', '.env'),
});

const publicApi = process.env.JSON_RPC_URL_PUBLIC;
if (!publicApi) {
  throw new Error('Missing JSON_RPC_URL_PUBLIC in .env file');
}
const privateApi = process.env.JSON_RPC_URL_PRIVATE;
if (!privateApi) {
  throw new Error('Missing JSON_RPC_URL_PRIVATE in .env file');
}
const deployerPrivateKey = process.env.DEPLOYER_PRIVATE_KEY;
if (!deployerPrivateKey) {
  throw new Error('Missing DEPLOYER_PRIVATE_KEY in .env file');
}
const receiverPrivateKey = process.env.RECEIVER_PRIVATE_KEY;
if (!receiverPrivateKey) {
  throw new Error('Missing RECEIVER_PRIVATE_KEY in .env file');
}

const MASSA_EXEC_ERROR = 'massa_execution_error';

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
      await WalletClient.getAccountFromSecretKey(deployerPrivateKey);

    const web3Client: Client = await ClientFactory.createCustomClient(
      [
        { url: publicApi, type: ProviderType.PUBLIC } as IProvider,
        { url: privateApi, type: ProviderType.PRIVATE } as IProvider,
      ],
      true,
      deployerAccount,
    );

    const deployerAccountBalance = await web3Client
      .wallet()
      .getAccountBalance(deployerAccount.address as string);
    console.log(
      `Deployer Wallet Address: ${
        deployerAccount.address
      } with balance (candidate, final) = (${deployerAccountBalance?.candidate.toString()}, ${deployerAccountBalance?.final.toString()})`,
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
          coins: new MassaAmount(0.1, MASSA_UNIT.MASSA),
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
    eventPoller.stopPolling();

    // if errors, don't await finalization
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

    // =========================================
    // get function return value
    spinner = ora(
      `Getting a function return value from the deployed smart contract...`,
    ).start();
    const args = new Args();
    const result = await web3Client.smartContracts().readSmartContract({
      fee: new MassaAmount(0, MASSA_UNIT.MASSA),
      maxGas: new MassaAmount(700000, MASSA_UNIT.MASSA),
      targetAddress: scAddress,
      targetFunction: 'event',
      parameter: args.serialize(),
    } as IReadData);
    spinner.succeed(`Function Return Value: ${bytesToStr(result.returnValue)}`);

    // =========================================
    // make a smart contract call
    spinner = ora(
      `Calling a set function on the deployed smart contract...`,
    ).start();
    const callArgs = new Args();
    callArgs.addString('MY_KEY');
    callArgs.addString('MY_VALUE');
    const callOperationId = await web3Client
      .smartContracts()
      .callSmartContract({
        fee: new MassaAmount(0, MASSA_UNIT.MASSA),
        maxGas: new MassaAmount(10_500_000, MASSA_UNIT.MASSA),
        coins: new MassaAmount(0, MASSA_UNIT.MASSA),
        targetAddress: scAddress,
        functionName: 'setValueToStorage',
        parameter: callArgs.serialize(),
      } as ICallData);
    spinner.succeed(`Call operation ID: ${callOperationId}`);

    // await finalization
    await awaitTxConfirmation(web3Client, callOperationId);

    // =========================================
    // read value from store
    spinner = ora(
      `Reading from the deployed smart contract storage...`,
    ).start();
    const scStorage = await web3Client.publicApi().getDatastoreEntries([
      {
        address: scAddress,
        key: strToBytes('MY_KEY'),
      } as IDatastoreEntryInput,
    ]);
    if (!scStorage[0].final_value) {
      spinner.fail(`Storage contains null for that key. Something is wrong`);
    } else {
      spinner.succeed(
        `Deployed SC Storage entry: ${bytesToStr(scStorage[0].final_value)}`,
      );
    }

    // =========================================
    // read contract balance
    spinner = ora(`Getting deployed smart contract balance...`).start();
    const contractBalance = await web3Client
      .smartContracts()
      .getContractBalance(scAddress);
    spinner.succeed(
      `Deployed smart contract balance (candidate, final) = $(${contractBalance?.candidate.toString()},${contractBalance?.final.toString()})`,
    );
    process.exit(0);
  } catch (ex) {
    const msg = chalk.red(`Error = ${ex}`);
    if (spinner) spinner.fail(msg);
    process.exit(-1);
  }
})();
