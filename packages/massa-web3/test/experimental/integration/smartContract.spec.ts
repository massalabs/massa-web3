import { Account } from '../../../src/experimental/account'
import { ByteCode } from '../../../src/experimental/smartContract'
import 'dotenv/config'
import { JsonRPCClient } from '../../../src/experimental/jsonRPCClient'

describe('Smart Contract', () => {
  let client: JsonRPCClient
  let account: Account

  beforeAll(async () => {
    client = new JsonRPCClient('https://buildnet.massa.net/api/v2')
    account = await Account.fromEnv()
  })

  test('execute', async () => {
    const byteCode = new Uint8Array([1, 2, 3, 4])
    const opts = {
      periodToLive: 2,
      coins: 3n,
      maxGas: 4n,
    }
    const contract = await ByteCode.execute(
      client,
      account.privateKey,
      byteCode,
      opts
    )
    expect(await contract.getSpeculativeEvents()).toHaveLength(1)
  }, 61000)

  test('not enough fee', async () => {
    const byteCode = new Uint8Array([1, 2, 3, 4])
    const opts = {
      fee: 1n,
      periodToLive: 2,
      coins: 3n,
      maxGas: 4n,
    }

    expect(
      ByteCode.execute(client, account.privateKey, byteCode, opts)
    ).rejects.toThrow(
      'Bad request: fee is too low provided: 0.000000001 , minimal_fees required: 0.01'
    )
  })
})
