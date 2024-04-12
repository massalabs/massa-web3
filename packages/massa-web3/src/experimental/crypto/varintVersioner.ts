import {
  varintDecode,
  varintEncode,
} from '@massalabs/massa-web3/utils/Xbqcrypto'
import Versioner from './interfaces/versioner'

export default class VarintVersioner implements Versioner {
  concat(data: Uint8Array, version: number): Uint8Array {
    const versionArray = varintEncode(version)
    return new Uint8Array([...versionArray, ...data])
  }

  split(data: Uint8Array): { data: Uint8Array; version: number } {
    const { value: version, bytes } = varintDecode(data)
    return { data: data.slice(bytes), version }
  }
}
