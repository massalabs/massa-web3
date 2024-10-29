import { Account } from '../../src/account'
import { Address } from '../../src/basicElements'

const contractAddress = 'AS1eK3SEXGDAWN6pZhdr4Q7WJv6UHss55EB14hPy4XqBpiktfPu6'

describe('Address tests', () => {
  let account: Account

  beforeAll(async () => {
    account = await Account.generate()
  })

  test('serialization and deserialization', async () => {
    const address = Address.fromString(
      'AU1tY57YPhHyCTDhJP4gdNqHeqzRd37TDB4VB8MUJFFaQPrq57do'
    )
    const bytes = address.toBytes()

    // serialization
    expect(bytes).toStrictEqual(
      new Uint8Array([
        0, 0, 117, 4, 163, 189, 244, 68, 52, 227, 126, 40, 61, 243, 206, 212,
        58, 106, 9, 96, 74, 130, 69, 47, 38, 49, 139, 36, 117, 249, 22, 212, 63,
        104,
      ])
    )

    // deserialization
    expect(Address.fromBytes(bytes)).toStrictEqual(address)
  })

  test('fromString throws error for invalid address string', () => {
    expect(() => Address.fromString('invalid_address_string')).toThrow(
      /invalid address string:/
    )
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

  test('extractFromBuffer returns extracted address bytes', () => {
    const address = Address.fromPublicKey(account.publicKey)
    const buffer = Uint8Array.from([...address.toBytes(), 1, 2, 3, 4])
    const { data, length } = Address.extractFromBuffer(buffer)

    expect(data).toStrictEqual(address.toBytes())
    expect(length).toStrictEqual(address.toBytes().length)
  })
})
