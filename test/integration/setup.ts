import 'dotenv/config'
import { Account } from '../../src/account'
import { Mas } from '../../src/basicElements'
import { Web3Provider } from '../../src/provider'

export let account: Account
export let provider: Web3Provider

beforeAll(async () => {
  account = await Account.fromEnv()
  provider = Web3Provider.buildnet(account)

  // eslint-disable-next-line no-console
  console.log(
    'Using account:',
    provider.address,
    'with balance:',
    Mas.toString(await provider.balance())
  )
})
