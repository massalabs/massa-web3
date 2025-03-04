// @generated by protobuf-ts 2.9.4
// @generated from protobuf file "massa/model/v1/amount.proto" (package "massa.model.v1", syntax proto3)
// tslint:disable
//
// Copyright (c) 2023 MASSA LABS <info@massa.net>
//
import type { BinaryWriteOptions } from "@protobuf-ts/runtime";
import type { IBinaryWriter } from "@protobuf-ts/runtime";
import { WireType } from "@protobuf-ts/runtime";
import type { BinaryReadOptions } from "@protobuf-ts/runtime";
import type { IBinaryReader } from "@protobuf-ts/runtime";
import { UnknownFieldHandler } from "@protobuf-ts/runtime";
import type { PartialMessage } from "@protobuf-ts/runtime";
import { reflectionMergePartial } from "@protobuf-ts/runtime";
import { MessageType } from "@protobuf-ts/runtime";
/**
 * NativeAmount is represented as a fraction so precision can be adjusted in
 * the future. value = mantissa / (10^scale)
 *
 * @generated from protobuf message massa.model.v1.NativeAmount
 */
export interface NativeAmount {
    /**
     * Mantissa
     *
     * @generated from protobuf field: uint64 mantissa = 1;
     */
    mantissa: bigint;
    /**
     * Scale
     *
     * @generated from protobuf field: uint32 scale = 2;
     */
    scale: number;
}
// @generated message type with reflection information, may provide speed optimized methods
class NativeAmount$Type extends MessageType<NativeAmount> {
    constructor() {
        super("massa.model.v1.NativeAmount", [
            { no: 1, name: "mantissa", kind: "scalar", T: 4 /*ScalarType.UINT64*/, L: 0 /*LongType.BIGINT*/ },
            { no: 2, name: "scale", kind: "scalar", T: 13 /*ScalarType.UINT32*/ }
        ]);
    }
    create(value?: PartialMessage<NativeAmount>): NativeAmount {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.mantissa = 0n;
        message.scale = 0;
        if (value !== undefined)
            reflectionMergePartial<NativeAmount>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: NativeAmount): NativeAmount {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* uint64 mantissa */ 1:
                    message.mantissa = reader.uint64().toBigInt();
                    break;
                case /* uint32 scale */ 2:
                    message.scale = reader.uint32();
                    break;
                default:
                    let u = options.readUnknownField;
                    if (u === "throw")
                        throw new globalThis.Error(`Unknown field ${fieldNo} (wire type ${wireType}) for ${this.typeName}`);
                    let d = reader.skip(wireType);
                    if (u !== false)
                        (u === true ? UnknownFieldHandler.onRead : u)(this.typeName, message, fieldNo, wireType, d);
            }
        }
        return message;
    }
    internalBinaryWrite(message: NativeAmount, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* uint64 mantissa = 1; */
        if (message.mantissa !== 0n)
            writer.tag(1, WireType.Varint).uint64(message.mantissa);
        /* uint32 scale = 2; */
        if (message.scale !== 0)
            writer.tag(2, WireType.Varint).uint32(message.scale);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message massa.model.v1.NativeAmount
 */
export const NativeAmount = new NativeAmount$Type();
