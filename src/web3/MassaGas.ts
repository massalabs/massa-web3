import BigNumber from 'bignumber.js';
import { MassaUnit } from './MassaUnit';

export class MassaGas extends MassaUnit {
  constructor(value: BigNumber | number | string) {
    super(value);
  }

  public toNumber(): number {
    return parseInt(this.value.toFixed(0));
  }

  public static fromValue(value: number | string): MassaGas {
    return new MassaGas(value);
  }
}
