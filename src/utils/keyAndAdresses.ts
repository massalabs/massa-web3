import {
  base58Decode,
  base58Encode,
  varintEncode,
  varintDecode,
  hashBlake3,
} from './Xbqcrypto';

import { getBytesSecretKeyVersioned } from './bytes';

const PUBLIC_KEY_PREFIX = 'P';
const ADDRESS_PREFIX = 'AU';
const SECRET_KEY_PREFIX = 'S';

export class SecretKey {
  base58Encoded: string;
  base58Decoded: Uint8Array;
  prefix: string;
  version: number;

  constructor(secretKeyBase58Encoded: string) {
    this.prefix = SECRET_KEY_PREFIX;
    this.base58Encoded = secretKeyBase58Encoded;
    this.base58Decoded = getBytesSecretKeyVersioned(secretKeyBase58Encoded);

    const secretKeyUnprefixed = secretKeyBase58Encoded.slice(
      SECRET_KEY_PREFIX.length,
    );
    const decoded = base58Decode(secretKeyUnprefixed);
    const decodedVersion = varintDecode(decoded);
    this.version = decodedVersion.value;
  }
}

export class PublicKey {
  version: number;
  publicKey: Uint8Array;
  base58Encoded: string;

  constructor(publicKeyArray: Uint8Array, secretKey: SecretKey) {
    this.version = secretKey.version;
    this.publicKey = publicKeyArray;
    const versionBuffer = Buffer.from(varintEncode(this.version));
    this.base58Encoded =
      PUBLIC_KEY_PREFIX +
      base58Encode(Buffer.concat([versionBuffer, Buffer.from(this.publicKey)]));
  }
}

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

    this.addressBase58Encoded =
      ADDRESS_PREFIX +
      base58Encode(
        Buffer.concat([versionBuffer, hashBlake3(concatVersionPublicKey)]),
      );
  }
}
