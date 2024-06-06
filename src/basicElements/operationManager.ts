import { unsigned } from 'big-varint'
import { Address } from './address'
import { PrivateKey, PublicKey } from './keys'
import { BlockchainClient } from '../client'
import { Signature } from './signature'
import varint from 'varint'
import { FIRST } from '../utils'
import { U64 } from './serializers'
import { Operation } from './operation'

const PERIOD_TO_LIVE_DEFAULT = 10
const PERIOD_TO_LIVE_MAX = 100
const PERIOD_TO_LIVE_MIN = 1

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
  fee?: U64.U64
  periodToLive?: number
}

type BaseOperation = {
  fee: U64.U64
  expirePeriod: number
  type: OperationType
}

export type RollOperation = BaseOperation & {
  type: OperationType.RollBuy | OperationType.RollSell
  amount: U64.U64
}

export type TransferOperation = BaseOperation & {
  type: OperationType.Transaction
  amount: U64.U64
  recipientAddress: Address
}

export type BaseSmartContractOperation = BaseOperation & {
  maxGas: U64.U64
  coins: U64.U64
}

export type CallOperation = BaseSmartContractOperation & {
  type: OperationType.CallSmartContractFunction
  address: string
  func: string
  parameter: Uint8Array
}

// @see https://docs.massa.net/docs/learn/operation-format-execution#executesc-operation-payload
export type ExecuteOperation = BaseOperation & {
  maxGas: U64.U64
  maxCoins: U64.U64
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
        components.push(varint.encode(operation.func.length))
        components.push(Buffer.from(operation.func))
        components.push(varint.encode(operation.parameter.length))
        components.push(operation.parameter)
        break
      case OperationType.ExecuteSmartContractBytecode:
        operation = operation as ExecuteOperation
        components.push(unsigned.encode(operation.maxGas))
        components.push(unsigned.encode(operation.maxCoins))
        components.push(
          unsigned.encode(U64.fromNumber(operation.contractDataBinary.length))
        )
        components.push(operation.contractDataBinary)

        operation.datastore =
          operation.datastore || new Map<Uint8Array, Uint8Array>()
        components.push(
          unsigned.encode(U64.fromNumber(operation.datastore.size))
        )

        // length prefixed key-value pairs encoding
        for (const [key, value] of operation.datastore) {
          const keyBytes = Buffer.from(key)
          const keyLen = unsigned.encode(U64.fromNumber(keyBytes.length))
          const valueBytes = Buffer.from(value)
          const valueLen = unsigned.encode(U64.fromNumber(valueBytes.length))
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
    let offset = FIRST

    // eslint-disable-next-line func-style
    const nextVarInt = (): bigint => {
      const value = unsigned.decode(data, offset)
      offset += unsigned.encodingLength(value)
      return value
    }

    const operationDetails: BaseOperation = {
      fee: nextVarInt(),
      expirePeriod: Number(nextVarInt()),
      type: Number(nextVarInt()),
    }

    switch (operationDetails.type) {
      case OperationType.Transaction: {
        const { data: addrBytes, length } = Address.extractFromBuffer(
          data,
          offset
        )
        const recipientAddress = Address.fromBytes(addrBytes)
        offset += length
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
    const networkId = new Uint8Array(U64.SIZE_BYTE)
    const view = new DataView(networkId.buffer)
    view.setBigUint64(FIRST, chainId, false)

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
  async send(operation: OperationDetails): Promise<Operation> {
    if (!this.blockchainClient) {
      throw new Error('blockchainClient is mandatory to send operations')
    }

    const chainId = await this.blockchainClient.getChainId()
    const signature = await this.sign(chainId, operation)
    const data = OperationManager.serialize(operation)
    const publicKey = await this.privateKey.getPublicKey()

    return new Operation(
      this.blockchainClient,
      await this.blockchainClient.sendOperation({
        data,
        publicKey: publicKey.toString(),
        signature: signature.toString(),
      })
    )
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
  periodToLive = PERIOD_TO_LIVE_DEFAULT
): number {
  // Todo: adjust max value
  if (periodToLive < PERIOD_TO_LIVE_MIN || periodToLive > PERIOD_TO_LIVE_MAX) {
    throw new Error(
      `periodToLive must be between ${PERIOD_TO_LIVE_MIN} and ${PERIOD_TO_LIVE_MAX}.`
    )
  }
  return period + periodToLive
}