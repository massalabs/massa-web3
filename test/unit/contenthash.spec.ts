import {
  encodeContentHash,
  decodeContentHash,
  ContentHashCodec,
  MassaContentHash,
} from '../../src/contenthash'
import varint from 'varint'

describe('contenthash', () => {
  describe('encodeContentHash', () => {
    test('should encode a deweb MNS contenthash', () => {
      const result = encodeContentHash({
        network: 'mainnet',
        feature: 'deweb',
        target: { type: 'mns', value: 'example.massa' },
        path: '/index.html',
      })

      expect(result).toBeInstanceOf(Uint8Array)
      expect(result.length).toBeGreaterThan(0)

      // Verify the codec sequence by decoding varints
      let offset = 0

      const massa = varint.decode(result, offset)
      offset += varint.decode.bytes!
      expect(massa).toBe(ContentHashCodec.MASSA)

      const network = varint.decode(result, offset)
      offset += varint.decode.bytes!
      expect(network).toBe(ContentHashCodec.MASSA_MAINNET)

      const feature = varint.decode(result, offset)
      offset += varint.decode.bytes!
      expect(feature).toBe(ContentHashCodec.MASSA_DEWEB)

      const target = varint.decode(result, offset)
      offset += varint.decode.bytes!
      expect(target).toBe(ContentHashCodec.MASSA_MNS)
    })

    test('should encode a deweb SC contenthash', () => {
      const result = encodeContentHash({
        network: 'buildnet',
        feature: 'deweb',
        target: {
          type: 'sc',
          value: 'AS12qKAVjU1nr66JSkQ6N4Lqu4iwuVc6rAbRTrxFoynPrPdP1sj3G',
        },
        path: '/index.html',
      })

      let offset = 0
      varint.decode(result, offset)
      offset += varint.decode.bytes!

      const network = varint.decode(result, offset)
      offset += varint.decode.bytes!
      expect(network).toBe(ContentHashCodec.MASSA_BUILDNET)

      varint.decode(result, offset)
      offset += varint.decode.bytes!

      const target = varint.decode(result, offset)
      expect(target).toBe(ContentHashCodec.MASSA_SC)
    })

    test('should encode a gossip contenthash', () => {
      const gossipId = 'gossip1qpzry9x8gf2tvdw0s3jn54khce6mua7l'
      const result = encodeContentHash({
        network: 'mainnet',
        feature: 'gossip',
        target: { type: 'gossip-id', value: gossipId },
      })

      let offset = 0

      const massa = varint.decode(result, offset)
      offset += varint.decode.bytes!
      expect(massa).toBe(ContentHashCodec.MASSA)

      const network = varint.decode(result, offset)
      offset += varint.decode.bytes!
      expect(network).toBe(ContentHashCodec.MASSA_MAINNET)

      const feature = varint.decode(result, offset)
      offset += varint.decode.bytes!
      expect(feature).toBe(ContentHashCodec.MASSA_GOSSIP)

      const targetCodec = varint.decode(result, offset)
      offset += varint.decode.bytes!
      expect(targetCodec).toBe(ContentHashCodec.MASSA_GOSSIP_ID)
    })

    test('should throw on empty MNS name', () => {
      expect(() =>
        encodeContentHash({
          network: 'mainnet',
          feature: 'deweb',
          target: { type: 'mns', value: '' },
          path: '/index.html',
        })
      ).toThrow('MNS name must not be empty')
    })

    test('should throw on SC address not starting with AS', () => {
      expect(() =>
        encodeContentHash({
          network: 'mainnet',
          feature: 'deweb',
          target: { type: 'sc', value: 'AU1invalid' },
          path: '/index.html',
        })
      ).toThrow('Smart-contract address must start with "AS"')
    })

    test('should throw on path not starting with /', () => {
      expect(() =>
        encodeContentHash({
          network: 'mainnet',
          feature: 'deweb',
          target: { type: 'mns', value: 'example.massa' },
          path: 'no-slash',
        })
      ).toThrow('Path must start with "/"')
    })
  })

  describe('decodeContentHash', () => {
    test('should decode a deweb MNS contenthash', () => {
      const encoded = encodeContentHash({
        network: 'mainnet',
        feature: 'deweb',
        target: { type: 'mns', value: 'example.massa' },
        path: '/index.html',
      })

      const decoded = decodeContentHash(encoded)

      expect(decoded).toEqual({
        network: 'mainnet',
        feature: 'deweb',
        target: { type: 'mns', value: 'example.massa' },
        path: '/index.html',
      })
    })

    test('should decode a deweb SC contenthash', () => {
      const address = 'AS12qKAVjU1nr66JSkQ6N4Lqu4iwuVc6rAbRTrxFoynPrPdP1sj3G'
      const encoded = encodeContentHash({
        network: 'buildnet',
        feature: 'deweb',
        target: { type: 'sc', value: address },
        path: '/app/page.html',
      })

      const decoded = decodeContentHash(encoded)

      expect(decoded).toEqual({
        network: 'buildnet',
        feature: 'deweb',
        target: { type: 'sc', value: address },
        path: '/app/page.html',
      })
    })

    test('should decode a gossip contenthash', () => {
      const gossipId = 'gossip1qpzry9x8gf2tvdw0s3jn54khce6mua7l'
      const encoded = encodeContentHash({
        network: 'mainnet',
        feature: 'gossip',
        target: { type: 'gossip-id', value: gossipId },
      })

      const decoded = decodeContentHash(encoded)

      expect(decoded).toEqual({
        network: 'mainnet',
        feature: 'gossip',
        target: { type: 'gossip-id', value: gossipId },
      })
    })

    test('should throw on invalid ecosystem codec', () => {
      const data = new Uint8Array(varint.encode(0x000001))
      expect(() => decodeContentHash(data)).toThrow('expected massa codec')
    })

    test('should throw on unknown network codec', () => {
      const parts = [
        ...varint.encode(ContentHashCodec.MASSA),
        ...varint.encode(0x999999),
      ]
      expect(() => decodeContentHash(new Uint8Array(parts))).toThrow(
        'unknown network codec'
      )
    })

    test('should throw on unknown feature codec', () => {
      const parts = [
        ...varint.encode(ContentHashCodec.MASSA),
        ...varint.encode(ContentHashCodec.MASSA_MAINNET),
        ...varint.encode(0x999999),
      ]
      expect(() => decodeContentHash(new Uint8Array(parts))).toThrow(
        'unknown feature codec'
      )
    })

    test('should throw on unexpected target codec for deweb', () => {
      const targetValue = new TextEncoder().encode('test')
      const parts = [
        ...varint.encode(ContentHashCodec.MASSA),
        ...varint.encode(ContentHashCodec.MASSA_MAINNET),
        ...varint.encode(ContentHashCodec.MASSA_DEWEB),
        ...varint.encode(ContentHashCodec.MASSA_GOSSIP_ID),
        ...varint.encode(targetValue.length),
        ...targetValue,
      ]
      expect(() => decodeContentHash(new Uint8Array(parts))).toThrow(
        'unexpected target codec'
      )
    })

    test('should throw on truncated string data', () => {
      const parts = [
        ...varint.encode(ContentHashCodec.MASSA),
        ...varint.encode(ContentHashCodec.MASSA_MAINNET),
        ...varint.encode(ContentHashCodec.MASSA_DEWEB),
        ...varint.encode(ContentHashCodec.MASSA_MNS),
        ...varint.encode(100), // claims 100 bytes but none follow
      ]
      expect(() => decodeContentHash(new Uint8Array(parts))).toThrow(
        'expected 100 bytes'
      )
    })

    test('should throw when deweb MNS target is empty', () => {
      const emptyMns = new Uint8Array(0)
      const pathBytes = new TextEncoder().encode('/index.html')
      const parts = [
        ...varint.encode(ContentHashCodec.MASSA),
        ...varint.encode(ContentHashCodec.MASSA_MAINNET),
        ...varint.encode(ContentHashCodec.MASSA_DEWEB),
        ...varint.encode(ContentHashCodec.MASSA_MNS),
        ...varint.encode(emptyMns.length),
        ...emptyMns,
        ...varint.encode(ContentHashCodec.PATH),
        ...varint.encode(pathBytes.length),
        ...pathBytes,
      ]
      expect(() => decodeContentHash(new Uint8Array(parts))).toThrow(
        'MNS name must not be empty'
      )
    })

    test('should throw when deweb SC target does not start with AS', () => {
      const badSc = new TextEncoder().encode(
        'XX12qKAVjU1nr66JSkQ6N4Lqu4iwuVc6rAbRTrxFoynPrPdP1sj3G'
      )
      const pathBytes = new TextEncoder().encode('/app.html')
      const parts = [
        ...varint.encode(ContentHashCodec.MASSA),
        ...varint.encode(ContentHashCodec.MASSA_MAINNET),
        ...varint.encode(ContentHashCodec.MASSA_DEWEB),
        ...varint.encode(ContentHashCodec.MASSA_SC),
        ...varint.encode(badSc.length),
        ...badSc,
        ...varint.encode(ContentHashCodec.PATH),
        ...varint.encode(pathBytes.length),
        ...pathBytes,
      ]
      expect(() => decodeContentHash(new Uint8Array(parts))).toThrow(
        'Smart-contract address must start with "AS"'
      )
    })

    test('should throw when deweb path does not start with /', () => {
      const mnsValue = new TextEncoder().encode('example.massa')
      const badPath = new TextEncoder().encode('index.html')
      const parts = [
        ...varint.encode(ContentHashCodec.MASSA),
        ...varint.encode(ContentHashCodec.MASSA_MAINNET),
        ...varint.encode(ContentHashCodec.MASSA_DEWEB),
        ...varint.encode(ContentHashCodec.MASSA_MNS),
        ...varint.encode(mnsValue.length),
        ...mnsValue,
        ...varint.encode(ContentHashCodec.PATH),
        ...varint.encode(badPath.length),
        ...badPath,
      ]
      expect(() => decodeContentHash(new Uint8Array(parts))).toThrow(
        'Path must start with "/"'
      )
    })

    test('should throw when contenthash has trailing data', () => {
      const valid = encodeContentHash({
        network: 'mainnet',
        feature: 'deweb',
        target: { type: 'mns', value: 'example.massa' },
        path: '/index.html',
      })
      const withTrailing = new Uint8Array(valid.length + 3)
      withTrailing.set(valid)
      withTrailing.set([0x00, 0x01, 0x02], valid.length)
      expect(() => decodeContentHash(withTrailing)).toThrow(
        'unexpected trailing data'
      )
    })
  })

  describe('encode/decode roundtrip', () => {
    const cases: [string, MassaContentHash][] = [
      [
        'deweb + MNS + mainnet',
        {
          network: 'mainnet',
          feature: 'deweb',
          target: { type: 'mns', value: 'example.massa' },
          path: '/index.html',
        },
      ],
      [
        'deweb + SC + buildnet',
        {
          network: 'buildnet',
          feature: 'deweb',
          target: {
            type: 'sc',
            value: 'AS12qKAVjU1nr66JSkQ6N4Lqu4iwuVc6rAbRTrxFoynPrPdP1sj3G',
          },
          path: '/',
        },
      ],
      [
        'gossip + mainnet',
        {
          network: 'mainnet',
          feature: 'gossip',
          target: {
            type: 'gossip-id',
            value: 'gossip1qpzry9x8gf2tvdw0s3jn54khce6mua7l',
          },
        },
      ],
      [
        'gossip + buildnet',
        {
          network: 'buildnet',
          feature: 'gossip',
          target: { type: 'gossip-id', value: 'gossip1abc123' },
        },
      ],
      [
        'deweb + deep path',
        {
          network: 'mainnet',
          feature: 'deweb',
          target: { type: 'mns', value: 'my-site.massa' },
          path: '/assets/css/style.css',
        },
      ],
      [
        'deweb + unicode path',
        {
          network: 'mainnet',
          feature: 'deweb',
          target: { type: 'mns', value: 'example.massa' },
          path: '/page/résumé.html',
        },
      ],
    ]

    test.each(cases)('%s', (_name, input) => {
      const encoded = encodeContentHash(input)
      const decoded = decodeContentHash(encoded)
      expect(decoded).toEqual(input)
    })
  })
})
