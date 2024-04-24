import { Signature } from './signature'
import { Address } from './address'
import Base58 from '../crypto/base58'
import Blake3 from '../crypto/blake3'
import Ed25519 from '../crypto/ed25519'
import Hasher from '../crypto/interfaces/hasher'
import Serializer from '../crypto/interfaces/serializer'
import Signer from '../crypto/interfaces/signer'
import { Version, Versioner } from '../crypto/interfaces/versioner'
import VarintVersioner from '../crypto/varintVersioner'
import { mustExtractPrefix, extractData } from './internal'

const PRIVATE_KEY_PREFIX = 'S'
const PUBLIC_KEY_PREFIX = 'P'

/**
 * A class representing a private key.
 *
 * @remarks
 * The private key is used to sign operations during interactions with the blockchain.
 *
 * @privateRemarks
 * Interfaces are used to make the code more modular. To add a new version, you simply need to
 * extend the `initFromVersion` method:
 * - Add a new case in the switch statement with the new algorithms to use.
 * - Add a new default version matching the last version.
 * - Voila! The code will automatically handle the new version.
 */
export class PrivateKey {
  public bytes: Uint8Array

  protected constructor(
    public hasher: Hasher,
    public signer: Signer,
    public serializer: Serializer,
    public versioner: Versioner,
    public version: Version
  ) {}

  /**
   * Initializes a new private key object from a version.
   *
   * @param version - The version of the private key. If not defined, the last version will be used.
   *
   * @returns A new private key instance.
   */
  protected static initFromVersion(version: Version = Version.V0): PrivateKey {
    switch (version) {
      case Version.V0:
        return new PrivateKey(
          new Blake3(),
          new Ed25519(),
          new Base58(),
          new VarintVersioner(),
          version
        )
      default:
        throw new Error(`unsupported version: ${version}`)
    }
  }

  /**
   * Initializes a new private key object from a serialized string.
   *
   * @param str - The serialized private key string.
   * @param version - The version of the private key. If not defined, the last version will be used.
   *
   * @returns A new private key instance.
   *
   * @throws If the private key prefix is invalid.
   */
  public static fromString(str: string, version?: Version): PrivateKey {
    const privateKey = PrivateKey.initFromVersion(version)

    try {
      mustExtractPrefix(str, PRIVATE_KEY_PREFIX)
      privateKey.bytes = extractData(
        privateKey.serializer,
        privateKey.versioner,
        str.slice(PRIVATE_KEY_PREFIX.length),
        privateKey.version
      )
    } catch (e) {
      throw new Error(`invalid private key string: ${e.message}`)
    }
    return privateKey
  }

  /**
   * Initializes a new private key object from a raw byte array and a version.
   *
   * @param bytes - The raw bytes without any prefix version.
   * @param version - The version of the private key. If not defined, the last version will be used.
   *
   * @returns A new private key instance.
   */
  public static fromBytes(bytes: Uint8Array, version?: Version): PrivateKey {
    const privateKey = PrivateKey.initFromVersion(version)
    privateKey.bytes = bytes
    return privateKey
  }

  /**
   * Initializes a new private key object from the environment variables.
   *
   * @remarks
   * The `PRIVATE_KEY` environment variable is required.
   *
   * @returns A new private key instance.
   */
  public static fromEnv(): PrivateKey {
    if (!process.env.PRIVATE_KEY) {
      throw new Error('missing `PRIVATE_KEY` environment variable')
    }
    return PrivateKey.fromString(process.env.PRIVATE_KEY)
  }

  /**
   * Initializes a random private key.
   *
   * @param version - The version of the private key. If not defined, the last version will be used.
   *
   * @returns A new private key instance.
   */
  public static generate(version?: Version): PrivateKey {
    const privateKey = PrivateKey.initFromVersion(version)
    privateKey.bytes = privateKey.signer.generatePrivateKey()
    return privateKey
  }

  /**
   * Returns the public key matching to the current private key.
   *
   * @returns A new public key instance.
   */
  public async getPublicKey(): Promise<PublicKey> {
    return PublicKey.fromPrivateKey(this)
  }

  /**
   * Signs the message with the private key.
   *
   * @remarks
   * This function signs a byte-encoded message. The message is first hashed and then signed.
   * Do not pass a digest to this function as it will be hashed twice.
   *
   * @param message - The byte array to sign.
   *
   * @returns The signature byte array.
   */
  public async sign(message: Uint8Array): Promise<Signature> {
    return Signature.fromBytes(
      await this.signer.sign(this.bytes, this.hasher.hash(message)),
      this.version
    )
  }

  /**
   * Versions the private key bytes.
   *
   * @returns The versioned private key bytes.
   */
  public toBytes(): Uint8Array {
    return this.versioner.attach(this.version, this.bytes)
  }

  /**
   * Serializes the private key to a string.
   *
   * @remarks
   * A private key is serialized as follows:
   * - The version is serialized as a varint and prepended to the private key bytes.
   * - The result is then sent to the serializer.
   *
   * @returns The serialized private key string.
   */
  public toString(): string {
    return `${PRIVATE_KEY_PREFIX}${this.serializer.serialize(this.toBytes())}`
  }
}

/**
 * A class representing a public key.
 *
 * @remarks
 * The public key is an essential component of asymmetric cryptography. It is intrinsically linked to the private key.
 *
 * @privateRemarks
 * Interfaces are used to make the code more modular. To add a new version, you simply need to:
 * - extend the `initFromVersion` method:
 *   - Add a new case in the switch statement with the new algorithms to use.
 *   - Add a new default version matching the last version.
 * - check the `fromPrivateKey` method to potentially adapt how a public key is derived from a private key.
 * - Voila! The code will automatically handle the new version.
 */
export class PublicKey {
  public bytes: Uint8Array

  protected constructor(
    public hasher: Hasher,
    public signer: Signer,
    public serializer: Serializer,
    public versioner: Versioner,
    public version: Version
  ) {}

  /**
   * Initializes a new public key object from a version.
   *
   * @param version - The version of the private key. If not defined, the last version will be used.
   *
   * @returns A new public key instance.
   *
   * @throws If the version is not supported.
   */
  protected static initFromVersion(version: Version = Version.V0): PublicKey {
    switch (version) {
      case Version.V0:
        return new PublicKey(
          new Blake3(),
          new Ed25519(),
          new Base58(),
          new VarintVersioner(),
          version
        )
      default:
        throw new Error(`unsupported version: ${version}`)
    }
  }

  /**
   * Initializes a new public key object from a serialized string.
   *
   * @param str - The serialized public key string.
   * @param version - The version of the public key. If not defined, the last version will be used.
   *
   * @returns A new public key instance.
   *
   * @throws If the public key string is invalid.
   */
  public static fromString(str: string, version?: Version): PublicKey {
    const publicKey = PublicKey.initFromVersion(version)

    try {
      mustExtractPrefix(str, PUBLIC_KEY_PREFIX)
      publicKey.bytes = extractData(
        publicKey.serializer,
        publicKey.versioner,
        str.slice(PUBLIC_KEY_PREFIX.length),
        publicKey.version
      )
    } catch (e) {
      throw new Error(`invalid public key string: ${e.message}`)
    }

    return publicKey
  }

  /**
   * Initializes a new public key object from a raw byte array and a version.
   *
   * @param bytes - The raw bytes without any prefix version.
   * @param version - The version of the public key. If not defined, the last version will be used.
   *
   * @returns A new public key instance.
   */
  public static fromBytes(bytes: Uint8Array, version?: Version): PublicKey {
    const publicKey = PublicKey.initFromVersion(version)
    publicKey.bytes = bytes
    return publicKey
  }

  /**
   * Initializes a new public key object from a private key.
   *
   * @param privateKey - The private key to derive the public key from.
   *
   * @returns A new public key instance.
   */
  public static async fromPrivateKey(
    privateKey: PrivateKey
  ): Promise<PublicKey> {
    const publicKey = PublicKey.initFromVersion()
    publicKey.bytes = await publicKey.signer.getPublicKey(privateKey.bytes)
    return publicKey
  }

  /**
   * Get an address from the public key.
   *
   * @returns A new address object.
   */
  public getAddress(): Address {
    return Address.fromPublicKey(this)
  }

  /**
   * Checks the message signature with the public key.
   *
   * @remarks
   * This function very a byte-encoded message. The message is first hashed and then verified.
   * Do not pass a digest to this function as it will be hashed twice.
   *
   * @param signature - The signature to verify.
   * @param data - The data signed by the signature.
   *
   * @returns A boolean indicating whether the signature is valid.
   */
  public async verify(
    data: Uint8Array,
    signature: Signature
  ): Promise<boolean> {
    return await this.signer.verify(
      this.bytes,
      this.hasher.hash(data),
      signature.bytes
    )
  }

  /**
   * Versions the public key bytes.
   *
   * @returns The versioned public key bytes.
   */
  public toBytes(): Uint8Array {
    return this.versioner.attach(this.version, this.bytes)
  }

  /**
   * Serializes the public key to a string.
   *
   * @remarks
   * A public key is serialized as follows:
   * - The version is serialized as a varint and prepended to the public key bytes.
   * - The result is then sent to the serializer.
   *
   * @returns The serialized public key string.
   */
  public toString(): string {
    return `${PUBLIC_KEY_PREFIX}${this.serializer.serialize(this.toBytes())}`
  }
}
