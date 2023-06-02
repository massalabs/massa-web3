import {
  base58Decode,
  base58Encode,
  varintEncode,
  varintDecode,
  hashBlake3,
} from '../utils/Xbqcrypto';

import * as ed from '@noble/ed25519';

const PUBLIC_KEY_PREFIX = 'P';
const ADDRESS_PREFIX = 'AU';

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
