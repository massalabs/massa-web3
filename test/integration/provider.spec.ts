import { CHAIN_ID, NetworkName } from '../../src'
import { provider } from './setup'

describe('Provider tests', () => {
  test('networkInfos', async () => {
    const infos = await provider.networkInfos()
    expect(infos).toEqual({
      name: NetworkName.Buildnet,
      minimalFee: 10000000n,
      chainId: CHAIN_ID.Buildnet,
      url: 'https://buildnet.massa.net/api/v2',
    })
  })

  test('Node Status', async () => {
    const status = await provider.getNodeStatus()
    expect(status.config).toBeDefined()
    expect(status.connectedNodes).toBeDefined()
    expect(status.consensusStats).toBeDefined()
    expect(status.currentCycle).toBeDefined()
    expect(status.currentTime).toBeDefined()
    expect(status.currentCycleTime).toBeDefined()
    expect(status.nextCycleTime).toBeDefined()
    expect(status.lastSlot).toBeDefined()
    expect(status.nextSlot).toBeDefined()
    expect(status.networkStats).toBeDefined()
    expect(status.nodeId).toBeDefined()
    expect(status.nodeIp).toBeDefined()
    expect(status.poolStats).toBeDefined()
    expect(status.version).toBeDefined()
    expect(status.executionStats).toBeDefined()
    expect(status.chainId).toBeDefined()
    expect(status.minimalFees).toBeDefined()
  })
})
