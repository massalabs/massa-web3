import { Account } from '../../../src/experimental/account'
import { Address } from '../../../src/experimental/basicElements'
import { Version } from '../../../src/experimental/crypto/interfaces/versioner'
import { Address as LegacyAddress } from '../../../src/utils/keyAndAddresses'

const contractAddress = 'AS1eK3SEXGDAWN6pZhdr4Q7WJv6UHss55EB14hPy4XqBpiktfPu6'
const invalidVersion = -1 as Version

describe('Address tests', () => {
  let account: Account

  beforeAll(async () => {
    account = await Account.generate()
  })

  test('serialization and deserialization', async () => {
    const addStr = account.address.toString()
    const address = Address.fromString(addStr)
    const legacyAddress = new LegacyAddress(addStr)
    const bytes = address.toBytes()

    // serialization
    expect(bytes).toStrictEqual(Uint8Array.from(legacyAddress.toBytes()))

    // deserialization
    expect(Address.fromBytes(bytes)).toStrictEqual(address)
  })

  test('fromString throws error for invalid address string', () => {
    expect(() => Address.fromString('invalid_address_string')).toThrow(
      /invalid address string:/
    )
  })

  test('fromString throws error for invalid version', () => {
    expect(() =>
      Address.fromString(account.address.toString(), invalidVersion)
    ).toThrow(/unsupported version:/)
  })

  test('toString returns string with user prefix for EOA', () => {
    const address = Address.fromPublicKey(account.publicKey)
    expect(address.toString()).toMatch(/^AU/)
  })

  test('toString returns string with contract prefix for contract account', () => {
    const address = Address.fromString(contractAddress)
    expect(address.toString()).toMatch(/^AS/)
  })

  test('toBytes returns bytes with EOA prefix for EOA', () => {
    const address = Address.fromPublicKey(account.publicKey)
    const bytes = address.toBytes()

    // The first byte should be 0 for EOA
    expect(bytes[0]).toBe(0)
  })

  test('toBytes returns bytes with contract prefix for contract account', () => {
    const address = Address.fromString(contractAddress)
    const bytes = address.toBytes()
    // The first byte should be 1 for contract account
    expect(bytes[0]).toBe(1)
  })

  test('getByteLength returns correct length', () => {
    const address = Address.fromPublicKey(account.publicKey)
    const bytes = address.toBytes()
    const byteLength = Address.getByteLength(bytes)

    expect(byteLength).toBe(bytes.length)
  })
})
