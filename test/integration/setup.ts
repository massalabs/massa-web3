import 'dotenv/config'
import { Account } from '../../src/account'
import { Mas } from '../../src/basicElements'
import { JsonRpcPublicProvider, JsonRpcProvider } from '../../src/provider'
import { GrpcProvider, GrpcPublicProvider } from '../../src/grpc'
import { PublicApiUrl } from '../../src/utils/networks'

import { XMLHttpRequest } from 'xhr2'
global.XMLHttpRequest = XMLHttpRequest

export let account: Account
export let provider: JsonRpcProvider
export let publicProvider: JsonRpcPublicProvider
export let mainnetProvider: JsonRpcProvider
export let grpcProvider: GrpcProvider
export let grpcPublicProvider: GrpcPublicProvider

// Buildnet JSON-RPC URL. BUILDNET_RPC_URL can pin a single node: the public endpoint load-balances
// between several nodes, so a read that follows a write may hit a node that has not executed it yet.
export const buildnetRpcUrl =
  process.env.BUILDNET_RPC_URL || PublicApiUrl.Buildnet

jest.setTimeout(120_000)

beforeAll(async () => {
  account = await Account.fromEnv()
  provider = JsonRpcProvider.fromRPCUrl(buildnetRpcUrl, account)
  grpcProvider = GrpcProvider.buildnet(account)
  grpcPublicProvider = GrpcProvider.buildnet()
  publicProvider = JsonRpcProvider.fromRPCUrl(buildnetRpcUrl)
  mainnetProvider = JsonRpcProvider.mainnet(account)

  // eslint-disable-next-line no-console
  console.log(
    'Using account:',
    provider.address,
    'with balance:',
    Mas.toString(await provider.balance())
  )
})
