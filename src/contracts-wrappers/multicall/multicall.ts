import { I32, strToBytes } from '../../basicElements'
import { Operation } from '../../operation'
import { Provider, PublicProvider } from '../../provider'
import { isProvider } from '../../provider/helpers'
import { parseCallArgs } from '../../utils'
import { MULTICALL_BYTECODE } from './bytecode'
import { CallParams } from './serializers/serializers'
import { Call } from './types'

export class Multicall {
  constructor(public provider: Provider | PublicProvider) {}

  // To uncomment when https://github.com/massalabs/massa/issues/4912 is fixed

  // async executeReadOnly(
  //   calls: Call[],
  //   options?: {
  //     maxGas?: bigint
  //     fee?: bigint
  //     caller?: string
  //   }
  // ): Promise<Uint8Array[]> {

  //   const results = await this.provider.executeSCReadOnly({
  //     byteCode: MULTICALL_BYTECODE,
  //     datastore: buildDatastore(calls),
  //     fee: options?.fee,
  //     maxGas: options?.maxGas,
  //     caller: options?.caller,
  //   })

  //   if (results.error || !results.value) {
  //     throw new Error(
  //       `Error executing read-only calls: ${results.error || 'Unknown error'}`
  //     )
  //   }

  //   return new Args(results.value)
  //     .nextSerializableObjectArray(CallResult)
  //     .map((r) => r.data)
  // }

  async execute(
    calls: Call[],
    options?: {
      maxGas?: bigint
      maxCoins?: bigint
      fee?: bigint
    }
  ): Promise<Operation> {
    if (!isProvider(this.provider)) {
      throw new Error('ExecuteSC is not available for PublicProvider')
    }

    let maxCoins = options?.maxCoins
    if (!maxCoins) {
      maxCoins = sumCoins(calls)
    }

    return this.provider.executeSC({
      byteCode: MULTICALL_BYTECODE,
      datastore: buildDatastore(calls),
      fee: options?.fee,
      maxCoins,
      maxGas: options?.maxGas,
    })
  }
}

const CALL_PREFIX = strToBytes('C_')

function getCallKey(callIdx: number): Uint8Array {
  return Uint8Array.from([...CALL_PREFIX, ...I32.toBytes(BigInt(callIdx))])
}

function buildDatastore(calls: Call[]): Map<Uint8Array, Uint8Array> {
  const datastore = new Map<Uint8Array, Uint8Array>()
  calls.forEach((call, idx) => {
    const callKey = getCallKey(idx)

    const parameter = parseCallArgs(call.callData)

    const callParams = new CallParams(
      call.targetContract,
      call.targetFunc,
      call.coins ?? 0n,
      parameter
    )
    datastore.set(callKey, callParams.serialize())
  })
  return datastore
}

function sumCoins(calls: Call[]): bigint {
  return calls.reduce((acc, call) => {
    if (call.coins) {
      return acc + call.coins
    }
    return acc
  }, 0n)
}
