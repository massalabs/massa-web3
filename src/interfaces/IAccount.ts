export interface IAccount {
  address: string | null;
  publicKey: string | null; // base58 encoded public key
  secretKey: string | null; // base58 encoded private key
  createdInThread?: number;
}
