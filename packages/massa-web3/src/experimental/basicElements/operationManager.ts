import { unsigned } from 'big-varint'
import { Address } from './address'
import { PrivateKey, PublicKey } from './keys'
import { BlockchainClient } from '../client'
import { Signature } from './signature'
import varint from 'varint'

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
 * This value must be positive and if it's too big, the node will (silently?) reject the operation.
 *
 * If no fee is provided, minimal fee of connected node is used.
 * If no periodToLive is provided, the DefaultPeriodToLive is used.
 */
export type OptOpDetails = {
  fee?: bigint
  periodToLive?: number
}

type BaseOperation = {
  fee: bigint
  expirePeriod: number
  type: OperationType
}

export type RollOperation = BaseOperation & {
  type: OperationType.RollBuy | OperationType.RollSell
  amount: bigint
}

export type TransferOperation = BaseOperation & {
  type: OperationType.Transaction
  amount: bigint
  recipientAddress: Address
}

export type BaseSmartContractOperation = BaseOperation & {
  maxGas: bigint
  coins: bigint
}

export type CallOperation = BaseSmartContractOperation & {
  type: OperationType.CallSmartContractFunction
  address: string
  functionName: string
  parameter: Uint8Array
}

export type ExecuteOperation = BaseSmartContractOperation & {
  type: OperationType.ExecuteSmartContractBytecode
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
      unsigned.encode(operation.fee),
      varint.encode(operation.expirePeriod),
      varint.encode(operation.type),
    ]

    switch (operation.type) {
      case OperationType.Transaction:
        operation = operation as TransferOperation
        components.push(operation.recipientAddress.toBytes())
        components.push(unsigned.encode(operation.amount))
        break
      case OperationType.RollBuy:
      case OperationType.RollSell:
        operation = operation as RollOperation
        components.push(unsigned.encode(operation.amount))
        break
      case OperationType.CallSmartContractFunction:
        // @see https://docs.massa.net/docs/learn/operation-format-execution#callsc-operation-payload
        operation = operation as CallOperation
        components.push(unsigned.encode(operation.maxGas))
        components.push(unsigned.encode(operation.coins))
        components.push(Address.fromString(operation.address).toBytes())
        components.push(varint.encode(operation.functionName.length))
        components.push(Buffer.from(operation.functionName))
        components.push(varint.encode(operation.parameter.length))
        components.push(operation.parameter)
        break
      case OperationType.ExecuteSmartContractBytecode:
        operation = operation as ExecuteOperation
        components.push(unsigned.encode(operation.maxGas))
        components.push(unsigned.encode(operation.coins))
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
    const nextVarInt = () => {
      const value = unsigned.decode(data, offset)
      offset += unsigned.encodingLength(value)
      return value
    }

    let operationDetails: BaseOperation = {
      fee: nextVarInt(),
      expirePeriod: Number(nextVarInt()),
      type: Number(nextVarInt()),
    }

    switch (operationDetails.type) {
      case OperationType.Transaction: {
        const addrLen = Address.getByteLength(data.slice(offset))
        const recipientAddress = Address.fromBytes(
          data.slice(offset, offset + addrLen)
        )
        offset += addrLen
        return {
          ...operationDetails,
          recipientAddress,
          amount: nextVarInt(),
        } as TransferOperation
      }
      case OperationType.RollBuy:
      case OperationType.RollSell: {
        return {
          ...operationDetails,
          amount: nextVarInt(),
        } as RollOperation
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
    chainId: bigint,
    operation: OperationDetails,
    key: PublicKey
  ): Uint8Array {
    // u64ToBytes is little endian
    const networkId = new Uint8Array(8)
    const view = new DataView(networkId.buffer)
    view.setBigUint64(0, chainId, false)

    const data = OperationManager.serialize(operation)
    const publicKeyBytes = key.toBytes()
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
  async sign(chainId: bigint, operation: OperationDetails): Promise<Signature> {
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

    const chainId = await this.blockchainClient.getChainId()
    const signature = await this.sign(chainId, operation)
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
 * If the periodToLive is too big, the node will silently reject the operation.
 * This is why the periodToLive is limited to an upper value.
 *
 * @param period - The current period.
 * @param periodToLive - The period to live.
 *
 * @returns The expire period.
 * @throws An error if the periodToLive is too low or too big.
 */
export function calculateExpirePeriod(
  period: number,
  periodToLive: number = 10
): number {
  // Todo: adjust max value
  if (periodToLive < 1 || periodToLive > 100) {
    throw new Error('periodToLive must be between 1 and 100')
  }
  return period + periodToLive
}
