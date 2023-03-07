import 'mocha';
import { expect } from 'chai';
import { fromMAS, toMAS } from '../src';
import BigNumber from 'bignumber.js';

describe('conversion tests', () => {
  it('test conversions to and from (all ranges and formats)', () => {
    const nanoMassa1 = fromMAS('1.5234');
    expect(nanoMassa1.toString()).to.equal('1523400000');
    const massa1 = toMAS(nanoMassa1);
    expect(massa1.toString()).to.equal('1.5234');

    const nanoMassa2 = fromMAS(1.5234);
    expect(nanoMassa2.toString()).to.equal('1523400000');
    const massa2 = toMAS(nanoMassa2);
    expect(massa2.toString()).to.equal('1.5234');

    const nanoMassa3 = fromMAS(new BigNumber('1.5234'));
    expect(nanoMassa3.toString()).to.equal('1523400000');
    const massa3 = toMAS(nanoMassa3);
    expect(massa3.toString()).to.equal('1.5234');

    const nanoMassa4 = fromMAS(BigInt(2));
    expect(nanoMassa4.toString()).to.equal('2000000000');
    const massa4 = toMAS(nanoMassa4);
    expect(massa4.toString()).to.equal('2');

    const nanoMassa5 = fromMAS('1.1234567899');
    expect(nanoMassa5.toString()).to.equal('1123456790');
    const massa5 = toMAS(nanoMassa5);
    expect(massa5.toString()).to.equal('1.12345679');
  });
});
