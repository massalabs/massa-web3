import BigNumber from 'bignumber.js';
import { MassaUnit } from './MassaUnit';

export class MassaRoll extends MassaUnit {
  constructor(value: BigNumber | number | string) {
    super(value);
  }

  public toNumber(): number {
    return parseInt(this.value.toFixed(0));
  }

  public static fromValue(value: number | string): MassaRoll {
    return new MassaRoll(value);
  }
}
