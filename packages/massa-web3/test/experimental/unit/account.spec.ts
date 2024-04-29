import { readFileSync } from 'fs'
import { load } from 'js-yaml'
import { Account, AccountKeyStore } from '../../../src/experimental/account'
import { Version } from '../../../src/experimental/crypto/interfaces/versioner'
import path from 'path'

describe('Basic use cases', () => {
  test('Account - from private key', async () => {
    const account = await Account.fromPrivateKey(
      'S12jWf59Yzf2LimL89soMnAP2VEBDBpfCbZLoEFo36CxEL3j92rZ'
    )
    expect(account.address.toString()).toBe(
      'AU126tkwrhXn9gEG5JPtrNy8NNLbVMwywokgLKshSYyzP8qusqXZL'
    )
    expect(account.publicKey.toString()).toBe(
      'P126AtzfcSJwdi6xsAmXbzXhhwVhS9d1hRjFNT4PfrDogt3nAihj'
    )
    expect(account.version).toBe(Version.V1)
    expect(account.address.version).toBe(Version.V0)
    expect(account.address.isEOA).toBe(true)

    const ks = await account.toKeyStore(
      'unsecurePassword',
      new Uint8Array([
        146, 63, 151, 136, 93, 135, 105, 113, 124, 41, 189, 207, 86, 124, 17,
        152,
      ]),
      new Uint8Array([250, 104, 81, 250, 235, 79, 110, 84, 243, 225, 144, 242])
    )
    expect(ks.Version).toBe(Version.V1)
    expect(ks.Address).toBe(
      'AU126tkwrhXn9gEG5JPtrNy8NNLbVMwywokgLKshSYyzP8qusqXZL'
    )
    expect(ks.Nonce).toStrictEqual(
      new Uint8Array([250, 104, 81, 250, 235, 79, 110, 84, 243, 225, 144, 242])
    )
    expect(ks.Salt).toStrictEqual(
      new Uint8Array([
        146, 63, 151, 136, 93, 135, 105, 113, 124, 41, 189, 207, 86, 124, 17,
        152,
      ])
    )
    expect(ks.PublicKey).toStrictEqual([
      0, 143, 111, 199, 160, 227, 187, 57, 238, 223, 80, 251, 169, 64, 21, 116,
      165, 95, 187, 192, 76, 97, 33, 64, 208, 119, 99, 182, 139, 174, 219, 61,
      109,
    ])
    expect(ks.CipheredData).toStrictEqual([
      191, 181, 5, 198, 76, 145, 242, 89, 253, 215, 151, 10, 245, 32, 241, 9,
      171, 181, 76, 103, 121, 184, 33, 16, 227, 83, 53, 133, 194, 38, 20, 217,
      34, 61, 169, 108, 156, 217, 196, 74, 34, 127, 129, 33, 103, 215, 117, 66,
      78,
    ])
    const account2 = await Account.fromKeyStore(ks, 'unsecurePassword')
    const ks2 = await account2.toKeyStore('unsecurePassword', ks.Salt, ks.Nonce)
    expect(ks).toStrictEqual(ks2)
  })

  test('Account - from keystore', async () => {
    const walletPath = path.join(__dirname, 'wallet_test_version_1.yaml')
    const ks = load(readFileSync(walletPath, 'utf8')) as AccountKeyStore

    expect(ks.Version).toBe(Version.V1)
    expect(ks.Address).toBe(
      'AU126tkwrhXn9gEG5JPtrNy8NNLbVMwywokgLKshSYyzP8qusqXZL'
    )

    const account = await Account.fromKeyStore(ks, 'unsecurePassword')
    expect(account.address.toString()).toBe(
      'AU126tkwrhXn9gEG5JPtrNy8NNLbVMwywokgLKshSYyzP8qusqXZL'
    )
    expect(account.publicKey.toString()).toBe(
      'P126AtzfcSJwdi6xsAmXbzXhhwVhS9d1hRjFNT4PfrDogt3nAihj'
    )
    expect(account.version).toBe(Version.V1)
    expect(account.address.version).toBe(Version.V0)
    expect(account.address.isEOA).toBe(true)
  })

  test('Account - to and from keystore (V0)', async () => {
    const accountv0 = await Account.fromPrivateKey(
      'S12jWf59Yzf2LimL89soMnAP2VEBDBpfCbZLoEFo36CxEL3j92rZ',
      Version.V0
    )

    const ks = await accountv0.toKeyStore(
      'unsecurePassword',
      new Uint8Array([
        146, 63, 151, 136, 93, 135, 105, 113, 124, 41, 189, 207, 86, 124, 17,
        152,
      ]),
      new Uint8Array([250, 104, 81, 250, 235, 79, 110, 84, 243, 225, 144, 242])
    )
    expect(ks.Version).toBe(Version.V0)
    expect(ks.Address).toBe(
      'AU126tkwrhXn9gEG5JPtrNy8NNLbVMwywokgLKshSYyzP8qusqXZL'
    )
    expect(ks.Nonce).toStrictEqual(
      new Uint8Array([250, 104, 81, 250, 235, 79, 110, 84, 243, 225, 144, 242])
    )
    expect(ks.Salt).toStrictEqual(
      new Uint8Array([
        146, 63, 151, 136, 93, 135, 105, 113, 124, 41, 189, 207, 86, 124, 17,
        152,
      ])
    )
    expect(ks.PublicKey).toStrictEqual([
      0, 143, 111, 199, 160, 227, 187, 57, 238, 223, 80, 251, 169, 64, 21, 116,
      165, 95, 187, 192, 76, 97, 33, 64, 208, 119, 99, 182, 139, 174, 219, 61,
      109,
    ])
    expect(ks.CipheredData).toStrictEqual([
      191, 181, 5, 198, 76, 145, 242, 89, 253, 215, 151, 10, 245, 32, 241, 9,
      171, 181, 76, 103, 121, 184, 33, 16, 227, 83, 53, 133, 194, 38, 20, 217,
      34, 61, 169, 108, 156, 217, 196, 74, 34, 127, 129, 33, 103, 215, 117, 66,
      78,
    ])

    const account = await Account.fromKeyStore(ks, 'unsecurePassword')

    expect(account).toBeDefined()
    expect(account.privateKey).toBeDefined()
    expect(account.publicKey).toBeDefined()
    expect(account.address).toBeDefined()
    expect(account.version).toBe(Version.V0)
    expect(account.address.version).toBe(Version.V0)
    expect(account.address.isEOA).toBe(true)
  })

  test('Account - from yaml file', async () => {
    const walletPath = path.join(__dirname, 'wallet_test_version_1.yaml')

    const account = await Account.fromYaml(walletPath, 'unsecurePassword')
    expect(account.address.toString()).toBe(
      'AU126tkwrhXn9gEG5JPtrNy8NNLbVMwywokgLKshSYyzP8qusqXZL'
    )
    expect(account.publicKey.toString()).toBe(
      'P126AtzfcSJwdi6xsAmXbzXhhwVhS9d1hRjFNT4PfrDogt3nAihj'
    )
    expect(account.version).toBe(Version.V1)
    expect(account.address.version).toBe(Version.V0)
    expect(account.address.isEOA).toBe(true)
  })

  test('Account - from environment variables', async () => {
    process.env.PRIVATE_KEY =
      'S12jWf59Yzf2LimL89soMnAP2VEBDBpfCbZLoEFo36CxEL3j92rZ'

    const account = await Account.fromEnv()

    expect(account).toBeDefined()
    expect(account.address.toString()).toBe(
      'AU126tkwrhXn9gEG5JPtrNy8NNLbVMwywokgLKshSYyzP8qusqXZL'
    )
    expect(account.publicKey.toString()).toBe(
      'P126AtzfcSJwdi6xsAmXbzXhhwVhS9d1hRjFNT4PfrDogt3nAihj'
    )
    expect(account.version).toBe(Version.V1)
    expect(account.address.isEOA).toBe(true)
  })

  test('Account - sign message and verify signature', async () => {
    const account = await Account.fromPrivateKey(
      'S12jWf59Yzf2LimL89soMnAP2VEBDBpfCbZLoEFo36CxEL3j92rZ'
    )
    const messsage = new Uint8Array([1, 2, 3])
    const signature = await account.sign(messsage)
    expect(account.verify(messsage, signature)).toBeTruthy()
  })
})
