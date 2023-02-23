import {
  print,
  generateEvent,
  call,
  Context,
  Address,
  callerHasWriteAccess,
  Storage,
} from '@massalabs/massa-as-sdk';
import { Args, bytesToString, stringToBytes } from '@massalabs/as-types';

const DATA_KEY = 'key';
const DATA_VALUE = 'value';

/**
 * This function is meant to be called only one time: when the contract is deployed.
 *
 * @param args - Arguments serialized with Args
 */
export function constructor(args: StaticArray<u8>): StaticArray<u8> {
  // This line is important. It ensure that this function can't be called in the future.
  // If you remove this check someone could call your constructor function and reset your SC.
  if (!callerHasWriteAccess()) {
    return [];
  }
  generateEvent(
    `Constructor called on contract ${Context.callee().toString()}`,
  );
  return [];
}

export function event(_: StaticArray<u8>): StaticArray<u8> {
  const message = "I'm an event!";
  generateEvent(message);
  return stringToBytes(message);
}

export function setValueToStorage(_args: StaticArray<u8>): void {
  const args = new Args(_args);
  const key = args.nextString().unwrap();
  const value = args.nextString().unwrap();
  Storage.set(stringToBytes(key), stringToBytes(value));
}
