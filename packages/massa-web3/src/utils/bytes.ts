import { base58Decode } from './Xbqcrypto';

/**
 * Prefixes for secret and public keys.
 * Prefixes are used as a convention to differentiate one key from another.
 */
const SECRET_KEY_PREFIX = 'S';
const PUBLIC_KEY_PREFIX = 'P';
const SECRET_KEY_PREFIX_LENGTH = 1;
const PUBLIC_KEY_PREFIX_LENGTH = 1;

/**
 * Get the byte representation of a given secret key.
 *
 * @param secretKey - The secret key to get the bytes from.
 *
 * @throws if the secret key is not valid.
 *
 * @returns a Uint8Array containing the bytes of the secret key.
 */
export function getBytesSecretKey(secretKey: string): Uint8Array {
  const prefix = secretKey.slice(0, SECRET_KEY_PREFIX_LENGTH);

  if (!(prefix == SECRET_KEY_PREFIX)) {
    throw new Error(
      `Invalid secret key prefix: "${prefix}". The secret key should start with "${SECRET_KEY_PREFIX}". Please verify your secret key and try again.`,
    );
  }
  const secretKeyBase58Decoded: Buffer = base58Decode(
    secretKey.slice(SECRET_KEY_PREFIX_LENGTH),
  );
  return secretKeyBase58Decoded;
}

/**
 * Retrieves the byte representation of a given public key.
 *
 * @param publicKey - The public key to obtain the bytes from.
 *
 * @throws If the public key has an incorrect {@link PUBLIC_KEY_PREFIX}.
 *
 * @returns A Uint8Array containing the bytes of the public key.
 */
export function getBytesPublicKey(publicKey: string): Uint8Array {
  const prefix = publicKey.slice(0, PUBLIC_KEY_PREFIX_LENGTH);

  if (!(prefix == PUBLIC_KEY_PREFIX)) {
    throw new Error(
      `Invalid public key prefix: ${prefix} should be ${PUBLIC_KEY_PREFIX}`,
    );
  }
  const publicKeyBase58Decoded: Buffer = base58Decode(
    publicKey.slice(PUBLIC_KEY_PREFIX_LENGTH), // Slice off the prefix
  );
  return publicKeyBase58Decoded;
}
