/* eslint-disable @typescript-eslint/no-var-requires */
import { IAccount } from '../../src/interfaces/IAccount';
import { ClientFactory } from '../../src/web3/ClientFactory';
import { WalletClient } from '../../src/web3/WalletClient';
import { EOperationStatus } from '../../src/interfaces/EOperationStatus';
// import { IRollsData } from '../../src/interfaces/IRollsData';
import * as dotenv from 'dotenv';
import { Client } from '../../src/web3/Client';
import { IProvider, ProviderType } from '../../src/interfaces/IProvider';
import {
  IBalance,
  IFullAddressInfo,
  IRollsData,
  ITransactionData,
  fromMAS,
} from '../../src';
import { ISignature } from '../../src/interfaces/ISignature';
import assert from 'assert';
const path = require('path');
const chalk = require('chalk');

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
const deployerSecretKey = process.env.DEPLOYER_SECRET_KEY;
if (!deployerSecretKey) {
  throw new Error('Missing DEPLOYER_SECRET_KEY in .env file');
}
const secondAccSecretKey = process.env.OTHER_ACC_SECRET_KEY;
if (!secondAccSecretKey) {
  throw new Error('Missing OTHER_ACC_SECRET_KEY in .env file');
}

(async () => {
  const header = '='.repeat(process.stdout.columns - 1);
  const secondHeader = '-'.repeat(process.stdout.columns - 2);

  console.log(header);
  console.log(
    `${chalk.green.bold('Massa Smart Contract Interaction Example')}`,
  );
  console.log(header);

  try {
    /* Test function walletGenerateNewAccount */
    console.log(`\n${chalk.bold('Test walletGenerateNewAccount')}`);
    const newAccount: IAccount = await WalletClient.walletGenerateNewAccount();
    console.log('New account address:', newAccount.address);
    /* End of test */
    console.log('\n ', secondHeader);
    assert(newAccount.address, 'Generation of new account failed');

    /* Test function getAccountFromSecretKey */
    console.log(`\n${chalk.bold('Test function getAccountFromSecretKey')}`);
    const deployerAccount: IAccount =
      await WalletClient.getAccountFromSecretKey(deployerSecretKey);
    console.log('Deployer account address', deployerAccount.address);
    /* End of test */
    console.log('\n ', secondHeader);
    assert(deployerAccount.address, 'Generation of new account failed');

    // Initialize the client
    const web3Client: Client = await ClientFactory.createCustomClient(
      [
        { url: publicApi, type: ProviderType.PUBLIC } as IProvider,
        { url: privateApi, type: ProviderType.PRIVATE } as IProvider,
      ],
      true,
    );

    /* Test function addAccountsToWallet */
    console.log(`\n${chalk.bold('Test function addAccountsToWallet')}`);
    await web3Client
      .wallet()
      .addAccountsToWallet([deployerAccount, newAccount]);
    /* End of test */
    console.log('\n ', secondHeader);
    const numberOfAccounts: number = await web3Client
      .wallet()
      .getWalletAccounts().length;
    console.log(`Number of accounts in the wallet: ${numberOfAccounts}`);
    assert(numberOfAccounts === 2, 'Adding accounts to the wallet failed');

    /* Test function addSecretKeysToWallet */
    console.log(`\n${chalk.bold('Test function addSecretKeysToWallet')}`);
    const addedAccounts: IAccount[] = await web3Client
      .wallet()
      .addSecretKeysToWallet([secondAccSecretKey]);
    console.log(`Added accounts to the wallet: ${addedAccounts.length}`);
    /* End of test */
    console.log('\n ', secondHeader);
    assert(
      addedAccounts.length === 1,
      'Adding secret keys to the wallet failed',
    );

    /* Test function setBaseAccount */
    console.log(`\n${chalk.bold('Test function setBaseAccount')}`);
    await web3Client.wallet().setBaseAccount(deployerAccount);
    console.log(`Base account of the wallet: ${deployerAccount.address}`);
    /* End of test */
    console.log('\n ', secondHeader);
    assert(
      web3Client.wallet().getBaseAccount()?.address === deployerAccount.address,
      'Setting base account failed',
    );

    /* Test function getBaseAccount */
    console.log(`\n${chalk.bold('Test function getBaseAccount')}`);
    const baseAccount: IAccount | null = web3Client.wallet().getBaseAccount();
    if (baseAccount === null) {
      throw new Error('No base account found');
    }
    console.log(`Base account of the wallet: ${baseAccount.address}`);
    /* End of test */
    console.log('\n ', secondHeader);
    assert(
      baseAccount.address === deployerAccount.address,
      'Getting base account failed',
    );

    /* Test function getWalletAccountsByAddress */
    console.log(`\n${chalk.bold('Test function getWalletAccountByAddress')}`);
    const retrievedAccount = await web3Client
      .wallet()
      .getWalletAccountByAddress(deployerAccount.address as string);
    if (!retrievedAccount) {
      throw new Error(
        `Account with address ${deployerAccount.address} not found.`,
      );
    }
    const deployerAccountRetrieved: IAccount = retrievedAccount;
    console.log(
      `Retrieved account address: ${deployerAccountRetrieved.address}`,
    );
    /* End of test */
    console.log('\n ', secondHeader);
    assert(
      deployerAccountRetrieved.address === deployerAccount.address,
      'Getting account by address failed',
    );

    /* Test function getWalletAccounts */
    console.log(`\n${chalk.bold('Test function getWalletAccounts')}`);
    const allWalletAccounts: IAccount[] = await web3Client
      .wallet()
      .getWalletAccounts();
    console.log(
      `All wallet accounts: ${allWalletAccounts.map(
        (account: IAccount) => account.address,
      )}`,
    );
    /* End of test */
    console.log('\n ', secondHeader);
    assert(
      allWalletAccounts.length === 3,
      'Getting all wallet accounts failed',
    );

    /* Test function removeAddressesFromWallet */
    console.log(`\n${chalk.bold('Test function removeAddressesFromWallet')}`);
    await web3Client
      .wallet()
      .removeAddressesFromWallet([newAccount.address as string]);
    console.log(`Removed account ${newAccount.address} from the wallet`);
    /* End of test */
    console.log('\n ', secondHeader);
    assert(
      web3Client.wallet().getWalletAccounts().length === 2,
      'Removing addresses from the wallet failed',
    );

    /* Test function cleanWallet */
    console.log(`\n${chalk.bold('Test function cleanWallet')}`);
    await web3Client.wallet().cleanWallet();
    console.log('All wallet accounts removed');
    /* End of test */
    console.log('\n ', secondHeader);
    assert(
      web3Client.wallet().getWalletAccounts().length === 0,
      'Cleaning the wallet failed',
    );

    // Add accounts to the wallet again, as it is needed for the following tests
    await web3Client.wallet().setBaseAccount(deployerAccount);
    await web3Client.wallet().addAccountsToWallet([newAccount]);

    /* Test function getAccountBalance */
    console.log(`\n${chalk.bold('Test function getAccountBalance')}`);
    const balance: IBalance | null = await web3Client
      .wallet()
      .getAccountBalance(newAccount.address as string);
    if (balance === null) {
      throw new Error('No balance found for newAccount');
    }
    console.log(
      `Balance of newAccount ${newAccount.address}: ${balance.final} MASSA`,
    );
    /* End of test */
    console.log('\n ', secondHeader);
    assert(balance.final === 0n, 'Getting account balance failed');

    /* Test function WalletInfo */
    console.log(`\n${chalk.bold('Test function walletInfo')}`);
    const walletInfo: IFullAddressInfo[] = await web3Client
      .wallet()
      .walletInfo();
    console.log(
      'Wallet info addresses: ',
      walletInfo.map((info) => info.address),
    );
    /* End of test */
    console.log('\n ', secondHeader);
    assert(walletInfo.length === 2, 'Getting wallet info failed');

    /* Test function sendTransaction */
    console.log(`\n${chalk.bold('Test function sendTransaction')}`);
    const transactionData: ITransactionData = {
      fee: 0n,
      amount: fromMAS(1),
      recipientAddress: newAccount.address as string,
    };
    const sendTxId: Array<string> = await web3Client
      .wallet()
      .sendTransaction(transactionData);
    const startBalance: IBalance | null = await web3Client
      .wallet()
      .getAccountBalance(newAccount.address as string);
    console.log(`Transaction sent with id: ${sendTxId}`);
    // Await finalization
    await web3Client
      .smartContracts()
      .awaitRequiredOperationStatus(sendTxId[0], EOperationStatus.FINAL);
    console.log(`Transaction ${sendTxId} finalized`);
    /* End of test */
    console.log('\n ', secondHeader);
    const newAccountBalance: IBalance | null = await web3Client
      .wallet()
      .getAccountBalance(newAccount.address as string);
    console.log(
      'Start balance: ',
      startBalance?.final,
      'End balance: ',
      newAccountBalance?.final,
    );
    assert(
      newAccountBalance?.final === BigInt(990000000),
      'Sending transaction failed',
    );

    /* Test function walletSignMessage */
    console.log(`\n${chalk.bold('Test function walletSignMessage')}`);
    const signature: ISignature = await WalletClient.walletSignMessage(
      'Hello world',
      baseAccount,
    );
    console.log(`Signature created: ${signature.base58Encoded}`);
    /* End of test */
    console.log('\n ', secondHeader);
    assert(signature.base58Encoded !== null, 'Signing message failed');

    /* Test function signMessage */
    console.log(`\n${chalk.bold('Test function signMessage')}`);
    const signedMessage = await web3Client
      .wallet()
      .signMessage('hello', baseAccount.address as string);
    console.log(`Signed message: ${signedMessage.base58Encoded}`);
    /* End of test */
    console.log('\n ', secondHeader);
    assert(signedMessage !== null, 'Signing message failed');

    /* Test function verifySignature */
    console.log(`\n${chalk.bold('Test function verifySignature')}`);
    const isSignatureValid: boolean = await web3Client
      .wallet()
      .verifySignature(
        'Hello world',
        signature,
        baseAccount.publicKey as string,
      );
    console.log(`isSignatureValid: ${isSignatureValid}`);
    /* End of test */
    console.log('\n ', secondHeader);
    assert(isSignatureValid, 'Verifying signature failed');

    /* Test function buyRolls */
    console.log(`\n${chalk.bold('Test function buyRolls')}`);
    const transactionDataRolls: IRollsData = {
      fee: 0n,
      amount: 1n,
    };
    const buyRollsTxId: Array<string> = await web3Client
      .wallet()
      .buyRolls(transactionDataRolls, deployerAccount as IAccount);
    // Await finalization
    console.log(`Transaction sent with id: ${buyRollsTxId}`);
    await web3Client
      .smartContracts()
      .awaitRequiredOperationStatus(buyRollsTxId[0], EOperationStatus.FINAL);
    console.log(`Transaction ${buyRollsTxId} finalized`);
    /* End of test */
    console.log('\n ', secondHeader);
    const newRollsBalance = (await web3Client.wallet().walletInfo())[0]
      .candidate_roll_count;
    console.log('New rolls balance: ', newRollsBalance);
    assert(newRollsBalance === 1, 'Buying rolls failed');

    /* Test function sellRolls */
    console.log(`\n${chalk.bold('Test function sellRolls')}`);
    const sellRollsTxId: Array<string> = await web3Client
      .wallet()
      .sellRolls(transactionDataRolls, baseAccount as IAccount);
    // Await finalization
    await web3Client
      .smartContracts()
      .awaitRequiredOperationStatus(sellRollsTxId[0], EOperationStatus.FINAL);
    console.log(`Transaction ${sellRollsTxId} finalized`);
    /* End of test */
    console.log('\n ', secondHeader);
    const newRollsBalance2 = (await web3Client.wallet().walletInfo())[0]
      .candidate_roll_count;
    assert(newRollsBalance2 === 0, 'Selling rolls failed');

    process.exit(0);
  } catch (ex) {
    console.error(ex);
    const msg = chalk.red(`Error = ${ex}`);
    console.error(msg);
    process.exit(-1);
  }
})();
