import * as ed from '@noble/ed25519'
import { base58Decode, hashBlake3, varintDecode } from '../utils/Xbqcrypto'

const SECRET_KEY_PREFIX = 'S'
const PUBLIC_KEY_PREFIX = 'P'
const ADDRESS_PREFIX = 'A'
const ADDRESS_USER_PREFIX = 'U'
const ADDRESS_CONTRACT_PREFIX = 'S'

export enum Version {
  V0 = 0,
}

export class SecretKey {
  private bytes: Uint8Array
  public version: Version

  private constructor(bytes: Uint8Array, version: Version) {
    this.bytes = bytes
    this.version = version
  }

  /**
   * Initialize a new secret key object from a base58 encoded string.
   * @param secretKeyBase58Encoded - The base58 encoded string representing the secret key.
   *
   * @returns A new secret key object.
   */
  public static fromString(secretKeyBase58Encoded: string): SecretKey {
    const prefix = secretKeyBase58Encoded.slice(0, SECRET_KEY_PREFIX.length)

    if (!(prefix == SECRET_KEY_PREFIX)) {
      throw new Error(
        `Invalid secret key prefix: "${prefix}". The secret key should start with "${SECRET_KEY_PREFIX}". Please verify your secret key and try again.`
      )
    }
    const secretKeyBase58Decoded: Buffer = base58Decode(
      secretKeyBase58Encoded.slice(SECRET_KEY_PREFIX.length)
    )
    const { value, bytes } = varintDecode(secretKeyBase58Decoded)
    return new SecretKey(
      secretKeyBase58Decoded.subarray(bytes),
      value as Version
    )
  }

  /**
   * Initialize a new secret key object from a raw byte array and a version.
   * @param bytes - The raw byte array representing the secret key.
   * @param version - The version of the secret key.
   *
   * @returns A new secret key object.
   */
  public static fromBytes(bytes: Uint8Array, version: Version): SecretKey {
    return new SecretKey(bytes, version)
  }

  /**
   * Initialize a random secret key.
   * @param version - The version of the secret key.
   *
   * @returns A new secret key object.
   */
  public static generate(version?: Version): SecretKey {
    const secretKeyArray: Uint8Array = ed.utils.randomPrivateKey()
    return new SecretKey(secretKeyArray, version || Version.V0)
  }

  /**
   * Get the public key from the secret key.
   */
  public async getPublicKey(): Promise<PublicKey> {
    const publicKeyArray: Uint8Array = await ed.getPublicKey(this.bytes)
    return PublicKey.fromBytes(publicKeyArray, this.version)
  }

  /**
   * Sign a byte array with the secret key.
   * @param message - The byte array to sign.
   * @param preHashed - A boolean indicating whether the message is already hashed.
   *
   * @returns The signature byte array.
   */
  public async sign(
    message: Uint8Array,
    preHashed?: boolean
  ): Promise<Signature> {
    const hash: Uint8Array = preHashed ? message : hashBlake3(message)
    return Signature.fromBytes(await ed.sign(hash, this.bytes), this.version)
  }
}

export class PublicKey {
  public bytes: Uint8Array
  public version: Version

  private constructor(bytes: Uint8Array, version: Version) {
    this.bytes = bytes
    this.version = version
  }

  /**
   * Initialize a new public key object from a base58 encoded string.
   * @param publicKeyBase58Encoded - The base58 encoded string representing the public key.
   *
   * @returns A new public key object.
   */
  public static fromString(publicKeyBase58Encoded: string): PublicKey {
    const prefix = publicKeyBase58Encoded.slice(0, PUBLIC_KEY_PREFIX.length)

    if (!(prefix == PUBLIC_KEY_PREFIX)) {
      throw new Error(
        `Invalid public key prefix: "${prefix}". The public key should start with "${PUBLIC_KEY_PREFIX}". Please verify your public key and try again.`
      )
    }

    const publicKeyBase58Decoded: Buffer = base58Decode(
      publicKeyBase58Encoded.slice(PUBLIC_KEY_PREFIX.length)
    )
    const { value, bytes } = varintDecode(publicKeyBase58Decoded)
    return new PublicKey(
      publicKeyBase58Decoded.subarray(bytes),
      value as Version
    )
  }

  /**
   * Initialize a new public key from a raw byte array and a version.
   * @param bytes - The raw byte array representing the public key.
   * @param version - The version of the public key.
   *
   * @returns A new public key object.
   */
  public static fromBytes(bytes: Uint8Array, version: Version): PublicKey {
    return new PublicKey(bytes, version)
  }

  /**
   * Get an address from the public key.
   *
   * @returns A new address object.
   */
  public getAddress(): Address {
    return Address.fromBytes(hashBlake3(this.bytes), true, this.version)
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
    const hash: Uint8Array = preHashed ? data : hashBlake3(data)
    return await ed.verify(signature.bytes, hash, this.bytes)
  }
}

export class Address {
  public bytes: Uint8Array
  public isEOA: boolean
  public version: Version

  private constructor(bytes: Uint8Array, isEOA: boolean, version: Version) {
    this.bytes = bytes
    this.isEOA = isEOA
    this.version = version
  }

  /**
   * Initialize a new address object from a base58 encoded string.
   * @param addressBase58Encoded - The base58 encoded string representing the address.
   *
   * @returns A new address object.
   */
  public static fromString(addressBase58Encoded: string): Address {
    const prefix = addressBase58Encoded.slice(0, ADDRESS_PREFIX.length)

    if (!(prefix == ADDRESS_PREFIX)) {
      throw new Error(
        `Invalid address prefix: "${prefix}". The address should start with "${ADDRESS_PREFIX}". Please verify your address and try again.`
      )
    }

    let isEOA: boolean
    switch (addressBase58Encoded[ADDRESS_PREFIX.length]) {
      case ADDRESS_USER_PREFIX:
        isEOA = true
        break
      case ADDRESS_CONTRACT_PREFIX:
        isEOA = false
        break
      default:
        throw new Error(
          `Invalid address prefix: "${addressBase58Encoded[ADDRESS_PREFIX.length]}". 
          The address should start with "${ADDRESS_PREFIX}U" for EOA or "${ADDRESS_PREFIX}S" for smart contract. 
          Please verify your address and try again.`
        )
    }

    const addressBase58Decoded: Buffer = base58Decode(
      addressBase58Encoded.slice(ADDRESS_PREFIX.length)
    )
    const { value, bytes } = varintDecode(addressBase58Decoded)
    return new Address(
      addressBase58Decoded.subarray(bytes),
      isEOA,
      value as Version
    )
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
    return new Address(bytes, isEOA, version)
  }
}

export class Signature {
  public bytes: Uint8Array
  public version: Version

  private constructor(bytes: Uint8Array, version: Version) {
    this.bytes = bytes
    this.version = version
  }

  /**
   * Initialize a new signature object from a base58 encoded string.
   * @param signatureBase58Encoded - The base58 encoded string representing the signature.
   *
   * @returns A new signature object.
   */
  public static fromString(signatureBase58Encoded: string): Signature {
    const signatureBase58Decoded: Buffer = base58Decode(signatureBase58Encoded)
    const { value, bytes } = varintDecode(signatureBase58Decoded)
    return new Signature(
      signatureBase58Decoded.subarray(bytes),
      value as Version
    )
  }

  /**
   * Initialize a new signature object from a raw byte array and a version.
   * @param bytes - The raw byte array representing the signature.
   * @param version - The version of the signature.
   *
   * @returns A new signature object.
   */
  public static fromBytes(bytes: Uint8Array, version: Version): Signature {
    return new Signature(bytes, version)
  }
}

export class Account {
  public address: Address
  private secretKey: SecretKey
  public publicKey: PublicKey
  public version: Version

  private constructor(
    secretKey: SecretKey,
    publicKey: PublicKey,
    address: Address,
    version?: Version
  ) {
    this.secretKey = secretKey
    this.publicKey = publicKey
    this.address = address
    this.version = version || Version.V0
  }

  /**
   * Initialize a new account object with a secret key.
   * @param secretKey - The secret key of the account.
   * @param version - The version of the account.
   *
   * @returns A new account object.
   */
  public static async fromSecretKey(
    secretKey: string | SecretKey,
    version?: Version
  ): Promise<Account> {
    if (typeof secretKey === 'string') {
      secretKey = SecretKey.fromString(secretKey)
    }
    const publicKey = await secretKey.getPublicKey()
    const address = publicKey.getAddress()
    return new Account(secretKey, publicKey, address, version)
  }

  /**
   * Initialize a new account object with a newly generated secret key.
   * @param secretKey - The secret key of the account.
   * @param version - The version of the account.
   *
   * @returns A new account object.
   */
  public static async generate(version?: Version): Promise<Account> {
    const secretKey = SecretKey.generate(version)
    return Account.fromSecretKey(secretKey, version)
  }

  /**
   * Sign a message with the account's secret key.
   * @param message - The message to sign.
   * @param preHashed - A boolean indicating whether the message is already hashed.
   */
  sign(message: Uint8Array, preHashed?: boolean): Promise<Signature> {
    return this.secretKey.sign(message, preHashed)
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
}
