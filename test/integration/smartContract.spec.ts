import path from 'path'
import fs from 'fs'
import {
  DeploySCOptions,
  MAX_GAS_CALL,
  MAX_GAS_DEPLOYMENT,
  MIN_GAS_CALL,
  SmartContract,
} from '../../src/smartContracts'
import { provider } from './setup'
import { Address, Args, bytesToStr, Mas } from '../../src/basicElements'

import { execute } from '../../src/basicElements/bytecode'
import { Operation } from '../../src/operation'

const INSUFFICIENT_MAX_GAS = MIN_GAS_CALL - 1n
const contractPath = path.join(__dirname, './contracts/scTest.wasm')

describe('Smart Contract', () => {
  describe('ByteCode', () => {
    test('execute', async () => {
      const byteCode = new Uint8Array([1, 2, 3, 4])
      const opts = {
        periodToLive: 2,
        coins: 3n,
        maxGas: 4n,
      }

      const opId = await execute(
        provider.client,
        provider.account.privateKey,
        byteCode,
        opts
      )
      const operation = new Operation(provider, opId)
      expect(await operation.getSpeculativeEvents()).toHaveLength(1)
    })

    test('not enough fee', async () => {
      const byteCode = new Uint8Array([1, 2, 3, 4])
      const opts = {
        fee: Mas.fromString('0.000000001'),
        periodToLive: 2,
        coins: 3n,
        maxGas: 4n,
      }

      await expect(
        execute(provider.client, provider.account.privateKey, byteCode, opts)
      ).rejects.toMatchObject({
        message: expect.stringMatching(/fee is too low/),
      })
    })
  })

  describe('SmartContract - Call ', () => {
    let contractTest: SmartContract

    beforeAll(async () => {
      const byteCode = fs.readFileSync(contractPath)
      const constructorArgs = new Args().addString('myName')

      const deployOptions: DeploySCOptions = {
        periodToLive: 2,
        maxGas: MAX_GAS_DEPLOYMENT,
        coins: Mas.fromString('0.0016'),
      }

      contractTest = await SmartContract.deploy(
        provider,
        byteCode,
        constructorArgs,
        deployOptions
      )

      expect(Address.fromString(contractTest.address).isEOA).toBeFalsy()
    })

    test('minimal call', async () => {
      const op = await contractTest.call('event')
      const events = await op.getSpeculativeEvents()
      const firstEvent = events[0].data
      expect(firstEvent).toBe("I'm an event!")
    })

    test('call that set a value in the datastore', async () => {
      const key = 'myKey'
      const value = 'myValue'
      const parameter = new Args().addString(key).addString(value).serialize()

      const op = await contractTest.call('setValueToKey', parameter, {
        coins: Mas.fromString('0.0016'),
      })

      const events = await op.getSpeculativeEvents()
      const firstEvent = events[0].data
      expect(firstEvent).toBe(`Set value ${value} to key ${key}`)
    })

    test('call with send coins', async () => {
      const coinAmount = Mas.fromString('1')

      const op = await contractTest.call('sendCoins', new Uint8Array(), {
        coins: coinAmount,
      })

      const events = await op.getSpeculativeEvents()
      const firstEvent = events[0].data

      expect(firstEvent).toBe(`Received ${coinAmount.toString()} coins`)
    })

    test('Attempt to call with maxGas value that is below the minimum required limit', async () => {
      const call = contractTest.call('event', undefined, {
        maxGas: INSUFFICIENT_MAX_GAS,
      })

      expect(call).rejects.toThrow(
        `The gas limit for the operation was below the minimum amount of ${MIN_GAS_CALL}`
      )
    })

    test('Attempt to call with maxGas value that exceeds the maximum limit', async () => {
      const call = contractTest.call('event', undefined, {
        maxGas: MAX_GAS_CALL + 1n,
      })

      expect(call).rejects.toThrow(
        `The gas limit for the operation was higher than the maximum amount of ${MAX_GAS_CALL}`
      )
    })

    test('Read only call', async () => {
      const result = await contractTest.read(
        'getValueFromKey',
        new Args().addString('myKey').serialize()
      )

      const value = bytesToStr(result.value)

      expect(value).toBe('myValue')
    })

    test('Read only call with not serialized args', async () => {
      const result = await contractTest.read(
        'getValueFromKey',
        new Args().addString('myKey')
      )

      const value = bytesToStr(result.value)

      expect(value).toBe('myValue')
    })

    test('Read only call with invalid function name', async () => {
      const result = await contractTest.read('invalidFunction')

      expect(result.info.error).toContain('Missing export invalidFunction')
    })

    // Read with fee
    test('Read only call with fee', async () => {
      const result = await contractTest.read(
        'getValueFromKey',
        new Args().addString('myKey').serialize(),
        {
          caller: provider.account.address.toString(),
        }
      )

      const value = bytesToStr(result.value)
      expect(value).toBe('myValue')
    })

    test('Read only call with fee and no callerAddress', async () => {
      const result = await contractTest.read(
        'getValueFromKey',
        new Args().addString('myKey').serialize()
      )

      const value = bytesToStr(result.value)
      expect(value).toBe('myValue')
    })

    test('Read only call with coins', async () => {
      const coinAmount = Mas.fromString('1')
      const result = await contractTest.read('sendCoins', undefined, {
        coins: coinAmount,
      })

      expect(result.info.events[0].data).toBe(
        `Received ${coinAmount.toString()} coins`
      )
    })

    test('Read only call with maxGas', async () => {
      const result = await contractTest.read(
        'getValueFromKey',
        new Args().addString('myKey').serialize(),
        {
          maxGas: MAX_GAS_CALL,
        }
      )

      const value = bytesToStr(result.value)
      expect(value).toBe('myValue')
    })
  })
})
