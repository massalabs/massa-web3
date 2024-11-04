import { Args, bytesToStr, U256, U8 } from '../basicElements'
import { Operation } from '../operation'
import { CallSCOptions, ReadSCOptions, SmartContract } from '../smartContracts'

/**
 * @class MRC20
 *
 *
 * Class representing an MRC20 token smart contract.
 * Extends the SmartContract class to provide methods for interacting with an MRC20 token.
 * MRC20 contract is available here: https://github.com/massalabs/massa-standards/blob/main/smart-contracts/assembly/contracts/FT/token.ts
 *
 *  @example
 * ```typescript
 * const token = new MRC20(provider, <tokenAddr>);
 * const balance = await token.balanceOf(<accountAddr>);
 * console.log(`Your balance: ${balance}`);
 *
 * const transferOperation = await token.transfer(<recipientAddr>, BigInt(10000));
 * console.log(`Transfer operation id: ${transferOperation.id}`);
 * ```
 */

export class MRC20 extends SmartContract {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  private _version: string
  // eslint-disable-next-line @typescript-eslint/naming-convention
  private _name: string
  // eslint-disable-next-line @typescript-eslint/naming-convention
  private _symbol: string
  // eslint-disable-next-line @typescript-eslint/naming-convention
  private _decimals: number

  async version(options?: ReadSCOptions): Promise<string> {
    if (this._version) {
      return this._version
    }
    const res = await this.read('version', undefined, options)
    return (this._version = bytesToStr(res.value))
  }

  async name(options?: ReadSCOptions): Promise<string> {
    if (this._name) {
      return this._name
    }
    const res = await this.read('name', undefined, options)
    return (this._name = bytesToStr(res.value))
  }

  async symbol(options?: ReadSCOptions): Promise<string> {
    if (this._symbol) {
      return this._symbol
    }
    const res = await this.read('symbol', undefined, options)
    return (this._symbol = bytesToStr(res.value))
  }

  async decimals(options?: ReadSCOptions): Promise<number> {
    if (this._decimals) {
      return this._decimals
    }
    const res = await this.read('decimals', undefined, options)
    return (this._decimals = Number(U8.fromBytes(res.value)))
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
