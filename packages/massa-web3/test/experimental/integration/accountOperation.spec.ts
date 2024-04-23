import { Account } from '../../../src/experimental/account'
import { AccountOperation } from '../../../src/experimental/accountOperation'
import { OperationStatus } from '../../../src/experimental/basicElements'
import { JsonRPCClient } from '../../../src/experimental/jsonRPCClient'
import 'dotenv/config'

describe('Basic use cases', () => {
  test('AccountOperation - transfer', async () => {
    const account = await Account.fromEnv()

    const client = new JsonRPCClient('https://buildnet.massa.net/api/v2')

    const accountOperation = new AccountOperation(account, client)
    const transfer = await accountOperation.transfer(
      'AU1wN8rn4SkwYSTDF3dHFY4U28KtsqKL1NnEjDZhHnHEy6cEQm53',
      1n
    )
    expect(await transfer.getStatus()).toBe(OperationStatus.NotFound)
  })
})
