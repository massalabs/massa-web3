import {
  AddressFilter,
  EventFilter,
  ReadOnlyBytecodeExecution,
  ReadOnlyCall,
  Slot,
} from '../generated/client'
import { PublicAPI, Transport } from '../src/publicAPI'
import { createCheckers } from 'ts-interface-checker'
import validator from '../generated/client-ti'
import {
  CHAIN_ID,
  Client,
  ClientFactory,
  DefaultProviderUrls,
  IAccount,
  ITransactionData,
  WalletClient,
  fromMAS,
} from '../../packages/massa-web3/src'

import { getEnvVariable } from '../../packages/massa-web3/examples/utils'

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

const api = new PublicAPI(Transport.https, 'mainnet.massa.net', 443, '/api/v2')

const mainnetWalletTestPrivateKey = getEnvVariable(
  'MAINNET_WALLET_TEST_PRIVATE_KEY'
)

let lastSlot: Slot = { period: 0, thread: 0 }
let someEndorsement: string[]
let someBlockIds: string[]
let operationId: string

let deployerAccount: IAccount
let web3Client: Client

describe('unit tests', () => {
  beforeAll(async () => {
    deployerAccount = await WalletClient.getAccountFromSecretKey(
      mainnetWalletTestPrivateKey
    )
    web3Client = await ClientFactory.createDefaultClient(
      DefaultProviderUrls.MAINNET,
      CHAIN_ID.MainNet,
      true,
      deployerAccount
    )
  })

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
    const txIds = await web3Client.wallet().sendTransaction({
      amount: fromMAS(0),
      fee: fromMAS(0.01),
      recipientAddress: 'AU12vgqgRjUDLCDpfokrggn8rD5aem7xDmcNKrbvKzjmKmFK2xVwL',
    } as ITransactionData)
    expect(txIds.length > 0)
    operationId = txIds[0]
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
    }
    const responses = await api.executeMultipleReadOnlyCall([arg, arg])
    expect(responses).toHaveLength(2)
    ExecuteReadOnlyResponse.strictCheck(responses[0])
    ExecuteReadOnlyResponse.strictCheck(responses[1])
  })
})
