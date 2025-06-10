import { Args } from '../../basicElements'

export type Call = {
  targetContract: string
  targetFunc: string
  callData?: Args | Uint8Array
  coins?: bigint
}
