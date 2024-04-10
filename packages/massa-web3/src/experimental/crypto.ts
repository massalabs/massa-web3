function isNode(): boolean {
  // inspired from secure-random.js
  // we check for process.pid to prevent browserify from tricking us
  return (
    typeof process !== 'undefined' &&
    typeof process.pid === 'number' &&
    typeof process.versions?.node === 'string'
  )
}

export interface PBKDF2Options {
  iterations: number
  keyLength: number
  hash: string
}

async function pbkdf2Node(
  password: string,
  salt: Buffer,
  opts: PBKDF2Options
): Promise<Uint8Array> {
  const { iterations, keyLength, hash } = opts
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  const crypto = require('crypto')
  return new Promise((resolve, reject) => {
    crypto.pbkdf2(
      password,
      salt,
      iterations,
      keyLength,
      hash,
      (err, derivedKey) => {
        if (err) reject(err)
        else resolve(derivedKey)
      }
    )
  })
}

async function pbkdf2Browser(
  password: string,
  salt: Buffer,
  opts: PBKDF2Options
): Promise<Uint8Array> {
  const { iterations, keyLength, hash } = opts
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const crypto = window.crypto || (window as any).msCrypto

  if (!crypto) throw new Error('Your browser does not expose window.crypto.')

  const keyMaterial = await crypto.subtle.importKey(
    'raw',
    new TextEncoder().encode(password),
    { name: 'PBKDF2' },
    false,
    ['deriveBits', 'deriveKey']
  )
  const derivedKey = await crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: salt,
      iterations: iterations,
      hash: { name: hash },
    },
    keyMaterial,
    { name: 'AES-GCM', length: keyLength * 8 },
    false, // whether the derived key is extractable
    ['encrypt', 'decrypt']
  )

  return Buffer.from(crypto.subtle.exportKey('raw', derivedKey))
}

export async function pbkdf2(
  password: string,
  salt: Buffer,
  opts: PBKDF2Options
): Promise<Uint8Array> {
  if (isNode()) {
    return pbkdf2Node(password, salt, opts)
  } else {
    return pbkdf2Browser(password, salt, opts)
  }
}

export async function aesGCMEncrypt(
  data: Uint8Array,
  key: Uint8Array,
  iv: Uint8Array
): Promise<Uint8Array> {
  if (isNode()) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const crypto = require('crypto')
    const cipher = crypto.createCipheriv('aes-256-gcm', key, iv)
    const encrypted = Buffer.concat([
      cipher.update(data),
      cipher.final(),
      cipher.getAuthTag(),
    ])
    return encrypted
  } else {
    const keyData = await window.crypto.subtle.importKey(
      'raw',
      key,
      { name: 'AES-GCM' },
      false,
      ['encrypt']
    )
    const encrypted = await window.crypto.subtle.encrypt(
      { name: 'AES-GCM', iv: iv },
      keyData,
      data
    )
    return Buffer.from(encrypted)
  }
}

export async function aesGCMDecrypt(
  encryptedData: Uint8Array,
  key: Uint8Array,
  iv: Uint8Array
): Promise<Uint8Array> {
  if (isNode()) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const crypto = require('crypto')
    encryptedData = Buffer.from(encryptedData)
    const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv)
    decipher.setAuthTag(encryptedData.slice(encryptedData.length - 16))
    const decrypted = Buffer.concat([
      decipher.update(encryptedData.slice(0, encryptedData.length - 16)),
      decipher.final(),
    ])
    return decrypted
  } else {
    const keyData = await window.crypto.subtle.importKey(
      'raw',
      key,
      { name: 'AES-GCM' },
      false,
      ['decrypt']
    )
    const decrypted = await window.crypto.subtle.decrypt(
      { name: 'AES-GCM', iv: iv },
      keyData,
      encryptedData
    )
    return Buffer.from(decrypted)
  }
}
