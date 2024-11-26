import { Account, Web3Provider, Signature } from '../../src'

describe('signMessage', () => {
  test('should correctly process Buffer data', async () => {
    const data = 'Test message'
    // secret key an signature comes from web3 legacy unit tests
    const expected =
      '1TXucC8nai7BYpAnMPYrotVcKCZ5oxkfWHb2ykKj2tXmaGMDL1XTU5AbC6Z13RH3q59F8QtbzKq4gzBphGPWpiDonownxE'
    const secretKey = 'S12XuWmm5jULpJGXBnkeBsuiNmsGi2F4rMiTvriCzENxBR4Ev7vd'

    const account = await Account.fromPrivateKey(secretKey)
    const provider = Web3Provider.buildnet(account)
    const signedMessage = await provider.sign(data)

    expect(signedMessage.signature).toEqual(expected)
    expect(signedMessage.publicKey).toEqual(account.publicKey.toString())

    const verified = await provider.account.verify(
      data,
      Signature.fromString(expected)
    )
    expect(verified).toBeTruthy()
  })

  test('should correctly process Buffer data', async () => {
    const data = new TextEncoder().encode('Test message')
    // secret key an signature comes from web3 legacy unit tests
    const expected =
      '1TXucC8nai7BYpAnMPYrotVcKCZ5oxkfWHb2ykKj2tXmaGMDL1XTU5AbC6Z13RH3q59F8QtbzKq4gzBphGPWpiDonownxE'
    const secretKey = 'S12XuWmm5jULpJGXBnkeBsuiNmsGi2F4rMiTvriCzENxBR4Ev7vd'

    const account = await Account.fromPrivateKey(secretKey)
    const provider = Web3Provider.buildnet(account)
    const signedMessage = await provider.sign(data)

    expect(signedMessage.signature).toEqual(expected)
    expect(signedMessage.publicKey).toEqual(account.publicKey.toString())

    const verified = await provider.account.verify(
      data,
      Signature.fromString(expected)
    )
    expect(verified).toBeTruthy()
  })
})
