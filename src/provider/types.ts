import { Args } from '../basicElements'
import { Mas } from '../basicElements/mas'
import { U64_t } from '../basicElements/serializers/number/u64'
import { rpcTypes as t } from '../generated'

export type SignOptions = {
  description?: string
  displayData?: boolean
}

type OperationParams = {
  coins?: Mas
  fee?: Mas
  maxGas?: U64_t
}

type CallSCCommons = {
  func: string
  target: string
  parameter?: Args | Uint8Array
}

export type ReadSCParams = CallSCCommons &
  OperationParams & {
    caller?: string
  }

export type CallSCParams = CallSCCommons &
  OperationParams & {
    periodToLive?: number
  }

export type DeploySCParams = OperationParams & {
  parameter?: Args | Uint8Array
  maxCoins?: Mas
  byteCode: Uint8Array
  periodToLive?: number
  waitFinalExecution?: boolean
}

export type ExecuteScParams = {
  byteCode: Uint8Array
  datastore?: Map<Uint8Array, Uint8Array>
  periodToLive?: number
  fee?: Mas
  maxGas?: Mas
  maxCoins?: Mas
}

export type ReadSCData = {
  value: Uint8Array
  info: {
    error?: string
    events: t.OutputEvents
    gasCost: number
  }
}

export type SignedData = {
  /** Public key of the signer account */
  publicKey: string
  /** Base58 encoded representation of the signature */
  signature: string
}

export type NodeStatusInfo = {
  config: Config
  connectedNodes: Record<string, unknown>
  consensusStats: ConsensusStats
  currentCycle: number
  currentTime: number
  currentCycleTime: number
  nextCycleTime: number
  lastSlot: t.Slot
  nextSlot: t.Slot
  networkStats: NetworkStats
  nodeId: string
  nodeIp?: null | string
  poolStats: number[]
  version: string
  executionStats: ExecutionStats
  chainId: number
  minimalFees?: string
}

export type Config = {
  blockReward: string
  deltaF0: number
  endTimestamp?: number | null
  genesisTimestamp: number
  maxBlockSize?: number
  operationValidityPeriods: number
  periodsPerCycle: number
  rollPrice: string
  t0: number
  threadCount: number
}

export type ConsensusStats = {
  cliqueCount: number
  endTimespan: number
  finalBlockCount: number
  staleBlockCount: number
  startTimespan: number
}

export type NetworkStats = {
  activeNodeCount: number
  bannedPeerCount: number
  inConnectionCount: number
  knownPeerCount: number
  outConnectionCount: number
}

export type ExecutionStats = {
  timeWindowStart: number
  timeWindowEnd: number
  finalBlockCount: number
  finalExecutedOperationsCount: number
  activeCursor: t.Slot
  finalCursor: t.Slot
}
