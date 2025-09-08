import { toBatch } from '../../src/utils/array'

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
