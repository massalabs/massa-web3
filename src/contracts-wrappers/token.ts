import { Args, U256 } from '../basicElements'
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
  // TODO: Implement the rest of the functions
}
