import 'mocha';
import { expect } from 'chai';
import { MassaAmount, MASSA_UNIT } from '../src';

describe('MassaAmount Class', () => {
  it('classical unit test conversion cases', () => {
    const amount = new MassaAmount(1, MASSA_UNIT.MASSA);
    expect(amount.toString()).to.equal('1 MASSA');

    const milliMassa = amount.toUnit(MASSA_UNIT.MILLI_MASSA);
    expect(milliMassa.toString()).to.equal('1000 MILLI_MASSA');

    const microMassa = amount.toUnit(MASSA_UNIT.MICRO_MASSA);
    expect(microMassa.toString()).to.equal('1000000 MICRO_MASSA');

    const nanoMassa = amount.toUnit(MASSA_UNIT.NANO_MASSA);
    expect(nanoMassa.toString()).to.equal('1000000000 NANO_MASSA');
  });

  it('test conversion cases with lower than accepted decimal precision', () => {
    // amount has precision < 9 dp.
    const amount = new MassaAmount(1.523, MASSA_UNIT.MASSA);
    expect(amount.toString()).to.equal('1.523 MASSA');

    const milliMassa = amount.toUnit(MASSA_UNIT.MILLI_MASSA);
    expect(milliMassa.toString()).to.equal('1523 MILLI_MASSA');

    const microMassa = amount.toUnit(MASSA_UNIT.MICRO_MASSA);
    expect(microMassa.toString()).to.equal('1523000 MICRO_MASSA');

    const nanoMassa = amount.toUnit(MASSA_UNIT.NANO_MASSA);
    expect(nanoMassa.toString()).to.equal('1523000000 NANO_MASSA');
  });

  it('test conversion cases with higher than accepted decimal precision', () => {
    // amount has precision > 9 dp.
    const amount = new MassaAmount(1.5238762359, MASSA_UNIT.MASSA);
    expect(amount.toString()).to.equal('1.523876236 MASSA');

    const milliMassa = amount.toUnit(MASSA_UNIT.MILLI_MASSA);
    expect(milliMassa.toString()).to.equal('1523.876236 MILLI_MASSA');

    const microMassa = amount.toUnit(MASSA_UNIT.MICRO_MASSA);
    expect(microMassa.toString()).to.equal('1523876.236 MICRO_MASSA');

    const nanoMassa = amount.toUnit(MASSA_UNIT.NANO_MASSA);
    expect(nanoMassa.toString()).to.equal('1523876236 NANO_MASSA');

    const vNano = new MassaAmount(1.35238762359, MASSA_UNIT.NANO_MASSA);
    expect(vNano.toString()).to.equal('1 NANO_MASSA');

    const vMicro = new MassaAmount(1.35238762359, MASSA_UNIT.MICRO_MASSA);
    expect(vMicro.toUnit(MASSA_UNIT.NANO_MASSA).toString()).to.equal(
      '1352 NANO_MASSA',
    );

    const vMilli = new MassaAmount(1.35238762359, MASSA_UNIT.MILLI_MASSA);
    expect(vMilli.toUnit(MASSA_UNIT.NANO_MASSA).toString()).to.equal(
      '1352388 NANO_MASSA',
    );

    const v = new MassaAmount(1.35238762359, MASSA_UNIT.MASSA);
    expect(v.toUnit(MASSA_UNIT.NANO_MASSA).toString()).to.equal(
      '1352387624 NANO_MASSA',
    );
  });

  it('test conversion to rolls', () => {
    const rolls1 = new MassaAmount(1.52, MASSA_UNIT.MASSA);
    expect(rolls1.toRolls().toString()).to.equal('2 MASSA');

    const rolls2 = new MassaAmount(1.1, MASSA_UNIT.MASSA);
    expect(rolls2.toRolls().toString()).to.equal('1 MASSA');

    const rolls3 = new MassaAmount(1.9999999, MASSA_UNIT.MASSA);
    expect(rolls3.toRolls().toString()).to.equal('2 MASSA');

    const rolls4 = new MassaAmount(0, MASSA_UNIT.MASSA);
    expect(rolls4.toRolls().toString()).to.equal('0 MASSA');

    const rolls5 = new MassaAmount(1523876236, MASSA_UNIT.NANO_MASSA);
    expect(rolls5.toRolls().toString()).to.equal('2 MASSA');
  });

  it('test conversion to gas', () => {
    const gas1 = new MassaAmount(1.52, MASSA_UNIT.MASSA);
    expect(gas1.toGas().toString()).to.equal('2 MASSA');

    const gas2 = new MassaAmount(2_500_000, MASSA_UNIT.MASSA);
    expect(gas2.toGas().toString()).to.equal('2500000 MASSA');

    const gas3 = new MassaAmount(2500000, MASSA_UNIT.NANO_MASSA);
    expect(gas3.toGas().toString()).to.equal('2500000 NANO_MASSA');

    const gas4 = new MassaAmount(2500000897.7547, MASSA_UNIT.NANO_MASSA);
    expect(gas4.toGas().toString()).to.equal('2500000898 NANO_MASSA');
  });
});
