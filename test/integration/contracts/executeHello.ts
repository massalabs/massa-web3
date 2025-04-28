import { bytesToString, stringToBytes } from '@massalabs/as-types'
import { generateEvent, getOpData, hasOpKey } from '@massalabs/massa-as-sdk'

const NAME_KEY = stringToBytes('name_key')

export function main(_: StaticArray<u8>): void {
  // Check if key exists in operation datastore
  assert(hasOpKey(NAME_KEY), 'NAME_KEY is not present in operation datastore')
  generateEvent(`Hello ${bytesToString(getOpData(NAME_KEY))}`)
}
