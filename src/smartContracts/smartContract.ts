import { Args } from '..'
import { Operation } from '../operation'
import {
  CallSCParams,
  DeploySCParams,
  Provider,
  ReadSCData,
  ReadSCParams,
} from '../provider'
import { CallSCOptions, DeploySCOptions, ReadSCOptions } from './'

/**
 * A class to interact with a smart contract.
 */
export class SmartContract {
  constructor(
    public provider: Provider,
    public address: string
  ) {}

  /**
   * Executes a smart contract call operation
   * @param func - The smart contract function to be called.
   * @param parameter - Parameters for the function call in Uint8Array or number[] format.
   * @param options - Includes optional and required parameters like fee, maxGas, coins, and periodToLive.
   * @returns A promise that resolves to an Operation object representing the transaction.
   */
  async call(
    func: string,
    args: Args | Uint8Array = new Uint8Array(),
    options: CallSCOptions = {}
  ): Promise<Operation> {
    const callParams: CallSCParams = {
      func,
      parameter: args,
      target: this.address,
      ...options,
      caller: this.provider.address,
    }

    return this.provider.callSC(callParams)
  }

  /**
   * Executes a smart contract read operation
   * @param func - The smart contract function to be called.
   * @param parameter - Parameter for the function call in Uint8Array format.
   * @param options - Includes optional parameters like fee, maxGas, coins, and periodToLive.
   * @returns A promise that resolves to the result of the read operation.
   */
  async read(
    func: string,
    args: Args | Uint8Array = new Uint8Array(),
    options: ReadSCOptions = {}
  ): Promise<ReadSCData> {
    const readParams: ReadSCParams = {
      func,
      parameter: args,
      target: this.address,
      ...options,
      caller: options.caller ?? this.provider.address,
    }
    return this.provider.readSC(readParams)
  }

  /**
   * Executes a smart contract read operation
   * @param func - The smart contract function to be called.
   * @param parameter - Parameter for the function call in Uint8Array format.
   * @param options - Includes optional parameters like fee, maxGas, coins, and periodToLive.
   * @returns A promise that resolves to the result of the read operation.
   */
  static async deploy(
    provider: Provider,
    byteCode: Uint8Array,
    constructorArgs: Args | Uint8Array = new Uint8Array(),
    options: DeploySCOptions = {}
  ): Promise<SmartContract> {
    const deployParams: DeploySCParams = {
      byteCode,
      parameter: constructorArgs,
      ...options,
    }
    return provider.deploySC(deployParams)
  }
}