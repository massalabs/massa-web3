import { Operation } from '../../src/basicElements'
import { blockchainClientMock } from './mock/blockchainClient.mock'

const OPERATION_ID = 'testOperationID'

describe('Unit tests', () => {
  const operation = new Operation(blockchainClientMock, OPERATION_ID)

  test('get operation status', async () => {
    const status = await operation.getStatus()

    expect(blockchainClientMock.getOperationStatus).toHaveBeenCalledWith(
      OPERATION_ID
    )
    expect(status).toBeDefined()
  })

  test('get speculative events', async () => {
    const events = await operation.getSpeculativeEvents()

    expect(blockchainClientMock.getEvents).toHaveBeenCalledWith({
      operationId: OPERATION_ID,
      isFinal: false,
    })
    expect(events).toStrictEqual([])
  })

  test('get final events', async () => {
    const events = await operation.getFinalEvents()

    expect(blockchainClientMock.getEvents).toHaveBeenCalledWith({
      operationId: OPERATION_ID,
      isFinal: true,
    })
    expect(events).toStrictEqual([])
  })
})
