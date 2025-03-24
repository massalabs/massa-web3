import { strToBytes } from '../../src/basicElements'
import { fromString } from '../../src/basicElements/mas'
import * as StorageCost from '../../src/basicElements/storage'

const STORAGE_BYTE_COST = fromString('0.0001')
const BASE_ACCOUNT_CREATION_COST = fromString('0.001')

describe('StorageCost', () => {
  describe('bytes', () => {
    it('should calculate the cost of a given number of bytes', () => {
      const numberOfBytes = 10
      const expectedCost = BigInt(numberOfBytes) * STORAGE_BYTE_COST
      expect(StorageCost.bytes(numberOfBytes)).toEqual(expectedCost)
    })
  })

  describe('account', () => {
    it('should calculate the cost of creating a new account', () => {
      expect(StorageCost.account()).toEqual(BASE_ACCOUNT_CREATION_COST)
    })
  })

  describe('smartContract', () => {
    it('should calculate the cost of deploying a smart contract', () => {
      const numberOfBytes = 10
      const expectedCost =
        StorageCost.bytes(numberOfBytes) + StorageCost.account()
      expect(StorageCost.smartContractDeploy(numberOfBytes)).toEqual(
        expectedCost
      )
    })
  })

  describe('newEntry', () => {
    it('should calculate the cost of creating a new entry in the datastore', () => {
      const expectedCost = 2000000n
      const key = 'the key'
      const value = 'the value'
      expect(StorageCost.datastoreEntry(key, value)).toEqual(expectedCost)
    })

    it('should calculate the cost of creating a new entry in the datastore', () => {
      const expectedCost = 2000000n
      const key = strToBytes('the key')
      const value = strToBytes('the value')
      expect(StorageCost.datastoreEntry(key, value)).toEqual(expectedCost)
    })
  })
})
