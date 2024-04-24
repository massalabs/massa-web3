import Base58 from '../crypto/base58'
import Serializer from '../crypto/interfaces/serializer'
import { Version, Versioner } from '../crypto/interfaces/versioner'
import VarintVersioner from '../crypto/varintVersioner'
import { PublicKey } from './keys'
import varint from 'varint'

const ADDRESS_USER_PREFIX = 'AU'
const ADDRESS_CONTRACT_PREFIX = 'AS'
const UNDERLYING_HASH_LEN = 32

const DEFAULT_VERSION = Version.V0

/**
 * A class representing an address.
 *
 * @remarks
 * For now, an address is intrinsically linked (to be understood as a digest of) to the public key.
 *
 * @privateRemarks
 * Interfaces are used to make the code more modular. To add a new version, you simply need to:
 * - Add a new case in the switch statement with the new algorithms to use.
 * - Change the DEFAULT_VERSION version matching the last version.
 * - Change the getVersion method to detect the version from user input.
 * - check the `fromPublicKey` method to potentially adapt how an address is derived from a public key.
 * - Voila! The code will automatically handle the new version.
 */
export class Address {
  // The address in byte format. Address type and version included.
  private bytes: Uint8Array

  public isEOA = false

  protected constructor(
    public serializer: Serializer,
    public versioner: Versioner,
    public version: Version
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
  protected static initFromVersion(
    version: Version = DEFAULT_VERSION
  ): Address {
    switch (version) {
      case Version.V0:
        return new Address(new Base58(), new VarintVersioner(), version)
      default:
        throw new Error(`unsupported version: ${version}`)
    }
  }

  private getPrefix(str: string): string {
    const expected = [ADDRESS_USER_PREFIX, ADDRESS_CONTRACT_PREFIX]
    for (let prefix of expected) {
      if (str.startsWith(prefix)) {
        return prefix
      }
    }
    throw new Error(
      `invalid address prefix: one of ${expected.join(' or ')} was expected.`
    )
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
    const version = Address.getVersion(str)
    const address = Address.initFromVersion(version)

    try {
      const prefix = address.getPrefix(str)

      address.isEOA = prefix === ADDRESS_USER_PREFIX
      const versionedBytes = address.serializer.deserialize(
        str.slice(prefix.length)
      )

      address.bytes = Uint8Array.from([
        ...varint.encode(address.isEOA ? 0 : 1),
        ...versionedBytes,
      ])
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
   * Get the address version.
   *   *
   * @returns the address type enum.
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private static getVersion(data: string | Uint8Array): Version {
    // when a new version will come, implement the logic to detect version here
    // This should be done without serializer and versionner as they are potentially not known at this point
    return Version.V0
  }

  /**
   * Initializes a new address object from a public key.
   *
   * @param publicKey - The public key to derive the address from.
   *
   * @returns A new address object.
   */
  public static fromPublicKey(
    publicKey: PublicKey,
    version = DEFAULT_VERSION
  ): Address {
    const address = Address.initFromVersion(version)
    const rawBytes = publicKey.hasher.hash(publicKey.toBytes())
    address.bytes = Uint8Array.from([
      0 /* EOA*/,
      ...address.versioner.attach(version, rawBytes),
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
    const version = Address.getVersion(bytes)
    const address = Address.initFromVersion(version)
    address.bytes = bytes
    address.isEOA = address.getType() === 0
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
    // skip address type bytes
    const versionedBytes = this.bytes.slice(
      varint.encodingLength(this.getType())
    )
    return `${
      this.isEOA ? ADDRESS_USER_PREFIX : ADDRESS_CONTRACT_PREFIX
    }${this.serializer.serialize(versionedBytes)}`
  }

  /**
   * Get address in binary format from a bytes buffer.
   *
   * @returns The address in bytes format.
   */
  static extractFromBuffer(data: Uint8Array, offset = 0): Uint8Array {
    // addr type
    varint.decode(data, offset)
    let addrByteLen = varint.decode.bytes
    // version
    varint.decode(data, offset + addrByteLen)
    addrByteLen += varint.decode.bytes

    addrByteLen += UNDERLYING_HASH_LEN
    return data.slice(offset, offset + addrByteLen)
  }
}
