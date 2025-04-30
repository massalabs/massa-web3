import { CHAIN_ID, GrpcApiUrl, NetworkName } from '../../src'
import { grpcProvider, provider } from './setup'
import { strToBytes, U256 } from '../../src/basicElements/serializers'
import { PublicStatus } from '../../src/generated/grpc/massa/model/v1/node_pb'

const USDC = 'AS12k8viVmqPtRuXzCm6rKXjLgpQWqbuMjc37YHhB452KSUUb9FgL'

describe('Provider tests', () => {
  test('networkInfos', async () => {
    const infos_jsonrpc = await provider.networkInfos()
    const infos_grpc = await grpcProvider.networkInfos()
    expect(infos_jsonrpc).toEqual({
      name: NetworkName.Buildnet,
      minimalFee: 10000000n,
      chainId: CHAIN_ID.Buildnet,
      url: 'https://buildnet.massa.net/api/v2',
    })
    expect(infos_grpc).toEqual({
      name: NetworkName.Buildnet,
      minimalFee: 10000000n,
      chainId: CHAIN_ID.Buildnet,
      url: GrpcApiUrl.Buildnet,
    })
  })

  test('Node Status', async () => {
    const status_jsonrpc = await provider.getNodeStatus()
    const status_grpc = await grpcProvider.getNodeStatus()

    expect(status_jsonrpc.config).toBeDefined()
    expect(status_jsonrpc.connectedNodes).toBeDefined()
    expect(status_jsonrpc.consensusStats).toBeDefined()
    expect(status_jsonrpc.currentCycle).toBeDefined()
    expect(status_jsonrpc.currentTime).toBeDefined()
    expect(status_jsonrpc.currentCycleTime).toBeDefined()
    expect(status_jsonrpc.nextCycleTime).toBeDefined()
    expect(status_jsonrpc.lastSlot).toBeDefined()
    expect(status_jsonrpc.nextSlot).toBeDefined()
    expect(status_jsonrpc.networkStats).toBeDefined()
    expect(status_jsonrpc.nodeId).toBeDefined()
    expect(status_jsonrpc.nodeIp).toBeDefined()
    expect(status_jsonrpc.poolStats).toBeDefined()
    expect(status_jsonrpc.version).toBeDefined()
    expect(status_jsonrpc.executionStats).toBeDefined()
    expect(status_jsonrpc.chainId).toBeDefined()
    expect(status_jsonrpc.minimalFees).toBeDefined()

    expect(status_jsonrpc.version).toEqual(status_grpc.version)
    expect(status_jsonrpc.chainId).toEqual(status_grpc.chainId)
    expect(status_jsonrpc.minimalFees).toEqual(status_grpc.minimalFees)
    expect(status_jsonrpc.config.rollPrice).toEqual(
      status_grpc.config.rollPrice
    )
    expect(status_jsonrpc.config.blockReward).toEqual(
      status_grpc.config.blockReward
    )
    expect(status_jsonrpc.config.deltaF0).toEqual(status_grpc.config.deltaF0)
    expect(status_jsonrpc.config.genesisTimestamp).toEqual(
      status_grpc.config.genesisTimestamp
    )
    expect(status_jsonrpc.config.operationValidityPeriods).toEqual(
      status_grpc.config.operationValidityPeriods
    )
    expect(status_jsonrpc.config.periodsPerCycle).toEqual(
      status_grpc.config.periodsPerCycle
    )
    expect(status_jsonrpc.config.t0).toEqual(status_grpc.config.t0)
    expect(status_jsonrpc.config.threadCount).toEqual(
      status_grpc.config.threadCount
    )
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
