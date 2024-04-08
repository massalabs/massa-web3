export default interface Hash {
  hash(data: Buffer | Uint8Array | string): Uint8Array
}
