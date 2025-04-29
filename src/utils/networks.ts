/* eslint-disable @typescript-eslint/naming-convention, @typescript-eslint/no-magic-numbers */

export enum PublicApiUrl {
  Mainnet = 'https://mainnet.massa.net/api/v2',
  Testnet = 'https://testnet.massa.net/api/v2',
  Buildnet = 'https://buildnet.massa.net/api/v2',
}

export enum GrpcApiUrl {
  Mainnet = 'https://mainnet.massa.net:33037',
  Buildnet = 'https://buildnet.massa.net/api/grpc',
}

export enum NetworkName {
  Mainnet = 'mainnet',
  Testnet = 'testnet',
  Buildnet = 'buildnet',
}

export const CHAIN_ID = {
  Mainnet: 77658377n,
  Testnet: 77658376n,
  Buildnet: 77658366n,
}

export function getNetworkNameByChainId(
  chainId: bigint
): NetworkName | undefined {
  for (const [key, value] of Object.entries(CHAIN_ID)) {
    if (value === chainId) {
      return NetworkName[key as keyof typeof NetworkName]
    }
  }
  return undefined
}

export type Network = {
  name: NetworkName | string
  chainId: bigint
  url?: string
  minimalFee: bigint
}
