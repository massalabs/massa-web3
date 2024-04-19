import { unsigned } from 'big-varint'
import { Address } from './address'
import { PrivateKey, PublicKey } from './keys'
import { BlockchainClient } from '../client'
import { Signature } from './signature'

/**
 * Operation types.
 *
 * @remarks
 * The corresponding values are fixed by the node.
 */
export enum OperationType {
  Transaction,
  RollBuy,
  RollSell,
  ExecuteSmartContractBytecode,
  CallSmartContractFunction,
}

/**
 * Operation details.
 *
 * @remarks
 * Period to live is the number of periods the operation is valid for.
 * This value must be positive and if it's too big, the node will (sliently?) reject the operation.
 *
 * If no fee is provided, 0 is used.
 * If no periodToLive is provided, the DefaultPeriodToLive is used.
 */
export interface OptOpDetails {
  fee?: number
  periodToLive?: number
}

interface BaseOperation {
  fee: number
  expirePeriod: number
  type: OperationType
}

export interface RollOperation extends BaseOperation {
  type: OperationType.RollBuy | OperationType.RollSell
  amount: number
}

export interface TransferOperation extends BaseOperation {
  type: OperationType.Transaction
  amount: number
  recipientAddress: Address
}

interface BaseSmartContractOperation extends BaseOperation {
  maxGas: number
  coins: number
}

export interface CallOperation extends BaseSmartContractOperation {
  type: OperationType.CallSmartContractFunction
  address: string
  functionName: string
  parameter: Uint8Array
}

export interface ExecuteOperation extends BaseSmartContractOperation {
  contractDataBinary: Uint8Array
  datastore?: Map<Uint8Array, Uint8Array>
}

export type OperationDetails =
  | RollOperation
  | TransferOperation
  | CallOperation
  | ExecuteOperation

/*
 * A class regrouping operation functions.
 */
export class OperationManager {
  constructor(
    public privateKey: PrivateKey,
    public blockchainClient?: BlockchainClient
  ) {}

  /**
   * Serializes an operation according to the Massa protocol.
   *
   * @param operation - The operation to serialize.
   *
   * @returns A byte array representing the serialized operation.
   */
  static serialize(operation: OperationDetails): Uint8Array {
    // TODO: check that unsigned.encode is equivalent to varint.encode
    const components = [
      unsigned.encode(BigInt(operation.fee)),
      unsigned.encode(BigInt(operation.expirePeriod)),
      unsigned.encode(BigInt(operation.type)),
    ]

    switch (operation.type) {
      case OperationType.Transaction:
        operation = operation as TransferOperation
        components.push(operation.recipientAddress.versionedBytes())
        components.push(unsigned.encode(BigInt(operation.amount)))
        break
      case OperationType.RollBuy:
      case OperationType.RollSell:
        operation = operation as RollOperation
        components.push(unsigned.encode(BigInt(operation.amount)))
        break
      case OperationType.ExecuteSmartContractBytecode:
        operation = operation as ExecuteOperation
        components.push(unsigned.encode(BigInt(operation.maxGas)))
        components.push(unsigned.encode(BigInt(operation.coins)))
        components.push(
          unsigned.encode(BigInt(operation.contractDataBinary.length))
        )
        components.push(operation.contractDataBinary)

        operation.datastore =
          operation.datastore || new Map<Uint8Array, Uint8Array>()
        components.push(unsigned.encode(BigInt(operation.datastore.size)))

        // length prefixed key-value pairs encoding
        for (const [key, value] of operation.datastore) {
          const keyBytes = Buffer.from(key)
          const keyLen = unsigned.encode(BigInt(keyBytes.length))
          const valueBytes = Buffer.from(value)
          const valueLen = unsigned.encode(BigInt(valueBytes.length))
          components.push(keyLen, keyBytes, valueLen, valueBytes)
        }
        break
      default:
        throw new Error('Operation type not supported')
    }

    return Uint8Array.from(
      components.flatMap((component) => Array.from(component))
    )
  }

  /**
   * Deserializes an operation according to the Massa protocol.
   *
   * @param data - The byte array to deserialize.
   *
   * @returns An new instance of OperationDetails representing the deserialized operation.
   */
  static deserialize(data: Uint8Array): OperationDetails {
    let offset = 0
    const decodeNext = () => {
      const value = unsigned.decode(data, offset)
      offset += unsigned.encodingLength(value)
      return Number(value)
    }

    let operationDetails: BaseOperation = {
      fee: decodeNext(),
      expirePeriod: decodeNext(),
      type: decodeNext(),
    }

    switch (operationDetails.type) {
      case OperationType.Transaction: {
        const recipientAddress = Address.fromVersionedBytes(
          data.slice(offset, offset + 33)
        )
        offset += 33
        const amount = decodeNext()
        return {
          ...operationDetails,
          recipientAddress,
          amount,
        } as TransferOperation

        break
      }
      case OperationType.RollBuy:
      case OperationType.RollSell: {
        const amount = decodeNext()
        return {
          ...operationDetails,
          amount,
        } as RollOperation
        break
      }
      default:
        throw new Error('Operation type not supported')
    }
  }

  /**
   * Formats an operation for signing.
   *
   * @param chainId - The identifier of the blockchain network.
   * @param operation - The operation to sign.
   * @param key - The public key to sign the operation with.
   *
   * @returns The formatted operation ready for signing.
   */
  static canonicalize(
    chainId: number,
    operation: OperationDetails,
    key: PublicKey
  ): Uint8Array {
    // u64ToBytes is little endian
    const networkId = new Uint8Array(8)
    const view = new DataView(networkId.buffer)
    view.setBigUint64(0, BigInt(chainId), false)

    const data = OperationManager.serialize(operation)
    const publicKeyBytes = key.versionedBytes()
    return Uint8Array.from([...networkId, ...publicKeyBytes, ...data])
  }

  /**
   * Signs an operation for a given network.
   *
   * @remarks
   * The chainId is used to counter replay attacks on a different chain.
   *
   * @param chainId - The identifier of the blockchain network.
   * @param operation - The operation to sign.
   *
   * @returns A signature of the operation.
   */
  async sign(chainId: number, operation: OperationDetails): Promise<Signature> {
    return this.privateKey.sign(
      OperationManager.canonicalize(
        chainId,
        operation,
        await this.privateKey.getPublicKey()
      )
    )
  }

  /**
   * Sends an operation to the blockchain.
   *
   * @param operation - The operation to send.
   *
   * @returns An operation Id.
   */
  // TODO: should return an Operation object, having speculative and final getter, instead
  async send(operation: OperationDetails): Promise<string> {
    if (!this.blockchainClient) {
      throw new Error('blockchainClient is mandatory to send operations')
    }

    const networkId = await this.blockchainClient.fetchChainId()
    const signature = await this.sign(networkId, operation)
    const data = OperationManager.serialize(operation)
    const publicKey = await this.privateKey.getPublicKey()

    return this.blockchainClient.sendOperation({
      data,
      publicKey: publicKey.toString(),
      signature: signature.toString(),
    })
  }
}

/**
 * Calculates the expire period.
 *
 * @remarks
 * This function fetches the current period from the blockchain and adds the periodToLive to it.
 * If the periodToLive is too big, the node will silently reject the operation.
 * This is why the periodToLive is limited to an upper value.
 *
 * @param client - The blockchain client.
 * @param periodToLive - The period to live.
 *
 * @returns The expire period.
 * @throws An error if the periodToLive is too low or too big.
 */
export async function calculateExpirePeriod(
  client: BlockchainClient,
  periodToLive: number = 10
): Promise<number> {
  // Todo: adjust max value
  if (periodToLive < 1 || periodToLive > 100) {
    throw new Error('periodToLive must be between 1 and 100')
  }
  return (await client.fetchPeriod()) + periodToLive
}
