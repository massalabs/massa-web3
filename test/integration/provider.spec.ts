import { CHAIN_ID, NetworkName } from '../../src'
import { provider } from './setup'

describe('Provider tests', () => {
  test('networkInfos', async () => {
    const infos = await provider.networkInfos()
    expect(infos).toEqual({
      name: NetworkName.Buildnet,
      chainId: CHAIN_ID.Buildnet,
      url: 'https://buildnet.massa.net:443/api/v2',
    })
  })
})
