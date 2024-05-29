import {
  AddressFilter,
  ReadOnlyBytecodeExecution,
  ReadOnlyCall,
  Slot,
} from '../../src/generated/client'
import { createCheckers } from 'ts-interface-checker'
import validator from '../../src/generated/client-ti'
import { EventFilter } from '../../src/client'
import { client } from './setup'
import { MAX_GAS_CALL } from '../../src/smartContract'
import { Address, bytesToStr } from '../../src/basicElements'

const {
  NodeStatus,
  AddressInfo,
  DatastoreEntryOutput,
  EndorsementInfo,
  Clique,
  GraphInterval,
  Staker,
  Block,
  BlockInfo,
  OperationInfo,
  SCOutputEvent,
  ExecuteReadOnlyResponse,
} = createCheckers(validator)

let lastSlot: Slot = { period: 0, thread: 0 }
let someEndorsement: string[]
let someBlockIds: string[]
let operationId: string

const TEST_USER = 'AU12dG5xP1RDEB5ocdHkymNVvvSJmUL9BgHwCksDowqmGWxfpm93x'
const TEST_CONTRACT = 'AS12DgPnd9rAy31iX2j7gTLAs63tcRfP9WvbCq5yrfnwaqxZmP77T'

describe('client tests', () => {
  test('getStatus', async () => {
    const status = await client.getStatus()
    lastSlot.period = status.last_slot!.period
    lastSlot.thread = status.last_slot!.thread
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

  test('getDatastoreEntry', async () => {
    const entry = await client.getDatastoreEntry('', TEST_CONTRACT)
    DatastoreEntryOutput.strictCheck(entry)
  })

  test('getDatastoreEntries', async () => {
    let str1 = ''
    let result = Array.from(str1, (char) => char.charCodeAt(0))
    const entries = await client.getDatastoreEntries([
      {
        address: TEST_CONTRACT,
        key: result,
      },
    ])

    entries.forEach((entry) => DatastoreEntryOutput.strictCheck(entry))
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

  test.skip('getOperation', async () => {
    const operation = await client.getOperation(operationId)
    OperationInfo.strictCheck(operation)
  })

  test.skip('getMultipleOperations', async () => {
    const operations = await client.getOperations([operationId, operationId])
    expect(operations).toHaveLength(2)
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

  test('executeReadOnlyBytecode', async () => {
    const response = await client.executeReadOnlyBytecode({
      max_gas: 100000,
      bytecode: [65, 66],
      address: TEST_USER,
    })
    ExecuteReadOnlyResponse.strictCheck(response)
  })

  test('executeMultipleReadOnlyBytecode', async () => {
    const req = {
      max_gas: 100000,
      bytecode: [65, 66],
      address: TEST_USER,
    } as ReadOnlyBytecodeExecution
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
      caller: Address.fromString(TEST_USER),
      target: Address.fromString(TEST_CONTRACT),
      maxGas: MAX_GAS_CALL,
      parameter: new Uint8Array(),
    }

    const response = await client.executeReadOnlyCall(arg)
    expect(response).toHaveProperty('value')

    expect(bytesToStr(response.value)).toBe('Hello, World!')
  })

  test('executeMultipleReadOnlyCall', async () => {
    let arg = {
      max_gas: 1000000,
      target_address: TEST_USER,
      target_function: 'hello',
      parameter: [],
      caller_address: null,
      coins: null,
      fee: null,
    } as ReadOnlyCall
    const responses = await client.executeMultipleReadOnlyCall([arg, arg])
    expect(responses).toHaveLength(2)
    ExecuteReadOnlyResponse.strictCheck(responses[0])
    ExecuteReadOnlyResponse.strictCheck(responses[1])
  })
})
