import { GrpcPublicProvider } from '../../src/provider/grpcProvider/grpcPublicProvider'
import { DEFAULT_MAX_ARGUMENT_ARRAY_SIZE } from '../../src/provider/constants'
import { PublicServiceClient } from '../../src/generated/grpc/PublicServiceClientPb'

const ADDRESS = 'AS12345'

/* A provider whose node answers each getDatastoreEntries request with one value per filter */
function providerEchoingKeys(): {
  provider: GrpcPublicProvider
  getDatastoreEntries: jest.Mock
} {
  const getDatastoreEntries = jest.fn().mockImplementation(async (request) => ({
    getDatastoreEntriesList: () =>
      request.getFiltersList().map((filter) => ({
        getFinalValue: () => filter.getAddressKey().getKey(),
        getCandidateValue: () => filter.getAddressKey().getKey(),
      })),
  }))
  const provider = new GrpcPublicProvider(
    { getDatastoreEntries } as unknown as PublicServiceClient,
    'http://localhost'
  )
  return { provider, getDatastoreEntries }
}

describe('GrpcPublicProvider.readStorage', () => {
  it('sends a single request up to the node limit', async () => {
    const { provider, getDatastoreEntries } = providerEchoingKeys()
    const keys = Array.from(
      { length: DEFAULT_MAX_ARGUMENT_ARRAY_SIZE },
      (_, i) => Uint8Array.from([i])
    )

    await provider.readStorage(ADDRESS, keys)

    expect(getDatastoreEntries).toHaveBeenCalledTimes(1)
  })

  it('batches keys above the node limit and keeps their order', async () => {
    const { provider, getDatastoreEntries } = providerEchoingKeys()
    const keys = Array.from(
      { length: DEFAULT_MAX_ARGUMENT_ARRAY_SIZE * 2 + 1 },
      (_, i) => Uint8Array.from([i >> 8, i & 0xff])
    )

    const values = await provider.readStorage(ADDRESS, keys)

    expect(getDatastoreEntries).toHaveBeenCalledTimes(3)
    getDatastoreEntries.mock.calls.forEach(([request]) =>
      expect(request.getFiltersList().length).toBeLessThanOrEqual(
        DEFAULT_MAX_ARGUMENT_ARRAY_SIZE
      )
    )
    expect(values).toEqual(keys)
  })
})
