import { isImmutable } from '../../src/deweb/immutable'
import { provider, publicProvider } from './setup'
import { CHAIN_ID } from '../../src/utils/networks'
import { providerMock } from '../unit/mock/provider.mock'

const immutableDewebAddressBuildnet =
  'AS12ibbPmE9L4i1D8FC3xP7e9NFtbBWNaP46s6GjnvuiXhWfLmnvW'
const mutableDewebAddressBuildnet =
  'AS12oT3yMR4DG89SpweuPa7R1d2sXWvMzGSquVoDgspbiB6nVYUXt'

describe('is immutable', () => {
  test('should return true for immutable address', async () => {
    const isImmutableWebsite = await isImmutable(
      immutableDewebAddressBuildnet,
      publicProvider
    )
    expect(isImmutableWebsite).toBe(true)
  })

  test('should return false for mutable address', async () => {
    const isImmutableWebsite = await isImmutable(
      mutableDewebAddressBuildnet,
      publicProvider
    )
    expect(isImmutableWebsite).toBe(false)
  })

  test('should work for provider that do not provide node url', async () => {
    jest.spyOn(providerMock, 'networkInfos').mockResolvedValueOnce({
      url: undefined,
      chainId: CHAIN_ID.Buildnet,
      name: 'Buildnet',
      minimalFee: 10000000n,
    })
    const isImmutableWebsite = await isImmutable(
      immutableDewebAddressBuildnet,
      providerMock
    )
    expect(isImmutableWebsite).toBe(true)
  })

  test('if provider return no node url and invalid chainid, should throw error', async () => {
    jest.spyOn(providerMock, 'networkInfos').mockResolvedValueOnce({
      url: undefined,
      chainId: 0n, // invalid chain id
      name: 'Buildnet',
      minimalFee: 10000000n,
    })
    expect(
      async () => await isImmutable(immutableDewebAddressBuildnet, providerMock)
    ).rejects.toThrow('Unknown network chainId: 0')
  })
})
