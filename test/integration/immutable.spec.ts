import { isImmutable, areImmutables } from '../../src/deweb/immutable'
import { provider, publicProvider } from './setup'
import { CHAIN_ID } from '../../src/utils/networks'
import { providerMock } from '../unit/mock/provider.mock'
import { DEFAULT_MAX_ARGUMENT_ARRAY_SIZE } from '../../src/provider/constants'

const immutableDewebAddressBuildnet =
  'AS12ibbPmE9L4i1D8FC3xP7e9NFtbBWNaP46s6GjnvuiXhWfLmnvW'
const mutableDewebAddressBuildnet =
  'AS12oT3yMR4DG89SpweuPa7R1d2sXWvMzGSquVoDgspbiB6nVYUXt'

// Test addresses for areImmutables function
const immutableAddresses = [
  'AS12UT2sA3333TCPf8r3JGLLK3wtnnCMHUU9cFUQH7o54vDSGTKps',
  'AS12ibbPmE9L4i1D8FC3xP7e9NFtbBWNaP46s6GjnvuiXhWfLmnvW',
  'AS12kDMGfuViwb6JFeoTtYu3PAyrrnsH8TeNjjc4dMiMWAP3SKgaG',
  'AS1qGPmA7MKKE3jnPSaoLEVJeKQMSmDcHQrnXgs2qJ8PuPSDnrUa',
  'AS1xoPhXiaqMfmYDNzKU1o7gm1rgi2QGCMvTPAb3PJD2Jana2xVX',
]

const nonImmutableAddresses = [
  'AS12fHrr5vyb7993EPe1SYraR1c5FwWVbjTQbBhBZczv9xMFBp8t5',
  'AS1ZzNYcet16TberbbMLz4EF2QqLbdFboU5cYw4fmy3QCzvnGJkk',
  'AS1djKcyxnLb5afEiLW6xWveKVURWyxwWmP5jYmjW9TXv54PJRRV',
  'AS12N8MEZ38hjdnVgct61ahCNEyKcUPJKWQHQhin4LhrR5juvDTmq',
]

describe('is immutable', () => {
  test('should return true for immutable address', async () => {
    const isImmutableWebsite = await isImmutable(
      immutableDewebAddressBuildnet,
      publicProvider
    )
    expect(isImmutableWebsite).toBe(true)
  })

  test('should return false for mutable address', async () => {
    const isImmutableWebsite = await isImmutable(
      mutableDewebAddressBuildnet,
      publicProvider
    )
    expect(isImmutableWebsite).toBe(false)
  })

  test('should work for provider that do not provide node url', async () => {
    jest.spyOn(providerMock, 'networkInfos').mockResolvedValueOnce({
      url: undefined,
      chainId: CHAIN_ID.Buildnet,
      name: 'Buildnet',
      minimalFee: 10000000n,
    })
    const isImmutableWebsite = await isImmutable(
      immutableDewebAddressBuildnet,
      providerMock
    )
    expect(isImmutableWebsite).toBe(true)
  })

  test('if provider return no node url and invalid chainid, should throw error', async () => {
    jest.spyOn(providerMock, 'networkInfos').mockResolvedValueOnce({
      url: undefined,
      chainId: 0n, // invalid chain id
      name: 'Buildnet',
      minimalFee: 10000000n,
    })
    expect(
      async () => await isImmutable(immutableDewebAddressBuildnet, providerMock)
    ).rejects.toThrow('Unknown network chainId: 0')
  })
})

describe('areImmutables', () => {
  test('should return true for all known immutable addresses', async () => {
    const results = await areImmutables(provider, immutableAddresses)

    expect(Array.isArray(results)).toBe(true)
    expect(results).toHaveLength(immutableAddresses.length)

    // All should be immutable (true)
    results.forEach((result, index) => {
      expect(result).toBe(true)
      // Log which address failed if any
      if (!result) {
        console.warn(`Address ${immutableAddresses[index]} is not immutable`)
      }
    })
  })

  test('should return false for all known non-immutable addresses', async () => {
    const results = await areImmutables(provider, nonImmutableAddresses)

    expect(Array.isArray(results)).toBe(true)
    expect(results).toHaveLength(nonImmutableAddresses.length)

    // All should be non-immutable (false)
    results.forEach((result, index) => {
      expect(result).toBe(false)
      // Log which address failed if any
      if (result) {
        console.warn(
          `Address ${nonImmutableAddresses[index]} is unexpectedly immutable`
        )
      }
    })
  })

  test('should handle mixed array of immutable and non-immutable addresses', async () => {
    const mixedAddresses = [
      immutableAddresses[0], // immutable
      nonImmutableAddresses[0], // non-immutable
      immutableAddresses[1], // immutable
      nonImmutableAddresses[1], // non-immutable
    ]

    const results = await areImmutables(provider, mixedAddresses)

    expect(Array.isArray(results)).toBe(true)
    expect(results).toHaveLength(4)

    // Check specific expected results
    expect(results[0]).toBe(true) // first immutable
    expect(results[1]).toBe(false) // first non-immutable
    expect(results[2]).toBe(true) // second immutable
    expect(results[3]).toBe(false) // second non-immutable
  })

  test('should handle single address', async () => {
    const singleImmutableAddress = [immutableAddresses[0]]
    const results = await areImmutables(provider, singleImmutableAddress)

    expect(Array.isArray(results)).toBe(true)
    expect(results).toHaveLength(1)
    expect(results[0]).toBe(true)
  })

  test('should handle empty array', async () => {
    const results = await areImmutables(provider, [])

    expect(Array.isArray(results)).toBe(true)
    expect(results).toHaveLength(0)
  })

  test('should maintain order of results matching input addresses', async () => {
    // Use a specific order to verify results match input order
    const orderedAddresses = [
      nonImmutableAddresses[2], // false
      immutableAddresses[3], // true
      nonImmutableAddresses[0], // false
      immutableAddresses[1], // true
      immutableAddresses[4], // true
    ]

    const results = await areImmutables(provider, orderedAddresses)

    expect(Array.isArray(results)).toBe(true)
    expect(results).toHaveLength(5)

    // Verify specific order
    expect(results[0]).toBe(false)
    expect(results[1]).toBe(true)
    expect(results[2]).toBe(false)
    expect(results[3]).toBe(true)
    expect(results[4]).toBe(true)
  })
  test('should handle large number of addresses efficiently', async () => {
    // Create a larger array by repeating some addresses
    const largeAddressList = [
      ...immutableAddresses,
      ...nonImmutableAddresses,
      ...immutableAddresses.slice(0, 3),
      ...nonImmutableAddresses.slice(0, 2),
    ]

    const startTime = Date.now()
    const results = await areImmutables(provider, largeAddressList)
    const endTime = Date.now()

    expect(Array.isArray(results)).toBe(true)
    expect(results).toHaveLength(largeAddressList.length)

    // Verify the results match expected patterns
    const expectedResults = [
      ...Array(5).fill(true), // immutableAddresses
      ...Array(4).fill(false), // nonImmutableAddresses
      ...Array(3).fill(true), // first 3 immutableAddresses again
      ...Array(2).fill(false), // first 2 nonImmutableAddresses again
    ]

    expect(results).toEqual(expectedResults)

    // Ensure it completes in reasonable time (less than 30 seconds)
    expect(endTime - startTime).toBeLessThan(30000)
  })

  test('should handle batching when addresses array size is 2*DEFAULT_MAX_ARGUMENT_ARRAY_SIZE +1', async () => {
    const addresses = Array(2 * DEFAULT_MAX_ARGUMENT_ARRAY_SIZE + 1).fill(
      immutableAddresses[0]
    )
    const results = await areImmutables(provider, addresses)

    expect(Array.isArray(results)).toBe(true)
    expect(results).toHaveLength(addresses.length)

    results.forEach((result) => {
      expect(result).toBe(true)
    })
  })
})
