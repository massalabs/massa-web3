import { print, generateEvent, call, Context, Address, toBytes, fromBytes, Storage } from "@massalabs/massa-as-sdk";
import { Args } from "@massalabs/as-types";

export function event(_: StaticArray<u8>): StaticArray<u8> {
  const message = "I'm an event!";
  generateEvent(message);
  return toBytes(message);
}

export function receive(data: StaticArray<u8>): void {
    print("Gas at start inner: " + Context.remainingGas().toString());
    generateEvent(Context.remainingGas().toString());
    print(fromBytes(data));
    print("Gas at end inner: " + Context.remainingGas().toString());
    generateEvent(Context.remainingGas().toString());
}

export function test(address: StaticArray<u8>): void {
    print("Gas at start: " + Context.remainingGas().toString());
    generateEvent(Context.remainingGas().toString());
    const args = new Args();
    args.add("massa");
    call(Address.fromByteString(fromBytes(address)), "receive", args, 0);
    print("Gas at end: " + Context.remainingGas().toString());
    generateEvent(Context.remainingGas().toString());
}
