// The entry file of your WebAssembly module.
import { Context, Storage, generateEvent } from '@massalabs/massa-as-sdk'
import { Args, stringToBytes } from '@massalabs/as-types'

/**
 * This function is meant to be called only one time: when the contract is deployed.
 *
 * @param binaryArgs - Arguments serialized with Args
 */
export function constructor(binaryArgs: StaticArray<u8>): StaticArray<u8> {
  // This line is important. It ensures that this function can't be called in the future.
  // If you remove this check, someone could call your constructor function and reset your smart contract.
  if (!Context.isDeployingContract()) {
    return []
  }

  const argsDeser = new Args(binaryArgs)
  const name = argsDeser
    .nextString()
    .expect('Name argument is missing or invalid')
  generateEvent(`Constructor called with name ${name}`)
  return []
}

/**
 * @param _ - not used
 * @returns the emitted event serialized in bytes
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function event(_: StaticArray<u8>): StaticArray<u8> {
  const message = "I'm an event!"
  generateEvent(message)
  return stringToBytes(message)
}

export function setValueToKey(_args: StaticArray<u8>): void {
  const args = new Args(_args)
  const key = args.nextString().expect('Key argument is missing or invalid')
  const value = args.nextString().expect('Value argument is missing or invalid')

  // event the value
  Storage.set(key, value)

  generateEvent(`Set value ${value.toString()} to key ${key.toString()}`)
}

export function getValueFromKey(_args: StaticArray<u8>): StaticArray<u8> {
  const args = new Args(_args)
  const key = args.nextString().expect('Key argument is missing or invalid')
  const value = Storage.get<string>(key)
  return stringToBytes(value)
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function sendCoins(_: StaticArray<u8>): void {
  const coinAmount = Context.transferredCoins()
  generateEvent(`Received ${coinAmount.toString()} coins`)
}
