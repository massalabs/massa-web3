import { StorageCost } from '../../../src/experimental/basicElements/storage'
import { fromMAS } from '@massalabs/web3-utils'

describe('StorageCost', () => {
  describe('bytes', () => {
    it('should calculate the cost of a given number of bytes', () => {
      const numberOfBytes = 10
      const expectedCost = BigInt(numberOfBytes) * fromMAS(0.0001)
      expect(StorageCost.bytes(numberOfBytes)).toEqual(expectedCost)
    })
  })

  describe('account', () => {
    it('should calculate the cost of creating a new account', () => {
      const expectedCost = fromMAS(0.001)
      expect(StorageCost.account()).toEqual(expectedCost)
    })
  })

  describe('smartContract', () => {
    it('should calculate the cost of deploying a smart contract', () => {
      const numberOfBytes = 10
      const expectedCost =
        StorageCost.bytes(numberOfBytes) + StorageCost.account()
      expect(StorageCost.smartContract(numberOfBytes)).toEqual(expectedCost)
    })
  })

  describe('newEntry', () => {
    it('should calculate the cost of creating a new entry in the datastore', () => {
      const expectedCost = StorageCost.bytes(4)
      expect(StorageCost.newEntry()).toEqual(expectedCost)
    })
  })
})
