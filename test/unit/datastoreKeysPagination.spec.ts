import { GrpcPublicProvider } from '../../src/provider/grpcProvider/grpcPublicProvider'
import { MAX_DATASTORE_KEYS_QUERY } from '../../src/provider/constants'
import { PublicServiceClient } from '../../src/generated/grpc/PublicServiceClientPb'

const ADDRESS = 'AS12345'

/* Builds a page of `count` distinct keys */
function keyPage(count: number, offset = 0): Uint8Array[] {
  return Array.from({ length: count }, (_, i) =>
    Uint8Array.from([0, 0, 0, offset + i])
  )
}

/* Mimics the QueryStateResponse shape consumed by getStorageKeys */
function mockResponse(keys: Uint8Array[]): unknown {
  return {
    getResponsesList: () => [
      {
        hasError: () => false,
        getError: () => undefined,
        hasResult: () => true,
        getResult: () => ({
          hasVecBytes: () => true,
          getVecBytes: () => ({ getItemsList: () => keys }),
        }),
        getResponseCase: () => 1,
      },
    ],
  }
}

function providerWithPages(pages: Uint8Array[][]): {
  provider: GrpcPublicProvider
  queryState: jest.Mock
} {
  const queryState = jest.fn()
  pages.forEach((page) =>
    queryState.mockResolvedValueOnce(mockResponse(page) as never)
  )
  const provider = new GrpcPublicProvider(
    { queryState } as unknown as PublicServiceClient,
    'http://localhost'
  )
  return { provider, queryState }
}

/* Extracts the datastore keys query out of a recorded queryState call */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function sentQuery(queryState: jest.Mock, callIndex: number, final: boolean) {
  const item = queryState.mock.calls[callIndex][0].getQueriesList()[0]
  return final
    ? item.getAddressDatastoreKeysFinal()
    : item.getAddressDatastoreKeysCandidate()
}

describe('GrpcPublicProvider.getStorageKeys', () => {
  it('always bounds the query with an explicit limit', async () => {
    const { provider, queryState } = providerWithPages([keyPage(3)])

    await provider.getStorageKeys(ADDRESS, new Uint8Array(), true)

    expect(queryState).toHaveBeenCalledTimes(1)
    expect(sentQuery(queryState, 0, true).getLimit()?.getValue()).toBe(
      MAX_DATASTORE_KEYS_QUERY
    )
  })

  it('does not paginate when the first page is partial', async () => {
    const page = keyPage(3)
    const { provider, queryState } = providerWithPages([page])

    const keys = await provider.getStorageKeys(ADDRESS, new Uint8Array(), true)

    expect(queryState).toHaveBeenCalledTimes(1)
    expect(keys).toEqual(page)
    // no cursor on the very first page
    expect(sentQuery(queryState, 0, true).getStartKey()).toBeUndefined()
  })

  it('paginates until a partial page is returned', async () => {
    const first = keyPage(MAX_DATASTORE_KEYS_QUERY)
    const second = keyPage(2, MAX_DATASTORE_KEYS_QUERY)
    const { provider, queryState } = providerWithPages([first, second])

    const keys = await provider.getStorageKeys(ADDRESS, new Uint8Array(), true)

    expect(queryState).toHaveBeenCalledTimes(2)
    expect(keys).toHaveLength(MAX_DATASTORE_KEYS_QUERY + 2)
    expect(keys).toEqual([...first, ...second])
  })

  it('resumes from the last key of the previous page, exclusively', async () => {
    const first = keyPage(MAX_DATASTORE_KEYS_QUERY)
    const { provider, queryState } = providerWithPages([first, keyPage(1, 999)])

    await provider.getStorageKeys(ADDRESS, new Uint8Array(), true)

    const second = sentQuery(queryState, 1, true)
    expect(second.getStartKey()?.getValue()).toEqual(first[first.length - 1])
    expect(second.getInclusiveStartKey()?.getValue()).toBe(false)
  })

  it('paginates candidate keys too', async () => {
    const first = keyPage(MAX_DATASTORE_KEYS_QUERY)
    const { provider, queryState } = providerWithPages([first, keyPage(1, 999)])

    await provider.getStorageKeys(ADDRESS, new Uint8Array(), false)

    expect(queryState).toHaveBeenCalledTimes(2)
    expect(sentQuery(queryState, 0, false).getLimit()?.getValue()).toBe(
      MAX_DATASTORE_KEYS_QUERY
    )
    expect(sentQuery(queryState, 1, false).getStartKey()?.getValue()).toEqual(
      first[first.length - 1]
    )
  })

  it('surfaces a node error raised on a later page', async () => {
    const queryState = jest.fn()
    queryState.mockResolvedValueOnce(
      mockResponse(keyPage(MAX_DATASTORE_KEYS_QUERY)) as never
    )
    queryState.mockResolvedValueOnce({
      getResponsesList: () => [
        {
          hasError: () => true,
          getError: () => ({ getMessage: () => 'boom' }),
        },
      ],
    } as never)
    const provider = new GrpcPublicProvider(
      { queryState } as unknown as PublicServiceClient,
      'http://localhost'
    )

    await expect(
      provider.getStorageKeys(ADDRESS, new Uint8Array(), true)
    ).rejects.toThrow('Failed to get storage keys: Query state error: boom')
  })

  it('rejects an empty address without querying', async () => {
    const { provider, queryState } = providerWithPages([])

    await expect(provider.getStorageKeys('')).rejects.toThrow(
      'Address is required'
    )
    expect(queryState).not.toHaveBeenCalled()
  })
})
