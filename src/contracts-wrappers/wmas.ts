import { Args, StorageCost, U256 } from '../basicElements'
import { Operation } from '../operation'
import { Provider, PublicProvider } from '../provider'
import { isProvider } from '../provider/helpers'
import { CHAIN_ID } from '../utils'
import { MRC20 } from './token'
import { TOKENS_CONTRACTS } from './tokens'
import { checkNetwork } from './utils'

export class WMAS extends MRC20 {
  constructor(
    public provider: Provider | PublicProvider,
    chainId = CHAIN_ID.Mainnet
  ) {
    checkNetwork(provider, chainId === CHAIN_ID.Mainnet)
    const address = TOKENS_CONTRACTS.WMAS[chainId.toString()]
    if (!address) {
      throw new Error(`WMAS not available on chain ${chainId}`)
    }
    super(provider, address)
  }

  static buildnet(provider: Provider | PublicProvider): WMAS {
    checkNetwork(provider, false)
    return new WMAS(provider, CHAIN_ID.Buildnet)
  }

  static mainnet(provider: Provider | PublicProvider): WMAS {
    checkNetwork(provider, true)
    return new WMAS(provider)
  }

  // Automatically detect the network and return the appropriate token address
  static async fromProvider(
    provider: Provider | PublicProvider
  ): Promise<WMAS> {
    const { chainId } = await provider.networkInfos()
    return new WMAS(provider, chainId)
  }

  wrap(amount: bigint): Promise<Operation> {
    if (!isProvider(this.provider)) {
      throw new Error('Method not available for PublicProvider')
    }

    // check whether user has already created a balance entry
    const balanceKey = 'BALANCE' + this.provider.address
    const storageVals = this.provider.readStorage(this.address, [balanceKey])
    const storageCost =
      storageVals[0] === null
        ? StorageCost.datastoreEntry(balanceKey, U256.toBytes(0n))
        : 0n

    return this.provider.callSC({
      target: this.address,
      func: 'deposit',
      coins: amount + storageCost,
    })
  }

  unwrap(amount: bigint, recipient = this.address): Promise<Operation> {
    if (!isProvider(this.provider)) {
      throw new Error('Method not available for PublicProvider')
    }

    return this.provider.callSC({
      target: this.address,
      func: 'withdraw',
      parameter: new Args().addU64(amount).addString(recipient),
    })
  }
}
