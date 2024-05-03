import {
  Operation,
  OperationManager,
  calculateExpirePeriod,
  OperationType,
  Address,
  CallOperation,
} from './basicElements'
import * as StorageCost from './basicElements/storage'
import { BlockchainClient } from './client'
import { Account } from './account'
import { ErrorInsufficientBalance, ErrorMaxGas } from './errors'
import { deployer } from './generated/deployer-bytecode'
import { ONE, ZERO } from './utils'
import { execute } from './basicElements/bytecode'
import { populateDatastore } from './basicElements/dataStore'

// TODO: Move to constants file
export const MAX_GAS_CALL = 4294167295n
export const MIN_GAS_CALL = 2100000n
const DEFAULT_PERIODS_TO_LIVE = 9

type CommonOptions = {
  fee?: bigint
  maxGas?: bigint
  coins?: bigint
  periodToLive?: number
}

type DeployOptions = {
  fee?: bigint
  maxGas?: bigint
  maxCoins?: bigint
  periodToLive?: number
  waitFinalExecution?: boolean
}

type DeployContract = {
  byteCode: Uint8Array
  parameter: Uint8Array
  coins: bigint
}

type CallOptions = CommonOptions

/**
 * A class to interact with a smart contract.
 */
export class SmartContract {
  protected constructor(
    public client: BlockchainClient,
    public contractAddress: string
  ) {}

  /**
   * Initializes a new smart contract object from a contract address.
   *
   * @param client - The client to connect to the desired blockchain.
   * @param contractAddress - The address of the smart contract.
   *
   * @returns A new smart contract instance.
   */
  static fromAddress(
    client: BlockchainClient,
    contract: Address
  ): SmartContract {
    return new SmartContract(client, contract.toString())
  }

  /**
   * Deploys a smart contract on the blockchain.
   *
   * @param client - The client to connect to the desired blockchain.
   * @param account - The account that will deploy the smart contract.
   * @param contract - The contract to deploy.
   * @param opts - Optional deployment details.
   *
   * @returns The deployed smart contract.
   *
   * @throws If the account has insufficient balance to deploy the smart contract.
   */
  static async deploy(
    client: BlockchainClient,
    account: Account,
    // TODO: Handle multiple contracts
    contract: DeployContract,
    opts: DeployOptions
  ): Promise<SmartContract> {
    const totalCost =
      StorageCost.smartContract(contract.byteCode.length) + contract.coins

    if (
      (await client.getBalance(account.address.toString(), false)) < totalCost
    ) {
      throw new Error('Insufficient balance')
    }

    const datastore = populateDatastore([
      {
        data: contract.byteCode,
        args: contract.parameter,
        coins: contract.coins ?? BigInt(ZERO),
      },
    ])

    const operation = await execute(client, account.privateKey, deployer, {
      fee: opts?.fee ?? (await client.getMinimalFee()),
      periodToLive: opts?.periodToLive,
      maxCoins: totalCost,
      maxGas: opts?.maxGas,
      datastore,
    })

    const event = opts.waitFinalExecution
      ? await operation.getFinalEvents()
      : await operation.getSpeculativeEvents()

    // an error can occur in the deployed smart contract
    // We could throw a custom deploy error with the list of errors
    const firstEvent = event.at(-ONE)

    if (!firstEvent) {
      throw new Error('no event received.')
    }
    // @ts-expect-error TODO: Refactor the deployer smart contract logic to return the deployed address in a more readable way
    if (firstEvent?.context.is_error) {
      const parsedData = JSON.parse(firstEvent.data)
      throw new Error(parsedData.massa_execution_error)
    }

    // TODO: Refactor the deployer smart contract logic to return the deployed address in a more readable way
    // TODO: What if multiple smart contracts are deployed in the same operation?
    const addr = firstEvent.data.split(': ')[ONE]

    // TODO: What if multiple smart contracts are deployed in the same operation?
    return new SmartContract(client, addr)
  }

  /**
   * Executes a smart contract call operation
   * @param account - The account performing the operation.
   * @param func - The smart contract function to be called.
   * @param parameter - Parameters for the function call in Uint8Array or number[] format.
   * @param options - Includes optional and required parameters like fee, maxGas, coins, and periodToLive.
   * @returns A promise that resolves to an Operation object representing the transaction.
   */
  async call(
    account: Account,
    func: string,
    parameter: Uint8Array,
    opts: CallOptions
  ): Promise<Operation> {
    opts.coins = opts.coins ?? BigInt(ZERO)

    if (opts.coins > BigInt(ZERO)) {
      const balance = await this.client.getBalance(account.address.toString())
      if (balance < opts.coins) {
        throw new ErrorInsufficientBalance({
          userBalance: balance,
          neededBalance: opts.coins,
        })
      }
    }

    opts.fee = opts.fee ?? (await this.client.getMinimalFee())

    if (!opts.maxGas) {
      opts.maxGas = await SmartContract.getGasEstimation()
    } else {
      if (opts.maxGas > MAX_GAS_CALL) {
        throw new ErrorMaxGas({ isHigher: true, amount: MAX_GAS_CALL })
      } else if (opts.maxGas < MIN_GAS_CALL) {
        throw new ErrorMaxGas({ isHigher: false, amount: MIN_GAS_CALL })
      }
    }

    const expirePeriod = await this.getExpirePeriod(opts.periodToLive)

    const details: CallOperation = {
      fee: opts.fee,
      expirePeriod,
      type: OperationType.CallSmartContractFunction,
      coins: opts.coins,
      maxGas: opts.maxGas,
      address: this.contractAddress,
      func,
      parameter,
    }

    const operation = new OperationManager(account.privateKey, this.client)

    return new Operation(this.client, await operation.send(details))
  }

  /**
   * Returns the period when the operation should expire.
   *
   * @param periodToLive - The number of periods from now when the operation should expire.
   *
   * @returns The calculated expiration period for the operation.
   */
  async getExpirePeriod(
    periodToLive = DEFAULT_PERIODS_TO_LIVE
  ): Promise<number> {
    const currentPeriod = await this.client.fetchPeriod()
    return calculateExpirePeriod(currentPeriod, periodToLive)
  }

  /**
   * Estimates the gas required for an operation.
   * Currently, it returns a predefined maximum gas value.
   * @returns A promise that resolves to the estimated gas amount in bigint.
   * TODO: Implement dynamic gas estimation using dry run call.
   * TODO: Remove static if needed.
   */
  static async getGasEstimation(): Promise<bigint> {
    return MAX_GAS_CALL
  }
}
