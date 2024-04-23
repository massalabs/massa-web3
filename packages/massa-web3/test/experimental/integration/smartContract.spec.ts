import { Account } from '../../../src/experimental/account'
import { ByteCode } from '../../../src/experimental/smartContract'
import 'dotenv/config'
import { JsonRPCClient } from '../../../src/experimental/jsonRPCClient'

describe('Basic use cases', () => {
  test('Smart Contract - execute', async () => {
    const account = await Account.fromEnv()

    const client = new JsonRPCClient('https://buildnet.massa.net/api/v2')

    const byteCode = new Uint8Array([1, 2, 3, 4])
    const opts = {
      fee: 1n,
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
})
