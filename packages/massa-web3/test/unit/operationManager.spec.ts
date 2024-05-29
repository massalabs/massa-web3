import { blockchainClientMock } from './mock/blockchainClient.mock'
import {
  ExecuteOperation,
  OperationManager,
  OperationType,
  RollOperation,
  Signature,
  TransferOperation,
  calculateExpirePeriod,
} from '../../src/basicElements'
import { PrivateKey, Address } from '../../src/basicElements'
import 'dotenv/config'

describe('Operation manager tests', () => {
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

    expect(OperationManager.serialize(transfer)).toEqual(
      new Uint8Array([
        1, 2, 0, 0, 0, 123, 112, 231, 120, 210, 147, 6, 222, 60, 132, 122, 220,
        63, 36, 111, 216, 72, 248, 161, 29, 104, 213, 241, 70, 172, 217, 243,
        24, 153, 171, 29, 50, 3,
      ])
    )
  })

  test('serialize - sell roll', async () => {
    const sellRoll: RollOperation = {
      type: OperationType.RollSell,
      expirePeriod: 2,
      fee: 1n,
      amount: 3n,
    }

    expect(OperationManager.serialize(sellRoll)).toEqual(
      new Uint8Array([1, 2, 2, 3])
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

    expect(OperationManager.serialize(execute)).toEqual(
      new Uint8Array([
        1, 2, 3, 3, 4, 4, 1, 2, 3, 4, 1, 4, 1, 2, 3, 4, 4, 1, 2, 3, 4,
      ])
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

    const publicKey = await PrivateKey.fromString(
      'S1edybaAp8cYXwXtchW3nfyPwwh9tvoWgSdkxK2uJwWo9zZrCH9'
    ).getPublicKey()

    expect(OperationManager.canonicalize(1n, transfer, publicKey)).toEqual(
      new Uint8Array([
        0, 0, 0, 0, 0, 0, 0, 1, 0, 80, 4, 30, 211, 241, 1, 3, 219, 6, 32, 235,
        244, 186, 4, 239, 84, 155, 62, 17, 45, 68, 245, 236, 88, 141, 50, 82,
        254, 9, 151, 4, 167, 1, 2, 0, 0, 0, 123, 112, 231, 120, 210, 147, 6,
        222, 60, 132, 122, 220, 63, 36, 111, 216, 72, 248, 161, 29, 104, 213,
        241, 70, 172, 217, 243, 24, 153, 171, 29, 50, 3,
      ])
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

    const publicKey = await PrivateKey.fromString(
      'S1edybaAp8cYXwXtchW3nfyPwwh9tvoWgSdkxK2uJwWo9zZrCH9'
    ).getPublicKey()

    expect(OperationManager.canonicalize(1n, execute, publicKey)).toEqual(
      new Uint8Array([
        0, 0, 0, 0, 0, 0, 0, 1, 0, 80, 4, 30, 211, 241, 1, 3, 219, 6, 32, 235,
        244, 186, 4, 239, 84, 155, 62, 17, 45, 68, 245, 236, 88, 141, 50, 82,
        254, 9, 151, 4, 167, 1, 2, 3, 3, 4, 4, 1, 2, 3, 4, 1, 4, 1, 2, 3, 4, 4,
        1, 2, 3, 4,
      ])
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
