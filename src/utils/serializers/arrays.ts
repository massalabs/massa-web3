import { IDeserializedResult, ISerializable } from "../../interfaces/ISerializable";

export function serializableObjectsArrayToBytes<T extends ISerializable<T>>(
  source: T[],
): Uint8Array {
  const nbElements = source.length;
  const pointers = new Array<Uint8Array>(nbElements);
  const sizes = new Array<number>(nbElements);
  let totalLength = 0;
  
  for (let i = 0; i < nbElements; i++) {
    const bytes: Uint8Array = source[i].serialize();
    pointers[i] = bytes;
    sizes[i] = bytes.length;
    totalLength += bytes.length;
  }
  
  // allocates a new Array in the memory
  const target = new Uint8Array(totalLength);
  
  let offset = 0;
  for (let i = 0; i < nbElements; i++) {
    // copies the content of the source buffer to the newly allocated array.
    target.set(pointers[i], offset);
    offset += sizes[i];
  }
  
  return target;
}
  
export function deserializeObj<T extends ISerializable<T>>(data: Uint8Array, offset: number, Clazz: new() => T): IDeserializedResult<T> {
  const deserialized = new Clazz().deserialize(data, offset);
  return deserialized;
}