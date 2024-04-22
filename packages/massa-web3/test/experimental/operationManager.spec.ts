import {
  IClientConfig,
  IProvider,
  ITransactionData,
  OperationTypeId,
  ProviderType,
} from '../../src/index'
import { getOperationBufferToSign } from '../../src/web3/accounts/Web3Account'
import { BaseClient, PERIOD_OFFSET } from '../../src/web3/BaseClient'

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
})
