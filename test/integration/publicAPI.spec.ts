import {
  AddressFilter,
  EventFilter,
  ExecuteReadOnlyResponse,
  ReadOnlyBytecodeExecution,
  Slot,
} from '../../src/generated/client'
import { createCheckers } from 'ts-interface-checker'
import validator from '../../src/generated/client-ti'

import { JsonRPCClient, ReadOnlyCallParams } from '../../src/client'
import { Address, Mas } from '../../src/basicElements'
import { Account } from '../../src/account'
import { AccountOperation } from '../../src/accountOperation'

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
  ReadOnlyCallResult,
} = createCheckers(validator)

const mainnetWalletTestPrivateKey = process.env.MAINNET_WALLET_TEST_PRIVATE_KEY

let lastSlot: Slot = { period: 0, thread: 0 }
let someEndorsement: string[]
let someBlockIds: string[]
let operationId: string

let deployerAccount: Account
let api: JsonRPCClient
let accountOperation: AccountOperation

describe('unit tests', () => {
  beforeAll(async () => {
    if (!mainnetWalletTestPrivateKey) {
      throw new Error('MAINNET_WALLET_TEST_PRIVATE_KEY is not defined')
    }
    deployerAccount = await Account.fromPrivateKey(mainnetWalletTestPrivateKey)

    api = JsonRPCClient.mainnet()

    accountOperation = new AccountOperation(deployerAccount, api)
  })

  test('getStatus', async () => {
    const status = await api.status()
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
    const stakers = await api.getStakers({ limit: 2, offset: 0 })
    stakers.forEach((s) => Staker.strictCheck(s))
    expect(stakers).toHaveLength(2)
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

  test('sendOperations', async () => {
    let op = await accountOperation.transfer(
      'AU12vgqgRjUDLCDpfokrggn8rD5aem7xDmcNKrbvKzjmKmFK2xVwL',
      Mas.fromNanoMas(1n),
      { fee: Mas.fromString('0.01') }
    )
    expect(op.id.length > 0)
    operationId = op.id
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

  test('getOperation', async () => {
    const operation = await api.getOperation(operationId)
    OperationInfo.strictCheck(operation)
  })

  test('getMultipleOperations', async () => {
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

  test('getFilteredScOutputEvent', async () => {
    const event = await api.getEvents({
      emitter_address: 'AS12qzyNBDnwqq2vYwvUMHzrtMkVp6nQGJJ3TETVKF5HCd4yymzJP',
    } as EventFilter)
    expect(event.length > 1).toBeTruthy()
    SCOutputEvent.strictCheck(event[0])
  })

  test('executeReadOnlyBytecode', async () => {
    const response = await api.executeReadOnlyBytecode({
      max_gas: 2100000,
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

  test('getAddressesBytecode', async () => {
    const bytecode = await api.getAddressesBytecode({
      address: 'AS12qzyNBDnwqq2vYwvUMHzrtMkVp6nQGJJ3TETVKF5HCd4yymzJP',
      is_final: true,
    } as AddressFilter)
    expect(bytecode.length > 1).toBeTruthy()
  })

  test('executeMultipleGetAddressesBytecode', async () => {
    const req = {
      address: 'AS12qzyNBDnwqq2vYwvUMHzrtMkVp6nQGJJ3TETVKF5HCd4yymzJP',
      is_final: true,
    } as AddressFilter
    const bytecodes = await api.executeMultipleGetAddressesBytecode([req, req])
    expect(bytecodes).toHaveLength(2)
  })

  test('executeReadOnlyCall', async () => {
    let params: ReadOnlyCallParams = {
      maxGas: 2100000n,
      target: Address.fromString(
        'AS124ZqPefYDWqboB2jzj9U19aDCmz57TUJzdbiLpfcsj2HsGLYCk'
      ),
      func: 'receive',
      caller: Address.fromString(
        'AS124ZqPefYDWqboB2jzj9U19aDCmz57TUJzdbiLpfcsj2HsGLYCk'
      ),
    }

    let response: any[] = await api.connector.execute_read_only_call([
      {
        max_gas: Number(params.maxGas),
        target_address: params.target.toString(),
        target_function: params.func,
        parameter: params.parameter ? Array.from(params.parameter) : [],
        caller_address: params.caller.toString(),
        coins: params.coins ? Mas.toString(params.coins) : null,
        fee: params.fee ? Mas.toString(params.fee) : null,
      },
    ])

    response.forEach((resp) => {
      ExecuteReadOnlyResponse.strictCheck(resp)
    })
  })
})
