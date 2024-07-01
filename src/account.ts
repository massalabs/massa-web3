import { Version } from './crypto/interfaces/versioner'
import Sealer from './crypto/interfaces/sealer'
import { PasswordSeal } from './crypto/passwordSeal'
import { Address, PrivateKey, PublicKey, Signature } from './basicElements'
import { readFileSync, existsSync } from 'fs'
import yaml from 'js-yaml'

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

        /* eslint-disable @typescript-eslint/naming-convention */
        // It is mandatory to follow the Massa standard.
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
        } as AccountV0KeyStore
        /* eslint-enable @typescript-eslint/naming-convention */
      }
      case Version.V1: {
        if (!password) {
          throw new Error('Password is required for V1 keystore')
        }
        const passwordSeal = new PasswordSeal(password, salt, nonce)

        /* eslint-disable @typescript-eslint/naming-convention */
        // It is mandatory to follow the Massa standard.
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
        /* eslint-enable @typescript-eslint/naming-convention */
      }
      default:
        throw new Error(`unsupported version`)
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
          keystore.Salt,
          keystore.Nonce
        )
        const privateKeyBytes = await passwordSeal.unseal(keystore.CipheredData)
        const privateKey = PrivateKey.fromBytes(privateKeyBytes)
        const publicKey = PublicKey.fromBytes(
          Uint8Array.from(keystore.PublicKey)
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

        const privateKey = PrivateKey.fromBytes(privateKeyBytes)
        const publicKey = PublicKey.fromBytes(
          Uint8Array.from(keystore.PublicKey)
        )
        const address = publicKey.getAddress()
        // TODO: add a consistency check with the address in the keystore
        return new Account(privateKey, publicKey, address, keystore.Version)
      }
      default:
        throw new Error(`unsupported version`)
    }
  }

  /**
   * Uses the environment variables to create an account.
   *
   * @param key - The environment variable key containing the private key.
   *
   * @remarks
   * The `PRIVATE_KEY` or the provided key is required in the environment variables.
   *
   * @returns An account instance.
   */
  static async fromEnv(key?: string): Promise<Account> {
    return Account.fromPrivateKey(PrivateKey.fromEnv(key))
  }

  /**
   * Uses the environment variables to create an account.
   *
   * @returns An account instance.
   */
  static async fromYaml(path: string, password: string): Promise<Account> {
    // check that file exists
    if (!existsSync(path)) {
      throw new Error(`wallet file "${path}" does not exist.`)
    }

    const ks = yaml.load(readFileSync(path, 'utf8')) as AccountKeyStore
    return Account.fromKeyStore(ks, password)
  }
}

/* eslint-disable @typescript-eslint/naming-convention */
// It is mandatory to follow the Massa standard.
export type AccountKeyStoreBase = {
  Address: string
  Nickname: string
  Salt: Uint8Array
  Nonce: Uint8Array
  CipheredData: Uint8Array
  PublicKey: number[]
}

export type AccountV0KeyStore = AccountKeyStoreBase & { Version: Version.V0 }
export type AccountV1KeyStore = AccountKeyStoreBase & { Version: Version.V1 }
/* eslint-enable @typescript-eslint/naming-convention */
export type AccountKeyStore = AccountV0KeyStore | AccountV1KeyStore
