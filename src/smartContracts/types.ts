import { Mas } from '../basicElements/mas'
import { U64_t } from '../basicElements/serializers/number/u64'

type CallSCCommons = {
  coins?: Mas
  fee?: Mas
  maxGas?: U64_t
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
