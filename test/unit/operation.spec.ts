import { Operation } from '../../src/operation'
import { EventExecutionContext } from '../../src/generated/client-types'
import { OperationStatus } from '../../src/operation'
import { blockchainClientMock } from './mock/blockchainClient.mock'
import { providerMock } from './mock/provider.mock'
import { SCEvent } from '../../src'

const OPERATION_ID = 'testOperationID'
const operation = new Operation(providerMock, OPERATION_ID)

describe('Operation tests', () => {
  test('get success operation status', async () => {
    jest
      .spyOn(providerMock, 'getOperationStatus')
      .mockResolvedValueOnce(OperationStatus.Success)
    const status = await operation.getStatus()

    expect(blockchainClientMock.getOperationStatus).toHaveBeenCalledWith(
      OPERATION_ID
    )
    expect(status).toBe(OperationStatus.Success)
  })

  test('get SpeculativeSuccess operation status', async () => {
    jest
      .spyOn(providerMock, 'getOperationStatus')
      .mockResolvedValueOnce(OperationStatus.SpeculativeSuccess)
    const status = await operation.getStatus()

    expect(blockchainClientMock.getOperationStatus).toHaveBeenCalledWith(
      OPERATION_ID
    )
    expect(status).toBe(OperationStatus.SpeculativeSuccess)
  })

  test('get operation status not found', async () => {
    jest
      .spyOn(providerMock, 'getOperationStatus')
      .mockResolvedValueOnce(OperationStatus.NotFound)
    const status = await operation.getStatus()

    expect(blockchainClientMock.getOperationStatus).toHaveBeenCalledWith(
      OPERATION_ID
    )
    expect(status).toBe(OperationStatus.NotFound)
  })

  test('get speculative events', async () => {
    const dummyEvents = [
      {
        data: 'theData',
        context: {} as EventExecutionContext,
      },
      {
        data: 'moreData',
        context: {} as EventExecutionContext,
      },
    ] as SCEvent[]

    jest
      .spyOn(blockchainClientMock, 'getOperationStatus')
      .mockResolvedValueOnce(OperationStatus.SpeculativeSuccess)
    jest
      .spyOn(blockchainClientMock, 'getEvents')
      .mockResolvedValueOnce(dummyEvents)

    const events = await operation.getSpeculativeEvents()

    expect(blockchainClientMock.getEvents).toHaveBeenCalledWith({
      operationId: OPERATION_ID,
      isFinal: false,
    })
    expect(events).toStrictEqual(dummyEvents)
  })

  test('get final events', async () => {
    const dummyEvents = [
      {
        data: 'theData',
        context: {} as EventExecutionContext,
      },
      {
        data: 'moreData',
        context: {} as EventExecutionContext,
      },
    ] as SCEvent[]

    jest
      .spyOn(blockchainClientMock, 'getOperationStatus')
      .mockResolvedValueOnce(OperationStatus.Success)
    jest
      .spyOn(blockchainClientMock, 'getEvents')
      .mockResolvedValueOnce(dummyEvents)

    const events = await operation.getFinalEvents()

    expect(blockchainClientMock.getEvents).toHaveBeenCalledWith({
      operationId: OPERATION_ID,
      isFinal: true,
    })
    expect(events).toStrictEqual(dummyEvents)
  })

  test('get events of not found', async () => {
    jest
      .spyOn(operation, 'waitFinalExecution')
      .mockResolvedValueOnce(OperationStatus.NotFound)

    await expect(operation.getFinalEvents()).rejects.toThrow(
      'Operation not found'
    )
  })
})
