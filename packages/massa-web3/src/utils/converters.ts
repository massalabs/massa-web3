import BigNumber from 'bignumber.js';

const MASSA_SCALING_FACTOR = 9;

/**
 * Convert any value expressed in Massa back to nanoMassa (the smallest unit of Massa).
 * This function takes an input value in Massa and returns the equivalent value in nanoMassa.
 *
 * @remarks
 * Massa is a unit of currency and nanoMassa is a sub-unit, where 1 Massa equals 10^9 nanoMassa.
 * This function uses the BigNumber library to perform calculations with arbitrary precision.
 *
 * @param amountInMassa - The amount to convert, expressed in Massa. Can be a number, string, BigNumber, or bigint.
 *
 * @returns The amount expressed in nanoMassa, as a bigint.
 *
 * @example
 * ```
 * const nanoMassa = fromMAS(1); // returns 1000000000n
 * ```
 */
export const fromMAS = (
  amountInMassa: number | string | BigNumber | bigint,
): bigint => {
  const amount = new BigNumber(amountInMassa.toString());
  const scaleFactor = new BigNumber(10).pow(
    new BigNumber(MASSA_SCALING_FACTOR),
  );
  const amountScaled = amount.times(scaleFactor);
  return BigInt(amountScaled.toFixed(0));
};

/**
 * Convert any value expressed in nanoMassa back to Massa.
 * This function takes an input value in nanoMassa and returns the equivalent value in Massa.
 *
 * @remarks
 * Massa is a unit of currency and nanoMassa is a sub-unit, where 1 Massa equals 10^9 nanoMassa.
 * This function uses the BigNumber library to perform calculations with arbitrary precision.
 *
 * @param amountInNanoMassa - The amount to convert, expressed in nanoMassa. Can be a number, string, BigNumber, or bigint.
 *
 * @returns The amount expressed in Massa, as a BigNumber.
 *
 * @example
 * ```
 * const massa = toMAS(1000000000n); // returns new BigNumber(1)
 * ```
 */
export const toMAS = (
  amountInNanoMassa: number | string | BigNumber | bigint,
): BigNumber => {
  const amount = new BigNumber(amountInNanoMassa.toString());
  const scaleFactor = new BigNumber(10).pow(
    new BigNumber(MASSA_SCALING_FACTOR),
  );
  const amountScaled = amount.dividedBy(scaleFactor);
  return new BigNumber(amountScaled.toFixed(MASSA_SCALING_FACTOR));
};

/**
 * MassaUnits contains constants representing different magnitudes of the Massa currency.
 * This object provides useful constants for working with Massa and its sub-units.
 *
 * @remarks
 * MassaUnits contains the following properties:
 * - oneMassa: Represents 1 Massa in nanoMassa (10^9 nanoMassa).
 * - mMassa: Represents 1 milliMassa in nanoMassa (10^6 nanoMassa).
 * - uMassa: Represents 1 microMassa in nanoMassa (10^3 nanoMassa).
 *
 * @example
 * ```
 * const oneMassaInNano = MassaUnits.oneMassa; // returns 1000000000n
 * const oneMilliMassaInNano = MassaUnits.mMassa; // returns 1000000n
 * const oneMicroMassaInNano = MassaUnits.uMassa; // returns 1000n
 * ```
 */
export const MassaUnits = {
  oneMassa: BigInt(10 ** 9),
  mMassa: BigInt(10 ** 6),
  uMassa: BigInt(10 ** 3),
};
