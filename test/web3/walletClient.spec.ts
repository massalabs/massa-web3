/* eslint-disable @typescript-eslint/no-var-requires */
import { IAccount } from '../../src/interfaces/IAccount';
import { ClientFactory } from '../../src/web3/ClientFactory';
import { WalletClient } from '../../src/web3/WalletClient';
import { Client } from '../../src/web3/Client';
// import * as ed from '@noble/ed25519';
import { IProvider, ProviderType } from '../../src/interfaces/IProvider';
import { expect, test, describe, beforeEach, afterEach } from '@jest/globals';

// TODO: Use env variables and say it in the CONTRIBUTING.md
const deployerPrivateKey =
  'S12XuWmm5jULpJGXBnkeBsuiNmsGi2F4rMiTvriCzENxBR4Ev7vd';
const receiverPrivateKey =
  'S1eK3SEXGDAWN6pZhdr4Q7WJv6UHss55EB14hPy4XqBpiktfPu6';

const publicApi = 'http://127.0.0.1:33035';
const privateApi = 'http://127.0.0.1:33034';

export async function initializeClient() {
  const deployerAccount: IAccount = await WalletClient.getAccountFromSecretKey(
    deployerPrivateKey,
  );
  const web3Client: Client = await ClientFactory.createCustomClient(
    [
      { url: publicApi, type: ProviderType.PUBLIC } as IProvider,
      { url: privateApi, type: ProviderType.PRIVATE } as IProvider,
    ],
    true,
    deployerAccount,
  );
  return web3Client;
}

describe('WalletClient', () => {
  let web3Client: Client;
  // let walletClient: WalletClient;
  let baseAccount: IAccount;

  beforeEach(async () => {
    web3Client = await initializeClient();
    baseAccount = await WalletClient.getAccountFromSecretKey(
      receiverPrivateKey,
    );
    await web3Client.wallet().setBaseAccount(baseAccount);
  });

  afterEach(async () => {
    await web3Client.wallet().cleanWallet();
  });

  describe('setBaseAccount', () => {
    test('should set base account', async () => {
      const account = await WalletClient.getAccountFromSecretKey(
        receiverPrivateKey,
      );
      await web3Client.wallet().setBaseAccount(account);
      const baseAccount = await web3Client.wallet().getBaseAccount();
      expect(baseAccount).not.toBeNull();
      expect(baseAccount?.address).toEqual(account.address);
    });

    test('should throw error if account is not valid', async () => {
      await web3Client.wallet().cleanWallet();
      await expect(
        web3Client.wallet().setBaseAccount({} as IAccount),
      ).rejects.toThrow();
      const incorrectAccount = {
        address: 'AU12Set6aygzt1k7ZkDwrkStYovVBzeGs8VgaZogy11s7fQzaytv3',
        secretKey: 's1eK3SEXGDAWN6pZhdr4Q7WJv6UHss55EB14hPy4XqBpiktfPu6', // prefix is incorrect
        publicKey: 'P121uDTpo58d3SxQTENXKqSJTpB21ueSAy8RqQ2virGVeWs339ub',
        createdInThread: 23,
      } as IAccount;
      await expect(
        web3Client.wallet().setBaseAccount(incorrectAccount),
      ).rejects.toThrow();
    });

    test('should change base account if already set', async () => {
      const firstAccount = await WalletClient.getAccountFromSecretKey(
        receiverPrivateKey,
      );
      await web3Client.wallet().setBaseAccount(firstAccount);

      const secondAccount = await WalletClient.getAccountFromSecretKey(
        deployerPrivateKey,
      );
      await web3Client.wallet().setBaseAccount(secondAccount);

      const baseAccount = await web3Client.wallet().getBaseAccount();
      expect(baseAccount).not.toBeNull();
      expect(baseAccount?.address).toEqual(secondAccount.address);
    });
  });

  describe('getBaseAccount', () => {
    test('should return the base account', async () => {
      const fetchedBaseAccount = await web3Client.wallet().getBaseAccount();
      expect(fetchedBaseAccount).not.toBeNull();
      expect(fetchedBaseAccount?.address).toEqual(baseAccount.address);
    });

    test('should return null if base account is not set', async () => {
      await web3Client.wallet().cleanWallet();
      const fetchedBaseAccount = await web3Client.wallet().getBaseAccount();
      console.log(
        'AAAAAAAAAAAAAAAAAAAAAAARHEZIRHZE FETCHED: ',
        fetchedBaseAccount,
      );
      console.log('wallet atm: ', await web3Client.wallet());
      expect(fetchedBaseAccount).toBeNull();
    });
  });

  describe('walletGenerateNewAccount', () => {
    test('should generate a new account', async () => {
      const newAccount = await WalletClient.walletGenerateNewAccount();
      // Check that the newAccount object has all necessary properties
      expect(newAccount).toHaveProperty('address');
      expect(newAccount).toHaveProperty('secretKey');
      expect(newAccount).toHaveProperty('publicKey');
      expect(newAccount).toHaveProperty('createdInThread');
    });
  });
  describe('getAccountFromSecretKey', () => {
    test('should generate an account from a secret key', async () => {
      const secretKey = 'S12syP5uCVEwaJwvXLqJyD1a2GqZjsup13UnhY6uzbtyu7ExXWZS';
      const addressModel =
        'AU12KgrLq2vhMgi8aAwbxytiC4wXBDGgvTtqGTM5R7wEB9En8WBHB';
      const publicKeyModel =
        'P12c2wsKxEyAhPC4ouNsgywzM41VsNSuwH9JdMbRt9bM8ZsMLPQA';
      const accountFromSecretKey = await WalletClient.getAccountFromSecretKey(
        secretKey,
      );
      // Check that the accountFromSecretKey object has all necessary properties
      expect(accountFromSecretKey).toHaveProperty('address');
      expect(accountFromSecretKey).toHaveProperty('secretKey');
      expect(accountFromSecretKey).toHaveProperty('publicKey');
      expect(accountFromSecretKey).toHaveProperty('createdInThread');
      // Check that the secretKey matches the models
      expect(accountFromSecretKey.address).toEqual(addressModel);
      expect(accountFromSecretKey.publicKey).toEqual(publicKeyModel);
      expect(accountFromSecretKey.secretKey).toEqual(secretKey);
    });
  });

  describe('getWalletAccounts', () => {
    test('should return all accounts in the wallet', async () => {
      const accounts = [
        await WalletClient.walletGenerateNewAccount(),
        await WalletClient.walletGenerateNewAccount(),
        await WalletClient.walletGenerateNewAccount(),
      ];

      await web3Client.wallet().addAccountsToWallet(accounts);
      const walletAccounts = await web3Client.wallet().getWalletAccounts();
      expect(walletAccounts.length).toBe(5);
    });
  });
});
