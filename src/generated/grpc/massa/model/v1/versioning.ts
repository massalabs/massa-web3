// @generated by protobuf-ts 2.9.4
// @generated from protobuf file "massa/model/v1/versioning.proto" (package "massa.model.v1", syntax proto3)
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
import { NativeTime } from "./time";
/**
 * Entry for GetMipStatusResponse
 *
 * @generated from protobuf message massa.model.v1.MipStatusEntry
 */
export interface MipStatusEntry {
    /**
     * Mip info
     *
     * @generated from protobuf field: massa.model.v1.MipInfo mip_info = 1;
     */
    mipInfo?: MipInfo;
    /**
     * State id
     *
     * @generated from protobuf field: massa.model.v1.ComponentStateId state_id = 2;
     */
    stateId: ComponentStateId;
}
/**
 * MIP info (name & versions & time range for a MIP)
 *
 * @generated from protobuf message massa.model.v1.MipInfo
 */
export interface MipInfo {
    /**
     * MIP name or descriptive name
     *
     * @generated from protobuf field: string name = 1;
     */
    name: string;
    /**
     * Network (or global) version (to be included in block header)
     *
     * @generated from protobuf field: uint32 version = 2;
     */
    version: number;
    /**
     * A timestamp at which the version gains its meaning (e.g. announced in block header)
     *
     * @generated from protobuf field: massa.model.v1.NativeTime start = 3;
     */
    start?: NativeTime;
    /**
     * A timestamp at the which the deployment is considered failed
     *
     * @generated from protobuf field: massa.model.v1.NativeTime timeout = 4;
     */
    timeout?: NativeTime;
    /**
     * Once deployment has been locked, wait for this duration before deployment is considered active
     *
     * @generated from protobuf field: massa.model.v1.NativeTime activation_delay = 5;
     */
    activationDelay?: NativeTime;
    /**
     * Components concerned by this versioning (e.g. a new Block version), and the associated component_version
     *
     * @generated from protobuf field: repeated massa.model.v1.MipComponentEntry components = 6;
     */
    components: MipComponentEntry[];
}
/**
 * MipComponentEntry
 *
 * @generated from protobuf message massa.model.v1.MipComponentEntry
 */
export interface MipComponentEntry {
    /**
     * Kind
     *
     * @generated from protobuf field: massa.model.v1.MipComponent kind = 1;
     */
    kind: MipComponent;
    /**
     * Version
     *
     * @generated from protobuf field: uint32 version = 2;
     */
    version: number;
}
/**
 * State machine for a Versioning component that tracks the deployment state
 *
 * @generated from protobuf enum massa.model.v1.ComponentStateId
 */
export enum ComponentStateId {
    /**
     * Default enum value
     *
     * @generated from protobuf enum value: COMPONENT_STATE_ID_UNSPECIFIED = 0;
     */
    UNSPECIFIED = 0,
    /**
     * Error state
     *
     * @generated from protobuf enum value: COMPONENT_STATE_ID_ERROR = 1;
     */
    ERROR = 1,
    /**
     * Initial state
     *
     * @generated from protobuf enum value: COMPONENT_STATE_ID_DEFINED = 2;
     */
    DEFINED = 2,
    /**
     * Past start, can only go to LockedIn after the threshold is above a given value
     *
     * @generated from protobuf enum value: COMPONENT_STATE_ID_STARTED = 3;
     */
    STARTED = 3,
    /**
     * Locked but wait for some time before going to active (to let users the time to upgrade)
     *
     * @generated from protobuf enum value: COMPONENT_STATE_ID_LOCKEDIN = 4;
     */
    LOCKEDIN = 4,
    /**
     * After LockedIn, deployment is considered successful (after activation delay)
     *
     * @generated from protobuf enum value: COMPONENT_STATE_ID_ACTIVE = 5;
     */
    ACTIVE = 5,
    /**
     * Past the timeout, if LockedIn is not reach
     *
     * @generated from protobuf enum value: COMPONENT_STATE_ID_FAILED = 6;
     */
    FAILED = 6
}
/**
 * Versioning component enum
 *
 * @generated from protobuf enum massa.model.v1.MipComponent
 */
export enum MipComponent {
    /**
     * Default enum value
     *
     * @generated from protobuf enum value: MIP_COMPONENT_UNSPECIFIED = 0;
     */
    UNSPECIFIED = 0,
    /**
     * Address component
     *
     * @generated from protobuf enum value: MIP_COMPONENT_ADDRESS = 1;
     */
    ADDRESS = 1,
    /**
     * Keypair component
     *
     * @generated from protobuf enum value: MIP_COMPONENT_KEYPAIR = 2;
     */
    KEYPAIR = 2
}
// @generated message type with reflection information, may provide speed optimized methods
class MipStatusEntry$Type extends MessageType<MipStatusEntry> {
    constructor() {
        super("massa.model.v1.MipStatusEntry", [
            { no: 1, name: "mip_info", kind: "message", T: () => MipInfo },
            { no: 2, name: "state_id", kind: "enum", T: () => ["massa.model.v1.ComponentStateId", ComponentStateId, "COMPONENT_STATE_ID_"] }
        ]);
    }
    create(value?: PartialMessage<MipStatusEntry>): MipStatusEntry {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.stateId = 0;
        if (value !== undefined)
            reflectionMergePartial<MipStatusEntry>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: MipStatusEntry): MipStatusEntry {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* massa.model.v1.MipInfo mip_info */ 1:
                    message.mipInfo = MipInfo.internalBinaryRead(reader, reader.uint32(), options, message.mipInfo);
                    break;
                case /* massa.model.v1.ComponentStateId state_id */ 2:
                    message.stateId = reader.int32();
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
    internalBinaryWrite(message: MipStatusEntry, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* massa.model.v1.MipInfo mip_info = 1; */
        if (message.mipInfo)
            MipInfo.internalBinaryWrite(message.mipInfo, writer.tag(1, WireType.LengthDelimited).fork(), options).join();
        /* massa.model.v1.ComponentStateId state_id = 2; */
        if (message.stateId !== 0)
            writer.tag(2, WireType.Varint).int32(message.stateId);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message massa.model.v1.MipStatusEntry
 */
export const MipStatusEntry = new MipStatusEntry$Type();
// @generated message type with reflection information, may provide speed optimized methods
class MipInfo$Type extends MessageType<MipInfo> {
    constructor() {
        super("massa.model.v1.MipInfo", [
            { no: 1, name: "name", kind: "scalar", T: 9 /*ScalarType.STRING*/ },
            { no: 2, name: "version", kind: "scalar", T: 13 /*ScalarType.UINT32*/ },
            { no: 3, name: "start", kind: "message", T: () => NativeTime },
            { no: 4, name: "timeout", kind: "message", T: () => NativeTime },
            { no: 5, name: "activation_delay", kind: "message", T: () => NativeTime },
            { no: 6, name: "components", kind: "message", repeat: 1 /*RepeatType.PACKED*/, T: () => MipComponentEntry }
        ]);
    }
    create(value?: PartialMessage<MipInfo>): MipInfo {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.name = "";
        message.version = 0;
        message.components = [];
        if (value !== undefined)
            reflectionMergePartial<MipInfo>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: MipInfo): MipInfo {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* string name */ 1:
                    message.name = reader.string();
                    break;
                case /* uint32 version */ 2:
                    message.version = reader.uint32();
                    break;
                case /* massa.model.v1.NativeTime start */ 3:
                    message.start = NativeTime.internalBinaryRead(reader, reader.uint32(), options, message.start);
                    break;
                case /* massa.model.v1.NativeTime timeout */ 4:
                    message.timeout = NativeTime.internalBinaryRead(reader, reader.uint32(), options, message.timeout);
                    break;
                case /* massa.model.v1.NativeTime activation_delay */ 5:
                    message.activationDelay = NativeTime.internalBinaryRead(reader, reader.uint32(), options, message.activationDelay);
                    break;
                case /* repeated massa.model.v1.MipComponentEntry components */ 6:
                    message.components.push(MipComponentEntry.internalBinaryRead(reader, reader.uint32(), options));
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
    internalBinaryWrite(message: MipInfo, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* string name = 1; */
        if (message.name !== "")
            writer.tag(1, WireType.LengthDelimited).string(message.name);
        /* uint32 version = 2; */
        if (message.version !== 0)
            writer.tag(2, WireType.Varint).uint32(message.version);
        /* massa.model.v1.NativeTime start = 3; */
        if (message.start)
            NativeTime.internalBinaryWrite(message.start, writer.tag(3, WireType.LengthDelimited).fork(), options).join();
        /* massa.model.v1.NativeTime timeout = 4; */
        if (message.timeout)
            NativeTime.internalBinaryWrite(message.timeout, writer.tag(4, WireType.LengthDelimited).fork(), options).join();
        /* massa.model.v1.NativeTime activation_delay = 5; */
        if (message.activationDelay)
            NativeTime.internalBinaryWrite(message.activationDelay, writer.tag(5, WireType.LengthDelimited).fork(), options).join();
        /* repeated massa.model.v1.MipComponentEntry components = 6; */
        for (let i = 0; i < message.components.length; i++)
            MipComponentEntry.internalBinaryWrite(message.components[i], writer.tag(6, WireType.LengthDelimited).fork(), options).join();
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message massa.model.v1.MipInfo
 */
export const MipInfo = new MipInfo$Type();
// @generated message type with reflection information, may provide speed optimized methods
class MipComponentEntry$Type extends MessageType<MipComponentEntry> {
    constructor() {
        super("massa.model.v1.MipComponentEntry", [
            { no: 1, name: "kind", kind: "enum", T: () => ["massa.model.v1.MipComponent", MipComponent, "MIP_COMPONENT_"] },
            { no: 2, name: "version", kind: "scalar", T: 13 /*ScalarType.UINT32*/ }
        ]);
    }
    create(value?: PartialMessage<MipComponentEntry>): MipComponentEntry {
        const message = globalThis.Object.create((this.messagePrototype!));
        message.kind = 0;
        message.version = 0;
        if (value !== undefined)
            reflectionMergePartial<MipComponentEntry>(this, message, value);
        return message;
    }
    internalBinaryRead(reader: IBinaryReader, length: number, options: BinaryReadOptions, target?: MipComponentEntry): MipComponentEntry {
        let message = target ?? this.create(), end = reader.pos + length;
        while (reader.pos < end) {
            let [fieldNo, wireType] = reader.tag();
            switch (fieldNo) {
                case /* massa.model.v1.MipComponent kind */ 1:
                    message.kind = reader.int32();
                    break;
                case /* uint32 version */ 2:
                    message.version = reader.uint32();
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
    internalBinaryWrite(message: MipComponentEntry, writer: IBinaryWriter, options: BinaryWriteOptions): IBinaryWriter {
        /* massa.model.v1.MipComponent kind = 1; */
        if (message.kind !== 0)
            writer.tag(1, WireType.Varint).int32(message.kind);
        /* uint32 version = 2; */
        if (message.version !== 0)
            writer.tag(2, WireType.Varint).uint32(message.version);
        let u = options.writeUnknownFields;
        if (u !== false)
            (u == true ? UnknownFieldHandler.onWrite : u)(this.typeName, message, writer);
        return writer;
    }
}
/**
 * @generated MessageType for protobuf message massa.model.v1.MipComponentEntry
 */
export const MipComponentEntry = new MipComponentEntry$Type();
