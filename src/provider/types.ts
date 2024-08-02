import { Args } from '../basicElements'
import { Mas } from '../basicElements/mas'
import { U64 } from '../basicElements/serializers/number/u64'
import { SCEvent } from '../client'

type CallSCCommons = {
  parameter?: Args | Uint8Array
  coins?: Mas
  fee?: Mas
  maxGas?: U64
}

export type ReadSCParams = CallSCCommons & {
  func: string
  target: string
  caller?: string
}

export type CallSCParams = ReadSCParams & {
  periodToLive?: number
}

export type DeploySCParams = CallSCCommons & {
  byteCode: Uint8Array
  periodToLive?: number
  waitFinalExecution?: boolean
}

export type ReadSCData = {
  value: Uint8Array
  info: {
    error?: string
    events: SCEvent[]
    gasCost: number
  }
}

export type SignedData = {
  /** Public key of the signer account */
  publicKey: string
  /** Base58 encoded representation of the signature */
  signature: string
}
