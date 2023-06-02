import {
  base58Decode,
  base58Encode,
  varintEncode,
  varintDecode,
} from '../utils/Xbqcrypto';

import * as ed from '@noble/ed25519';

const PUBLIC_KEY_PREFIX = 'P';
const ADDRESS_PREFIX = 'AU';

export class SecretKey {
  secretKeyBase58Encoded: string;
  secretKeyBase58Decoded: Uint8Array;
  version: number;

  constructor(secretKeyBase58Encoded: string) {
    this.secretKeyBase58Encoded = secretKeyBase58Encoded;
    this.secretKeyBase58Decoded = base58Decode(this.secretKeyBase58Encoded);

    const decodedVersion = varintDecode(this.secretKeyBase58Decoded);
    this.version = decodedVersion.value;
  }
}

export class PublicKey {
  version: number;
  publicKey: Uint8Array;
  publicKeyBase58Encoded: string;

  constructor(secretKey: SecretKey) {
    (async () => {
      this.version = secretKey.version;

      this.publicKey = await ed.getPublicKey(secretKey.secretKeyBase58Decoded);
      const versionBuffer = Buffer.from(varintEncode(this.version));
      this.publicKeyBase58Encoded =
        PUBLIC_KEY_PREFIX +
        base58Encode(
          Buffer.concat([versionBuffer, Buffer.from(this.publicKey)]),
        );
    })();
  }
}

export class Address {
  prefix: string;
  version: number;
  publicKey: string;

  constructor(addressBase58Encoded: string) {
    this.prefix = ADDRESS_PREFIX;

    // Slicing the address prefix from the base58 encoded address
    const addressUnprefixed = addressBase58Encoded.slice(ADDRESS_PREFIX.length);

    // Decoding the base58 encoded unprefixed address
    const decoded = base58Decode(addressUnprefixed);

    // Decoding the version number of the address
    const decodedVersion = varintDecode(decoded);
    this.version = varintDecode(decoded).value;

    this.publicKey = addressUnprefixed.slice(decodedVersion.bytes);
  }
}

const ADDRESSE = 'AU1QRRX6o2igWogY8qbBtqLYsNzYNHwvnpMC48Y6CLCv4cXe9gmK';
const addr = new Address(ADDRESSE);
console.log('prefix = ', addr.prefix);
console.log('version = ', addr.version);
console.log('publicKey = ', addr.publicKey);
