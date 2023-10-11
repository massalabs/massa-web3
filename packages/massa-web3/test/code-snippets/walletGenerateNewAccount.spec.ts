import { WalletClient } from '@massalabs/massa-web3';

it('should generate a new account with name and address', async () => {
  const newAccount = await WalletClient.walletGenerateNewAccount();

  expect(newAccount).toHaveProperty('address');
  expect(newAccount).toHaveProperty('publicKey');
  expect(newAccount).toHaveProperty('secretKey');

  // print the account address, public and private keys
  console.log(
    'Address: ',
    newAccount.address,
    'Public key',
    newAccount.publicKey,
    'Private key',
    newAccount.secretKey,
  );
});
