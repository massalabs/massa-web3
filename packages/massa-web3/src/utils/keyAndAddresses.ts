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
  private _version: number
  private _prefix: string
  private _versionBytesLength: number
  private _versionAndAddressBytes: Uint8Array
  private _isUser = false
  private _isContract = false

  constructor(base58Encoded: string) {
    this.base58Encode = base58Encoded
    this.setPrefix()
    this.setDecodedVersionAndAddressBytes()
    this.setVersion()

    const addressBytes = this._versionAndAddressBytes.slice(
      this._versionBytesLength
    )

    if (addressBytes.length !== 32) {
      throw new Error(
        `Expected address to be 32 bytes long not ${addressBytes.length}`
      )
    }
  }

  private setPrefix(): void {
    this._prefix = this.base58Encode.slice(0, ADDRESS_PREFIX_LENGTH)
    if (this._prefix === ADDRESS_USER_PREFIX) {
      this._isUser = true
    } else if (this.prefix === ADDRESS_CONTRACT_PREFIX) {
      this._isContract = true
    } else {
      throw new Error(`Invalid address prefix: ${this.prefix}`)
    }
  }

  private setDecodedVersionAndAddressBytes(): void {
    const versionAndAddress = this.base58Encode.slice(ADDRESS_PREFIX_LENGTH)
    this._versionAndAddressBytes = new Uint8Array(
      base58Decode(versionAndAddress)
    )
  }

  private setVersion(): void {
    const { value, bytes: versionBytesLength } = varintDecode(
      this._versionAndAddressBytes
    )
    this._version = value
    this._versionBytesLength = versionBytesLength
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

  public toBytes = (): Buffer => {
    let addressTypeEcoded: Buffer

    if (this._isUser) {
      addressTypeEcoded = Buffer.from([0])
    } else if (this._isContract) {
      addressTypeEcoded = Buffer.from([1])
    }

    let targetAddressEncoded = base58Decode(this.base58Encode.slice(2))

    targetAddressEncoded = Buffer.concat([
      addressTypeEcoded,
      targetAddressEncoded,
    ])

    return targetAddressEncoded
  }

  get versionNumber(): number {
    return this._version
  }

  get prefix(): string {
    return this._prefix
  }

  get isUser(): boolean {
    return this._isUser
  }

  get isContract(): boolean {
    return this._isContract
  }
}
