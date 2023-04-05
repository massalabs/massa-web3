// source: protos/healthcheck.proto
/**
 * @file
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
var global = function () {
  if (this) {
    return this;
  }
  if (typeof window !== 'undefined') {
    return window;
  }
  if (typeof global !== 'undefined') {
    return global;
  }
  if (typeof self !== 'undefined') {
    return self;
  }
  return Function('return this')();
}.call(null);

goog.exportSymbol('proto.massa.HealthCheckRequest', null, global);
goog.exportSymbol('proto.massa.HealthCheckResponse', null, global);
goog.exportSymbol(
  'proto.massa.HealthCheckResponse.ServingStatus',
  null,
  global,
);
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
proto.massa.HealthCheckRequest = function (opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.massa.HealthCheckRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.massa.HealthCheckRequest.displayName = 'proto.massa.HealthCheckRequest';
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
proto.massa.HealthCheckResponse = function (opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.massa.HealthCheckResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.massa.HealthCheckResponse.displayName =
    'proto.massa.HealthCheckResponse';
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
  proto.massa.HealthCheckRequest.prototype.toObject = function (
    opt_includeInstance,
  ) {
    return proto.massa.HealthCheckRequest.toObject(opt_includeInstance, this);
  };

  /**
   * Static version of the {@see toObject} method.
   * @param {boolean|undefined} includeInstance Deprecated. Whether to include
   *     the JSPB instance for transitional soy proto support:
   *     http://goto/soy-param-migration
   * @param {!proto.massa.HealthCheckRequest} msg The msg instance to transform.
   * @return {!Object}
   * @suppress {unusedLocalVariables} f is only used for nested messages
   */
  proto.massa.HealthCheckRequest.toObject = function (includeInstance, msg) {
    var f,
      obj = {
        service: jspb.Message.getFieldWithDefault(msg, 1, ''),
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
 * @return {!proto.massa.HealthCheckRequest}
 */
proto.massa.HealthCheckRequest.deserializeBinary = function (bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.massa.HealthCheckRequest();
  return proto.massa.HealthCheckRequest.deserializeBinaryFromReader(
    msg,
    reader,
  );
};

/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.massa.HealthCheckRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.massa.HealthCheckRequest}
 */
proto.massa.HealthCheckRequest.deserializeBinaryFromReader = function (
  msg,
  reader,
) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
      case 1:
        var value = /** @type {string} */ reader.readString();
        msg.setService(value);
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
proto.massa.HealthCheckRequest.prototype.serializeBinary = function () {
  var writer = new jspb.BinaryWriter();
  proto.massa.HealthCheckRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};

/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.massa.HealthCheckRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.massa.HealthCheckRequest.serializeBinaryToWriter = function (
  message,
  writer,
) {
  var f = undefined;
  f = message.getService();
  if (f.length > 0) {
    writer.writeString(1, f);
  }
};

/**
 * optional string service = 1;
 * @return {string}
 */
proto.massa.HealthCheckRequest.prototype.getService = function () {
  return /** @type {string} */ jspb.Message.getFieldWithDefault(this, 1, '');
};

/**
 * @param {string} value
 * @return {!proto.massa.HealthCheckRequest} returns this
 */
proto.massa.HealthCheckRequest.prototype.setService = function (value) {
  return jspb.Message.setProto3StringField(this, 1, value);
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
  proto.massa.HealthCheckResponse.prototype.toObject = function (
    opt_includeInstance,
  ) {
    return proto.massa.HealthCheckResponse.toObject(opt_includeInstance, this);
  };

  /**
   * Static version of the {@see toObject} method.
   * @param {boolean|undefined} includeInstance Deprecated. Whether to include
   *     the JSPB instance for transitional soy proto support:
   *     http://goto/soy-param-migration
   * @param {!proto.massa.HealthCheckResponse} msg The msg instance to transform.
   * @return {!Object}
   * @suppress {unusedLocalVariables} f is only used for nested messages
   */
  proto.massa.HealthCheckResponse.toObject = function (includeInstance, msg) {
    var f,
      obj = {
        status: jspb.Message.getFieldWithDefault(msg, 1, 0),
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
 * @return {!proto.massa.HealthCheckResponse}
 */
proto.massa.HealthCheckResponse.deserializeBinary = function (bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.massa.HealthCheckResponse();
  return proto.massa.HealthCheckResponse.deserializeBinaryFromReader(
    msg,
    reader,
  );
};

/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.massa.HealthCheckResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.massa.HealthCheckResponse}
 */
proto.massa.HealthCheckResponse.deserializeBinaryFromReader = function (
  msg,
  reader,
) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
      case 1:
        var value =
          /** @type {!proto.massa.HealthCheckResponse.ServingStatus} */ reader.readEnum();
        msg.setStatus(value);
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
proto.massa.HealthCheckResponse.prototype.serializeBinary = function () {
  var writer = new jspb.BinaryWriter();
  proto.massa.HealthCheckResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};

/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.massa.HealthCheckResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.massa.HealthCheckResponse.serializeBinaryToWriter = function (
  message,
  writer,
) {
  var f = undefined;
  f = message.getStatus();
  if (f !== 0.0) {
    writer.writeEnum(1, f);
  }
};

/**
 * @enum {number}
 */
proto.massa.HealthCheckResponse.ServingStatus = {
  UNKNOWN: 0,
  SERVING: 1,
  NOT_SERVING: 2,
  SERVICE_UNKNOWN: 3,
};

/**
 * optional ServingStatus status = 1;
 * @return {!proto.massa.HealthCheckResponse.ServingStatus}
 */
proto.massa.HealthCheckResponse.prototype.getStatus = function () {
  return /** @type {!proto.massa.HealthCheckResponse.ServingStatus} */ jspb.Message.getFieldWithDefault(
    this,
    1,
    0,
  );
};

/**
 * @param {!proto.massa.HealthCheckResponse.ServingStatus} value
 * @return {!proto.massa.HealthCheckResponse} returns this
 */
proto.massa.HealthCheckResponse.prototype.setStatus = function (value) {
  return jspb.Message.setProto3EnumField(this, 1, value);
};

goog.object.extend(exports, proto.massa);
