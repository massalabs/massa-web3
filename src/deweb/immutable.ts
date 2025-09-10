import { Provider, PublicProvider } from '../provider'
import { Operation, batchListAndCall } from '../operation'
import { DEFAULT_MAX_ARGUMENT_ARRAY_SIZE, PublicAPI } from '..'
import { getPublicApiByChainId } from '../utils/networks'

/**
 * Makes a deweb smart contract immutable
 *
 * @remarks WARNING This operation is irreversible. Once made immutable, you will not be able to update this site anymore.
 * @param address - The deweb smart contract address
 * @param provider - The provider to use
 * @param waitFinal - Whether to wait for the final execution or the speculative execution. False by default.
 * @returns The operation
 * @example
 * ```typescript
 * const operation = await makeImmutable(address, provider)
 * await operation.waitFinalExecution()
 * ```
 */
export async function makeImmutable(
  address: string,
  provider: Provider,
  waitFinal = false
): Promise<Operation> {
  const operation = await provider.callSC({
    func: 'upgradeSC',
    target: address,
  })

  await (waitFinal
    ? operation.waitFinalExecution()
    : operation.waitSpeculativeExecution())
  return operation
}

/**
 * indicates among a list of contract addresses if they are immutable
 * @remarks This function allows to check the immutable property of several contract addresses in a single call
 * @param contractAddresses - The list of deweb smart contract addresses
 * @param provider - The provider to use
 * @param isFinal - Whether to check if the contract is immutable in the final state or in the pending state. False by default.
 * @returns - List of boolean values indicating if the respective contract is immutable
 */
export async function areImmutables(
  provider: Provider,
  contractAddresses: string[],
  isFinal = false
): Promise<boolean[]> {
  if (contractAddresses.length === 0) {
    return []
  }
  const publicAPI = await PublicAPI.fromProvider(provider)
  const bytecodes = await batchListAndCall(
    contractAddresses,
    async (contractAddressesBatch) => {
      return publicAPI.executeMultipleGetAddressesBytecode(
        contractAddressesBatch.map((address) => ({
          address,
          is_final: isFinal, // eslint-disable-line @typescript-eslint/naming-convention
        }))
      )
    },
    DEFAULT_MAX_ARGUMENT_ARRAY_SIZE
  )
  return bytecodes.map((bytecode) => bytecode.length === 0)
}

/**
 * Indicates if a given contract address is immutable
 * @param address - The deweb smart contract address
 * @param provider - The provider to use
 * @param isFinal - Whether to check if the contract is immutable in the final state or in the pending state. False by default.
 * @returns True if the contract is immutable, false otherwise
 */
export async function isImmutable(
  address: string,
  provider: PublicProvider,
  isFinal = false
): Promise<boolean> {
  const networkInfo = await provider.networkInfos()
  let nodeUrl = networkInfo.url

  if (!nodeUrl) {
    nodeUrl = getPublicApiByChainId(networkInfo.chainId)
    if (!nodeUrl) {
      throw new Error(`Unknown network chainId: ${networkInfo.chainId}`)
    }
  }

  const client = new PublicAPI(nodeUrl)
  const bytecode = await client.getAddressesBytecode({
    address: address,
    is_final: isFinal, // eslint-disable-line @typescript-eslint/naming-convention
  })

  return bytecode.length === 0
}
