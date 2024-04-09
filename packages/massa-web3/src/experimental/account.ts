import Hash from './interfaces/hash'
import Crypto from './interfaces/crypto'
import blake3 from './blake3'
import ed25519 from './ed25519'
import Serialization from './interfaces/serialization'
import base58 from './base58'
import { varintDecode, varintEncode } from '../utils/Xbqcrypto'
import Seal from './interfaces/seal'
import { PasswordSeal } from './passwordSeal'

const PRIVATE_KEY_PREFIX = 'S'
const PUBLIC_KEY_PREFIX = 'P'
const ADDRESS_PREFIX = 'A'
const ADDRESS_USER_PREFIX = 'U'
const ADDRESS_CONTRACT_PREFIX = 'S'

export enum Version {
  V0 = 0,
}

export class PrivateKey {
  private hash: Hash
  private crypto: Crypto
  private serialization: Serialization
  public bytes: Uint8Array
  public version: Version

  protected constructor(
    hash: Hash,
    crypto: Crypto,
    serialization: Serialization,
    version: Version
  ) {
    this.hash = hash
    this.crypto = crypto
    this.serialization = serialization
    this.bytes = new Uint8Array()
    this.version = version
  }

  /**
   * Initialize a new private key object from a version.
   * @param version - The version of the private key.
   *
   * @returns A new private key object.
   */
  protected static initFromVersion(version: Version): PrivateKey {
    switch (version) {
      case Version.V0:
        return new PrivateKey(
          new blake3(),
          new ed25519(),
          new base58(),
          version
        )
      default:
        throw new Error(`Unsupported version: ${version}`)
    }
  }

  /**
   * Initialize a new private key object from a base58 encoded string.
   * @param privateKeyBase58Encoded - The base58 encoded string representing the private key.
   * @param version - The version of the private key, default is 0.
   *
   * @returns A new private key object.
   */
  public static fromString(
    privateKeyBase58Encoded: string,
    version?: Version
  ): PrivateKey {
    const prefix = privateKeyBase58Encoded.slice(0, PRIVATE_KEY_PREFIX.length)

    if (!(prefix == PRIVATE_KEY_PREFIX)) {
      throw new Error(
        `Invalid private key prefix: "${prefix}". The private key should start with "${PRIVATE_KEY_PREFIX}". Please verify your private key and try again.`
      )
    }
    const privateKey = PrivateKey.initFromVersion(version || Version.V0)
    const privateKeyBase58Decoded: Uint8Array =
      privateKey.serialization.decodeFromString(
        privateKeyBase58Encoded.slice(PRIVATE_KEY_PREFIX.length)
      )
    const { value, bytes } = varintDecode(privateKeyBase58Decoded)
    if (value !== privateKey.version) {
      throw new Error(
        `Invalid private key version: ${value}. The private key version should be ${privateKey.version}. Please verify your private key and try again.`
      )
    }
    privateKey.bytes = privateKeyBase58Decoded.subarray(bytes)
    return privateKey
  }

  /**
   * Initialize a new private key object from a raw byte array and a version.
   * @param bytes - The raw byte array representing the private key.
   * @param version - The version of the private key.
   *
   * @returns A new private key object.
   */
  public static fromBytes(bytes: Uint8Array, version: Version): PrivateKey {
    const privateKey = PrivateKey.initFromVersion(version)
    privateKey.bytes = bytes
    return privateKey
  }

  /**
   * Initialize a random private key.
   * @param version - The version of the private key.
   *
   * @returns A new private key object.
   */
  public static generate(version?: Version): PrivateKey {
    const privateKey = PrivateKey.initFromVersion(version || Version.V0)
    privateKey.bytes = privateKey.crypto.generatePrivateKey()
    return privateKey
  }

  /**
   * Get the public key from the private key.
   *
   * @returns A new public key object.
   */
  public async getPublicKey(): Promise<PublicKey> {
    const publicKeyArray: Uint8Array = await this.crypto.getPublicKey(
      this.bytes
    )
    return PublicKey.fromBytes(publicKeyArray, this.version)
  }

  /**
   * Sign a byte array with the private key.
   * @param message - The byte array to sign.
   * @param preHashed - A boolean indicating whether the message is already hashed.
   *
   * @returns The signature byte array.
   */
  public async sign(
    message: Uint8Array,
    preHashed?: boolean
  ): Promise<Signature> {
    const hash: Uint8Array = preHashed ? message : this.hash.hash(message)
    return Signature.fromBytes(
      await this.crypto.sign(this.bytes, hash),
      this.version
    )
  }
}

export class PublicKey {
  public crypto: Crypto
  public hash: Hash
  public serialization: Serialization
  public bytes: Uint8Array
  public version: Version

  protected constructor(
    hash: Hash,
    crypto: Crypto,
    serialization: Serialization,
    version: Version
  ) {
    this.hash = hash
    this.crypto = crypto
    this.serialization = serialization
    this.bytes = new Uint8Array()
    this.version = version
  }

  /**
   * Initialize a new public key object from a version.
   * @param version - The version of the public key.
   *
   * @returns A new public key object.
   * */
  protected static initFromVersion(version: Version): PublicKey {
    switch (version) {
      case Version.V0:
        return new PublicKey(new blake3(), new ed25519(), new base58(), version)
      default:
        throw new Error(`Unsupported version: ${version}`)
    }
  }

  /**
   * Initialize a new public key object from a base58 encoded string.
   * @param publicKeyBase58Encoded - The base58 encoded string representing the public key.
   * @param version - The version of the public key.
   *
   * @returns A new public key object.
   */
  public static fromString(
    publicKeyBase58Encoded: string,
    version?: Version
  ): PublicKey {
    const prefix = publicKeyBase58Encoded.slice(0, PUBLIC_KEY_PREFIX.length)

    if (!(prefix == PUBLIC_KEY_PREFIX)) {
      throw new Error(
        `Invalid public key prefix: "${prefix}". The public key should start with "${PUBLIC_KEY_PREFIX}". Please verify your public key and try again.`
      )
    }
    const publicKey = PublicKey.initFromVersion(version || Version.V0)
    const publicKeyBase58Decoded = publicKey.serialization.decodeFromString(
      publicKeyBase58Encoded.slice(PUBLIC_KEY_PREFIX.length)
    )
    const { value, bytes } = varintDecode(publicKeyBase58Decoded)
    if (value !== publicKey.version) {
      throw new Error(
        `Invalid public key version: ${value}. The public key version should be ${publicKey.version}. Please verify your public key and try again.`
      )
    }
    publicKey.bytes = publicKeyBase58Decoded.subarray(bytes)
    return publicKey
  }

  /**
   * Initialize a new public key from a raw byte array and a version.
   * @param bytes - The raw byte array representing the public key.
   * @param version - The version of the public key.
   *
   * @returns A new public key object.
   */
  public static fromBytes(bytes: Uint8Array, version: Version): PublicKey {
    const publicKey = PublicKey.initFromVersion(version)
    publicKey.bytes = bytes
    return publicKey
  }

  /**
   * Get an address from the public key.
   *
   * @returns A new address object.
   */
  public getAddress(): Address {
    return Address.fromBytes(this.hash.hash(this.bytes), true, this.version)
  }

  /**
   * Verify a signature with the public key.
   * @param signature - The signature to verify.
   * @param data - The data signed by the signature.
   * @param preHashed - A boolean indicating whether the data is already hashed.
   *
   * @returns A boolean indicating whether the signature is valid.
   */
  public async verify(
    signature: Signature,
    data: Uint8Array,
    preHashed?: boolean
  ): Promise<boolean> {
    const hash: Uint8Array = preHashed ? data : this.hash.hash(data)
    return await this.crypto.verify(this.bytes, hash, signature.bytes)
  }
}

export class Address {
  public bytes: Uint8Array
  public isEOA: boolean
  public version: Version
  private serialization: Serialization

  protected constructor(serialization: Serialization, version: Version) {
    this.serialization = serialization
    this.version = version
  }

  /**
   * Initialize a new address object from a version.
   * @param version - The version of the address.
   *
   * @returns A new address object.
   */
  protected static initFromVersion(version: Version): Address {
    switch (version) {
      case Version.V0:
        return new Address(new base58(), version)
      default:
        throw new Error(`Unsupported version: ${version}`)
    }
  }

  /**
   * Initialize a new address object from a base58 encoded string.
   * @param addressBase58Encoded - The base58 encoded string representing the address.
   * @param version - The version of the address.
   *
   * @returns A new address object.
   */
  public static fromString(
    addressBase58Encoded: string,
    version?: Version
  ): Address {
    const prefix = addressBase58Encoded.slice(0, ADDRESS_PREFIX.length)

    if (!(prefix == ADDRESS_PREFIX)) {
      throw new Error(
        `Invalid address prefix: "${prefix}". The address should start with "${ADDRESS_PREFIX}". Please verify your address and try again.`
      )
    }
    const address = Address.initFromVersion(version || Version.V0)

    switch (addressBase58Encoded[ADDRESS_PREFIX.length]) {
      case ADDRESS_USER_PREFIX:
        address.isEOA = true
        break
      case ADDRESS_CONTRACT_PREFIX:
        address.isEOA = false
        break
      default:
        throw new Error(
          `Invalid address prefix: "${addressBase58Encoded[ADDRESS_PREFIX.length]}". 
          The address should start with "${ADDRESS_PREFIX}U" for EOA or "${ADDRESS_PREFIX}S" for smart contract. 
          Please verify your address and try again.`
        )
    }

    const addressBase58Decoded = address.serialization.decodeFromString(
      addressBase58Encoded.slice(ADDRESS_PREFIX.length)
    )
    const { value, bytes } = varintDecode(addressBase58Decoded)
    if (value !== address.version) {
      throw new Error(
        `Invalid address version: ${value}. The address version should be ${address.version}. Please verify your address and try again.`
      )
    }
    address.bytes = addressBase58Decoded.subarray(bytes)
    return address
  }

  /**
   * Initialize a new address object from a raw byte array, a boolean indicating whether the address is an EOA, and a version.
   * @param bytes - The raw byte array representing the address.
   * @param isEOA - A boolean indicating whether the address is an EOA.
   * @param version - The version of the address.
   *
   * @returns A new address object.
   */
  public static fromBytes(
    bytes: Uint8Array,
    isEOA: boolean,
    version: Version
  ): Address {
    const address = Address.initFromVersion(version)
    address.bytes = bytes
    address.isEOA = isEOA
    return address
  }

  /**
   * Encode the address to a string
   *
   * @returns The encoded string representing the address.
   */
  toString(): string {
    const versionBytes = varintEncode(this.version)
    return `${ADDRESS_PREFIX}${
      this.isEOA ? ADDRESS_USER_PREFIX : ADDRESS_CONTRACT_PREFIX
    }${this.serialization.encodeToString(
      new Uint8Array([...versionBytes, ...this.bytes])
    )}`
  }
}

export class Signature {
  public bytes: Uint8Array
  public version: Version
  private serialization: Serialization

  protected constructor(serialization: Serialization, version: Version) {
    this.version = version
    this.serialization = serialization
  }

  /**
   * Initialize a new signature object from a version.
   * @param version - The version of the signature.
   *
   * @returns A new signature object.
   */
  protected static initFromVersion(version: Version): Signature {
    switch (version) {
      case Version.V0:
        return new Signature(new base58(), version)
      default:
        throw new Error(`Unsupported version: ${version}`)
    }
  }

  /**
   * Initialize a new signature object from a base58 encoded string.
   * @param signatureBase58Encoded - The base58 encoded string representing the signature.
   *
   * @returns A new signature object.
   */
  public static fromString(signatureBase58Encoded: string): Signature {
    const signature = Signature.initFromVersion(Version.V0)
    const signatureBase58Decoded = signature.serialization.decodeFromString(
      signatureBase58Encoded
    )
    const { value, bytes } = varintDecode(signatureBase58Decoded)
    if (value !== signature.version) {
      throw new Error(
        `Invalid signature version: ${value}. The signature version should be ${signature.version}. Please verify your signature and try again.`
      )
    }
    signature.bytes = signatureBase58Decoded.subarray(bytes)
    return signature
  }

  /**
   * Initialize a new signature object from a raw byte array and a version.
   * @param bytes - The raw byte array representing the signature.
   * @param version - The version of the signature.
   *
   * @returns A new signature object.
   */
  public static fromBytes(bytes: Uint8Array, version: Version): Signature {
    const signature = Signature.initFromVersion(version)
    signature.bytes = bytes
    return signature
  }
}

export class Account {
  public address: Address
  private privateKey: PrivateKey
  public publicKey: PublicKey
  public version: Version

  private constructor(
    privateKey: PrivateKey,
    publicKey: PublicKey,
    address: Address,
    version?: Version
  ) {
    this.privateKey = privateKey
    this.publicKey = publicKey
    this.address = address
    this.version = version || Version.V0
  }

  /**
   * Initialize a new account object with a private key.
   * @param privateKey - The private key of the account.
   * @param version - The version of the account.
   *
   * @returns A new account object.
   */
  public static async fromPrivateKey(
    privateKey: string | PrivateKey,
    version?: Version
  ): Promise<Account> {
    if (typeof privateKey === 'string') {
      privateKey = PrivateKey.fromString(privateKey)
    }
    const publicKey = await privateKey.getPublicKey()
    const address = publicKey.getAddress()
    return new Account(privateKey, publicKey, address, version)
  }

  /**
   * Initialize a new account object with a newly generated private key.
   * @param privateKey - The private key of the account.
   * @param version - The version of the account.
   *
   * @returns A new account object.
   */
  public static async generate(version?: Version): Promise<Account> {
    const privateKey = PrivateKey.generate(version)
    return Account.fromPrivateKey(privateKey, version)
  }

  /**
   * Sign a message with the account's private key.
   * @param message - The message to sign.
   * @param preHashed - A boolean indicating whether the message is already hashed.
   */
  sign(message: Uint8Array, preHashed?: boolean): Promise<Signature> {
    return this.privateKey.sign(message, preHashed)
  }

  /**
   * Verify a signature with the account's public key.
   * @param signature - The signature to verify.
   * @param message - The message signed by the signature.
   * @param preHashed - A boolean indicating whether the message is already hashed.
   */
  verify(
    signature: Signature,
    message: Uint8Array,
    preHashed?: boolean
  ): Promise<boolean> {
    return this.publicKey.verify(signature, message, preHashed)
  }

  /**
   * Return a sealed private key.
   * @param seal - The seal object to seal the private key.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async seal(seal: Seal): Promise<any> {
    return seal.seal(this.privateKey.bytes)
  }

  /**
   * Unseal a sealed private key.
   * @param sealedPrivateKey - The sealed private key to unseal.
   * @param seal - The seal object to unseal the private key.
   * @param version - The version of the private key by default is 0.
   */
  static async unseal(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    sealedPrivateKey: any,
    seal: Seal,
    version?: Version
  ): Promise<Account> {
    const privateKeyBytes = await seal.unseal(sealedPrivateKey)
    return Account.fromPrivateKey(
      PrivateKey.fromBytes(privateKeyBytes, version || Version.V0)
    )
  }

  /**
   * Encode the account to a keystore object following the Massa standard format
   * https://github.com/massalabs/massa-standards/blob/main/wallet/file-format.md
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async toKeyStore(password: string): Promise<any> {
    switch (this.version) {
      case Version.V0: {
        const passwordSeal = new PasswordSeal(password)
        const privateKeySealed = await passwordSeal.seal(this.privateKey.bytes)
        return {
          address: this.address.toString(),
          version: this.version.toString(),
          nickname: '',
          salt: privateKeySealed.salt,
          nonce: privateKeySealed.nonce,
          cipheredData: privateKeySealed.data,
          publicKey: new Uint8Array([
            ...varintEncode(this.publicKey.version),
            ...this.publicKey.bytes,
          ]),
        }
      }
      default:
        throw new Error(`Unsupported version: ${this.version}`)
    }
  }

  /**
   * Decode a keystore object following the Massa standard format
   * https://github.com/massalabs/massa-standards/blob/main/wallet/file-format.md
   * @param keystore - The keystore object to decode.
   * @param password - The password to unseal the private key.
   *
   * @returns A new account object.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static async fromKeyStore(keystore: any, password: string): Promise<Account> {
    const version = parseInt(keystore.version)
    switch (version) {
      case Version.V0: {
        const passwordSeal = new PasswordSeal(password, {
          salt: keystore.salt,
          nonce: keystore.nonce,
        })
        const privateKeyBytes = await passwordSeal.unseal({
          data: keystore.cipheredData,
          salt: keystore.salt,
          nonce: keystore.nonce,
        })
        const privateKey = PrivateKey.fromBytes(privateKeyBytes, version)
        const publicKey = PublicKey.fromBytes(
          keystore.publicKey.subarray(1),
          version
        )
        const address = publicKey.getAddress()
        return new Account(privateKey, publicKey, address, version)
      }
      default:
        throw new Error(`Unsupported version: ${version}`)
    }
  }
}
