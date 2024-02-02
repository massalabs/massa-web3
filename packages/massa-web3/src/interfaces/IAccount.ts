/**
 * Represents the structure of an account object.
 *
 * @see address - A string representing the address of the account.
 * @see publicKey - A string representing the base58 encoded public key associated with the account.
 * @see secretKey - A string representing the base58 encoded private key associated with the account.
 */
export interface IAccount {
  address: string | null
  publicKey: string | null
  secretKey: string | null
}
