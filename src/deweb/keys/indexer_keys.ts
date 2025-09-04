import { I32, strToBytes } from '../../basicElements'

/**
 * Returns the base key for the owner's address.
 * @param address - The website address
 * @returns The base key for the owner's address
 */
export function addressToOwnerBaseKey(address: string): Uint8Array {
  const prefix = strToBytes('\x01')
  const lengthBytes = I32.toBytes(BigInt(address.length))
  const addressBytes = strToBytes(address)

  return new Uint8Array([...prefix, ...lengthBytes, ...addressBytes])
}

export function addressToOwnerKey(address: string, owner: string): Uint8Array {
  return new Uint8Array([
    ...addressToOwnerBaseKey(address),
    ...strToBytes(owner),
  ])
}

/**
 * Returns the base key for the owner's list of websites.
 * @param owner - The owner's address
 * @returns The base key for the owner's list of websites
 */
export function indexByOwnerBaseKey(owner: string): Uint8Array {
  const prefix = strToBytes('\x00')
  const lengthBytes = I32.toBytes(BigInt(owner.length))
  const ownerBytes = strToBytes(owner)

  return new Uint8Array([...prefix, ...lengthBytes, ...ownerBytes])
}

export function indexByOwnerKey(owner: string, address: string): Uint8Array {
  return new Uint8Array([...indexByOwnerBaseKey(owner), ...strToBytes(address)])
}
