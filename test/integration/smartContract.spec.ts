import path from 'path'
import fs from 'fs'
import {
  DeploySCOptions,
  MAX_GAS_CALL,
  MAX_GAS_DEPLOYMENT,
  MIN_GAS_CALL,
  SmartContract,
} from '../../src/smartContracts'
import { provider, publicProvider } from './setup'
import {
  Address,
  Args,
  bytesToStr,
  Mas,
  strToBytes,
} from '../../src/basicElements'

const INSUFFICIENT_MAX_GAS = MIN_GAS_CALL - 1n
const contractPath = path.join(__dirname, './contracts/scTest.wasm')

describe('Smart Contract', () => {
  describe('ExecuteSC ByteCode', () => {
    let byteCode: Uint8Array
    beforeAll(async () => {
      byteCode = fs.readFileSync(
        path.join(__dirname, './contracts/executeHello.wasm')
      )
    })

    test('execute', async () => {
      const name = 'ElonMars'
      const datastore = new Map<Uint8Array, Uint8Array>()
      datastore.set(strToBytes('name_key'), strToBytes(name))
      const operation = await provider.executeSC({
        byteCode,
        datastore,
      })

      const events = await operation.getSpeculativeEvents()

      expect(events).toHaveLength(1)
      expect(events[0].data).toBe(`Hello ${name}`)
    })

    test('not enough fee', async () => {
      await expect(
        provider.executeSC({
          byteCode,
          fee: 1n,
        })
      ).rejects.toMatchObject({
        message: expect.stringMatching(/fee is too low/),
      })
    })
  })

  describe('SmartContract - Call ', () => {
    let contractTest: SmartContract
    let contractPublicProviderTest: SmartContract

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

      contractPublicProviderTest = new SmartContract(
        publicProvider,
        contractTest.address
      )

      expect(Address.fromString(contractTest.address).isEOA).toBeFalsy()
    })

    test('minimal call', async () => {
      const op = await contractTest.call('event')
      const events = await op.getSpeculativeEvents()
      const firstEvent = events[0].data
      expect(firstEvent).toBe("I'm an event!")
    })

    test('call fail with public provider', async () => {
      expect(contractPublicProviderTest.call('event')).rejects.toThrow(
        'Provider does not support callSC'
      )
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
