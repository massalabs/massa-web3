/* eslint-disable @typescript-eslint/naming-convention */
import { Provider, PublicProvider } from '../provider'
import { CHAIN_ID } from '../utils'
import { MRC20 } from './token'
import { checkNetwork } from './utils'

// kept for backwards compatibility
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
// kept for backwards compatibility
export const BUILDNET_TOKENS = {
  DAIs: 'AS12LpYyAjYRJfYhyu7fkrS224gMdvFHVEeVWoeHZzMdhis7UZ3Eb',
  WETHs: 'AS1gt69gqYD92dqPyE6DBRJ7KjpnQHqFzFs2YCkBcSnuxX5bGhBC',
  USDCs: 'AS12k8viVmqPtRuXzCm6rKXjLgpQWqbuMjc37YHhB452KSUUb9FgL',
  USDTbt: 'AS12ix1Qfpue7BB8q6mWVtjNdNE9UV3x4MaUo7WhdUubov8sJ3CuP',
  WETHbt: 'AS12RmCXTA9NZaTBUBnRJuH66AGNmtEfEoqXKxLdmrTybS6GFJPFs',
  WMAS: 'AS12FW5Rs5YN2zdpEnqwj4iHUUPt9R4Eqjq2qtpJFNKW3mn33RuLU',
  WBTCs: 'AS1ZXy3nvqXAMm2w6viAg7frte6cZfJM8hoMvWf4KoKDzvLzYKqE',
}

export const TOKENS_CONTRACTS = {
  USDCe: {
    [CHAIN_ID.Mainnet.toString()]:
      'AS1hCJXjndR4c9vekLWsXGnrdigp4AaZ7uYG3UKFzzKnWVsrNLPJ',
    [CHAIN_ID.Buildnet.toString()]:
      'AS12k8viVmqPtRuXzCm6rKXjLgpQWqbuMjc37YHhB452KSUUb9FgL',
  },
  USDTb: {
    [CHAIN_ID.Mainnet.toString()]:
      'AS12LKs9txoSSy8JgFJgV96m8k5z9pgzjYMYSshwN67mFVuj3bdUV',
    [CHAIN_ID.Buildnet.toString()]:
      'AS12ix1Qfpue7BB8q6mWVtjNdNE9UV3x4MaUo7WhdUubov8sJ3CuP',
  },
  DAIe: {
    [CHAIN_ID.Mainnet.toString()]:
      'AS1ZGF1upwp9kPRvDKLxFAKRebgg7b3RWDnhgV7VvdZkZsUL7Nuv',
    [CHAIN_ID.Buildnet.toString()]:
      'AS12LpYyAjYRJfYhyu7fkrS224gMdvFHVEeVWoeHZzMdhis7UZ3Eb',
  },
  WETHe: {
    [CHAIN_ID.Mainnet.toString()]:
      'AS124vf3YfAJCSCQVYKczzuWWpXrximFpbTmX4rheLs5uNSftiiRY',
    [CHAIN_ID.Buildnet.toString()]:
      'AS1gt69gqYD92dqPyE6DBRJ7KjpnQHqFzFs2YCkBcSnuxX5bGhBC',
  },
  WETHb: {
    [CHAIN_ID.Mainnet.toString()]:
      'AS125oPLYRTtfVjpWisPZVTLjBhCFfQ1jDsi75XNtRm1NZux54eCj',
    [CHAIN_ID.Buildnet.toString()]:
      'AS12RmCXTA9NZaTBUBnRJuH66AGNmtEfEoqXKxLdmrTybS6GFJPFs',
  },
  PUR: {
    [CHAIN_ID.Mainnet.toString()]:
      'AS133eqPPaPttJ6hJnk3sfoG5cjFFqBDi1VGxdo2wzWkq8AfZnan',
  },
  POM: {
    [CHAIN_ID.Mainnet.toString()]:
      'AS1nqHKXpnFXqhDExTskXmBbbVpVpUbCQVtNSXLCqUDSUXihdWRq',
  },
  WMAS: {
    [CHAIN_ID.Mainnet.toString()]:
      'AS12U4TZfNK7qoLyEERBBRDMu8nm5MKoRzPXDXans4v9wdATZedz9',
    [CHAIN_ID.Buildnet.toString()]:
      'AS12FW5Rs5YN2zdpEnqwj4iHUUPt9R4Eqjq2qtpJFNKW3mn33RuLU',
  },
  WBTCe: {
    [CHAIN_ID.Mainnet.toString()]:
      'AS12fr54YtBY575Dfhtt7yftpT8KXgXb1ia5Pn1LofoLFLf9WcjGL',
    [CHAIN_ID.Buildnet.toString()]:
      'AS1ZXy3nvqXAMm2w6viAg7frte6cZfJM8hoMvWf4KoKDzvLzYKqE',
  },
}

///////////////// MULTI-NETWORK TOKENS //////////////////////

export class USDCe extends MRC20 {
  constructor(
    public provider: Provider | PublicProvider,
    chainId = CHAIN_ID.Mainnet
  ) {
    checkNetwork(provider, chainId === CHAIN_ID.Mainnet)
    const address = TOKENS_CONTRACTS.USDCe[chainId.toString()]
    if (!address) {
      throw new Error(`USDCe not available on chain ${chainId}`)
    }
    super(provider, address)
  }

  static buildnet(provider: Provider | PublicProvider): USDCe {
    checkNetwork(provider, false)
    return new USDCe(provider, CHAIN_ID.Buildnet)
  }

  static mainnet(provider: Provider | PublicProvider): USDCe {
    checkNetwork(provider, true)
    return new USDCe(provider, CHAIN_ID.Mainnet)
  }

  static async fromProvider(
    provider: Provider | PublicProvider
  ): Promise<USDCe> {
    const { chainId } = await provider.networkInfos()
    return new USDCe(provider, chainId)
  }
}

export class USDTb extends MRC20 {
  constructor(
    public provider: Provider | PublicProvider,
    chainId = CHAIN_ID.Mainnet
  ) {
    checkNetwork(provider, chainId === CHAIN_ID.Mainnet)
    const address = TOKENS_CONTRACTS.USDTb[chainId.toString()]
    if (!address) {
      throw new Error(`USDTb not available on chain ${chainId}`)
    }
    super(provider, address)
  }

  static buildnet(provider: Provider | PublicProvider): USDTb {
    checkNetwork(provider, false)
    return new USDTb(provider, CHAIN_ID.Buildnet)
  }

  static mainnet(provider: Provider | PublicProvider): USDTb {
    checkNetwork(provider, true)
    return new USDTb(provider, CHAIN_ID.Mainnet)
  }

  static async fromProvider(
    provider: Provider | PublicProvider
  ): Promise<USDTb> {
    const { chainId } = await provider.networkInfos()
    return new USDTb(provider, chainId)
  }
}

export class DAIe extends MRC20 {
  constructor(
    public provider: Provider | PublicProvider,
    chainId = CHAIN_ID.Mainnet
  ) {
    checkNetwork(provider, chainId === CHAIN_ID.Mainnet)
    const address = TOKENS_CONTRACTS.DAIe[chainId.toString()]
    if (!address) {
      throw new Error(`DAIe not available on chain ${chainId}`)
    }
    super(provider, address)
  }

  static buildnet(provider: Provider | PublicProvider): DAIe {
    checkNetwork(provider, false)
    return new DAIe(provider, CHAIN_ID.Buildnet)
  }

  static mainnet(provider: Provider | PublicProvider): DAIe {
    checkNetwork(provider, true)
    return new DAIe(provider, CHAIN_ID.Mainnet)
  }

  static async fromProvider(
    provider: Provider | PublicProvider
  ): Promise<DAIe> {
    const { chainId } = await provider.networkInfos()
    return new DAIe(provider, chainId)
  }
}

export class WETHe extends MRC20 {
  constructor(
    public provider: Provider | PublicProvider,
    chainId = CHAIN_ID.Mainnet
  ) {
    checkNetwork(provider, chainId === CHAIN_ID.Mainnet)
    const address = TOKENS_CONTRACTS.WETHe[chainId.toString()]
    if (!address) {
      throw new Error(`WETHe not available on chain ${chainId}`)
    }
    super(provider, address)
  }

  static buildnet(provider: Provider | PublicProvider): WETHe {
    checkNetwork(provider, false)
    return new WETHe(provider, CHAIN_ID.Buildnet)
  }

  static mainnet(provider: Provider | PublicProvider): WETHe {
    checkNetwork(provider, true)
    return new WETHe(provider, CHAIN_ID.Mainnet)
  }

  static async fromProvider(
    provider: Provider | PublicProvider
  ): Promise<WETHe> {
    const { chainId } = await provider.networkInfos()
    return new WETHe(provider, chainId)
  }
}

export class WETHb extends MRC20 {
  constructor(
    public provider: Provider | PublicProvider,
    chainId = CHAIN_ID.Mainnet
  ) {
    checkNetwork(provider, chainId === CHAIN_ID.Mainnet)
    const address = TOKENS_CONTRACTS.WETHb[chainId.toString()]
    if (!address) {
      throw new Error(`WETHb not available on chain ${chainId}`)
    }
    super(provider, address)
  }

  static buildnet(provider: Provider | PublicProvider): WETHb {
    checkNetwork(provider, false)
    return new WETHb(provider, CHAIN_ID.Buildnet)
  }

  static mainnet(provider: Provider | PublicProvider): WETHb {
    checkNetwork(provider, true)
    return new WETHb(provider, CHAIN_ID.Mainnet)
  }

  static async fromProvider(
    provider: Provider | PublicProvider
  ): Promise<WETHb> {
    const { chainId } = await provider.networkInfos()
    return new WETHb(provider, chainId)
  }
}

export class WBTC extends MRC20 {
  constructor(
    public provider: Provider | PublicProvider,
    chainId = CHAIN_ID.Mainnet
  ) {
    checkNetwork(provider, chainId === CHAIN_ID.Mainnet)
    const address = TOKENS_CONTRACTS.WBTCe[chainId.toString()]
    if (!address) {
      throw new Error(`WBTC not available on chain ${chainId}`)
    }
    super(provider, address)
  }

  static buildnet(provider: Provider | PublicProvider): WBTC {
    checkNetwork(provider, false)
    return new WBTC(provider, CHAIN_ID.Buildnet)
  }

  static mainnet(provider: Provider | PublicProvider): WBTC {
    checkNetwork(provider, true)
    return new WBTC(provider, CHAIN_ID.Mainnet)
  }

  static async fromProvider(
    provider: Provider | PublicProvider
  ): Promise<WBTC> {
    const { chainId } = await provider.networkInfos()
    return new WBTC(provider, chainId)
  }
}

///////////////// MAINNET-ONLY TOKENS //////////////////////

export class PUR extends MRC20 {
  constructor(public provider: Provider | PublicProvider) {
    checkNetwork(provider, true)
    const address = TOKENS_CONTRACTS.PUR[CHAIN_ID.Mainnet.toString()]
    super(provider, address)
  }
}

export class POM extends MRC20 {
  constructor(public provider: Provider | PublicProvider) {
    checkNetwork(provider, true)
    const address = TOKENS_CONTRACTS.POM[CHAIN_ID.Mainnet.toString()]
    super(provider, address)
  }
}
