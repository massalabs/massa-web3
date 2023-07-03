import { hashBlake3 } from '../../src/utils/Xbqcrypto';
import {
  mockAddressResult,
  mockPublicKeyObject,
  mockSecretKeyOject,
  mockSignatureResult,
} from '../web3/mockData';
import { SecretKey, PublicKey, Address } from '../../src/utils/keyAndAddresses';

describe('SecretKey', () => {
  it('should construct SecretKey correctly', async () => {
    const secretKey = new SecretKey(mockSecretKeyOject.base58Encoded);

    expect(secretKey.version).toEqual(mockSecretKeyOject.version);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect((secretKey as any).bytes).toEqual(mockSecretKeyOject.bytes);
  });

  it('should get the public key correctly', async () => {
    const secretKey: SecretKey = new SecretKey(
      mockSecretKeyOject.base58Encoded,
    );
    const publicKey: PublicKey = await secretKey.getPublicKey();

    expect(publicKey.version).toEqual(mockPublicKeyObject.version);
    expect(publicKey.bytes).toEqual(mockPublicKeyObject.bytes);
    expect(publicKey.base58Encode).toEqual(mockPublicKeyObject.base58Encoded);
  });

  it('should sign the digest correctly', async () => {
    const data = 'hello world';
    // bytes compaction
    const bytesCompact: Buffer = Buffer.from(data);
    // Hash byte compact
    const messageHashDigest: Uint8Array = hashBlake3(bytesCompact);

    const secretKey: SecretKey = new SecretKey(
      mockSecretKeyOject.base58Encoded,
    );
    // sign the digest
    const sig = await secretKey.signDigest(messageHashDigest);

    expect(sig).toEqual(mockSignatureResult.bytes);
  });
});

describe('PublicKey', () => {
  it('should construct PublicKey correctly', async () => {
    const bytes = mockPublicKeyObject.bytes;
    const version = mockPublicKeyObject.version;
    const expectedBase58Encode = mockPublicKeyObject.base58Encoded;

    const publicKey = new PublicKey(bytes, version);

    expect(publicKey.bytes).toEqual(bytes);
    expect(publicKey.version).toEqual(version);
    expect(publicKey.base58Encode).toEqual(expectedBase58Encode);
  });
});

describe('Address', () => {
  it('should construct Address correctly', async () => {
    const secretKeyObject: SecretKey = new SecretKey(
      mockSecretKeyOject.base58Encoded,
    );
    const publicKeyObject: PublicKey = await secretKeyObject.getPublicKey();

    const addressObject: Address = new Address(publicKeyObject);

    expect(addressObject.version).toEqual(mockAddressResult.version);
    expect(addressObject.base58Encode).toEqual(mockAddressResult.base58Encoded);
  });
});
