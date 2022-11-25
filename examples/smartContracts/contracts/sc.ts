import { print, generateEvent, call, Context, Address, Args } from "@massalabs/massa-as-sdk"

export function receive(data: string): void {
    print("Gas at start inner: " + Context.remainingGas().toString());
    generateEvent(Context.remainingGas().toString());
    print(data);
    print("Gas at end inner: " + Context.remainingGas().toString());
    generateEvent(Context.remainingGas().toString());
}

export function test(address: string): void {
    print("Gas at start: " + Context.remainingGas().toString());
    generateEvent(Context.remainingGas().toString());
    let args = new Args();
    args.add("massa");
    call(Address.fromByteString(address), "receive", args, 0);
    print("Gas at end: " + Context.remainingGas().toString());
    generateEvent(Context.remainingGas().toString());
}