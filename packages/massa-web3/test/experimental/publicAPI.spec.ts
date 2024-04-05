import { Endorsement, Slot } from '../../src/experimental/generated/client'
import { PublicAPI, Transport } from '../../src/experimental/publicAPI'
import { createCheckers } from 'ts-interface-checker'
import validator from '../../src/experimental/generated/client-ti'

const {
  NodeStatus,
  AddressInfo,
  Clique,
  GraphInterval,
  Staker,
  Transfers,
  Endorsement: EndorsementChecker,
  Block,
  BlockInfo,
} = createCheckers(validator)

const api = new PublicAPI(Transport.https, 'mainnet.massa.net', 443, '/api/v2')

var lastSlot: Slot = { period: 0, thread: 0 }
var someEndorsement: Endorsement[]
var someBlockIds: string[]

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
    AddressInfo.check(info)
  })

  test('getCliques', async () => {
    const cliques = await api.getCliques()
    someBlockIds = cliques[0].block_ids
    cliques.forEach((c) => Clique.check(c))
  })

  test('getGraphInterval', async () => {
    const interval = await api.getGraphInterval()
    GraphInterval.check(interval)
  })

  test('getStakers', async () => {
    const stakers = await api.getStakers({ limit: 5, offset: 0 })
    stakers.forEach((s) => Staker.check(s))
    expect(stakers).toHaveLength(5)
  })

  test('getSlotTransfers', async () => {
    const transfers = await api.getSlotTransfers(lastSlot)
    Transfers.check(transfers)
  })

  test('getMultipleSlotTransfers', async () => {
    const transfersArray = await api.getMultipleSlotTransfers([
      lastSlot,
      { period: lastSlot.period - 1, thread: lastSlot.thread },
    ])
    transfersArray.forEach((t) => Transfers.check(t))
  })

  test('getBlockcliqueBlock', async () => {
    const block = await api.getBlockcliqueBlock(lastSlot)
    someEndorsement = block.header.content['endorsements']!
    Block.check(block)
  })

  test('getBlock', async () => {
    const block = await api.getBlock(someBlockIds[0])
    BlockInfo.check(block)
    expect(block).toHaveProperty('content.block.header.content.endorsements')
  })

  test('getMultipleBlocks', async () => {
    const blocks = await api.getMultipleBlocks(someBlockIds.slice(0, 2))
    BlockInfo.check(blocks)
  })

  test('getEndorsement', async () => {
    const endorsement = await api.getEndorsement(someEndorsement[0].id!)
    EndorsementChecker.check(endorsement)
  })

  test('getMultipleEndorsements', async () => {
    const endorsements = await api.getMultipleEndorsements([
      someEndorsement[1].id!,
      someEndorsement[2].id!,
    ])
    endorsements.forEach((e) => EndorsementChecker.check(e))
  })

  /*
  test('getDatastoreEntries', async () => {
    const entry = await api.getDatastoreEntries({ key: 'key', address: 'address' });
    expect(entry).toHaveProperty('key');
  });

  test('getDatastoreEntry', async () => {
    const entry = await api.getDatastoreEntry('key', 'address');
    expect(entry).toHaveProperty('key');
  });

  test('getFilteredScOutputEvent', async () => {
    const event = await api.getFilteredScOutputEvent({ address: 'address' });
    expect(event).toHaveLength(1);
  });

  test('getOperations', async () => {
    const operation = await api.getOperations('1');
    expect(operation).toHaveProperty('operation');
  });

  test('sendOperation', async () => {
    const operation = await api.sendOperation({ operation: 'operation' });
    expect(operation).toHaveProperty('operation_id');
  });
  test('executeReadOnlyBytecode', async () => {
    const response = await api.executeReadOnlyBytecode({ bytecode: 'bytecode' });
    expect(response).toHaveProperty('result');
  });
  test('executeReadOnlyCall', async () => {
    const response = await api.executeReadOnlyCall({ call: 'call' });
    expect(response).toHaveProperty('result');
  });
  test('getAddressesBytecode', async () => {
    const bytecode = await api.getAddressesBytecode({ address: 'address' });
    expect(bytecode).toBe('bytecode');
  });

  test('getMultipleAddressInfo', async () => {
    const info = await api.getMultipleAddressInfo(['address1', 'address2']);
    expect(info).toHaveLength(2);
  });
  test('getMultipleDatastoresEntries', async () => {
    const entries = await api.getMultipleDatastoresEntries([{ key: 'key1', address: 'address1' }, { key: 'key2', address: 'address2' }]);
    expect(entries).toHaveLength(2);
  });
  test('getMultipleOperations', async () => {
    const operations = await api.getMultipleOperations(['1', '2']);
    expect(operations).toHaveLength(2);
  });
  test('sendMultipleOperations', async () => {
    const operations = await api.sendMultipleOperations([{ operation: 'operation1' }, { operation: 'operation2' }]);
    expect(operations).toHaveLength(2);
  });
  test('executeMultipleReadOnlyBytecode', async () => {
    const responses = await api.executeMultipleReadOnlyBytecode([{ bytecode: 'bytecode1' }, { bytecode: 'bytecode2' }]);
    expect(responses).toHaveLength(2);
  });
  test('executeMultipleReadOnlyCall', async () => {
    const responses = await api.executeMultipleReadOnlyCall([{ call: 'call1' }, { call: 'call2' }]);
    expect(responses).toHaveLength(2);
  });
  test('executeMultipleGetAddressesBytecode', async () => {
    const bytecodes = await api.executeMultipleGetAddressesBytecode([{ address: 'address1' }, { address: 'address2' }]);
    expect(bytecodes).toHaveLength(2);
  });*/
})
