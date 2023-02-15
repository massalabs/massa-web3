import { toMAS, fromMAS } from "../utils/converters";
import BigNumber from "bignumber.js";

export class MassaCoin {
    // unscaled original value
    private value: BigNumber;

    constructor(value: BigNumber | number | string) {
        this.value = new BigNumber(value);
    }

    public toNumber(): number {
        return toMAS(this.value);
    }

    public rawValue(): BigNumber {
        return this.value;
    }

    public toString(): string {
        return this.rawValue.toString();
    }

    public static fromValue(value: number | string): MassaCoin {
        return new MassaCoin(fromMAS(value));
    }
}
