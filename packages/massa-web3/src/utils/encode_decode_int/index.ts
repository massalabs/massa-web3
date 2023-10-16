/**
 * This namespace is used to **serialize** and **deserialize** signed and unsigned numbers.
 *
 * @privateRemarks
 * Please do not dump all your functions in this namespace.
 * Try to organize them in different files.
 *
 * If any files becomes too big, or is starting to be too specific,
 * don't hesitate to propose a new namespace.
 *
 * Here is the catalog of all functions organized by file:
 *
 * In the file **signed.ts** you can find functions to serialize and deserialize signed numbers such as:
 * - encodingLength
 * - encode
 * - decode
 *
 * In the file **unsigned.ts** you can find functions to serialize and deserialize unsigned numbers such as:
 * - encodingLength
 * - encode
 * - decode
 *
 * @module
 */
export * as signedBigIntUtils from './signed';
export * as unsignedBigIntUtils from './unsigned';
