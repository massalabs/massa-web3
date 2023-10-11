import { WalletClient } from '@massalabs/massa-web3';

(async () => {
  const newAccount = await WalletClient.walletGenerateNewAccount();

  // print the account address, public and private keys
  console.log(
    'Address: ',
    newAccount.address,
    'Public key',
    newAccount.publicKey,
    'Private key',
    newAccount.secretKey,
  );
})();
