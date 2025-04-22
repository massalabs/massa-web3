import { CHAIN_ID } from '../../src'
import { account, grpcProvider, publicProvider } from './setup'
import { StakerEntry } from '../../src/generated/grpc/massa/model/v1/staker_pb'
import {
  Slot as grpcSlot,
  SlotRange,
} from '../../src/generated/grpc/massa/model/v1/slot_pb'
import {
  AddressBalanceCandidate,
  AddressExistsCandidate,
  ExecutionQueryRequestItem,
} from '../../src/generated/grpc/public_pb'

let blockId: string
let currentPeriod: number

let minimalFees: bigint
describe('Provider GRPC tests', () => {
  beforeAll(async () => {
    const networkInfos = await publicProvider.networkInfos()
    minimalFees = networkInfos.minimalFee
  })
  test('getNodeStatus', async () => {
    const status = await grpcProvider.getNodeStatus()
    expect(status.config).toBeDefined()
    expect(status.currentCycle).toBeDefined()
    expect(status.currentTime).toBeDefined()
    expect(status.currentCycleTime).toBeDefined()
    expect(status.nextCycleTime).toBeDefined()
    expect(status.nodeId).toBeDefined()
    expect(status.version).toBeDefined()
    expect(status.chainId).toBe(Number(CHAIN_ID.Buildnet))
    expect(status.minimalFees).toBe(minimalFees)
  })

  test('getTransactionsThroughput', async () => {
    const throughput = await grpcProvider.getTransactionsThroughput()
    expect(throughput).toBeDefined()
  })

  test('getStakers', async () => {
    const stakers: Array<StakerEntry> = await grpcProvider.getStakers()
    expect(stakers).toBeDefined()
    expect(stakers[0].getRolls()).toBeGreaterThan(0)
  })

  test('networkInfos', async () => {
    grpcProvider
      .networkInfos()
      .then((info) => {
        expect(info.name).toBeDefined()
        expect(info.chainId).toBeDefined()
        expect(info.url).toBeDefined()
      })
      .catch((err) => {
        // possible error with sandboxed node
        expect(err).toBeDefined()
        expect(err.message).toContain('Unknown chain id')
      })
  })

  test('nextBlockBestParent', async () => {
    const parent = await grpcProvider.getNextBlockBestParent()
    expect(parent).toBeDefined()
    expect(parent.length).toBeGreaterThan(0)
    blockId = parent[0].getBlockId()
    currentPeriod = parent[0].getPeriod()
  })

  test('getBlocks', async () => {
    const blocks = await grpcProvider.getBlocks([blockId])
    expect(blocks).toBeDefined()
    expect(blocks.length).toBeGreaterThan(0)
    expect(blocks[0].getBlock()?.hasHeader()).toBe(true)
  })

  test('searchBlocks', async () => {
    const blocks = await grpcProvider.searchBlocks([blockId])
    expect(blocks).toBeDefined()
    expect(blocks.length).toBeGreaterThan(0)
    expect(blocks[0].getBlockId()).toBe(blockId)
  })

  test('getSelectorDraws', async () => {
    let slotRange = new SlotRange()
    let startSlot = new grpcSlot()
    startSlot.setPeriod(currentPeriod)
    startSlot.setThread(0)
    slotRange.setStartSlot(startSlot)
    let endSlot = new grpcSlot()
    endSlot.setPeriod(currentPeriod + 10)
    endSlot.setThread(0)
    slotRange.setEndSlot(endSlot)
    const draws = await grpcProvider.getSelectorDraws(slotRange)
    expect(draws).toBeDefined()
    expect(draws.length).toBeGreaterThan(0)
  })

  test('getTransactionsThroughput', async () => {
    const throughput = await grpcProvider.getTransactionsThroughput()
    expect(throughput).toBeDefined()
  })

  test('queryState', async () => {
    const address = new AddressExistsCandidate()
    address.setAddress(account.address.toString())
    const request = new ExecutionQueryRequestItem()
    request.setAddressExistsCandidate(address)
    const state = await grpcProvider.queryState([request])
    const response = state.getResponsesList()[0]
    expect(response.getResult()?.getBoolean()).toBe(true)

    const addrBalance = new AddressBalanceCandidate()
    addrBalance.setAddress(account.address.toString())
    const request2 = new ExecutionQueryRequestItem()
    request2.setAddressBalanceCandidate(addrBalance)
    const state2 = await grpcProvider.queryState([request2])
    const response2 = state2.getResponsesList()[0]
    expect(response2.getResult()?.getAmount()?.getScale()).toBe(9)
  })

  // test('getStorageKeys', async () => {
  //     const keys = await grpcProvider.getStorageKeys("AS12k8viVmqPtRuXzCm6rKXjLgpQWqbuMjc37YHhB452KSUUb9FgL");
  //     expect(keys).toBeDefined()
  //     expect(keys.length).toBeGreaterThan(0)
  // })
})
