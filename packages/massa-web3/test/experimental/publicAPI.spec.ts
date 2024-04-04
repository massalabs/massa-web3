import { PublicAPI, Transport } from '../../src/experimental/publicAPI'

const api = new PublicAPI(Transport.https, 'mainnet.massa.net', 443, '/api/v2')

describe('unit tests', () => {
  test('getStatus', async () => {
    const status = await api.getStatus()
    expect(status).toHaveProperty('config.roll_price', '100')
  })
})
