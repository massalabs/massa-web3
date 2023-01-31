
import { toMAS, fromMAS } from "../utils/converters";
import BigNumber from "bignumber.js";

export class MassaCoin {
    // unscaled original value
    private value: BigNumber;

    constructor(value: BigNumber | number | string) {
        this.value = new BigNumber(value);
        this.toValue = this.toValue.bind(this);
        this.rawValue = this.rawValue.bind(this);
    }

    public toValue(): number {
        return toMAS(this.value);
    }

    public rawValue(): BigNumber {
        return this.value;
    }

    public static fromValue(value: number | string): MassaCoin {
        return new MassaCoin(fromMAS(value));
    }
}