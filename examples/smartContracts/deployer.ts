/* eslint-disable @typescript-eslint/no-var-requires */
import { IAccount } from '../../src/interfaces/IAccount';
import { IContractData } from '../../src/interfaces/IContractData';
import { Client } from '../../src/web3/Client';
import { EOperationStatus } from '../../src/interfaces/EOperationStatus';
import { Args } from '../../src/utils/arguments';
import { readFileSync } from 'fs';
import BigNumber from 'bignumber.js';
import { u64ToBytes, u8toByte } from '../../src/utils/serializers';
import { fromMAS } from '../../src';
const path = require('path');
const chalk = require('chalk');

interface ISCData {
  data: Uint8Array;
  args?: Args;
  coins: bigint;
}

async function checkBalance(
  web3Client: Client,
  account: IAccount,
  requiredBalance: bigint,
) {
  const balance = await web3Client
    .wallet()
    .getAccountBalance(account.address as string);
  if (!balance?.final || balance.final < requiredBalance) {
    throw new Error('Insufficient MAS balance.');
  }
}

export async function awaitTxConfirmation(
  web3Client: Client,
  deploymentOperationId: string,
): Promise<void> {
  console.log(`Awaiting ${chalk.green('FINAL')} transaction status....`);
  let status: EOperationStatus;
  try {
    status = await web3Client
      .smartContracts()
      .awaitRequiredOperationStatus(
        deploymentOperationId,
        EOperationStatus.FINAL,
      );
    console.log(
      `Transaction with Operation ID ${chalk.yellow(
        deploymentOperationId,
      )} has reached finality!`,
    );
  } catch (ex) {
    const msg = chalk.red(
      `Error getting finality of transaction ${chalk.yellow(
        deploymentOperationId,
      )}`,
    );
    console.error(msg);
    throw new Error(ex);
  }

  if (status !== EOperationStatus.FINAL) {
    const msg = chalk.red(
      `Transaction ${chalk.yellow(
        deploymentOperationId,
      )} did not reach finality after considerable amount of time. Try redeploying anew`,
    );
    console.error(msg);
    throw new Error(msg);
  }
}

export const deploySmartContracts = async (
  contractsToDeploy: ISCData[],
  web3Client: Client,
  maxCoins,
  fee = 0n,
  maxGas = 1_000_000n,
  deployerAccount?: IAccount,
): Promise<string> => {
  let deploymentOperationId: string;
  try {
    // check deployer account balance
    const coinsRequired = contractsToDeploy.reduce(
      (acc, contract) => acc + contract.coins,
      0n,
    );

    // do checks
    if (!deployerAccount) {
      let baseAccount = web3Client.wallet().getBaseAccount();
      if (baseAccount) {
        await checkBalance(web3Client, baseAccount, coinsRequired);
      } else {
        throw new Error('No account provided');
      }
    } else {
      await checkBalance(web3Client, deployerAccount, coinsRequired);
    }

    // construct a new datastore
    const datastore = new Map<Uint8Array, Uint8Array>();

    // set the number of contracts
    datastore.set(
      new Uint8Array([0x00]),
      u64ToBytes(BigInt(contractsToDeploy.length)),
    );
    // loop through all contracts and fill datastore
    for (let i = 0; i < contractsToDeploy.length; i++) {
      const contract: ISCData = contractsToDeploy[i];

      datastore.set(u64ToBytes(BigInt(i + 1)), contract.data);
      if (contract.args) {
        datastore.set(
          new Uint8Array(
            new Args()
              .addU64(BigInt(i + 1))
              .addUint8Array(u8toByte(0))
              .serialize(),
          ),
          new Uint8Array(contract.args.serialize()),
        );
      }
      if (contract.coins > 0) {
        datastore.set(
          new Uint8Array(
            new Args()
              .addU64(BigInt(i + 1))
              .addUint8Array(u8toByte(1))
              .serialize(),
          ),
          u64ToBytes(contract.coins), // scaled value to be provided here
        );
      }
    }

    // deploy deployer contract
    console.log(`Running ${chalk.green('deployment')} of smart contract....`);
    try {
      const coins = contractsToDeploy.reduce(
        // scaled value to be provided here
        (acc, contract) => contract.coins + acc,
        0n,
      );
      console.log('Sending coins ... ', coins.toString());

      deploymentOperationId = await web3Client
        .smartContracts()
        .deploySmartContract(
          {
            contractDataBinary: readFileSync(
              path.join(__dirname, '.', 'contracts', '/deployer.wasm'),
            ),
            datastore,
            fee,
            maxCoins,
            maxGas,
          } as IContractData,
          deployerAccount,
        );
      console.log(
        `Smart Contract ${chalk.green(
          'successfully',
        )} deployed to Massa Network. Operation ID ${chalk.yellow(
          deploymentOperationId,
        )}`,
      );
    } catch (ex) {
      const msg = chalk.red(
        `Error deploying deployer smart contract to Massa Network`,
      );
      console.error(msg);
      throw new Error(ex);
    }
  } catch (ex) {
    const msg = chalk.red(
      `Error deploying deployer smart contract to Massa Network`,
    );
    console.error(msg);
    throw new Error(ex);
  }
  console.log(`Smart Contract Deployment finished!`);

  return deploymentOperationId;
};
