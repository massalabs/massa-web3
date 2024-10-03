/**
 * Deserialize a string data into non versioned bytes and checks that expected version match.
 *
 * @returns the extracted data.
 */
export function extractData(serializer, versioner, data, expectedVersion) {
    const raw = serializer.deserialize(data);
    const { data: extractedData, version } = versioner.extract(raw);
    if (version !== expectedVersion) {
        throw new Error(`invalid version: ${version}. ${expectedVersion} was expected.`);
    }
    return extractedData;
}
/**
 * Get the prefix of a string and validate it against the expected ones.
 *
 * @remarks
 * If several prefixes are expected, their length must be the same.
 *
 * @returns the extracted prefix.
 */
export function mustExtractPrefix(str, ...expected) {
    const prefix = str.slice(0, expected[0].length);
    if (!expected.includes(prefix)) {
        throw new Error(`invalid prefix: ${prefix}. ${expected.length > 1 ? 'one of ' : ''}${expected.join(' or ')} was expected.`);
    }
    return prefix;
}
//# sourceMappingURL=internal.js.map