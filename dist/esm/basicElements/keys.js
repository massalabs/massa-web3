import { Signature } from './signature';
import { Address } from './address';
import Base58 from '../crypto/base58';
import Blake3 from '../crypto/blake3';
import Ed25519 from '../crypto/ed25519';
import { Version } from '../crypto/interfaces/versioner';
import VarintVersioner from '../crypto/varintVersioner';
const PRIVATE_KEY_PREFIX = 'S';
const PUBLIC_KEY_PREFIX = 'P';
/**
 * Get the version from string or bytes key.
 *
 * @remarks
 * For now the function is common for private & public key but it might change in the future.
 *
 * @returns the key version.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getVersion(data) {
    // When a new version will come, implement the logic to detect version here
    // This should be done without serializer and versionner as they are potentially not known at this point
    return Version.V0;
}
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
export class PrivateKey {
    hasher;
    signer;
    serializer;
    versioner;
    version;
    // The key in byte format. Version included.
    bytes;
    prefix = PRIVATE_KEY_PREFIX;
    // eslint-disable-next-line max-params
    constructor(hasher, signer, serializer, versioner, version) {
        this.hasher = hasher;
        this.signer = signer;
        this.serializer = serializer;
        this.versioner = versioner;
        this.version = version;
    }
    /**
     * Initializes a new private key object from a version.
     *
     * @param version - The version of the private key. If not defined, the last version will be used.
     *
     * @returns A new private key instance.
     */
    static initFromVersion(version = Version.V0) {
        switch (version) {
            case Version.V0:
                return new PrivateKey(new Blake3(), new Ed25519(), new Base58(), new VarintVersioner(), version);
            default:
                throw new Error(`unsupported version: ${version}`);
        }
    }
    checkPrefix(str) {
        if (!str.startsWith(this.prefix)) {
            throw new Error(`invalid private key prefix: ${this.prefix} was expected.`);
        }
    }
    /**
     * Initializes a new private key object from a serialized string.
     *
     * @param str - The serialized private key string.
     *
     * @returns A new private key instance.
     *
     * @throws If the private key prefix is invalid.
     */
    static fromString(str) {
        try {
            const version = getVersion(str);
            const privateKey = PrivateKey.initFromVersion(version);
            privateKey.checkPrefix(str);
            privateKey.bytes = privateKey.serializer.deserialize(str.slice(privateKey.prefix.length));
            return privateKey;
        }
        catch (e) {
            throw new Error(`invalid private key string: ${e.message}`);
        }
    }
    /**
     * Initializes a new private key object from a byte array.
     *
     * @param bytes - The private key in byte format.
     *
     * @returns A new private key instance.
     */
    static fromBytes(bytes) {
        const version = getVersion(bytes);
        const privateKey = PrivateKey.initFromVersion(version);
        privateKey.bytes = bytes;
        return privateKey;
    }
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
    static fromEnv(key = 'PRIVATE_KEY') {
        const privateKey = process.env[key];
        if (!privateKey) {
            throw new Error(`missing \`${key}\` environment variable`);
        }
        return PrivateKey.fromString(privateKey);
    }
    /**
     * Initializes a random private key.
     *
     * @param version - The version of the private key. If not defined, the last version will be used.
     *
     * @returns A new private key instance.
     */
    static generate(version) {
        const privateKey = PrivateKey.initFromVersion(version);
        const rawBytes = privateKey.signer.generatePrivateKey();
        privateKey.bytes = privateKey.versioner.attach(privateKey.version, rawBytes);
        return privateKey;
    }
    /**
     * Returns the public key matching to the current private key.
     *
     * @returns A new public key instance.
     */
    async getPublicKey() {
        return PublicKey.fromPrivateKey(this);
    }
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
    async sign(message) {
        const { data } = this.versioner.extract(this.bytes);
        const signature = await this.signer.sign(data, this.hasher.hash(message));
        return Signature.fromBytes(this.versioner.attach(this.version, signature));
    }
    /**
     * Private key in bytes.
     *
     * @returns The versioned private key bytes.
     */
    toBytes() {
        return this.bytes;
    }
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
    toString() {
        return `${this.prefix}${this.serializer.serialize(this.bytes)}`;
    }
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
export class PublicKey {
    hasher;
    signer;
    serializer;
    versioner;
    version;
    // The key in byte format. Version included.
    bytes;
    prefix = PUBLIC_KEY_PREFIX;
    // eslint-disable-next-line max-params
    constructor(hasher, signer, serializer, versioner, version) {
        this.hasher = hasher;
        this.signer = signer;
        this.serializer = serializer;
        this.versioner = versioner;
        this.version = version;
    }
    /**
     * Initializes a new public key object from a version.
     *
     * @param version - The version of the private key. If not defined, the last version will be used.
     *
     * @returns A new public key instance.
     *
     * @throws If the version is not supported.
     */
    static initFromVersion(version = Version.V0) {
        switch (version) {
            case Version.V0:
                return new PublicKey(new Blake3(), new Ed25519(), new Base58(), new VarintVersioner(), version);
            default:
                throw new Error(`unsupported version: ${version}`);
        }
    }
    checkPrefix(str) {
        if (!str.startsWith(this.prefix)) {
            throw new Error(`invalid public key prefix: ${this.prefix} was expected.`);
        }
    }
    /**
     * Initializes a new public key object from a serialized string.
     *
     * @param str - The serialized public key string.
     *
     * @returns A new public key instance.
     *
     * @throws If the public key prefix is invalid.
     */
    static fromString(str) {
        try {
            const version = getVersion(str);
            const publicKey = PublicKey.initFromVersion(version);
            publicKey.checkPrefix(str);
            publicKey.bytes = publicKey.serializer.deserialize(str.slice(publicKey.prefix.length));
            return publicKey;
        }
        catch (e) {
            throw new Error(`invalid public key string: ${e.message}`);
        }
    }
    /**
     * Initializes a new public key object from a byte array.
     *
     * @param bytes - The public key in byte format.
     *
     * @returns A new public key instance.
     */
    static fromBytes(bytes) {
        const version = getVersion(bytes);
        const publicKey = PublicKey.initFromVersion(version);
        publicKey.bytes = bytes;
        return publicKey;
    }
    /**
     * Initializes a new public key object from a private key.
     *
     * @param privateKey - The private key to derive the public key from.
     *
     * @returns A new public key instance.
     */
    static async fromPrivateKey(privateKey) {
        const publicKey = PublicKey.initFromVersion();
        const { data } = publicKey.versioner.extract(privateKey.toBytes());
        const publicKeyBytes = await publicKey.signer.getPublicKey(data);
        publicKey.bytes = publicKey.versioner.attach(publicKey.version, publicKeyBytes);
        return publicKey;
    }
    /**
     * Get an address from the public key.
     *
     * @returns A new address object.
     */
    getAddress() {
        return Address.fromPublicKey(this);
    }
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
    async verify(data, signature) {
        const { data: rawSignature } = this.versioner.extract(signature.toBytes());
        const { data: rawPublicKey } = this.versioner.extract(this.bytes);
        return await this.signer.verify(rawPublicKey, this.hasher.hash(data), rawSignature);
    }
    /**
     * Public key in bytes.
     *
     * @returns The versioned public key bytes.
     */
    toBytes() {
        return this.bytes;
    }
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
    toString() {
        return `${this.prefix}${this.serializer.serialize(this.bytes)}`;
    }
}
//# sourceMappingURL=keys.js.map