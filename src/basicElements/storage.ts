import { Mas, fromMicroMas } from './mas'
import { U32 } from './serializers'

const BYTE_COST_MICRO_MASSA = 100n
const ACCOUNT_SIZE_BYTES = 10

/* eslint-disable @typescript-eslint/no-extraneous-class */

/**
 * Provides methods for calculating the cost of operation.
 */

export class StorageCost {
  private static readonly byteCostMicroMassa = BYTE_COST_MICRO_MASSA
  private static readonly accountSizeBytes = ACCOUNT_SIZE_BYTES

  /**
   * Calculates the cost of a given number of bytes.
   *
   * @param numberOfBytes - The number of bytes.
   *
   * @returns The cost in the smallest unit of the Massa currency.
   */
  static bytes(numberOfBytes: number): Mas {
    return BigInt(numberOfBytes) * fromMicroMas(this.byteCostMicroMassa)
  }

  /**
   * Calculates the cost of creating a new account.
   *
   * @returns The cost in the smallest unit of the Massa currency.
   */
  static account(): Mas {
    return this.bytes(this.accountSizeBytes)
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
  static smartContract(numberOfBytes: number): Mas {
    return this.bytes(numberOfBytes) + this.account()
  }

  /**
   * Calculates the cost of creating a new entry in the datastore.
   *
   * @returns The cost in the smallest unit of the Massa currency.
   */
  static newEntry(): Mas {
    return this.bytes(U32.SIZE_BYTE)
  }
}
