import BigNumber from 'bignumber.js';

export enum MassaUnit {
  Massa,
  NanoMassa, // 10-9
}

const NANO = 9;

export class MassaAmount {
  private value: BigNumber;
  private unit: MassaUnit;

  constructor(value: BigNumber | number | string, unit: MassaUnit) {
    switch (unit) {
      case MassaUnit.Massa:
        this.value = new BigNumber(new BigNumber(value).toFixed(NANO));
        break;
      case MassaUnit.NanoMassa:
        this.value = new BigNumber(new BigNumber(value).toFixed(0));
        break;
    }
    this.unit = unit;
  }

  public getValue(): BigNumber {
    return this.value;
  }

  public getUnit(): MassaUnit {
    return this.unit;
  }

  public toRolls(): MassaAmount {
    const valueInMassa = this.toUnit(MassaUnit.Massa);
    return new MassaAmount(valueInMassa.value.toFixed(0), MassaUnit.Massa);
  }

  public toGas(): MassaAmount {
    return new MassaAmount(this.value.toFixed(0), this.unit);
  }

  public toCoins(): MassaAmount {
    return this.toUnit(MassaUnit.NanoMassa);
  }

  public toString(): string {
    let outputUnit = '';
    switch (this.unit) {
      case MassaUnit.Massa:
        outputUnit = "MASSA";
        break;
      case MassaUnit.NanoMassa:
        outputUnit = "nMASSA";
        break;
    }
    return `${this.value.toFixed()} ${outputUnit}`;
  }

  public toUnit(targetUnit: MassaUnit): MassaAmount {
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
