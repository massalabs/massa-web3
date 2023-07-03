import {
  base58Encode,
  varintEncode,
  varintDecode,
  hashBlake3,
} from './Xbqcrypto';

import * as ed from '@noble/ed25519';
import { getBytesPublicKey, getBytesSecretKey } from './bytes';

/**
 * Prefixes for secret keys, public keys, and addresses.
 * Prefixes are used as a convention to differentiate one key from another.
 */
const PUBLIC_KEY_PREFIX = 'P';
const ADDRESS_PREFIX = 'AU';

/**
 * A secret key.
 * The secret key object is created from a base58 encoded string representing the secret key.
 *
 * @remarks String representation is S + base58Check(version_bytes + secret_key_hash_bytes)
 * @remarks bytes attribute is the Uint8Array representation of the secret key.
 */
export class SecretKey {
  version: number;
  private bytes: Uint8Array;

  constructor(secretKeyBase58Encoded: string) {
    const versionAndKeyBytes = getBytesSecretKey(secretKeyBase58Encoded);

    // Slice off the version byte
    this.bytes = versionAndKeyBytes.slice(1);

    this.version = varintDecode(versionAndKeyBytes.slice(0, 1)).value;
  }

  /* Get the public key from the secret key */
  async getPublicKey(): Promise<PublicKey> {
    const publicKeyArray: Uint8Array = await ed.getPublicKey(this.bytes);
    return new PublicKey(publicKeyArray, this.version);
  }

  /* Sign a message hash digest with the secret key */
  async signDigest(messageHashDigest: Uint8Array): Promise<Uint8Array> {
    return await ed.sign(messageHashDigest, this.bytes);
  }
}

/**
 * The PublicKey class represents a cryptographic public key.
 *
 * @remarks The public key is derived from the secret key and got the same version as the secret key.
 *
 * @remarks String representation is P + base58Check(version_bytes + public_key_hash_bytes)
 * @remarks bytes attribute is the Uint8Array representation of the public key.
 */
export class PublicKey {
  version: number;
  base58Encode: string;
  bytes: Uint8Array;

  constructor(bytes: Uint8Array, version: number) {
    this.version = version;
    this.bytes = bytes;
    const versionBuffer = Buffer.from(varintEncode(this.version));

    // Generate base58 encoded public key
    this.base58Encode =
      PUBLIC_KEY_PREFIX +
      base58Encode(Buffer.concat([versionBuffer, Buffer.from(this.bytes)]));
  }

  /* Static method to create a public key from a base58 encoded string, and decoding the version number */
  static fromString(publicKeyBase58Encoded: string): PublicKey {
    const versionAndKeyBytes = getBytesPublicKey(publicKeyBase58Encoded);

    // Slice off the version byte
    const version = varintDecode(versionAndKeyBytes.slice(0, 1)).value;
    const keyBytes = versionAndKeyBytes.slice(1);

    return new PublicKey(keyBytes, version);
  }
}

/**
 * An address.
 *
 * @remarks the address object is created from a public key and got the same version as the public key.
 *
 * @remarks String representation is A + U/S + base58Check(version_bytes + hashBlake3(version_bytes + public_key_bytes))
 * @remarks the address bytes representation is `version + hashBlake3(version + publicKey)`.
 */
export class Address {
  version: number;
  base58Encode: string;

  constructor(publicKey: PublicKey) {
    this.version = publicKey.version;

    const versionBuffer = Buffer.from(varintEncode(this.version));
    const versionAndPublicKey = Buffer.concat([versionBuffer, publicKey.bytes]);

    // Generate base58 encoded address
    this.base58Encode =
      ADDRESS_PREFIX +
      base58Encode(
        Buffer.concat([versionBuffer, hashBlake3(versionAndPublicKey)]),
      );
  }
}
