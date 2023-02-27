import BigNumber from 'bignumber.js';

export enum MASSA_UNIT {
  MASSA,
  MILLI_MASSA, // 10-3
  MICRO_MASSA, // 10-6
  NANO_MASSA, // 10-9
}

const MILLI = 3;
const MICRO = 6;
const NANO = 9;

export class MassaAmount {
  private value: BigNumber;
  private unit: MASSA_UNIT;

  constructor(value: BigNumber | number | string, unit: MASSA_UNIT) {
    switch (unit) {
      case MASSA_UNIT.MASSA:
        this.value = new BigNumber(new BigNumber(value).toFixed(NANO));
        break;
      case MASSA_UNIT.MILLI_MASSA:
        this.value = new BigNumber(new BigNumber(value).toFixed(MICRO));
        break;
      case MASSA_UNIT.MICRO_MASSA:
        this.value = new BigNumber(new BigNumber(value).toFixed(MILLI));
        break;
      case MASSA_UNIT.NANO_MASSA:
        this.value = new BigNumber(new BigNumber(value).toFixed(0));
        break;
    }
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
