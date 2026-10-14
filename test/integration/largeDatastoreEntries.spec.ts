import { MNS_CONTRACTS } from '../../src/contracts-wrappers/mns'
import { DEFAULT_MAX_ARGUMENT_ARRAY_SIZE } from '../../src/provider/constants'
import { grpcPublicProvider, publicProvider } from './setup'

// More entries than a single gRPC request accepts (max_datastore_entries_per_request = 128)
const ENTRY_COUNT = DEFAULT_MAX_ARGUMENT_ARRAY_SIZE * 2 + 44

describe('Large datastore entries reads', () => {
  const address = MNS_CONTRACTS.buildnet
  let keys: Uint8Array[]

  beforeAll(async () => {
    keys = (await publicProvider.getStorageKeys(address)).slice(0, ENTRY_COUNT)
    expect(keys).toHaveLength(ENTRY_COUNT)
  })

  test('PublicAPI.getDatastoreEntries returns every entry', async () => {
    const values = await publicProvider.client.getDatastoreEntries(
      keys.map((key) => ({ address, key }))
    )

    expect(values).toHaveLength(ENTRY_COUNT)
    expect(values.every((value) => value !== null)).toBe(true)
  })

  test('JSON-RPC and gRPC readStorage return the same entries', async () => {
    const [jsonRpcValues, grpcValues] = await Promise.all([
      publicProvider.readStorage(address, keys),
      grpcPublicProvider.readStorage(address, keys),
    ])

    expect(jsonRpcValues).toHaveLength(ENTRY_COUNT)
    expect(grpcValues).toHaveLength(ENTRY_COUNT)
    expect(grpcValues.map((v) => (v ? Array.from(v) : v))).toEqual(
      jsonRpcValues.map((v) => (v ? Array.from(v) : v))
    )
  })
})
