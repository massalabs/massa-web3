import { PublicAPI } from '../../src'
import { MAX_DATASTORE_KEYS_QUERY } from '../../src/provider/constants'

const CONTRACT = 'AS12345'

/* `count` keys starting with `prefix`, as returned by get_addresses */
function keys(count: number, prefix: number[] = [0]): number[][] {
  return Array.from({ length: count }, (_, i) => [...prefix, i >> 8, i & 0xff])
}

/* A PublicAPI whose node answers get_addresses with the given key lists */
function apiWithKeys(final: number[][], candidate: number[][] = []): PublicAPI {
  const api = new PublicAPI('http://localhost')
  api.connector = {
    get_addresses: jest.fn().mockResolvedValue([
      {
        final_datastore_keys: final,
        candidate_datastore_keys: candidate,
      },
    ]),
  } as unknown as PublicAPI['connector']
  return api
}

describe('PublicAPI.getDataStoreKeys', () => {
  let warn: jest.SpyInstance

  beforeEach(() => {
    warn = jest.spyOn(console, 'warn').mockImplementation()
  })

  afterEach(() => {
    warn.mockRestore()
  })

  it('does not warn below the node cap', async () => {
    const api = apiWithKeys(keys(MAX_DATASTORE_KEYS_QUERY - 1))

    const result = await api.getDataStoreKeys(CONTRACT)

    expect(result).toHaveLength(MAX_DATASTORE_KEYS_QUERY - 1)
    expect(warn).not.toHaveBeenCalled()
  })

  it('warns when the node returns as many keys as its cap', async () => {
    const api = apiWithKeys(keys(MAX_DATASTORE_KEYS_QUERY))

    await api.getDataStoreKeys(CONTRACT)

    expect(warn).toHaveBeenCalledTimes(1)
    expect(warn.mock.calls[0][0]).toContain(CONTRACT)
    expect(warn.mock.calls[0][0]).toContain('getStorageKeys')
  })

  it('warns on the unfiltered count, even when few keys match the filter', async () => {
    // the cap applies before the filter: the matching keys may be incomplete
    const api = apiWithKeys([
      ...keys(MAX_DATASTORE_KEYS_QUERY - 2, [0]),
      ...keys(2, [1]),
    ])

    const result = await api.getDataStoreKeys(CONTRACT, Uint8Array.from([1]))

    expect(result).toHaveLength(2)
    expect(warn).toHaveBeenCalledTimes(1)
  })

  it('checks the cap on the candidate keys when final is false', async () => {
    const api = apiWithKeys(keys(1), keys(MAX_DATASTORE_KEYS_QUERY))

    const result = await api.getDataStoreKeys(CONTRACT, new Uint8Array(), false)

    expect(result).toHaveLength(MAX_DATASTORE_KEYS_QUERY)
    expect(warn).toHaveBeenCalledTimes(1)
  })
})
