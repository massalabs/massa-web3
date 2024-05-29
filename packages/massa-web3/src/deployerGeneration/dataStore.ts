import { ZERO_BYTE, ONE, ZERO } from '../utils'
import { Args, U64, U8 } from '../basicElements'

const CONTRACTS_NUMBER_KEY = new Uint8Array([ZERO_BYTE])

type DatastoreContract = {
  data: Uint8Array
  args: Uint8Array
  coins: bigint
}

/**
 * Generates a key for coin data in the datastore.
 *
 * @param offset - The offset to use when generating the key.
 * @returns A Uint8Array representing the key.
 */
function coinsKey(offset: number): Uint8Array {
  return new Args()
    .addU64(BigInt(offset + ONE))
    .addUint8Array(U8.toBytes(BigInt(ONE)))
    .serialize()
}

/**
 * Generates a key for args data in the datastore.
 *
 * @param offset - The offset to use when generating the key.
 * @returns A Uint8Array representing the key.
 */
function argsKey(offset: number): Uint8Array {
  return new Args()
    .addU64(BigInt(offset + ONE))
    .addUint8Array(U8.toBytes(BigInt(ZERO)))
    .serialize()
}

/**
 * Generates a key for contract data in the datastore.
 *
 * @param offset - The offset to use when generating the key.
 * @returns A Uint8Array representing the key.
 */
function contractKey(offset: number): Uint8Array {
  return U64.toBytes(BigInt(offset + ONE))
}

/**
 * Populates the datastore with the contracts.
 *
 * @remarks
 * This function is to be used in conjunction with the deployer smart contract.
 * The deployer smart contract expects to have an execution datastore in a specific state.
 * This function populates the datastore according to that expectation.
 *
 * @param contracts - The contracts to populate the datastore with.
 *
 * @returns The populated datastore.
 */
export function populateDatastore(
  contracts: DatastoreContract[]
): Map<Uint8Array, Uint8Array> {
  const datastore = new Map<Uint8Array, Uint8Array>()

  // set the number of contracts in the first key of the datastore
  datastore.set(CONTRACTS_NUMBER_KEY, U64.toBytes(BigInt(contracts.length)))

  contracts.forEach((contract, i) => {
    datastore.set(contractKey(i), contract.data)
    if (contract.args) {
      datastore.set(argsKey(i), contract.args)
    }
    if (contract.coins > ZERO) {
      datastore.set(coinsKey(i), U64.toBytes(contract.coins))
    }
  })

  return datastore
}
