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
import { BlockchainClient } from '../client'
import { MAX_GAS_EXECUTE } from '../smartContract'
import { ZERO } from '../utils'
import { PrivateKey } from './keys'
import { Operation } from './operation'
import {
  OperationManager,
  ExecuteOperation,
  calculateExpirePeriod,
  OperationType,
} from './operationManager'

type ExecuteOption = {
  fee?: bigint
  periodToLive?: number
  maxCoins?: bigint
  maxGas?: bigint
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
  client: BlockchainClient,
  privateKey: PrivateKey,
  byteCode: Uint8Array,
  opts: ExecuteOption
): Promise<Operation> {
  const operation = new OperationManager(privateKey, client)
  const details: ExecuteOperation = {
    fee: opts?.fee ?? (await client.getMinimalFee()),
    expirePeriod: calculateExpirePeriod(
      await client.fetchPeriod(),
      opts?.periodToLive
    ),
    type: OperationType.ExecuteSmartContractBytecode,
    maxCoins: opts?.maxCoins ?? BigInt(ZERO),
    maxGas: opts?.maxGas || MAX_GAS_EXECUTE,
    contractDataBinary: byteCode,
    datastore: opts.datastore,
  }

  return new Operation(client, await operation.send(details))
}
