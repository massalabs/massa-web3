import path from 'path'
import fs from 'fs'
import {
  MAX_GAS_CALL,
  MAX_GAS_DEPLOYMENT,
  MIN_GAS_CALL,
  SmartContract,
} from '../../src/smartContract'
import { account, client } from './setup'
import { Args, bytesToStr, Mas } from '../../src/basicElements'

import { execute } from '../../src/basicElements/bytecode'

const TIMEOUT = 61000
const INSUFFICIENT_MAX_GAS = MIN_GAS_CALL - 1n
const contractPath = path.join(__dirname, './contracts/scTest.wasm')

describe('Smart Contract', () => {
  let contractTest: SmartContract
  describe('ByteCode', () => {
    test(
      'execute',
      async () => {
        const byteCode = new Uint8Array([1, 2, 3, 4])
        const opts = {
          periodToLive: 2,
          coins: 3n,
          maxGas: 4n,
        }
        const contract = await execute(
          client,
          account.privateKey,
          byteCode,
          opts
        )
        expect(await contract.getSpeculativeEvents()).toHaveLength(1)
      },
      TIMEOUT
    )

    test('not enough fee', async () => {
      const byteCode = new Uint8Array([1, 2, 3, 4])
      const opts = {
        fee: Mas.fromString('0.000000001'),
        periodToLive: 2,
        coins: 3n,
        maxGas: 4n,
      }

      expect(
        execute(client, account.privateKey, byteCode, opts)
      ).rejects.toThrow(
        'Bad request: fee is too low provided: 0.000000001 , minimal_fees required: 0.01'
      )
    })
  })

  test('deploy', async () => {
    const byteCode = fs.readFileSync(contractPath)

    const deployContract = {
      byteCode,
      parameter: new Args().addString('myName').serialize(),
      coins: Mas.fromString('0.0016'),
    }

    const deployOptions = {
      periodToLive: 2,
      maxGas: MAX_GAS_DEPLOYMENT,
    }

    const contract = await SmartContract.deploy(
      client,
      account,
      deployContract,
      deployOptions
    )

    expect(contract.address.isEOA).toBeFalsy()
    contractTest = contract
  }, 60000)

  describe('SmartContract - Call ', () => {
    test(
      'minimal call',
      async () => {
        const op = await contractTest.call('event', new Uint8Array())

        const events = await op.getSpeculativeEvents()
        const firstEvent = events[0].data
        expect(firstEvent).toBe("I'm an event!")
      },
      TIMEOUT
    )

    test(
      'call that set a value in the datastore',
      async () => {
        const key = 'myKey'
        const value = 'myValue'
        const parameter = new Args().addString(key).addString(value).serialize()

        const op = await contractTest.call('setValueToKey', parameter, {
          coins: Mas.fromString('0.0016'),
        })

        const events = await op.getSpeculativeEvents()
        const firstEvent = events[0].data
        expect(firstEvent).toBe(`Set value ${value} to key ${key}`)
      },
      TIMEOUT
    )

    test(
      'call with send coins',
      async () => {
        const coinAmount = Mas.fromString('1')

        const op = await contractTest.call('sendCoins', new Uint8Array(), {
          coins: coinAmount,
          account: account,
        })

        const events = await op.getSpeculativeEvents()
        const firstEvent = events[0].data

        expect(firstEvent).toBe(`Received ${coinAmount.toString()} coins`)
      },
      TIMEOUT
    )

    test(
      'Attempt to call with maxGas value that is below the minimum required limit',
      async () => {
        const call = contractTest.call('event', new Uint8Array(), {
          maxGas: INSUFFICIENT_MAX_GAS,
        })

        expect(call).rejects.toThrow(
          `The gas limit for the operation was below the minimum amount of ${MIN_GAS_CALL}`
        )
      },
      TIMEOUT
    )

    test('Attempt to call with maxGas value that exceeds the maximum limit', async () => {
      const call = contractTest.call('event', new Uint8Array(), {
        maxGas: MAX_GAS_CALL + 1n,
      })

      expect(call).rejects.toThrow(
        `The gas limit for the operation was higher than the maximum amount of ${MAX_GAS_CALL}`
      )
    })

    describe('Read', () => {
      test('Read only call', async () => {
        const result = await contractTest.read(
          'getValueFromKey',
          new Args().addString('myKey').serialize()
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
            fee: Mas.fromString('0.1'),
            caller: account.address,
          }
        )

        const value = bytesToStr(result.value)
        expect(value).toBe('myValue')
      })

      test('Read only call with fee and no callerAddress', async () => {
        const result = await contractTest.read(
          'getValueFromKey',
          new Args().addString('myKey').serialize(),
          {
            fee: Mas.fromString('0.01'),
          }
        )

        const value = bytesToStr(result.value)
        expect(value).toBe('myValue')
      })

      test('Read only call with coins', async () => {
        const coinAmount = Mas.fromString('1')
        const result = await contractTest.read('sendCoins', new Uint8Array(), {
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
})
