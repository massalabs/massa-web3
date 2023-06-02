import {
  base58Decode,
  base58Encode,
  varintEncode,
  varintDecode,
  hashBlake3,
} from '../utils/Xbqcrypto';

import { getBytesSecretKey } from '../utils/bytes';

import * as ed from '@noble/ed25519';

const PUBLIC_KEY_PREFIX = 'P';
const ADDRESS_PREFIX = 'AU';
const SECRET_KEY_PREFIX = 'S';

export class SecretKey {
  secretKeyBase58Encoded: string;
  secretKeyBase58Decoded: Uint8Array;
  prefix: string;
  version: number;

  constructor(secretKeyBase58Encoded: string) {
    this.prefix = SECRET_KEY_PREFIX;
    this.secretKeyBase58Encoded = secretKeyBase58Encoded;
    this.secretKeyBase58Decoded = getBytesSecretKey(secretKeyBase58Encoded);

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
  publicKeyBase58Encoded: string;

  constructor(publicKeyArray: Uint8Array, secretKey: SecretKey) {
    this.version = secretKey.version;
    this.publicKey = publicKeyArray;

    const versionBuffer = Buffer.from(varintEncode(this.version));
    this.publicKeyBase58Encoded =
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

    // console.log("la version est : " + this.version);

    const versionBuffer = Buffer.from(varintEncode(this.version));

    const concatVersionPublicKey = Buffer.concat([
      versionBuffer,
      publicKey.publicKey,
    ]);

    // console.log("la concat est : " + concatVersionPublicKey);

    this.addressBase58Encoded =
      ADDRESS_PREFIX +
      base58Encode(
        Buffer.concat([versionBuffer, hashBlake3(concatVersionPublicKey)]),
      );

    // console.log("l'adresse est : " + this.addressBase58Encoded);
  }
}
