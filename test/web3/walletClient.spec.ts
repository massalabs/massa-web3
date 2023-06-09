/* eslint-disable @typescript-eslint/no-var-requires */
import { IAccount } from '../../src/interfaces/IAccount';
import { ClientFactory } from '../../src/web3/ClientFactory';
import { WalletClient } from '../../src/web3/WalletClient';
import { Client } from '../../src/web3/Client';
import * as ed from '@noble/ed25519';
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
    deployerAccount, // setting deployer account as base account
  );
  return web3Client;
}

describe('WalletClient', () => {
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
      console.log('fetchedBaseAccount', fetchedBaseAccount);
      expect(fetchedBaseAccount?.address).toEqual(baseAccount.address);
    });

    test('should return null if base account is not set', async () => {
      await web3Client.wallet().cleanWallet();
      const fetchedBaseAccount = await web3Client.wallet().getBaseAccount();
      expect(fetchedBaseAccount).toBeNull();
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
      expect(walletAccounts.length).toBe(4);
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

  describe('getWalletAccountByAddress', () => {
    test('should return the account for a valid address', async () => {
      const accounts = [
        await WalletClient.walletGenerateNewAccount(),
        await WalletClient.walletGenerateNewAccount(),
        await WalletClient.walletGenerateNewAccount(),
      ];

      await web3Client.wallet().addAccountsToWallet(accounts);

      const targetAccount = accounts[1]; // Assume we want to find the second account
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const fetchedAccount = web3Client
        .wallet()
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
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const fetchedAccount = web3Client
        .wallet()
        .getWalletAccountByAddress(upperCaseAddress!);

      expect(fetchedAccount).not.toBeNull();
      expect(fetchedAccount?.address).toEqual(targetAccount.address);
    });

    // TODO: should we implement this? atm it has the same behavior as when the address doesn't exist in the wallet
    test.skip('should return an error for an incorrect address', async () => {
      const incorrectAddress = 'incorrect address';
      await expect(
        web3Client.wallet().getWalletAccountByAddress(incorrectAddress),
      ).rejects.toThrow();
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

      // Check that the properties are of correct type
      expect(typeof newAccount.address).toBe('string');
      expect(typeof newAccount.secretKey).toBe('string');
      expect(typeof newAccount.publicKey).toBe('string');
      expect(typeof newAccount.createdInThread).toBe('number');

      // Check that the properties are not empty or null
      expect(newAccount.address).not.toBeNull();
      expect(newAccount.address).not.toBe('');
      expect(newAccount.secretKey).not.toBeNull();
      expect(newAccount.secretKey).not.toBe('');
      expect(newAccount.publicKey).not.toBeNull();
      expect(newAccount.publicKey).not.toBe('');

      // Check that keys and address have the correct length
      expect(newAccount.address?.length).toBeGreaterThanOrEqual(50);
      expect(newAccount.secretKey?.length).toBeGreaterThanOrEqual(50);
      expect(newAccount.publicKey?.length).toBeGreaterThanOrEqual(50);
    });
    test('should generate unique accounts each time', async () => {
      const newAccount1 = await WalletClient.walletGenerateNewAccount();
      const newAccount2 = await WalletClient.walletGenerateNewAccount();

      // Check that generated accounts are not the same
      expect(newAccount1.address).not.toEqual(newAccount2.address);
      expect(newAccount1.secretKey).not.toEqual(newAccount2.secretKey);
      expect(newAccount1.publicKey).not.toEqual(newAccount2.publicKey);
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
    test('should throw error if invalid secret key is provided', async () => {
      const invalidSecretKey = 'invalidSecretKey';
      await expect(
        WalletClient.getAccountFromSecretKey(invalidSecretKey),
      ).rejects.toThrow();

      const emptySecretKey = '';
      await expect(
        WalletClient.getAccountFromSecretKey(emptySecretKey),
      ).rejects.toThrow();

      const nullSecretKey = null;
      await expect(
        WalletClient.getAccountFromSecretKey(nullSecretKey as any),
      ).rejects.toThrow();
    });
  });

  describe('walletSignMessage', () => {
    test('should sign a message with a valid signer', async () => {
      const data = 'Test message';
      const signer = baseAccount;
      const modelSignedMessage =
        '1TXucC8nai7BYpAnMPYrotVcKCZ5oxkfWHb2ykKj2tXmaGMDL1XTU5AbC6Z13RH3q59F8QtbzKq4gzBphGPWpiDonownxE';

      const signedMessage = await WalletClient.walletSignMessage(data, signer);

      // Check that the signedMessage object has necessary property
      expect(signedMessage).toHaveProperty('base58Encoded');

      // Check that the property is of correct type
      expect(typeof signedMessage.base58Encoded).toBe('string');

      // Check that the property is not empty or null
      expect(signedMessage.base58Encoded).not.toBeNull();
      expect(signedMessage.base58Encoded).not.toBe('');

      // Check that the signed message is correct
      expect(signedMessage.base58Encoded).toEqual(modelSignedMessage);
    });

    test('should throw an error when no private key is available', async () => {
      const data = 'Test message';
      const signer = { ...baseAccount, secretKey: null };

      await expect(
        WalletClient.walletSignMessage(data, signer),
      ).rejects.toThrow('No private key to sign the message with');
    });

    test('should throw an error when no public key is available', async () => {
      const data = 'Test message';
      const signer = { ...baseAccount, publicKey: null };

      await expect(
        WalletClient.walletSignMessage(data, signer),
      ).rejects.toThrow('No public key to verify the signed message with');
    });

    test('should throw an error when signature length is invalid', async () => {
      const data = 'Test message';
      const signer = baseAccount;

      // Create a spy on the 'sign' function
      const signSpy = jest.spyOn(ed, 'sign');

      // Provide a mock implementation for this test
      signSpy.mockImplementation(() => Promise.resolve(Buffer.alloc(63))); // 63 instead of 64

      await expect(
        WalletClient.walletSignMessage(data, signer),
      ).rejects.toThrow(/Invalid signature length. Expected 64, got/);

      // Restore the original 'sign' function after the test
      signSpy.mockRestore();
    });

    test('should correctly process Buffer data', async () => {
      const data = Buffer.from('Test message');
      const signer = baseAccount;

      const signedMessage = await WalletClient.walletSignMessage(data, signer);

      // Check that the signedMessage object has necessary property
      expect(signedMessage).toHaveProperty('base58Encoded');

      // Check that the property is of correct type
      expect(typeof signedMessage.base58Encoded).toBe('string');

      // Check that the property is not empty or null
      expect(signedMessage.base58Encoded).not.toBeNull();
      expect(signedMessage.base58Encoded).not.toBe('');
    });
  });

  describe('signMessage', () => {
    test('should sign a message with a valid account', async () => {
      const data = 'Test message';
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const accountSignerAddress: string = baseAccount.address!;

      const signedMessage = await web3Client
        .wallet()
        .signMessage(data, accountSignerAddress);
      // Check that the signedMessage object has necessary property
      expect(signedMessage).toHaveProperty('base58Encoded');

      // Check that the property is of correct type
      expect(typeof signedMessage.base58Encoded).toBe('string');

      // Check that the property is not empty or null
      expect(signedMessage.base58Encoded).not.toBeNull();
      expect(signedMessage.base58Encoded).not.toBe('');
    });

    test('should throw an error when the account is not found', async () => {
      const data = 'Test message';
      const nonExistentSignerAddress = 'nonExistentSignerAddress';

      await expect(
        web3Client.wallet().signMessage(data, nonExistentSignerAddress),
      ).rejects.toThrow(
        `No signer account ${nonExistentSignerAddress} found in wallet`,
      );
    });

    test('should correctly process Buffer data', async () => {
      const data = Buffer.from('Test message');
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const accountSignerAddress = baseAccount.address!;

      const signedMessage = await web3Client
        .wallet()
        .signMessage(data, accountSignerAddress);
      // Check that the signedMessage object has necessary property
      expect(signedMessage).toHaveProperty('base58Encoded');
      // Check that the property is of correct type
      expect(typeof signedMessage.base58Encoded).toBe('string');
      // Check that the property is not empty or null
      expect(signedMessage.base58Encoded).not.toBeNull();
      expect(signedMessage.base58Encoded).not.toBe('');
    });
  });
});
