import BigNumber from 'bignumber.js';

export enum MASSA_UNIT {
  MASSA,
  MILLI_MASSA, // 10-3
  MICRO_MASSA, // 10-6
  NANO_MASSA, // 10-9
}

// smallest massa unit
const MASSA_SCALING_FACTOR = 9;

export class MassaAmount {
  private value: BigNumber;
  private unit: MASSA_UNIT;

  constructor(value: BigNumber | number | string, unit: MASSA_UNIT) {
    // truncate value to smallest massa unit
    this.value = new BigNumber(
      new BigNumber(value).toFixed(MASSA_SCALING_FACTOR),
    );
    this.unit = unit;
  }

  public getValue(): BigNumber {
    return this.value;
  }

  public getUnit(): MASSA_UNIT {
    return this.unit;
  }

  public toRolls(): MassaAmount {
    const valueInMassa = this.toUnit(MASSA_UNIT.MASSA);
    return new MassaAmount(valueInMassa.value.toFixed(0), MASSA_UNIT.MASSA);
  }

  public toGas(): MassaAmount {
    return new MassaAmount(this.value.toFixed(0), this.unit);
  }

  public toCoins(): MassaAmount {
    return this.toUnit(MASSA_UNIT.NANO_MASSA);
  }

  public toString(): string {
    return `${this.value.toFixed()} ${MASSA_UNIT[this.unit]}`;
  }

  public toUnit(targetUnit: MASSA_UNIT): MassaAmount {
    if (this.unit === targetUnit) {
      return this;
    }

    const diff = Math.abs(this.unit - targetUnit);

    if (this.unit < targetUnit) {
      // Scale up
      const scale = new BigNumber(10).pow(diff * 3);
      return new MassaAmount(this.value.multipliedBy(scale), targetUnit);
    } else {
      // Scale down
      const scale = new BigNumber(10).pow(diff * 3);
      return new MassaAmount(this.value.dividedBy(scale), targetUnit);
    }
  }
}
