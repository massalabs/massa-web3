/**
 * A module to compile and execute byte code.
 *
 * @remarks
 * The difference between byte code and a smart contract is that the byte code is the raw code that will be
 * executed on the blockchain, while a smart contract is the code that is already deployed on the blockchain.
 * The byte code is only ephemeral and will be executed only once.
 * A smart contract has an address and exposes functions that can be called multiple times.
 *
 */
import { PublicAPI } from '../client'
import { PrivateKey } from './keys'
import {
  OperationManager,
  getAbsoluteExpirePeriod,
} from '../operation/operationManager'
import { U64 } from './serializers/number/u64'
import { ExecuteOperation, OperationType } from '../operation'

export const MAX_GAS_EXECUTE = 3980167295n

type ExecuteOption = {
  fee?: U64
  periodToLive?: number
  maxCoins?: U64
  maxGas?: U64
  datastore?: Map<Uint8Array, Uint8Array>
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function compile(_source: string): Promise<Uint8Array> {
  throw new Error('Not implemented')
}

/**
 *
 * Executes a byte code on the blockchain.
 *
 * @param client - The client to connect to the desired blockchain.
 * @param privateKey - The private key of the account that will execute the byte code.
 * @param byteCode - The byte code to execute.
 * @param opts - Optional execution details.
 *
 * @returns The operation.
 */
export async function execute(
  client: PublicAPI,
  privateKey: PrivateKey,
  byteCode: Uint8Array,
  opts: ExecuteOption
): Promise<string> {
  const operation = new OperationManager(privateKey, client)

  const details: ExecuteOperation = {
    fee: opts?.fee ?? (await client.getMinimalFee()),
    expirePeriod: await getAbsoluteExpirePeriod(client, opts.periodToLive),
    type: OperationType.ExecuteSmartContractBytecode,
    maxCoins: opts?.maxCoins ?? 0n,
    maxGas: opts?.maxGas || MAX_GAS_EXECUTE,
    contractDataBinary: byteCode,
    datastore: opts.datastore,
  }

  return operation.send(details)
}
