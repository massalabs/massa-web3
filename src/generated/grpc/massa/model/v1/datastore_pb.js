// source: massa/model/v1/datastore.proto
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

goog.exportSymbol('proto.massa.model.v1.AddressKeyEntry', null, global);
goog.exportSymbol('proto.massa.model.v1.AddressKeysEntries', null, global);
goog.exportSymbol('proto.massa.model.v1.DatastoreEntry', null, global);
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
proto.massa.model.v1.AddressKeysEntries = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.massa.model.v1.AddressKeysEntries.repeatedFields_, null);
};
goog.inherits(proto.massa.model.v1.AddressKeysEntries, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.massa.model.v1.AddressKeysEntries.displayName = 'proto.massa.model.v1.AddressKeysEntries';
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
proto.massa.model.v1.AddressKeyEntry = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.massa.model.v1.AddressKeyEntry, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.massa.model.v1.AddressKeyEntry.displayName = 'proto.massa.model.v1.AddressKeyEntry';
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
proto.massa.model.v1.DatastoreEntry = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.massa.model.v1.DatastoreEntry, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.massa.model.v1.DatastoreEntry.displayName = 'proto.massa.model.v1.DatastoreEntry';
}

/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.massa.model.v1.AddressKeysEntries.repeatedFields_ = [1];



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
proto.massa.model.v1.AddressKeysEntries.prototype.toObject = function(opt_includeInstance) {
  return proto.massa.model.v1.AddressKeysEntries.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.massa.model.v1.AddressKeysEntries} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.massa.model.v1.AddressKeysEntries.toObject = function(includeInstance, msg) {
  var f, obj = {
addressKeyEntriesList: jspb.Message.toObjectList(msg.getAddressKeyEntriesList(),
    proto.massa.model.v1.AddressKeyEntry.toObject, includeInstance)
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
 * @return {!proto.massa.model.v1.AddressKeysEntries}
 */
proto.massa.model.v1.AddressKeysEntries.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.massa.model.v1.AddressKeysEntries;
  return proto.massa.model.v1.AddressKeysEntries.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.massa.model.v1.AddressKeysEntries} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.massa.model.v1.AddressKeysEntries}
 */
proto.massa.model.v1.AddressKeysEntries.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.massa.model.v1.AddressKeyEntry;
      reader.readMessage(value,proto.massa.model.v1.AddressKeyEntry.deserializeBinaryFromReader);
      msg.addAddressKeyEntries(value);
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
proto.massa.model.v1.AddressKeysEntries.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.massa.model.v1.AddressKeysEntries.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.massa.model.v1.AddressKeysEntries} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.massa.model.v1.AddressKeysEntries.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getAddressKeyEntriesList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      1,
      f,
      proto.massa.model.v1.AddressKeyEntry.serializeBinaryToWriter
    );
  }
};


/**
 * repeated AddressKeyEntry address_key_entries = 1;
 * @return {!Array<!proto.massa.model.v1.AddressKeyEntry>}
 */
proto.massa.model.v1.AddressKeysEntries.prototype.getAddressKeyEntriesList = function() {
  return /** @type{!Array<!proto.massa.model.v1.AddressKeyEntry>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.massa.model.v1.AddressKeyEntry, 1));
};


/**
 * @param {!Array<!proto.massa.model.v1.AddressKeyEntry>} value
 * @return {!proto.massa.model.v1.AddressKeysEntries} returns this
*/
proto.massa.model.v1.AddressKeysEntries.prototype.setAddressKeyEntriesList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 1, value);
};


/**
 * @param {!proto.massa.model.v1.AddressKeyEntry=} opt_value
 * @param {number=} opt_index
 * @return {!proto.massa.model.v1.AddressKeyEntry}
 */
proto.massa.model.v1.AddressKeysEntries.prototype.addAddressKeyEntries = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 1, opt_value, proto.massa.model.v1.AddressKeyEntry, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.massa.model.v1.AddressKeysEntries} returns this
 */
proto.massa.model.v1.AddressKeysEntries.prototype.clearAddressKeyEntriesList = function() {
  return this.setAddressKeyEntriesList([]);
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
proto.massa.model.v1.AddressKeyEntry.prototype.toObject = function(opt_includeInstance) {
  return proto.massa.model.v1.AddressKeyEntry.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.massa.model.v1.AddressKeyEntry} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.massa.model.v1.AddressKeyEntry.toObject = function(includeInstance, msg) {
  var f, obj = {
address: jspb.Message.getFieldWithDefault(msg, 1, ""),
key: msg.getKey_asB64()
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
 * @return {!proto.massa.model.v1.AddressKeyEntry}
 */
proto.massa.model.v1.AddressKeyEntry.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.massa.model.v1.AddressKeyEntry;
  return proto.massa.model.v1.AddressKeyEntry.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.massa.model.v1.AddressKeyEntry} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.massa.model.v1.AddressKeyEntry}
 */
proto.massa.model.v1.AddressKeyEntry.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setAddress(value);
      break;
    case 2:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setKey(value);
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
proto.massa.model.v1.AddressKeyEntry.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.massa.model.v1.AddressKeyEntry.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.massa.model.v1.AddressKeyEntry} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.massa.model.v1.AddressKeyEntry.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getAddress();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getKey_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      2,
      f
    );
  }
};


/**
 * optional string address = 1;
 * @return {string}
 */
proto.massa.model.v1.AddressKeyEntry.prototype.getAddress = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.massa.model.v1.AddressKeyEntry} returns this
 */
proto.massa.model.v1.AddressKeyEntry.prototype.setAddress = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional bytes key = 2;
 * @return {string}
 */
proto.massa.model.v1.AddressKeyEntry.prototype.getKey = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * optional bytes key = 2;
 * This is a type-conversion wrapper around `getKey()`
 * @return {string}
 */
proto.massa.model.v1.AddressKeyEntry.prototype.getKey_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getKey()));
};


/**
 * optional bytes key = 2;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getKey()`
 * @return {!Uint8Array}
 */
proto.massa.model.v1.AddressKeyEntry.prototype.getKey_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getKey()));
};


/**
 * @param {!(string|Uint8Array)} value
 * @return {!proto.massa.model.v1.AddressKeyEntry} returns this
 */
proto.massa.model.v1.AddressKeyEntry.prototype.setKey = function(value) {
  return jspb.Message.setProto3BytesField(this, 2, value);
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
proto.massa.model.v1.DatastoreEntry.prototype.toObject = function(opt_includeInstance) {
  return proto.massa.model.v1.DatastoreEntry.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.massa.model.v1.DatastoreEntry} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.massa.model.v1.DatastoreEntry.toObject = function(includeInstance, msg) {
  var f, obj = {
finalValue: msg.getFinalValue_asB64(),
candidateValue: msg.getCandidateValue_asB64()
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
 * @return {!proto.massa.model.v1.DatastoreEntry}
 */
proto.massa.model.v1.DatastoreEntry.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.massa.model.v1.DatastoreEntry;
  return proto.massa.model.v1.DatastoreEntry.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.massa.model.v1.DatastoreEntry} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.massa.model.v1.DatastoreEntry}
 */
proto.massa.model.v1.DatastoreEntry.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setFinalValue(value);
      break;
    case 2:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setCandidateValue(value);
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
proto.massa.model.v1.DatastoreEntry.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.massa.model.v1.DatastoreEntry.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.massa.model.v1.DatastoreEntry} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.massa.model.v1.DatastoreEntry.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getFinalValue_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      1,
      f
    );
  }
  f = message.getCandidateValue_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      2,
      f
    );
  }
};


/**
 * optional bytes final_value = 1;
 * @return {string}
 */
proto.massa.model.v1.DatastoreEntry.prototype.getFinalValue = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * optional bytes final_value = 1;
 * This is a type-conversion wrapper around `getFinalValue()`
 * @return {string}
 */
proto.massa.model.v1.DatastoreEntry.prototype.getFinalValue_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getFinalValue()));
};


/**
 * optional bytes final_value = 1;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getFinalValue()`
 * @return {!Uint8Array}
 */
proto.massa.model.v1.DatastoreEntry.prototype.getFinalValue_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getFinalValue()));
};


/**
 * @param {!(string|Uint8Array)} value
 * @return {!proto.massa.model.v1.DatastoreEntry} returns this
 */
proto.massa.model.v1.DatastoreEntry.prototype.setFinalValue = function(value) {
  return jspb.Message.setProto3BytesField(this, 1, value);
};


/**
 * optional bytes candidate_value = 2;
 * @return {string}
 */
proto.massa.model.v1.DatastoreEntry.prototype.getCandidateValue = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * optional bytes candidate_value = 2;
 * This is a type-conversion wrapper around `getCandidateValue()`
 * @return {string}
 */
proto.massa.model.v1.DatastoreEntry.prototype.getCandidateValue_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getCandidateValue()));
};


/**
 * optional bytes candidate_value = 2;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getCandidateValue()`
 * @return {!Uint8Array}
 */
proto.massa.model.v1.DatastoreEntry.prototype.getCandidateValue_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getCandidateValue()));
};


/**
 * @param {!(string|Uint8Array)} value
 * @return {!proto.massa.model.v1.DatastoreEntry} returns this
 */
proto.massa.model.v1.DatastoreEntry.prototype.setCandidateValue = function(value) {
  return jspb.Message.setProto3BytesField(this, 2, value);
};


goog.object.extend(exports, proto.massa.model.v1);
