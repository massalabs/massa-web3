import {
  DEFAULT_MAX_ARGUMENT_ARRAY_SIZE,
  MAX_DATASTORE_KEYS_QUERY,
  PublicAPI,
} from '../../src'

function apiWithStatus(maxDatastoreKeysQuery?: number | null): {
  api: PublicAPI
  getStatus: jest.Mock
} {
  const api = new PublicAPI('http://localhost')
  const getStatus = jest
    .fn()
    .mockResolvedValue({ max_datastore_keys_query: maxDatastoreKeysQuery })
  api.connector.get_status = getStatus as never
  return { api, getStatus }
}

describe('PublicAPI.getDatastoreKeysPageSize', () => {
  it('uses the default when the node does not report a limit', async () => {
    const { api } = apiWithStatus(undefined)
    expect(await api.getDatastoreKeysPageSize()).toBe(MAX_DATASTORE_KEYS_QUERY)
  })

  it('uses the default when the node reports no limit', async () => {
    const { api } = apiWithStatus(null)
    expect(await api.getDatastoreKeysPageSize()).toBe(MAX_DATASTORE_KEYS_QUERY)
  })

  it('uses the node limit when it is lower than the default', async () => {
    const { api } = apiWithStatus(100)
    expect(await api.getDatastoreKeysPageSize()).toBe(100)
  })

  it('keeps the default when the node limit is higher', async () => {
    const { api } = apiWithStatus(MAX_DATASTORE_KEYS_QUERY * 2)
    expect(await api.getDatastoreKeysPageSize()).toBe(MAX_DATASTORE_KEYS_QUERY)
  })

  it('reuses the last fetched status', async () => {
    const { api, getStatus } = apiWithStatus(100)
    await api.getDatastoreKeysPageSize()
    await api.getDatastoreKeysPageSize()
    expect(getStatus).toHaveBeenCalledTimes(1)
  })
})

describe('PublicAPI.getOperations', () => {
  it('batches ids to stay within the node max_arguments limit', async () => {
    const api = new PublicAPI('http://localhost')
    const getOperations = jest
      .fn()
      .mockImplementation(async (ids: string[]) => ids.map((id) => ({ id })))
    api.connector.get_operations = getOperations as never

    const ids = Array.from(
      { length: DEFAULT_MAX_ARGUMENT_ARRAY_SIZE * 2 + 1 },
      (_, i) => `O${i}`
    )
    const ops = await api.getOperations(ids)

    expect(getOperations).toHaveBeenCalledTimes(3)
    getOperations.mock.calls.forEach(([batch]) =>
      expect(batch.length).toBeLessThanOrEqual(DEFAULT_MAX_ARGUMENT_ARRAY_SIZE)
    )
    expect(ops.map((op) => op.id)).toEqual(ids)
  })
})

describe('PublicAPI.getMultipleAddressInfo', () => {
  it('batches addresses to stay within the node max_arguments limit', async () => {
    const api = new PublicAPI('http://localhost')
    const getAddresses = jest
      .fn()
      .mockImplementation(async (addresses: string[]) =>
        addresses.map((address) => ({ address }))
      )
    api.connector.get_addresses = getAddresses as never

    const addresses = Array.from(
      { length: DEFAULT_MAX_ARGUMENT_ARRAY_SIZE * 2 + 1 },
      (_, i) => `AU${i}`
    )
    const infos = await api.getMultipleAddressInfo(addresses)

    expect(getAddresses).toHaveBeenCalledTimes(3)
    getAddresses.mock.calls.forEach(([batch]) =>
      expect(batch.length).toBeLessThanOrEqual(DEFAULT_MAX_ARGUMENT_ARRAY_SIZE)
    )
    expect(infos.map((info) => info.address)).toEqual(addresses)
  })
})

describe('PublicAPI.getDatastoreEntries', () => {
  it('batches entries to stay within the node per-request limit', async () => {
    const api = new PublicAPI('http://localhost')
    const getDatastoreEntries = jest
      .fn()
      .mockImplementation(async (entries: { key: number[] }[]) =>
        entries.map(({ key }) => ({ final_value: key, candidate_value: null }))
      )
    api.connector.get_datastore_entries = getDatastoreEntries as never

    const keys = Array.from(
      { length: DEFAULT_MAX_ARGUMENT_ARRAY_SIZE * 2 + 1 },
      (_, i) => Uint8Array.from([i >> 8, i & 0xff])
    )
    const values = await api.getDatastoreEntries(
      keys.map((key) => ({ address: 'AS1', key }))
    )

    expect(getDatastoreEntries).toHaveBeenCalledTimes(3)
    getDatastoreEntries.mock.calls.forEach(([batch]) =>
      expect(batch.length).toBeLessThanOrEqual(DEFAULT_MAX_ARGUMENT_ARRAY_SIZE)
    )
    expect(values).toEqual(keys)
  })
})
