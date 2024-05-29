import 'dotenv/config'
import { JsonRPCClient } from '../../src/client'
import { Account } from '../../src/account'
import { AccountOperation } from '../../src/accountOperation'
import { Mas } from '../../src/basicElements'

export let client: JsonRPCClient
export let account: Account
export let accountOperation: AccountOperation

beforeAll(async () => {
  client = new JsonRPCClient('https://buildnet.massa.net/api/v2')
  account = await Account.fromEnv()
  accountOperation = new AccountOperation(account, client)
  // eslint-disable-next-line no-console
  console.log(
    'Using account:',
    account.address.toString(),
    'with balance:',
    Mas.toString(await accountOperation.fetchBalance())
  )
})
