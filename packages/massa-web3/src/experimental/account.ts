import Hasher from './crypto/interfaces/hasher'
import Signer from './crypto/interfaces/signer'
import Serializer from './crypto/interfaces/serializer'
import { Versioner, Version } from './crypto/interfaces/versioner'
import Sealer from './crypto/interfaces/sealer'
import Blake3 from './crypto/blake3'
import Ed25519 from './crypto/ed25519'
import Base58 from './crypto/base58'
import VarintVersioner from './crypto/varintVersioner'
import { PasswordSeal } from './crypto/passwordSeal'

const PRIVATE_KEY_PREFIX = 'S'
const PUBLIC_KEY_PREFIX = 'P'
const ADDRESS_PREFIX = 'A'
const ADDRESS_USER_PREFIX = 'U'
const ADDRESS_CONTRACT_PREFIX = 'S'

function extractData(
  serializer: Serializer,
  versioner: Versioner,
  data: string,
  expectedVersion: Version
): Uint8Array {
  const raw: Uint8Array = serializer.deserialize(data)
  const { data: extractedData, version } = versioner.extract(raw)
  if (version !== expectedVersion) {
    throw new Error(
      `invalid version: ${version}. ${expectedVersion} was expected.`
    )
  }
  return extractedData
}

function checkPrefix(str: string, ...expected: string[]): void {
  const prefix = str.slice(0, expected[0].length)
  if (!expected.includes(prefix)) {
    throw new Error(
      `invalid prefix: ${prefix}. ${expected.length > 1 ? 'one of ' : ''}${expected.join(' or ')} was expected.`
    )
  }
}

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
  public hasher: Hasher
  public signer: Signer
  public serializer: Serializer
  public versioner: Versioner
  public bytes: Uint8Array
  public version: Version

  protected constructor(
    hash: Hasher,
    signer: Signer,
    serialization: Serializer,
    versioner: Versioner,
    version: Version
  ) {
    this.hasher = hash
    this.signer = signer
    this.serializer = serialization
    this.versioner = versioner
    this.bytes = new Uint8Array()
    this.version = version
  }

  /**
   * Initializes a new private key object from a version.
   *
   * @param version - The version of the private key. If not defined, the last version will be used.
   *
   * @returns A new private key instance.
   */
  protected static initFromVersion(version?: Version): PrivateKey {
    version = version || Version.V0
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
      checkPrefix(str, PRIVATE_KEY_PREFIX)
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

  public static fromEnv(): PrivateKey {
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
  public versionedBytes(): Uint8Array {
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
    return `${PRIVATE_KEY_PREFIX}${this.serializer.serialize(this.versionedBytes())}`
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
  public signer: Signer
  public hasher: Hasher
  public serializer: Serializer
  public versioner: Versioner
  public bytes: Uint8Array
  public version: Version

  protected constructor(
    hasher: Hasher,
    signer: Signer,
    serialization: Serializer,
    versioner: Versioner,
    version: Version
  ) {
    this.hasher = hasher
    this.signer = signer
    this.serializer = serialization
    this.versioner = versioner
    this.bytes = new Uint8Array()
    this.version = version
  }

  /**
   * Initializes a new public key object from a version.
   *
   * @param version - The version of the private key. If not defined, the last version will be used.
   *
   * @returns A new public key instance.
   *
   * @throws If the version is not supported.
   */
  protected static initFromVersion(version?: Version): PublicKey {
    version = version || Version.V0
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
      checkPrefix(str, PUBLIC_KEY_PREFIX)
      publicKey.bytes = extractData(
        publicKey.serializer,
        publicKey.versioner,
        str.slice(PUBLIC_KEY_PREFIX.length),
        publicKey.version
      )
    } catch (e) {
      throw new Error(`Invalid public key string: ${e.message}`)
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
  public versionedBytes(): Uint8Array {
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
    return `${PUBLIC_KEY_PREFIX}${this.serializer.serialize(
      this.versionedBytes()
    )}`
  }
}

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
  public serializer: Serializer
  public versioner: Versioner
  public bytes: Uint8Array
  public isEOA: boolean
  public version: Version

  protected constructor(
    serializer: Serializer,
    versioner: Versioner,
    version: Version
  ) {
    this.serializer = serializer
    this.versioner = versioner
    this.version = version
  }

  /**
   * Initialize a new address object from a version.
   *
   * @param version - The version of the address.
   *
   * @returns A new address instance.
   *
   * @throws If the version is not supported.
   */
  protected static initFromVersion(version?: Version): Address {
    version = version || Version.V0
    switch (version) {
      case Version.V0:
        return new Address(new Base58(), new VarintVersioner(), version)
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
   * Initializes a new address object from a raw byte array.
   *
   * @param bytes - The address raw bytes.
   * @param isEOA - A boolean indicating whether the address is an EOA.
   * @param version - The version of the address. If not defined, the last version will be used.
   *
   * @returns A new address object.
   */
  public static fromBytes(
    bytes: Uint8Array,
    isEOA: boolean,
    version?: Version
  ): Address {
    const address = Address.initFromVersion(version)
    address.bytes = bytes
    address.isEOA = isEOA
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
    address.bytes = publicKey.hasher.hash(publicKey.versionedBytes())
    address.isEOA = true
    return address
  }

  /**
   * Versions the address key bytes.
   *
   * @returns The versioned address key bytes.
   */
  public versionedBytes(): Uint8Array {
    return this.versioner.attach(this.version, this.bytes)
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
    return `${ADDRESS_PREFIX}${
      this.isEOA ? ADDRESS_USER_PREFIX : ADDRESS_CONTRACT_PREFIX
    }${this.serializer.serialize(this.versionedBytes())}`
  }
}

/**
 * A class representing a signature.
 */
export class Signature {
  public serializer: Serializer
  public versioner: Versioner
  public bytes: Uint8Array
  public version: Version

  protected constructor(
    serializer: Serializer,
    versioner: Versioner,
    version: Version
  ) {
    this.serializer = serializer
    this.versioner = versioner
    this.version = version
  }

  /**
   * Initializes a new signature object from a version.
   *
   * @param version - The version of the signature.
   *
   * @returns A new signature instance.
   */
  protected static initFromVersion(version?: Version): Signature {
    version = version || Version.V0
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
  public versionedBytes(): Uint8Array {
    return this.versioner.attach(this.version, this.bytes)
  }

  /**
   * Serializes the signature to a string.
   *
   * @returns The serialized signature string.
   */
  public toString(): string {
    return this.serializer.serialize(this.versionedBytes())
  }
}

/**
 * A class representing an account.
 */
export class Account {
  public sealer: Sealer

  private constructor(
    public privateKey: PrivateKey,
    public publicKey: PublicKey,
    public address: Address,
    public version: Version
  ) {}

  /**
   * Initializes a new account object from a private key.
   *
   * @param key - The private key of the account.
   * @param version - The version of the account.
   *
   * @returns A new instance of the Account class.
   */
  public static async fromPrivateKey(
    key: string | PrivateKey,
    version?: Version
  ): Promise<Account> {
    if (typeof key === 'string') {
      key = PrivateKey.fromString(key)
    }
    const publicKey = await key.getPublicKey()
    const address = publicKey.getAddress()
    version = version || Version.V1

    return new Account(key, publicKey, address, version || Version.V1)
  }

  /**
   * Generates a new account object.
   *
   * @param version - The version of the account.
   *
   * @returns A new instance of the Account class.
   */
  public static async generate(version?: Version): Promise<Account> {
    const privateKey = PrivateKey.generate()
    return Account.fromPrivateKey(privateKey, version)
  }

  /**
   * Signs a message.
   *
   * @remarks
   * This function signs a byte-encoded message with the account private key.
   * The message is first hashed and then signed.
   * Do not pass a digest to this function as it will be hashed twice.
   *
   * @param message - The byte array to sign.
   *
   * @returns A signature object.
   */
  sign(message: Uint8Array): Promise<Signature> {
    return this.privateKey.sign(message)
  }

  /**
   * Verifies a message signature.
   *
   * @remarks
   * This function verifies a byte-encoded message signature using the account's public key.
   * The message is first hashed and then the signature is verified against the hashed message.
   * Do not pass a digest to this function as it will be hashed twice.
   *
   * @param signature - The signature to verify.
   * @param message - The byte array that was signed.
   *
   * @returns A boolean indicating whether the signature is valid.
   */
  verify(message: Uint8Array, signature: Signature): Promise<boolean> {
    return this.publicKey.verify(message, signature)
  }

  /**
   * Encodes the account to a serializable object.
   *
   * @remarks
   * The serializable object can be serialized to any format (JSON, YAML, XML, etc.) on any support (file, database, browser storage, etc.).
   * The keystore format is defined in the Massa standard format document:
   * [Massa Standard Format](https://github.com/massalabs/massa-standards/blob/main/wallet/file-format.md)
   *
   * @param password - The password to encrypt the private key.
   * @param salt - The salt to use for the encryption. If not provided, a random salt will be generated.
   * @param nonce - The nonce to use for the encryption. If not provided, a random nonce will be generated.
   *
   * @returns A serializable object.
   *
   * @throws If the password is not provided for V0 and V1 keystores.
   * @throws If the version is not supported.
   */
  async toKeyStore(
    password?: string,
    salt?: Uint8Array,
    nonce?: Uint8Array
  ): Promise<AccountKeyStore> {
    switch (this.version) {
      case Version.V0: {
        if (!password) {
          throw new Error('Password is required for V0 keystore')
        }
        const passwordSeal = new PasswordSeal(password, salt, nonce)
        return {
          address: this.address.toString(),
          Version: this.version,
          nickname: '',
          salt: passwordSeal.salt,
          nonce: passwordSeal.nonce,
          cipheredData: await passwordSeal
            .seal(this.privateKey.versionedBytes())
            .then((a) => Array.from(a)),
          publicKey: Array.from(this.publicKey.versionedBytes()),
        } as AccountV0KeyStore
      }
      case Version.V1: {
        if (!password) {
          throw new Error('Password is required for V1 keystore')
        }
        const passwordSeal = new PasswordSeal(password, salt, nonce)
        return {
          Address: this.address.toString(),
          Version: this.version,
          Nickname: '',
          Salt: passwordSeal.salt,
          Nonce: passwordSeal.nonce,
          CipheredData: await passwordSeal
            .seal(this.privateKey.versionedBytes())
            .then((a) => Array.from(a)),
          PublicKey: Array.from(this.publicKey.versionedBytes()),
        } as AccountV1KeyStore
      }
      default:
        throw new Error(`Unsupported version`)
    }
  }

  /**
   * Decodes the account from a serializable object.
   *
   * @remarks
   * The serializable object can be serialized to any format (JSON, YAML, XML, etc.) on any support (file, database, browser storage, etc.).
   * The keystore format is defined in the Massa standard format document:
   * [Massa Standard Format](https://github.com/massalabs/massa-standards/blob/main/wallet/file-format.md)
   *
   * @param password - The password to decrypt the private key.
   * @param keystore - The serializable object to decode.
   *
   * @returns A new Account instance.
   *
   * @throws If the password is not provided for V0 and V1 keystores.
   * @throws If the version is not supported.
   */
  static async fromKeyStore(
    keystore: AccountKeyStore,
    password?: string
  ): Promise<Account> {
    switch (keystore.Version) {
      case Version.V0: {
        if (!password) {
          throw new Error('Password is required for V0 keystore')
        }
        const passwordSeal = new PasswordSeal(
          password,
          keystore.salt,
          keystore.nonce
        )
        const privateKeyBytes = await passwordSeal.unseal(keystore.cipheredData)
        const privateKey = PrivateKey.fromBytes(privateKeyBytes, Version.V0)
        const publicKey = PublicKey.fromBytes(
          new Uint8Array(keystore.publicKey).subarray(1),
          Version.V0
        )
        const address = publicKey.getAddress()
        // TODO: add a consistency check with the address in the keystore

        return new Account(privateKey, publicKey, address, keystore.Version)
      }
      case Version.V1: {
        if (!password) {
          throw new Error('Password is required for V1 keystore')
        }
        const passwordSeal = new PasswordSeal(
          password,
          keystore.Salt,
          keystore.Nonce
        )
        // TODO remove varint prefix
        const privateKeyBytes = await passwordSeal.unseal(keystore.CipheredData)
        const varintVersioner = new VarintVersioner()
        const { data: bytes, version: numberVersion } =
          varintVersioner.extract(privateKeyBytes)
        // Value number to version variant
        const version = numberVersion as Version
        const privateKey = PrivateKey.fromBytes(bytes, version)
        const publicKey = PublicKey.fromBytes(
          new Uint8Array(keystore.PublicKey).subarray(1),
          Version.V0
        )
        const address = publicKey.getAddress()
        // TODO: add a consistency check with the address in the keystore
        return new Account(privateKey, publicKey, address, keystore.Version)
      }
      default:
        throw new Error(`Unsupported version`)
    }
  }

  /**
   * Uses the environment variables to create an account.
   *
   * @remarks
   * The following variables are required:
   * - PRIVATE_KEY: The private key of the account.
   *
   * @returns An account instance.
   */
  static async fromEnv(): Promise<Account> {
    const pk = process.env.PRIVATE_KEY
    if (!pk) {
      throw new Error('PRIVATE_KEY environment variable is required.')
    }

    const privateKey = PrivateKey.fromString(process.env.PRIVATE_KEY)
    return Account.fromPrivateKey(privateKey)
  }
}

type AccountKeyStore = AccountV0KeyStore | AccountV1KeyStore

export interface AccountV0KeyStore {
  address: string
  Version: Version.V0
  nickname: string
  salt: Uint8Array
  nonce: Uint8Array
  cipheredData: Uint8Array
  publicKey: number[]
}

export interface AccountV1KeyStore {
  Address: string
  Version: Version.V1
  Nickname: string
  Salt: Uint8Array
  Nonce: Uint8Array
  CipheredData: Uint8Array
  PublicKey: number[]
}
