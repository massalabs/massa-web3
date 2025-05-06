import {
  getPublicApiByChainId,
  getNetworkNameByChainId,
  NetworkName,
  PublicApiUrl,
  CHAIN_ID,
} from '../../src/utils/networks'

describe('getPublicApiByChainId', () => {
  test('returns correct PublicApiUrl for Mainnet chain ID', () => {
    const result = getPublicApiByChainId(CHAIN_ID.Mainnet)
    expect(result).toBe(PublicApiUrl.Mainnet)
  })

  test('returns correct PublicApiUrl for Testnet chain ID', () => {
    const result = getPublicApiByChainId(CHAIN_ID.Testnet)
    expect(result).toBe(PublicApiUrl.Testnet)
  })

  test('returns correct PublicApiUrl for Buildnet chain ID', () => {
    const result = getPublicApiByChainId(CHAIN_ID.Buildnet)
    expect(result).toBe(PublicApiUrl.Buildnet)
  })

  test('returns undefined for an unknown chain ID', () => {
    const unknownChainId = 12345678n
    const result = getPublicApiByChainId(unknownChainId)
    expect(result).toBeUndefined()
  })
})

describe('getNetworkNameByChainId', () => {
  test('returns correct NetworkName for Mainnet chain ID', () => {
    const result = getNetworkNameByChainId(CHAIN_ID.Mainnet)
    expect(result).toBe(NetworkName.Mainnet)
  })

  test('returns correct NetworkName for Testnet chain ID', () => {
    const result = getNetworkNameByChainId(CHAIN_ID.Testnet)
    expect(result).toBe(NetworkName.Testnet)
  })

  test('returns correct NetworkName for Buildnet chain ID', () => {
    const result = getNetworkNameByChainId(CHAIN_ID.Buildnet)
    expect(result).toBe(NetworkName.Buildnet)
  })

  test('returns undefined for an unknown chain ID', () => {
    const unknownChainId = 12345678n
    const result = getNetworkNameByChainId(unknownChainId)
    expect(result).toBeUndefined()
  })
})
