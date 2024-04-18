import {
  Address,
  ICallData,
  IContractData,
  IRollsData,
  ITransactionData,
  OperationTypeId,
} from '../../src/index'
import { varintEncode } from '../../src/utils/Xbqcrypto'

import { DataType } from '../../src/web3/BaseClient'
import {
  OperationManager,
  OperationType,
  TransferOperation,
} from '../../src/experimental/basicElements'
import {
  PrivateKey,
  Address as XPAddress,
} from '../../src/experimental/basicElements'
import 'dotenv/config'

describe('Unit tests', () => {
  test('serialize - transfer', async () => {
    const transfer: TransferOperation = {
      fee: 1,
      type: OperationType.Transaction,
      expirePeriod: 2,
      amount: 3,
      recipientAddress: XPAddress.fromString(
        'AU1wN8rn4SkwYSTDF3dHFY4U28KtsqKL1NnEjDZhHnHEy6cEQm53'
      ),
    }

    const transactionData: ITransactionData = {
      fee: 1n,
      amount: 3n,
      recipientAddress: 'AU1wN8rn4SkwYSTDF3dHFY4U28KtsqKL1NnEjDZhHnHEy6cEQm53',
    }

    expect(OperationManager.serialize(transfer)).toEqual(
      Uint8Array.from(
        compactBytesForOperation(
          transactionData,
          OperationTypeId.Transaction,
          2
        )
      )
    )
  })

  test('canonicalize', async () => {
    const transfer: TransferOperation = {
      fee: 1,
      type: OperationType.Transaction,
      expirePeriod: 2,
      amount: 3,
      recipientAddress: XPAddress.fromString(
        'AU1wN8rn4SkwYSTDF3dHFY4U28KtsqKL1NnEjDZhHnHEy6cEQm53'
      ),
    }
    const publicKey = await PrivateKey.fromEnv().getPublicKey()
    expect(OperationManager.canonicalize(1, transfer, publicKey)).toEqual(
      Uint8Array.from(
        getOperationBufferToSign(
          1n,
          publicKey.versionedBytes(),
          Buffer.from(
            compactBytesForOperation(
              {
                fee: 1n,
                amount: 3n,
                recipientAddress:
                  'AU1wN8rn4SkwYSTDF3dHFY4U28KtsqKL1NnEjDZhHnHEy6cEQm53',
              },
              OperationTypeId.Transaction,
              2
            )
          )
        )
      )
    )
  })
})

function getOperationBufferToSign(
  chainId: bigint,
  bytesPublicKey: Uint8Array,
  bytesCompact: Buffer
): Buffer {
  // Chain id is an 64-bit unsigned integer, convert to byte array (big endian)
  const chainIdBuffer = new ArrayBuffer(8)
  const view = new DataView(chainIdBuffer)
  view.setBigUint64(0, chainId, false)

  return Buffer.concat([
    Buffer.from(chainIdBuffer),
    bytesPublicKey,
    bytesCompact,
  ])
}

function compactBytesForOperation(
  data: DataType,
  opTypeId: OperationTypeId,
  expirePeriod: number
): Buffer {
  const feeEncoded = Buffer.from(varintEncode(data.fee))
  const expirePeriodEncoded = Buffer.from(varintEncode(expirePeriod))
  const typeIdEncoded = Buffer.from(varintEncode(opTypeId.valueOf()))

  switch (opTypeId) {
    case OperationTypeId.ExecuteSC: {
      const { contractDataBinary, maxGas, maxCoins, datastore } =
        data as IContractData
      const maxGasEncoded = Buffer.from(varintEncode(maxGas))
      const maxCoinEncoded = Buffer.from(varintEncode(maxCoins))

      const contractDataEncoded = Buffer.from(contractDataBinary!)
      const dataLengthEncoded = Buffer.from(
        varintEncode(contractDataEncoded.length)
      )

      // smart contract operation datastore
      const datastoreKeyMap = datastore || new Map<Uint8Array, Uint8Array>()

      let datastoreSerializedBuffer = Buffer.from(new Uint8Array())
      for (const [key, value] of datastoreKeyMap) {
        const encodedKeyBytes = Buffer.from(key)
        const encodedKeyLen = Buffer.from(varintEncode(encodedKeyBytes.length))
        const encodedValueBytes = Buffer.from(value)
        const encodedValueLen = Buffer.from(
          varintEncode(encodedValueBytes.length)
        )
        datastoreSerializedBuffer = Buffer.concat([
          datastoreSerializedBuffer,
          encodedKeyLen,
          encodedKeyBytes,
          encodedValueLen,
          encodedValueBytes,
        ])
      }
      const datastoreSerializedBufferLen = Buffer.from(
        varintEncode(datastoreKeyMap.size)
      )

      let buffers = [
        feeEncoded,
        expirePeriodEncoded,
        typeIdEncoded,
        maxGasEncoded,
        maxCoinEncoded,
        dataLengthEncoded,
        contractDataEncoded,
        datastoreSerializedBufferLen,
      ]

      if (datastoreSerializedBuffer.length !== 0) {
        buffers.push(datastoreSerializedBuffer)
      }

      return Buffer.concat(buffers)
    }
    case OperationTypeId.CallSC: {
      const { maxGas, coins, targetAddress, targetFunction, parameter } =
        data as ICallData

      const maxGasEncoded = Buffer.from(varintEncode(maxGas!))
      const coinsEncoded = Buffer.from(varintEncode(coins!))
      const targetAddressEncoded = new Address(targetAddress).toBytes()
      const targetFunctionEncoded = new Uint8Array(
        Buffer.from(targetFunction, 'utf8')
      )
      const targetFunctionLengthEncoded = Buffer.from(
        varintEncode(targetFunctionEncoded.length)
      )

      let serializedParam: number[]

      if (parameter instanceof Array) {
        serializedParam = parameter
      } else {
        serializedParam = parameter.serialize()
      }

      const parametersEncoded = new Uint8Array(serializedParam)
      const parametersLengthEncoded = Buffer.from(
        varintEncode(parametersEncoded.length)
      )

      return Buffer.concat([
        feeEncoded,
        expirePeriodEncoded,
        typeIdEncoded,
        maxGasEncoded,
        coinsEncoded,
        targetAddressEncoded,
        targetFunctionLengthEncoded,
        targetFunctionEncoded,
        parametersLengthEncoded,
        parametersEncoded,
      ])
    }
    case OperationTypeId.Transaction: {
      const { amount, recipientAddress } = data as ITransactionData

      const transferAmountEncoded = Buffer.from(varintEncode(amount))
      const recipientAddressEncoded = new Address(recipientAddress).toBytes()

      return Buffer.concat([
        feeEncoded,
        expirePeriodEncoded,
        typeIdEncoded,
        recipientAddressEncoded,
        transferAmountEncoded,
      ])
    }
    case OperationTypeId.RollBuy:
    case OperationTypeId.RollSell: {
      const { amount } = data as IRollsData
      const rollsAmountEncoded = Buffer.from(varintEncode(amount))

      return Buffer.concat([
        feeEncoded,
        expirePeriodEncoded,
        typeIdEncoded,
        rollsAmountEncoded,
      ])
    }
  }
}
