import { PasswordSeal } from '../../src/crypto/passwordSeal'
import { randomBytes } from '@noble/hashes/utils'

describe('Password Seal tests', () => {
  test('creates Sealer from env variable', async () => {
    process.env.PASSWORD = 'unsecurePassword'
    process.env.SALT = Buffer.from(randomBytes(16)).toString('base64')
    process.env.NONCE = Buffer.from(randomBytes(12)).toString('base64')

    const sealer = PasswordSeal.fromEnv()
    expect(sealer).toBeDefined()

    const originalData = Uint8Array.from([1, 2, 3, 4, 5])
    const encryptedData = await sealer.seal(originalData)
    const decryptedData = await sealer.unseal(encryptedData)

    expect(originalData).toEqual(Uint8Array.from(decryptedData))
  })
})
