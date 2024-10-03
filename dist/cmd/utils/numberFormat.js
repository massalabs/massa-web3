"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseMas = exports.parseUnits = exports.formatMas = exports.formatUnits = void 0;
const mas_1 = require("../basicElements/mas");
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
function formatUnits(value, decimals) {
    let display = value.toString();
    const negative = display.startsWith('-');
    if (negative)
        display = display.slice(1);
    display = display.padStart(decimals, '0');
    // eslint-disable-next-line prefer-const
    let [integer, fraction] = [
        display.slice(0, display.length - decimals),
        display.slice(display.length - decimals),
    ];
    fraction = fraction.replace(/(0+)$/, '');
    return `${negative ? '-' : ''}${integer || '0'}${fraction ? `.${fraction}` : ''}`;
}
exports.formatUnits = formatUnits;
function formatMas(value) {
    return formatUnits(value, mas_1.NB_DECIMALS);
}
exports.formatMas = formatMas;
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
function parseUnits(value, decimals) {
    let [integer, fraction = '0'] = value.split('.');
    const negative = integer.startsWith('-');
    if (negative)
        integer = integer.slice(1);
    // trim trailing zeros.
    fraction = fraction.replace(/(0+)$/, '');
    // round off if the fraction is larger than the number of decimals.
    if (decimals === 0) {
        if (Math.round(Number(`.${fraction}`)) === 1)
            integer = `${BigInt(integer) + 1n}`;
        fraction = '';
    }
    else if (fraction.length > decimals) {
        const [left, unit, right] = [
            fraction.slice(0, decimals - 1),
            fraction.slice(decimals - 1, decimals),
            fraction.slice(decimals),
        ];
        const rounded = Math.round(Number(`${unit}.${right}`));
        // eslint-disable-next-line @typescript-eslint/no-magic-numbers
        if (rounded > 9)
            fraction = `${BigInt(left) + BigInt(1)}0`.padStart(left.length + 1, '0');
        else
            fraction = `${left}${rounded}`;
        if (fraction.length > decimals) {
            fraction = fraction.slice(1);
            integer = `${BigInt(integer) + 1n}`;
        }
        fraction = fraction.slice(0, decimals);
    }
    else {
        fraction = fraction.padEnd(decimals, '0');
    }
    return BigInt(`${negative ? '-' : ''}${integer}${fraction}`);
}
exports.parseUnits = parseUnits;
function parseMas(value) {
    return parseUnits(value, mas_1.NB_DECIMALS);
}
exports.parseMas = parseMas;
//# sourceMappingURL=numberFormat.js.map