import {
  base58Decode,
  base58Encode,
  varintEncode,
  varintDecode,
  hashBlake3,
} from './Xbqcrypto';

import { getBytesSecretKey, getBytesPublicKey } from './bytes';

/**
 * Prefixes for secret and public keys.
 * Prefixes are used as a convention to differentiate one key from another.
 */

const PUBLIC_KEY_PREFIX = 'P';
const ADDRESS_PREFIX = 'AU';
const SECRET_KEY_PREFIX = 'S';

/**
 * A secret key.
 *
 * @remarks the secret key object is created from a base58 encoded string representing the secret key.
 * The secret key bytes representation is `version + secretKey` where secretKey is the 32 bytes of the secret key.
 */
export class SecretKey {
  base58Encoded: string;
  base58Decoded: Uint8Array;
  base58DecodedUnversioned: Uint8Array;
  prefix: string;
  version: number;

  constructor(secretKeyBase58Encoded: string) {
    this.prefix = SECRET_KEY_PREFIX;
    this.base58Encoded = secretKeyBase58Encoded;
    this.base58Decoded = getBytesSecretKey(secretKeyBase58Encoded);

    // Slice off the version byte
    this.base58DecodedUnversioned = this.base58Decoded.slice(1);

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
 * A public key.
 *
 * @remarks the public key object is created from a base58 encoded string representing the public key.
 * The public key bytes representation is `version + publicKey` where publicKey is the 32 bytes of the public key.
 *
 * @remarks the public key is derived from the secret key and got the same version as the secret key.
 */
export class PublicKey {
  version: number;
  publicKey: Uint8Array;
  base58Encoded: string;
  base58Decoded: Uint8Array;
  base58DecodedUnversioned: Uint8Array;

  constructor(publicKeyArray: Uint8Array, secretKey: SecretKey) {
    this.version = secretKey.version;
    this.publicKey = publicKeyArray;
    const versionBuffer = Buffer.from(varintEncode(this.version));

    // Generate base58 encoded public key
    this.base58Encoded =
      PUBLIC_KEY_PREFIX +
      base58Encode(Buffer.concat([versionBuffer, Buffer.from(this.publicKey)]));
    this.base58Decoded = getBytesPublicKey(this.base58Encoded);

    // Slice off the version byte
    this.base58DecodedUnversioned = this.base58Decoded.slice(1);
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
  prefix: string;
  version: number;
  addressBase58Encoded: string;

  constructor(publicKey: PublicKey) {
    this.prefix = ADDRESS_PREFIX;
    this.version = publicKey.version;
    const versionBuffer = Buffer.from(varintEncode(this.version));

    const concatVersionPublicKey = Buffer.concat([
      versionBuffer,
      publicKey.publicKey,
    ]);

    // Generate base58 encoded address
    this.addressBase58Encoded =
      ADDRESS_PREFIX +
      base58Encode(
        Buffer.concat([versionBuffer, hashBlake3(concatVersionPublicKey)]),
      );
  }
}
