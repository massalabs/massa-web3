import { Account } from '../../src/experimental/account'
import { AccountOperation } from '../../src/experimental/accountOperation'
import { OperationStatus } from '../../src/experimental/basicElements'
import { PublicAPI, Transport } from '../../src/experimental/publicAPI'
import 'dotenv/config'

describe('Basic use cases', () => {
  test('AccountOperation - transfer', async () => {
    const account = await Account.fromEnv()
    const client = new PublicAPI(
      Transport.https,
      'buildnet.massa.net',
      443,
      '/api/v2'
    )
    const accountOperation = new AccountOperation(account, client)
    const transfer = await accountOperation.transfer(
      'AU1wN8rn4SkwYSTDF3dHFY4U28KtsqKL1NnEjDZhHnHEy6cEQm53',
      1
    )
    expect(await transfer.getStatus()).toBe(OperationStatus.NotFound)
  })
})
