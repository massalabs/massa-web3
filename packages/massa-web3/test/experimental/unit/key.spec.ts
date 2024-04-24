import { Address } from '../../../src/experimental/basicElements/address'
import {
  PrivateKey,
  PublicKey,
} from '../../../src/experimental/basicElements/keys'
import { Version } from '../../../src/experimental/crypto/interfaces/versioner'
import { SecretKey as LegacyPrivateKey } from '../../../src/utils/keyAndAddresses'
import { Address as LegacyAddress } from '../../../src/utils/keyAndAddresses'

const invalidVersion = -1 as Version

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
      const newPubKeyBytes = PublicKey.fromBytes(publicKey.bytes)
      expect(newPubKeyBytes.bytes).toEqual(publicKey.bytes)
    })

    test('PrivateKey toBytes and fromBytes', async () => {
      const privateKey = PrivateKey.generate()
      const newPKeyBytes = PrivateKey.fromBytes(privateKey.bytes)
      expect(newPKeyBytes.bytes).toEqual(privateKey.bytes)
    })
  })

  describe('Address Generation', () => {
    test('PublicKey getAddress', async () => {
      // Generate address from Legacy keys objects
      const legacyPrivKey = new LegacyPrivateKey(
        'S1eK3SEXGDAWN6pZhdr4Q7WJv6UHss55EB14hPy4XqBpiktfPu6'
      )
      const legacyPubKey = await legacyPrivKey.getPublicKey()
      const legacyAddress = LegacyAddress.fromPublicKey(legacyPubKey)

      // Generate address from new keys objects
      const privKey = PrivateKey.fromString(
        'S1eK3SEXGDAWN6pZhdr4Q7WJv6UHss55EB14hPy4XqBpiktfPu6'
      )
      const pubKey = await PublicKey.fromPrivateKey(privKey)
      const address = Address.fromPublicKey(pubKey)

      // Verify that the addresses are the same
      expect(address.toString()).toBe(legacyAddress.base58Encoded)
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

      expect(() =>
        PublicKey.fromString(invalidPublicKeyString, Version.V0)
      ).toThrow(/invalid public key string/)
    })

    test('fromString throws error for invalid public key version', () => {
      const publicKeyString = publicKey.toString()
      expect(() =>
        PublicKey.fromString(publicKeyString, invalidVersion)
      ).toThrow(/unsupported version/)
    })
    test('fromString throws error for invalid private key version', () => {
      const privateKeyString = privateKey.toString()

      expect(() =>
        PrivateKey.fromString(privateKeyString, invalidVersion)
      ).toThrow(/unsupported version/)
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
