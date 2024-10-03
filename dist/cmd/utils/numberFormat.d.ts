/**
 *  Divides a number by a given exponent of base 10 (10exponent), and formats it into a string representation of the number.
 *
 *   This code snippet is taken from the Viem SDK.
 * - Docs: https://viem.sh/docs/utilities/formatUnits
 *
 * @example
 *
 * formatUnits(420000000000n, 9)
 * // '420'
 */
export declare function formatUnits(value: bigint, decimals: number): string;
export declare function formatMas(value: bigint): string;
/**
 * Multiplies a string representation of a number by a given exponent of base 10 (10exponent).
 *
 *   This code snippet is taken from the Viem SDK.
 * - Docs: https://viem.sh/docs/utilities/parseUnits
 *
 * @example
 * import { parseUnits } from 'viem'
 *
 * parseUnits('420', 9)
 * // 420000000000n
 */
export declare function parseUnits(value: string, decimals: number): bigint;
export declare function parseMas(value: string): bigint;
