import { Args, bytesToStr, U256, U8 } from '../basicElements'
import { Operation } from '../operation'
import { CallSCOptions, ReadSCOptions, SmartContract } from '../smartContracts'

export class MRC20 extends SmartContract {
  async version(options?: ReadSCOptions): Promise<string> {
    const res = await this.read('version', undefined, options)
    return bytesToStr(res.value)
  }

  async name(options?: ReadSCOptions): Promise<string> {
    const res = await this.read('name', undefined, options)
    return bytesToStr(res.value)
  }

  async symbol(options?: ReadSCOptions): Promise<string> {
    const res = await this.read('symbol', undefined, options)
    return bytesToStr(res.value)
  }

  async decimals(options?: ReadSCOptions): Promise<number> {
    const res = await this.read('decimals', undefined, options)
    return Number(U8.fromBytes(res.value))
  }

  async totalSupply(options?: ReadSCOptions): Promise<bigint> {
    const res = await this.read('totalSupply', undefined, options)
    return U256.fromBytes(res.value)
  }

  async balanceOf(address: string, options?: ReadSCOptions): Promise<bigint> {
    const res = await this.read(
      'balanceOf',
      new Args().addString(address),
      options
    )

    if (res.value.length === 0) {
      return 0n
    }

    return U256.fromBytes(res.value)
  }

  async transfer(
    to: string,
    amount: bigint,
    options?: CallSCOptions
  ): Promise<Operation> {
    return this.call(
      'transfer',
      new Args().addString(to).addU256(amount),
      options
    )
  }

  async allowance(
    ownerAddress: string,
    spenderAddress: string,
    options?: ReadSCOptions
  ): Promise<bigint> {
    const res = await this.read(
      'allowance',
      new Args().addString(ownerAddress).addString(spenderAddress),
      options
    )

    if (res.value.length === 0) {
      return 0n
    }

    return U256.fromBytes(res.value)
  }

  async increaseAllowance(
    spenderAddress: string,
    amount: bigint,
    options?: CallSCOptions
  ): Promise<Operation> {
    return this.call(
      'increaseAllowance',
      new Args().addString(spenderAddress).addU256(amount),
      options
    )
  }

  async decreaseAllowance(
    spenderAddress: string,
    amount: bigint,
    options?: CallSCOptions
  ): Promise<Operation> {
    return this.call(
      'decreaseAllowance',
      new Args().addString(spenderAddress).addU256(amount),
      options
    )
  }

  async transferFrom(
    spenderAddress: string,
    recipientAddress: string,
    amount: bigint,
    options?: CallSCOptions
  ): Promise<Operation> {
    return this.call(
      'transferFrom',
      new Args()
        .addString(spenderAddress)
        .addString(recipientAddress)
        .addU256(amount),
      options
    )
  }
}
