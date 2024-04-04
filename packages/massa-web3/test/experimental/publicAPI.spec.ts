import {
  AddressFilter,
  EventFilter,
  ReadOnlyBytecodeExecution,
  ReadOnlyCall,
  Slot,
} from '../../src/experimental/generated/client'
import { PublicAPI, Transport } from '../../src/experimental/publicAPI'
import { createCheckers } from 'ts-interface-checker'
import validator from '../../src/experimental/generated/client-ti'

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

const api = new PublicAPI(Transport.https, 'buildnet.massa.net', 443, '/api/v2')

let lastSlot: Slot = { period: 0, thread: 0 }
let someEndorsement: string[]
let someBlockIds: string[]
let operationId: string

describe('unit tests', () => {
  test('getStatus', async () => {
    const status = await api.getStatus()
    lastSlot.period = status.last_slot!.period
    lastSlot.thread = status.last_slot!.thread
    NodeStatus.check(status)
  })

  test('getAddressInfo', async () => {
    const info = await api.getAddressInfo(
      'AU1Fp7uBP2TXxDty2HdTE3ZE3XQ4cNXnG3xuo8TkQLJtyxC7FKhx'
    )
    AddressInfo.strictCheck(info)
  })

  test('getCliques', async () => {
    const cliques = await api.getCliques()
    someBlockIds = cliques[0].block_ids
    cliques.forEach((c) => Clique.strictCheck(c))
  })

  test('getGraphInterval', async () => {
    const now = Date.now()
    const interval = await api.getGraphInterval(now - 2000, now)
    interval.forEach((i) => GraphInterval.strictCheck(i))
  })

  test('getStakers', async () => {
    const stakers = await api.getStakers({ limit: 5, offset: 0 })
    stakers.forEach((s) => Staker.strictCheck(s))
    expect(stakers).toHaveLength(5)
  })

  test('getBlockcliqueBlock', async () => {
    const block = await api.getBlockcliqueBlock(lastSlot)
    if (block.header.content.endorsements) {
      someEndorsement = block.header.content.endorsements.map((e) => e.id!)
    }
    Block.strictCheck(block)
  })

  test('getBlock', async () => {
    const block = await api.getBlock(someBlockIds[0])
    BlockInfo.strictCheck(block)
    expect(block).toHaveProperty('content.block.header.content.endorsements')
  })

  test('getMultipleBlocks', async () => {
    const blocks = await api.getMultipleBlocks(someBlockIds.slice(0, 2))
    BlockInfo.strictCheck(blocks[0])
  })

  test('getEndorsement', async () => {
    const endorsement = await api.getEndorsement(someEndorsement[0]!)
    EndorsementInfo.strictCheck(endorsement)
  })

  test('getMultipleEndorsements', async () => {
    const endorsements = await api.getMultipleEndorsements([
      someEndorsement[1]!,
      someEndorsement[2]!,
    ])
    endorsements.forEach((e) => EndorsementInfo.strictCheck(e))
  })

  test('getDatastoreEntry', async () => {
    const entry = await api.getDatastoreEntry(
      '',
      'AS12qzyNBDnwqq2vYwvUMHzrtMkVp6nQGJJ3TETVKF5HCd4yymzJP'
    )
    DatastoreEntryOutput.strictCheck(entry)
  })

  test('getDatastoreEntries', async () => {
    let str1 = ''
    let result = Array.from(str1, (char) => char.charCodeAt(0))
    const entries = await api.getDatastoreEntries([
      {
        address: 'AS12qzyNBDnwqq2vYwvUMHzrtMkVp6nQGJJ3TETVKF5HCd4yymzJP',
        key: result,
      },
    ])

    entries.forEach((entry) => DatastoreEntryOutput.strictCheck(entry))
  })

  test.skip('sendOperations', async () => {
    const operations = await api.sendMultipleOperations([
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
    const operation = await api.sendOperation({
      creator_public_key:
        'P12QDzMvr1SNNwJWmdpA9XQY9PqCDqdLaqiQDFZKQh8dPGSxagTh',
      signature:
        '1JhEaikbcebpJKPd7q6VsA2iWcnuL1iho6vcbpAsJJkp5SjFo7nD8xCJwxTXh7oiKH3bQ95DH7DK1kNzu5Xw5somQxbeiA',
      serialized_content: [
        128, 173, 226, 4, 160, 194, 30, 0, 0, 0, 159, 203, 100, 23, 219, 54,
        253, 245, 197, 164, 216, 135, 68, 99, 245, 229, 167, 22, 210, 46, 194,
        89, 114, 243, 208, 0, 237, 205, 111, 189, 24, 65, 0,
      ],
    })
    expect(operation.length > 0)
  })

  test.skip('getOperation', async () => {
    const operation = await api.getOperation(operationId)
    OperationInfo.strictCheck(operation)
  })

  test.skip('getMultipleOperations', async () => {
    const operations = await api.getOperations([operationId, operationId])
    expect(operations).toHaveLength(2)
  })

  test('getMultipleAddressInfo', async () => {
    const info = await api.getMultipleAddressInfo([
      'AS12qzyNBDnwqq2vYwvUMHzrtMkVp6nQGJJ3TETVKF5HCd4yymzJP',
    ])
    expect(info).toHaveLength(1)
    AddressInfo.strictCheck(info[0])
  })

  test.skip('getFilteredScOutputEvent', async () => {
    const event = await api.getFilteredScOutputEvent({
      emitter_address: 'AS12qzyNBDnwqq2vYwvUMHzrtMkVp6nQGJJ3TETVKF5HCd4yymzJP',
    } as EventFilter)
    expect(event.length > 1).toBeTruthy()
    SCOutputEvent.strictCheck(event[0])
  })

  test('executeReadOnlyBytecode', async () => {
    const response = await api.executeReadOnlyBytecode({
      max_gas: 100000,
      bytecode: [65, 66],
      address: 'AU12dG5xP1RDEB5ocdHkymNVvvSJmUL9BgHwCksDowqmGWxfpm93x',
    })
    ExecuteReadOnlyResponse.strictCheck(response)
  })

  test('executeMultipleReadOnlyBytecode', async () => {
    const req = {
      max_gas: 100000,
      bytecode: [65, 66],
      address: 'AU12dG5xP1RDEB5ocdHkymNVvvSJmUL9BgHwCksDowqmGWxfpm93x',
    } as ReadOnlyBytecodeExecution
    const responses = await api.executeMultipleReadOnlyBytecode([req, req])
    expect(responses).toHaveLength(2)
  })

  test.skip('getAddressesBytecode', async () => {
    const bytecode = await api.getAddressesBytecode({
      address: 'AS12qzyNBDnwqq2vYwvUMHzrtMkVp6nQGJJ3TETVKF5HCd4yymzJP',
      is_final: true,
    } as AddressFilter)
    expect(bytecode.length > 1).toBeTruthy()
  })

  test.skip('executeMultipleGetAddressesBytecode', async () => {
    const req = {
      address: 'AS12qzyNBDnwqq2vYwvUMHzrtMkVp6nQGJJ3TETVKF5HCd4yymzJP',
      is_final: true,
    } as AddressFilter
    const bytecodes = await api.executeMultipleGetAddressesBytecode([req, req])
    expect(bytecodes).toHaveLength(2)
  })

  test('executeReadOnlyCall', async () => {
    let arg = {
      max_gas: 1000000,
      target_address: 'AU12dG5xP1RDEB5ocdHkymNVvvSJmUL9BgHwCksDowqmGWxfpm93x',
      target_function: 'hello',
      parameter: [],
      caller_address: null,
      coins: null,
      fee: null,
    }
    const response = await api.executeReadOnlyCall(arg as ReadOnlyCall)
    expect(response).toHaveProperty('result')
    ExecuteReadOnlyResponse.strictCheck(response)
  })

  test('executeMultipleReadOnlyCall', async () => {
    let arg = {
      max_gas: 1000000,
      target_address: 'AU12dG5xP1RDEB5ocdHkymNVvvSJmUL9BgHwCksDowqmGWxfpm93x',
      target_function: 'hello',
      parameter: [],
      caller_address: null,
      coins: null,
      fee: null,
    } as ReadOnlyCall
    const responses = await api.executeMultipleReadOnlyCall([arg, arg])
    expect(responses).toHaveLength(2)
    ExecuteReadOnlyResponse.strictCheck(responses[0])
    ExecuteReadOnlyResponse.strictCheck(responses[1])
  })
})
