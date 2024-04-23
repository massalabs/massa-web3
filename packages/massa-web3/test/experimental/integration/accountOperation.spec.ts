import { Account } from '../../../src/experimental/account'
import { AccountOperation } from '../../../src/experimental/accountOperation'
import { OperationStatus } from '../../../src/experimental/basicElements'
import { JsonRPCClient } from '../../../src/experimental/jsonRPCClient'
import 'dotenv/config'

describe('AccountOperation tests', () => {
  let client: JsonRPCClient
  let account: Account
  let accountOperation: AccountOperation

  beforeAll(async () => {
    client = new JsonRPCClient('https://buildnet.massa.net/api/v2')
    account = await Account.fromEnv()
    accountOperation = new AccountOperation(account, client)
  })

  test('transfer', async () => {
    const transfer = await accountOperation.transfer(
      'AU1wN8rn4SkwYSTDF3dHFY4U28KtsqKL1NnEjDZhHnHEy6cEQm53',
      1n
    )
    expect(await transfer.getStatus()).toBe(OperationStatus.NotFound)
  })

  test('not enough fee', async () => {
    expect(
      accountOperation.transfer(
        'AU1wN8rn4SkwYSTDF3dHFY4U28KtsqKL1NnEjDZhHnHEy6cEQm53',
        1n,
        { fee: 1n }
      )
    ).rejects.toThrow(
      'Bad request: fee is too low provided: 0.000000001 , minimal_fees required: 0.01'
    )
  })
})
