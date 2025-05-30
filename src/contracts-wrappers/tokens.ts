/* eslint-disable @typescript-eslint/naming-convention */
import { Args, StorageCost, U256 } from '../basicElements'
import { Operation } from '../operation'
import { Provider, PublicProvider } from '../provider'
import { isProvider } from '../provider/helpers'
import { CHAIN_ID, Network } from '../utils'
import { MRC20 } from './token'

export const MAINNET_TOKENS = {
  USDCe: 'AS1hCJXjndR4c9vekLWsXGnrdigp4AaZ7uYG3UKFzzKnWVsrNLPJ',
  USDTb: 'AS12LKs9txoSSy8JgFJgV96m8k5z9pgzjYMYSshwN67mFVuj3bdUV',
  DAIe: 'AS1ZGF1upwp9kPRvDKLxFAKRebgg7b3RWDnhgV7VvdZkZsUL7Nuv',
  WETHe: 'AS124vf3YfAJCSCQVYKczzuWWpXrximFpbTmX4rheLs5uNSftiiRY',
  WETHb: 'AS125oPLYRTtfVjpWisPZVTLjBhCFfQ1jDsi75XNtRm1NZux54eCj',
  PUR: 'AS133eqPPaPttJ6hJnk3sfoG5cjFFqBDi1VGxdo2wzWkq8AfZnan',
  WMAS: 'AS12U4TZfNK7qoLyEERBBRDMu8nm5MKoRzPXDXans4v9wdATZedz9',
  WBTCe: 'AS12fr54YtBY575Dfhtt7yftpT8KXgXb1ia5Pn1LofoLFLf9WcjGL',
}

export const BUILDNET_TOKENS = {
  DAIs: 'AS12LpYyAjYRJfYhyu7fkrS224gMdvFHVEeVWoeHZzMdhis7UZ3Eb',
  WETHs: 'AS1gt69gqYD92dqPyE6DBRJ7KjpnQHqFzFs2YCkBcSnuxX5bGhBC',
  USDCs: 'AS12k8viVmqPtRuXzCm6rKXjLgpQWqbuMjc37YHhB452KSUUb9FgL',
  USDTbt: 'AS12ix1Qfpue7BB8q6mWVtjNdNE9UV3x4MaUo7WhdUubov8sJ3CuP',
  WETHbt: 'AS12RmCXTA9NZaTBUBnRJuH66AGNmtEfEoqXKxLdmrTybS6GFJPFs',
  WMAS: 'AS12FW5Rs5YN2zdpEnqwj4iHUUPt9R4Eqjq2qtpJFNKW3mn33RuLU',
  WBTCs: 'AS1ZXy3nvqXAMm2w6viAg7frte6cZfJM8hoMvWf4KoKDzvLzYKqE',
}

export function checkNetwork(
  provider: PublicProvider | Provider,
  isMainnet: boolean
): void {
  provider.networkInfos().then((network: Network) => {
    if (isMainnet && network.chainId !== CHAIN_ID.Mainnet) {
      console.warn('This contract is only available on mainnet')
    } else if (!isMainnet && network.chainId === CHAIN_ID.Mainnet) {
      console.warn('This contract is only available on buildnet')
    }
  })
}

///////////////// MAINNET TOKENS //////////////////////

export class USDCe extends MRC20 {
  constructor(public provider: Provider | PublicProvider) {
    checkNetwork(provider, true)
    super(provider, MAINNET_TOKENS.USDCe)
  }
}

export class USDTb extends MRC20 {
  constructor(public provider: Provider | PublicProvider) {
    checkNetwork(provider, true)
    super(provider, MAINNET_TOKENS.USDTb)
  }
}

export class DAIe extends MRC20 {
  constructor(public provider: Provider | PublicProvider) {
    checkNetwork(provider, true)
    super(provider, MAINNET_TOKENS.DAIe)
  }
}

export class WETHe extends MRC20 {
  constructor(public provider: Provider | PublicProvider) {
    checkNetwork(provider, true)
    super(provider, MAINNET_TOKENS.WETHe)
  }
}

export class WETHb extends MRC20 {
  constructor(public provider: Provider | PublicProvider) {
    checkNetwork(provider, true)
    super(provider, MAINNET_TOKENS.WETHb)
  }
}

export class PUR extends MRC20 {
  constructor(public provider: Provider | PublicProvider) {
    checkNetwork(provider, true)
    super(provider, MAINNET_TOKENS.PUR)
  }
}

///////////////// BUILDNET TOKENS //////////////////////

export class DAIs extends MRC20 {
  constructor(public provider: Provider | PublicProvider) {
    checkNetwork(provider, false)
    super(provider, BUILDNET_TOKENS.DAIs)
  }
}

export class WETHs extends MRC20 {
  constructor(public provider: Provider | PublicProvider) {
    checkNetwork(provider, false)
    super(provider, BUILDNET_TOKENS.WETHs)
  }
}

export class USDCs extends MRC20 {
  constructor(public provider: Provider | PublicProvider) {
    checkNetwork(provider, false)
    super(provider, BUILDNET_TOKENS.USDCs)
  }
}

export class USDTbt extends MRC20 {
  constructor(public provider: Provider | PublicProvider) {
    checkNetwork(provider, false)
    super(provider, BUILDNET_TOKENS.USDTbt)
  }
}

export class WETHbt extends MRC20 {
  constructor(public provider: Provider | PublicProvider) {
    checkNetwork(provider, false)
    super(provider, BUILDNET_TOKENS.WETHbt)
  }
}

///////////////// MAINNET + BUILDNET TOKENS //////////////////////

export class WBTC extends MRC20 {
  constructor(
    public provider: Provider | PublicProvider,
    chainId = CHAIN_ID.Mainnet
  ) {
    checkNetwork(provider, chainId === CHAIN_ID.Mainnet)
    if (chainId === CHAIN_ID.Mainnet) {
      super(provider, MAINNET_TOKENS.WBTCe)
    } else if (chainId === CHAIN_ID.Buildnet) {
      super(provider, BUILDNET_TOKENS.WBTCs)
    }
    throw new Error(`Unsupported network id ${chainId} for WMAS`)
  }

  static buildnet(provider: Provider | PublicProvider): WBTC {
    checkNetwork(provider, false)
    return new WBTC(provider, CHAIN_ID.Buildnet)
  }

  static mainnet(provider: Provider | PublicProvider): WBTC {
    checkNetwork(provider, true)
    return new WBTC(provider, CHAIN_ID.Mainnet)
  }

  // Automatically detect the network and return the appropriate WBTC instance
  static async fromProvider(
    provider: Provider | PublicProvider
  ): Promise<WBTC> {
    const { chainId } = await provider.networkInfos()
    return new WBTC(provider, chainId)
  }
}

export class WMAS extends MRC20 {
  constructor(
    public provider: Provider | PublicProvider,
    chainId = CHAIN_ID.Mainnet
  ) {
    checkNetwork(provider, chainId === CHAIN_ID.Mainnet)
    if (chainId === CHAIN_ID.Mainnet) {
      super(provider, MAINNET_TOKENS.WMAS)
    } else if (chainId === CHAIN_ID.Buildnet) {
      super(provider, BUILDNET_TOKENS.WMAS)
    }
    throw new Error(`Unsupported network id ${chainId} for WMAS`)
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
