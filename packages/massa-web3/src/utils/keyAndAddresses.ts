import {
  base58Encode,
  varintEncode,
  varintDecode,
  hashBlake3,
  base58Decode,
} from './Xbqcrypto'

import * as ed from '@noble/ed25519'
import { getBytesPublicKey, getBytesSecretKey } from './bytes'
import {
  ADDRESS_CONTRACT_PREFIX,
  ADDRESS_PREFIX_LENGTH,
  ADDRESS_USER_PREFIX,
  PUBLIC_KEY_PREFIX,
} from '@massalabs/web3-utils'

/**
 * A secret key.
 * The secret key object is created from a base58 encoded string representing the secret key.
 *
 * @remarks
 * - String representation is S + base58Check(version_bytes + secret_key_hash_bytes)
 * - bytes attribute is the Uint8Array representation of the secret key.
 */
export class SecretKey {
  version: number
  bytes: Uint8Array

  constructor(secretKeyBase58Encoded: string) {
    const versionAndKeyBytes = getBytesSecretKey(secretKeyBase58Encoded)
    const { value, bytes } = varintDecode(versionAndKeyBytes)
    this.version = value
    this.bytes = versionAndKeyBytes.slice(bytes)
  }

  /* Get the public key from the secret key */
  async getPublicKey(): Promise<PublicKey> {
    const publicKeyArray: Uint8Array = await ed.getPublicKey(this.bytes)
    return new PublicKey(publicKeyArray, this.version)
  }

  /* Sign a message hash digest with the secret key */
  async signDigest(messageHashDigest: Uint8Array): Promise<Uint8Array> {
    return await ed.sign(messageHashDigest, this.bytes)
  }
}

/**
 * The PublicKey class represents a cryptographic public key.
 *
 * @remarks
 * - The public key is derived from the secret key and got the same version as the secret key.
 * - String representation is P + base58Check(version_bytes + public_key_hash_bytes)
 * - bytes attribute is the Uint8Array representation of the public key.
 */
export class PublicKey {
  version: number
  base58Encode: string
  bytes: Uint8Array

  constructor(bytes: Uint8Array, version: number) {
    this.version = version
    this.bytes = bytes
    const versionBuffer = Buffer.from(varintEncode(this.version))

    // Generate base58 encoded public key
    this.base58Encode =
      PUBLIC_KEY_PREFIX +
      base58Encode(Buffer.concat([versionBuffer, Buffer.from(this.bytes)]))
  }

  // Create a new PublicKey object from a base58 encoded string
  static fromString(base58Encoded: string): PublicKey {
    const versionAndKeyBytes = getBytesPublicKey(base58Encoded)

    // Slice off the version byte
    const { value, bytes } = varintDecode(versionAndKeyBytes)
    const keyBytes = versionAndKeyBytes.slice(bytes)

    return new PublicKey(keyBytes, value)
  }
}

/**
 * An address.
 *
 * @remarks when the address is created from a public key it got the same version as the public key.
 *
 * @remarks
 * - String representation is A + U/S + base58Check(version_bytes + hashBlake3(version_bytes + public_key_bytes))
 * - The address bytes representation is `version + hashBlake3(version + publicKey)`.
 * - bytes is not an attribute of the address object because it is not needed.
 */
export class Address {
  base58Encode: string
  private version: number
  private prefix: string
  private versionBytesLength: number
  private versionAndAddressBytes: Uint8Array

  constructor(base58Encoded: string) {
    this.base58Encode = base58Encoded
    this.setPrefix()
    this.setDecodedVersionAndAddressBytes()
    this.setVersion()

    const addressBytes = this.versionAndAddressBytes.slice(
      this.versionBytesLength
    )

    if (addressBytes.length !== 32) {
      throw new Error(
        `Expected address to be 32 bytes long not ${addressBytes.length}`
      )
    }
  }

  private setPrefix(): void {
    this.prefix = this.base58Encode.slice(0, ADDRESS_PREFIX_LENGTH)
    if (![ADDRESS_USER_PREFIX, ADDRESS_CONTRACT_PREFIX].includes(this.prefix)) {
      throw new Error(`Invalid address prefix: ${this.prefix}`)
    }
  }

  private setDecodedVersionAndAddressBytes(): void {
    const versionAndAddress = this.base58Encode.slice(ADDRESS_PREFIX_LENGTH)
    this.versionAndAddressBytes = new Uint8Array(
      base58Decode(versionAndAddress)
    )
  }

  private setVersion(): void {
    const { value, bytes: versionBytesLength } = varintDecode(
      this.versionAndAddressBytes
    )
    this.version = value
    this.versionBytesLength = versionBytesLength
  }

  static fromPublicKey(publicKey: PublicKey): Address {
    const versionBuffer = Buffer.from(varintEncode(publicKey.version))
    const versionAndPublicKey = Buffer.concat([versionBuffer, publicKey.bytes])

    // Generate base58 encoded address
    const base58Encoded =
      ADDRESS_USER_PREFIX +
      base58Encode(
        Buffer.concat([versionBuffer, hashBlake3(versionAndPublicKey)])
      )

    return new Address(base58Encoded)
  }

  get versionNumber(): number {
    return this.version
  }
}
