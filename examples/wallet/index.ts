/* eslint-disable @typescript-eslint/no-var-requires */
import { IAccount } from '../../src/interfaces/IAccount';
import { IEventFilter } from '../../src/interfaces/IEventFilter';
import {
  ClientFactory,
  DefaultProviderUrls,
} from '../../src/web3/ClientFactory';
import { WalletClient } from '../../src/web3/WalletClient';
import { EventPoller } from '../../src/web3/EventPoller';
import { ITransactionData } from '../../src/interfaces/ITransactionData';
import { EOperationStatus } from '../../src/interfaces/EOperationStatus';
import { IRollsData } from '../../src/interfaces/IRollsData';
const path = require('path');
const chalk = require('chalk');
const ora = require('ora');

const DEPLOYER_SECRET_KEY =
  'S12srNEAvZrTb9pktYeuePpuM4taW5dfmWAZYtdqyETWTBspkoT1';
const RECEIVER_SECRET_KEY =
  'S1ykLaxXyMnJoaWLYds8UntqKTamZ4vcxrZ1fdToR8WpWEpk3FC';

(async () => {
  const header = '='.repeat(process.stdout.columns - 1);
  console.log(header);
  console.log(
    `${chalk.green.bold('Massa Smart Contract Interaction Example')}`,
  );
  console.log(header);

  try {
    // init account
    const deployerAccount: IAccount =
      await WalletClient.getAccountFromSecretKey(DEPLOYER_SECRET_KEY);

    console.log('Deployer Wallet ', deployerAccount);

    // init web3 client with base account
    const web3Client = await ClientFactory.createDefaultClient(
      DefaultProviderUrls.TESTNET,
      true,
      deployerAccount,
    );

    // get wallet balance
    const deployerAccountBalance = await web3Client
      .wallet()
      .getAccountBalance(deployerAccount.address as string);
    console.log(
      `Deployer Wallet Address: ${
        deployerAccount.address
      } with balance (candidate, final) = (${deployerAccountBalance?.candidate.rawValue()}, ${deployerAccountBalance?.final.rawValue()})`,
    );

    // get wallet accounts
    let walletAccounts = await web3Client.wallet().getWalletAccounts();
    console.log('Wallet Accounts ', walletAccounts);

    // get wallet info
    const walletInfo = await web3Client.wallet().walletInfo();
    // console.log("WALLET INFO ", walletInfo);

    // add a new wallet
    console.log('Adding a new Account ...');
    await web3Client.wallet().addSecretKeysToWallet([RECEIVER_SECRET_KEY]);

    // get wallet accounts
    walletAccounts = await web3Client.wallet().getWalletAccounts();
    console.log('Wallet Accounts (UPDATED) ', walletAccounts);

    // get the second account (the receiver)
    const senderAccount = walletAccounts[0];
    const receiverAccount = walletAccounts[1];

    // get receiver's wallet balance
    const receiverAccountBalanceBefore = await web3Client
      .wallet()
      .getAccountBalance(receiverAccount.address as string);
    console.log(
      `Receiver Wallet Balance (Before): ${
        receiverAccount.address
      } with balance (candidate, final) = (${receiverAccountBalanceBefore?.candidate.rawValue()}, ${receiverAccountBalanceBefore?.final.rawValue()})`,
    );

    // sign a random wallet message using account2
    const signedMessage = await web3Client
      .wallet()
      .signMessage('hello there', receiverAccount.address as string);
    console.log('Wallet sender signing a message... ', signedMessage);

    // send from base account to receiver
    const txId = await web3Client.wallet().sendTransaction({
      amount: '1',
      fee: 0,
      recipientAddress: receiverAccount.address as string,
    } as ITransactionData);
    console.log('Money Transfer:: TxId ', txId[0]);

    // await finalization
    console.log('Awaiting Finalization ...');
    await web3Client
      .smartContracts()
      .awaitRequiredOperationStatus(txId[0], EOperationStatus.FINAL);

    console.log('Polling events ... ');
    const events = await EventPoller.getEventsOnce(
      {
        start: null,
        end: null,
        original_operation_id: txId[0],
        original_caller_address: null,
        emitter_address: null,
      } as IEventFilter,
      web3Client,
    );
    console.log('Polled Events ', events);

    // get receiver's wallet after
    const receiverAccountBalanceAfter = await web3Client
      .wallet()
      .getAccountBalance(receiverAccount.address as string);
    console.log(
      `Receiver Wallet Balance (After): ${
        receiverAccount.address
      } with balance (candidate, final) = (${receiverAccountBalanceAfter?.candidate.rawValue()}, ${receiverAccountBalanceAfter?.final.rawValue()})`,
    );

    // get sender's wallet after
    const senderAccountBalanceAfter = await web3Client
      .wallet()
      .getAccountBalance(senderAccount.address as string);
    console.log(
      `Sender Wallet Balance (After): ${
        receiverAccount.address
      } with balance (candidate, final) = (${senderAccountBalanceAfter?.candidate.rawValue()}, ${senderAccountBalanceAfter?.final.rawValue()})`,
    );

    // sender buys some rolls
    const buyRollsTxId = await web3Client.wallet().buyRolls({
      amount: 2,
      fee: 0,
    } as IRollsData);
    console.log('Buy Rolls Tx Id ', buyRollsTxId);

    process.exit(0);
  } catch (ex) {
    const msg = chalk.red(`Error = ${ex}`);
    console.error(msg);
    process.exit(-1);
  }
})();
