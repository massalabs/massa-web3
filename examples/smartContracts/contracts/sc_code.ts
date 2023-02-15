import {
    print,
    generateEvent,
    call,
    Context,
    Address,
    callerHasWriteAccess,
} from "@massalabs/massa-as-sdk";
import { Args, bytesToString, stringToBytes } from "@massalabs/as-types";

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
        `Constructor called on contract ${Context.callee().toString()}`
    );
    return [];
}

export function event(_: StaticArray<u8>): StaticArray<u8> {
    const message = "I'm an event!";
    generateEvent(message);
    return stringToBytes(message);
}

export function receive(data: StaticArray<u8>): void {
    print("Gas at start inner: " + Context.remainingGas().toString());
    generateEvent(Context.remainingGas().toString());
    print(bytesToString(data));
    print("Gas at end inner: " + Context.remainingGas().toString());
    generateEvent(Context.remainingGas().toString());
}

export function test(address: StaticArray<u8>): void {
    print("Gas at start: " + Context.remainingGas().toString());
    generateEvent(Context.remainingGas().toString());
    const args = new Args();
    args.add("massa");
    call(new Address(bytesToString(address)), "receive", args, 0);
    print("Gas at end: " + Context.remainingGas().toString());
    generateEvent(Context.remainingGas().toString());
}
