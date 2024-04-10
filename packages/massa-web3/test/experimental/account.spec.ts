import { readFileSync } from 'fs'
import { load } from 'js-yaml'
import {
  Account,
  Version,
  AccountV1KeyStore,
} from '../../src/experimental/account'
import path from 'path'

describe('Basic use cases', () => {
  test('Account - from private key', async () => {
    const account = await Account.fromPrivateKey(
      'S12XuWmm5jULpJGXBnkeBsuiNmsGi2F4rMiTvriCzENxBR4Ev7vd'
    )
    expect(account.address.toString()).toBe(
      'AU1wqSosfBq5GME1hpQELNQFHb481h7U7BKdduVuRwgFdMasCuub'
    )
    expect(account.publicKey.toString()).toBe(
      'P129tbNd4oVMRsnFvQcgSq4PUAZYYDA1pvqtef2ER6W7JqgY1Bfg'
    )
    expect(account.version).toBe(Version.V1)

    const ks = (await account.toKeyStore(
      'unsecurePassword'
    )) as AccountV1KeyStore
    expect(ks.Version).toBe(Version.V1)
    expect(ks.Address).toBe(
      'AU1wqSosfBq5GME1hpQELNQFHb481h7U7BKdduVuRwgFdMasCuub'
    )
    expect(ks.PublicKey).toStrictEqual([
      0, 151, 225, 127, 208, 55, 113, 33, 1, 194, 50, 252, 10, 97, 166, 24, 214,
      33, 184, 61, 68, 239, 206, 25, 98, 198, 123, 255, 227, 154, 242, 17, 169,
    ])
    expect(ks.CipheredData).toHaveLength(48)
    expect(ks.Nonce).toHaveLength(12)
    expect(ks.Salt).toHaveLength(16)

    const account2 = await Account.fromKeyStore(ks, 'unsecurePassword')
    const ks2 = await account2.toKeyStore('unsecurePassword', ks.Salt, ks.Nonce)
    expect(ks).toStrictEqual(ks2)
  })

  test('Account - from file', async () => {
    // private key is S12jWf59Yzf2LimL89soMnAP2VEBDBpfCbZLoEFo36CxEL3j92rZ
    const walletPath = path.join(__dirname, 'wallet_test_version_1.yaml')
    const ks = load(readFileSync(walletPath, 'utf8'))
    expect(ks.Version).toBe(Version.V1)
    expect(ks.Address).toBe(
      'AU126tkwrhXn9gEG5JPtrNy8NNLbVMwywokgLKshSYyzP8qusqXZL'
    )

    const account = await Account.fromKeyStore(ks, 'unsecurePassword')
    expect(account.address.toString()).toBe(
      'AU126tkwrhXn9gEG5JPtrNy8NNLbVMwywokgLKshSYyzP8qusqXZL'
    )
    expect(account.publicKey.toString()).toBe(
      'P129tbNd4oVMRsnFvQcgSq4PUAZYYDA1pvqtef2ER6W7JqgY1Bfg'
    )
    expect(account.version).toBe(Version.V0)
    expect(account.version).toBe(0)
  })
})
