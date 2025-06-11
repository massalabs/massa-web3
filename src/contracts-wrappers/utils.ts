import { Provider, PublicProvider } from '../provider'
import { CHAIN_ID, Network } from '../utils'

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
