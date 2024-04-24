import Base58 from '../crypto/base58'
import Serializer from '../crypto/interfaces/serializer'
import { Version } from '../crypto/interfaces/versioner'
import { checkPrefix } from './internal'
import { PublicKey } from './keys'
import varint from 'varint'

const ADDRESS_PREFIX = 'A'
const ADDRESS_USER_PREFIX = 'U'
const ADDRESS_CONTRACT_PREFIX = 'S'
const UNDERLYING_HASH_LEN = 32
/**
 * A class representing an address.
 *
 * @remarks
 * For now, an address is intrinsically linked (to be understood as a digest of) to the public key.
 *
 * @privateRemarks
 * Interfaces are used to make the code more modular. To add a new version, you simply need to:
 * - extend the `initFromVersion` method:
 *   - Add a new case in the switch statement with the new algorithms to use.
 *   - Add a new default version matching the last version.
 * - check the `fromPublicKey` method to potentially adapt how an address is derived from a public key.
 * - Voila! The code will automatically handle the new version.
 */
export class Address {
  private bytes: Uint8Array

  protected constructor(
    public serializer: Serializer,
    public version: Version,
    public isEOA: boolean
  ) {}

  /**
   * Initialize a new address object from a version.
   *
   * @param version - The version of the address.
   *
   * @returns A new address instance.
   *
   * @throws If the version is not supported.
   */
  protected static initFromVersion(version: Version = Version.V0): Address {
    switch (version) {
      case Version.V0:
        return new Address(new Base58(), version, false)
      default:
        throw new Error(`unsupported version: ${version}`)
    }
  }

  /**
   * Initializes a new address object from a serialized string.
   *
   * @param str - The serialized address string.
   *
   * @returns A new address instance.
   *
   * @throws If the address string is invalid.
   */
  public static fromString(str: string): Address {
    const address = Address.initFromVersion()

    try {
      const prefix = checkPrefix(
        str,
        ADDRESS_PREFIX + ADDRESS_USER_PREFIX,
        ADDRESS_PREFIX + ADDRESS_CONTRACT_PREFIX
      )

      address.isEOA = str[ADDRESS_PREFIX.length] === ADDRESS_USER_PREFIX
      const versionedHash = address.serializer.deserialize(
        str.slice(prefix.length)
      )

      address.bytes = Uint8Array.from([
        ...varint.encode(address.isEOA ? 0 : 1),
        ...versionedHash,
      ])
      address.version = address.getVersion()
    } catch (e) {
      throw new Error(`invalid address string: ${e.message}`)
    }

    return address
  }

  /**
   * Get the address type from bytes.
   *   *
   * @returns the address type enum.
   */
  private getType(): number {
    if (!this.bytes) {
      throw new Error('address bytes is not initialized')
    }
    return varint.decode(this.bytes)
  }

  /**
   * Get the address version from bytes.
   *   *
   * @returns the address type enum.
   */
  private getVersion(): Version {
    if (!this.bytes) {
      throw new Error('address bytes is not initialized')
    }
    varint.decode(this.bytes)
    return varint.decode(this.bytes, varint.decode.bytes)
  }

  /**
   * Initializes a new address object from a public key.
   *
   * @param publicKey - The public key to derive the address from.
   *
   * @returns A new address object.
   */
  public static fromPublicKey(publicKey: PublicKey): Address {
    const address = Address.initFromVersion()
    const hash = publicKey.hasher.hash(publicKey.toBytes())
    address.bytes = Uint8Array.from([
      0 /* EOA*/,
      ...varint.encode(address.version),
      ...hash,
    ])
    address.isEOA = true
    return address
  }

  /**
   * Initializes a new address object from versioned bytes.
   *
   * @param bytes - The versioned bytes.
   *
   * @returns A new address object.
   */
  public static fromBytes(bytes: Uint8Array): Address {
    const address = Address.initFromVersion()
    address.bytes = bytes
    address.isEOA = address.getType() === 0
    address.version = address.getVersion()
    return address
  }

  /**
   * Versions the address key bytes.
   *
   * @returns The versioned address key bytes.
   */
  public toBytes(): Uint8Array {
    return this.bytes
  }

  /**
   * Serializes the address to a string.
   *
   * @remarks
   * A address is serialized as follows:
   * - The version is serialized as a varint and prepended to the address bytes.
   * - The result is then sent to the serializer.
   *
   * @returns The serialized address string.
   */
  toString(): string {
    // decode version
    varint.decode(this.bytes)
    const versionedBytes = this.bytes.slice(varint.decode.bytes)
    return `${ADDRESS_PREFIX}${
      this.isEOA ? ADDRESS_USER_PREFIX : ADDRESS_CONTRACT_PREFIX
    }${this.serializer.serialize(versionedBytes)}`
  }

  /**
   * Get byte length of address in binary format .
   *
   * @returns The address length in bytes.
   */
  static getByteLength(data: Uint8Array): number {
    // addr type
    varint.decode(data)
    let addrByteLen = varint.decode.bytes
    // version
    varint.decode(data, addrByteLen)
    addrByteLen += varint.decode.bytes

    addrByteLen += UNDERLYING_HASH_LEN
    return addrByteLen
  }
}
