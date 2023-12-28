/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-console */
import { IAccount } from '../../src/interfaces/IAccount';
import { IEventFilter } from '../../src/interfaces/IEventFilter';
import { ClientFactory } from '../../src/web3/ClientFactory';
import { IReadData } from '../../src/interfaces/IReadData';
import { WalletClient } from '../../src/web3/WalletClient';
import { awaitTxConfirmation, deploySmartContracts } from './deployer';
import { readFileSync } from 'fs';
import { Client } from '../../src/web3/Client';
import {
  EventPoller,
  ON_MASSA_EVENT_DATA,
  ON_MASSA_EVENT_ERROR,
} from '../../src/web3/EventPoller';
import { INodeStatus } from '../../src/interfaces/INodeStatus';
import { withTimeoutRejection } from '../../src/utils/time';
import { IDatastoreEntryInput } from '../../src/interfaces/IDatastoreEntryInput';
import { ICallData } from '../../src/interfaces/ICallData';
import * as dotenv from 'dotenv';
import { IProvider, ProviderType } from '../../src/interfaces/IProvider';
import {
  Args,
  IDeserializedResult,
  IEvent,
  ISerializable,
  fromMAS,
  strToBytes,
  toMAS,
} from '../../src';
import { getEnvVariable } from '../utils';

const path = require('path');
const chalk = require('chalk');
const ora = require('ora');

class MusicAlbum implements ISerializable<MusicAlbum> {
  constructor(
    public id: string = '',
    public title: string = '',
    public artist: string = '',
    public album: string = '',
    public year = 0,
  ) {}

  public serialize(): Uint8Array {
    const args = new Args();
    args.addString(this.id);
    args.addString(this.title);
    args.addString(this.artist);
    args.addString(this.album);
    args.addU64(BigInt(this.year));
    return Uint8Array.from(args.serialize());
  }

  public deserialize(
    data: Uint8Array,
    offset: number,
  ): IDeserializedResult<MusicAlbum> {
    const args = new Args(data, offset);

    const id = args.nextString();
    this.id = id;

    const title = args.nextString();
    this.title = title;

    const artist = args.nextString();
    this.artist = artist;

    const album = args.nextString();
    this.album = album;

    const year = args.nextU64();
    this.year = Number(year);

    return {
      instance: this,
      offset: args.getOffset(),
    } as IDeserializedResult<MusicAlbum>;
  }
}

dotenv.config({
  path: path.resolve(__dirname, '..', '.env'),
});

const publicApi = getEnvVariable('JSON_RPC_URL_PUBLIC');
const privateApi = getEnvVariable('JSON_RPC_URL_PRIVATE');
const chainId_ = getEnvVariable('CHAIN_ID');
const chainId = BigInt(chainId_);
const deployerPrivateKey = getEnvVariable('DEPLOYER_PRIVATE_KEY');
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
      chainId,
      true,
      deployerAccount,
    );

    const accountAddress = deployerAccount.address;

    if (!accountAddress) {
      throw new Error('Missing account address');
    }

    const deployerAccountBalance = await web3Client
      .wallet()
      .getAccountBalance(accountAddress);

    console.log(
      `Deployer Wallet Address: ${accountAddress} with balance (candidate, final) = (${toMAS(
        deployerAccountBalance?.candidate.toString() as string,
      )}, ${toMAS(deployerAccountBalance?.final.toString() as string)})`,
    );

    // deploy smart contract
    spinner = ora(
      `Running ${chalk.green('deployment')} of deployer smart contract....`,
    ).start();

    const baseAccount = web3Client.wallet().getBaseAccount();

    if (!baseAccount) {
      throw new Error('Failed to get base account');
    }

    const deploymentOperationId = await deploySmartContracts(
      [
        {
          data: readFileSync(
            path.join(__dirname, '.', 'contracts', '/sc.wasm'),
          ),
          args: undefined,
          coins: fromMAS(0.1),
        },
      ],
      web3Client,
      baseAccount,
      0n,
      3000_000_000n,
      fromMAS(1.5),
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
    // get function return value: get the music album
    spinner = ora(
      `Getting a function return value from the deployed smart contract...`,
    ).start();
    const args = new Args().addString('1');
    const result = await web3Client.smartContracts().readSmartContract({
      fee: 0n,
      maxGas: 2000_000_000n,
      targetAddress: scAddress,
      targetFunction: 'getMusicAlbum',
      parameter: args.serialize(),
    } as IReadData);

    const res = new Args(result.returnValue, 0);
    const musicAlbum = res.nextSerializable(MusicAlbum);
    spinner.succeed(
      `Function Return Value: ${JSON.stringify(musicAlbum, null, 4)}`,
    );

    // =========================================
    // make a smart contract call: delete the music album
    spinner = ora(
      `Calling a set function on the deployed smart contract...`,
    ).start();
    const deleteMusicAlbumArgs = new Args().addString('1');
    const deleteMusicAlbumCallOperationId = await web3Client
      .smartContracts()
      .callSmartContract({
        fee: 0n,
        maxGas: BigInt(10_500_000),
        coins: 0n,
        targetAddress: scAddress,
        functionName: 'deleteMusicAlbum',
        parameter: deleteMusicAlbumArgs.serialize(),
      } as ICallData);
    spinner.succeed(
      `Delete Music Album operation ID: ${deleteMusicAlbumCallOperationId}`,
    );

    // await finalization
    await awaitTxConfirmation(web3Client, deleteMusicAlbumCallOperationId);

    // =========================================
    // make a smart contract call: create a new music album
    spinner = ora(
      `Calling a set function on the deployed smart contract...`,
    ).start();
    const newMusicAlbum = new MusicAlbum(
      '1',
      'CD',
      'The Beatles',
      'Let It Be',
      1970,
    );
    const createMusicAlbumCallArgs = new Args(newMusicAlbum.serialize());
    const createMusicAlbumCallOperationId = await web3Client
      .smartContracts()
      .callSmartContract({
        fee: 0n,
        maxGas: BigInt(10_500_000),
        coins: 0n,
        targetAddress: scAddress,
        functionName: 'addMusicAlbum',
        parameter: createMusicAlbumCallArgs.serialize(),
      } as ICallData);
    spinner.succeed(
      `Create Music Album Operation ID: ${createMusicAlbumCallOperationId}`,
    );

    // await finalization
    await awaitTxConfirmation(web3Client, createMusicAlbumCallOperationId);

    // =========================================
    // read value from store: read music album content
    spinner = ora(
      `Reading Music Album from the deployed smart contract storage...`,
    ).start();
    const scStorage = await web3Client.publicApi().getDatastoreEntries([
      {
        address: scAddress,
        key: strToBytes(`MUSIC_ALBUM_KEY_1`),
      } as IDatastoreEntryInput,
    ]);
    if (!scStorage[0].final_value) {
      spinner.fail(`Storage contains null for that key. Something is wrong`);
    } else {
      const res = new Args(scStorage[0].final_value, 0);
      const musicAlbum = res.nextSerializable(MusicAlbum);
      spinner.succeed(
        `Music Album from Storage: ${JSON.stringify(musicAlbum, null, 4)}`,
      );
    }

    // =========================================
    // read contract balance
    spinner = ora(`Getting deployed smart contract balance...`).start();
    const contractBalance = await web3Client
      .smartContracts()
      .getContractBalance(scAddress);
    spinner.succeed(
      `Deployed smart contract balance (candidate, final) = $(${toMAS(
        contractBalance?.candidate.toString() as string,
      )},${toMAS(contractBalance?.final.toString() as string)})`,
    );
    process.exit(0);
  } catch (ex) {
    console.error(ex);
    const msg = chalk.red(`Error = ${ex}`);
    if (spinner) spinner.fail(msg);
    process.exit(-1);
  }
})();
