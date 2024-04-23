import { fromMAS } from '@massalabs/web3-utils'

/**
 * Calculates the cost of deploying a smart contract.
 */
export class StorageCost {
  /**
   * Calculates the cost of a given number of bytes.
   *
   * @param numberOfBytes - The number of bytes.
   *
   * @returns The cost in the smallest unit of the Massa currency.
   */
  static bytes(numberOfBytes: number): bigint {
    return BigInt(numberOfBytes) * fromMAS(0.0001)
  }

  /**
   * Calculates the cost of creating a new account.
   *
   * @returns The cost in the smallest unit of the Massa currency.
   */
  static account(): bigint {
    return fromMAS(0.001)
  }

  /**
   * Calculates the cost of deploying a smart contract.
   *
   * @remarks
   * The cost of deploying a smart contract includes the cost of creating a new account.
   *
   * @param numberOfBytes - The number of bytes of the smart contract.
   *
   * @returns The cost in the smallest unit of the Massa currency.
   */
  static smartContract(numberOfBytes: number): bigint {
    return StorageCost.bytes(numberOfBytes) + StorageCost.account()
  }

  /**
   * Calculates the cost of creating a new entry in the datastore.
   *
   * @returns The cost in the smallest unit of the Massa currency.
   */
  static newEntry(): bigint {
    return StorageCost.bytes(4)
  }
}
