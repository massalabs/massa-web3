import Sealer from './interfaces/sealer'
import randomUint8Array from 'secure-random'

import {
  PBKDF2Options,
  aesGCMDecrypt,
  aesGCMEncrypt,
  pbkdf2,
} from './cross-browser'

function createKey(password: string, salt: Buffer): Promise<Uint8Array> {
  const opts: PBKDF2Options = {
    iterations: 600000,
    keyLength: 32,
    hash: 'SHA-256',
  }
  return pbkdf2(password, salt, opts)
}

/**
 * Password-based implementation of the Sealer interface.
 */
export class PasswordSeal implements Sealer {
  private password: string
  public salt: Uint8Array
  public nonce: Uint8Array

  constructor(password: string, salt?: Uint8Array, nonce?: Uint8Array) {
    if (salt === undefined) {
      this.salt = randomUint8Array(16)
    } else if (salt.length !== 16) {
      throw new Error('Salt must be 16 bytes')
    } else {
      this.salt = salt
    }

    if (nonce === undefined) {
      this.nonce = randomUint8Array(12)
    } else if (nonce.length !== 12) {
      throw new Error('Nonce must be 12 bytes')
    } else {
      this.nonce = nonce
    }

    this.password = password
  }

  private validate(): void {
    if (!this.salt || this.salt.length !== 16) {
      throw new Error('Salt must be 16 bytes')
    }
    if (!this.nonce || this.nonce.length !== 12) {
      throw new Error('Nonce must be 12 bytes')
    }
  }

  /**
   * Seals data using password-based PKDF2 AES-256-GCM encryption.
   *
   * @param data - The data to encrypt.
   *
   * @returns Protected data.
   */
  async seal(data: Uint8Array): Promise<Uint8Array> {
    this.validate()
    const key = await createKey(this.password, Buffer.from(this.salt))
    return aesGCMEncrypt(data, key, Buffer.from(this.nonce))
  }

  /**
   * Unseals data using password-based PKDF2 AES-256-GCM decryption.
   *
   * @param data - The encrypted data.
   *
   * @returns Clear data.
   */
  async unseal(data: Uint8Array): Promise<Uint8Array> {
    this.validate()
    const key = await createKey(this.password, Buffer.from(this.salt))
    return aesGCMDecrypt(data, key, Buffer.from(this.nonce))
  }

  /**
   * Creates a Sealer from environment variables.
   *
   * @remarks
   * The expected envrionment variables are:
   * - PASSWORD,
   * - SALT - base64 encoded, and
   * - NONCE - base64 encoded.
   *
   * @returns A password-based sealer instance.
   */
  static fromEnv(): Sealer {
    const pwd = process.env.PASSWORD
    if (!pwd) {
      throw new Error('Missing PASSWORD environment variable')
    }
    const salt = process.env.SALT
      ? Uint8Array.from(Buffer.from(process.env.SALT, 'base64'))
      : undefined
    if (!salt) {
      throw new Error('Missing base64 encoded SALT in .env file')
    }
    const nonce = process.env.NONCE
      ? Uint8Array.from(Buffer.from(process.env.NONCE, 'base64'))
      : undefined
    if (!nonce) {
      throw new Error('Missing base64 encoded NONCE in .env file')
    }
    return new PasswordSeal(pwd, salt, nonce)
  }
}
