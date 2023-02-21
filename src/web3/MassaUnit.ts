import { toMAS, fromMAS } from '../utils/converters';
import BigNumber from 'bignumber.js';

export class MassaUnit {
  // unscaled original value
  protected value: BigNumber;

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
}
