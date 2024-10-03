import Serializer from '../crypto/interfaces/serializer';
import { Versioner, Version } from '../crypto/interfaces/versioner';
/**
 * Deserialize a string data into non versioned bytes and checks that expected version match.
 *
 * @returns the extracted data.
 */
export declare function extractData(serializer: Serializer, versioner: Versioner, data: string, expectedVersion: Version): Uint8Array;
/**
 * Get the prefix of a string and validate it against the expected ones.
 *
 * @remarks
 * If several prefixes are expected, their length must be the same.
 *
 * @returns the extracted prefix.
 */
export declare function mustExtractPrefix(str: string, ...expected: string[]): string;
