import BigNumber from 'bignumber.js';
/**
 * Convert any value expressed in Massa back to nanoMassa
 * @param amountInMassa any amount in Massa
 * @returns bigint representing the amount expressed in nanoMassa
 */
export declare const fromMAS: (amountInMassa: number | string | BigNumber | bigint) => bigint;
/**
 * Convert any value expressed in nano Massa back to Massa
 * @param amountInNanoMassa any amount in nanoMassa
 * @returns BigNumber representing the amount expressed in Massa
 */
export declare const toMAS: (amountInNanoMassa: number | string | BigNumber | bigint) => BigNumber;
export declare const MassaUnits: {
    oneMassa: bigint;
    mMassa: bigint;
    uMassa: bigint;
};
