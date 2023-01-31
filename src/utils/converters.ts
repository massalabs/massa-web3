import BigNumber from "bignumber.js";

const MASSA_SCALING_FACTOR = 9;

export const toMAS = (inputAmount: BigNumber | number | string): number => {
    const amount = new BigNumber(inputAmount);
    const scaleFactor = (new BigNumber(10)).pow(new BigNumber(MASSA_SCALING_FACTOR));
    const amountScaled = amount.times(scaleFactor);
    return parseInt(amountScaled.toFixed(0));
};

export const fromMAS = (inputAmount: number | string): BigNumber => {
    const amount = new BigNumber(inputAmount);
    const scaleFactor = (new BigNumber(10)).pow(new BigNumber(MASSA_SCALING_FACTOR));
    const amountScaled = amount.dividedBy(scaleFactor);
    return amountScaled;
};
