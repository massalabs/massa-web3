import { Provider } from 'src/provider'
import { Operation } from 'src/operation'
import { PublicAPI } from '../client'

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
  nodeUrl: string,
  waitFinal = false
): Promise<boolean> {
  const bytecode = await new PublicAPI(nodeUrl).getAddressesBytecode({
    address: address,
    is_final: waitFinal, // eslint-disable-line @typescript-eslint/naming-convention
  })

  return bytecode.length === 0
}
