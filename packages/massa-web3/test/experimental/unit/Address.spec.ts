import { Account } from '../../../src/experimental/account'
import { Address } from '../../../src/experimental/basicElements'
import { Address as LegacyAddress } from '../../../src/utils/keyAndAddresses'

describe('Address tests', () => {
  let account: Account
  beforeAll(async () => {
    account = await Account.generate()
  })

  test('Serialization', async () => {
    const addStr = account.address.toString()
    const address = Address.fromString(addStr)
    const ref = new LegacyAddress(addStr)
    const bytes = address.toBytes()

    // serialization
    expect(bytes).toStrictEqual(Uint8Array.from(ref.toBytes()))

    // deserialization
    expect(Address.fromBytes(bytes)).toStrictEqual(Address.fromString(addStr))
  })
})
