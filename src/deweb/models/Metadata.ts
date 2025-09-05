import { Args, DeserializedResult, Serializable } from '../../basicElements'

export class Metadata implements Serializable<Metadata> {
  constructor(
    public key = '',
    public value = ''
  ) {}

  serialize(): Uint8Array {
    return new Args().addString(this.key).addString(this.value).serialize()
  }

  deserialize(data: Uint8Array, offset: number): DeserializedResult<Metadata> {
    const args = new Args(data, offset)

    this.key = args.nextString()
    this.value = args.nextString()

    return { instance: this, offset: args.getOffset() }
  }
}
