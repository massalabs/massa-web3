import { Account } from '../../src/experimental/account'
import { ByteCode } from '../../src/experimental/smartContract'
import { PublicAPI, Transport } from '../../src/experimental/publicAPI'
import 'dotenv/config'

describe('Basic use cases', () => {
  test('Smart Contract - execute', async () => {
    const account = await Account.fromEnv()
    const client = new PublicAPI(
      Transport.https,
      'buildnet.massa.net',
      443,
      '/api/v2'
    )
    const byteCode = new Uint8Array([1, 2, 3, 4])
    const opts = {
      fee: 1,
      periodToLive: 2,
      coins: 3,
      maxGas: 4,
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
