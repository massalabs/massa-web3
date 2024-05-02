import {
  IClientConfig,
  IContractData,
  IProvider,
  ITransactionData,
  OperationTypeId,
  ProviderType,
} from '../../../src/index'
import { getOperationBufferToSign } from '../../../src/web3/accounts/Web3Account'
import { BaseClient, PERIOD_OFFSET } from '../../../src/web3/BaseClient'
import { blockchainClientMock } from './mock/blockchainClient.mock'
import {
  ExecuteOperation,
  OperationManager,
  OperationType,
  RollOperation,
  Signature,
  TransferOperation,
  calculateExpirePeriod,
} from '../../../src/experimental/basicElements'
import { PrivateKey, Address } from '../../../src/experimental/basicElements'
import 'dotenv/config'

const clientConfig: IClientConfig = {
  providers: [
    { url: '', type: ProviderType.PUBLIC } as IProvider,
    {
      url: '',
      type: ProviderType.PRIVATE,
    } as IProvider,
  ],
  periodOffset: PERIOD_OFFSET,
}

describe('Unit tests', () => {
  test('serialize - transfer', async () => {
    const transfer: TransferOperation = {
      fee: 1n,
      type: OperationType.Transaction,
      expirePeriod: 2,
      amount: 3n,
      recipientAddress: Address.fromString(
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
        new BaseClient(clientConfig).compactBytesForOperation(
          transactionData,
          OperationTypeId.Transaction,
          2
        )
      )
    )
  })

  test('serialize - sell roll', async () => {
    const sellRoll: RollOperation = {
      type: OperationType.RollSell,
      expirePeriod: 2,
      fee: 1n,
      amount: 3n,
    }

    const transactionData: ITransactionData = {
      fee: 1n,
      amount: 3n,
      recipientAddress: 'AU1wN8rn4SkwYSTDF3dHFY4U28KtsqKL1NnEjDZhHnHEy6cEQm53',
    }

    expect(OperationManager.serialize(sellRoll)).toEqual(
      Uint8Array.from(
        new BaseClient(clientConfig).compactBytesForOperation(
          transactionData,
          OperationTypeId.RollSell,
          2
        )
      )
    )
  })

  test('serialize - execute', async () => {
    const execute: ExecuteOperation = {
      fee: 1n,
      type: OperationType.ExecuteSmartContractBytecode,
      expirePeriod: 2,
      maxGas: 3n,
      maxCoins: 4n,
      contractDataBinary: new Uint8Array([1, 2, 3, 4]),
      datastore: new Map<Uint8Array, Uint8Array>([
        [new Uint8Array([1, 2, 3, 4]), new Uint8Array([1, 2, 3, 4])],
      ]),
    }

    const contractData: IContractData = {
      fee: 1n,
      maxGas: BigInt(3),
      maxCoins: BigInt(4),
      contractDataBinary: new Uint8Array([1, 2, 3, 4]),
      datastore: new Map<Uint8Array, Uint8Array>([
        [new Uint8Array([1, 2, 3, 4]), new Uint8Array([1, 2, 3, 4])],
      ]),
    }

    expect(OperationManager.serialize(execute)).toEqual(
      Uint8Array.from(
        new BaseClient(clientConfig).compactBytesForOperation(
          contractData,
          OperationTypeId.ExecuteSC,
          2
        )
      )
    )
  })

  test('serialize - throw if OperationType is not supported', async () => {
    const operation = {
      type: -1,
    }

    expect(() =>
      OperationManager.serialize(operation as ExecuteOperation)
    ).toThrow('Operation type not supported')
  })

  test('canonicalize', async () => {
    const transfer: TransferOperation = {
      fee: 1n,
      type: OperationType.Transaction,
      expirePeriod: 2,
      amount: 3n,
      recipientAddress: Address.fromString(
        'AU1wN8rn4SkwYSTDF3dHFY4U28KtsqKL1NnEjDZhHnHEy6cEQm53'
      ),
    }
    const publicKey = await PrivateKey.generate().getPublicKey()
    expect(OperationManager.canonicalize(1n, transfer, publicKey)).toEqual(
      Uint8Array.from(
        getOperationBufferToSign(
          1n,
          publicKey.toBytes(),
          Buffer.from(
            new BaseClient(clientConfig).compactBytesForOperation(
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

  test('canonicalize - execute', async () => {
    const execute: ExecuteOperation = {
      fee: 1n,
      type: OperationType.ExecuteSmartContractBytecode,
      expirePeriod: 2,
      maxGas: 3n,
      maxCoins: 4n,
      contractDataBinary: new Uint8Array([1, 2, 3, 4]),
      datastore: new Map<Uint8Array, Uint8Array>([
        [new Uint8Array([1, 2, 3, 4]), new Uint8Array([1, 2, 3, 4])],
      ]),
    }

    const contractData: IContractData = {
      fee: 1n,
      maxGas: BigInt(3),
      maxCoins: BigInt(4),
      contractDataBinary: new Uint8Array([1, 2, 3, 4]),
      datastore: new Map<Uint8Array, Uint8Array>([
        [new Uint8Array([1, 2, 3, 4]), new Uint8Array([1, 2, 3, 4])],
      ]),
    }

    const publicKey = await PrivateKey.generate().getPublicKey()
    expect(OperationManager.canonicalize(1n, execute, publicKey)).toEqual(
      Uint8Array.from(
        getOperationBufferToSign(
          1n,
          publicKey.toBytes(),
          Buffer.from(
            new BaseClient(clientConfig).compactBytesForOperation(
              contractData,
              OperationTypeId.ExecuteSC,
              2
            )
          )
        )
      )
    )
  })

  test('deserialize - transfer', async () => {
    const transfer: TransferOperation = {
      fee: 1n,
      type: OperationType.Transaction,
      expirePeriod: 2,
      amount: 3n,
      recipientAddress: Address.fromString(
        'AU1wN8rn4SkwYSTDF3dHFY4U28KtsqKL1NnEjDZhHnHEy6cEQm53'
      ),
    }

    const serialized = OperationManager.serialize(transfer)
    const deserialized = OperationManager.deserialize(serialized)

    expect(deserialized).toEqual(transfer)
  })

  test('deserialize - roll sell', async () => {
    const sellRoll: RollOperation = {
      type: OperationType.RollSell,
      expirePeriod: 2,
      fee: 1n,
      amount: 3n,
    }

    const serialized = OperationManager.serialize(sellRoll)
    const deserialized = OperationManager.deserialize(serialized)

    expect(deserialized).toEqual(sellRoll)
  })

  test('sign', async () => {
    const transfer: TransferOperation = {
      fee: 1n,
      type: OperationType.Transaction,
      expirePeriod: 2,
      amount: 3n,
      recipientAddress: Address.fromString(
        'AU1wN8rn4SkwYSTDF3dHFY4U28KtsqKL1NnEjDZhHnHEy6cEQm53'
      ),
    }

    const privateKey = await PrivateKey.generate()
    const operationManager = new OperationManager(privateKey)
    const signature = await operationManager.sign(1n, transfer)

    expect(signature).toBeInstanceOf(Signature)
  })

  test('send throw if blockchainClient is not defined', async () => {
    const transfer: TransferOperation = {
      fee: 1n,
      type: OperationType.Transaction,
      expirePeriod: 2,
      amount: 3n,
      recipientAddress: Address.fromString(
        'AU1wN8rn4SkwYSTDF3dHFY4U28KtsqKL1NnEjDZhHnHEy6cEQm53'
      ),
    }

    const privateKey = await PrivateKey.generate()
    const operationManager = new OperationManager(privateKey)

    await expect(operationManager.send(transfer)).rejects.toThrow(
      'blockchainClient is mandatory to send operations'
    )
  })

  test('send', async () => {
    const transfer: TransferOperation = {
      fee: 1n,
      type: OperationType.Transaction,
      expirePeriod: 2,
      amount: 3n,
      recipientAddress: Address.fromString(
        'AU1wN8rn4SkwYSTDF3dHFY4U28KtsqKL1NnEjDZhHnHEy6cEQm53'
      ),
    }

    const privateKey = await PrivateKey.generate()

    const operationManager = new OperationManager(
      privateKey,
      blockchainClientMock
    )

    const operationId = await operationManager.send(transfer)

    expect(blockchainClientMock.getChainId).toHaveBeenCalled()
    expect(blockchainClientMock.sendOperation).toHaveBeenCalledWith({
      data: OperationManager.serialize(transfer),
      publicKey: (await privateKey.getPublicKey()).toString(),
      signature: (await operationManager.sign(1n, transfer)).toString(),
    })
    expect(operationId).toBe('operationId')
  })
})

describe('calculateExpirePeriod', () => {
  test('returns correct expire period', () => {
    const period = 1
    const periodToLive = 10
    const expectedExpirePeriod = period + periodToLive
    const expirePeriod = calculateExpirePeriod(period, periodToLive)
    expect(expirePeriod).toBe(expectedExpirePeriod)
  })

  test('returns correct expire period', () => {
    const period = 1
    const defaultPeriodToLive = 10
    const expectedExpirePeriod = period + defaultPeriodToLive
    const expirePeriod = calculateExpirePeriod(period)
    expect(expirePeriod).toBe(expectedExpirePeriod)
  })

  test('throws error if periodToLive is less than 1', () => {
    const period = 1
    const periodToLive = 0
    expect(() => calculateExpirePeriod(period, periodToLive)).toThrow(
      'periodToLive must be between 1 and 100'
    )
  })
  test('throws error if periodToLive is greater than 100', () => {
    const period = 1
    const periodToLive = 101

    expect(() => calculateExpirePeriod(period, periodToLive)).toThrow(
      'periodToLive must be between 1 and 100'
    )
  })
})
