/**
 * Represents the structure of an account object.
 *
 * @remarks
 * An account object consists of an address, a public key, a secret key.
 * An optional field is also included to indicate the thread in which the
 * account was created.
 *
 */

export interface IAccount {
  address: string | null;
  publicKey: string | null; // base58 encoded public key
  secretKey: string | null; // base58 encoded private key
  createdInThread?: number;
}
