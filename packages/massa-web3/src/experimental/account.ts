import { Version } from './crypto/interfaces/versioner'
import Sealer from './crypto/interfaces/sealer'
import VarintVersioner from './crypto/varintVersioner'
import { PasswordSeal } from './crypto/passwordSeal'
import { Address, PrivateKey, PublicKey, Signature } from './basicElements'

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
    version: Version = Version.V1
  ): Promise<Account> {
    if (typeof key === 'string') {
      key = PrivateKey.fromString(key)
    }
    const publicKey = await key.getPublicKey()
    const address = publicKey.getAddress()

    return new Account(key, publicKey, address, version)
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
            .seal(this.privateKey.toBytes())
            .then((a) => Array.from(a)),
          publicKey: Array.from(this.publicKey.toBytes()),
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
            .seal(this.privateKey.toBytes())
            .then((a) => Array.from(a)),
          PublicKey: Array.from(this.publicKey.toBytes()),
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

        const privateKeyBytes = await passwordSeal.unseal(keystore.CipheredData)
        const varintVersioner = new VarintVersioner()
        const { data: bytes, version: numberVersion } =
          varintVersioner.extract(privateKeyBytes)

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
   * @returns An account instance.
   */
  static async fromEnv(): Promise<Account> {
    return Account.fromPrivateKey(PrivateKey.fromEnv())
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
