import { base58Decode } from './Xbqcrypto';

const SECRET_KEY_PREFIX = 'S';
const PUBLIC_KEY_PREFIX = 'P';

/**
 * Get the byte representation of a given secret key, without the version.
 *
 * @param secretKey - The secret key to get the bytes from.
 *
 * @throws if the secret key is not valid.
 *
 * @returns a Uint8Array containing the bytes of the secret key.
 */
export function getBytesSecretKey(secretKey: string): Uint8Array {
  if (!(secretKey[0] == SECRET_KEY_PREFIX)) {
    throw new Error(
      `Invalid secret key prefix: "${secretKey[0]}". The secret key should start with "${SECRET_KEY_PREFIX}". Please verify your secret key and try again.`,
    );
  }
  const secretKeyVersionBase58Decoded: Buffer = base58Decode(
    secretKey.slice(1),
  );
  // Version is little for now.
  const secretKeyBase58Decoded = secretKeyVersionBase58Decoded.slice(1);
  return secretKeyBase58Decoded;
}

/**
 * Get the byte representation of a given secret key.
 *
 * @param secretKey - The secret key to get the bytes from.
 *
 * @throws if the secret key is not valid.
 *
 * @returns a Uint8Array containing the bytes of the secret key.
 */
export function getBytesSecretKeyVersioned(secretKey: string): Uint8Array {
  if (!(secretKey[0] == SECRET_KEY_PREFIX)) {
    throw new Error(
      `Invalid secret key prefix: "${secretKey[0]}". The secret key should start with "${SECRET_KEY_PREFIX}". Please verify your secret key and try again.`,
    );
  }
  const secretKeyVersionBase58Decoded: Buffer = base58Decode(
    secretKey.slice(1),
  );
  // Version is little for now.
  const secretKeyBase58Decoded = secretKeyVersionBase58Decoded.slice(1);
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
  if (!(publicKey[0] == PUBLIC_KEY_PREFIX)) {
    throw new Error(
      `Invalid public key prefix: ${publicKey[0]} should be ${PUBLIC_KEY_PREFIX}`,
    );
  }
  const publicKeyVersionBase58Decoded: Buffer = base58Decode(
    publicKey.slice(1),
  );
  // Version is little for now.
  const publicKeyBase58Decoded = publicKeyVersionBase58Decoded.slice(1);
  return publicKeyBase58Decoded;
}

/**
 * Retrieves the byte representation of a given public key with the version.
 *
 * @param publicKey - The public key to obtain the bytes from.
 *
 * @throws If the public key has an incorrect {@link PUBLIC_KEY_PREFIX}.
 *
 * @returns A Uint8Array containing the bytes of the public key.
 */
export function getBytesPublicKeyVersioned(publicKey: string): Uint8Array {
  if (!(publicKey[0] == PUBLIC_KEY_PREFIX)) {
    throw new Error(
      `Invalid public key prefix: ${publicKey[0]} should be ${PUBLIC_KEY_PREFIX}`,
    );
  }
  const publicKeyVersionBase58Decoded: Buffer = base58Decode(
    publicKey.slice(1),
  );
  return publicKeyVersionBase58Decoded;
}
