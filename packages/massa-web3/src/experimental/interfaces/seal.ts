export default interface Seal {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  seal(data: Uint8Array): Promise<any>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  unseal(data: any): Promise<Uint8Array>
}
