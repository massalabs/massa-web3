import * as jspb from 'google-protobuf'



export class IndexedSlot extends jspb.Message {
  getSlot(): Slot | undefined;
  setSlot(value?: Slot): IndexedSlot;
  hasSlot(): boolean;
  clearSlot(): IndexedSlot;

  getIndex(): number;
  setIndex(value: number): IndexedSlot;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): IndexedSlot.AsObject;
  static toObject(includeInstance: boolean, msg: IndexedSlot): IndexedSlot.AsObject;
  static serializeBinaryToWriter(message: IndexedSlot, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): IndexedSlot;
  static deserializeBinaryFromReader(message: IndexedSlot, reader: jspb.BinaryReader): IndexedSlot;
}

export namespace IndexedSlot {
  export type AsObject = {
    slot?: Slot.AsObject,
    index: number,
  }
}

export class Slot extends jspb.Message {
  getPeriod(): number;
  setPeriod(value: number): Slot;

  getThread(): number;
  setThread(value: number): Slot;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Slot.AsObject;
  static toObject(includeInstance: boolean, msg: Slot): Slot.AsObject;
  static serializeBinaryToWriter(message: Slot, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Slot;
  static deserializeBinaryFromReader(message: Slot, reader: jspb.BinaryReader): Slot;
}

export namespace Slot {
  export type AsObject = {
    period: number,
    thread: number,
  }
}

export class Slots extends jspb.Message {
  getSlotsList(): Array<Slot>;
  setSlotsList(value: Array<Slot>): Slots;
  clearSlotsList(): Slots;
  addSlots(value?: Slot, index?: number): Slot;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Slots.AsObject;
  static toObject(includeInstance: boolean, msg: Slots): Slots.AsObject;
  static serializeBinaryToWriter(message: Slots, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Slots;
  static deserializeBinaryFromReader(message: Slots, reader: jspb.BinaryReader): Slots;
}

export namespace Slots {
  export type AsObject = {
    slotsList: Array<Slot.AsObject>,
  }
}

export class SlotRange extends jspb.Message {
  getStartSlot(): Slot | undefined;
  setStartSlot(value?: Slot): SlotRange;
  hasStartSlot(): boolean;
  clearStartSlot(): SlotRange;

  getEndSlot(): Slot | undefined;
  setEndSlot(value?: Slot): SlotRange;
  hasEndSlot(): boolean;
  clearEndSlot(): SlotRange;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SlotRange.AsObject;
  static toObject(includeInstance: boolean, msg: SlotRange): SlotRange.AsObject;
  static serializeBinaryToWriter(message: SlotRange, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SlotRange;
  static deserializeBinaryFromReader(message: SlotRange, reader: jspb.BinaryReader): SlotRange;
}

export namespace SlotRange {
  export type AsObject = {
    startSlot?: Slot.AsObject,
    endSlot?: Slot.AsObject,
  }
}

