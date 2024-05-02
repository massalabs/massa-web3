import path from 'path'
import fs from 'fs'
import {
  ByteCode,
  MAX_GAS_CALL,
  MIN_GAS_CALL,
  SmartContract,
} from '../../../src/experimental/smartContract'
import { account, client } from './setup'
import { Args } from '../../../src/experimental/basicElements'
import { Address } from '../../../src/experimental/basicElements'
import { MAX_GAS_DEPLOYMENT, fromMAS } from '@massalabs/web3-utils'

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
        const contract = await ByteCode.execute(
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
        fee: fromMAS(0.000000001),
        periodToLive: 2,
        coins: 3n,
        maxGas: 4n,
      }

      expect(
        ByteCode.execute(client, account.privateKey, byteCode, opts)
      ).rejects.toThrow(
        'Bad request: fee is too low provided: 0.000000001 , minimal_fees required: 0.01'
      )
    })
  })

  test('deploy', async () => {
    const wasmPath = path.join(__dirname, contractPath)

    const byteCode = fs.readFileSync(wasmPath)

    const opts = {
      periodToLive: 2,
      coins: 3n,
      maxGas: MAX_GAS_DEPLOYMENT,
    }
    const args = new Args().addString('myName').serialize()
    const contract = await SmartContract.deploy(
      client,
      account,
      byteCode,
      new Uint8Array(args),
      opts
    )

    const scAddress = Address.fromString(contract.contractAddress)
    expect(scAddress.isEOA).toBeFalsy()

    contractTest = contract
  }, 60000)

  describe('SmartContract - Call ', () => {
    test(
      'minimal call',
      async () => {
        const op = await contractTest.call(
          account,
          'event',
          new Uint8Array(),
          {}
        )

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

        const op = await contractTest.call(
          account,
          'setValueToKey',
          parameter,
          {
            coins: fromMAS(0.0016),
          }
        )

        const events = await op.getSpeculativeEvents()
        const firstEvent = events[0].data
        expect(firstEvent).toBe(`Set value ${value} to key ${key}`)
      },
      TIMEOUT
    )

    test(
      'call with send coins',
      async () => {
        const coinAmount = fromMAS(0.001)

        const op = await contractTest.call(
          account,
          'sendCoins',
          new Uint8Array(),
          {
            coins: coinAmount,
          }
        )

        const events = await op.getSpeculativeEvents()
        const firstEvent = events[0].data

        expect(firstEvent).toBe(`Received ${coinAmount.toString()} coins`)
      },
      TIMEOUT
    )

    test(
      'Attempt to call with maxGas value that is below the minimum required limit',
      async () => {
        const call = contractTest.call(account, 'event', new Uint8Array(), {
          maxGas: INSUFFICIENT_MAX_GAS,
        })

        expect(call).rejects.toThrow(
          `The gas limit for the operation was below the minimum amount of ${MIN_GAS_CALL}`
        )
      },
      TIMEOUT
    )

    test('Attempt to call with maxGas value that exceeds the maximum limit', async () => {
      const call = contractTest.call(account, 'event', new Uint8Array(), {
        maxGas: MAX_GAS_CALL + 1n,
      })

      expect(call).rejects.toThrow(
        `The gas limit for the operation was higher than the maximum amount of ${MAX_GAS_CALL}`
      )
    })
  })
})
