/* eslint-disable @typescript-eslint/no-var-requires */
import { IAccount } from '../../src/interfaces/IAccount';
import { ClientFactory } from '../../src/web3/ClientFactory';
import { WalletClient } from '../../src/web3/WalletClient';
import { Client } from '../../src/web3/Client';
import { IProvider, ProviderType } from '../../src/interfaces/IProvider';

// TODO: Use env variables and say it in the CONTRIBUTING.md
const deployerSecretKey =
  'S12XuWmm5jULpJGXBnkeBsuiNmsGi2F4rMiTvriCzENxBR4Ev7vd';
const receiverSecretKey = 'S1eK3SEXGDAWN6pZhdr4Q7WJv6UHss55EB14hPy4XqBpiktfPu6';

const publicApi = 'http://127.0.0.1:33035';
const privateApi = 'http://127.0.0.1:33034';
const MAX_WALLET_ACCOUNTS = 256;

export async function initializeClient() {
  const deployerAccount: IAccount = await WalletClient.getAccountFromSecretKey(
    deployerSecretKey,
  );
  const web3Client: Client = await ClientFactory.createCustomClient(
    [
      { url: publicApi, type: ProviderType.PUBLIC } as IProvider,
      { url: privateApi, type: ProviderType.PRIVATE } as IProvider,
    ],
    true,
    deployerAccount, // setting deployer account as base account
  );
  return web3Client;
}

describe.skip('WalletClient', () => {
  let web3Client: Client;
  // let walletClient: WalletClient;
  let baseAccount: IAccount = {
    address: 'AU1QRRX6o2igWogY8qbBtqLYsNzYNHwvnpMC48Y6CLCv4cXe9gmK',
    secretKey: 'S12XuWmm5jULpJGXBnkeBsuiNmsGi2F4rMiTvriCzENxBR4Ev7vd',
    publicKey: 'P129tbNd4oVMRsnFvQcgSq4PUAZYYDA1pvqtef2ER6W7JqgY1Bfg',
    createdInThread: 6,
  };

  beforeEach(async () => {
    web3Client = await initializeClient();
  });

  afterEach(async () => {
    await web3Client.wallet().cleanWallet();
  });

  describe('setBaseAccount', () => {
    test('should set base account', async () => {
      const account = await WalletClient.getAccountFromSecretKey(
        receiverSecretKey,
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
        receiverSecretKey,
      );
      await web3Client.wallet().setBaseAccount(firstAccount);

      const secondAccount = await WalletClient.getAccountFromSecretKey(
        deployerSecretKey,
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
      expect(fetchedBaseAccount).toBeNull();
    });
  });

  describe('getWalletAccountByAddress', () => {
    test('should return the account for a valid address', async () => {
      const accounts = [
        await WalletClient.walletGenerateNewAccount(),
        await WalletClient.walletGenerateNewAccount(),
        await WalletClient.walletGenerateNewAccount(),
      ];

      await web3Client.wallet().addAccountsToWallet(accounts);

      const targetAccount = accounts[1]; // Assume we want to find the second account
      const fetchedAccount = web3Client
        .wallet()
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        .getWalletAccountByAddress(targetAccount.address!);

      expect(fetchedAccount).not.toBeNull();
      expect(fetchedAccount?.address).toEqual(targetAccount.address);
    });

    test('should return undefined for a non-existent address', async () => {
      const nonexistentAddress =
        'AU12Set6aygzt1k7ZkDwrkStYovVBzeGs8VgaZogy11s7fQzaytv3'; // This address doesn't exist in the wallet
      const fetchedAccount = web3Client
        .wallet()
        .getWalletAccountByAddress(nonexistentAddress);
      expect(fetchedAccount).toBeUndefined();
    });

    test('should return the account regardless of address case', async () => {
      const accounts = [await WalletClient.walletGenerateNewAccount()];

      await web3Client.wallet().addAccountsToWallet(accounts);

      const targetAccount = accounts[0]; // Assume we want to find the first account
      const upperCaseAddress = targetAccount.address?.toUpperCase();
      const fetchedAccount = web3Client
        .wallet()
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        .getWalletAccountByAddress(upperCaseAddress!);

      expect(fetchedAccount).not.toBeNull();
      expect(fetchedAccount?.address).toEqual(targetAccount.address);
    });
  });
  describe('addSecretKeysToWallet', () => {
    test('should throw an error when the number of accounts exceeds the maximum limit', async () => {
      const secretKeys = new Array(MAX_WALLET_ACCOUNTS + 1).fill(
        receiverSecretKey,
      );

      await expect(
        web3Client.wallet().addSecretKeysToWallet(secretKeys),
      ).rejects.toThrow(
        new RegExp(
          `Maximum number of allowed wallet accounts exceeded ${MAX_WALLET_ACCOUNTS}`,
        ),
      );
    });

    test('should not add duplicate accounts to the wallet (duplicate in arguments)', async () => {
      // Add receiverSecretKey's secret key twice
      const secretKeys: string[] = [receiverSecretKey, receiverSecretKey];

      const addedAccounts = await web3Client
        .wallet()
        .addSecretKeysToWallet(secretKeys);
      const walletAccounts = await web3Client.wallet().getWalletAccounts();
      expect([baseAccount, addedAccounts[0]]).toStrictEqual(walletAccounts);
      expect(addedAccounts.length).toBe(1); // only one unique account should be added
      expect(web3Client.wallet().getWalletAccounts().length).toBe(2); // only one unique account should be added
    });

    test('should not add duplicate accounts to the wallet (account already in wallet)', async () => {
      const addedAccounts = await web3Client
        .wallet()
        .addSecretKeysToWallet([deployerSecretKey, receiverSecretKey]);
      const walletAccounts = await web3Client.wallet().getWalletAccounts();

      // only receiver account should be added
      expect(addedAccounts[0].secretKey).toBe(receiverSecretKey);
      expect([baseAccount, addedAccounts[0]]).toStrictEqual(walletAccounts);
      expect(addedAccounts.length).toBe(1);
      expect(web3Client.wallet().getWalletAccounts().length).toBe(2);
    });

    test('should correctly create and add accounts to the wallet', async () => {
      const accounts = [
        await WalletClient.walletGenerateNewAccount(),
        await WalletClient.walletGenerateNewAccount(),
      ];
      const secretKeys: string[] = [
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        accounts[0].secretKey!,
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        accounts[1].secretKey!,
      ];

      const addedAccounts = await web3Client
        .wallet()
        .addSecretKeysToWallet(secretKeys);

      expect(addedAccounts.length).toBe(2);

      // Check that both accounts have been added
      expect(addedAccounts).toEqual(
        expect.arrayContaining([
          expect.objectContaining({ address: accounts[0].address }),
          expect.objectContaining({
            address: accounts[1].address,
          }),
        ]),
      );
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
      expect(walletAccounts.length).toBe(4); // 3 generated + 1 base account
    });

    test('should return different accounts for different secret keys', async () => {
      const secretKey1 = 'S12XuWmm5jULpJGXBnkeBsuiNmsGi2F4rMiTvriCzENxBR4Ev7vd';
      const secretKey2 = 'S1eK3SEXGDAWN6pZhdr4Q7WJv6UHss55EB14hPy4XqBpiktfPu6';

      const accountFromSecretKey1 = await WalletClient.getAccountFromSecretKey(
        secretKey1,
      );
      const accountFromSecretKey2 = await WalletClient.getAccountFromSecretKey(
        secretKey2,
      );

      expect(accountFromSecretKey1.address).not.toEqual(
        accountFromSecretKey2.address,
      );
      expect(accountFromSecretKey1.publicKey).not.toEqual(
        accountFromSecretKey2.publicKey,
      );
    });
  });
});
