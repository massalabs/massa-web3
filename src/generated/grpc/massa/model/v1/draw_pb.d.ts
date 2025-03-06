import * as jspb from 'google-protobuf'

import * as google_protobuf_wrappers_pb from 'google-protobuf/google/protobuf/wrappers_pb'; // proto import: "google/protobuf/wrappers.proto"
import * as massa_model_v1_slot_pb from '../../../massa/model/v1/slot_pb'; // proto import: "massa/model/v1/slot.proto"


export class SlotDraw extends jspb.Message {
  getSlot(): massa_model_v1_slot_pb.Slot | undefined;
  setSlot(value?: massa_model_v1_slot_pb.Slot): SlotDraw;
  hasSlot(): boolean;
  clearSlot(): SlotDraw;

  getBlockProducer(): google_protobuf_wrappers_pb.StringValue | undefined;
  setBlockProducer(value?: google_protobuf_wrappers_pb.StringValue): SlotDraw;
  hasBlockProducer(): boolean;
  clearBlockProducer(): SlotDraw;

  getEndorsementDrawsList(): Array<EndorsementDraw>;
  setEndorsementDrawsList(value: Array<EndorsementDraw>): SlotDraw;
  clearEndorsementDrawsList(): SlotDraw;
  addEndorsementDraws(value?: EndorsementDraw, index?: number): EndorsementDraw;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): SlotDraw.AsObject;
  static toObject(includeInstance: boolean, msg: SlotDraw): SlotDraw.AsObject;
  static serializeBinaryToWriter(message: SlotDraw, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): SlotDraw;
  static deserializeBinaryFromReader(message: SlotDraw, reader: jspb.BinaryReader): SlotDraw;
}

export namespace SlotDraw {
  export type AsObject = {
    slot?: massa_model_v1_slot_pb.Slot.AsObject,
    blockProducer?: google_protobuf_wrappers_pb.StringValue.AsObject,
    endorsementDrawsList: Array<EndorsementDraw.AsObject>,
  }
}

export class EndorsementDraw extends jspb.Message {
  getIndex(): number;
  setIndex(value: number): EndorsementDraw;

  getProducer(): string;
  setProducer(value: string): EndorsementDraw;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): EndorsementDraw.AsObject;
  static toObject(includeInstance: boolean, msg: EndorsementDraw): EndorsementDraw.AsObject;
  static serializeBinaryToWriter(message: EndorsementDraw, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): EndorsementDraw;
  static deserializeBinaryFromReader(message: EndorsementDraw, reader: jspb.BinaryReader): EndorsementDraw;
}

export namespace EndorsementDraw {
  export type AsObject = {
    index: number,
    producer: string,
  }
}

