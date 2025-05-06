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
