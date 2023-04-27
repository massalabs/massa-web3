import { Args, TypedArrayUnit } from '../src/utils/arguments';
import { expect, it, describe } from '@jest/globals';
import { main } from '../examples/smartContracts/contracts/deployer_code';

describe('smart contract test', () => {
  it('usual use', () => {
    const args = new Args().serialize;
    expect(main(args)).toBe([]);
  });
});