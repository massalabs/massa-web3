import {
  getMultipleSitesGlobalMetadata,
  ParsedMetadata,
} from '../../src/deweb/metadata'
import { provider } from './setup'
import { DEFAULT_MAX_ARGUMENT_ARRAY_SIZE } from '../../src/provider/constants'

describe('Deweb getMultipleSitesGlobalMetadata Integration Tests', () => {
  // Mock variables that we can change during tests
  let mockBatchSize = jest.fn()
  const originalModule = jest.requireActual('../../src/provider/constants')

  // Mock the constants module using jest.mock with a factory function
  jest.mock('../../src/provider/constants', () => ({
    ...jest.requireActual('../../src/provider/constants'),
    get DEFAULT_MAX_ARGUMENT_ARRAY_SIZE() {
      return mockBatchSize()
    },
  }))

  // Helper functions to control mock values
  const setMockBatchSize = (batchSize: number) => {
    mockBatchSize.mockReturnValue(batchSize)
  }

  const resetMockBatchSize = () => {
    mockBatchSize.mockReturnValue(
      originalModule.DEFAULT_MAX_ARGUMENT_ARRAY_SIZE
    )
  }

  beforeEach(() => {
    // Reset to original values before each test
    resetMockBatchSize()
  })

  afterEach(() => {
    // Ensure cleanup after each test
    resetMockBatchSize()
  })

  // Test addresses with their expected metadata
  const testAddresses = [
    'AS1mKbtWaaomRkggVe8fTtu2TxLzFNLR8tdHBvwuB341L9Z91Zkj',
    'AS1p6UCuRb4XdJxxb37sUfuGWyx1pYC52b9QCL96aYHgqbfuNZXf',
    'AS1v9beGWgJ5HbVif9Fseo9H8LDkkXDQRHVKVHQnxzMk5s54RVob',
    'AS12UT2sA3333TCPf8r3JGLLK3wtnnCMHUU9cFUQH7o54vDSGTKps',
    'AS12kDMGfuViwb6JFeoTtYu3PAyrrnsH8TeNjjc4dMiMWAP3SKgaG',
  ]

  // Expected metadata for each address
  const expectedMetadata: Map<string, ParsedMetadata> = new Map([
    [
      'AS1mKbtWaaomRkggVe8fTtu2TxLzFNLR8tdHBvwuB341L9Z91Zkj',
      {
        title: 'test',
        description: 'aa',
        keywords: ['flappy', 'cool'],
        lastUpdate: '1742897266',
      },
    ],
    [
      'AS1p6UCuRb4XdJxxb37sUfuGWyx1pYC52b9QCL96aYHgqbfuNZXf',
      {
        lastUpdate: '1742830846',
      }, // empty parsedMetadata
    ],
    [
      'AS1v9beGWgJ5HbVif9Fseo9H8LDkkXDQRHVKVHQnxzMk5s54RVob',
      {
        title: 'test immutable',
        lastUpdate: '1743497523',
      },
    ],
    [
      'AS12UT2sA3333TCPf8r3JGLLK3wtnnCMHUU9cFUQH7o54vDSGTKps',
      {
        title: 'test3',
        description: 'aa',
        lastUpdate: '1741090678',
      },
    ],
    [
      'AS12kDMGfuViwb6JFeoTtYu3PAyrrnsH8TeNjjc4dMiMWAP3SKgaG',
      {
        title: 'test2',
        description: 'aaaan',
        keywords: ['aa'],
        lastUpdate: '1745576654',
      },
    ],
  ])

  test('should retrieve metadata for all test addresses with default batch size', async () => {
    const results = await getMultipleSitesGlobalMetadata(
      testAddresses,
      provider
    )

    expect(Array.isArray(results)).toBe(true)
    expect(results).toHaveLength(testAddresses.length)

    // Verify each result matches expected metadata
    results.forEach((result, index) => {
      const address = testAddresses[index]
      const expected = expectedMetadata.get(address)!

      expect(result).toEqual(expected)
    })
  })

  test('should handle batching when addresses array size exceeds DEFAULT_MAX_ARGUMENT_ARRAY_SIZE', async () => {
    // Set DEFAULT_MAX_ARGUMENT_ARRAY_SIZE to 2 to simulate having 2.5 * DEFAULT_MAX_ARGUMENT_ARRAY_SIZE addresses
    // This allows to test batching logic
    setMockBatchSize(2)

    const results = await getMultipleSitesGlobalMetadata(
      testAddresses,
      provider
    )

    expect(Array.isArray(results)).toBe(true)
    expect(results).toHaveLength(testAddresses.length)

    // Verify each result still matches expected metadata despite batching
    results.forEach((result, index) => {
      const address = testAddresses[index]
      const expected = expectedMetadata.get(address)!

      expect(result).toEqual(expected)
    })
  })

  test('should handle single address with metadata', async () => {
    const singleAddress = [
      'AS1mKbtWaaomRkggVe8fTtu2TxLzFNLR8tdHBvwuB341L9Z91Zkj',
    ]
    const results = await getMultipleSitesGlobalMetadata(
      singleAddress,
      provider
    )

    expect(Array.isArray(results)).toBe(true)
    expect(results).toHaveLength(1)
    expect(results[0]).toEqual(expectedMetadata.get(singleAddress[0]))
  })
  test('should handle batching when addresses array size is 5 time DEFAULT_MAX_ARGUMENT_ARRAY_SIZE', async () => {
    // Set batch size to 1 to force maximum batching
    setMockBatchSize(1)

    const results = await getMultipleSitesGlobalMetadata(
      testAddresses,
      provider
    )

    expect(Array.isArray(results)).toBe(true)
    expect(results).toHaveLength(testAddresses.length)

    // Verify order is maintained
    results.forEach((result, index) => {
      const address = testAddresses[index]
      const expected = expectedMetadata.get(address)!

      expect(result).toEqual(expected)
    })
  })

  test('should handle batching when addresses array size is 2*DEFAULT_MAX_ARGUMENT_ARRAY_SIZE +1', async () => {
    const addresses = Array(2 * DEFAULT_MAX_ARGUMENT_ARRAY_SIZE + 1).fill(
      testAddresses[0]
    )
    const results = await getMultipleSitesGlobalMetadata(addresses, provider)

    expect(Array.isArray(results)).toBe(true)
    expect(results).toHaveLength(addresses.length)

    // Verify order is maintained
    results.forEach((result) => {
      const expected = expectedMetadata.get(testAddresses[0])!

      expect(result).toEqual(expected)
    })
  })

  test('should handle empty address list', async () => {
    const results = await getMultipleSitesGlobalMetadata([], provider)

    expect(Array.isArray(results)).toBe(true)
    expect(results).toHaveLength(0)
  })

  test('should handle invalid address list', async () => {
    await expect(
      getMultipleSitesGlobalMetadata(['invalid-address'], provider)
    ).rejects.toThrow('Error retrieving datastore keys')
  })
})
