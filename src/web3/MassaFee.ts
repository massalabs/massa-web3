import { toMAS, fromMAS } from '../utils/converters';
import BigNumber from 'bignumber.js';
import { MassaUnit } from './MassaUnit';

export class MassaFee extends MassaUnit {
  constructor(value: BigNumber | number | string) {
    super(value);
  }

  public static fromValue(value: number | string): MassaFee {
    return new MassaFee(fromMAS(value));
  }
}
