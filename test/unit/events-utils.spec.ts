import { Args } from '../../src/basicElements'
import { rawEventDecode } from '../../src/utils/events'

describe('Events utils', () => {
  describe('rawEventDecode', () => {
    test('decode', () => {
      const message = 'test'
      const rawData = new Args().addString('test').serialize()
      const dataBase64Encoded = Buffer.from(rawData).toString('base64')
      const rawEvent = rawEventDecode(dataBase64Encoded)
      const event = new Args(rawEvent).nextString()

      expect(event).toEqual(message)
    })
  })
})
