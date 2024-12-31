import 'dotenv/config'
import { Account } from '../../src/account'
import { Mas } from '../../src/basicElements'
import { JsonRpcPublicProvider, JsonRpcProvider } from '../../src/provider'

export let account: Account
export let provider: JsonRpcProvider
export let publicProvider: JsonRpcPublicProvider
export let mainnetProvider: JsonRpcProvider

jest.setTimeout(120_000)

beforeAll(async () => {
  account = await Account.fromEnv()
  provider = JsonRpcProvider.buildnet(account)
  publicProvider = JsonRpcProvider.buildnet()
  mainnetProvider = JsonRpcProvider.mainnet(account)

  // eslint-disable-next-line no-console
  console.log(
    'Using account:',
    provider.address,
    'with balance:',
    Mas.toString(await provider.balance())
  )
})
