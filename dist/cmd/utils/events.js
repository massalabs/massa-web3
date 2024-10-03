"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rawEventDecode = void 0;
/**
 *  Decodes the raw event data from base64 to Uint8Array
 *
 * @param eventData - The raw event data in base64 format
 *
 * @returns The decoded raw event data
 */
function rawEventDecode(eventData) {
    return Uint8Array.from(Buffer.from(eventData, 'base64'));
}
exports.rawEventDecode = rawEventDecode;
//# sourceMappingURL=events.js.map