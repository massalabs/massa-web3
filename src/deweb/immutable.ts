import { Provider, PublicProvider } from 'src/provider'
import { Operation } from 'src/operation'
import { PublicAPI } from '..'
import { getPublicApiByChainId } from '../utils/networks'

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
 * Check if the given contract addresses are immutable in final state
 * @param contractAddresses - The contract addresses list
 * @returns - List of boolean values indicating if the respective contract is immutable
 */
export async function areImmutables(
  provider: Provider,
  contractAddresses: string[]
): Promise<boolean[]> {
  if (contractAddresses.length === 0) {
    return []
  }
  const networkInfo = await provider.networkInfos()
  const url = networkInfo.url
    ? networkInfo.url
    : getPublicApiByChainId(networkInfo.chainId)
  if (!url) {
    throw new Error('Provider does not have a node URL')
  }
  const publicAPI = new PublicAPI(url)
  const bytecodes = await publicAPI.executeMultipleGetAddressesBytecode(
    contractAddresses.map((address) => ({
      address,
      is_final: true, // eslint-disable-line @typescript-eslint/naming-convention
    }))
  )
  return bytecodes.map((bytecode) => bytecode.length == 0)
}

export async function isImmutable(
  address: string,
  provider: PublicProvider,
  final = false
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
    is_final: final, // eslint-disable-line @typescript-eslint/naming-convention
  })

  return bytecode.length === 0
}
