import { Args, DeserializedResult, Serializable } from '../../../basicElements'

export class CallParams implements Serializable<CallParams> {
  constructor(
    public contract = '',
    public targetFunc = '',
    public coins = 0n,
    public params: Uint8Array = new Uint8Array()
  ) {}

  serialize(): Uint8Array {
    return new Args()
      .addString(this.contract)
      .addString(this.targetFunc)
      .addU64(this.coins)
      .addUint8Array(this.params)
      .serialize()
  }

  deserialize(data: Uint8Array, offset = 0): DeserializedResult<CallParams> {
    const args = new Args(data, offset)

    this.contract = args.nextString()
    this.targetFunc = args.nextString()
    this.coins = args.nextU64()
    this.params = args.nextUint8Array()

    return { instance: this, offset: args.getOffset() }
  }
}

export class CallResult implements Serializable<CallResult> {
  constructor(public data: Uint8Array = new Uint8Array()) {}

  serialize(): Uint8Array {
    return new Args().addUint8Array(this.data).serialize()
  }

  deserialize(data: Uint8Array, offset = 0): DeserializedResult<CallResult> {
    const args = new Args(data, offset)
    this.data = args.nextUint8Array()
    return { instance: this, offset: args.getOffset() }
  }
}
