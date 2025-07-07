import { AddressFilter, Slot } from '../../src/generated/client-types'
import { createCheckers } from 'ts-interface-checker'
import validator from '../generated/client-types-ti'
import { EventFilter, PublicAPI } from '../../src/client'
import { MAX_GAS_CALL } from '../../src/smartContracts'
import { bytesToStr, strToBytes } from '../../src/basicElements'
import { provider } from './setup'
import { DEPLOYER_BYTECODE, MAX_GAS_EXECUTE } from '../../src'

const {
  NodeStatus,
  AddressInfo,
  EndorsementInfo,
  Clique,
  GraphInterval,
  Staker,
  Block,
  BlockInfo,
  SCOutputEvent,
  ExecuteReadOnlyResponse,
} = createCheckers(validator)

let lastSlot: Slot = { period: 0, thread: 0 }
let someEndorsement: string[]
let someBlockIds: string[]
let operationId: string

const TEST_USER = 'AU12dG5xP1RDEB5ocdHkymNVvvSJmUL9BgHwCksDowqmGWxfpm93x'
// Hello contract from toolkit
const NAME_KEY = 'name_key'
const NAME_VAL = 'Massa'
const TEST_CONTRACT = 'AS12N5DvTVwvaLbaniMgDJqKwJ3uXBGwzzGuB1f6fjeSx3nhhahTE'

// New contract with multiple datastore keys
const MULTI_KEY_CONTRACT =
  'AS1SRDPALic5jX9xMwH8yrkP23k1tQRsMX6TEgmB8ag8RJmQxRxA'

// Test keys prefix from the multi-key contract
const TEST_PREFIX = {
  USER: 'user_',
  CONFIG: 'config_',
  DATA: 'data_',
  METADATA: 'metadata_',
}

let client: PublicAPI
beforeAll(() => {
  client = provider.client
})

describe('client tests', () => {
  test('getStatus', async () => {
    const status = await client.status()
    lastSlot.period = status.last_slot.period
    lastSlot.thread = status.last_slot.thread
    NodeStatus.check(status)
  })

  test('getAddressInfo', async () => {
    const info = await client.getAddressInfo(
      'AU1Fp7uBP2TXxDty2HdTE3ZE3XQ4cNXnG3xuo8TkQLJtyxC7FKhx'
    )
    AddressInfo.strictCheck(info)
  })

  test('getCliques', async () => {
    const cliques = await client.getCliques()
    someBlockIds = cliques[0].block_ids
    cliques.forEach((c) => Clique.strictCheck(c))
  })

  test('getGraphInterval', async () => {
    const now = Date.now()
    const interval = await client.getGraphInterval(now - 2000, now)
    interval.forEach((i) => GraphInterval.strictCheck(i))
  })

  test('getStakers', async () => {
    const stakers = await client.getStakers({ limit: 5, offset: 0 })
    stakers.forEach((s) => Staker.strictCheck(s))
    expect(stakers.length).toBeGreaterThan(0)
  })

  test('getBlockcliqueBlock', async () => {
    const block = await client.getBlockcliqueBlock(lastSlot)
    if (block.header.content.endorsements) {
      someEndorsement = block.header.content.endorsements.map((e) => e.id!)
    }
    Block.strictCheck(block)
  })

  test('getBlock', async () => {
    const block = await client.getBlock(someBlockIds[0])
    BlockInfo.strictCheck(block)
    expect(block).toHaveProperty('content.block.header.content.endorsements')
  })

  test('getMultipleBlocks', async () => {
    const blocks = await client.getMultipleBlocks(someBlockIds.slice(0, 2))
    BlockInfo.strictCheck(blocks[0])
  })

  test('getEndorsement', async () => {
    const endorsement = await client.getEndorsement(someEndorsement[0]!)
    EndorsementInfo.strictCheck(endorsement)
  })

  test('getMultipleEndorsements', async () => {
    const endorsements = await client.getMultipleEndorsements([
      someEndorsement[1]!,
      someEndorsement[2]!,
    ])
    endorsements.forEach((e) => EndorsementInfo.strictCheck(e))
  })

  test('getDataStoreKeys', async () => {
    const keys = await client.getDataStoreKeys(TEST_CONTRACT)
    expect(keys).toHaveLength(1)
    expect(bytesToStr(keys[0])).toBe(NAME_KEY)
  })

  test('getDataStoreKeys with filter', async () => {
    const keys = await client.getDataStoreKeys(
      TEST_CONTRACT,
      strToBytes(NAME_KEY)
    )
    expect(keys).toHaveLength(1)
    expect(bytesToStr(keys[0])).toBe(NAME_KEY)
  })

  test('getDatastoreEntry', async () => {
    const entry = await client.getDatastoreEntry(NAME_KEY, TEST_CONTRACT)
    expect(entry).not.toBeNull()
    expect(bytesToStr(entry as Uint8Array)).toBe(NAME_VAL)
  })

  test('getDatastoreEntry speculative', async () => {
    const entry = await client.getDatastoreEntry(NAME_KEY, TEST_CONTRACT, false)
    expect(bytesToStr(entry as Uint8Array)).toBe(NAME_VAL)
  })

  test('getDatastoreEntries', async () => {
    const entries = await client.getDatastoreEntries([
      {
        address: TEST_CONTRACT,
        key: strToBytes(NAME_KEY),
      },
    ]) // retrieve final by default

    expect(entries).toHaveLength(1)
    expect(entries[0]).not.toBeNull()
    expect(bytesToStr(entries[0] as Uint8Array)).toBe(NAME_VAL)
  })

  test('getDatastoreEntries with bad keys', async () => {
    const entries = await client.getDatastoreEntries([
      {
        address: TEST_CONTRACT,
        key: strToBytes('bad_key'),
      },
    ])

    expect(entries).toHaveLength(1)
    expect(entries[0]).toBeNull()
  })

  test('getDatastoreEntries 2 keys: one good one bad', async () => {
    const entries = await client.getDatastoreEntries([
      {
        address: TEST_CONTRACT,
        key: strToBytes('bad_key'),
      },
      {
        address: TEST_CONTRACT,
        key: strToBytes(NAME_KEY),
      },
    ])

    expect(entries).toHaveLength(2)
    expect(entries[0]).toBeNull()
    expect(entries[1]).not.toBeNull()
    expect(bytesToStr(entries[1] as Uint8Array)).toBe(NAME_VAL)
  })

  test('getAddressesDatastoreKeys', async () => {
    const keys = await client.getAddressesDatastoreKeys([
      {
        address: TEST_CONTRACT,
      },
    ])
    expect(keys).toHaveLength(1)
    expect(keys[0].address).toBe(TEST_CONTRACT)
    expect(keys[0].isFinal).toBe(true)
    expect(keys[0].keys).toHaveLength(1)
    expect(bytesToStr(keys[0].keys[0])).toBe(NAME_KEY)
  })

  test('getAddressesDatastoreKeys with prefix', async () => {
    const keys = await client.getAddressesDatastoreKeys([
      {
        address: TEST_CONTRACT,
        prefix: NAME_KEY,
      },
    ])

    expect(keys).toHaveLength(1)
    expect(keys[0].address).toBe(TEST_CONTRACT)
    expect(keys[0].isFinal).toBe(true)
    expect(keys[0].keys).toHaveLength(1)
    expect(bytesToStr(keys[0].keys[0])).toBe(NAME_KEY)
  })

  test('getAddressesDatastoreKeys with multiple addresses', async () => {
    const keys = await client.getAddressesDatastoreKeys([
      {
        address: TEST_CONTRACT,
      },
      {
        address: MULTI_KEY_CONTRACT,
      },
    ])

    expect(keys).toHaveLength(2)
    expect(keys[0].address).toBe(TEST_CONTRACT)
    expect(keys[1].address).toBe(MULTI_KEY_CONTRACT)
    expect(keys[0].isFinal).toBe(true)
    expect(keys[1].isFinal).toBe(true)
    expect(keys[0].keys).toHaveLength(1)
    expect(keys[1].keys.length).toBeGreaterThan(20) // Multi-key contract has many keys
    expect(bytesToStr(keys[0].keys[0])).toBe(NAME_KEY)
  })

  test('getAddressesDatastoreKeys with startKey', async () => {
    const keys = await client.getAddressesDatastoreKeys([
      {
        address: TEST_CONTRACT,
        startKey: NAME_KEY,
      },
    ])

    expect(keys).toHaveLength(1)
    expect(keys[0].address).toBe(TEST_CONTRACT)
    expect(keys[0].isFinal).toBe(true)
    expect(keys[0].keys).toHaveLength(1)
    expect(bytesToStr(keys[0].keys[0])).toBe(NAME_KEY)
  })

  test('getAddressesDatastoreKeys with endKey', async () => {
    const keys = await client.getAddressesDatastoreKeys([
      {
        address: TEST_CONTRACT,
        endKey: NAME_KEY,
      },
    ])

    expect(keys).toHaveLength(1)
    expect(keys[0].address).toBe(TEST_CONTRACT)
    expect(keys[0].isFinal).toBe(true)
    expect(keys[0].keys).toHaveLength(1)
    expect(bytesToStr(keys[0].keys[0])).toBe(NAME_KEY)
  })

  test('getAddressesDatastoreKeys with startKey and endKey range', async () => {
    const keys = await client.getAddressesDatastoreKeys([
      {
        address: TEST_CONTRACT,
        startKey: NAME_KEY,
        endKey: NAME_KEY,
      },
    ])

    expect(keys).toHaveLength(1)
    expect(keys[0].address).toBe(TEST_CONTRACT)
    expect(keys[0].isFinal).toBe(true)
    expect(keys[0].keys).toHaveLength(1)
    expect(bytesToStr(keys[0].keys[0])).toBe(NAME_KEY)
  })

  test('getAddressesDatastoreKeys with maxCount', async () => {
    const keys = await client.getAddressesDatastoreKeys([
      {
        address: TEST_CONTRACT,
        maxCount: 1,
      },
    ])

    expect(keys).toHaveLength(1)
    expect(keys[0].address).toBe(TEST_CONTRACT)
    expect(keys[0].isFinal).toBe(true)
    expect(keys[0].keys).toHaveLength(1)
    expect(bytesToStr(keys[0].keys[0])).toBe(NAME_KEY)
  })

  test('getAddressesDatastoreKeys with non-existent prefix', async () => {
    const keys = await client.getAddressesDatastoreKeys([
      {
        address: TEST_CONTRACT,
        prefix: 'non_existent_key',
      },
    ])

    expect(keys).toHaveLength(1)
    expect(keys[0].address).toBe(TEST_CONTRACT)
    expect(keys[0].isFinal).toBe(true)
    expect(keys[0].keys).toHaveLength(0)
  })

  test('getAddressesDatastoreKeys with empty array', async () => {
    const keys = await client.getAddressesDatastoreKeys([])

    expect(keys).toHaveLength(0)
  })

  test('getAddressesDatastoreKeys with non-existent address', async () => {
    // Use a clearly non-existent address
    const nonExistentAddress =
      'AU12dG5xP1RDEB5ocdHkymNVvvSJmUL9BgHwCksDowqmGWxfpm93x'

    await expect(
      client.getAddressesDatastoreKeys([
        {
          address: nonExistentAddress,
        },
      ])
    ).rejects.toThrow('Not found: Account')
  })

  test('getAddressesDatastoreKeys with complex filter combination', async () => {
    const keys = await client.getAddressesDatastoreKeys([
      {
        address: TEST_CONTRACT,
        prefix: NAME_KEY,
        final: false,
        maxCount: 1,
        inclusiveStartKey: true,
        inclusiveEndKey: true,
      },
    ])

    expect(keys).toHaveLength(1)
    expect(keys[0].address).toBe(TEST_CONTRACT)
    expect(keys[0].isFinal).toBe(false)
    expect(keys[0].keys).toHaveLength(1)
    expect(bytesToStr(keys[0].keys[0])).toBe(NAME_KEY)
  })

  // Advanced tests with multi-key contract
  test('getAddressesDatastoreKeys - get all keys from multi-key contract', async () => {
    const keys = await client.getAddressesDatastoreKeys([
      {
        address: MULTI_KEY_CONTRACT,
      },
    ])

    expect(keys).toHaveLength(1)
    expect(keys[0].address).toBe(MULTI_KEY_CONTRACT)
    expect(keys[0].isFinal).toBe(true)
    expect(keys[0].keys.length).toBeGreaterThan(20) // Should have many keys
  })

  test('getAddressesDatastoreKeys - filter by user prefix', async () => {
    const keys = await client.getAddressesDatastoreKeys([
      {
        address: MULTI_KEY_CONTRACT,
        prefix: TEST_PREFIX.USER,
      },
    ])

    expect(keys).toHaveLength(1)
    expect(keys[0].address).toBe(MULTI_KEY_CONTRACT)
    expect(keys[0].isFinal).toBe(true)
    expect(keys[0].keys.length).toBe(17) // user_001 to user_017

    // Verify all keys start with 'user_'
    keys[0].keys.forEach((key) => {
      const keyStr = bytesToStr(key)
      expect(keyStr.startsWith(TEST_PREFIX.USER)).toBe(true)
    })
  })

  test('getAddressesDatastoreKeys - filter by config prefix', async () => {
    const keys = await client.getAddressesDatastoreKeys([
      {
        address: MULTI_KEY_CONTRACT,
        prefix: TEST_PREFIX.CONFIG,
      },
    ])

    expect(keys).toHaveLength(1)
    expect(keys[0].address).toBe(MULTI_KEY_CONTRACT)
    expect(keys[0].isFinal).toBe(true)
    expect(keys[0].keys.length).toBe(2) // config_version, config_settings

    const keyStrings = keys[0].keys.map((key) => bytesToStr(key))
    expect(keyStrings).toContain('config_version')
    expect(keyStrings).toContain('config_settings')
  })

  test('getAddressesDatastoreKeys - filter by data prefix', async () => {
    const keys = await client.getAddressesDatastoreKeys([
      {
        address: MULTI_KEY_CONTRACT,
        prefix: TEST_PREFIX.DATA,
      },
    ])

    expect(keys).toHaveLength(1)
    expect(keys[0].address).toBe(MULTI_KEY_CONTRACT)
    expect(keys[0].isFinal).toBe(true)
    expect(keys[0].keys.length).toBe(3) // data_alpha, data_beta, data_gamma

    const keyStrings = keys[0].keys.map((key) => bytesToStr(key))
    expect(keyStrings).toContain('data_alpha')
    expect(keyStrings).toContain('data_beta')
    expect(keyStrings).toContain('data_gamma')
  })

  test('getAddressesDatastoreKeys - pagination with maxCount', async () => {
    const keys = await client.getAddressesDatastoreKeys([
      {
        address: MULTI_KEY_CONTRACT,
        maxCount: 5,
      },
    ])

    expect(keys).toHaveLength(1)
    expect(keys[0].address).toBe(MULTI_KEY_CONTRACT)
    expect(keys[0].isFinal).toBe(true)
    expect(keys[0].keys.length).toBe(5) // Should return exactly 5 keys
  })

  test('getAddressesDatastoreKeys - pagination with user prefix and maxCount', async () => {
    const keys = await client.getAddressesDatastoreKeys([
      {
        address: MULTI_KEY_CONTRACT,
        prefix: TEST_PREFIX.USER,
        maxCount: 3,
      },
    ])

    expect(keys).toHaveLength(1)
    expect(keys[0].address).toBe(MULTI_KEY_CONTRACT)
    expect(keys[0].isFinal).toBe(true)
    expect(keys[0].keys.length).toBe(3) // Should return exactly 3 user keys

    // Verify all keys start with 'user_'
    keys[0].keys.forEach((key) => {
      const keyStr = bytesToStr(key)
      expect(keyStr.startsWith(TEST_PREFIX.USER)).toBe(true)
    })
  })

  test('getAddressesDatastoreKeys - range query with startKey and endKey', async () => {
    const keys = await client.getAddressesDatastoreKeys([
      {
        address: MULTI_KEY_CONTRACT,
        startKey: 'user_005',
        endKey: 'user_010',
      },
    ])

    expect(keys).toHaveLength(1)
    expect(keys[0].address).toBe(MULTI_KEY_CONTRACT)
    expect(keys[0].isFinal).toBe(true)
    expect(keys[0].keys.length).toBe(6) // user_005 to user_010 inclusive

    const keyStrings = keys[0].keys.map((key) => bytesToStr(key))
    expect(keyStrings).toContain('user_005')
    expect(keyStrings).toContain('user_010')
    expect(keyStrings).not.toContain('user_004')
    expect(keyStrings).not.toContain('user_011')
  })

  test('getAddressesDatastoreKeys - range query with exclusive bounds', async () => {
    const keys = await client.getAddressesDatastoreKeys([
      {
        address: MULTI_KEY_CONTRACT,
        startKey: 'user_005',
        endKey: 'user_010',
        inclusiveStartKey: false,
        inclusiveEndKey: false,
      },
    ])

    expect(keys).toHaveLength(1)
    expect(keys[0].address).toBe(MULTI_KEY_CONTRACT)
    expect(keys[0].isFinal).toBe(true)
    expect(keys[0].keys.length).toBe(4) // user_006 to user_009 (exclusive)

    const keyStrings = keys[0].keys.map((key) => bytesToStr(key))
    expect(keyStrings).not.toContain('user_005')
    expect(keyStrings).not.toContain('user_010')
    expect(keyStrings).toContain('user_006')
    expect(keyStrings).toContain('user_009')
  })

  test('getAddressesDatastoreKeys - complex filter combination', async () => {
    const keys = await client.getAddressesDatastoreKeys([
      {
        address: MULTI_KEY_CONTRACT,
        prefix: TEST_PREFIX.USER,
        startKey: 'user_010',
        endKey: 'user_015',
        maxCount: 3,
        final: false,
      },
    ])

    expect(keys).toHaveLength(1)
    expect(keys[0].address).toBe(MULTI_KEY_CONTRACT)
    expect(keys[0].isFinal).toBe(false)
    expect(keys[0].keys.length).toBe(3) // Should return 3 keys within the range

    const keyStrings = keys[0].keys.map((key) => bytesToStr(key))
    keyStrings.forEach((keyStr) => {
      expect(keyStr.startsWith(TEST_PREFIX.USER)).toBe(true)
      expect(keyStr >= 'user_010').toBe(true)
      expect(keyStr <= 'user_015').toBe(true)
    })
  })

  test('getAddressesDatastoreKeys - multiple addresses with different filters', async () => {
    const keys = await client.getAddressesDatastoreKeys([
      {
        address: TEST_CONTRACT,
        prefix: NAME_KEY,
      },
      {
        address: MULTI_KEY_CONTRACT,
        prefix: TEST_PREFIX.CONFIG,
      },
    ])

    expect(keys).toHaveLength(2)

    // First address (TEST_CONTRACT)
    expect(keys[0].address).toBe(TEST_CONTRACT)
    expect(keys[0].isFinal).toBe(true)
    expect(keys[0].keys.length).toBe(1)
    expect(bytesToStr(keys[0].keys[0])).toBe(NAME_KEY)

    // Second address (MULTI_KEY_CONTRACT)
    expect(keys[1].address).toBe(MULTI_KEY_CONTRACT)
    expect(keys[1].isFinal).toBe(true)
    expect(keys[1].keys.length).toBe(2)

    const keyStrings = keys[1].keys.map((key) => bytesToStr(key))
    expect(keyStrings).toContain('config_version')
    expect(keyStrings).toContain('config_settings')
  })

  test.skip('sendOperations', async () => {
    const operations = await client.sendMultipleOperations([
      {
        creator_public_key:
          'P12QDzMvr1SNNwJWmdpA9XQY9PqCDqdLaqiQDFZKQh8dPGSxagTh',
        signature:
          '1JhEaikbcebpJKPd7q6VsA2iWcnuL1iho6vcbpAsJJkp5SjFo7nD8xCJwxTXh7oiKH3bQ95DH7DK1kNzu5Xw5somQxbeiA',
        serialized_content: [
          128, 173, 226, 4, 160, 194, 30, 0, 0, 0, 159, 203, 100, 23, 219, 54,
          253, 245, 197, 164, 216, 135, 68, 99, 245, 229, 167, 22, 210, 46, 194,
          89, 114, 243, 208, 0, 237, 205, 111, 189, 24, 65, 0,
        ],
      },
    ])
    expect(operations).toHaveLength(1)
    operationId = operations[0]
  })

  test.skip('sendOperation', async () => {
    const operation = await client.sendOperation({
      publicKey: 'P12QDzMvr1SNNwJWmdpA9XQY9PqCDqdLaqiQDFZKQh8dPGSxagTh',
      signature:
        '1JhEaikbcebpJKPd7q6VsA2iWcnuL1iho6vcbpAsJJkp5SjFo7nD8xCJwxTXh7oiKH3bQ95DH7DK1kNzu5Xw5somQxbeiA',
      data: Uint8Array.from([
        128, 173, 226, 4, 160, 194, 30, 0, 0, 0, 159, 203, 100, 23, 219, 54,
        253, 245, 197, 164, 216, 135, 68, 99, 245, 229, 167, 22, 210, 46, 194,
        89, 114, 243, 208, 0, 237, 205, 111, 189, 24, 65, 0,
      ]),
    })
    expect(operation.length > 0)
  })

  test('getOperation', async () => {
    const operation = await client.getOperation(
      'O1YX1FoCdzXRXQutup9RTChaTB8yU6tKJEbeFAUZZhpaPeZGtbv'
    )
    // nothing to check as operation are not on the node anymore
    //OperationInfo.strictCheck(operation)
  })

  test('getMultipleOperations', async () => {
    const operations = await client.getOperations([
      'O1YX1FoCdzXRXQutup9RTChaTB8yU6tKJEbeFAUZZhpaPeZGtbv',
      'O1h9AmrLdo1BqL1PCy4YPXaY1NPMud34PRVCJcHUqzHfVABctXQ',
    ])
    // nothing to check as operation are not on the node anymore
    // expect(operations).toHaveLength(2)
  })

  test('getMultipleAddressInfo', async () => {
    const info = await client.getMultipleAddressInfo([TEST_CONTRACT])
    expect(info).toHaveLength(1)
    AddressInfo.strictCheck(info[0])
  })

  test.skip('getEvents', async () => {
    const event = await client.getEvents({
      smartTEST_CONTRACT: TEST_CONTRACT,
    } as EventFilter)
    expect(event.length > 1).toBeTruthy()
    SCOutputEvent.strictCheck(event[0])
  })

  // skip it til mainnet is updated
  test.skip('executeReadOnlyBytecode', async () => {
    const response = await client.executeReadOnlyBytecode({
      byteCode: DEPLOYER_BYTECODE,
      caller: TEST_USER,
      maxGas: MAX_GAS_EXECUTE,
    })

    ExecuteReadOnlyResponse.strictCheck(response)
  })

  test('executeMultipleReadOnlyBytecode', async () => {
    const req = {
      byteCode: DEPLOYER_BYTECODE,
      address: TEST_USER,
      maxGas: MAX_GAS_EXECUTE,
    }
    const responses = await client.executeMultipleReadOnlyBytecode([req, req])
    expect(responses).toHaveLength(2)
  })

  test.skip('getAddressesBytecode', async () => {
    const bytecode = await client.getAddressesBytecode({
      address: TEST_CONTRACT,
      is_final: true,
    } as AddressFilter)
    expect(bytecode.length > 1).toBeTruthy()
  })

  test.skip('executeMultipleGetAddressesBytecode', async () => {
    const req = {
      address: TEST_CONTRACT,
      is_final: true,
    } as AddressFilter
    const bytecodes = await client.executeMultipleGetAddressesBytecode([
      req,
      req,
    ])
    expect(bytecodes).toHaveLength(2)
  })

  test('executeReadOnlyCall', async () => {
    let arg = {
      func: 'hello',
      caller: TEST_USER,
      target: TEST_CONTRACT,
      maxGas: MAX_GAS_CALL,
      parameter: new Uint8Array(),
    }

    const response = await client.executeReadOnlyCall(arg)
    expect(response).toHaveProperty('value')

    expect(bytesToStr(response.value)).toBe(`Hello, ${NAME_VAL}!`)
  })

  test('executeMultipleReadOnlyCall', async () => {
    let arg = {
      target: TEST_CONTRACT,
      func: 'hello',
      parameter: new Uint8Array(),
      caller: TEST_USER,
    }
    const responses = await client.executeMultipleReadOnlyCall([arg, arg])
    expect(responses).toHaveLength(2)
    expect(bytesToStr(responses[0].value)).toBe(`Hello, ${NAME_VAL}!`)
    expect(bytesToStr(responses[1].value)).toBe(`Hello, ${NAME_VAL}!`)
  })

  test('deferredCallQuote', async () => {
    const quotes = await client.deferredCallQuote([
      {
        target_slot: { period: 0, thread: 0 },
        max_gas_request: 3_000_000,
        params_size: 1000,
      },
      {
        target_slot: { period: lastSlot.period + 2, thread: 10 },
        max_gas_request: 3_000_000,
        params_size: 1000,
      },
    ])
    expect(quotes).toHaveLength(2)
    expect(quotes[0].available).toBeFalsy()
    expect(quotes[1].available).toBeTruthy()
  })

  test('deferredCallInfo', async () => {
    await expect(
      client.deferredCallsInfo([
        'D12YfhHYFEWtVMYUtCVDQTEFQaMX27Aivqmth8AH8SfbJidX3Y8KF97DR1bTbZmew7B',
      ])
    ).rejects.toThrow(
      'Internal server error: Not found: Deferred call id D12YfhHYFEWtVMYUtCVDQTEFQaMX27Aivqmth8AH8SfbJidX3Y8KF97DR1bTbZmew7B'
    )
  })

  test('deferredCallBySlot', async () => {
    const deferredCalls = await client.deferredCallsBySlot([
      { period: lastSlot.period + 2, thread: 10 },
    ])
    expect(deferredCalls).toHaveLength(1)
    expect(deferredCalls[0].call_ids).toHaveLength(0)
    expect(deferredCalls[0].slot).toEqual({
      period: lastSlot.period + 2,
      thread: 10,
    })
  })
})
