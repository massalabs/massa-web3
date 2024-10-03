import Base58 from '../crypto/base58';
import { Version } from '../crypto/interfaces/versioner';
import VarintVersioner from '../crypto/varintVersioner';
const DEFAULT_VERSION = Version.V0;
/**
 * Get the signature version.
 *   *
 * @returns the signature version.
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getVersion(data) {
    // when a new version will come, implement the logic to detect version here
    // This should be done without serializer and versionner as they are potentially not known at this point
    return Version.V0;
}
/**
 * A class representing a signature.
 */
export class Signature {
    serializer;
    versioner;
    version;
    // The signature in byte format. Version included.
    bytes;
    constructor(serializer, versioner, version) {
        this.serializer = serializer;
        this.versioner = versioner;
        this.version = version;
    }
    /**
     * Initializes a new signature object from a version.
     *
     * @param version - The version of the signature.
     *
     * @returns A new signature instance.
     */
    static initFromVersion(version = DEFAULT_VERSION) {
        switch (version) {
            case Version.V0:
                return new Signature(new Base58(), new VarintVersioner(), version);
            default:
                throw new Error(`unsupported version: ${version}`);
        }
    }
    /**
     * Initializes a new signature object from a serialized string.
     *
     * @param str - The serialized signature string.
     *
     * @returns A new signature instance.
     *
     * @throws If the signature string is invalid.
     */
    static fromString(str) {
        const version = getVersion(str);
        const signature = Signature.initFromVersion(version);
        try {
            signature.bytes = signature.serializer.deserialize(str);
            const { version: extractedVersion } = signature.versioner.extract(signature.bytes);
            // safety check
            if (extractedVersion !== version) {
                throw new Error(`invalid version: ${version}. ${signature.version} was expected.`);
            }
        }
        catch (e) {
            throw new Error(`invalid signature string: ${e.message}`);
        }
        return signature;
    }
    /**
     * Initializes a signature object from a byte array.
     *
     * @param bytes - The signature bytes.
     *
     * @returns A signature object.
     */
    static fromBytes(bytes) {
        const version = getVersion(bytes);
        const signature = Signature.initFromVersion(version);
        signature.bytes = bytes;
        // safety check
        const { version: extractedVersion } = signature.versioner.extract(bytes);
        if (extractedVersion !== version) {
            throw new Error(`invalid version: ${version}. ${signature.version} was expected.`);
        }
        return signature;
    }
    /**
     * Get signature in bytes format.
     *
     * @returns The versioned signature key bytes.
     */
    toBytes() {
        return this.bytes;
    }
    /**
     * Serializes the signature to a string.
     *
     * @returns The serialized signature string.
     */
    toString() {
        return this.serializer.serialize(this.bytes);
    }
}
//# sourceMappingURL=signature.js.map