import {
  base58Decode,
  base58Encode,
  varintEncode,
  varintDecode,
  hashBlake3,
} from './Xbqcrypto';

import * as ed from '@noble/ed25519';
import { getBytesSecretKey, getBytesPublicKey } from './bytes';

/**
 * Prefixes for secret keys, public keys, and addresses.
 * Prefixes are used as a convention to differentiate one key from another.
 */

const SECRET_KEY_PREFIX = 'S';
const PUBLIC_KEY_PREFIX = 'P';
const ADDRESS_PREFIX = 'AU';

/**
 * A secret key.
 * The secret key object is created from a base58 encoded string representing the secret key.
 * The secret key bytes representation is `version + secretKey` where secretKey is the 32 bytes of the secret key.
 *
 * @remarks base58Encoded attribute is the readable string representation of the public key.
 * @remarks base58Decoded attribute is the Uint8Array representation of the public key.
 * @remarks bytesUnversioned attribute is the Uint8Array representation of the public key without the version byte.
 */
export class SecretKey {
  version: number;
  base58Encoded: string;
  base58Decoded: Uint8Array;
  bytesUnversioned: Uint8Array;

  constructor(secretKeyBase58Encoded: string) {
    this.base58Encoded = secretKeyBase58Encoded;
    this.base58Decoded = getBytesSecretKey(secretKeyBase58Encoded);

    // Slice off the version byte
    this.bytesUnversioned = this.base58Decoded.slice(1);

    const secretKeyUnprefixed = secretKeyBase58Encoded.slice(
      SECRET_KEY_PREFIX.length,
    );
    const decoded = base58Decode(secretKeyUnprefixed);
    const decodedVersion = varintDecode(decoded);

    // Extract version from the secret key
    this.version = decodedVersion.value;
  }
}

/**
 * The PublicKey class represents a cryptographic public key.
 *
 * The public key object is created from a secretKey object.
 * The public key bytes representation is `version + publicKey` where publicKey is the 32 bytes of the public key.
 *
 * @remarks Create a new PublicKey with the fromSecretKey method.
 * @remarks The public key is derived from the secret key and got the same version as the secret key.
 *
 * @remarks base58Encoded attribute is the readable string representation of the public key.
 * @remarks base58Decoded attribute is the Uint8Array representation of the public key.
 * @remarks bytesUnversioned attribute is the Uint8Array representation of the public key without the version byte.
 */
export class PublicKey {
  version: number;
  base58Encoded: string;
  base58Decoded: Uint8Array;
  bytesUnversioned: Uint8Array;

  private constructor(publicKeyArray: Uint8Array, secretKey: SecretKey) {
    this.version = secretKey.version;
    this.bytesUnversioned = publicKeyArray;
    const versionBuffer = Buffer.from(varintEncode(this.version));

    // Generate base58 encoded public key
    this.base58Encoded =
      PUBLIC_KEY_PREFIX +
      base58Encode(
        Buffer.concat([versionBuffer, Buffer.from(this.bytesUnversioned)]),
      );
    this.base58Decoded = getBytesPublicKey(this.base58Encoded);
  }

  // Call this method to create a new PublicKey from a secret key.
  static async fromSecretKey(secretKey: SecretKey): Promise<PublicKey> {
    const publicKeyArray: Uint8Array = await ed.getPublicKey(
      secretKey.bytesUnversioned,
    );
    return new PublicKey(publicKeyArray, secretKey);
  }
}

/**
 * An address.
 *
 * @remarks the address object is created from a public key.
 *
 * @remarks the address bytes representation is `version + hashBlake3(version + publicKey)`.
 *
 * @remarks the address is derived from the public key and got the same version as the public key.
 */
export class Address {
  version: number;
  base58Encoded: string;

  constructor(publicKey: PublicKey) {
    this.version = publicKey.version;
    const versionBuffer = Buffer.from(varintEncode(this.version));

    const concatVersionPublicKey = Buffer.concat([
      versionBuffer,
      publicKey.bytesUnversioned,
    ]);

    // Generate base58 encoded address
    this.base58Encoded =
      ADDRESS_PREFIX +
      base58Encode(
        Buffer.concat([versionBuffer, hashBlake3(concatVersionPublicKey)]),
      );
  }
}
