// source: massa/model/v1/versioning.proto
/**
 * @fileoverview
 * @enhanceable
 * @suppress {missingRequire} reports error on implicit type usages.
 * @suppress {messageConventions} JS Compiler reports an error if a variable or
 *     field starts with 'MSG_' and isn't a translatable message.
 * @public
 */
// GENERATED CODE -- DO NOT EDIT!
/* eslint-disable */
// @ts-nocheck

var jspb = require('google-protobuf');
var goog = jspb;
var global =
    (typeof globalThis !== 'undefined' && globalThis) ||
    (typeof window !== 'undefined' && window) ||
    (typeof global !== 'undefined' && global) ||
    (typeof self !== 'undefined' && self) ||
    (function () { return this; }).call(null) ||
    Function('return this')();

var massa_model_v1_time_pb = require('../../../massa/model/v1/time_pb.js');
goog.object.extend(proto, massa_model_v1_time_pb);
goog.exportSymbol('proto.massa.model.v1.ComponentStateId', null, global);
goog.exportSymbol('proto.massa.model.v1.MipComponent', null, global);
goog.exportSymbol('proto.massa.model.v1.MipComponentEntry', null, global);
goog.exportSymbol('proto.massa.model.v1.MipInfo', null, global);
goog.exportSymbol('proto.massa.model.v1.MipStatusEntry', null, global);
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.massa.model.v1.MipStatusEntry = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.massa.model.v1.MipStatusEntry, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.massa.model.v1.MipStatusEntry.displayName = 'proto.massa.model.v1.MipStatusEntry';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.massa.model.v1.MipInfo = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.massa.model.v1.MipInfo.repeatedFields_, null);
};
goog.inherits(proto.massa.model.v1.MipInfo, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.massa.model.v1.MipInfo.displayName = 'proto.massa.model.v1.MipInfo';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.massa.model.v1.MipComponentEntry = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.massa.model.v1.MipComponentEntry, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.massa.model.v1.MipComponentEntry.displayName = 'proto.massa.model.v1.MipComponentEntry';
}



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.massa.model.v1.MipStatusEntry.prototype.toObject = function(opt_includeInstance) {
  return proto.massa.model.v1.MipStatusEntry.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.massa.model.v1.MipStatusEntry} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.massa.model.v1.MipStatusEntry.toObject = function(includeInstance, msg) {
  var f, obj = {
mipInfo: (f = msg.getMipInfo()) && proto.massa.model.v1.MipInfo.toObject(includeInstance, f),
stateId: jspb.Message.getFieldWithDefault(msg, 2, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.massa.model.v1.MipStatusEntry}
 */
proto.massa.model.v1.MipStatusEntry.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.massa.model.v1.MipStatusEntry;
  return proto.massa.model.v1.MipStatusEntry.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.massa.model.v1.MipStatusEntry} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.massa.model.v1.MipStatusEntry}
 */
proto.massa.model.v1.MipStatusEntry.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.massa.model.v1.MipInfo;
      reader.readMessage(value,proto.massa.model.v1.MipInfo.deserializeBinaryFromReader);
      msg.setMipInfo(value);
      break;
    case 2:
      var value = /** @type {!proto.massa.model.v1.ComponentStateId} */ (reader.readEnum());
      msg.setStateId(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.massa.model.v1.MipStatusEntry.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.massa.model.v1.MipStatusEntry.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.massa.model.v1.MipStatusEntry} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.massa.model.v1.MipStatusEntry.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getMipInfo();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      proto.massa.model.v1.MipInfo.serializeBinaryToWriter
    );
  }
  f = message.getStateId();
  if (f !== 0.0) {
    writer.writeEnum(
      2,
      f
    );
  }
};


/**
 * optional MipInfo mip_info = 1;
 * @return {?proto.massa.model.v1.MipInfo}
 */
proto.massa.model.v1.MipStatusEntry.prototype.getMipInfo = function() {
  return /** @type{?proto.massa.model.v1.MipInfo} */ (
    jspb.Message.getWrapperField(this, proto.massa.model.v1.MipInfo, 1));
};


/**
 * @param {?proto.massa.model.v1.MipInfo|undefined} value
 * @return {!proto.massa.model.v1.MipStatusEntry} returns this
*/
proto.massa.model.v1.MipStatusEntry.prototype.setMipInfo = function(value) {
  return jspb.Message.setWrapperField(this, 1, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.massa.model.v1.MipStatusEntry} returns this
 */
proto.massa.model.v1.MipStatusEntry.prototype.clearMipInfo = function() {
  return this.setMipInfo(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.massa.model.v1.MipStatusEntry.prototype.hasMipInfo = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional ComponentStateId state_id = 2;
 * @return {!proto.massa.model.v1.ComponentStateId}
 */
proto.massa.model.v1.MipStatusEntry.prototype.getStateId = function() {
  return /** @type {!proto.massa.model.v1.ComponentStateId} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/**
 * @param {!proto.massa.model.v1.ComponentStateId} value
 * @return {!proto.massa.model.v1.MipStatusEntry} returns this
 */
proto.massa.model.v1.MipStatusEntry.prototype.setStateId = function(value) {
  return jspb.Message.setProto3EnumField(this, 2, value);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.massa.model.v1.MipInfo.repeatedFields_ = [6];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.massa.model.v1.MipInfo.prototype.toObject = function(opt_includeInstance) {
  return proto.massa.model.v1.MipInfo.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.massa.model.v1.MipInfo} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.massa.model.v1.MipInfo.toObject = function(includeInstance, msg) {
  var f, obj = {
name: jspb.Message.getFieldWithDefault(msg, 1, ""),
version: jspb.Message.getFieldWithDefault(msg, 2, 0),
start: (f = msg.getStart()) && massa_model_v1_time_pb.NativeTime.toObject(includeInstance, f),
timeout: (f = msg.getTimeout()) && massa_model_v1_time_pb.NativeTime.toObject(includeInstance, f),
activationDelay: (f = msg.getActivationDelay()) && massa_model_v1_time_pb.NativeTime.toObject(includeInstance, f),
componentsList: jspb.Message.toObjectList(msg.getComponentsList(),
    proto.massa.model.v1.MipComponentEntry.toObject, includeInstance)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.massa.model.v1.MipInfo}
 */
proto.massa.model.v1.MipInfo.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.massa.model.v1.MipInfo;
  return proto.massa.model.v1.MipInfo.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.massa.model.v1.MipInfo} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.massa.model.v1.MipInfo}
 */
proto.massa.model.v1.MipInfo.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setName(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readUint32());
      msg.setVersion(value);
      break;
    case 3:
      var value = new massa_model_v1_time_pb.NativeTime;
      reader.readMessage(value,massa_model_v1_time_pb.NativeTime.deserializeBinaryFromReader);
      msg.setStart(value);
      break;
    case 4:
      var value = new massa_model_v1_time_pb.NativeTime;
      reader.readMessage(value,massa_model_v1_time_pb.NativeTime.deserializeBinaryFromReader);
      msg.setTimeout(value);
      break;
    case 5:
      var value = new massa_model_v1_time_pb.NativeTime;
      reader.readMessage(value,massa_model_v1_time_pb.NativeTime.deserializeBinaryFromReader);
      msg.setActivationDelay(value);
      break;
    case 6:
      var value = new proto.massa.model.v1.MipComponentEntry;
      reader.readMessage(value,proto.massa.model.v1.MipComponentEntry.deserializeBinaryFromReader);
      msg.addComponents(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.massa.model.v1.MipInfo.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.massa.model.v1.MipInfo.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.massa.model.v1.MipInfo} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.massa.model.v1.MipInfo.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getName();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getVersion();
  if (f !== 0) {
    writer.writeUint32(
      2,
      f
    );
  }
  f = message.getStart();
  if (f != null) {
    writer.writeMessage(
      3,
      f,
      massa_model_v1_time_pb.NativeTime.serializeBinaryToWriter
    );
  }
  f = message.getTimeout();
  if (f != null) {
    writer.writeMessage(
      4,
      f,
      massa_model_v1_time_pb.NativeTime.serializeBinaryToWriter
    );
  }
  f = message.getActivationDelay();
  if (f != null) {
    writer.writeMessage(
      5,
      f,
      massa_model_v1_time_pb.NativeTime.serializeBinaryToWriter
    );
  }
  f = message.getComponentsList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      6,
      f,
      proto.massa.model.v1.MipComponentEntry.serializeBinaryToWriter
    );
  }
};


/**
 * optional string name = 1;
 * @return {string}
 */
proto.massa.model.v1.MipInfo.prototype.getName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.massa.model.v1.MipInfo} returns this
 */
proto.massa.model.v1.MipInfo.prototype.setName = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional uint32 version = 2;
 * @return {number}
 */
proto.massa.model.v1.MipInfo.prototype.getVersion = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/**
 * @param {number} value
 * @return {!proto.massa.model.v1.MipInfo} returns this
 */
proto.massa.model.v1.MipInfo.prototype.setVersion = function(value) {
  return jspb.Message.setProto3IntField(this, 2, value);
};


/**
 * optional NativeTime start = 3;
 * @return {?proto.massa.model.v1.NativeTime}
 */
proto.massa.model.v1.MipInfo.prototype.getStart = function() {
  return /** @type{?proto.massa.model.v1.NativeTime} */ (
    jspb.Message.getWrapperField(this, massa_model_v1_time_pb.NativeTime, 3));
};


/**
 * @param {?proto.massa.model.v1.NativeTime|undefined} value
 * @return {!proto.massa.model.v1.MipInfo} returns this
*/
proto.massa.model.v1.MipInfo.prototype.setStart = function(value) {
  return jspb.Message.setWrapperField(this, 3, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.massa.model.v1.MipInfo} returns this
 */
proto.massa.model.v1.MipInfo.prototype.clearStart = function() {
  return this.setStart(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.massa.model.v1.MipInfo.prototype.hasStart = function() {
  return jspb.Message.getField(this, 3) != null;
};


/**
 * optional NativeTime timeout = 4;
 * @return {?proto.massa.model.v1.NativeTime}
 */
proto.massa.model.v1.MipInfo.prototype.getTimeout = function() {
  return /** @type{?proto.massa.model.v1.NativeTime} */ (
    jspb.Message.getWrapperField(this, massa_model_v1_time_pb.NativeTime, 4));
};


/**
 * @param {?proto.massa.model.v1.NativeTime|undefined} value
 * @return {!proto.massa.model.v1.MipInfo} returns this
*/
proto.massa.model.v1.MipInfo.prototype.setTimeout = function(value) {
  return jspb.Message.setWrapperField(this, 4, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.massa.model.v1.MipInfo} returns this
 */
proto.massa.model.v1.MipInfo.prototype.clearTimeout = function() {
  return this.setTimeout(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.massa.model.v1.MipInfo.prototype.hasTimeout = function() {
  return jspb.Message.getField(this, 4) != null;
};


/**
 * optional NativeTime activation_delay = 5;
 * @return {?proto.massa.model.v1.NativeTime}
 */
proto.massa.model.v1.MipInfo.prototype.getActivationDelay = function() {
  return /** @type{?proto.massa.model.v1.NativeTime} */ (
    jspb.Message.getWrapperField(this, massa_model_v1_time_pb.NativeTime, 5));
};


/**
 * @param {?proto.massa.model.v1.NativeTime|undefined} value
 * @return {!proto.massa.model.v1.MipInfo} returns this
*/
proto.massa.model.v1.MipInfo.prototype.setActivationDelay = function(value) {
  return jspb.Message.setWrapperField(this, 5, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.massa.model.v1.MipInfo} returns this
 */
proto.massa.model.v1.MipInfo.prototype.clearActivationDelay = function() {
  return this.setActivationDelay(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.massa.model.v1.MipInfo.prototype.hasActivationDelay = function() {
  return jspb.Message.getField(this, 5) != null;
};


/**
 * repeated MipComponentEntry components = 6;
 * @return {!Array<!proto.massa.model.v1.MipComponentEntry>}
 */
proto.massa.model.v1.MipInfo.prototype.getComponentsList = function() {
  return /** @type{!Array<!proto.massa.model.v1.MipComponentEntry>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.massa.model.v1.MipComponentEntry, 6));
};


/**
 * @param {!Array<!proto.massa.model.v1.MipComponentEntry>} value
 * @return {!proto.massa.model.v1.MipInfo} returns this
*/
proto.massa.model.v1.MipInfo.prototype.setComponentsList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 6, value);
};


/**
 * @param {!proto.massa.model.v1.MipComponentEntry=} opt_value
 * @param {number=} opt_index
 * @return {!proto.massa.model.v1.MipComponentEntry}
 */
proto.massa.model.v1.MipInfo.prototype.addComponents = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 6, opt_value, proto.massa.model.v1.MipComponentEntry, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.massa.model.v1.MipInfo} returns this
 */
proto.massa.model.v1.MipInfo.prototype.clearComponentsList = function() {
  return this.setComponentsList([]);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.massa.model.v1.MipComponentEntry.prototype.toObject = function(opt_includeInstance) {
  return proto.massa.model.v1.MipComponentEntry.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.massa.model.v1.MipComponentEntry} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.massa.model.v1.MipComponentEntry.toObject = function(includeInstance, msg) {
  var f, obj = {
kind: jspb.Message.getFieldWithDefault(msg, 1, 0),
version: jspb.Message.getFieldWithDefault(msg, 2, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.massa.model.v1.MipComponentEntry}
 */
proto.massa.model.v1.MipComponentEntry.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.massa.model.v1.MipComponentEntry;
  return proto.massa.model.v1.MipComponentEntry.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.massa.model.v1.MipComponentEntry} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.massa.model.v1.MipComponentEntry}
 */
proto.massa.model.v1.MipComponentEntry.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {!proto.massa.model.v1.MipComponent} */ (reader.readEnum());
      msg.setKind(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readUint32());
      msg.setVersion(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.massa.model.v1.MipComponentEntry.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.massa.model.v1.MipComponentEntry.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.massa.model.v1.MipComponentEntry} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.massa.model.v1.MipComponentEntry.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getKind();
  if (f !== 0.0) {
    writer.writeEnum(
      1,
      f
    );
  }
  f = message.getVersion();
  if (f !== 0) {
    writer.writeUint32(
      2,
      f
    );
  }
};


/**
 * optional MipComponent kind = 1;
 * @return {!proto.massa.model.v1.MipComponent}
 */
proto.massa.model.v1.MipComponentEntry.prototype.getKind = function() {
  return /** @type {!proto.massa.model.v1.MipComponent} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {!proto.massa.model.v1.MipComponent} value
 * @return {!proto.massa.model.v1.MipComponentEntry} returns this
 */
proto.massa.model.v1.MipComponentEntry.prototype.setKind = function(value) {
  return jspb.Message.setProto3EnumField(this, 1, value);
};


/**
 * optional uint32 version = 2;
 * @return {number}
 */
proto.massa.model.v1.MipComponentEntry.prototype.getVersion = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/**
 * @param {number} value
 * @return {!proto.massa.model.v1.MipComponentEntry} returns this
 */
proto.massa.model.v1.MipComponentEntry.prototype.setVersion = function(value) {
  return jspb.Message.setProto3IntField(this, 2, value);
};


/**
 * @enum {number}
 */
proto.massa.model.v1.ComponentStateId = {
  COMPONENT_STATE_ID_UNSPECIFIED: 0,
  COMPONENT_STATE_ID_ERROR: 1,
  COMPONENT_STATE_ID_DEFINED: 2,
  COMPONENT_STATE_ID_STARTED: 3,
  COMPONENT_STATE_ID_LOCKEDIN: 4,
  COMPONENT_STATE_ID_ACTIVE: 5,
  COMPONENT_STATE_ID_FAILED: 6
};

/**
 * @enum {number}
 */
proto.massa.model.v1.MipComponent = {
  MIP_COMPONENT_UNSPECIFIED: 0,
  MIP_COMPONENT_ADDRESS: 1,
  MIP_COMPONENT_KEYPAIR: 2
};

goog.object.extend(exports, proto.massa.model.v1);
