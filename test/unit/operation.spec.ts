import { Operation } from '../../src/operation'
import {
  EventExecutionContext,
  OutputEvents,
} from '../../src/generated/client-types'
import { OperationStatus, toBatch, batchListAndCall } from '../../src/operation'
import { blockchainClientMock } from './mock/blockchainClient.mock'
import { providerMock } from './mock/provider.mock'

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
    ] as OutputEvents

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
    ] as OutputEvents

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

describe('Operation batch tests', () => {
  describe('toBatch', () => {
    it('should split array into batches of specified size', () => {
      const input = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
      const batchSize = 3
      const expected = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [10]]

      const result = toBatch(input, batchSize)

      expect(result).toEqual(expected)
    })

    it('should handle empty array', () => {
      const input: number[] = []
      const batchSize = 3
      const expected: number[][] = []

      const result = toBatch(input, batchSize)

      expect(result).toEqual(expected)
    })

    it('should handle array smaller than batch size', () => {
      const input = [1, 2]
      const batchSize = 5
      const expected = [[1, 2]]

      const result = toBatch(input, batchSize)

      expect(result).toEqual(expected)
    })

    it('should handle array exactly matching batch size', () => {
      const input = [1, 2, 3, 4, 5]
      const batchSize = 5
      const expected = [[1, 2, 3, 4, 5]]

      const result = toBatch(input, batchSize)

      expect(result).toEqual(expected)
    })

    it('should handle batch size of 1', () => {
      const input = [1, 2, 3, 4]
      const batchSize = 1
      const expected = [[1], [2], [3], [4]]

      const result = toBatch(input, batchSize)

      expect(result).toEqual(expected)
    })

    it('should handle batch size of 0', () => {
      const input = [1, 2, 3, 4, 5]
      const batchSize = 0
      const expected: number[][] = [[1, 2, 3, 4, 5]]

      const result = toBatch(input, batchSize)

      expect(result).toEqual(expected)
    })

    it('should work with string arrays', () => {
      const input = ['a', 'b', 'c', 'd', 'e', 'f']
      const batchSize = 2
      const expected = [
        ['a', 'b'],
        ['c', 'd'],
        ['e', 'f'],
      ]

      const result = toBatch(input, batchSize)

      expect(result).toEqual(expected)
    })

    it('should work with object arrays', () => {
      const input = [
        { id: 1, name: 'A' },
        { id: 2, name: 'B' },
        { id: 3, name: 'C' },
        { id: 4, name: 'D' },
      ]
      const batchSize = 2
      const expected = [
        [
          { id: 1, name: 'A' },
          { id: 2, name: 'B' },
        ],
        [
          { id: 3, name: 'C' },
          { id: 4, name: 'D' },
        ],
      ]

      const result = toBatch(input, batchSize)

      expect(result).toEqual(expected)
    })

    it('should handle large arrays', () => {
      const input = Array.from({ length: 1000 }, (_, i) => i)
      const batchSize = 100
      const result = toBatch(input, batchSize)

      expect(result).toHaveLength(10)
      expect(result[0]).toHaveLength(100)
      expect(result[9]).toHaveLength(100)

      // Verify all elements are preserved
      const flattened = result.flat()
      expect(flattened).toEqual(input)
    })

    it('should preserve original array immutability', () => {
      const input = [1, 2, 3, 4, 5]
      const originalInput = [...input]
      const batchSize = 2

      toBatch(input, batchSize)

      expect(input).toEqual(originalInput)
    })

    it('should handle negative batch size', () => {
      const input = [1, 2, 3, 4, 5]
      const batchSize = -1

      expect(() => toBatch(input, batchSize)).toThrow(
        'batch size should be positive'
      )
    })
  })

  describe('batchListAndCall', () => {
    it('should batch list and call function with results flattened', async () => {
      const input = [1, 2, 3, 4, 5, 6]
      const batchSize = 2

      // Mock function that doubles each number in the batch
      const batchFunction = jest
        .fn()
        .mockImplementation(async (batch: number[]) => {
          return batch.map((n) => n * 2)
        })

      const result = await batchListAndCall(input, batchFunction, batchSize)

      expect(result).toEqual([2, 4, 6, 8, 10, 12])
      expect(batchFunction).toHaveBeenCalledTimes(3) // 6 items / batch size 2 = 3 batches
      expect(batchFunction).toHaveBeenCalledWith([1, 2])
      expect(batchFunction).toHaveBeenCalledWith([3, 4])
      expect(batchFunction).toHaveBeenCalledWith([5, 6])
    })

    it('should handle empty input array', async () => {
      const input: number[] = []
      const batchFunction = jest.fn().mockResolvedValue([])

      const result = await batchListAndCall(input, batchFunction, 3)

      expect(result).toEqual([])
      expect(batchFunction).not.toHaveBeenCalled()
    })

    it('should handle batch size larger than input', async () => {
      const input = [1, 2, 3]
      const batchSize = 5 // Larger than input

      const batchFunction = jest
        .fn()
        .mockImplementation(async (batch: number[]) => {
          return batch.map((n) => n.toString())
        })

      const result = await batchListAndCall(input, batchFunction, batchSize)

      expect(result).toEqual(['1', '2', '3'])
      expect(batchFunction).toHaveBeenCalledTimes(1)
      expect(batchFunction).toHaveBeenCalledWith([1, 2, 3])
    })

    it('should handle batch function returning different sized arrays', async () => {
      const input = ['a', 'bb', 'ccc', 'dddd']
      const batchSize = 2

      // Function returns array with length based on input string length
      const batchFunction = jest
        .fn()
        .mockImplementation(async (batch: string[]) => {
          return batch.flatMap((str) => Array(str.length).fill(str))
        })

      const result = await batchListAndCall(input, batchFunction, batchSize)

      expect(result).toEqual([
        'a',
        'bb',
        'bb',
        'ccc',
        'ccc',
        'ccc',
        'dddd',
        'dddd',
        'dddd',
        'dddd',
      ])
      expect(batchFunction).toHaveBeenCalledTimes(2)
    })
    it('should handle batch function that throws error', async () => {
      const input = [1, 2, 3, 4]
      const batchSize = 2

      const batchFunction = jest
        .fn()
        .mockResolvedValueOnce([10, 20]) // First batch succeeds
        .mockRejectedValueOnce(new Error('Batch failed')) // Second batch fails

      await expect(
        batchListAndCall(input, batchFunction, batchSize)
      ).rejects.toThrow('Batch failed')
      expect(batchFunction).toHaveBeenCalledTimes(2)
    })

    it('should work with complex object types', async () => {
      const input = [
        { id: 1, name: 'Alice' },
        { id: 2, name: 'Bob' },
        { id: 3, name: 'Charlie' },
      ]
      const batchSize = 2

      const batchFunction = jest
        .fn()
        .mockImplementation(async (batch: typeof input) => {
          return batch.map((person) => ({ ...person, processed: true }))
        })

      const result = await batchListAndCall(input, batchFunction, batchSize)

      expect(result).toEqual([
        { id: 1, name: 'Alice', processed: true },
        { id: 2, name: 'Bob', processed: true },
        { id: 3, name: 'Charlie', processed: true },
      ])
      expect(batchFunction).toHaveBeenCalledTimes(2)
    })
  })
})
