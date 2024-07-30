/* eslint-disable @typescript-eslint/naming-convention, @typescript-eslint/no-magic-numbers */

export enum PublicApiUrl {
  Mainnet = 'https://mainnet.massa.net/api/v2',
  Testnet = 'https://testnet.massa.net/api/v2',
  Buildnet = 'https://buildnet.massa.net/api/v2',
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

export type Network = {
  name: NetworkName | string
  chainId: bigint
  url?: string
}
