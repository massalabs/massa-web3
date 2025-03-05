import { CHAIN_ID, NetworkName } from '../../src'
import { provider, grpcProvider } from './setup'
import { strToBytes, U256 } from '../../src/basicElements/serializers'

const USDC = 'AS12k8viVmqPtRuXzCm6rKXjLgpQWqbuMjc37YHhB452KSUUb9FgL'

describe('Provider GRPC tests', () => {
  test('getNodeStatus', async () => {
    const status = await grpcProvider.getNodeStatus()
    expect(status.config).toBeDefined()
    expect(status.currentCycle).toBeDefined()
    expect(status.currentTime).toBeDefined()
    expect(status.currentCycleTime).toBeDefined()
    expect(status.nextCycleTime).toBeDefined()
    expect(status.nodeId).toBeDefined()
    expect(status.version).toBeDefined()
    expect(status.chainId).toBeDefined()
    expect(status.minimalFees).toBeDefined()
  })
})

describe('Provider JsonRPC tests', () => {
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

describe('Provider readStorage test', () => {
  test('readStorage', async () => {
    const dataentries = await provider.readStorage(USDC, [
      'NAME',
      'SYMBOL',
      'TOTAL_SUPPLY',
    ])
    expect(dataentries).toHaveLength(3)
    expect(dataentries[0]).toEqual(strToBytes('Sepolia USDC'))
    expect(dataentries[1]).toEqual(strToBytes('USDC.s'))
    expect(U256.fromBytes(dataentries[2] as Uint8Array)).toBeGreaterThan(0n)
  })

  test('readStorage with empty keys list', async () => {
    const dataentries = await provider.readStorage(USDC, [])
    expect(dataentries).toHaveLength(0)
  })

  test('readStorage with existing and non-existing keys', async () => {
    const dataentries = await provider.readStorage(USDC, [
      'bad_key',
      'NAME',
      'bad_key2',
      'SYMBOL',
    ])
    expect(dataentries).toHaveLength(4)
    expect(dataentries[0]).toBeNull()
    expect(dataentries[1]).toEqual(strToBytes('Sepolia USDC'))
    expect(dataentries[2]).toBeNull()
    expect(dataentries[3]).toEqual(strToBytes('USDC.s'))
  })
})
