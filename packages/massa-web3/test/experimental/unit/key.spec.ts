import { Address } from '../../../src/experimental/basicElements/address'
import {
  PrivateKey,
  PublicKey,
} from '../../../src/experimental/basicElements/keys'

describe('PrivateKey and PublicKey tests', () => {
  let privateKey: PrivateKey
  let publicKey: PublicKey

  beforeAll(async () => {
    privateKey = PrivateKey.generate()
    publicKey = await PublicKey.fromPrivateKey(privateKey)
  })

  describe('Conversion to and from Bytes', () => {
    test('PublicKey toBytes and fromBytes', async () => {
      const publicKey = await PublicKey.fromPrivateKey(privateKey)
      const newPubKeyBytes = PublicKey.fromBytes(publicKey.toBytes())
      expect(newPubKeyBytes.toBytes()).toEqual(publicKey.toBytes())
    })

    test('PrivateKey toBytes and fromBytes', async () => {
      const privateKey = PrivateKey.generate()
      const newPKeyBytes = PrivateKey.fromBytes(privateKey.toBytes())
      expect(newPKeyBytes.toBytes()).toEqual(privateKey.toBytes())
    })
  })

  describe('Address Generation', () => {
    test('PublicKey getAddress', async () => {
      const privKey = PrivateKey.fromString(
        'S1eK3SEXGDAWN6pZhdr4Q7WJv6UHss55EB14hPy4XqBpiktfPu6'
      )
      const pubKey = await PublicKey.fromPrivateKey(privKey)
      const address = Address.fromPublicKey(pubKey)

      expect(address.toString()).toBe(
        'AU12Set6aygzt1k7ZkDwrkStYovVBzeGs8VgaZogy11s7fQzaytv3'
      )
    })
  })

  describe('Signing and Verification', () => {
    test('PrivateKey sign and PublicKey verify', async () => {
      const message = new TextEncoder().encode('Hello, world!')
      const signature = await privateKey.sign(message)
      const isValid = await publicKey.verify(message, signature)

      expect(isValid).toBe(true)
    })
  })

  describe('From String', () => {
    test('fromString returns PrivateKey when valid private key string', () => {
      const privateKeyString = privateKey.toString()
      const key = PrivateKey.fromString(privateKeyString)
      expect(key).toBeInstanceOf(PrivateKey)
      expect(key.toString()).toBe(privateKey.toString())
    })

    test('fromString returns PublicKey when valid public key string', () => {
      const publicKeyString = publicKey.toString()
      const key = PublicKey.fromString(publicKeyString)
      expect(key).toBeInstanceOf(PublicKey)
      expect(key.toString()).toBe(publicKey.toString())
    })

    test('fromString throws error for invalid private key string', () => {
      const invalidPrivateKeyString = 'invalidPrivateKey'
      expect(() => PrivateKey.fromString(invalidPrivateKeyString)).toThrow(
        /invalid private key string/
      )
    })

    test('fromString throws error for invalid public key string', () => {
      const invalidPublicKeyString = 'invalidPublicKey'

      expect(() => PublicKey.fromString(invalidPublicKeyString)).toThrow(
        /invalid public key string/
      )
    })
  })

  describe('From Environment Variables', () => {
    test('fromEnv returns PrivateKey when PRIVATE_KEY environment variable set', () => {
      process.env.PRIVATE_KEY = privateKey.toString()
      const key = PrivateKey.fromEnv()
      expect(key.toString()).toBe(privateKey.toString())
    })

    test('fromEnv throws error when PRIVATE_KEY environment variable is not set', () => {
      delete process.env.PRIVATE_KEY
      expect(() => PrivateKey.fromEnv()).toThrow(
        'missing `PRIVATE_KEY` environment variable'
      )
    })
  })
})
