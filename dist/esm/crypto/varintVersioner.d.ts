import { Versioner, Version } from './interfaces/versioner';
/**
 * Varint-based implementation of the Versioner interface.
 */
export default class VarintVersioner implements Versioner {
    /**
     * Prepends the version to the data.
     *
     * @param version - The version to attach.
     * @param data - The data to attach the version to.
     *
     * @returns The versioned data.
     */
    attach(version: Version, data: Uint8Array): Uint8Array;
    /**
     * Extracts the version from the data.
     *
     * @param data - The versioned data.
     *
     * @returns The version and the data.
     */
    extract(data: Uint8Array): {
        version: Version;
        data: Uint8Array;
    };
}
