import {
  IClientConfig,
  IContractData,
  IProvider,
  ITransactionData,
  OperationTypeId,
  ProviderType,
} from '../../src/index'
import { getOperationBufferToSign } from '../../src/web3/accounts/Web3Account'
import { BaseClient, PERIOD_OFFSET } from '../../src/web3/BaseClient'

import {
  ExecuteOperation,
  OperationManager,
  OperationType,
  TransferOperation,
} from '../../src/experimental/basicElements'
import {
  PrivateKey,
  Address as XPAddress,
} from '../../src/experimental/basicElements'
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
        new BaseClient(clientConfig).compactBytesForOperation(
          transactionData,
          OperationTypeId.Transaction,
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
      coins: 4n,
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

  test('canonicalize', async () => {
    const transfer: TransferOperation = {
      fee: 1n,
      type: OperationType.Transaction,
      expirePeriod: 2,
      amount: 3n,
      recipientAddress: XPAddress.fromString(
        'AU1wN8rn4SkwYSTDF3dHFY4U28KtsqKL1NnEjDZhHnHEy6cEQm53'
      ),
    }
    const publicKey = await PrivateKey.fromEnv().getPublicKey()
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
      coins: 4n,
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

    const publicKey = await PrivateKey.fromEnv().getPublicKey()
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
})
