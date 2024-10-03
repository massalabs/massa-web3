"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const varint_1 = tslib_1.__importDefault(require("varint"));
/**
 * Varint-based implementation of the Versioner interface.
 */
class VarintVersioner {
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
        const versionArray = varint_1.default.encode(version);
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
        const version = varint_1.default.decode(data);
        return { data: data.slice(varint_1.default.decode.bytes), version };
    }
}
exports.default = VarintVersioner;
//# sourceMappingURL=varintVersioner.js.map