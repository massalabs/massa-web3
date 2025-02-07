import { Args, bytesToStr, U256, U8 } from '../basicElements'
import { Operation } from '../operation'
import { CallSCOptions, ReadSCOptions, SmartContract } from '../smartContracts'
import { ErrorDataEntryNotFound } from '../errors/dataEntryNotFound'

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

  async name(): Promise<string> {
    if (this._name) {
      return this._name
    }
    const res = await this.provider.readStorage(this.address, ['NAME'], true)
    if (!res[0]) {
      throw new ErrorDataEntryNotFound({ key: 'NAME', address: this.address })
    }
    return (this._name = bytesToStr(res[0]))
  }

  async symbol(): Promise<string> {
    if (this._symbol) {
      return this._symbol
    }
    const res = await this.provider.readStorage(this.address, ['SYMBOL'], true)
    if (!res[0]) {
      throw new ErrorDataEntryNotFound({ key: 'SYMBOL', address: this.address })
    }
    return (this._symbol = bytesToStr(res[0]))
  }

  async decimals(): Promise<number> {
    if (this._decimals) {
      return this._decimals
    }
    const res = await this.provider.readStorage(
      this.address,
      ['DECIMALS'],
      true
    )
    if (!res[0]) {
      throw new ErrorDataEntryNotFound({
        key: 'DECIMALS',
        address: this.address,
      })
    }
    return (this._decimals = Number(U8.fromBytes(res[0])))
  }

  async totalSupply(final = true): Promise<bigint> {
    const res = await this.provider.readStorage(
      this.address,
      ['TOTAL_SUPPLY'],
      final
    )
    if (!res[0]) {
      throw new ErrorDataEntryNotFound({
        key: 'TOTAL_SUPPLY',
        address: this.address,
      })
    }
    return U256.fromBytes(res[0])
  }

  async balanceOf(address: string, options?: ReadSCOptions): Promise<bigint> {
    const res = await this.read(
      'balanceOf',
      new Args().addString(address),
      options
    )
    return U256.fromBytes(res.value)
  }

  async balancesOf(
    addresses: string[],
    final = true
  ): Promise<
    {
      address: string
      balance: bigint
    }[]
  > {
    const res = await this.provider.readStorage(
      this.address,
      addresses.map((a) => `BALANCE${a}`),
      final
    )

    return res.map((v, i) => ({
      address: addresses[i],
      balance: v ? U256.fromBytes(v) : 0n,
    }))
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
