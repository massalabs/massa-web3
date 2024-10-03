import { Signature } from './signature';
import { Address } from './address';
import Hasher from '../crypto/interfaces/hasher';
import Serializer from '../crypto/interfaces/serializer';
import Signer from '../crypto/interfaces/signer';
import { Version, Versioner } from '../crypto/interfaces/versioner';
/**
 * A class representing a private key.
 *
 * @remarks
 * The private key is used to sign operations during interactions with the blockchain.
 *
 * @privateRemarks
 * Interfaces are used to make the code more modular. To add a new version, you simply need to
 * extend the `initFromVersion` method:
 * - Add a new case in the switch statement with the new algorithms to use.
 * - Add a new default version matching the last version.
 * - Voila! The code will automatically handle the new version.
 */
export declare class PrivateKey {
    hasher: Hasher;
    signer: Signer;
    serializer: Serializer;
    versioner: Versioner;
    version: Version;
    private bytes;
    private prefix;
    protected constructor(hasher: Hasher, signer: Signer, serializer: Serializer, versioner: Versioner, version: Version);
    /**
     * Initializes a new private key object from a version.
     *
     * @param version - The version of the private key. If not defined, the last version will be used.
     *
     * @returns A new private key instance.
     */
    protected static initFromVersion(version?: Version): PrivateKey;
    private checkPrefix;
    /**
     * Initializes a new private key object from a serialized string.
     *
     * @param str - The serialized private key string.
     *
     * @returns A new private key instance.
     *
     * @throws If the private key prefix is invalid.
     */
    static fromString(str: string): PrivateKey;
    /**
     * Initializes a new private key object from a byte array.
     *
     * @param bytes - The private key in byte format.
     *
     * @returns A new private key instance.
     */
    static fromBytes(bytes: Uint8Array): PrivateKey;
    /**
     * Initializes a new private key object from the environment variables.
     *
     * @param key - The environment variable name containing the private key.
     *
     * @remarks
     * The `PRIVATE_KEY` or the provided key is required in the environment variables.
     *
     * @returns A new private key instance.
     */
    static fromEnv(key?: string): PrivateKey;
    /**
     * Initializes a random private key.
     *
     * @param version - The version of the private key. If not defined, the last version will be used.
     *
     * @returns A new private key instance.
     */
    static generate(version?: Version): PrivateKey;
    /**
     * Returns the public key matching to the current private key.
     *
     * @returns A new public key instance.
     */
    getPublicKey(): Promise<PublicKey>;
    /**
     * Signs the message with the private key.
     *
     * @remarks
     * This function signs a byte-encoded message. The message is first hashed and then signed.
     * Do not pass a digest to this function as it will be hashed twice.
     *
     * @param message - The byte array to sign.
     *
     * @returns The signature byte array.
     */
    sign(message: Uint8Array): Promise<Signature>;
    /**
     * Private key in bytes.
     *
     * @returns The versioned private key bytes.
     */
    toBytes(): Uint8Array;
    /**
     * Serializes the private key to a string.
     *
     * @remarks
     * A private key is serialized as follows:
     * - The version is serialized as a varint and prepended to the private key bytes.
     * - The result is then sent to the serializer.
     *
     * @returns The serialized private key string.
     */
    toString(): string;
}
/**
 * A class representing a public key.
 *
 * @remarks
 * The public key is an essential component of asymmetric cryptography. It is intrinsically linked to the private key.
 *
 * @privateRemarks
 * Interfaces are used to make the code more modular. To add a new version, you simply need to:
 * - extend the `initFromVersion` method:
 *   - Add a new case in the switch statement with the new algorithms to use.
 *   - Add a new default version matching the last version.
 * - check the `fromPrivateKey` method to potentially adapt how a public key is derived from a private key.
 * - Voila! The code will automatically handle the new version.
 */
export declare class PublicKey {
    hasher: Hasher;
    signer: Signer;
    serializer: Serializer;
    versioner: Versioner;
    version: Version;
    private bytes;
    private prefix;
    protected constructor(hasher: Hasher, signer: Signer, serializer: Serializer, versioner: Versioner, version: Version);
    /**
     * Initializes a new public key object from a version.
     *
     * @param version - The version of the private key. If not defined, the last version will be used.
     *
     * @returns A new public key instance.
     *
     * @throws If the version is not supported.
     */
    protected static initFromVersion(version?: Version): PublicKey;
    private checkPrefix;
    /**
     * Initializes a new public key object from a serialized string.
     *
     * @param str - The serialized public key string.
     *
     * @returns A new public key instance.
     *
     * @throws If the public key prefix is invalid.
     */
    static fromString(str: string): PublicKey;
    /**
     * Initializes a new public key object from a byte array.
     *
     * @param bytes - The public key in byte format.
     *
     * @returns A new public key instance.
     */
    static fromBytes(bytes: Uint8Array): PublicKey;
    /**
     * Initializes a new public key object from a private key.
     *
     * @param privateKey - The private key to derive the public key from.
     *
     * @returns A new public key instance.
     */
    static fromPrivateKey(privateKey: PrivateKey): Promise<PublicKey>;
    /**
     * Get an address from the public key.
     *
     * @returns A new address object.
     */
    getAddress(): Address;
    /**
     * Checks the message signature with the public key.
     *
     * @remarks
     * This function very a byte-encoded message. The message is first hashed and then verified.
     * Do not pass a digest to this function as it will be hashed twice.
     *
     * @param signature - The signature to verify.
     * @param data - The data signed by the signature.
     *
     * @returns A boolean indicating whether the signature is valid.
     */
    verify(data: Uint8Array, signature: Signature): Promise<boolean>;
    /**
     * Public key in bytes.
     *
     * @returns The versioned public key bytes.
     */
    toBytes(): Uint8Array;
    /**
     * Serializes the public key to a string.
     *
     * @remarks
     * A public key is serialized as follows:
     * - The version is serialized as a varint and prepended to the public key bytes.
     * - The result is then sent to the serializer.
     *
     * @returns The serialized public key string.
     */
    toString(): string;
}
