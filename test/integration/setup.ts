import 'dotenv/config'
import { Account } from '../../src/account'
import { Mas } from '../../src/basicElements'
import {
  JsonRpcPublicProvider,
  JsonRpcProvider,
  GrpcProvider,
  GrpcPublicProvider,
} from '../../src/provider'

import { XMLHttpRequest } from 'xhr2'
global.XMLHttpRequest = XMLHttpRequest

export let account: Account
export let provider: JsonRpcProvider
export let publicProvider: JsonRpcPublicProvider
export let mainnetProvider: JsonRpcProvider
export let grpcProvider: GrpcProvider
export let grpcPublicProvider: GrpcPublicProvider

jest.setTimeout(120_000)

beforeAll(async () => {
  account = await Account.fromEnv()
  provider = JsonRpcProvider.buildnet(account)
  grpcProvider = GrpcProvider.buildnet(account)
  grpcPublicProvider = GrpcProvider.buildnet()
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
