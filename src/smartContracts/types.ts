import { Mas } from '../basicElements/mas'
import { U64 } from '../basicElements/serializers/number/u64'

type CallSCCommons = {
  coins?: Mas
  fee?: Mas
  maxGas?: U64
}

export type DeploySCOptions = CallSCCommons & {
  maxCoins?: Mas
  waitFinalExecution?: boolean
  periodToLive?: number
}

export type CallSCOptions = CallSCCommons & {
  periodToLive?: number
}

export type ReadSCOptions = CallSCCommons & {
  caller?: string
}
