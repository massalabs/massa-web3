import assert from 'assert'
import { bytesToStr } from '../../src/basicElements/serializers/strings'
import { DewebIndexer } from '../../src/contracts-wrappers'
import { OWNER_KEY } from '../../src/smartContracts/constants'
import { provider, publicProvider } from './setup'
import { DEFAULT_MAX_ARGUMENT_ARRAY_SIZE } from '../../src/provider/constants'

/* Mock the DEFAULT_MAX_ARGUMENT_ARRAY_SIZE constants to test with different batch sizes. 
This allows us to simulate having more than DEFAULT_MAX_ARGUMENT_ARRAY_SIZE websites in order to test batching logic.*/
const mockMaxArgumentArraySizeConstants = jest.fn()

// Store original module
const originalModule = jest.requireActual('../../src/provider/constants')

jest.mock('../../src/provider/constants', () => ({
  ...jest.requireActual('../../src/provider/constants'),
  get DEFAULT_MAX_ARGUMENT_ARRAY_SIZE() {
    return (
      mockMaxArgumentArraySizeConstants() ||
      originalModule.DEFAULT_MAX_ARGUMENT_ARRAY_SIZE
    )
  },
}))

let indexer: DewebIndexer

describe('DewebIndexer initialization', () => {
  beforeAll(async () => {
    indexer = await DewebIndexer.fromProvider(publicProvider)
  })
  test('should initialize with buildnet provider', async () => {
    const buildnetIndexer = await DewebIndexer.fromProvider(publicProvider)
    expect(buildnetIndexer).toBeInstanceOf(DewebIndexer)
    expect(buildnetIndexer.address).toBeDefined()
    expect(typeof buildnetIndexer.address).toBe('string')
  })

  test('should create buildnet instance directly', () => {
    const buildnetIndexer = DewebIndexer.buildnet(publicProvider)
    expect(buildnetIndexer).toBeInstanceOf(DewebIndexer)
    expect(buildnetIndexer.address).toBeDefined()
  })
})

describe('DewebIndexer getIndexerWebsiteList', () => {
  const ownerAddress = 'AU1fRkszGyF8h6GCdsqvmimFCuYuCdprYYFUJFCeYNWbySbyCKrx'

  async function checkWebsites(websites: string[]) {
    expect(Array.isArray(websites)).toBe(true)

    expect(websites.length).toBeGreaterThanOrEqual(0)

    const owners = await publicProvider.client.getDatastoreEntries(
      websites.map((website) => ({
        address: website,
        key: OWNER_KEY,
      })),
      true
    )

    // Each returned item should be a valid address string
    websites.forEach((website, index) => {
      expect(typeof website).toBe('string')
      expect(website).toContain('AS')
      assert(owners[index] !== null)
      expect(bytesToStr(owners[index] as Uint8Array)).toBe(ownerAddress)
    })
  }

  beforeAll(async () => {
    indexer = await DewebIndexer.fromProvider(publicProvider)
  })

  beforeEach(() => {
    // Reset mock before each test
    mockMaxArgumentArraySizeConstants.mockReset()
  })

  afterEach(() => {
    // Reset to original value after each test
    mockMaxArgumentArraySizeConstants.mockReturnValue(
      originalModule.DEFAULT_MAX_ARGUMENT_ARRAY_SIZE
    )
  })

  test('should retrieve website list with default batch size', async () => {
    // Use original DEFAULT_MAX_ARGUMENT_ARRAY_SIZE (128)
    mockMaxArgumentArraySizeConstants.mockReturnValue(
      DEFAULT_MAX_ARGUMENT_ARRAY_SIZE
    )

    const websites = await indexer.getIndexerWebsiteList(ownerAddress, provider)

    await checkWebsites(websites)
  })

  test('should retrieve website list that has more than DEFAULT_MAX_ARGUMENT_ARRAY_SIZE websites. Use batch', async () => {
    // Use small batch size to simulate a large number of websites in order to test batching logic
    mockMaxArgumentArraySizeConstants.mockReturnValue(2)

    const websites = await indexer.getIndexerWebsiteList(ownerAddress, provider)

    await checkWebsites(websites)
  })

  test('should handle owner with no websites', async () => {
    // Test with a likely non-existent owner address
    const nonExistentOwner =
      'AU1111111111111111111111111111111111111111111111111111'
    mockMaxArgumentArraySizeConstants.mockReturnValue(10)

    const websites = await indexer.getIndexerWebsiteList(
      nonExistentOwner,
      provider
    )

    expect(Array.isArray(websites)).toBe(true)
    expect(websites.length).toBe(0)
  })

  test('should handle invalid owner address gracefully', async () => {
    mockMaxArgumentArraySizeConstants.mockReturnValue(10)

    // Test with an invalid address format
    const invalidAddress = 'invalid-address'

    // This should either return empty array or throw a meaningful error
    try {
      const websites = await indexer.getIndexerWebsiteList(
        invalidAddress,
        provider
      )
      // If it doesn't throw, it should return an empty array
      expect(Array.isArray(websites)).toBe(true)
      expect(websites.length).toBe(0)
    } catch (error) {
      // If it throws, the error should be informative
      expect(error).toBeInstanceOf(Error)
      expect(error.message).toContain('retrieving indexer website list')
    }
  })
})
