export default interface Versioner {
  concat(data: Uint8Array, version: number): Uint8Array
  split(data: Uint8Array): { data: Uint8Array; version: number }
}
