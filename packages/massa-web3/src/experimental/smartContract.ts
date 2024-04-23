import { u64ToBytes, Args, u8toByte } from '@massalabs/web3-utils'
import {
  PrivateKey,
  Operation,
  OperationManager,
  ExecuteOperation,
  calculateExpirePeriod,
  OperationType,
  StorageCost,
} from './basicElements'
import { BlockchainClient } from './client'
import { Account } from './account'

export const MAX_GAS_EXECUTE = 3980167295n

interface ExecuteOption {
  fee?: bigint
  periodToLive?: number
  coins?: bigint
  maxGas?: bigint
  datastore?: Map<Uint8Array, Uint8Array>
}

/**
 * A class to compile and execute byte code.
 *
 * @remarks
 * The difference between byte code and a smart contract is that the byte code is the raw code that will be
 * executed on the blockchain, while a smart contract is the code that is already deployed on the blockchain.
 * The byte code is only ephemeral and will be executed only once.
 * A smart contract has an address and exposes functions that can be called multiple times.
 *
 */
export class ByteCode {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  static compile(_source: string): Promise<Uint8Array> {
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
  static async execute(
    client: BlockchainClient,
    privateKey: PrivateKey,
    byteCode: Uint8Array,
    opts: ExecuteOption
  ): Promise<Operation> {
    const operation = new OperationManager(privateKey, client)
    const details: ExecuteOperation = {
      fee: opts?.fee ?? 0n,
      expirePeriod: await calculateExpirePeriod(client, opts?.periodToLive),
      type: OperationType.ExecuteSmartContractBytecode,
      coins: opts?.coins ?? 0n,
      // TODO: implement max gas
      maxGas: opts?.maxGas || MAX_GAS_EXECUTE,
      contractDataBinary: byteCode,
      datastore: opts.datastore,
    }

    return new Operation(client, await operation.send(details))
  }
}

interface DatastoreContract {
  data: Uint8Array
  args: Uint8Array
  coins: bigint
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
function populateDatastore(
  contracts: DatastoreContract[]
): Map<Uint8Array, Uint8Array> {
  const datastore = new Map<Uint8Array, Uint8Array>()

  contracts.forEach((contract, i) => {
    datastore.set(u64ToBytes(BigInt(i + 1)), contract.data)
    if (contract.args) {
      datastore.set(
        new Uint8Array(
          new Args()
            .addU64(BigInt(i + 1))
            .addUint8Array(u8toByte(0))
            .serialize()
        ),
        new Uint8Array(contract.args)
      )
    }
    if (contract.coins > 0) {
      datastore.set(
        new Uint8Array(
          new Args()
            .addU64(BigInt(i + 1))
            .addUint8Array(u8toByte(1))
            .serialize()
        ),
        u64ToBytes(BigInt(contract.coins))
      )
    }
  })

  return datastore
}

interface DeployOptions {
  smartContractCoins?: bigint
  fee?: bigint
  periodToLive?: number
  coins?: bigint
  maxGas?: bigint
  waitFinalExecution?: boolean
}

interface CallOptions {}

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
    contractAddress: string
  ): SmartContract {
    return new SmartContract(client, contractAddress)
  }

  /**
   * Deploys a smart contract on the blockchain.
   *
   * @param client - The client to connect to the desired blockchain.
   * @param account - The account that will deploy the smart contract.
   * @param byteCode - The byte code of the smart contract.
   * @param Args - The arguments of the smart contract constructor.
   * @param opts - Optional deployment details.
   *
   * @returns The deployed smart contract.
   *
   * @throws If the account has insufficient balance to deploy the smart contract.
   */
  static async deploy(
    client: BlockchainClient,
    account: Account,
    byteCode: Uint8Array,
    Args: Uint8Array,
    opts: DeployOptions
  ): Promise<SmartContract> {
    const totalCost =
      BigInt(StorageCost.smartContract(byteCode.length)) + opts.coins

    if (
      (await client.getBalance(account.address.toString(), true)) < totalCost
    ) {
      throw new Error('Insufficient balance')
    }

    const datastore = populateDatastore([
      {
        data: byteCode,
        args: Args,
        coins: BigInt(opts.smartContractCoins),
      },
    ])

    // TODO: fix the code to execute the deployer smart contract instead
    const operation = await ByteCode.execute(
      client,
      account.privateKey,
      byteCode,
      {
        fee: opts?.fee,
        periodToLive: opts?.periodToLive,
        coins: opts?.coins,
        maxGas: opts?.maxGas,
        datastore,
      }
    )

    const event = opts.waitFinalExecution
      ? await operation.getFinalEvents()
      : await operation.getSpeculativeEvents()

    if (event.length === 0) {
      throw new Error('no event received.')
    }

    // TODO: Refactor the deployer smart contract logic to return the deployed address in a more readable way
    const addr = event[0].data.split(': ')[1]

    return new SmartContract(client, addr)
  }

  // todo: implement call
  async call(
    _method: string, // eslint-disable-line @typescript-eslint/no-unused-vars
    _args: Uint8Array, // eslint-disable-line @typescript-eslint/no-unused-vars
    _opts: CallOptions // eslint-disable-line @typescript-eslint/no-unused-vars
  ): Promise<Uint8Array> {
    throw new Error('Not implemented')
  }
}
