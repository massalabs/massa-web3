import { OperationStatus } from '../../../src/experimental/basicElements'
import { accountOperation } from './setup'

describe('AccountOperation tests', () => {
  test('transfer', async () => {
    const transfer = await accountOperation.transfer(
      'AU1wN8rn4SkwYSTDF3dHFY4U28KtsqKL1NnEjDZhHnHEy6cEQm53',
      1n
    )
    expect(await transfer.getStatus()).toBe(OperationStatus.NotFound)
  })

  test('not enough fee', async () => {
    expect(
      accountOperation.transfer(
        'AU1wN8rn4SkwYSTDF3dHFY4U28KtsqKL1NnEjDZhHnHEy6cEQm53',
        1n,
        { fee: 1n }
      )
    ).rejects.toThrow(
      'Bad request: fee is too low provided: 0.000000001 , minimal_fees required: 0.01'
    )
  })
})
