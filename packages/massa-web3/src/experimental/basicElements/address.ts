import Base58 from '../crypto/base58'
import Serializer from '../crypto/interfaces/serializer'
import { Version, Versioner } from '../crypto/interfaces/versioner'
import VarintVersioner from '../crypto/varintVersioner'
import { checkPrefix, extractData } from './internal'
import { PublicKey } from './keys'

const ADDRESS_PREFIX = 'A'
const ADDRESS_USER_PREFIX = 'U'
const ADDRESS_CONTRACT_PREFIX = 'S'

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
  public bytes: Uint8Array

  protected constructor(
    public serializer: Serializer,
    public versioner: Versioner,
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
        return new Address(new Base58(), new VarintVersioner(), version, false)
      default:
        throw new Error(`Unsupported version: ${version}`)
    }
  }

  /**
   * Initializes a new address object from a serialized string.
   *
   * @param str - The serialized address string.
   * @param version - The version of the address. If not defined, the last version will be used.
   *
   * @returns A new address instance.
   *
   * @throws If the address string is invalid.
   */
  public static fromString(str: string, version?: Version): Address {
    const address = Address.initFromVersion(version)

    try {
      checkPrefix(
        str,
        ADDRESS_PREFIX + ADDRESS_USER_PREFIX,
        ADDRESS_PREFIX + ADDRESS_CONTRACT_PREFIX
      )
      address.isEOA = str[ADDRESS_PREFIX.length] === ADDRESS_USER_PREFIX
      address.bytes = extractData(
        address.serializer,
        address.versioner,
        str.slice(ADDRESS_PREFIX.length + ADDRESS_USER_PREFIX.length),
        address.version
      )
    } catch (e) {
      throw new Error(`invalid address string: ${e.message}`)
    }

    return address
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
    address.bytes = publicKey.hasher.hash(publicKey.toBytes())
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
    const { version, data } = new VarintVersioner().extract(bytes.slice(1))
    const address = Address.initFromVersion(version)
    address.bytes = data
    address.isEOA = bytes[0] === 0
    return address
  }

  /**
   * Versions the address key bytes.
   *
   * @returns The versioned address key bytes.
   */
  public toBytes(): Uint8Array {
    const eoaPrefix = new Uint8Array(this.isEOA ? [0] : [1])
    const bytes = this.versioner.attach(this.version, this.bytes)
    return Uint8Array.from([...eoaPrefix, ...bytes])
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
    const versionedBytes = this.versioner.attach(this.version, this.bytes)
    return `${ADDRESS_PREFIX}${
      this.isEOA ? ADDRESS_USER_PREFIX : ADDRESS_CONTRACT_PREFIX
    }${this.serializer.serialize(versionedBytes)}`
  }
}
