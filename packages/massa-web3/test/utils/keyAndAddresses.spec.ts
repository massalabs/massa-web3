import { hashBlake3 } from '../../src/utils/Xbqcrypto'
import {
  mockAddressResult,
  mockPublicKeyObject,
  mockSecretKeyOject,
  mockSignatureResult,
  mockAddressVersion,
} from '../web3/mockData'
import { SecretKey, PublicKey, Address } from '../../src/utils/keyAndAddresses'

describe('SecretKey', () => {
  it('should construct SecretKey correctly', async () => {
    const secretKey = new SecretKey(mockSecretKeyOject.base58Encoded)
    expect(secretKey.version).toEqual(mockSecretKeyOject.version)
    expect(secretKey.bytes).toEqual(mockSecretKeyOject.bytes)
  })

  it('should get the public key correctly', async () => {
    const secretKey: SecretKey = new SecretKey(mockSecretKeyOject.base58Encoded)
    const publicKey: PublicKey = await secretKey.getPublicKey()

    expect(publicKey.version).toEqual(mockPublicKeyObject.version)
    expect(publicKey.bytes).toEqual(mockPublicKeyObject.bytes)
    expect(publicKey.base58Encoded).toEqual(mockPublicKeyObject.base58Encoded)
  })

  it('should sign the digest correctly', async () => {
    const data = 'hello world'

    const bytesCompact: Buffer = Buffer.from(data)

    const messageHashDigest: Uint8Array = hashBlake3(bytesCompact)

    const secretKey: SecretKey = new SecretKey(mockSecretKeyOject.base58Encoded)

    const sig = await secretKey.signDigest(messageHashDigest)

    expect(sig).toEqual(mockSignatureResult.bytes)
  })
})

describe('PublicKey', () => {
  it('should construct PublicKey correctly', async () => {
    const bytes = mockPublicKeyObject.bytes
    const version = mockPublicKeyObject.version
    const expectedBase58Encode = mockPublicKeyObject.base58Encoded

    const publicKey = new PublicKey(bytes, version)

    expect(publicKey.bytes).toEqual(bytes)
    expect(publicKey.version).toEqual(version)
    expect(publicKey.base58Encoded).toEqual(expectedBase58Encode)
  })
})

describe('Address', () => {
  it('should construct Address correctly', async () => {
    const secretKeyObject: SecretKey = new SecretKey(
      mockSecretKeyOject.base58Encoded
    )
    const publicKeyObject: PublicKey = await secretKeyObject.getPublicKey()

    const addressObject: Address = Address.fromPublicKey(publicKeyObject)

    expect(addressObject.version).toEqual(mockAddressResult.version)
    expect(addressObject.base58Encoded).toEqual(mockAddressResult.base58Encoded)
  })

  it('should construct Address correctly with version', async () => {
    for (let addressObject of mockAddressVersion) {
      const address = new Address(addressObject.base58Encoded)
      expect(address.version).toEqual(addressObject.version)
    }
  })

  it('should throw if the address is not valid', async () => {
    const invalidAddress = 'A1'
    expect(() => {
      /* eslint-disable @typescript-eslint/no-unused-vars */
      const address = new Address(invalidAddress)
    }).toThrow()
  })
})
