import Serializer from '../crypto/interfaces/serializer';
import { Version, Versioner } from '../crypto/interfaces/versioner';
/**
 * A class representing a signature.
 */
export declare class Signature {
    serializer: Serializer;
    versioner: Versioner;
    version: Version;
    private bytes;
    protected constructor(serializer: Serializer, versioner: Versioner, version: Version);
    /**
     * Initializes a new signature object from a version.
     *
     * @param version - The version of the signature.
     *
     * @returns A new signature instance.
     */
    protected static initFromVersion(version?: Version): Signature;
    /**
     * Initializes a new signature object from a serialized string.
     *
     * @param str - The serialized signature string.
     *
     * @returns A new signature instance.
     *
     * @throws If the signature string is invalid.
     */
    static fromString(str: string): Signature;
    /**
     * Initializes a signature object from a byte array.
     *
     * @param bytes - The signature bytes.
     *
     * @returns A signature object.
     */
    static fromBytes(bytes: Uint8Array): Signature;
    /**
     * Get signature in bytes format.
     *
     * @returns The versioned signature key bytes.
     */
    toBytes(): Uint8Array;
    /**
     * Serializes the signature to a string.
     *
     * @returns The serialized signature string.
     */
    toString(): string;
}
