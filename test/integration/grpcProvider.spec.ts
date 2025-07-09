import {
  CHAIN_ID,
  GrpcApiUrl,
  Mas,
  NetworkName,
  strToBytes,
  USDCe,
} from '../../src'
import {
  account,
  grpcProvider,
  grpcPublicProvider,
  publicProvider,
} from './setup'
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
    expect(status.minimalFees).toBe(Mas.toString(minimalFees))
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
    const resp = await grpcProvider.networkInfos()
    expect(resp.name).toBe(NetworkName.Buildnet)
    expect(resp.chainId).toBe(CHAIN_ID.Buildnet)
    expect(resp.url).toBe(GrpcApiUrl.Buildnet)
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
    const draws = await grpcProvider.getSelectorDraws(undefined, slotRange)
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

  test('readStorage', async () => {
    const USDC = await USDCe.fromProvider(grpcProvider)
    const res = await grpcProvider.readStorage(USDC.address, ['SYMBOL'], true)
    expect(res.length).toBe(1)
    expect(res[0]).toStrictEqual(strToBytes('USDC.s'))
  })

  test('readSC from provider', async () => {
    const USDC = await USDCe.fromProvider(grpcProvider)

    const res = await grpcProvider.readSC({
      target: USDC.address,
      func: 'name',
    })

    expect(res.value).toStrictEqual(strToBytes('Sepolia USDC'))
  })

  test('readSC from public provider', async () => {
    const USDC = await USDCe.fromProvider(grpcPublicProvider)

    const res = await grpcPublicProvider.readSC({
      target: USDC.address,
      func: 'name',
      // Caller has to be set because of https://github.com/massalabs/massa/issues/4924
      // remove this when the issue is fixed
      caller: 'AU1bQadvjLgKBA9GGzxiSRmA6H5ufYiASwPWwmbRxUdpxHbAHsEP',
    })

    expect(res.value).toStrictEqual(strToBytes('Sepolia USDC'))
  })
})
