import BigNumber from 'bignumber.js';

const MASSA_SCALING_FACTOR = 9;

/**
 * Convert any value expressed in Massa back to nanoMassa
 * @param amountInMassa any amount in Massa
 * @returns bigint representing the amount expressed in nanoMassa
 */
export const fromMAS = (amountInMassa: number | string | BigNumber | bigint): bigint => {
  const amount = new BigNumber(amountInMassa.toString());
  const scaleFactor = new BigNumber(10).pow(
    new BigNumber(MASSA_SCALING_FACTOR),
  );
  const amountScaled = amount.times(scaleFactor);
  return BigInt(amountScaled.toFixed(0));
};

/**
 * Convert any value expressed in nano Massa back to Massa
 * @param amountInNanoMassa any amount in nanoMassa
 * @returns BigNumber representing the amount expressed in Massa
 */
export const toMAS = (amountInNanoMassa: number | string| BigNumber | bigint): BigNumber => {
  const amount = new BigNumber(amountInNanoMassa.toString());
  const scaleFactor = new BigNumber(10).pow(
    new BigNumber(MASSA_SCALING_FACTOR),
  );
  const amountScaled = amount.dividedBy(scaleFactor);
  return new BigNumber(amountScaled.toFixed(MASSA_SCALING_FACTOR));
};

export const MassaUnits = {
  oneMassa: BigInt(10**9),
  mMassa: BigInt(10**6),
  uMassa: BigInt(10**3)
};