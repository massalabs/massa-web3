/**
 * Represents a signature.
 *
 * @see base58Encoded - The base58 encoded signature.
 */
export interface ISignature {
  publicKey: string;
  base58Encoded: string;
}
