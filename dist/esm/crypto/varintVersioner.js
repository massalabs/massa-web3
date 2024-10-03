import varint from 'varint';
/**
 * Varint-based implementation of the Versioner interface.
 */
export default class VarintVersioner {
    /**
     * Prepends the version to the data.
     *
     * @param version - The version to attach.
     * @param data - The data to attach the version to.
     *
     * @returns The versioned data.
     */
    // eslint-disable-next-line class-methods-use-this -- Expected by the interface.
    attach(version, data) {
        const versionArray = varint.encode(version);
        return new Uint8Array([...versionArray, ...data]);
    }
    /**
     * Extracts the version from the data.
     *
     * @param data - The versioned data.
     *
     * @returns The version and the data.
     */
    // eslint-disable-next-line class-methods-use-this -- Expected by the interface.
    extract(data) {
        const version = varint.decode(data);
        return { data: data.slice(varint.decode.bytes), version };
    }
}
//# sourceMappingURL=varintVersioner.js.map