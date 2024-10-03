import Serializer from '../crypto/interfaces/serializer';
import { Version, Versioner } from '../crypto/interfaces/versioner';
import { PublicKey } from './keys';
export declare enum AddressType {
    EOA = 0,
    Contract = 1
}
/**
 * A class representing an address.
 *
 * @remarks
 * For now, an address is intrinsically linked (to be understood as a digest of) to the public key.
 *
 * @privateRemarks
 * Interfaces are used to make the code more modular. To add a new version, you simply need to:
 * - Add a new case in the switch statement with the new algorithms to use.
 * - Change the DEFAULT_VERSION version matching the last version.
 * - Change the getVersion method to detect the version from user input.
 * - check the `fromPublicKey` method to potentially adapt how an address is derived from a public key.
 * - Voila! The code will automatically handle the new version.
 */
export declare class Address {
    serializer: Serializer;
    versioner: Versioner;
    version: Version;
    private bytes;
    isEOA: boolean;
    protected constructor(serializer: Serializer, versioner: Versioner, version: Version);
    /**
     * Initialize a new address object from a version.
     *
     * @param version - The version of the address.
     *
     * @returns A new address instance.
     *
     * @throws If the version is not supported.
     */
    protected static initFromVersion(version?: Version): Address;
    /**
     * Initializes a new address object from a serialized string.
     *
     * @param str - The serialized address string.
     *
     * @returns A new address instance.
     *
     * @throws If the address string is invalid.
     */
    static fromString(str: string): Address;
    /**
     * Get the address type from bytes.
     *
     * @returns the address type enum.
     */
    private getType;
    /**
     * Initializes a new address object from a public key.
     *
     * @param publicKey - The public key to derive the address from.
     *
     * @returns A new address object.
     */
    static fromPublicKey(publicKey: PublicKey): Address;
    /**
     * Initializes a new address object from versioned bytes.
     *
     * @param bytes - The versioned bytes.
     *
     * @returns A new address object.
     */
    static fromBytes(bytes: Uint8Array): Address;
    /**
     * Versions the address key bytes.
     *
     * @returns The versioned address key bytes.
     */
    toBytes(): Uint8Array;
    /**
     * Serializes the address to a string.
     *
     * @remarks
     * A address is serialized as follows:
     * - The version is serialized as a varint and prepended to the address bytes.
     * - The result is then sent to the serializer.
     *
     * @returns The serialized address string.
     */
    toString(): string;
    /**
     * Get address in binary format from a bytes buffer.
     *
     * @returns The address in bytes format.
     */
    static extractFromBuffer(data: Uint8Array, offset?: number): {
        data: Uint8Array;
        length: number;
    };
}
