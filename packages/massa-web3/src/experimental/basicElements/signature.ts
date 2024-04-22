import Base58 from '../crypto/base58'
import Serializer from '../crypto/interfaces/serializer'
import { Version, Versioner } from '../crypto/interfaces/versioner'
import VarintVersioner from '../crypto/varintVersioner'
import { extractData } from './internal'

/**
 * A class representing a signature.
 */
export class Signature {
  public bytes: Uint8Array

  protected constructor(
    public serializer: Serializer,
    public versioner: Versioner,
    public version: Version
  ) {}

  /**
   * Initializes a new signature object from a version.
   *
   * @param version - The version of the signature.
   *
   * @returns A new signature instance.
   */
  protected static initFromVersion(version: Version = Version.V0): Signature {
    switch (version) {
      case Version.V0:
        return new Signature(new Base58(), new VarintVersioner(), version)
      default:
        throw new Error(`unsupported version: ${version}`)
    }
  }

  /**
   * Initializes a new signature object from a serialized string.
   *
   * @param str - The serialized signature string.
   * @param version - The version of the signature. If not defined, the last version will be used.
   *
   * @returns A new signature instance.
   *
   * @throws If the signature string is invalid.
   */
  public static fromString(str: string, version?: Version): Signature {
    const signature = Signature.initFromVersion(version)

    try {
      signature.bytes = extractData(
        signature.serializer,
        signature.versioner,
        str,
        signature.version
      )
    } catch (e) {
      throw new Error(`invalid signature string: ${e.message}`)
    }

    return signature
  }

  /**
   * Initializes a signature object from a raw byte array.
   *
   * @param bytes - The signature raw bytes.
   * @param version - The version of the signature. If not defined, the last version will be used.
   *
   * @returns A signature object.
   */
  public static fromBytes(bytes: Uint8Array, version?: Version): Signature {
    const signature = Signature.initFromVersion(version)
    signature.bytes = bytes
    return signature
  }

  /**
   * Versions the Signature key bytes.
   *
   * @returns The versioned signature key bytes.
   */
  public toBytes(): Uint8Array {
    return this.versioner.attach(this.version, this.bytes)
  }

  /**
   * Serializes the signature to a string.
   *
   * @returns The serialized signature string.
   */
  public toString(): string {
    return this.serializer.serialize(this.toBytes())
  }
}
