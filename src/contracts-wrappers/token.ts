import { Args, U256 } from '../basicElements'
import { Operation } from '../operation'
import { ReadSCOptions, SmartContract } from '../smartContracts'

export class MRC20 extends SmartContract {
  async balanceOf(address: string, options?: ReadSCOptions): Promise<bigint> {
    const res = await this.read(
      'balanceOf',
      new Args().addString(address),
      options
    )
    return U256.fromBytes(res.value)
  }

  async transfer(
    to: string,
    amount: bigint,
    options?: ReadSCOptions
  ): Promise<Operation> {
    return this.call(
      'transfer',
      new Args().addString(to).addU256(amount),
      options
    )
  }
  // TODO: Implement the rest of the functions
}
