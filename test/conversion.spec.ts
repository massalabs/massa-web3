import 'mocha';
import { expect } from 'chai';
import { MassaAmount, MassaUnit } from '../src';

describe('MassaAmount Class', () => {
  it('classical unit test conversion cases', () => {
    const amount = new MassaAmount(1, MassaUnit.Massa);
    expect(amount.toString()).to.equal('1 MASSA');


    const nanoMassa = amount.toUnit(MassaUnit.NanoMassa);
    expect(nanoMassa.toString()).to.equal('1000000000 nMASSA');
  });

  it('test conversion cases with lower than accepted decimal precision', () => {
    // amount has precision < 9 dp.
    const amount = new MassaAmount(1.523, MassaUnit.Massa);
    expect(amount.toString()).to.equal('1.523 MASSA');

    const nanoMassa = amount.toUnit(MassaUnit.NanoMassa);
    expect(nanoMassa.toString()).to.equal('1523000000 nMASSA');
  });

  it('test conversion cases with higher than accepted decimal precision', () => {
    // amount has precision > 9 dp.
    const amount = new MassaAmount(1.5238762359, MassaUnit.Massa);
    expect(amount.toString()).to.equal('1.523876236 MASSA');

    const nanoMassa = amount.toUnit(MassaUnit.NanoMassa);
    expect(nanoMassa.toString()).to.equal('1523876236 nMASSA');

    const vNano = new MassaAmount(1.35238762359, MassaUnit.NanoMassa);
    expect(vNano.toString()).to.equal('1 nMASSA');

    const v = new MassaAmount(1.35238762359, MassaUnit.Massa);
    expect(v.toUnit(MassaUnit.NanoMassa).toString()).to.equal(
      '1352387624 nMASSA',
    );
  });

  it('test conversion to rolls', () => {
    const rolls1 = new MassaAmount(1.52, MassaUnit.Massa);
    expect(rolls1.toRolls().toString()).to.equal('2 MASSA');

    const rolls2 = new MassaAmount(1.1, MassaUnit.Massa);
    expect(rolls2.toRolls().toString()).to.equal('1 MASSA');

    const rolls3 = new MassaAmount(1.9999999, MassaUnit.Massa);
    expect(rolls3.toRolls().toString()).to.equal('2 MASSA');

    const rolls4 = new MassaAmount(0, MassaUnit.Massa);
    expect(rolls4.toRolls().toString()).to.equal('0 MASSA');

    const rolls5 = new MassaAmount(1523876236, MassaUnit.NanoMassa);
    expect(rolls5.toRolls().toString()).to.equal('2 MASSA');
  });

  it('test conversion to gas', () => {
    const gas1 = new MassaAmount(1.52, MassaUnit.Massa);
    expect(gas1.toGas().toString()).to.equal('2 MASSA');

    const gas2 = new MassaAmount(2_500_000, MassaUnit.Massa);
    expect(gas2.toGas().toString()).to.equal('2500000 MASSA');

    const gas3 = new MassaAmount(2500000, MassaUnit.NanoMassa);
    expect(gas3.toGas().toString()).to.equal('2500000 nMASSA');

    const gas4 = new MassaAmount(2500000897.7547, MassaUnit.NanoMassa);
    expect(gas4.toGas().toString()).to.equal('2500000898 nMASSA');
  });
});
