import { pbkdf2Sync } from 'pbkdf2'
import Seal from './interfaces/seal'
import { createCipheriv, createDecipheriv } from 'crypto'
export type PasswordSealOpts = {
  salt?: Uint8Array
  nonce?: Uint8Array
}

export type PasswordSealedData = {
  data: Uint8Array
  salt: Uint8Array
  nonce: Uint8Array
}

export class PasswordSeal implements Seal {
  // TODO: Make a real password hashing function
  private password: string
  private salt: Uint8Array
  private nonce: Uint8Array

  constructor(password: string, opts?: PasswordSealOpts) {
    this.password = password
    if (opts?.salt && opts.salt.length !== 16) {
      throw new Error('Salt must be 16 bytes')
    }
    this.salt = opts?.salt || new Uint8Array(0)
    if (opts?.nonce && opts.nonce.length !== 12) {
      throw new Error('Nonce must be 12 bytes')
    }
    this.nonce = opts?.nonce || new Uint8Array(0)
  }

  async seal(data: Uint8Array): Promise<PasswordSealedData> {
    if (this.salt.length === 0) {
      this.salt = new Uint8Array(16)
      crypto.getRandomValues(this.salt)
    }
    if (this.nonce.length === 0) {
      this.nonce = new Uint8Array(12)
      crypto.getRandomValues(this.nonce)
    }
    const key = pbkdf2Sync(this.password, this.salt, 600000, 32)
    const cipher = createCipheriv('aes-256-gcm', key, this.nonce)
    const encrypted = Buffer.concat([cipher.update(data), cipher.final()])
    const tag = cipher.getAuthTag()
    const fullEncrypted = Buffer.concat([encrypted, tag])
    return {
      data: fullEncrypted,
      salt: this.salt,
      nonce: this.nonce,
    }
  }

  async unseal(data: PasswordSealedData): Promise<Uint8Array> {
    const key = pbkdf2Sync(this.password, data.salt, 600000, 32)
    const tag = data.data.slice(data.data.length - 16)
    const encrypted = data.data.slice(0, data.data.length - 16)
    const decipher = createDecipheriv('aes-256-gcm', key, data.nonce)
    decipher.setAuthTag(tag)
    const decrypted = Buffer.concat([
      decipher.update(encrypted),
      decipher.final(),
    ])
    return new Uint8Array(decrypted)
  }
}
