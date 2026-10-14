import { Account, Args, Call, Multicall, parseMas, WETHb } from '../../src'
import { provider, publicProvider } from './setup'

describe('Multicall tests', () => {
  // to uncomment when https://github.com/massalabs/massa/issues/4913 is done

  // test('execute multicall Read', async () => {
  //   const multicall = new Multicall(publicProvider)

  //   const token = new WETHbt(publicProvider)
  //   const calls = [
  //     {
  //       targetContract: token.address,
  //       targetFunc: 'symbol',
  //     },
  //     {
  //       targetContract: token.address,
  //       targetFunc: 'decimals',
  //     },
  //     {
  //       targetContract: token.address,
  //       targetFunc: 'name',
  //     },
  //   ]

  //   const res = await multicall.executeReadOnly(calls)
  //   expect(res).toHaveLength(3)
  //   expect(bytesToStr(res[0])).toBe(await token.symbol())
  //   expect(Number(U8.fromBytes(res[1]))).toBe(await token.decimals())
  //   expect(bytesToStr(res[2])).toBe(await token.name())
  // })

  test('execute multicall write', async () => {
    const multicall = new Multicall(provider)

    const token = await WETHb.fromProvider(publicProvider)

    // A new spender for each run, so that concurrent runs do not change its allowance
    const spender = (await Account.generate()).address.toString()

    const calls: Call[] = [
      {
        targetContract: token.address,
        targetFunc: 'symbol',
      },
      {
        targetContract: token.address,
        targetFunc: 'increaseAllowance',
        callData: new Args().addString(spender).addU256(1n),
        coins: parseMas('0.025'),
      },
      {
        targetContract: token.address,
        targetFunc: 'name',
      },
    ]

    const operation = await multicall.execute(calls)
    await operation.waitSpeculativeExecution()

    const newAllowance = await token.allowance(provider.address, spender)
    expect(newAllowance).toBe(1n)
  })
})
