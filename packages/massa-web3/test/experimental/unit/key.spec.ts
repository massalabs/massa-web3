import { Address } from '../../../src/experimental/basicElements/address'
import {
  PrivateKey,
  PublicKey,
} from '../../../src/experimental/basicElements/keys'
import { Version } from '../../../src/experimental/crypto/interfaces/versioner'

class TestPublicKey extends PublicKey {
  public static callInitFromVersion(version: Version) {
    return this.initFromVersion(version)
  }
}

class TestPrivateKey extends PrivateKey {
  public static callInitFromVersion(version: Version) {
    return this.initFromVersion(version)
  }
}

describe('PrivateKey and PublicKey tests', () => {
  let privateKey: PrivateKey
  let publicKey: PublicKey

  beforeAll(async () => {
    privateKey = PrivateKey.generate()
    publicKey = await PublicKey.fromPrivateKey(privateKey)
  })

  describe('Conversion to and from Bytes', () => {
    test('PrivateKey and PublicKey toBytes and fromBytes', async () => {
      const privateKey = PrivateKey.generate()
      const newPKeyBytes = PrivateKey.fromBytes(privateKey.bytes)
      expect(newPKeyBytes.bytes).toEqual(privateKey.bytes)

      const publicKey = await PublicKey.fromPrivateKey(privateKey)
      const newPubKeyBytes = PublicKey.fromBytes(publicKey.bytes)
      expect(newPubKeyBytes.bytes).toEqual(publicKey.bytes)
    })
  })

  describe('Address Generation', () => {
    test('PublicKey getAddress', () => {
      // TODO be sure address is right
      const address = publicKey.getAddress()
      expect(address).toBeInstanceOf(Address)
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
        /Invalid private key string/
      )
    })

    it('should throw an error when given an invalid string', () => {
      const invalidPublicKeyString = 'invalidPublicKey'

      expect(() =>
        PublicKey.fromString(invalidPublicKeyString, Version.V0)
      ).toThrow(/Invalid public key string/)
    })
  })

  describe('From Environment Variables', () => {
    test('fromEnv returns PrivateKey when PRIVATE_KEY environment variable set', () => {
      process.env.PRIVATE_KEY = privateKey.toString()
      const key = PrivateKey.fromEnv()
      expect(key).toBeInstanceOf(PrivateKey)
      expect(key.toString()).toBe(privateKey.toString())
    })

    test('fromEnv throws error when PRIVATE_KEY environment variable is not set', () => {
      delete process.env.PRIVATE_KEY
      expect(() => PrivateKey.fromEnv()).toThrow(
        'missing `PRIVATE_KEY` environment variable'
      )
    })
  })

  describe('From Version', () => {
    test('initFromVersion returns correct PublicKey for supported version', () => {
      const publicKey = TestPublicKey.callInitFromVersion(Version.V0)
      expect(publicKey).toBeInstanceOf(PublicKey)
      expect(publicKey.version).toEqual(Version.V0)
    })

    test('initFromVersion returns correct Private for supported version', () => {
      const privateKey = TestPrivateKey.callInitFromVersion(Version.V0)
      expect(privateKey).toBeInstanceOf(PrivateKey)
      expect(privateKey.version).toEqual(Version.V0)
    })

    test('initFromVersion throws error for unsupported version', () => {
      expect(() => TestPublicKey.callInitFromVersion(Version.V1)).toThrow(
        'unsupported version: 1'
      )

      expect(() => TestPrivateKey.callInitFromVersion(Version.V1)).toThrow(
        'unsupported version: 1'
      )
    })
  })
})
