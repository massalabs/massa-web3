export default interface Serialization {
  encodeToString(data: Uint8Array): string
  decodeFromString(data: string): Uint8Array
}
