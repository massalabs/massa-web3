import { getMultipleAddressesDatastoreKeys } from '../../src/client/storage'
import { MNS_CONTRACTS } from '../../src/contracts-wrappers/mns'
import { provider } from './setup'
import {
  MAX_ADDRESSES_DATASTORE_KEYS_QUERY,
  MAX_DATASTORE_KEYS_QUERY,
} from '../../src/provider/constants'
import { DOMAIN_SEPARATOR_KEY } from '../../src/deweb/keys'

// Test addresses
const usdcAddress = 'AS12k8viVmqPtRuXzCm6rKXjLgpQWqbuMjc37YHhB452KSUUb9FgL'
const mnsAddress = MNS_CONTRACTS.buildnet

describe('Helper getMultipleAddressesDatastoreKeys', () => {
  // Mock variables that we can change during tests
  let mockBatchSize = jest.fn()
  let mockPageSize = jest.fn()
  const originalModule = jest.requireActual('../../src/provider/constants')

  // Mock the constants module using jest.mock with a factory function
  jest.mock('../../src/provider/constants', () => ({
    ...jest.requireActual('../../src/provider/constants'),
    get MAX_ADDRESSES_DATASTORE_KEYS_QUERY() {
      return mockBatchSize
    },
    get MAX_DATASTORE_KEYS_QUERY() {
      return mockPageSize
    },
  }))

  // Helper functions to control mock values
  const setMockConstants = (batchSize?: number, pageSize?: number) => {
    if (batchSize !== undefined) {
      mockBatchSize.mockReturnValue(batchSize)
    }
    if (pageSize !== undefined) {
      mockPageSize.mockReturnValue(pageSize)
    }
  }

  const resetMockConstants = () => {
    mockBatchSize.mockReturnValue(
      originalModule.MAX_ADDRESSES_DATASTORE_KEYS_QUERY
    )
    mockPageSize.mockReturnValue(originalModule.MAX_DATASTORE_KEYS_QUERY)
  }

  beforeEach(() => {
    // Reset to original values before each test
    resetMockConstants()
  })

  afterEach(() => {
    // Ensure cleanup after each test
    resetMockConstants()
  })

  test('should retrieve datastore keys for single address with default settings', async () => {
    const params = [
      {
        address: usdcAddress,
        prefix: '',
        final: true,
      },
    ]

    const results = await getMultipleAddressesDatastoreKeys(
      provider.client,
      params
    )
    expect(Array.isArray(results)).toBe(true)
    expect(results).toHaveLength(1)
    expect(results[0]).toHaveProperty('address', usdcAddress)
    expect(results[0]).toHaveProperty('isFinal', true)
    expect(Array.isArray(results[0].keys)).toBe(true)
    expect(results[0].keys.length).toBeGreaterThan(0)
  })

  test('should retrieve datastore keys for multiple MRC20 addresses, more than LIMIT_MAX_ARGUMENT_ARRAY_SIZE', async () => {
    // Use small batch size to test batching logic
    setMockConstants(2, MAX_DATASTORE_KEYS_QUERY)

    // Create 5 address requests to test batching with batch size 2
    const addresses = Array(5).fill(usdcAddress)
    const params = addresses.map((address) => ({
      address,
      prefix: '',
      final: true,
    }))

    const results = await getMultipleAddressesDatastoreKeys(
      provider.client,
      params
    )

    expect(Array.isArray(results)).toBe(true)
    expect(results).toHaveLength(5)

    // All results should be identical since they're for the same address
    results.forEach((result, index) => {
      expect(result).toHaveProperty('address', usdcAddress)
      expect(result).toHaveProperty('isFinal', true)
      expect(Array.isArray(result.keys)).toBe(true)
      expect(result.keys.length).toBeGreaterThan(0)

      // Compare with first result
      if (index > 0) {
        expect(result.keys).toEqual(results[0].keys)
      }
    })
  })

  test('should handle MNS address with huge number of keys using small page size', async () => {
    // Use small page size to test pagination logic
    setMockConstants(MAX_ADDRESSES_DATASTORE_KEYS_QUERY, 10)

    const params = [
      {
        address: mnsAddress,
        prefix: new Uint8Array(DOMAIN_SEPARATOR_KEY),
        final: true,
      },
    ]

    const results = await getMultipleAddressesDatastoreKeys(
      provider.client,
      params
    )

    expect(Array.isArray(results)).toBe(true)
    expect(results).toHaveLength(1)
    expect(results[0]).toHaveProperty('address', mnsAddress)
    expect(results[0]).toHaveProperty('isFinal', true)
    expect(Array.isArray(results[0].keys)).toBe(true)

    // MNS should have many domain keys, more than the page size
    expect(results[0].keys.length).toBeGreaterThan(10)
  })

  test('should handle mixed addresses: MRC20 and MNS. Important diff in keys number', async () => {
    // Test both batching and pagination together
    setMockConstants(MAX_ADDRESSES_DATASTORE_KEYS_QUERY, 5) // Force sequential processing and small page size

    const params = [
      {
        address: usdcAddress,
        prefix: 'SYM',
        final: true,
      },
      {
        address: mnsAddress,
        prefix: new Uint8Array(DOMAIN_SEPARATOR_KEY),
        final: true,
      },
    ]

    const results = await getMultipleAddressesDatastoreKeys(
      provider.client,
      params
    )

    expect(Array.isArray(results)).toBe(true)
    expect(results).toHaveLength(2)

    // First result should be USDC
    expect(results[0]).toHaveProperty('address', usdcAddress)
    expect(results[0]).toHaveProperty('isFinal', true)
    expect(Array.isArray(results[0].keys)).toBe(true)
    expect(results[0].keys.length).toBeGreaterThan(0)

    // Second result should be MNS with many keys (more than page size due to pagination)
    expect(results[1]).toHaveProperty('address', mnsAddress)
    expect(results[1]).toHaveProperty('isFinal', true)
    expect(Array.isArray(results[1].keys)).toBe(true)
    expect(results[1].keys.length).toBeGreaterThan(5) // Should be more than page size
  })

  test('2*MAX_ADDRESSES_DATASTORE_KEYS_QUERY +1 addresses, page size : 2', async () => {
    // Should create 3 batches. For each of them, should call several times the API because the page size is only 2

    // Set page size to 2; keep batch size as the original constant value
    setMockConstants(MAX_ADDRESSES_DATASTORE_KEYS_QUERY, 2)

    const count = originalModule.MAX_ADDRESSES_DATASTORE_KEYS_QUERY * 2 + 1
    const addresses = Array(count).fill(usdcAddress)
    const params = addresses.map((address) => ({
      address,
      prefix: '',
      final: true,
    }))

    const results = await getMultipleAddressesDatastoreKeys(
      provider.client,
      params
    )

    expect(Array.isArray(results)).toBe(true)
    expect(results).toHaveLength(count)

    results.forEach((result) => {
      expect(result).toHaveProperty('address', usdcAddress)
      expect(result).toHaveProperty('isFinal', true)
      expect(Array.isArray(result.keys)).toBe(true)
      expect(result.keys.length).toBeGreaterThan(0)
    })
  })

  test('should handle address with no keys', async () => {
    // Use a non-existent address
    const nonExistentAddress =
      'AS1111111111111111111111111111111111111111111111111111'

    const params = [
      {
        address: nonExistentAddress,
        prefix: '',
        final: true,
      },
    ]

    await expect(
      getMultipleAddressesDatastoreKeys(provider.client, params)
    ).rejects.toThrow('Error retrieving datastore keys')
  })

  test('should throw error with proper message when API call fails', async () => {
    // Create a mock PublicAPI that will throw an error
    const mockPublicAPI = {
      getAddressesDatastoreKeys: jest
        .fn()
        .mockRejectedValue(new Error('Network error: Connection refused')),
    }

    const params = [
      {
        address: usdcAddress,
        prefix: '',
        final: true,
      },
    ]

    // Test that the function throws an error containing the expected message
    await expect(
      getMultipleAddressesDatastoreKeys(mockPublicAPI as any, params)
    ).rejects.toThrow('Error retrieving datastore keys')

    // Verify the mock was called
    expect(mockPublicAPI.getAddressesDatastoreKeys).toHaveBeenCalled()
  })
})
