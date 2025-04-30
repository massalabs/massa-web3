// source: massa/model/v1/execution.proto
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

var google_protobuf_wrappers_pb = require('google-protobuf/google/protobuf/wrappers_pb.js');
goog.object.extend(proto, google_protobuf_wrappers_pb);
var massa_model_v1_amount_pb = require('../../../massa/model/v1/amount_pb.js');
goog.object.extend(proto, massa_model_v1_amount_pb);
var massa_model_v1_commons_pb = require('../../../massa/model/v1/commons_pb.js');
goog.object.extend(proto, massa_model_v1_commons_pb);
var massa_model_v1_denunciation_pb = require('../../../massa/model/v1/denunciation_pb.js');
goog.object.extend(proto, massa_model_v1_denunciation_pb);
var massa_model_v1_slot_pb = require('../../../massa/model/v1/slot_pb.js');
goog.object.extend(proto, massa_model_v1_slot_pb);
goog.exportSymbol('proto.massa.model.v1.AsyncMessage', null, global);
goog.exportSymbol('proto.massa.model.v1.AsyncMessageExecution', null, global);
goog.exportSymbol('proto.massa.model.v1.AsyncMessageTrigger', null, global);
goog.exportSymbol('proto.massa.model.v1.AsyncMessageUpdate', null, global);
goog.exportSymbol('proto.massa.model.v1.AsyncPoolChangeEntry', null, global);
goog.exportSymbol('proto.massa.model.v1.AsyncPoolChangeType', null, global);
goog.exportSymbol('proto.massa.model.v1.AsyncPoolChangeValue', null, global);
goog.exportSymbol('proto.massa.model.v1.AsyncPoolChangeValue.MessageCase', null, global);
goog.exportSymbol('proto.massa.model.v1.BytecodeExecution', null, global);
goog.exportSymbol('proto.massa.model.v1.CoinOrigin', null, global);
goog.exportSymbol('proto.massa.model.v1.DeferredCallExecution', null, global);
goog.exportSymbol('proto.massa.model.v1.ExecTransferInfo', null, global);
goog.exportSymbol('proto.massa.model.v1.ExecutedOpsChangeEntry', null, global);
goog.exportSymbol('proto.massa.model.v1.ExecutedOpsChangeValue', null, global);
goog.exportSymbol('proto.massa.model.v1.ExecutionOutput', null, global);
goog.exportSymbol('proto.massa.model.v1.ExecutionOutputStatus', null, global);
goog.exportSymbol('proto.massa.model.v1.ExecutionStackElement', null, global);
goog.exportSymbol('proto.massa.model.v1.FinalizedExecutionOutput', null, global);
goog.exportSymbol('proto.massa.model.v1.FunctionCall', null, global);
goog.exportSymbol('proto.massa.model.v1.LedgerChangeEntry', null, global);
goog.exportSymbol('proto.massa.model.v1.LedgerChangeType', null, global);
goog.exportSymbol('proto.massa.model.v1.LedgerChangeValue', null, global);
goog.exportSymbol('proto.massa.model.v1.LedgerChangeValue.EntryCase', null, global);
goog.exportSymbol('proto.massa.model.v1.LedgerEntry', null, global);
goog.exportSymbol('proto.massa.model.v1.LedgerEntryUpdate', null, global);
goog.exportSymbol('proto.massa.model.v1.OperationExecutionStatus', null, global);
goog.exportSymbol('proto.massa.model.v1.ReadOnlyExecutionCall', null, global);
goog.exportSymbol('proto.massa.model.v1.ReadOnlyExecutionCall.TargetCase', null, global);
goog.exportSymbol('proto.massa.model.v1.ReadOnlyExecutionOutput', null, global);
goog.exportSymbol('proto.massa.model.v1.ScExecutionEvent', null, global);
goog.exportSymbol('proto.massa.model.v1.ScExecutionEventContext', null, global);
goog.exportSymbol('proto.massa.model.v1.ScExecutionEventStatus', null, global);
goog.exportSymbol('proto.massa.model.v1.ScExecutionEventsStatus', null, global);
goog.exportSymbol('proto.massa.model.v1.SetOrDeleteDatastoreEntry', null, global);
goog.exportSymbol('proto.massa.model.v1.SetOrDeleteDatastoreEntry.ChangeCase', null, global);
goog.exportSymbol('proto.massa.model.v1.SetOrKeepAsyncMessageTrigger', null, global);
goog.exportSymbol('proto.massa.model.v1.SetOrKeepAsyncMessageTrigger.ChangeCase', null, global);
goog.exportSymbol('proto.massa.model.v1.SetOrKeepBalance', null, global);
goog.exportSymbol('proto.massa.model.v1.SetOrKeepBalance.ChangeCase', null, global);
goog.exportSymbol('proto.massa.model.v1.SetOrKeepBool', null, global);
goog.exportSymbol('proto.massa.model.v1.SetOrKeepBool.ChangeCase', null, global);
goog.exportSymbol('proto.massa.model.v1.SetOrKeepBytes', null, global);
goog.exportSymbol('proto.massa.model.v1.SetOrKeepBytes.ChangeCase', null, global);
goog.exportSymbol('proto.massa.model.v1.SetOrKeepSlot', null, global);
goog.exportSymbol('proto.massa.model.v1.SetOrKeepSlot.ChangeCase', null, global);
goog.exportSymbol('proto.massa.model.v1.SetOrKeepString', null, global);
goog.exportSymbol('proto.massa.model.v1.SetOrKeepString.ChangeCase', null, global);
goog.exportSymbol('proto.massa.model.v1.SetOrKeepUint64', null, global);
goog.exportSymbol('proto.massa.model.v1.SetOrKeepUint64.ChangeCase', null, global);
goog.exportSymbol('proto.massa.model.v1.SlotExecutionOutput', null, global);
goog.exportSymbol('proto.massa.model.v1.StateChanges', null, global);
goog.exportSymbol('proto.massa.model.v1.TargetAmount', null, global);
goog.exportSymbol('proto.massa.model.v1.TransferValue', null, global);
goog.exportSymbol('proto.massa.model.v1.TransferValue.ValueCase', null, global);
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
proto.massa.model.v1.SlotExecutionOutput = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.massa.model.v1.SlotExecutionOutput, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.massa.model.v1.SlotExecutionOutput.displayName = 'proto.massa.model.v1.SlotExecutionOutput';
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
proto.massa.model.v1.FinalizedExecutionOutput = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.massa.model.v1.FinalizedExecutionOutput, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.massa.model.v1.FinalizedExecutionOutput.displayName = 'proto.massa.model.v1.FinalizedExecutionOutput';
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
proto.massa.model.v1.ExecutionOutput = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.massa.model.v1.ExecutionOutput.repeatedFields_, null);
};
goog.inherits(proto.massa.model.v1.ExecutionOutput, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.massa.model.v1.ExecutionOutput.displayName = 'proto.massa.model.v1.ExecutionOutput';
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
proto.massa.model.v1.ScExecutionEvent = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.massa.model.v1.ScExecutionEvent, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.massa.model.v1.ScExecutionEvent.displayName = 'proto.massa.model.v1.ScExecutionEvent';
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
proto.massa.model.v1.ScExecutionEventContext = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.massa.model.v1.ScExecutionEventContext.repeatedFields_, null);
};
goog.inherits(proto.massa.model.v1.ScExecutionEventContext, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.massa.model.v1.ScExecutionEventContext.displayName = 'proto.massa.model.v1.ScExecutionEventContext';
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
proto.massa.model.v1.ScExecutionEventsStatus = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.massa.model.v1.ScExecutionEventsStatus.repeatedFields_, null);
};
goog.inherits(proto.massa.model.v1.ScExecutionEventsStatus, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.massa.model.v1.ScExecutionEventsStatus.displayName = 'proto.massa.model.v1.ScExecutionEventsStatus';
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
proto.massa.model.v1.StateChanges = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.massa.model.v1.StateChanges.repeatedFields_, null);
};
goog.inherits(proto.massa.model.v1.StateChanges, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.massa.model.v1.StateChanges.displayName = 'proto.massa.model.v1.StateChanges';
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
proto.massa.model.v1.ExecutedOpsChangeEntry = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.massa.model.v1.ExecutedOpsChangeEntry, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.massa.model.v1.ExecutedOpsChangeEntry.displayName = 'proto.massa.model.v1.ExecutedOpsChangeEntry';
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
proto.massa.model.v1.ExecutedOpsChangeValue = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.massa.model.v1.ExecutedOpsChangeValue, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.massa.model.v1.ExecutedOpsChangeValue.displayName = 'proto.massa.model.v1.ExecutedOpsChangeValue';
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
proto.massa.model.v1.AsyncPoolChangeEntry = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.massa.model.v1.AsyncPoolChangeEntry, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.massa.model.v1.AsyncPoolChangeEntry.displayName = 'proto.massa.model.v1.AsyncPoolChangeEntry';
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
proto.massa.model.v1.AsyncPoolChangeValue = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, proto.massa.model.v1.AsyncPoolChangeValue.oneofGroups_);
};
goog.inherits(proto.massa.model.v1.AsyncPoolChangeValue, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.massa.model.v1.AsyncPoolChangeValue.displayName = 'proto.massa.model.v1.AsyncPoolChangeValue';
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
proto.massa.model.v1.AsyncMessage = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.massa.model.v1.AsyncMessage, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.massa.model.v1.AsyncMessage.displayName = 'proto.massa.model.v1.AsyncMessage';
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
proto.massa.model.v1.AsyncMessageUpdate = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.massa.model.v1.AsyncMessageUpdate, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.massa.model.v1.AsyncMessageUpdate.displayName = 'proto.massa.model.v1.AsyncMessageUpdate';
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
proto.massa.model.v1.SetOrKeepSlot = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, proto.massa.model.v1.SetOrKeepSlot.oneofGroups_);
};
goog.inherits(proto.massa.model.v1.SetOrKeepSlot, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.massa.model.v1.SetOrKeepSlot.displayName = 'proto.massa.model.v1.SetOrKeepSlot';
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
proto.massa.model.v1.SetOrKeepUint64 = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, proto.massa.model.v1.SetOrKeepUint64.oneofGroups_);
};
goog.inherits(proto.massa.model.v1.SetOrKeepUint64, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.massa.model.v1.SetOrKeepUint64.displayName = 'proto.massa.model.v1.SetOrKeepUint64';
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
proto.massa.model.v1.SetOrKeepString = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, proto.massa.model.v1.SetOrKeepString.oneofGroups_);
};
goog.inherits(proto.massa.model.v1.SetOrKeepString, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.massa.model.v1.SetOrKeepString.displayName = 'proto.massa.model.v1.SetOrKeepString';
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
proto.massa.model.v1.SetOrKeepBytes = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, proto.massa.model.v1.SetOrKeepBytes.oneofGroups_);
};
goog.inherits(proto.massa.model.v1.SetOrKeepBytes, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.massa.model.v1.SetOrKeepBytes.displayName = 'proto.massa.model.v1.SetOrKeepBytes';
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
proto.massa.model.v1.SetOrKeepBool = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, proto.massa.model.v1.SetOrKeepBool.oneofGroups_);
};
goog.inherits(proto.massa.model.v1.SetOrKeepBool, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.massa.model.v1.SetOrKeepBool.displayName = 'proto.massa.model.v1.SetOrKeepBool';
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
proto.massa.model.v1.SetOrKeepAsyncMessageTrigger = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, proto.massa.model.v1.SetOrKeepAsyncMessageTrigger.oneofGroups_);
};
goog.inherits(proto.massa.model.v1.SetOrKeepAsyncMessageTrigger, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.massa.model.v1.SetOrKeepAsyncMessageTrigger.displayName = 'proto.massa.model.v1.SetOrKeepAsyncMessageTrigger';
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
proto.massa.model.v1.AsyncMessageTrigger = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.massa.model.v1.AsyncMessageTrigger, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.massa.model.v1.AsyncMessageTrigger.displayName = 'proto.massa.model.v1.AsyncMessageTrigger';
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
proto.massa.model.v1.LedgerChangeEntry = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.massa.model.v1.LedgerChangeEntry, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.massa.model.v1.LedgerChangeEntry.displayName = 'proto.massa.model.v1.LedgerChangeEntry';
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
proto.massa.model.v1.LedgerChangeValue = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, proto.massa.model.v1.LedgerChangeValue.oneofGroups_);
};
goog.inherits(proto.massa.model.v1.LedgerChangeValue, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.massa.model.v1.LedgerChangeValue.displayName = 'proto.massa.model.v1.LedgerChangeValue';
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
proto.massa.model.v1.LedgerEntry = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.massa.model.v1.LedgerEntry.repeatedFields_, null);
};
goog.inherits(proto.massa.model.v1.LedgerEntry, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.massa.model.v1.LedgerEntry.displayName = 'proto.massa.model.v1.LedgerEntry';
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
proto.massa.model.v1.LedgerEntryUpdate = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.massa.model.v1.LedgerEntryUpdate.repeatedFields_, null);
};
goog.inherits(proto.massa.model.v1.LedgerEntryUpdate, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.massa.model.v1.LedgerEntryUpdate.displayName = 'proto.massa.model.v1.LedgerEntryUpdate';
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
proto.massa.model.v1.SetOrKeepBalance = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, proto.massa.model.v1.SetOrKeepBalance.oneofGroups_);
};
goog.inherits(proto.massa.model.v1.SetOrKeepBalance, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.massa.model.v1.SetOrKeepBalance.displayName = 'proto.massa.model.v1.SetOrKeepBalance';
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
proto.massa.model.v1.SetOrDeleteDatastoreEntry = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, proto.massa.model.v1.SetOrDeleteDatastoreEntry.oneofGroups_);
};
goog.inherits(proto.massa.model.v1.SetOrDeleteDatastoreEntry, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.massa.model.v1.SetOrDeleteDatastoreEntry.displayName = 'proto.massa.model.v1.SetOrDeleteDatastoreEntry';
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
proto.massa.model.v1.ReadOnlyExecutionCall = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.massa.model.v1.ReadOnlyExecutionCall.repeatedFields_, proto.massa.model.v1.ReadOnlyExecutionCall.oneofGroups_);
};
goog.inherits(proto.massa.model.v1.ReadOnlyExecutionCall, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.massa.model.v1.ReadOnlyExecutionCall.displayName = 'proto.massa.model.v1.ReadOnlyExecutionCall';
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
proto.massa.model.v1.BytecodeExecution = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.massa.model.v1.BytecodeExecution, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.massa.model.v1.BytecodeExecution.displayName = 'proto.massa.model.v1.BytecodeExecution';
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
proto.massa.model.v1.FunctionCall = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.massa.model.v1.FunctionCall, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.massa.model.v1.FunctionCall.displayName = 'proto.massa.model.v1.FunctionCall';
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
proto.massa.model.v1.ReadOnlyExecutionOutput = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.massa.model.v1.ReadOnlyExecutionOutput, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.massa.model.v1.ReadOnlyExecutionOutput.displayName = 'proto.massa.model.v1.ReadOnlyExecutionOutput';
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
proto.massa.model.v1.ExecutionStackElement = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.massa.model.v1.ExecutionStackElement.repeatedFields_, null);
};
goog.inherits(proto.massa.model.v1.ExecutionStackElement, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.massa.model.v1.ExecutionStackElement.displayName = 'proto.massa.model.v1.ExecutionStackElement';
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
proto.massa.model.v1.TargetAmount = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.massa.model.v1.TargetAmount, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.massa.model.v1.TargetAmount.displayName = 'proto.massa.model.v1.TargetAmount';
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
proto.massa.model.v1.AsyncMessageExecution = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.massa.model.v1.AsyncMessageExecution, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.massa.model.v1.AsyncMessageExecution.displayName = 'proto.massa.model.v1.AsyncMessageExecution';
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
proto.massa.model.v1.DeferredCallExecution = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.massa.model.v1.DeferredCallExecution, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.massa.model.v1.DeferredCallExecution.displayName = 'proto.massa.model.v1.DeferredCallExecution';
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
proto.massa.model.v1.ExecTransferInfo = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.massa.model.v1.ExecTransferInfo, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.massa.model.v1.ExecTransferInfo.displayName = 'proto.massa.model.v1.ExecTransferInfo';
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
proto.massa.model.v1.TransferValue = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, proto.massa.model.v1.TransferValue.oneofGroups_);
};
goog.inherits(proto.massa.model.v1.TransferValue, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.massa.model.v1.TransferValue.displayName = 'proto.massa.model.v1.TransferValue';
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
proto.massa.model.v1.SlotExecutionOutput.prototype.toObject = function(opt_includeInstance) {
  return proto.massa.model.v1.SlotExecutionOutput.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.massa.model.v1.SlotExecutionOutput} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.massa.model.v1.SlotExecutionOutput.toObject = function(includeInstance, msg) {
  var f, obj = {
status: jspb.Message.getFieldWithDefault(msg, 1, 0),
executionOutput: (f = msg.getExecutionOutput()) && proto.massa.model.v1.ExecutionOutput.toObject(includeInstance, f)
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
 * @return {!proto.massa.model.v1.SlotExecutionOutput}
 */
proto.massa.model.v1.SlotExecutionOutput.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.massa.model.v1.SlotExecutionOutput;
  return proto.massa.model.v1.SlotExecutionOutput.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.massa.model.v1.SlotExecutionOutput} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.massa.model.v1.SlotExecutionOutput}
 */
proto.massa.model.v1.SlotExecutionOutput.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {!proto.massa.model.v1.ExecutionOutputStatus} */ (reader.readEnum());
      msg.setStatus(value);
      break;
    case 2:
      var value = new proto.massa.model.v1.ExecutionOutput;
      reader.readMessage(value,proto.massa.model.v1.ExecutionOutput.deserializeBinaryFromReader);
      msg.setExecutionOutput(value);
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
proto.massa.model.v1.SlotExecutionOutput.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.massa.model.v1.SlotExecutionOutput.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.massa.model.v1.SlotExecutionOutput} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.massa.model.v1.SlotExecutionOutput.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getStatus();
  if (f !== 0.0) {
    writer.writeEnum(
      1,
      f
    );
  }
  f = message.getExecutionOutput();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      proto.massa.model.v1.ExecutionOutput.serializeBinaryToWriter
    );
  }
};


/**
 * optional ExecutionOutputStatus status = 1;
 * @return {!proto.massa.model.v1.ExecutionOutputStatus}
 */
proto.massa.model.v1.SlotExecutionOutput.prototype.getStatus = function() {
  return /** @type {!proto.massa.model.v1.ExecutionOutputStatus} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {!proto.massa.model.v1.ExecutionOutputStatus} value
 * @return {!proto.massa.model.v1.SlotExecutionOutput} returns this
 */
proto.massa.model.v1.SlotExecutionOutput.prototype.setStatus = function(value) {
  return jspb.Message.setProto3EnumField(this, 1, value);
};


/**
 * optional ExecutionOutput execution_output = 2;
 * @return {?proto.massa.model.v1.ExecutionOutput}
 */
proto.massa.model.v1.SlotExecutionOutput.prototype.getExecutionOutput = function() {
  return /** @type{?proto.massa.model.v1.ExecutionOutput} */ (
    jspb.Message.getWrapperField(this, proto.massa.model.v1.ExecutionOutput, 2));
};


/**
 * @param {?proto.massa.model.v1.ExecutionOutput|undefined} value
 * @return {!proto.massa.model.v1.SlotExecutionOutput} returns this
*/
proto.massa.model.v1.SlotExecutionOutput.prototype.setExecutionOutput = function(value) {
  return jspb.Message.setWrapperField(this, 2, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.massa.model.v1.SlotExecutionOutput} returns this
 */
proto.massa.model.v1.SlotExecutionOutput.prototype.clearExecutionOutput = function() {
  return this.setExecutionOutput(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.massa.model.v1.SlotExecutionOutput.prototype.hasExecutionOutput = function() {
  return jspb.Message.getField(this, 2) != null;
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
proto.massa.model.v1.FinalizedExecutionOutput.prototype.toObject = function(opt_includeInstance) {
  return proto.massa.model.v1.FinalizedExecutionOutput.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.massa.model.v1.FinalizedExecutionOutput} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.massa.model.v1.FinalizedExecutionOutput.toObject = function(includeInstance, msg) {
  var f, obj = {
slot: (f = msg.getSlot()) && massa_model_v1_slot_pb.Slot.toObject(includeInstance, f)
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
 * @return {!proto.massa.model.v1.FinalizedExecutionOutput}
 */
proto.massa.model.v1.FinalizedExecutionOutput.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.massa.model.v1.FinalizedExecutionOutput;
  return proto.massa.model.v1.FinalizedExecutionOutput.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.massa.model.v1.FinalizedExecutionOutput} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.massa.model.v1.FinalizedExecutionOutput}
 */
proto.massa.model.v1.FinalizedExecutionOutput.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new massa_model_v1_slot_pb.Slot;
      reader.readMessage(value,massa_model_v1_slot_pb.Slot.deserializeBinaryFromReader);
      msg.setSlot(value);
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
proto.massa.model.v1.FinalizedExecutionOutput.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.massa.model.v1.FinalizedExecutionOutput.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.massa.model.v1.FinalizedExecutionOutput} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.massa.model.v1.FinalizedExecutionOutput.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getSlot();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      massa_model_v1_slot_pb.Slot.serializeBinaryToWriter
    );
  }
};


/**
 * optional Slot slot = 1;
 * @return {?proto.massa.model.v1.Slot}
 */
proto.massa.model.v1.FinalizedExecutionOutput.prototype.getSlot = function() {
  return /** @type{?proto.massa.model.v1.Slot} */ (
    jspb.Message.getWrapperField(this, massa_model_v1_slot_pb.Slot, 1));
};


/**
 * @param {?proto.massa.model.v1.Slot|undefined} value
 * @return {!proto.massa.model.v1.FinalizedExecutionOutput} returns this
*/
proto.massa.model.v1.FinalizedExecutionOutput.prototype.setSlot = function(value) {
  return jspb.Message.setWrapperField(this, 1, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.massa.model.v1.FinalizedExecutionOutput} returns this
 */
proto.massa.model.v1.FinalizedExecutionOutput.prototype.clearSlot = function() {
  return this.setSlot(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.massa.model.v1.FinalizedExecutionOutput.prototype.hasSlot = function() {
  return jspb.Message.getField(this, 1) != null;
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.massa.model.v1.ExecutionOutput.repeatedFields_ = [3];



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
proto.massa.model.v1.ExecutionOutput.prototype.toObject = function(opt_includeInstance) {
  return proto.massa.model.v1.ExecutionOutput.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.massa.model.v1.ExecutionOutput} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.massa.model.v1.ExecutionOutput.toObject = function(includeInstance, msg) {
  var f, obj = {
slot: (f = msg.getSlot()) && massa_model_v1_slot_pb.Slot.toObject(includeInstance, f),
blockId: (f = msg.getBlockId()) && google_protobuf_wrappers_pb.StringValue.toObject(includeInstance, f),
eventsList: jspb.Message.toObjectList(msg.getEventsList(),
    proto.massa.model.v1.ScExecutionEvent.toObject, includeInstance),
stateChanges: (f = msg.getStateChanges()) && proto.massa.model.v1.StateChanges.toObject(includeInstance, f)
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
 * @return {!proto.massa.model.v1.ExecutionOutput}
 */
proto.massa.model.v1.ExecutionOutput.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.massa.model.v1.ExecutionOutput;
  return proto.massa.model.v1.ExecutionOutput.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.massa.model.v1.ExecutionOutput} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.massa.model.v1.ExecutionOutput}
 */
proto.massa.model.v1.ExecutionOutput.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new massa_model_v1_slot_pb.Slot;
      reader.readMessage(value,massa_model_v1_slot_pb.Slot.deserializeBinaryFromReader);
      msg.setSlot(value);
      break;
    case 2:
      var value = new google_protobuf_wrappers_pb.StringValue;
      reader.readMessage(value,google_protobuf_wrappers_pb.StringValue.deserializeBinaryFromReader);
      msg.setBlockId(value);
      break;
    case 3:
      var value = new proto.massa.model.v1.ScExecutionEvent;
      reader.readMessage(value,proto.massa.model.v1.ScExecutionEvent.deserializeBinaryFromReader);
      msg.addEvents(value);
      break;
    case 4:
      var value = new proto.massa.model.v1.StateChanges;
      reader.readMessage(value,proto.massa.model.v1.StateChanges.deserializeBinaryFromReader);
      msg.setStateChanges(value);
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
proto.massa.model.v1.ExecutionOutput.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.massa.model.v1.ExecutionOutput.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.massa.model.v1.ExecutionOutput} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.massa.model.v1.ExecutionOutput.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getSlot();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      massa_model_v1_slot_pb.Slot.serializeBinaryToWriter
    );
  }
  f = message.getBlockId();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      google_protobuf_wrappers_pb.StringValue.serializeBinaryToWriter
    );
  }
  f = message.getEventsList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      3,
      f,
      proto.massa.model.v1.ScExecutionEvent.serializeBinaryToWriter
    );
  }
  f = message.getStateChanges();
  if (f != null) {
    writer.writeMessage(
      4,
      f,
      proto.massa.model.v1.StateChanges.serializeBinaryToWriter
    );
  }
};


/**
 * optional Slot slot = 1;
 * @return {?proto.massa.model.v1.Slot}
 */
proto.massa.model.v1.ExecutionOutput.prototype.getSlot = function() {
  return /** @type{?proto.massa.model.v1.Slot} */ (
    jspb.Message.getWrapperField(this, massa_model_v1_slot_pb.Slot, 1));
};


/**
 * @param {?proto.massa.model.v1.Slot|undefined} value
 * @return {!proto.massa.model.v1.ExecutionOutput} returns this
*/
proto.massa.model.v1.ExecutionOutput.prototype.setSlot = function(value) {
  return jspb.Message.setWrapperField(this, 1, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.massa.model.v1.ExecutionOutput} returns this
 */
proto.massa.model.v1.ExecutionOutput.prototype.clearSlot = function() {
  return this.setSlot(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.massa.model.v1.ExecutionOutput.prototype.hasSlot = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional google.protobuf.StringValue block_id = 2;
 * @return {?proto.google.protobuf.StringValue}
 */
proto.massa.model.v1.ExecutionOutput.prototype.getBlockId = function() {
  return /** @type{?proto.google.protobuf.StringValue} */ (
    jspb.Message.getWrapperField(this, google_protobuf_wrappers_pb.StringValue, 2));
};


/**
 * @param {?proto.google.protobuf.StringValue|undefined} value
 * @return {!proto.massa.model.v1.ExecutionOutput} returns this
*/
proto.massa.model.v1.ExecutionOutput.prototype.setBlockId = function(value) {
  return jspb.Message.setWrapperField(this, 2, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.massa.model.v1.ExecutionOutput} returns this
 */
proto.massa.model.v1.ExecutionOutput.prototype.clearBlockId = function() {
  return this.setBlockId(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.massa.model.v1.ExecutionOutput.prototype.hasBlockId = function() {
  return jspb.Message.getField(this, 2) != null;
};


/**
 * repeated ScExecutionEvent events = 3;
 * @return {!Array<!proto.massa.model.v1.ScExecutionEvent>}
 */
proto.massa.model.v1.ExecutionOutput.prototype.getEventsList = function() {
  return /** @type{!Array<!proto.massa.model.v1.ScExecutionEvent>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.massa.model.v1.ScExecutionEvent, 3));
};


/**
 * @param {!Array<!proto.massa.model.v1.ScExecutionEvent>} value
 * @return {!proto.massa.model.v1.ExecutionOutput} returns this
*/
proto.massa.model.v1.ExecutionOutput.prototype.setEventsList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 3, value);
};


/**
 * @param {!proto.massa.model.v1.ScExecutionEvent=} opt_value
 * @param {number=} opt_index
 * @return {!proto.massa.model.v1.ScExecutionEvent}
 */
proto.massa.model.v1.ExecutionOutput.prototype.addEvents = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 3, opt_value, proto.massa.model.v1.ScExecutionEvent, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.massa.model.v1.ExecutionOutput} returns this
 */
proto.massa.model.v1.ExecutionOutput.prototype.clearEventsList = function() {
  return this.setEventsList([]);
};


/**
 * optional StateChanges state_changes = 4;
 * @return {?proto.massa.model.v1.StateChanges}
 */
proto.massa.model.v1.ExecutionOutput.prototype.getStateChanges = function() {
  return /** @type{?proto.massa.model.v1.StateChanges} */ (
    jspb.Message.getWrapperField(this, proto.massa.model.v1.StateChanges, 4));
};


/**
 * @param {?proto.massa.model.v1.StateChanges|undefined} value
 * @return {!proto.massa.model.v1.ExecutionOutput} returns this
*/
proto.massa.model.v1.ExecutionOutput.prototype.setStateChanges = function(value) {
  return jspb.Message.setWrapperField(this, 4, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.massa.model.v1.ExecutionOutput} returns this
 */
proto.massa.model.v1.ExecutionOutput.prototype.clearStateChanges = function() {
  return this.setStateChanges(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.massa.model.v1.ExecutionOutput.prototype.hasStateChanges = function() {
  return jspb.Message.getField(this, 4) != null;
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
proto.massa.model.v1.ScExecutionEvent.prototype.toObject = function(opt_includeInstance) {
  return proto.massa.model.v1.ScExecutionEvent.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.massa.model.v1.ScExecutionEvent} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.massa.model.v1.ScExecutionEvent.toObject = function(includeInstance, msg) {
  var f, obj = {
context: (f = msg.getContext()) && proto.massa.model.v1.ScExecutionEventContext.toObject(includeInstance, f),
data: msg.getData_asB64()
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
 * @return {!proto.massa.model.v1.ScExecutionEvent}
 */
proto.massa.model.v1.ScExecutionEvent.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.massa.model.v1.ScExecutionEvent;
  return proto.massa.model.v1.ScExecutionEvent.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.massa.model.v1.ScExecutionEvent} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.massa.model.v1.ScExecutionEvent}
 */
proto.massa.model.v1.ScExecutionEvent.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.massa.model.v1.ScExecutionEventContext;
      reader.readMessage(value,proto.massa.model.v1.ScExecutionEventContext.deserializeBinaryFromReader);
      msg.setContext(value);
      break;
    case 2:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setData(value);
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
proto.massa.model.v1.ScExecutionEvent.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.massa.model.v1.ScExecutionEvent.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.massa.model.v1.ScExecutionEvent} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.massa.model.v1.ScExecutionEvent.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getContext();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      proto.massa.model.v1.ScExecutionEventContext.serializeBinaryToWriter
    );
  }
  f = message.getData_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      2,
      f
    );
  }
};


/**
 * optional ScExecutionEventContext context = 1;
 * @return {?proto.massa.model.v1.ScExecutionEventContext}
 */
proto.massa.model.v1.ScExecutionEvent.prototype.getContext = function() {
  return /** @type{?proto.massa.model.v1.ScExecutionEventContext} */ (
    jspb.Message.getWrapperField(this, proto.massa.model.v1.ScExecutionEventContext, 1));
};


/**
 * @param {?proto.massa.model.v1.ScExecutionEventContext|undefined} value
 * @return {!proto.massa.model.v1.ScExecutionEvent} returns this
*/
proto.massa.model.v1.ScExecutionEvent.prototype.setContext = function(value) {
  return jspb.Message.setWrapperField(this, 1, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.massa.model.v1.ScExecutionEvent} returns this
 */
proto.massa.model.v1.ScExecutionEvent.prototype.clearContext = function() {
  return this.setContext(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.massa.model.v1.ScExecutionEvent.prototype.hasContext = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional bytes data = 2;
 * @return {string}
 */
proto.massa.model.v1.ScExecutionEvent.prototype.getData = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * optional bytes data = 2;
 * This is a type-conversion wrapper around `getData()`
 * @return {string}
 */
proto.massa.model.v1.ScExecutionEvent.prototype.getData_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getData()));
};


/**
 * optional bytes data = 2;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getData()`
 * @return {!Uint8Array}
 */
proto.massa.model.v1.ScExecutionEvent.prototype.getData_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getData()));
};


/**
 * @param {!(string|Uint8Array)} value
 * @return {!proto.massa.model.v1.ScExecutionEvent} returns this
 */
proto.massa.model.v1.ScExecutionEvent.prototype.setData = function(value) {
  return jspb.Message.setProto3BytesField(this, 2, value);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.massa.model.v1.ScExecutionEventContext.repeatedFields_ = [4];



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
proto.massa.model.v1.ScExecutionEventContext.prototype.toObject = function(opt_includeInstance) {
  return proto.massa.model.v1.ScExecutionEventContext.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.massa.model.v1.ScExecutionEventContext} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.massa.model.v1.ScExecutionEventContext.toObject = function(includeInstance, msg) {
  var f, obj = {
originSlot: (f = msg.getOriginSlot()) && massa_model_v1_slot_pb.Slot.toObject(includeInstance, f),
blockId: (f = msg.getBlockId()) && google_protobuf_wrappers_pb.StringValue.toObject(includeInstance, f),
indexInSlot: jspb.Message.getFieldWithDefault(msg, 3, 0),
callStackList: (f = jspb.Message.getRepeatedField(msg, 4)) == null ? undefined : f,
originOperationId: (f = msg.getOriginOperationId()) && google_protobuf_wrappers_pb.StringValue.toObject(includeInstance, f),
isFailure: jspb.Message.getBooleanFieldWithDefault(msg, 6, false),
status: jspb.Message.getFieldWithDefault(msg, 7, 0)
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
 * @return {!proto.massa.model.v1.ScExecutionEventContext}
 */
proto.massa.model.v1.ScExecutionEventContext.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.massa.model.v1.ScExecutionEventContext;
  return proto.massa.model.v1.ScExecutionEventContext.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.massa.model.v1.ScExecutionEventContext} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.massa.model.v1.ScExecutionEventContext}
 */
proto.massa.model.v1.ScExecutionEventContext.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new massa_model_v1_slot_pb.Slot;
      reader.readMessage(value,massa_model_v1_slot_pb.Slot.deserializeBinaryFromReader);
      msg.setOriginSlot(value);
      break;
    case 2:
      var value = new google_protobuf_wrappers_pb.StringValue;
      reader.readMessage(value,google_protobuf_wrappers_pb.StringValue.deserializeBinaryFromReader);
      msg.setBlockId(value);
      break;
    case 3:
      var value = /** @type {number} */ (reader.readUint64());
      msg.setIndexInSlot(value);
      break;
    case 4:
      var value = /** @type {string} */ (reader.readString());
      msg.addCallStack(value);
      break;
    case 5:
      var value = new google_protobuf_wrappers_pb.StringValue;
      reader.readMessage(value,google_protobuf_wrappers_pb.StringValue.deserializeBinaryFromReader);
      msg.setOriginOperationId(value);
      break;
    case 6:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setIsFailure(value);
      break;
    case 7:
      var value = /** @type {!proto.massa.model.v1.ScExecutionEventStatus} */ (reader.readEnum());
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
proto.massa.model.v1.ScExecutionEventContext.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.massa.model.v1.ScExecutionEventContext.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.massa.model.v1.ScExecutionEventContext} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.massa.model.v1.ScExecutionEventContext.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getOriginSlot();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      massa_model_v1_slot_pb.Slot.serializeBinaryToWriter
    );
  }
  f = message.getBlockId();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      google_protobuf_wrappers_pb.StringValue.serializeBinaryToWriter
    );
  }
  f = message.getIndexInSlot();
  if (f !== 0) {
    writer.writeUint64(
      3,
      f
    );
  }
  f = message.getCallStackList();
  if (f.length > 0) {
    writer.writeRepeatedString(
      4,
      f
    );
  }
  f = message.getOriginOperationId();
  if (f != null) {
    writer.writeMessage(
      5,
      f,
      google_protobuf_wrappers_pb.StringValue.serializeBinaryToWriter
    );
  }
  f = message.getIsFailure();
  if (f) {
    writer.writeBool(
      6,
      f
    );
  }
  f = message.getStatus();
  if (f !== 0.0) {
    writer.writeEnum(
      7,
      f
    );
  }
};


/**
 * optional Slot origin_slot = 1;
 * @return {?proto.massa.model.v1.Slot}
 */
proto.massa.model.v1.ScExecutionEventContext.prototype.getOriginSlot = function() {
  return /** @type{?proto.massa.model.v1.Slot} */ (
    jspb.Message.getWrapperField(this, massa_model_v1_slot_pb.Slot, 1));
};


/**
 * @param {?proto.massa.model.v1.Slot|undefined} value
 * @return {!proto.massa.model.v1.ScExecutionEventContext} returns this
*/
proto.massa.model.v1.ScExecutionEventContext.prototype.setOriginSlot = function(value) {
  return jspb.Message.setWrapperField(this, 1, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.massa.model.v1.ScExecutionEventContext} returns this
 */
proto.massa.model.v1.ScExecutionEventContext.prototype.clearOriginSlot = function() {
  return this.setOriginSlot(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.massa.model.v1.ScExecutionEventContext.prototype.hasOriginSlot = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional google.protobuf.StringValue block_id = 2;
 * @return {?proto.google.protobuf.StringValue}
 */
proto.massa.model.v1.ScExecutionEventContext.prototype.getBlockId = function() {
  return /** @type{?proto.google.protobuf.StringValue} */ (
    jspb.Message.getWrapperField(this, google_protobuf_wrappers_pb.StringValue, 2));
};


/**
 * @param {?proto.google.protobuf.StringValue|undefined} value
 * @return {!proto.massa.model.v1.ScExecutionEventContext} returns this
*/
proto.massa.model.v1.ScExecutionEventContext.prototype.setBlockId = function(value) {
  return jspb.Message.setWrapperField(this, 2, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.massa.model.v1.ScExecutionEventContext} returns this
 */
proto.massa.model.v1.ScExecutionEventContext.prototype.clearBlockId = function() {
  return this.setBlockId(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.massa.model.v1.ScExecutionEventContext.prototype.hasBlockId = function() {
  return jspb.Message.getField(this, 2) != null;
};


/**
 * optional uint64 index_in_slot = 3;
 * @return {number}
 */
proto.massa.model.v1.ScExecutionEventContext.prototype.getIndexInSlot = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 3, 0));
};


/**
 * @param {number} value
 * @return {!proto.massa.model.v1.ScExecutionEventContext} returns this
 */
proto.massa.model.v1.ScExecutionEventContext.prototype.setIndexInSlot = function(value) {
  return jspb.Message.setProto3IntField(this, 3, value);
};


/**
 * repeated string call_stack = 4;
 * @return {!Array<string>}
 */
proto.massa.model.v1.ScExecutionEventContext.prototype.getCallStackList = function() {
  return /** @type {!Array<string>} */ (jspb.Message.getRepeatedField(this, 4));
};


/**
 * @param {!Array<string>} value
 * @return {!proto.massa.model.v1.ScExecutionEventContext} returns this
 */
proto.massa.model.v1.ScExecutionEventContext.prototype.setCallStackList = function(value) {
  return jspb.Message.setField(this, 4, value || []);
};


/**
 * @param {string} value
 * @param {number=} opt_index
 * @return {!proto.massa.model.v1.ScExecutionEventContext} returns this
 */
proto.massa.model.v1.ScExecutionEventContext.prototype.addCallStack = function(value, opt_index) {
  return jspb.Message.addToRepeatedField(this, 4, value, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.massa.model.v1.ScExecutionEventContext} returns this
 */
proto.massa.model.v1.ScExecutionEventContext.prototype.clearCallStackList = function() {
  return this.setCallStackList([]);
};


/**
 * optional google.protobuf.StringValue origin_operation_id = 5;
 * @return {?proto.google.protobuf.StringValue}
 */
proto.massa.model.v1.ScExecutionEventContext.prototype.getOriginOperationId = function() {
  return /** @type{?proto.google.protobuf.StringValue} */ (
    jspb.Message.getWrapperField(this, google_protobuf_wrappers_pb.StringValue, 5));
};


/**
 * @param {?proto.google.protobuf.StringValue|undefined} value
 * @return {!proto.massa.model.v1.ScExecutionEventContext} returns this
*/
proto.massa.model.v1.ScExecutionEventContext.prototype.setOriginOperationId = function(value) {
  return jspb.Message.setWrapperField(this, 5, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.massa.model.v1.ScExecutionEventContext} returns this
 */
proto.massa.model.v1.ScExecutionEventContext.prototype.clearOriginOperationId = function() {
  return this.setOriginOperationId(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.massa.model.v1.ScExecutionEventContext.prototype.hasOriginOperationId = function() {
  return jspb.Message.getField(this, 5) != null;
};


/**
 * optional bool is_failure = 6;
 * @return {boolean}
 */
proto.massa.model.v1.ScExecutionEventContext.prototype.getIsFailure = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 6, false));
};


/**
 * @param {boolean} value
 * @return {!proto.massa.model.v1.ScExecutionEventContext} returns this
 */
proto.massa.model.v1.ScExecutionEventContext.prototype.setIsFailure = function(value) {
  return jspb.Message.setProto3BooleanField(this, 6, value);
};


/**
 * optional ScExecutionEventStatus status = 7;
 * @return {!proto.massa.model.v1.ScExecutionEventStatus}
 */
proto.massa.model.v1.ScExecutionEventContext.prototype.getStatus = function() {
  return /** @type {!proto.massa.model.v1.ScExecutionEventStatus} */ (jspb.Message.getFieldWithDefault(this, 7, 0));
};


/**
 * @param {!proto.massa.model.v1.ScExecutionEventStatus} value
 * @return {!proto.massa.model.v1.ScExecutionEventContext} returns this
 */
proto.massa.model.v1.ScExecutionEventContext.prototype.setStatus = function(value) {
  return jspb.Message.setProto3EnumField(this, 7, value);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.massa.model.v1.ScExecutionEventsStatus.repeatedFields_ = [1];



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
proto.massa.model.v1.ScExecutionEventsStatus.prototype.toObject = function(opt_includeInstance) {
  return proto.massa.model.v1.ScExecutionEventsStatus.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.massa.model.v1.ScExecutionEventsStatus} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.massa.model.v1.ScExecutionEventsStatus.toObject = function(includeInstance, msg) {
  var f, obj = {
statusList: (f = jspb.Message.getRepeatedField(msg, 1)) == null ? undefined : f
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
 * @return {!proto.massa.model.v1.ScExecutionEventsStatus}
 */
proto.massa.model.v1.ScExecutionEventsStatus.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.massa.model.v1.ScExecutionEventsStatus;
  return proto.massa.model.v1.ScExecutionEventsStatus.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.massa.model.v1.ScExecutionEventsStatus} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.massa.model.v1.ScExecutionEventsStatus}
 */
proto.massa.model.v1.ScExecutionEventsStatus.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var values = /** @type {!Array<!proto.massa.model.v1.ScExecutionEventStatus>} */ (reader.isDelimited() ? reader.readPackedEnum() : [reader.readEnum()]);
      for (var i = 0; i < values.length; i++) {
        msg.addStatus(values[i]);
      }
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
proto.massa.model.v1.ScExecutionEventsStatus.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.massa.model.v1.ScExecutionEventsStatus.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.massa.model.v1.ScExecutionEventsStatus} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.massa.model.v1.ScExecutionEventsStatus.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getStatusList();
  if (f.length > 0) {
    writer.writePackedEnum(
      1,
      f
    );
  }
};


/**
 * repeated ScExecutionEventStatus status = 1;
 * @return {!Array<!proto.massa.model.v1.ScExecutionEventStatus>}
 */
proto.massa.model.v1.ScExecutionEventsStatus.prototype.getStatusList = function() {
  return /** @type {!Array<!proto.massa.model.v1.ScExecutionEventStatus>} */ (jspb.Message.getRepeatedField(this, 1));
};


/**
 * @param {!Array<!proto.massa.model.v1.ScExecutionEventStatus>} value
 * @return {!proto.massa.model.v1.ScExecutionEventsStatus} returns this
 */
proto.massa.model.v1.ScExecutionEventsStatus.prototype.setStatusList = function(value) {
  return jspb.Message.setField(this, 1, value || []);
};


/**
 * @param {!proto.massa.model.v1.ScExecutionEventStatus} value
 * @param {number=} opt_index
 * @return {!proto.massa.model.v1.ScExecutionEventsStatus} returns this
 */
proto.massa.model.v1.ScExecutionEventsStatus.prototype.addStatus = function(value, opt_index) {
  return jspb.Message.addToRepeatedField(this, 1, value, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.massa.model.v1.ScExecutionEventsStatus} returns this
 */
proto.massa.model.v1.ScExecutionEventsStatus.prototype.clearStatusList = function() {
  return this.setStatusList([]);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.massa.model.v1.StateChanges.repeatedFields_ = [1,2,4,5];



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
proto.massa.model.v1.StateChanges.prototype.toObject = function(opt_includeInstance) {
  return proto.massa.model.v1.StateChanges.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.massa.model.v1.StateChanges} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.massa.model.v1.StateChanges.toObject = function(includeInstance, msg) {
  var f, obj = {
ledgerChangesList: jspb.Message.toObjectList(msg.getLedgerChangesList(),
    proto.massa.model.v1.LedgerChangeEntry.toObject, includeInstance),
asyncPoolChangesList: jspb.Message.toObjectList(msg.getAsyncPoolChangesList(),
    proto.massa.model.v1.AsyncPoolChangeEntry.toObject, includeInstance),
executedOpsChangesList: jspb.Message.toObjectList(msg.getExecutedOpsChangesList(),
    proto.massa.model.v1.ExecutedOpsChangeEntry.toObject, includeInstance),
executedDenunciationsChangesList: jspb.Message.toObjectList(msg.getExecutedDenunciationsChangesList(),
    massa_model_v1_denunciation_pb.DenunciationIndex.toObject, includeInstance),
executionTrailHashChange: (f = msg.getExecutionTrailHashChange()) && proto.massa.model.v1.SetOrKeepString.toObject(includeInstance, f)
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
 * @return {!proto.massa.model.v1.StateChanges}
 */
proto.massa.model.v1.StateChanges.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.massa.model.v1.StateChanges;
  return proto.massa.model.v1.StateChanges.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.massa.model.v1.StateChanges} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.massa.model.v1.StateChanges}
 */
proto.massa.model.v1.StateChanges.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.massa.model.v1.LedgerChangeEntry;
      reader.readMessage(value,proto.massa.model.v1.LedgerChangeEntry.deserializeBinaryFromReader);
      msg.addLedgerChanges(value);
      break;
    case 2:
      var value = new proto.massa.model.v1.AsyncPoolChangeEntry;
      reader.readMessage(value,proto.massa.model.v1.AsyncPoolChangeEntry.deserializeBinaryFromReader);
      msg.addAsyncPoolChanges(value);
      break;
    case 4:
      var value = new proto.massa.model.v1.ExecutedOpsChangeEntry;
      reader.readMessage(value,proto.massa.model.v1.ExecutedOpsChangeEntry.deserializeBinaryFromReader);
      msg.addExecutedOpsChanges(value);
      break;
    case 5:
      var value = new massa_model_v1_denunciation_pb.DenunciationIndex;
      reader.readMessage(value,massa_model_v1_denunciation_pb.DenunciationIndex.deserializeBinaryFromReader);
      msg.addExecutedDenunciationsChanges(value);
      break;
    case 6:
      var value = new proto.massa.model.v1.SetOrKeepString;
      reader.readMessage(value,proto.massa.model.v1.SetOrKeepString.deserializeBinaryFromReader);
      msg.setExecutionTrailHashChange(value);
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
proto.massa.model.v1.StateChanges.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.massa.model.v1.StateChanges.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.massa.model.v1.StateChanges} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.massa.model.v1.StateChanges.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getLedgerChangesList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      1,
      f,
      proto.massa.model.v1.LedgerChangeEntry.serializeBinaryToWriter
    );
  }
  f = message.getAsyncPoolChangesList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      2,
      f,
      proto.massa.model.v1.AsyncPoolChangeEntry.serializeBinaryToWriter
    );
  }
  f = message.getExecutedOpsChangesList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      4,
      f,
      proto.massa.model.v1.ExecutedOpsChangeEntry.serializeBinaryToWriter
    );
  }
  f = message.getExecutedDenunciationsChangesList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      5,
      f,
      massa_model_v1_denunciation_pb.DenunciationIndex.serializeBinaryToWriter
    );
  }
  f = message.getExecutionTrailHashChange();
  if (f != null) {
    writer.writeMessage(
      6,
      f,
      proto.massa.model.v1.SetOrKeepString.serializeBinaryToWriter
    );
  }
};


/**
 * repeated LedgerChangeEntry ledger_changes = 1;
 * @return {!Array<!proto.massa.model.v1.LedgerChangeEntry>}
 */
proto.massa.model.v1.StateChanges.prototype.getLedgerChangesList = function() {
  return /** @type{!Array<!proto.massa.model.v1.LedgerChangeEntry>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.massa.model.v1.LedgerChangeEntry, 1));
};


/**
 * @param {!Array<!proto.massa.model.v1.LedgerChangeEntry>} value
 * @return {!proto.massa.model.v1.StateChanges} returns this
*/
proto.massa.model.v1.StateChanges.prototype.setLedgerChangesList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 1, value);
};


/**
 * @param {!proto.massa.model.v1.LedgerChangeEntry=} opt_value
 * @param {number=} opt_index
 * @return {!proto.massa.model.v1.LedgerChangeEntry}
 */
proto.massa.model.v1.StateChanges.prototype.addLedgerChanges = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 1, opt_value, proto.massa.model.v1.LedgerChangeEntry, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.massa.model.v1.StateChanges} returns this
 */
proto.massa.model.v1.StateChanges.prototype.clearLedgerChangesList = function() {
  return this.setLedgerChangesList([]);
};


/**
 * repeated AsyncPoolChangeEntry async_pool_changes = 2;
 * @return {!Array<!proto.massa.model.v1.AsyncPoolChangeEntry>}
 */
proto.massa.model.v1.StateChanges.prototype.getAsyncPoolChangesList = function() {
  return /** @type{!Array<!proto.massa.model.v1.AsyncPoolChangeEntry>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.massa.model.v1.AsyncPoolChangeEntry, 2));
};


/**
 * @param {!Array<!proto.massa.model.v1.AsyncPoolChangeEntry>} value
 * @return {!proto.massa.model.v1.StateChanges} returns this
*/
proto.massa.model.v1.StateChanges.prototype.setAsyncPoolChangesList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 2, value);
};


/**
 * @param {!proto.massa.model.v1.AsyncPoolChangeEntry=} opt_value
 * @param {number=} opt_index
 * @return {!proto.massa.model.v1.AsyncPoolChangeEntry}
 */
proto.massa.model.v1.StateChanges.prototype.addAsyncPoolChanges = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 2, opt_value, proto.massa.model.v1.AsyncPoolChangeEntry, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.massa.model.v1.StateChanges} returns this
 */
proto.massa.model.v1.StateChanges.prototype.clearAsyncPoolChangesList = function() {
  return this.setAsyncPoolChangesList([]);
};


/**
 * repeated ExecutedOpsChangeEntry executed_ops_changes = 4;
 * @return {!Array<!proto.massa.model.v1.ExecutedOpsChangeEntry>}
 */
proto.massa.model.v1.StateChanges.prototype.getExecutedOpsChangesList = function() {
  return /** @type{!Array<!proto.massa.model.v1.ExecutedOpsChangeEntry>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.massa.model.v1.ExecutedOpsChangeEntry, 4));
};


/**
 * @param {!Array<!proto.massa.model.v1.ExecutedOpsChangeEntry>} value
 * @return {!proto.massa.model.v1.StateChanges} returns this
*/
proto.massa.model.v1.StateChanges.prototype.setExecutedOpsChangesList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 4, value);
};


/**
 * @param {!proto.massa.model.v1.ExecutedOpsChangeEntry=} opt_value
 * @param {number=} opt_index
 * @return {!proto.massa.model.v1.ExecutedOpsChangeEntry}
 */
proto.massa.model.v1.StateChanges.prototype.addExecutedOpsChanges = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 4, opt_value, proto.massa.model.v1.ExecutedOpsChangeEntry, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.massa.model.v1.StateChanges} returns this
 */
proto.massa.model.v1.StateChanges.prototype.clearExecutedOpsChangesList = function() {
  return this.setExecutedOpsChangesList([]);
};


/**
 * repeated DenunciationIndex executed_denunciations_changes = 5;
 * @return {!Array<!proto.massa.model.v1.DenunciationIndex>}
 */
proto.massa.model.v1.StateChanges.prototype.getExecutedDenunciationsChangesList = function() {
  return /** @type{!Array<!proto.massa.model.v1.DenunciationIndex>} */ (
    jspb.Message.getRepeatedWrapperField(this, massa_model_v1_denunciation_pb.DenunciationIndex, 5));
};


/**
 * @param {!Array<!proto.massa.model.v1.DenunciationIndex>} value
 * @return {!proto.massa.model.v1.StateChanges} returns this
*/
proto.massa.model.v1.StateChanges.prototype.setExecutedDenunciationsChangesList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 5, value);
};


/**
 * @param {!proto.massa.model.v1.DenunciationIndex=} opt_value
 * @param {number=} opt_index
 * @return {!proto.massa.model.v1.DenunciationIndex}
 */
proto.massa.model.v1.StateChanges.prototype.addExecutedDenunciationsChanges = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 5, opt_value, proto.massa.model.v1.DenunciationIndex, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.massa.model.v1.StateChanges} returns this
 */
proto.massa.model.v1.StateChanges.prototype.clearExecutedDenunciationsChangesList = function() {
  return this.setExecutedDenunciationsChangesList([]);
};


/**
 * optional SetOrKeepString execution_trail_hash_change = 6;
 * @return {?proto.massa.model.v1.SetOrKeepString}
 */
proto.massa.model.v1.StateChanges.prototype.getExecutionTrailHashChange = function() {
  return /** @type{?proto.massa.model.v1.SetOrKeepString} */ (
    jspb.Message.getWrapperField(this, proto.massa.model.v1.SetOrKeepString, 6));
};


/**
 * @param {?proto.massa.model.v1.SetOrKeepString|undefined} value
 * @return {!proto.massa.model.v1.StateChanges} returns this
*/
proto.massa.model.v1.StateChanges.prototype.setExecutionTrailHashChange = function(value) {
  return jspb.Message.setWrapperField(this, 6, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.massa.model.v1.StateChanges} returns this
 */
proto.massa.model.v1.StateChanges.prototype.clearExecutionTrailHashChange = function() {
  return this.setExecutionTrailHashChange(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.massa.model.v1.StateChanges.prototype.hasExecutionTrailHashChange = function() {
  return jspb.Message.getField(this, 6) != null;
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
proto.massa.model.v1.ExecutedOpsChangeEntry.prototype.toObject = function(opt_includeInstance) {
  return proto.massa.model.v1.ExecutedOpsChangeEntry.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.massa.model.v1.ExecutedOpsChangeEntry} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.massa.model.v1.ExecutedOpsChangeEntry.toObject = function(includeInstance, msg) {
  var f, obj = {
operationId: jspb.Message.getFieldWithDefault(msg, 1, ""),
value: (f = msg.getValue()) && proto.massa.model.v1.ExecutedOpsChangeValue.toObject(includeInstance, f)
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
 * @return {!proto.massa.model.v1.ExecutedOpsChangeEntry}
 */
proto.massa.model.v1.ExecutedOpsChangeEntry.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.massa.model.v1.ExecutedOpsChangeEntry;
  return proto.massa.model.v1.ExecutedOpsChangeEntry.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.massa.model.v1.ExecutedOpsChangeEntry} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.massa.model.v1.ExecutedOpsChangeEntry}
 */
proto.massa.model.v1.ExecutedOpsChangeEntry.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setOperationId(value);
      break;
    case 2:
      var value = new proto.massa.model.v1.ExecutedOpsChangeValue;
      reader.readMessage(value,proto.massa.model.v1.ExecutedOpsChangeValue.deserializeBinaryFromReader);
      msg.setValue(value);
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
proto.massa.model.v1.ExecutedOpsChangeEntry.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.massa.model.v1.ExecutedOpsChangeEntry.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.massa.model.v1.ExecutedOpsChangeEntry} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.massa.model.v1.ExecutedOpsChangeEntry.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getOperationId();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getValue();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      proto.massa.model.v1.ExecutedOpsChangeValue.serializeBinaryToWriter
    );
  }
};


/**
 * optional string operation_id = 1;
 * @return {string}
 */
proto.massa.model.v1.ExecutedOpsChangeEntry.prototype.getOperationId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.massa.model.v1.ExecutedOpsChangeEntry} returns this
 */
proto.massa.model.v1.ExecutedOpsChangeEntry.prototype.setOperationId = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional ExecutedOpsChangeValue value = 2;
 * @return {?proto.massa.model.v1.ExecutedOpsChangeValue}
 */
proto.massa.model.v1.ExecutedOpsChangeEntry.prototype.getValue = function() {
  return /** @type{?proto.massa.model.v1.ExecutedOpsChangeValue} */ (
    jspb.Message.getWrapperField(this, proto.massa.model.v1.ExecutedOpsChangeValue, 2));
};


/**
 * @param {?proto.massa.model.v1.ExecutedOpsChangeValue|undefined} value
 * @return {!proto.massa.model.v1.ExecutedOpsChangeEntry} returns this
*/
proto.massa.model.v1.ExecutedOpsChangeEntry.prototype.setValue = function(value) {
  return jspb.Message.setWrapperField(this, 2, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.massa.model.v1.ExecutedOpsChangeEntry} returns this
 */
proto.massa.model.v1.ExecutedOpsChangeEntry.prototype.clearValue = function() {
  return this.setValue(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.massa.model.v1.ExecutedOpsChangeEntry.prototype.hasValue = function() {
  return jspb.Message.getField(this, 2) != null;
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
proto.massa.model.v1.ExecutedOpsChangeValue.prototype.toObject = function(opt_includeInstance) {
  return proto.massa.model.v1.ExecutedOpsChangeValue.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.massa.model.v1.ExecutedOpsChangeValue} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.massa.model.v1.ExecutedOpsChangeValue.toObject = function(includeInstance, msg) {
  var f, obj = {
status: jspb.Message.getFieldWithDefault(msg, 1, 0),
slot: (f = msg.getSlot()) && massa_model_v1_slot_pb.Slot.toObject(includeInstance, f)
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
 * @return {!proto.massa.model.v1.ExecutedOpsChangeValue}
 */
proto.massa.model.v1.ExecutedOpsChangeValue.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.massa.model.v1.ExecutedOpsChangeValue;
  return proto.massa.model.v1.ExecutedOpsChangeValue.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.massa.model.v1.ExecutedOpsChangeValue} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.massa.model.v1.ExecutedOpsChangeValue}
 */
proto.massa.model.v1.ExecutedOpsChangeValue.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {!proto.massa.model.v1.OperationExecutionStatus} */ (reader.readEnum());
      msg.setStatus(value);
      break;
    case 2:
      var value = new massa_model_v1_slot_pb.Slot;
      reader.readMessage(value,massa_model_v1_slot_pb.Slot.deserializeBinaryFromReader);
      msg.setSlot(value);
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
proto.massa.model.v1.ExecutedOpsChangeValue.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.massa.model.v1.ExecutedOpsChangeValue.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.massa.model.v1.ExecutedOpsChangeValue} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.massa.model.v1.ExecutedOpsChangeValue.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getStatus();
  if (f !== 0.0) {
    writer.writeEnum(
      1,
      f
    );
  }
  f = message.getSlot();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      massa_model_v1_slot_pb.Slot.serializeBinaryToWriter
    );
  }
};


/**
 * optional OperationExecutionStatus status = 1;
 * @return {!proto.massa.model.v1.OperationExecutionStatus}
 */
proto.massa.model.v1.ExecutedOpsChangeValue.prototype.getStatus = function() {
  return /** @type {!proto.massa.model.v1.OperationExecutionStatus} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {!proto.massa.model.v1.OperationExecutionStatus} value
 * @return {!proto.massa.model.v1.ExecutedOpsChangeValue} returns this
 */
proto.massa.model.v1.ExecutedOpsChangeValue.prototype.setStatus = function(value) {
  return jspb.Message.setProto3EnumField(this, 1, value);
};


/**
 * optional Slot slot = 2;
 * @return {?proto.massa.model.v1.Slot}
 */
proto.massa.model.v1.ExecutedOpsChangeValue.prototype.getSlot = function() {
  return /** @type{?proto.massa.model.v1.Slot} */ (
    jspb.Message.getWrapperField(this, massa_model_v1_slot_pb.Slot, 2));
};


/**
 * @param {?proto.massa.model.v1.Slot|undefined} value
 * @return {!proto.massa.model.v1.ExecutedOpsChangeValue} returns this
*/
proto.massa.model.v1.ExecutedOpsChangeValue.prototype.setSlot = function(value) {
  return jspb.Message.setWrapperField(this, 2, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.massa.model.v1.ExecutedOpsChangeValue} returns this
 */
proto.massa.model.v1.ExecutedOpsChangeValue.prototype.clearSlot = function() {
  return this.setSlot(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.massa.model.v1.ExecutedOpsChangeValue.prototype.hasSlot = function() {
  return jspb.Message.getField(this, 2) != null;
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
proto.massa.model.v1.AsyncPoolChangeEntry.prototype.toObject = function(opt_includeInstance) {
  return proto.massa.model.v1.AsyncPoolChangeEntry.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.massa.model.v1.AsyncPoolChangeEntry} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.massa.model.v1.AsyncPoolChangeEntry.toObject = function(includeInstance, msg) {
  var f, obj = {
asyncMessageId: jspb.Message.getFieldWithDefault(msg, 1, ""),
value: (f = msg.getValue()) && proto.massa.model.v1.AsyncPoolChangeValue.toObject(includeInstance, f)
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
 * @return {!proto.massa.model.v1.AsyncPoolChangeEntry}
 */
proto.massa.model.v1.AsyncPoolChangeEntry.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.massa.model.v1.AsyncPoolChangeEntry;
  return proto.massa.model.v1.AsyncPoolChangeEntry.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.massa.model.v1.AsyncPoolChangeEntry} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.massa.model.v1.AsyncPoolChangeEntry}
 */
proto.massa.model.v1.AsyncPoolChangeEntry.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setAsyncMessageId(value);
      break;
    case 2:
      var value = new proto.massa.model.v1.AsyncPoolChangeValue;
      reader.readMessage(value,proto.massa.model.v1.AsyncPoolChangeValue.deserializeBinaryFromReader);
      msg.setValue(value);
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
proto.massa.model.v1.AsyncPoolChangeEntry.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.massa.model.v1.AsyncPoolChangeEntry.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.massa.model.v1.AsyncPoolChangeEntry} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.massa.model.v1.AsyncPoolChangeEntry.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getAsyncMessageId();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getValue();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      proto.massa.model.v1.AsyncPoolChangeValue.serializeBinaryToWriter
    );
  }
};


/**
 * optional string async_message_id = 1;
 * @return {string}
 */
proto.massa.model.v1.AsyncPoolChangeEntry.prototype.getAsyncMessageId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.massa.model.v1.AsyncPoolChangeEntry} returns this
 */
proto.massa.model.v1.AsyncPoolChangeEntry.prototype.setAsyncMessageId = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional AsyncPoolChangeValue value = 2;
 * @return {?proto.massa.model.v1.AsyncPoolChangeValue}
 */
proto.massa.model.v1.AsyncPoolChangeEntry.prototype.getValue = function() {
  return /** @type{?proto.massa.model.v1.AsyncPoolChangeValue} */ (
    jspb.Message.getWrapperField(this, proto.massa.model.v1.AsyncPoolChangeValue, 2));
};


/**
 * @param {?proto.massa.model.v1.AsyncPoolChangeValue|undefined} value
 * @return {!proto.massa.model.v1.AsyncPoolChangeEntry} returns this
*/
proto.massa.model.v1.AsyncPoolChangeEntry.prototype.setValue = function(value) {
  return jspb.Message.setWrapperField(this, 2, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.massa.model.v1.AsyncPoolChangeEntry} returns this
 */
proto.massa.model.v1.AsyncPoolChangeEntry.prototype.clearValue = function() {
  return this.setValue(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.massa.model.v1.AsyncPoolChangeEntry.prototype.hasValue = function() {
  return jspb.Message.getField(this, 2) != null;
};



/**
 * Oneof group definitions for this message. Each group defines the field
 * numbers belonging to that group. When of these fields' value is set, all
 * other fields in the group are cleared. During deserialization, if multiple
 * fields are encountered for a group, only the last value seen will be kept.
 * @private {!Array<!Array<number>>}
 * @const
 */
proto.massa.model.v1.AsyncPoolChangeValue.oneofGroups_ = [[2,3]];

/**
 * @enum {number}
 */
proto.massa.model.v1.AsyncPoolChangeValue.MessageCase = {
  MESSAGE_NOT_SET: 0,
  CREATED_MESSAGE: 2,
  UPDATED_MESSAGE: 3
};

/**
 * @return {proto.massa.model.v1.AsyncPoolChangeValue.MessageCase}
 */
proto.massa.model.v1.AsyncPoolChangeValue.prototype.getMessageCase = function() {
  return /** @type {proto.massa.model.v1.AsyncPoolChangeValue.MessageCase} */(jspb.Message.computeOneofCase(this, proto.massa.model.v1.AsyncPoolChangeValue.oneofGroups_[0]));
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
proto.massa.model.v1.AsyncPoolChangeValue.prototype.toObject = function(opt_includeInstance) {
  return proto.massa.model.v1.AsyncPoolChangeValue.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.massa.model.v1.AsyncPoolChangeValue} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.massa.model.v1.AsyncPoolChangeValue.toObject = function(includeInstance, msg) {
  var f, obj = {
type: jspb.Message.getFieldWithDefault(msg, 1, 0),
createdMessage: (f = msg.getCreatedMessage()) && proto.massa.model.v1.AsyncMessage.toObject(includeInstance, f),
updatedMessage: (f = msg.getUpdatedMessage()) && proto.massa.model.v1.AsyncMessageUpdate.toObject(includeInstance, f)
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
 * @return {!proto.massa.model.v1.AsyncPoolChangeValue}
 */
proto.massa.model.v1.AsyncPoolChangeValue.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.massa.model.v1.AsyncPoolChangeValue;
  return proto.massa.model.v1.AsyncPoolChangeValue.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.massa.model.v1.AsyncPoolChangeValue} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.massa.model.v1.AsyncPoolChangeValue}
 */
proto.massa.model.v1.AsyncPoolChangeValue.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {!proto.massa.model.v1.AsyncPoolChangeType} */ (reader.readEnum());
      msg.setType(value);
      break;
    case 2:
      var value = new proto.massa.model.v1.AsyncMessage;
      reader.readMessage(value,proto.massa.model.v1.AsyncMessage.deserializeBinaryFromReader);
      msg.setCreatedMessage(value);
      break;
    case 3:
      var value = new proto.massa.model.v1.AsyncMessageUpdate;
      reader.readMessage(value,proto.massa.model.v1.AsyncMessageUpdate.deserializeBinaryFromReader);
      msg.setUpdatedMessage(value);
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
proto.massa.model.v1.AsyncPoolChangeValue.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.massa.model.v1.AsyncPoolChangeValue.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.massa.model.v1.AsyncPoolChangeValue} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.massa.model.v1.AsyncPoolChangeValue.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getType();
  if (f !== 0.0) {
    writer.writeEnum(
      1,
      f
    );
  }
  f = message.getCreatedMessage();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      proto.massa.model.v1.AsyncMessage.serializeBinaryToWriter
    );
  }
  f = message.getUpdatedMessage();
  if (f != null) {
    writer.writeMessage(
      3,
      f,
      proto.massa.model.v1.AsyncMessageUpdate.serializeBinaryToWriter
    );
  }
};


/**
 * optional AsyncPoolChangeType type = 1;
 * @return {!proto.massa.model.v1.AsyncPoolChangeType}
 */
proto.massa.model.v1.AsyncPoolChangeValue.prototype.getType = function() {
  return /** @type {!proto.massa.model.v1.AsyncPoolChangeType} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {!proto.massa.model.v1.AsyncPoolChangeType} value
 * @return {!proto.massa.model.v1.AsyncPoolChangeValue} returns this
 */
proto.massa.model.v1.AsyncPoolChangeValue.prototype.setType = function(value) {
  return jspb.Message.setProto3EnumField(this, 1, value);
};


/**
 * optional AsyncMessage created_message = 2;
 * @return {?proto.massa.model.v1.AsyncMessage}
 */
proto.massa.model.v1.AsyncPoolChangeValue.prototype.getCreatedMessage = function() {
  return /** @type{?proto.massa.model.v1.AsyncMessage} */ (
    jspb.Message.getWrapperField(this, proto.massa.model.v1.AsyncMessage, 2));
};


/**
 * @param {?proto.massa.model.v1.AsyncMessage|undefined} value
 * @return {!proto.massa.model.v1.AsyncPoolChangeValue} returns this
*/
proto.massa.model.v1.AsyncPoolChangeValue.prototype.setCreatedMessage = function(value) {
  return jspb.Message.setOneofWrapperField(this, 2, proto.massa.model.v1.AsyncPoolChangeValue.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.massa.model.v1.AsyncPoolChangeValue} returns this
 */
proto.massa.model.v1.AsyncPoolChangeValue.prototype.clearCreatedMessage = function() {
  return this.setCreatedMessage(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.massa.model.v1.AsyncPoolChangeValue.prototype.hasCreatedMessage = function() {
  return jspb.Message.getField(this, 2) != null;
};


/**
 * optional AsyncMessageUpdate updated_message = 3;
 * @return {?proto.massa.model.v1.AsyncMessageUpdate}
 */
proto.massa.model.v1.AsyncPoolChangeValue.prototype.getUpdatedMessage = function() {
  return /** @type{?proto.massa.model.v1.AsyncMessageUpdate} */ (
    jspb.Message.getWrapperField(this, proto.massa.model.v1.AsyncMessageUpdate, 3));
};


/**
 * @param {?proto.massa.model.v1.AsyncMessageUpdate|undefined} value
 * @return {!proto.massa.model.v1.AsyncPoolChangeValue} returns this
*/
proto.massa.model.v1.AsyncPoolChangeValue.prototype.setUpdatedMessage = function(value) {
  return jspb.Message.setOneofWrapperField(this, 3, proto.massa.model.v1.AsyncPoolChangeValue.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.massa.model.v1.AsyncPoolChangeValue} returns this
 */
proto.massa.model.v1.AsyncPoolChangeValue.prototype.clearUpdatedMessage = function() {
  return this.setUpdatedMessage(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.massa.model.v1.AsyncPoolChangeValue.prototype.hasUpdatedMessage = function() {
  return jspb.Message.getField(this, 3) != null;
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
proto.massa.model.v1.AsyncMessage.prototype.toObject = function(opt_includeInstance) {
  return proto.massa.model.v1.AsyncMessage.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.massa.model.v1.AsyncMessage} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.massa.model.v1.AsyncMessage.toObject = function(includeInstance, msg) {
  var f, obj = {
emissionSlot: (f = msg.getEmissionSlot()) && massa_model_v1_slot_pb.Slot.toObject(includeInstance, f),
emissionIndex: jspb.Message.getFieldWithDefault(msg, 2, 0),
sender: jspb.Message.getFieldWithDefault(msg, 3, ""),
destination: jspb.Message.getFieldWithDefault(msg, 4, ""),
handler: jspb.Message.getFieldWithDefault(msg, 5, ""),
maxGas: jspb.Message.getFieldWithDefault(msg, 6, 0),
fee: (f = msg.getFee()) && massa_model_v1_amount_pb.NativeAmount.toObject(includeInstance, f),
coins: (f = msg.getCoins()) && massa_model_v1_amount_pb.NativeAmount.toObject(includeInstance, f),
validityStart: (f = msg.getValidityStart()) && massa_model_v1_slot_pb.Slot.toObject(includeInstance, f),
validityEnd: (f = msg.getValidityEnd()) && massa_model_v1_slot_pb.Slot.toObject(includeInstance, f),
data: msg.getData_asB64(),
trigger: (f = msg.getTrigger()) && proto.massa.model.v1.AsyncMessageTrigger.toObject(includeInstance, f),
canBeExecuted: jspb.Message.getBooleanFieldWithDefault(msg, 13, false)
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
 * @return {!proto.massa.model.v1.AsyncMessage}
 */
proto.massa.model.v1.AsyncMessage.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.massa.model.v1.AsyncMessage;
  return proto.massa.model.v1.AsyncMessage.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.massa.model.v1.AsyncMessage} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.massa.model.v1.AsyncMessage}
 */
proto.massa.model.v1.AsyncMessage.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new massa_model_v1_slot_pb.Slot;
      reader.readMessage(value,massa_model_v1_slot_pb.Slot.deserializeBinaryFromReader);
      msg.setEmissionSlot(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readUint64());
      msg.setEmissionIndex(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setSender(value);
      break;
    case 4:
      var value = /** @type {string} */ (reader.readString());
      msg.setDestination(value);
      break;
    case 5:
      var value = /** @type {string} */ (reader.readString());
      msg.setHandler(value);
      break;
    case 6:
      var value = /** @type {number} */ (reader.readUint64());
      msg.setMaxGas(value);
      break;
    case 7:
      var value = new massa_model_v1_amount_pb.NativeAmount;
      reader.readMessage(value,massa_model_v1_amount_pb.NativeAmount.deserializeBinaryFromReader);
      msg.setFee(value);
      break;
    case 8:
      var value = new massa_model_v1_amount_pb.NativeAmount;
      reader.readMessage(value,massa_model_v1_amount_pb.NativeAmount.deserializeBinaryFromReader);
      msg.setCoins(value);
      break;
    case 9:
      var value = new massa_model_v1_slot_pb.Slot;
      reader.readMessage(value,massa_model_v1_slot_pb.Slot.deserializeBinaryFromReader);
      msg.setValidityStart(value);
      break;
    case 10:
      var value = new massa_model_v1_slot_pb.Slot;
      reader.readMessage(value,massa_model_v1_slot_pb.Slot.deserializeBinaryFromReader);
      msg.setValidityEnd(value);
      break;
    case 11:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setData(value);
      break;
    case 12:
      var value = new proto.massa.model.v1.AsyncMessageTrigger;
      reader.readMessage(value,proto.massa.model.v1.AsyncMessageTrigger.deserializeBinaryFromReader);
      msg.setTrigger(value);
      break;
    case 13:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setCanBeExecuted(value);
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
proto.massa.model.v1.AsyncMessage.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.massa.model.v1.AsyncMessage.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.massa.model.v1.AsyncMessage} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.massa.model.v1.AsyncMessage.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getEmissionSlot();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      massa_model_v1_slot_pb.Slot.serializeBinaryToWriter
    );
  }
  f = message.getEmissionIndex();
  if (f !== 0) {
    writer.writeUint64(
      2,
      f
    );
  }
  f = message.getSender();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
  f = message.getDestination();
  if (f.length > 0) {
    writer.writeString(
      4,
      f
    );
  }
  f = message.getHandler();
  if (f.length > 0) {
    writer.writeString(
      5,
      f
    );
  }
  f = message.getMaxGas();
  if (f !== 0) {
    writer.writeUint64(
      6,
      f
    );
  }
  f = message.getFee();
  if (f != null) {
    writer.writeMessage(
      7,
      f,
      massa_model_v1_amount_pb.NativeAmount.serializeBinaryToWriter
    );
  }
  f = message.getCoins();
  if (f != null) {
    writer.writeMessage(
      8,
      f,
      massa_model_v1_amount_pb.NativeAmount.serializeBinaryToWriter
    );
  }
  f = message.getValidityStart();
  if (f != null) {
    writer.writeMessage(
      9,
      f,
      massa_model_v1_slot_pb.Slot.serializeBinaryToWriter
    );
  }
  f = message.getValidityEnd();
  if (f != null) {
    writer.writeMessage(
      10,
      f,
      massa_model_v1_slot_pb.Slot.serializeBinaryToWriter
    );
  }
  f = message.getData_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      11,
      f
    );
  }
  f = message.getTrigger();
  if (f != null) {
    writer.writeMessage(
      12,
      f,
      proto.massa.model.v1.AsyncMessageTrigger.serializeBinaryToWriter
    );
  }
  f = message.getCanBeExecuted();
  if (f) {
    writer.writeBool(
      13,
      f
    );
  }
};


/**
 * optional Slot emission_slot = 1;
 * @return {?proto.massa.model.v1.Slot}
 */
proto.massa.model.v1.AsyncMessage.prototype.getEmissionSlot = function() {
  return /** @type{?proto.massa.model.v1.Slot} */ (
    jspb.Message.getWrapperField(this, massa_model_v1_slot_pb.Slot, 1));
};


/**
 * @param {?proto.massa.model.v1.Slot|undefined} value
 * @return {!proto.massa.model.v1.AsyncMessage} returns this
*/
proto.massa.model.v1.AsyncMessage.prototype.setEmissionSlot = function(value) {
  return jspb.Message.setWrapperField(this, 1, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.massa.model.v1.AsyncMessage} returns this
 */
proto.massa.model.v1.AsyncMessage.prototype.clearEmissionSlot = function() {
  return this.setEmissionSlot(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.massa.model.v1.AsyncMessage.prototype.hasEmissionSlot = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional uint64 emission_index = 2;
 * @return {number}
 */
proto.massa.model.v1.AsyncMessage.prototype.getEmissionIndex = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/**
 * @param {number} value
 * @return {!proto.massa.model.v1.AsyncMessage} returns this
 */
proto.massa.model.v1.AsyncMessage.prototype.setEmissionIndex = function(value) {
  return jspb.Message.setProto3IntField(this, 2, value);
};


/**
 * optional string sender = 3;
 * @return {string}
 */
proto.massa.model.v1.AsyncMessage.prototype.getSender = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.massa.model.v1.AsyncMessage} returns this
 */
proto.massa.model.v1.AsyncMessage.prototype.setSender = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};


/**
 * optional string destination = 4;
 * @return {string}
 */
proto.massa.model.v1.AsyncMessage.prototype.getDestination = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 4, ""));
};


/**
 * @param {string} value
 * @return {!proto.massa.model.v1.AsyncMessage} returns this
 */
proto.massa.model.v1.AsyncMessage.prototype.setDestination = function(value) {
  return jspb.Message.setProto3StringField(this, 4, value);
};


/**
 * optional string handler = 5;
 * @return {string}
 */
proto.massa.model.v1.AsyncMessage.prototype.getHandler = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 5, ""));
};


/**
 * @param {string} value
 * @return {!proto.massa.model.v1.AsyncMessage} returns this
 */
proto.massa.model.v1.AsyncMessage.prototype.setHandler = function(value) {
  return jspb.Message.setProto3StringField(this, 5, value);
};


/**
 * optional uint64 max_gas = 6;
 * @return {number}
 */
proto.massa.model.v1.AsyncMessage.prototype.getMaxGas = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 6, 0));
};


/**
 * @param {number} value
 * @return {!proto.massa.model.v1.AsyncMessage} returns this
 */
proto.massa.model.v1.AsyncMessage.prototype.setMaxGas = function(value) {
  return jspb.Message.setProto3IntField(this, 6, value);
};


/**
 * optional NativeAmount fee = 7;
 * @return {?proto.massa.model.v1.NativeAmount}
 */
proto.massa.model.v1.AsyncMessage.prototype.getFee = function() {
  return /** @type{?proto.massa.model.v1.NativeAmount} */ (
    jspb.Message.getWrapperField(this, massa_model_v1_amount_pb.NativeAmount, 7));
};


/**
 * @param {?proto.massa.model.v1.NativeAmount|undefined} value
 * @return {!proto.massa.model.v1.AsyncMessage} returns this
*/
proto.massa.model.v1.AsyncMessage.prototype.setFee = function(value) {
  return jspb.Message.setWrapperField(this, 7, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.massa.model.v1.AsyncMessage} returns this
 */
proto.massa.model.v1.AsyncMessage.prototype.clearFee = function() {
  return this.setFee(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.massa.model.v1.AsyncMessage.prototype.hasFee = function() {
  return jspb.Message.getField(this, 7) != null;
};


/**
 * optional NativeAmount coins = 8;
 * @return {?proto.massa.model.v1.NativeAmount}
 */
proto.massa.model.v1.AsyncMessage.prototype.getCoins = function() {
  return /** @type{?proto.massa.model.v1.NativeAmount} */ (
    jspb.Message.getWrapperField(this, massa_model_v1_amount_pb.NativeAmount, 8));
};


/**
 * @param {?proto.massa.model.v1.NativeAmount|undefined} value
 * @return {!proto.massa.model.v1.AsyncMessage} returns this
*/
proto.massa.model.v1.AsyncMessage.prototype.setCoins = function(value) {
  return jspb.Message.setWrapperField(this, 8, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.massa.model.v1.AsyncMessage} returns this
 */
proto.massa.model.v1.AsyncMessage.prototype.clearCoins = function() {
  return this.setCoins(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.massa.model.v1.AsyncMessage.prototype.hasCoins = function() {
  return jspb.Message.getField(this, 8) != null;
};


/**
 * optional Slot validity_start = 9;
 * @return {?proto.massa.model.v1.Slot}
 */
proto.massa.model.v1.AsyncMessage.prototype.getValidityStart = function() {
  return /** @type{?proto.massa.model.v1.Slot} */ (
    jspb.Message.getWrapperField(this, massa_model_v1_slot_pb.Slot, 9));
};


/**
 * @param {?proto.massa.model.v1.Slot|undefined} value
 * @return {!proto.massa.model.v1.AsyncMessage} returns this
*/
proto.massa.model.v1.AsyncMessage.prototype.setValidityStart = function(value) {
  return jspb.Message.setWrapperField(this, 9, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.massa.model.v1.AsyncMessage} returns this
 */
proto.massa.model.v1.AsyncMessage.prototype.clearValidityStart = function() {
  return this.setValidityStart(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.massa.model.v1.AsyncMessage.prototype.hasValidityStart = function() {
  return jspb.Message.getField(this, 9) != null;
};


/**
 * optional Slot validity_end = 10;
 * @return {?proto.massa.model.v1.Slot}
 */
proto.massa.model.v1.AsyncMessage.prototype.getValidityEnd = function() {
  return /** @type{?proto.massa.model.v1.Slot} */ (
    jspb.Message.getWrapperField(this, massa_model_v1_slot_pb.Slot, 10));
};


/**
 * @param {?proto.massa.model.v1.Slot|undefined} value
 * @return {!proto.massa.model.v1.AsyncMessage} returns this
*/
proto.massa.model.v1.AsyncMessage.prototype.setValidityEnd = function(value) {
  return jspb.Message.setWrapperField(this, 10, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.massa.model.v1.AsyncMessage} returns this
 */
proto.massa.model.v1.AsyncMessage.prototype.clearValidityEnd = function() {
  return this.setValidityEnd(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.massa.model.v1.AsyncMessage.prototype.hasValidityEnd = function() {
  return jspb.Message.getField(this, 10) != null;
};


/**
 * optional bytes data = 11;
 * @return {string}
 */
proto.massa.model.v1.AsyncMessage.prototype.getData = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 11, ""));
};


/**
 * optional bytes data = 11;
 * This is a type-conversion wrapper around `getData()`
 * @return {string}
 */
proto.massa.model.v1.AsyncMessage.prototype.getData_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getData()));
};


/**
 * optional bytes data = 11;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getData()`
 * @return {!Uint8Array}
 */
proto.massa.model.v1.AsyncMessage.prototype.getData_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getData()));
};


/**
 * @param {!(string|Uint8Array)} value
 * @return {!proto.massa.model.v1.AsyncMessage} returns this
 */
proto.massa.model.v1.AsyncMessage.prototype.setData = function(value) {
  return jspb.Message.setProto3BytesField(this, 11, value);
};


/**
 * optional AsyncMessageTrigger trigger = 12;
 * @return {?proto.massa.model.v1.AsyncMessageTrigger}
 */
proto.massa.model.v1.AsyncMessage.prototype.getTrigger = function() {
  return /** @type{?proto.massa.model.v1.AsyncMessageTrigger} */ (
    jspb.Message.getWrapperField(this, proto.massa.model.v1.AsyncMessageTrigger, 12));
};


/**
 * @param {?proto.massa.model.v1.AsyncMessageTrigger|undefined} value
 * @return {!proto.massa.model.v1.AsyncMessage} returns this
*/
proto.massa.model.v1.AsyncMessage.prototype.setTrigger = function(value) {
  return jspb.Message.setWrapperField(this, 12, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.massa.model.v1.AsyncMessage} returns this
 */
proto.massa.model.v1.AsyncMessage.prototype.clearTrigger = function() {
  return this.setTrigger(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.massa.model.v1.AsyncMessage.prototype.hasTrigger = function() {
  return jspb.Message.getField(this, 12) != null;
};


/**
 * optional bool can_be_executed = 13;
 * @return {boolean}
 */
proto.massa.model.v1.AsyncMessage.prototype.getCanBeExecuted = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 13, false));
};


/**
 * @param {boolean} value
 * @return {!proto.massa.model.v1.AsyncMessage} returns this
 */
proto.massa.model.v1.AsyncMessage.prototype.setCanBeExecuted = function(value) {
  return jspb.Message.setProto3BooleanField(this, 13, value);
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
proto.massa.model.v1.AsyncMessageUpdate.prototype.toObject = function(opt_includeInstance) {
  return proto.massa.model.v1.AsyncMessageUpdate.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.massa.model.v1.AsyncMessageUpdate} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.massa.model.v1.AsyncMessageUpdate.toObject = function(includeInstance, msg) {
  var f, obj = {
emissionSlot: (f = msg.getEmissionSlot()) && proto.massa.model.v1.SetOrKeepSlot.toObject(includeInstance, f),
emissionIndex: (f = msg.getEmissionIndex()) && proto.massa.model.v1.SetOrKeepUint64.toObject(includeInstance, f),
sender: (f = msg.getSender()) && proto.massa.model.v1.SetOrKeepString.toObject(includeInstance, f),
destination: (f = msg.getDestination()) && proto.massa.model.v1.SetOrKeepString.toObject(includeInstance, f),
handler: (f = msg.getHandler()) && proto.massa.model.v1.SetOrKeepString.toObject(includeInstance, f),
maxGas: (f = msg.getMaxGas()) && proto.massa.model.v1.SetOrKeepUint64.toObject(includeInstance, f),
fee: (f = msg.getFee()) && proto.massa.model.v1.SetOrKeepUint64.toObject(includeInstance, f),
coins: (f = msg.getCoins()) && proto.massa.model.v1.SetOrKeepUint64.toObject(includeInstance, f),
validityStart: (f = msg.getValidityStart()) && proto.massa.model.v1.SetOrKeepSlot.toObject(includeInstance, f),
validityEnd: (f = msg.getValidityEnd()) && proto.massa.model.v1.SetOrKeepSlot.toObject(includeInstance, f),
data: (f = msg.getData()) && proto.massa.model.v1.SetOrKeepBytes.toObject(includeInstance, f),
trigger: (f = msg.getTrigger()) && proto.massa.model.v1.SetOrKeepAsyncMessageTrigger.toObject(includeInstance, f),
canBeExecuted: (f = msg.getCanBeExecuted()) && proto.massa.model.v1.SetOrKeepBool.toObject(includeInstance, f)
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
 * @return {!proto.massa.model.v1.AsyncMessageUpdate}
 */
proto.massa.model.v1.AsyncMessageUpdate.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.massa.model.v1.AsyncMessageUpdate;
  return proto.massa.model.v1.AsyncMessageUpdate.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.massa.model.v1.AsyncMessageUpdate} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.massa.model.v1.AsyncMessageUpdate}
 */
proto.massa.model.v1.AsyncMessageUpdate.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.massa.model.v1.SetOrKeepSlot;
      reader.readMessage(value,proto.massa.model.v1.SetOrKeepSlot.deserializeBinaryFromReader);
      msg.setEmissionSlot(value);
      break;
    case 2:
      var value = new proto.massa.model.v1.SetOrKeepUint64;
      reader.readMessage(value,proto.massa.model.v1.SetOrKeepUint64.deserializeBinaryFromReader);
      msg.setEmissionIndex(value);
      break;
    case 3:
      var value = new proto.massa.model.v1.SetOrKeepString;
      reader.readMessage(value,proto.massa.model.v1.SetOrKeepString.deserializeBinaryFromReader);
      msg.setSender(value);
      break;
    case 4:
      var value = new proto.massa.model.v1.SetOrKeepString;
      reader.readMessage(value,proto.massa.model.v1.SetOrKeepString.deserializeBinaryFromReader);
      msg.setDestination(value);
      break;
    case 5:
      var value = new proto.massa.model.v1.SetOrKeepString;
      reader.readMessage(value,proto.massa.model.v1.SetOrKeepString.deserializeBinaryFromReader);
      msg.setHandler(value);
      break;
    case 6:
      var value = new proto.massa.model.v1.SetOrKeepUint64;
      reader.readMessage(value,proto.massa.model.v1.SetOrKeepUint64.deserializeBinaryFromReader);
      msg.setMaxGas(value);
      break;
    case 7:
      var value = new proto.massa.model.v1.SetOrKeepUint64;
      reader.readMessage(value,proto.massa.model.v1.SetOrKeepUint64.deserializeBinaryFromReader);
      msg.setFee(value);
      break;
    case 8:
      var value = new proto.massa.model.v1.SetOrKeepUint64;
      reader.readMessage(value,proto.massa.model.v1.SetOrKeepUint64.deserializeBinaryFromReader);
      msg.setCoins(value);
      break;
    case 9:
      var value = new proto.massa.model.v1.SetOrKeepSlot;
      reader.readMessage(value,proto.massa.model.v1.SetOrKeepSlot.deserializeBinaryFromReader);
      msg.setValidityStart(value);
      break;
    case 10:
      var value = new proto.massa.model.v1.SetOrKeepSlot;
      reader.readMessage(value,proto.massa.model.v1.SetOrKeepSlot.deserializeBinaryFromReader);
      msg.setValidityEnd(value);
      break;
    case 11:
      var value = new proto.massa.model.v1.SetOrKeepBytes;
      reader.readMessage(value,proto.massa.model.v1.SetOrKeepBytes.deserializeBinaryFromReader);
      msg.setData(value);
      break;
    case 12:
      var value = new proto.massa.model.v1.SetOrKeepAsyncMessageTrigger;
      reader.readMessage(value,proto.massa.model.v1.SetOrKeepAsyncMessageTrigger.deserializeBinaryFromReader);
      msg.setTrigger(value);
      break;
    case 13:
      var value = new proto.massa.model.v1.SetOrKeepBool;
      reader.readMessage(value,proto.massa.model.v1.SetOrKeepBool.deserializeBinaryFromReader);
      msg.setCanBeExecuted(value);
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
proto.massa.model.v1.AsyncMessageUpdate.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.massa.model.v1.AsyncMessageUpdate.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.massa.model.v1.AsyncMessageUpdate} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.massa.model.v1.AsyncMessageUpdate.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getEmissionSlot();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      proto.massa.model.v1.SetOrKeepSlot.serializeBinaryToWriter
    );
  }
  f = message.getEmissionIndex();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      proto.massa.model.v1.SetOrKeepUint64.serializeBinaryToWriter
    );
  }
  f = message.getSender();
  if (f != null) {
    writer.writeMessage(
      3,
      f,
      proto.massa.model.v1.SetOrKeepString.serializeBinaryToWriter
    );
  }
  f = message.getDestination();
  if (f != null) {
    writer.writeMessage(
      4,
      f,
      proto.massa.model.v1.SetOrKeepString.serializeBinaryToWriter
    );
  }
  f = message.getHandler();
  if (f != null) {
    writer.writeMessage(
      5,
      f,
      proto.massa.model.v1.SetOrKeepString.serializeBinaryToWriter
    );
  }
  f = message.getMaxGas();
  if (f != null) {
    writer.writeMessage(
      6,
      f,
      proto.massa.model.v1.SetOrKeepUint64.serializeBinaryToWriter
    );
  }
  f = message.getFee();
  if (f != null) {
    writer.writeMessage(
      7,
      f,
      proto.massa.model.v1.SetOrKeepUint64.serializeBinaryToWriter
    );
  }
  f = message.getCoins();
  if (f != null) {
    writer.writeMessage(
      8,
      f,
      proto.massa.model.v1.SetOrKeepUint64.serializeBinaryToWriter
    );
  }
  f = message.getValidityStart();
  if (f != null) {
    writer.writeMessage(
      9,
      f,
      proto.massa.model.v1.SetOrKeepSlot.serializeBinaryToWriter
    );
  }
  f = message.getValidityEnd();
  if (f != null) {
    writer.writeMessage(
      10,
      f,
      proto.massa.model.v1.SetOrKeepSlot.serializeBinaryToWriter
    );
  }
  f = message.getData();
  if (f != null) {
    writer.writeMessage(
      11,
      f,
      proto.massa.model.v1.SetOrKeepBytes.serializeBinaryToWriter
    );
  }
  f = message.getTrigger();
  if (f != null) {
    writer.writeMessage(
      12,
      f,
      proto.massa.model.v1.SetOrKeepAsyncMessageTrigger.serializeBinaryToWriter
    );
  }
  f = message.getCanBeExecuted();
  if (f != null) {
    writer.writeMessage(
      13,
      f,
      proto.massa.model.v1.SetOrKeepBool.serializeBinaryToWriter
    );
  }
};


/**
 * optional SetOrKeepSlot emission_slot = 1;
 * @return {?proto.massa.model.v1.SetOrKeepSlot}
 */
proto.massa.model.v1.AsyncMessageUpdate.prototype.getEmissionSlot = function() {
  return /** @type{?proto.massa.model.v1.SetOrKeepSlot} */ (
    jspb.Message.getWrapperField(this, proto.massa.model.v1.SetOrKeepSlot, 1));
};


/**
 * @param {?proto.massa.model.v1.SetOrKeepSlot|undefined} value
 * @return {!proto.massa.model.v1.AsyncMessageUpdate} returns this
*/
proto.massa.model.v1.AsyncMessageUpdate.prototype.setEmissionSlot = function(value) {
  return jspb.Message.setWrapperField(this, 1, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.massa.model.v1.AsyncMessageUpdate} returns this
 */
proto.massa.model.v1.AsyncMessageUpdate.prototype.clearEmissionSlot = function() {
  return this.setEmissionSlot(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.massa.model.v1.AsyncMessageUpdate.prototype.hasEmissionSlot = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional SetOrKeepUint64 emission_index = 2;
 * @return {?proto.massa.model.v1.SetOrKeepUint64}
 */
proto.massa.model.v1.AsyncMessageUpdate.prototype.getEmissionIndex = function() {
  return /** @type{?proto.massa.model.v1.SetOrKeepUint64} */ (
    jspb.Message.getWrapperField(this, proto.massa.model.v1.SetOrKeepUint64, 2));
};


/**
 * @param {?proto.massa.model.v1.SetOrKeepUint64|undefined} value
 * @return {!proto.massa.model.v1.AsyncMessageUpdate} returns this
*/
proto.massa.model.v1.AsyncMessageUpdate.prototype.setEmissionIndex = function(value) {
  return jspb.Message.setWrapperField(this, 2, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.massa.model.v1.AsyncMessageUpdate} returns this
 */
proto.massa.model.v1.AsyncMessageUpdate.prototype.clearEmissionIndex = function() {
  return this.setEmissionIndex(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.massa.model.v1.AsyncMessageUpdate.prototype.hasEmissionIndex = function() {
  return jspb.Message.getField(this, 2) != null;
};


/**
 * optional SetOrKeepString sender = 3;
 * @return {?proto.massa.model.v1.SetOrKeepString}
 */
proto.massa.model.v1.AsyncMessageUpdate.prototype.getSender = function() {
  return /** @type{?proto.massa.model.v1.SetOrKeepString} */ (
    jspb.Message.getWrapperField(this, proto.massa.model.v1.SetOrKeepString, 3));
};


/**
 * @param {?proto.massa.model.v1.SetOrKeepString|undefined} value
 * @return {!proto.massa.model.v1.AsyncMessageUpdate} returns this
*/
proto.massa.model.v1.AsyncMessageUpdate.prototype.setSender = function(value) {
  return jspb.Message.setWrapperField(this, 3, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.massa.model.v1.AsyncMessageUpdate} returns this
 */
proto.massa.model.v1.AsyncMessageUpdate.prototype.clearSender = function() {
  return this.setSender(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.massa.model.v1.AsyncMessageUpdate.prototype.hasSender = function() {
  return jspb.Message.getField(this, 3) != null;
};


/**
 * optional SetOrKeepString destination = 4;
 * @return {?proto.massa.model.v1.SetOrKeepString}
 */
proto.massa.model.v1.AsyncMessageUpdate.prototype.getDestination = function() {
  return /** @type{?proto.massa.model.v1.SetOrKeepString} */ (
    jspb.Message.getWrapperField(this, proto.massa.model.v1.SetOrKeepString, 4));
};


/**
 * @param {?proto.massa.model.v1.SetOrKeepString|undefined} value
 * @return {!proto.massa.model.v1.AsyncMessageUpdate} returns this
*/
proto.massa.model.v1.AsyncMessageUpdate.prototype.setDestination = function(value) {
  return jspb.Message.setWrapperField(this, 4, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.massa.model.v1.AsyncMessageUpdate} returns this
 */
proto.massa.model.v1.AsyncMessageUpdate.prototype.clearDestination = function() {
  return this.setDestination(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.massa.model.v1.AsyncMessageUpdate.prototype.hasDestination = function() {
  return jspb.Message.getField(this, 4) != null;
};


/**
 * optional SetOrKeepString handler = 5;
 * @return {?proto.massa.model.v1.SetOrKeepString}
 */
proto.massa.model.v1.AsyncMessageUpdate.prototype.getHandler = function() {
  return /** @type{?proto.massa.model.v1.SetOrKeepString} */ (
    jspb.Message.getWrapperField(this, proto.massa.model.v1.SetOrKeepString, 5));
};


/**
 * @param {?proto.massa.model.v1.SetOrKeepString|undefined} value
 * @return {!proto.massa.model.v1.AsyncMessageUpdate} returns this
*/
proto.massa.model.v1.AsyncMessageUpdate.prototype.setHandler = function(value) {
  return jspb.Message.setWrapperField(this, 5, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.massa.model.v1.AsyncMessageUpdate} returns this
 */
proto.massa.model.v1.AsyncMessageUpdate.prototype.clearHandler = function() {
  return this.setHandler(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.massa.model.v1.AsyncMessageUpdate.prototype.hasHandler = function() {
  return jspb.Message.getField(this, 5) != null;
};


/**
 * optional SetOrKeepUint64 max_gas = 6;
 * @return {?proto.massa.model.v1.SetOrKeepUint64}
 */
proto.massa.model.v1.AsyncMessageUpdate.prototype.getMaxGas = function() {
  return /** @type{?proto.massa.model.v1.SetOrKeepUint64} */ (
    jspb.Message.getWrapperField(this, proto.massa.model.v1.SetOrKeepUint64, 6));
};


/**
 * @param {?proto.massa.model.v1.SetOrKeepUint64|undefined} value
 * @return {!proto.massa.model.v1.AsyncMessageUpdate} returns this
*/
proto.massa.model.v1.AsyncMessageUpdate.prototype.setMaxGas = function(value) {
  return jspb.Message.setWrapperField(this, 6, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.massa.model.v1.AsyncMessageUpdate} returns this
 */
proto.massa.model.v1.AsyncMessageUpdate.prototype.clearMaxGas = function() {
  return this.setMaxGas(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.massa.model.v1.AsyncMessageUpdate.prototype.hasMaxGas = function() {
  return jspb.Message.getField(this, 6) != null;
};


/**
 * optional SetOrKeepUint64 fee = 7;
 * @return {?proto.massa.model.v1.SetOrKeepUint64}
 */
proto.massa.model.v1.AsyncMessageUpdate.prototype.getFee = function() {
  return /** @type{?proto.massa.model.v1.SetOrKeepUint64} */ (
    jspb.Message.getWrapperField(this, proto.massa.model.v1.SetOrKeepUint64, 7));
};


/**
 * @param {?proto.massa.model.v1.SetOrKeepUint64|undefined} value
 * @return {!proto.massa.model.v1.AsyncMessageUpdate} returns this
*/
proto.massa.model.v1.AsyncMessageUpdate.prototype.setFee = function(value) {
  return jspb.Message.setWrapperField(this, 7, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.massa.model.v1.AsyncMessageUpdate} returns this
 */
proto.massa.model.v1.AsyncMessageUpdate.prototype.clearFee = function() {
  return this.setFee(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.massa.model.v1.AsyncMessageUpdate.prototype.hasFee = function() {
  return jspb.Message.getField(this, 7) != null;
};


/**
 * optional SetOrKeepUint64 coins = 8;
 * @return {?proto.massa.model.v1.SetOrKeepUint64}
 */
proto.massa.model.v1.AsyncMessageUpdate.prototype.getCoins = function() {
  return /** @type{?proto.massa.model.v1.SetOrKeepUint64} */ (
    jspb.Message.getWrapperField(this, proto.massa.model.v1.SetOrKeepUint64, 8));
};


/**
 * @param {?proto.massa.model.v1.SetOrKeepUint64|undefined} value
 * @return {!proto.massa.model.v1.AsyncMessageUpdate} returns this
*/
proto.massa.model.v1.AsyncMessageUpdate.prototype.setCoins = function(value) {
  return jspb.Message.setWrapperField(this, 8, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.massa.model.v1.AsyncMessageUpdate} returns this
 */
proto.massa.model.v1.AsyncMessageUpdate.prototype.clearCoins = function() {
  return this.setCoins(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.massa.model.v1.AsyncMessageUpdate.prototype.hasCoins = function() {
  return jspb.Message.getField(this, 8) != null;
};


/**
 * optional SetOrKeepSlot validity_start = 9;
 * @return {?proto.massa.model.v1.SetOrKeepSlot}
 */
proto.massa.model.v1.AsyncMessageUpdate.prototype.getValidityStart = function() {
  return /** @type{?proto.massa.model.v1.SetOrKeepSlot} */ (
    jspb.Message.getWrapperField(this, proto.massa.model.v1.SetOrKeepSlot, 9));
};


/**
 * @param {?proto.massa.model.v1.SetOrKeepSlot|undefined} value
 * @return {!proto.massa.model.v1.AsyncMessageUpdate} returns this
*/
proto.massa.model.v1.AsyncMessageUpdate.prototype.setValidityStart = function(value) {
  return jspb.Message.setWrapperField(this, 9, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.massa.model.v1.AsyncMessageUpdate} returns this
 */
proto.massa.model.v1.AsyncMessageUpdate.prototype.clearValidityStart = function() {
  return this.setValidityStart(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.massa.model.v1.AsyncMessageUpdate.prototype.hasValidityStart = function() {
  return jspb.Message.getField(this, 9) != null;
};


/**
 * optional SetOrKeepSlot validity_end = 10;
 * @return {?proto.massa.model.v1.SetOrKeepSlot}
 */
proto.massa.model.v1.AsyncMessageUpdate.prototype.getValidityEnd = function() {
  return /** @type{?proto.massa.model.v1.SetOrKeepSlot} */ (
    jspb.Message.getWrapperField(this, proto.massa.model.v1.SetOrKeepSlot, 10));
};


/**
 * @param {?proto.massa.model.v1.SetOrKeepSlot|undefined} value
 * @return {!proto.massa.model.v1.AsyncMessageUpdate} returns this
*/
proto.massa.model.v1.AsyncMessageUpdate.prototype.setValidityEnd = function(value) {
  return jspb.Message.setWrapperField(this, 10, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.massa.model.v1.AsyncMessageUpdate} returns this
 */
proto.massa.model.v1.AsyncMessageUpdate.prototype.clearValidityEnd = function() {
  return this.setValidityEnd(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.massa.model.v1.AsyncMessageUpdate.prototype.hasValidityEnd = function() {
  return jspb.Message.getField(this, 10) != null;
};


/**
 * optional SetOrKeepBytes data = 11;
 * @return {?proto.massa.model.v1.SetOrKeepBytes}
 */
proto.massa.model.v1.AsyncMessageUpdate.prototype.getData = function() {
  return /** @type{?proto.massa.model.v1.SetOrKeepBytes} */ (
    jspb.Message.getWrapperField(this, proto.massa.model.v1.SetOrKeepBytes, 11));
};


/**
 * @param {?proto.massa.model.v1.SetOrKeepBytes|undefined} value
 * @return {!proto.massa.model.v1.AsyncMessageUpdate} returns this
*/
proto.massa.model.v1.AsyncMessageUpdate.prototype.setData = function(value) {
  return jspb.Message.setWrapperField(this, 11, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.massa.model.v1.AsyncMessageUpdate} returns this
 */
proto.massa.model.v1.AsyncMessageUpdate.prototype.clearData = function() {
  return this.setData(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.massa.model.v1.AsyncMessageUpdate.prototype.hasData = function() {
  return jspb.Message.getField(this, 11) != null;
};


/**
 * optional SetOrKeepAsyncMessageTrigger trigger = 12;
 * @return {?proto.massa.model.v1.SetOrKeepAsyncMessageTrigger}
 */
proto.massa.model.v1.AsyncMessageUpdate.prototype.getTrigger = function() {
  return /** @type{?proto.massa.model.v1.SetOrKeepAsyncMessageTrigger} */ (
    jspb.Message.getWrapperField(this, proto.massa.model.v1.SetOrKeepAsyncMessageTrigger, 12));
};


/**
 * @param {?proto.massa.model.v1.SetOrKeepAsyncMessageTrigger|undefined} value
 * @return {!proto.massa.model.v1.AsyncMessageUpdate} returns this
*/
proto.massa.model.v1.AsyncMessageUpdate.prototype.setTrigger = function(value) {
  return jspb.Message.setWrapperField(this, 12, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.massa.model.v1.AsyncMessageUpdate} returns this
 */
proto.massa.model.v1.AsyncMessageUpdate.prototype.clearTrigger = function() {
  return this.setTrigger(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.massa.model.v1.AsyncMessageUpdate.prototype.hasTrigger = function() {
  return jspb.Message.getField(this, 12) != null;
};


/**
 * optional SetOrKeepBool can_be_executed = 13;
 * @return {?proto.massa.model.v1.SetOrKeepBool}
 */
proto.massa.model.v1.AsyncMessageUpdate.prototype.getCanBeExecuted = function() {
  return /** @type{?proto.massa.model.v1.SetOrKeepBool} */ (
    jspb.Message.getWrapperField(this, proto.massa.model.v1.SetOrKeepBool, 13));
};


/**
 * @param {?proto.massa.model.v1.SetOrKeepBool|undefined} value
 * @return {!proto.massa.model.v1.AsyncMessageUpdate} returns this
*/
proto.massa.model.v1.AsyncMessageUpdate.prototype.setCanBeExecuted = function(value) {
  return jspb.Message.setWrapperField(this, 13, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.massa.model.v1.AsyncMessageUpdate} returns this
 */
proto.massa.model.v1.AsyncMessageUpdate.prototype.clearCanBeExecuted = function() {
  return this.setCanBeExecuted(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.massa.model.v1.AsyncMessageUpdate.prototype.hasCanBeExecuted = function() {
  return jspb.Message.getField(this, 13) != null;
};



/**
 * Oneof group definitions for this message. Each group defines the field
 * numbers belonging to that group. When of these fields' value is set, all
 * other fields in the group are cleared. During deserialization, if multiple
 * fields are encountered for a group, only the last value seen will be kept.
 * @private {!Array<!Array<number>>}
 * @const
 */
proto.massa.model.v1.SetOrKeepSlot.oneofGroups_ = [[1,2]];

/**
 * @enum {number}
 */
proto.massa.model.v1.SetOrKeepSlot.ChangeCase = {
  CHANGE_NOT_SET: 0,
  SET: 1,
  KEEP: 2
};

/**
 * @return {proto.massa.model.v1.SetOrKeepSlot.ChangeCase}
 */
proto.massa.model.v1.SetOrKeepSlot.prototype.getChangeCase = function() {
  return /** @type {proto.massa.model.v1.SetOrKeepSlot.ChangeCase} */(jspb.Message.computeOneofCase(this, proto.massa.model.v1.SetOrKeepSlot.oneofGroups_[0]));
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
proto.massa.model.v1.SetOrKeepSlot.prototype.toObject = function(opt_includeInstance) {
  return proto.massa.model.v1.SetOrKeepSlot.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.massa.model.v1.SetOrKeepSlot} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.massa.model.v1.SetOrKeepSlot.toObject = function(includeInstance, msg) {
  var f, obj = {
set: (f = msg.getSet()) && massa_model_v1_slot_pb.Slot.toObject(includeInstance, f),
keep: (f = msg.getKeep()) && massa_model_v1_commons_pb.Empty.toObject(includeInstance, f)
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
 * @return {!proto.massa.model.v1.SetOrKeepSlot}
 */
proto.massa.model.v1.SetOrKeepSlot.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.massa.model.v1.SetOrKeepSlot;
  return proto.massa.model.v1.SetOrKeepSlot.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.massa.model.v1.SetOrKeepSlot} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.massa.model.v1.SetOrKeepSlot}
 */
proto.massa.model.v1.SetOrKeepSlot.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new massa_model_v1_slot_pb.Slot;
      reader.readMessage(value,massa_model_v1_slot_pb.Slot.deserializeBinaryFromReader);
      msg.setSet(value);
      break;
    case 2:
      var value = new massa_model_v1_commons_pb.Empty;
      reader.readMessage(value,massa_model_v1_commons_pb.Empty.deserializeBinaryFromReader);
      msg.setKeep(value);
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
proto.massa.model.v1.SetOrKeepSlot.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.massa.model.v1.SetOrKeepSlot.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.massa.model.v1.SetOrKeepSlot} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.massa.model.v1.SetOrKeepSlot.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getSet();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      massa_model_v1_slot_pb.Slot.serializeBinaryToWriter
    );
  }
  f = message.getKeep();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      massa_model_v1_commons_pb.Empty.serializeBinaryToWriter
    );
  }
};


/**
 * optional Slot set = 1;
 * @return {?proto.massa.model.v1.Slot}
 */
proto.massa.model.v1.SetOrKeepSlot.prototype.getSet = function() {
  return /** @type{?proto.massa.model.v1.Slot} */ (
    jspb.Message.getWrapperField(this, massa_model_v1_slot_pb.Slot, 1));
};


/**
 * @param {?proto.massa.model.v1.Slot|undefined} value
 * @return {!proto.massa.model.v1.SetOrKeepSlot} returns this
*/
proto.massa.model.v1.SetOrKeepSlot.prototype.setSet = function(value) {
  return jspb.Message.setOneofWrapperField(this, 1, proto.massa.model.v1.SetOrKeepSlot.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.massa.model.v1.SetOrKeepSlot} returns this
 */
proto.massa.model.v1.SetOrKeepSlot.prototype.clearSet = function() {
  return this.setSet(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.massa.model.v1.SetOrKeepSlot.prototype.hasSet = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional Empty keep = 2;
 * @return {?proto.massa.model.v1.Empty}
 */
proto.massa.model.v1.SetOrKeepSlot.prototype.getKeep = function() {
  return /** @type{?proto.massa.model.v1.Empty} */ (
    jspb.Message.getWrapperField(this, massa_model_v1_commons_pb.Empty, 2));
};


/**
 * @param {?proto.massa.model.v1.Empty|undefined} value
 * @return {!proto.massa.model.v1.SetOrKeepSlot} returns this
*/
proto.massa.model.v1.SetOrKeepSlot.prototype.setKeep = function(value) {
  return jspb.Message.setOneofWrapperField(this, 2, proto.massa.model.v1.SetOrKeepSlot.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.massa.model.v1.SetOrKeepSlot} returns this
 */
proto.massa.model.v1.SetOrKeepSlot.prototype.clearKeep = function() {
  return this.setKeep(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.massa.model.v1.SetOrKeepSlot.prototype.hasKeep = function() {
  return jspb.Message.getField(this, 2) != null;
};



/**
 * Oneof group definitions for this message. Each group defines the field
 * numbers belonging to that group. When of these fields' value is set, all
 * other fields in the group are cleared. During deserialization, if multiple
 * fields are encountered for a group, only the last value seen will be kept.
 * @private {!Array<!Array<number>>}
 * @const
 */
proto.massa.model.v1.SetOrKeepUint64.oneofGroups_ = [[1,2]];

/**
 * @enum {number}
 */
proto.massa.model.v1.SetOrKeepUint64.ChangeCase = {
  CHANGE_NOT_SET: 0,
  SET: 1,
  KEEP: 2
};

/**
 * @return {proto.massa.model.v1.SetOrKeepUint64.ChangeCase}
 */
proto.massa.model.v1.SetOrKeepUint64.prototype.getChangeCase = function() {
  return /** @type {proto.massa.model.v1.SetOrKeepUint64.ChangeCase} */(jspb.Message.computeOneofCase(this, proto.massa.model.v1.SetOrKeepUint64.oneofGroups_[0]));
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
proto.massa.model.v1.SetOrKeepUint64.prototype.toObject = function(opt_includeInstance) {
  return proto.massa.model.v1.SetOrKeepUint64.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.massa.model.v1.SetOrKeepUint64} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.massa.model.v1.SetOrKeepUint64.toObject = function(includeInstance, msg) {
  var f, obj = {
set: (f = msg.getSet()) && google_protobuf_wrappers_pb.UInt64Value.toObject(includeInstance, f),
keep: (f = msg.getKeep()) && massa_model_v1_commons_pb.Empty.toObject(includeInstance, f)
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
 * @return {!proto.massa.model.v1.SetOrKeepUint64}
 */
proto.massa.model.v1.SetOrKeepUint64.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.massa.model.v1.SetOrKeepUint64;
  return proto.massa.model.v1.SetOrKeepUint64.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.massa.model.v1.SetOrKeepUint64} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.massa.model.v1.SetOrKeepUint64}
 */
proto.massa.model.v1.SetOrKeepUint64.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new google_protobuf_wrappers_pb.UInt64Value;
      reader.readMessage(value,google_protobuf_wrappers_pb.UInt64Value.deserializeBinaryFromReader);
      msg.setSet(value);
      break;
    case 2:
      var value = new massa_model_v1_commons_pb.Empty;
      reader.readMessage(value,massa_model_v1_commons_pb.Empty.deserializeBinaryFromReader);
      msg.setKeep(value);
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
proto.massa.model.v1.SetOrKeepUint64.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.massa.model.v1.SetOrKeepUint64.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.massa.model.v1.SetOrKeepUint64} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.massa.model.v1.SetOrKeepUint64.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getSet();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      google_protobuf_wrappers_pb.UInt64Value.serializeBinaryToWriter
    );
  }
  f = message.getKeep();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      massa_model_v1_commons_pb.Empty.serializeBinaryToWriter
    );
  }
};


/**
 * optional google.protobuf.UInt64Value set = 1;
 * @return {?proto.google.protobuf.UInt64Value}
 */
proto.massa.model.v1.SetOrKeepUint64.prototype.getSet = function() {
  return /** @type{?proto.google.protobuf.UInt64Value} */ (
    jspb.Message.getWrapperField(this, google_protobuf_wrappers_pb.UInt64Value, 1));
};


/**
 * @param {?proto.google.protobuf.UInt64Value|undefined} value
 * @return {!proto.massa.model.v1.SetOrKeepUint64} returns this
*/
proto.massa.model.v1.SetOrKeepUint64.prototype.setSet = function(value) {
  return jspb.Message.setOneofWrapperField(this, 1, proto.massa.model.v1.SetOrKeepUint64.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.massa.model.v1.SetOrKeepUint64} returns this
 */
proto.massa.model.v1.SetOrKeepUint64.prototype.clearSet = function() {
  return this.setSet(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.massa.model.v1.SetOrKeepUint64.prototype.hasSet = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional Empty keep = 2;
 * @return {?proto.massa.model.v1.Empty}
 */
proto.massa.model.v1.SetOrKeepUint64.prototype.getKeep = function() {
  return /** @type{?proto.massa.model.v1.Empty} */ (
    jspb.Message.getWrapperField(this, massa_model_v1_commons_pb.Empty, 2));
};


/**
 * @param {?proto.massa.model.v1.Empty|undefined} value
 * @return {!proto.massa.model.v1.SetOrKeepUint64} returns this
*/
proto.massa.model.v1.SetOrKeepUint64.prototype.setKeep = function(value) {
  return jspb.Message.setOneofWrapperField(this, 2, proto.massa.model.v1.SetOrKeepUint64.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.massa.model.v1.SetOrKeepUint64} returns this
 */
proto.massa.model.v1.SetOrKeepUint64.prototype.clearKeep = function() {
  return this.setKeep(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.massa.model.v1.SetOrKeepUint64.prototype.hasKeep = function() {
  return jspb.Message.getField(this, 2) != null;
};



/**
 * Oneof group definitions for this message. Each group defines the field
 * numbers belonging to that group. When of these fields' value is set, all
 * other fields in the group are cleared. During deserialization, if multiple
 * fields are encountered for a group, only the last value seen will be kept.
 * @private {!Array<!Array<number>>}
 * @const
 */
proto.massa.model.v1.SetOrKeepString.oneofGroups_ = [[1,2]];

/**
 * @enum {number}
 */
proto.massa.model.v1.SetOrKeepString.ChangeCase = {
  CHANGE_NOT_SET: 0,
  SET: 1,
  KEEP: 2
};

/**
 * @return {proto.massa.model.v1.SetOrKeepString.ChangeCase}
 */
proto.massa.model.v1.SetOrKeepString.prototype.getChangeCase = function() {
  return /** @type {proto.massa.model.v1.SetOrKeepString.ChangeCase} */(jspb.Message.computeOneofCase(this, proto.massa.model.v1.SetOrKeepString.oneofGroups_[0]));
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
proto.massa.model.v1.SetOrKeepString.prototype.toObject = function(opt_includeInstance) {
  return proto.massa.model.v1.SetOrKeepString.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.massa.model.v1.SetOrKeepString} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.massa.model.v1.SetOrKeepString.toObject = function(includeInstance, msg) {
  var f, obj = {
set: (f = msg.getSet()) && google_protobuf_wrappers_pb.StringValue.toObject(includeInstance, f),
keep: (f = msg.getKeep()) && massa_model_v1_commons_pb.Empty.toObject(includeInstance, f)
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
 * @return {!proto.massa.model.v1.SetOrKeepString}
 */
proto.massa.model.v1.SetOrKeepString.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.massa.model.v1.SetOrKeepString;
  return proto.massa.model.v1.SetOrKeepString.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.massa.model.v1.SetOrKeepString} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.massa.model.v1.SetOrKeepString}
 */
proto.massa.model.v1.SetOrKeepString.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new google_protobuf_wrappers_pb.StringValue;
      reader.readMessage(value,google_protobuf_wrappers_pb.StringValue.deserializeBinaryFromReader);
      msg.setSet(value);
      break;
    case 2:
      var value = new massa_model_v1_commons_pb.Empty;
      reader.readMessage(value,massa_model_v1_commons_pb.Empty.deserializeBinaryFromReader);
      msg.setKeep(value);
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
proto.massa.model.v1.SetOrKeepString.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.massa.model.v1.SetOrKeepString.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.massa.model.v1.SetOrKeepString} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.massa.model.v1.SetOrKeepString.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getSet();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      google_protobuf_wrappers_pb.StringValue.serializeBinaryToWriter
    );
  }
  f = message.getKeep();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      massa_model_v1_commons_pb.Empty.serializeBinaryToWriter
    );
  }
};


/**
 * optional google.protobuf.StringValue set = 1;
 * @return {?proto.google.protobuf.StringValue}
 */
proto.massa.model.v1.SetOrKeepString.prototype.getSet = function() {
  return /** @type{?proto.google.protobuf.StringValue} */ (
    jspb.Message.getWrapperField(this, google_protobuf_wrappers_pb.StringValue, 1));
};


/**
 * @param {?proto.google.protobuf.StringValue|undefined} value
 * @return {!proto.massa.model.v1.SetOrKeepString} returns this
*/
proto.massa.model.v1.SetOrKeepString.prototype.setSet = function(value) {
  return jspb.Message.setOneofWrapperField(this, 1, proto.massa.model.v1.SetOrKeepString.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.massa.model.v1.SetOrKeepString} returns this
 */
proto.massa.model.v1.SetOrKeepString.prototype.clearSet = function() {
  return this.setSet(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.massa.model.v1.SetOrKeepString.prototype.hasSet = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional Empty keep = 2;
 * @return {?proto.massa.model.v1.Empty}
 */
proto.massa.model.v1.SetOrKeepString.prototype.getKeep = function() {
  return /** @type{?proto.massa.model.v1.Empty} */ (
    jspb.Message.getWrapperField(this, massa_model_v1_commons_pb.Empty, 2));
};


/**
 * @param {?proto.massa.model.v1.Empty|undefined} value
 * @return {!proto.massa.model.v1.SetOrKeepString} returns this
*/
proto.massa.model.v1.SetOrKeepString.prototype.setKeep = function(value) {
  return jspb.Message.setOneofWrapperField(this, 2, proto.massa.model.v1.SetOrKeepString.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.massa.model.v1.SetOrKeepString} returns this
 */
proto.massa.model.v1.SetOrKeepString.prototype.clearKeep = function() {
  return this.setKeep(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.massa.model.v1.SetOrKeepString.prototype.hasKeep = function() {
  return jspb.Message.getField(this, 2) != null;
};



/**
 * Oneof group definitions for this message. Each group defines the field
 * numbers belonging to that group. When of these fields' value is set, all
 * other fields in the group are cleared. During deserialization, if multiple
 * fields are encountered for a group, only the last value seen will be kept.
 * @private {!Array<!Array<number>>}
 * @const
 */
proto.massa.model.v1.SetOrKeepBytes.oneofGroups_ = [[1,2]];

/**
 * @enum {number}
 */
proto.massa.model.v1.SetOrKeepBytes.ChangeCase = {
  CHANGE_NOT_SET: 0,
  SET: 1,
  KEEP: 2
};

/**
 * @return {proto.massa.model.v1.SetOrKeepBytes.ChangeCase}
 */
proto.massa.model.v1.SetOrKeepBytes.prototype.getChangeCase = function() {
  return /** @type {proto.massa.model.v1.SetOrKeepBytes.ChangeCase} */(jspb.Message.computeOneofCase(this, proto.massa.model.v1.SetOrKeepBytes.oneofGroups_[0]));
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
proto.massa.model.v1.SetOrKeepBytes.prototype.toObject = function(opt_includeInstance) {
  return proto.massa.model.v1.SetOrKeepBytes.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.massa.model.v1.SetOrKeepBytes} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.massa.model.v1.SetOrKeepBytes.toObject = function(includeInstance, msg) {
  var f, obj = {
set: (f = msg.getSet()) && google_protobuf_wrappers_pb.BytesValue.toObject(includeInstance, f),
keep: (f = msg.getKeep()) && massa_model_v1_commons_pb.Empty.toObject(includeInstance, f)
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
 * @return {!proto.massa.model.v1.SetOrKeepBytes}
 */
proto.massa.model.v1.SetOrKeepBytes.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.massa.model.v1.SetOrKeepBytes;
  return proto.massa.model.v1.SetOrKeepBytes.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.massa.model.v1.SetOrKeepBytes} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.massa.model.v1.SetOrKeepBytes}
 */
proto.massa.model.v1.SetOrKeepBytes.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new google_protobuf_wrappers_pb.BytesValue;
      reader.readMessage(value,google_protobuf_wrappers_pb.BytesValue.deserializeBinaryFromReader);
      msg.setSet(value);
      break;
    case 2:
      var value = new massa_model_v1_commons_pb.Empty;
      reader.readMessage(value,massa_model_v1_commons_pb.Empty.deserializeBinaryFromReader);
      msg.setKeep(value);
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
proto.massa.model.v1.SetOrKeepBytes.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.massa.model.v1.SetOrKeepBytes.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.massa.model.v1.SetOrKeepBytes} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.massa.model.v1.SetOrKeepBytes.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getSet();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      google_protobuf_wrappers_pb.BytesValue.serializeBinaryToWriter
    );
  }
  f = message.getKeep();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      massa_model_v1_commons_pb.Empty.serializeBinaryToWriter
    );
  }
};


/**
 * optional google.protobuf.BytesValue set = 1;
 * @return {?proto.google.protobuf.BytesValue}
 */
proto.massa.model.v1.SetOrKeepBytes.prototype.getSet = function() {
  return /** @type{?proto.google.protobuf.BytesValue} */ (
    jspb.Message.getWrapperField(this, google_protobuf_wrappers_pb.BytesValue, 1));
};


/**
 * @param {?proto.google.protobuf.BytesValue|undefined} value
 * @return {!proto.massa.model.v1.SetOrKeepBytes} returns this
*/
proto.massa.model.v1.SetOrKeepBytes.prototype.setSet = function(value) {
  return jspb.Message.setOneofWrapperField(this, 1, proto.massa.model.v1.SetOrKeepBytes.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.massa.model.v1.SetOrKeepBytes} returns this
 */
proto.massa.model.v1.SetOrKeepBytes.prototype.clearSet = function() {
  return this.setSet(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.massa.model.v1.SetOrKeepBytes.prototype.hasSet = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional Empty keep = 2;
 * @return {?proto.massa.model.v1.Empty}
 */
proto.massa.model.v1.SetOrKeepBytes.prototype.getKeep = function() {
  return /** @type{?proto.massa.model.v1.Empty} */ (
    jspb.Message.getWrapperField(this, massa_model_v1_commons_pb.Empty, 2));
};


/**
 * @param {?proto.massa.model.v1.Empty|undefined} value
 * @return {!proto.massa.model.v1.SetOrKeepBytes} returns this
*/
proto.massa.model.v1.SetOrKeepBytes.prototype.setKeep = function(value) {
  return jspb.Message.setOneofWrapperField(this, 2, proto.massa.model.v1.SetOrKeepBytes.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.massa.model.v1.SetOrKeepBytes} returns this
 */
proto.massa.model.v1.SetOrKeepBytes.prototype.clearKeep = function() {
  return this.setKeep(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.massa.model.v1.SetOrKeepBytes.prototype.hasKeep = function() {
  return jspb.Message.getField(this, 2) != null;
};



/**
 * Oneof group definitions for this message. Each group defines the field
 * numbers belonging to that group. When of these fields' value is set, all
 * other fields in the group are cleared. During deserialization, if multiple
 * fields are encountered for a group, only the last value seen will be kept.
 * @private {!Array<!Array<number>>}
 * @const
 */
proto.massa.model.v1.SetOrKeepBool.oneofGroups_ = [[1,2]];

/**
 * @enum {number}
 */
proto.massa.model.v1.SetOrKeepBool.ChangeCase = {
  CHANGE_NOT_SET: 0,
  SET: 1,
  KEEP: 2
};

/**
 * @return {proto.massa.model.v1.SetOrKeepBool.ChangeCase}
 */
proto.massa.model.v1.SetOrKeepBool.prototype.getChangeCase = function() {
  return /** @type {proto.massa.model.v1.SetOrKeepBool.ChangeCase} */(jspb.Message.computeOneofCase(this, proto.massa.model.v1.SetOrKeepBool.oneofGroups_[0]));
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
proto.massa.model.v1.SetOrKeepBool.prototype.toObject = function(opt_includeInstance) {
  return proto.massa.model.v1.SetOrKeepBool.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.massa.model.v1.SetOrKeepBool} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.massa.model.v1.SetOrKeepBool.toObject = function(includeInstance, msg) {
  var f, obj = {
set: (f = msg.getSet()) && google_protobuf_wrappers_pb.BoolValue.toObject(includeInstance, f),
keep: (f = msg.getKeep()) && massa_model_v1_commons_pb.Empty.toObject(includeInstance, f)
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
 * @return {!proto.massa.model.v1.SetOrKeepBool}
 */
proto.massa.model.v1.SetOrKeepBool.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.massa.model.v1.SetOrKeepBool;
  return proto.massa.model.v1.SetOrKeepBool.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.massa.model.v1.SetOrKeepBool} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.massa.model.v1.SetOrKeepBool}
 */
proto.massa.model.v1.SetOrKeepBool.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new google_protobuf_wrappers_pb.BoolValue;
      reader.readMessage(value,google_protobuf_wrappers_pb.BoolValue.deserializeBinaryFromReader);
      msg.setSet(value);
      break;
    case 2:
      var value = new massa_model_v1_commons_pb.Empty;
      reader.readMessage(value,massa_model_v1_commons_pb.Empty.deserializeBinaryFromReader);
      msg.setKeep(value);
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
proto.massa.model.v1.SetOrKeepBool.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.massa.model.v1.SetOrKeepBool.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.massa.model.v1.SetOrKeepBool} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.massa.model.v1.SetOrKeepBool.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getSet();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      google_protobuf_wrappers_pb.BoolValue.serializeBinaryToWriter
    );
  }
  f = message.getKeep();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      massa_model_v1_commons_pb.Empty.serializeBinaryToWriter
    );
  }
};


/**
 * optional google.protobuf.BoolValue set = 1;
 * @return {?proto.google.protobuf.BoolValue}
 */
proto.massa.model.v1.SetOrKeepBool.prototype.getSet = function() {
  return /** @type{?proto.google.protobuf.BoolValue} */ (
    jspb.Message.getWrapperField(this, google_protobuf_wrappers_pb.BoolValue, 1));
};


/**
 * @param {?proto.google.protobuf.BoolValue|undefined} value
 * @return {!proto.massa.model.v1.SetOrKeepBool} returns this
*/
proto.massa.model.v1.SetOrKeepBool.prototype.setSet = function(value) {
  return jspb.Message.setOneofWrapperField(this, 1, proto.massa.model.v1.SetOrKeepBool.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.massa.model.v1.SetOrKeepBool} returns this
 */
proto.massa.model.v1.SetOrKeepBool.prototype.clearSet = function() {
  return this.setSet(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.massa.model.v1.SetOrKeepBool.prototype.hasSet = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional Empty keep = 2;
 * @return {?proto.massa.model.v1.Empty}
 */
proto.massa.model.v1.SetOrKeepBool.prototype.getKeep = function() {
  return /** @type{?proto.massa.model.v1.Empty} */ (
    jspb.Message.getWrapperField(this, massa_model_v1_commons_pb.Empty, 2));
};


/**
 * @param {?proto.massa.model.v1.Empty|undefined} value
 * @return {!proto.massa.model.v1.SetOrKeepBool} returns this
*/
proto.massa.model.v1.SetOrKeepBool.prototype.setKeep = function(value) {
  return jspb.Message.setOneofWrapperField(this, 2, proto.massa.model.v1.SetOrKeepBool.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.massa.model.v1.SetOrKeepBool} returns this
 */
proto.massa.model.v1.SetOrKeepBool.prototype.clearKeep = function() {
  return this.setKeep(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.massa.model.v1.SetOrKeepBool.prototype.hasKeep = function() {
  return jspb.Message.getField(this, 2) != null;
};



/**
 * Oneof group definitions for this message. Each group defines the field
 * numbers belonging to that group. When of these fields' value is set, all
 * other fields in the group are cleared. During deserialization, if multiple
 * fields are encountered for a group, only the last value seen will be kept.
 * @private {!Array<!Array<number>>}
 * @const
 */
proto.massa.model.v1.SetOrKeepAsyncMessageTrigger.oneofGroups_ = [[1,2]];

/**
 * @enum {number}
 */
proto.massa.model.v1.SetOrKeepAsyncMessageTrigger.ChangeCase = {
  CHANGE_NOT_SET: 0,
  SET: 1,
  KEEP: 2
};

/**
 * @return {proto.massa.model.v1.SetOrKeepAsyncMessageTrigger.ChangeCase}
 */
proto.massa.model.v1.SetOrKeepAsyncMessageTrigger.prototype.getChangeCase = function() {
  return /** @type {proto.massa.model.v1.SetOrKeepAsyncMessageTrigger.ChangeCase} */(jspb.Message.computeOneofCase(this, proto.massa.model.v1.SetOrKeepAsyncMessageTrigger.oneofGroups_[0]));
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
proto.massa.model.v1.SetOrKeepAsyncMessageTrigger.prototype.toObject = function(opt_includeInstance) {
  return proto.massa.model.v1.SetOrKeepAsyncMessageTrigger.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.massa.model.v1.SetOrKeepAsyncMessageTrigger} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.massa.model.v1.SetOrKeepAsyncMessageTrigger.toObject = function(includeInstance, msg) {
  var f, obj = {
set: (f = msg.getSet()) && proto.massa.model.v1.AsyncMessageTrigger.toObject(includeInstance, f),
keep: (f = msg.getKeep()) && massa_model_v1_commons_pb.Empty.toObject(includeInstance, f)
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
 * @return {!proto.massa.model.v1.SetOrKeepAsyncMessageTrigger}
 */
proto.massa.model.v1.SetOrKeepAsyncMessageTrigger.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.massa.model.v1.SetOrKeepAsyncMessageTrigger;
  return proto.massa.model.v1.SetOrKeepAsyncMessageTrigger.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.massa.model.v1.SetOrKeepAsyncMessageTrigger} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.massa.model.v1.SetOrKeepAsyncMessageTrigger}
 */
proto.massa.model.v1.SetOrKeepAsyncMessageTrigger.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.massa.model.v1.AsyncMessageTrigger;
      reader.readMessage(value,proto.massa.model.v1.AsyncMessageTrigger.deserializeBinaryFromReader);
      msg.setSet(value);
      break;
    case 2:
      var value = new massa_model_v1_commons_pb.Empty;
      reader.readMessage(value,massa_model_v1_commons_pb.Empty.deserializeBinaryFromReader);
      msg.setKeep(value);
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
proto.massa.model.v1.SetOrKeepAsyncMessageTrigger.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.massa.model.v1.SetOrKeepAsyncMessageTrigger.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.massa.model.v1.SetOrKeepAsyncMessageTrigger} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.massa.model.v1.SetOrKeepAsyncMessageTrigger.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getSet();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      proto.massa.model.v1.AsyncMessageTrigger.serializeBinaryToWriter
    );
  }
  f = message.getKeep();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      massa_model_v1_commons_pb.Empty.serializeBinaryToWriter
    );
  }
};


/**
 * optional AsyncMessageTrigger set = 1;
 * @return {?proto.massa.model.v1.AsyncMessageTrigger}
 */
proto.massa.model.v1.SetOrKeepAsyncMessageTrigger.prototype.getSet = function() {
  return /** @type{?proto.massa.model.v1.AsyncMessageTrigger} */ (
    jspb.Message.getWrapperField(this, proto.massa.model.v1.AsyncMessageTrigger, 1));
};


/**
 * @param {?proto.massa.model.v1.AsyncMessageTrigger|undefined} value
 * @return {!proto.massa.model.v1.SetOrKeepAsyncMessageTrigger} returns this
*/
proto.massa.model.v1.SetOrKeepAsyncMessageTrigger.prototype.setSet = function(value) {
  return jspb.Message.setOneofWrapperField(this, 1, proto.massa.model.v1.SetOrKeepAsyncMessageTrigger.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.massa.model.v1.SetOrKeepAsyncMessageTrigger} returns this
 */
proto.massa.model.v1.SetOrKeepAsyncMessageTrigger.prototype.clearSet = function() {
  return this.setSet(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.massa.model.v1.SetOrKeepAsyncMessageTrigger.prototype.hasSet = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional Empty keep = 2;
 * @return {?proto.massa.model.v1.Empty}
 */
proto.massa.model.v1.SetOrKeepAsyncMessageTrigger.prototype.getKeep = function() {
  return /** @type{?proto.massa.model.v1.Empty} */ (
    jspb.Message.getWrapperField(this, massa_model_v1_commons_pb.Empty, 2));
};


/**
 * @param {?proto.massa.model.v1.Empty|undefined} value
 * @return {!proto.massa.model.v1.SetOrKeepAsyncMessageTrigger} returns this
*/
proto.massa.model.v1.SetOrKeepAsyncMessageTrigger.prototype.setKeep = function(value) {
  return jspb.Message.setOneofWrapperField(this, 2, proto.massa.model.v1.SetOrKeepAsyncMessageTrigger.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.massa.model.v1.SetOrKeepAsyncMessageTrigger} returns this
 */
proto.massa.model.v1.SetOrKeepAsyncMessageTrigger.prototype.clearKeep = function() {
  return this.setKeep(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.massa.model.v1.SetOrKeepAsyncMessageTrigger.prototype.hasKeep = function() {
  return jspb.Message.getField(this, 2) != null;
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
proto.massa.model.v1.AsyncMessageTrigger.prototype.toObject = function(opt_includeInstance) {
  return proto.massa.model.v1.AsyncMessageTrigger.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.massa.model.v1.AsyncMessageTrigger} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.massa.model.v1.AsyncMessageTrigger.toObject = function(includeInstance, msg) {
  var f, obj = {
address: jspb.Message.getFieldWithDefault(msg, 1, ""),
datastoreKey: (f = msg.getDatastoreKey()) && google_protobuf_wrappers_pb.BytesValue.toObject(includeInstance, f)
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
 * @return {!proto.massa.model.v1.AsyncMessageTrigger}
 */
proto.massa.model.v1.AsyncMessageTrigger.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.massa.model.v1.AsyncMessageTrigger;
  return proto.massa.model.v1.AsyncMessageTrigger.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.massa.model.v1.AsyncMessageTrigger} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.massa.model.v1.AsyncMessageTrigger}
 */
proto.massa.model.v1.AsyncMessageTrigger.deserializeBinaryFromReader = function(msg, reader) {
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
      var value = new google_protobuf_wrappers_pb.BytesValue;
      reader.readMessage(value,google_protobuf_wrappers_pb.BytesValue.deserializeBinaryFromReader);
      msg.setDatastoreKey(value);
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
proto.massa.model.v1.AsyncMessageTrigger.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.massa.model.v1.AsyncMessageTrigger.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.massa.model.v1.AsyncMessageTrigger} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.massa.model.v1.AsyncMessageTrigger.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getAddress();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getDatastoreKey();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      google_protobuf_wrappers_pb.BytesValue.serializeBinaryToWriter
    );
  }
};


/**
 * optional string address = 1;
 * @return {string}
 */
proto.massa.model.v1.AsyncMessageTrigger.prototype.getAddress = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.massa.model.v1.AsyncMessageTrigger} returns this
 */
proto.massa.model.v1.AsyncMessageTrigger.prototype.setAddress = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional google.protobuf.BytesValue datastore_key = 2;
 * @return {?proto.google.protobuf.BytesValue}
 */
proto.massa.model.v1.AsyncMessageTrigger.prototype.getDatastoreKey = function() {
  return /** @type{?proto.google.protobuf.BytesValue} */ (
    jspb.Message.getWrapperField(this, google_protobuf_wrappers_pb.BytesValue, 2));
};


/**
 * @param {?proto.google.protobuf.BytesValue|undefined} value
 * @return {!proto.massa.model.v1.AsyncMessageTrigger} returns this
*/
proto.massa.model.v1.AsyncMessageTrigger.prototype.setDatastoreKey = function(value) {
  return jspb.Message.setWrapperField(this, 2, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.massa.model.v1.AsyncMessageTrigger} returns this
 */
proto.massa.model.v1.AsyncMessageTrigger.prototype.clearDatastoreKey = function() {
  return this.setDatastoreKey(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.massa.model.v1.AsyncMessageTrigger.prototype.hasDatastoreKey = function() {
  return jspb.Message.getField(this, 2) != null;
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
proto.massa.model.v1.LedgerChangeEntry.prototype.toObject = function(opt_includeInstance) {
  return proto.massa.model.v1.LedgerChangeEntry.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.massa.model.v1.LedgerChangeEntry} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.massa.model.v1.LedgerChangeEntry.toObject = function(includeInstance, msg) {
  var f, obj = {
address: jspb.Message.getFieldWithDefault(msg, 1, ""),
value: (f = msg.getValue()) && proto.massa.model.v1.LedgerChangeValue.toObject(includeInstance, f)
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
 * @return {!proto.massa.model.v1.LedgerChangeEntry}
 */
proto.massa.model.v1.LedgerChangeEntry.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.massa.model.v1.LedgerChangeEntry;
  return proto.massa.model.v1.LedgerChangeEntry.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.massa.model.v1.LedgerChangeEntry} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.massa.model.v1.LedgerChangeEntry}
 */
proto.massa.model.v1.LedgerChangeEntry.deserializeBinaryFromReader = function(msg, reader) {
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
      var value = new proto.massa.model.v1.LedgerChangeValue;
      reader.readMessage(value,proto.massa.model.v1.LedgerChangeValue.deserializeBinaryFromReader);
      msg.setValue(value);
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
proto.massa.model.v1.LedgerChangeEntry.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.massa.model.v1.LedgerChangeEntry.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.massa.model.v1.LedgerChangeEntry} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.massa.model.v1.LedgerChangeEntry.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getAddress();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getValue();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      proto.massa.model.v1.LedgerChangeValue.serializeBinaryToWriter
    );
  }
};


/**
 * optional string address = 1;
 * @return {string}
 */
proto.massa.model.v1.LedgerChangeEntry.prototype.getAddress = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.massa.model.v1.LedgerChangeEntry} returns this
 */
proto.massa.model.v1.LedgerChangeEntry.prototype.setAddress = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional LedgerChangeValue value = 2;
 * @return {?proto.massa.model.v1.LedgerChangeValue}
 */
proto.massa.model.v1.LedgerChangeEntry.prototype.getValue = function() {
  return /** @type{?proto.massa.model.v1.LedgerChangeValue} */ (
    jspb.Message.getWrapperField(this, proto.massa.model.v1.LedgerChangeValue, 2));
};


/**
 * @param {?proto.massa.model.v1.LedgerChangeValue|undefined} value
 * @return {!proto.massa.model.v1.LedgerChangeEntry} returns this
*/
proto.massa.model.v1.LedgerChangeEntry.prototype.setValue = function(value) {
  return jspb.Message.setWrapperField(this, 2, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.massa.model.v1.LedgerChangeEntry} returns this
 */
proto.massa.model.v1.LedgerChangeEntry.prototype.clearValue = function() {
  return this.setValue(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.massa.model.v1.LedgerChangeEntry.prototype.hasValue = function() {
  return jspb.Message.getField(this, 2) != null;
};



/**
 * Oneof group definitions for this message. Each group defines the field
 * numbers belonging to that group. When of these fields' value is set, all
 * other fields in the group are cleared. During deserialization, if multiple
 * fields are encountered for a group, only the last value seen will be kept.
 * @private {!Array<!Array<number>>}
 * @const
 */
proto.massa.model.v1.LedgerChangeValue.oneofGroups_ = [[2,3]];

/**
 * @enum {number}
 */
proto.massa.model.v1.LedgerChangeValue.EntryCase = {
  ENTRY_NOT_SET: 0,
  CREATED_ENTRY: 2,
  UPDATED_ENTRY: 3
};

/**
 * @return {proto.massa.model.v1.LedgerChangeValue.EntryCase}
 */
proto.massa.model.v1.LedgerChangeValue.prototype.getEntryCase = function() {
  return /** @type {proto.massa.model.v1.LedgerChangeValue.EntryCase} */(jspb.Message.computeOneofCase(this, proto.massa.model.v1.LedgerChangeValue.oneofGroups_[0]));
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
proto.massa.model.v1.LedgerChangeValue.prototype.toObject = function(opt_includeInstance) {
  return proto.massa.model.v1.LedgerChangeValue.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.massa.model.v1.LedgerChangeValue} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.massa.model.v1.LedgerChangeValue.toObject = function(includeInstance, msg) {
  var f, obj = {
type: jspb.Message.getFieldWithDefault(msg, 1, 0),
createdEntry: (f = msg.getCreatedEntry()) && proto.massa.model.v1.LedgerEntry.toObject(includeInstance, f),
updatedEntry: (f = msg.getUpdatedEntry()) && proto.massa.model.v1.LedgerEntryUpdate.toObject(includeInstance, f)
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
 * @return {!proto.massa.model.v1.LedgerChangeValue}
 */
proto.massa.model.v1.LedgerChangeValue.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.massa.model.v1.LedgerChangeValue;
  return proto.massa.model.v1.LedgerChangeValue.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.massa.model.v1.LedgerChangeValue} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.massa.model.v1.LedgerChangeValue}
 */
proto.massa.model.v1.LedgerChangeValue.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {!proto.massa.model.v1.LedgerChangeType} */ (reader.readEnum());
      msg.setType(value);
      break;
    case 2:
      var value = new proto.massa.model.v1.LedgerEntry;
      reader.readMessage(value,proto.massa.model.v1.LedgerEntry.deserializeBinaryFromReader);
      msg.setCreatedEntry(value);
      break;
    case 3:
      var value = new proto.massa.model.v1.LedgerEntryUpdate;
      reader.readMessage(value,proto.massa.model.v1.LedgerEntryUpdate.deserializeBinaryFromReader);
      msg.setUpdatedEntry(value);
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
proto.massa.model.v1.LedgerChangeValue.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.massa.model.v1.LedgerChangeValue.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.massa.model.v1.LedgerChangeValue} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.massa.model.v1.LedgerChangeValue.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getType();
  if (f !== 0.0) {
    writer.writeEnum(
      1,
      f
    );
  }
  f = message.getCreatedEntry();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      proto.massa.model.v1.LedgerEntry.serializeBinaryToWriter
    );
  }
  f = message.getUpdatedEntry();
  if (f != null) {
    writer.writeMessage(
      3,
      f,
      proto.massa.model.v1.LedgerEntryUpdate.serializeBinaryToWriter
    );
  }
};


/**
 * optional LedgerChangeType type = 1;
 * @return {!proto.massa.model.v1.LedgerChangeType}
 */
proto.massa.model.v1.LedgerChangeValue.prototype.getType = function() {
  return /** @type {!proto.massa.model.v1.LedgerChangeType} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {!proto.massa.model.v1.LedgerChangeType} value
 * @return {!proto.massa.model.v1.LedgerChangeValue} returns this
 */
proto.massa.model.v1.LedgerChangeValue.prototype.setType = function(value) {
  return jspb.Message.setProto3EnumField(this, 1, value);
};


/**
 * optional LedgerEntry created_entry = 2;
 * @return {?proto.massa.model.v1.LedgerEntry}
 */
proto.massa.model.v1.LedgerChangeValue.prototype.getCreatedEntry = function() {
  return /** @type{?proto.massa.model.v1.LedgerEntry} */ (
    jspb.Message.getWrapperField(this, proto.massa.model.v1.LedgerEntry, 2));
};


/**
 * @param {?proto.massa.model.v1.LedgerEntry|undefined} value
 * @return {!proto.massa.model.v1.LedgerChangeValue} returns this
*/
proto.massa.model.v1.LedgerChangeValue.prototype.setCreatedEntry = function(value) {
  return jspb.Message.setOneofWrapperField(this, 2, proto.massa.model.v1.LedgerChangeValue.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.massa.model.v1.LedgerChangeValue} returns this
 */
proto.massa.model.v1.LedgerChangeValue.prototype.clearCreatedEntry = function() {
  return this.setCreatedEntry(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.massa.model.v1.LedgerChangeValue.prototype.hasCreatedEntry = function() {
  return jspb.Message.getField(this, 2) != null;
};


/**
 * optional LedgerEntryUpdate updated_entry = 3;
 * @return {?proto.massa.model.v1.LedgerEntryUpdate}
 */
proto.massa.model.v1.LedgerChangeValue.prototype.getUpdatedEntry = function() {
  return /** @type{?proto.massa.model.v1.LedgerEntryUpdate} */ (
    jspb.Message.getWrapperField(this, proto.massa.model.v1.LedgerEntryUpdate, 3));
};


/**
 * @param {?proto.massa.model.v1.LedgerEntryUpdate|undefined} value
 * @return {!proto.massa.model.v1.LedgerChangeValue} returns this
*/
proto.massa.model.v1.LedgerChangeValue.prototype.setUpdatedEntry = function(value) {
  return jspb.Message.setOneofWrapperField(this, 3, proto.massa.model.v1.LedgerChangeValue.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.massa.model.v1.LedgerChangeValue} returns this
 */
proto.massa.model.v1.LedgerChangeValue.prototype.clearUpdatedEntry = function() {
  return this.setUpdatedEntry(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.massa.model.v1.LedgerChangeValue.prototype.hasUpdatedEntry = function() {
  return jspb.Message.getField(this, 3) != null;
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.massa.model.v1.LedgerEntry.repeatedFields_ = [3];



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
proto.massa.model.v1.LedgerEntry.prototype.toObject = function(opt_includeInstance) {
  return proto.massa.model.v1.LedgerEntry.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.massa.model.v1.LedgerEntry} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.massa.model.v1.LedgerEntry.toObject = function(includeInstance, msg) {
  var f, obj = {
balance: (f = msg.getBalance()) && massa_model_v1_amount_pb.NativeAmount.toObject(includeInstance, f),
bytecode: msg.getBytecode_asB64(),
datastoreList: jspb.Message.toObjectList(msg.getDatastoreList(),
    massa_model_v1_commons_pb.BytesMapFieldEntry.toObject, includeInstance)
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
 * @return {!proto.massa.model.v1.LedgerEntry}
 */
proto.massa.model.v1.LedgerEntry.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.massa.model.v1.LedgerEntry;
  return proto.massa.model.v1.LedgerEntry.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.massa.model.v1.LedgerEntry} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.massa.model.v1.LedgerEntry}
 */
proto.massa.model.v1.LedgerEntry.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new massa_model_v1_amount_pb.NativeAmount;
      reader.readMessage(value,massa_model_v1_amount_pb.NativeAmount.deserializeBinaryFromReader);
      msg.setBalance(value);
      break;
    case 2:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setBytecode(value);
      break;
    case 3:
      var value = new massa_model_v1_commons_pb.BytesMapFieldEntry;
      reader.readMessage(value,massa_model_v1_commons_pb.BytesMapFieldEntry.deserializeBinaryFromReader);
      msg.addDatastore(value);
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
proto.massa.model.v1.LedgerEntry.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.massa.model.v1.LedgerEntry.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.massa.model.v1.LedgerEntry} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.massa.model.v1.LedgerEntry.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getBalance();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      massa_model_v1_amount_pb.NativeAmount.serializeBinaryToWriter
    );
  }
  f = message.getBytecode_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      2,
      f
    );
  }
  f = message.getDatastoreList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      3,
      f,
      massa_model_v1_commons_pb.BytesMapFieldEntry.serializeBinaryToWriter
    );
  }
};


/**
 * optional NativeAmount balance = 1;
 * @return {?proto.massa.model.v1.NativeAmount}
 */
proto.massa.model.v1.LedgerEntry.prototype.getBalance = function() {
  return /** @type{?proto.massa.model.v1.NativeAmount} */ (
    jspb.Message.getWrapperField(this, massa_model_v1_amount_pb.NativeAmount, 1));
};


/**
 * @param {?proto.massa.model.v1.NativeAmount|undefined} value
 * @return {!proto.massa.model.v1.LedgerEntry} returns this
*/
proto.massa.model.v1.LedgerEntry.prototype.setBalance = function(value) {
  return jspb.Message.setWrapperField(this, 1, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.massa.model.v1.LedgerEntry} returns this
 */
proto.massa.model.v1.LedgerEntry.prototype.clearBalance = function() {
  return this.setBalance(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.massa.model.v1.LedgerEntry.prototype.hasBalance = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional bytes bytecode = 2;
 * @return {string}
 */
proto.massa.model.v1.LedgerEntry.prototype.getBytecode = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * optional bytes bytecode = 2;
 * This is a type-conversion wrapper around `getBytecode()`
 * @return {string}
 */
proto.massa.model.v1.LedgerEntry.prototype.getBytecode_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getBytecode()));
};


/**
 * optional bytes bytecode = 2;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getBytecode()`
 * @return {!Uint8Array}
 */
proto.massa.model.v1.LedgerEntry.prototype.getBytecode_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getBytecode()));
};


/**
 * @param {!(string|Uint8Array)} value
 * @return {!proto.massa.model.v1.LedgerEntry} returns this
 */
proto.massa.model.v1.LedgerEntry.prototype.setBytecode = function(value) {
  return jspb.Message.setProto3BytesField(this, 2, value);
};


/**
 * repeated BytesMapFieldEntry datastore = 3;
 * @return {!Array<!proto.massa.model.v1.BytesMapFieldEntry>}
 */
proto.massa.model.v1.LedgerEntry.prototype.getDatastoreList = function() {
  return /** @type{!Array<!proto.massa.model.v1.BytesMapFieldEntry>} */ (
    jspb.Message.getRepeatedWrapperField(this, massa_model_v1_commons_pb.BytesMapFieldEntry, 3));
};


/**
 * @param {!Array<!proto.massa.model.v1.BytesMapFieldEntry>} value
 * @return {!proto.massa.model.v1.LedgerEntry} returns this
*/
proto.massa.model.v1.LedgerEntry.prototype.setDatastoreList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 3, value);
};


/**
 * @param {!proto.massa.model.v1.BytesMapFieldEntry=} opt_value
 * @param {number=} opt_index
 * @return {!proto.massa.model.v1.BytesMapFieldEntry}
 */
proto.massa.model.v1.LedgerEntry.prototype.addDatastore = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 3, opt_value, proto.massa.model.v1.BytesMapFieldEntry, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.massa.model.v1.LedgerEntry} returns this
 */
proto.massa.model.v1.LedgerEntry.prototype.clearDatastoreList = function() {
  return this.setDatastoreList([]);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.massa.model.v1.LedgerEntryUpdate.repeatedFields_ = [3];



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
proto.massa.model.v1.LedgerEntryUpdate.prototype.toObject = function(opt_includeInstance) {
  return proto.massa.model.v1.LedgerEntryUpdate.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.massa.model.v1.LedgerEntryUpdate} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.massa.model.v1.LedgerEntryUpdate.toObject = function(includeInstance, msg) {
  var f, obj = {
balance: (f = msg.getBalance()) && proto.massa.model.v1.SetOrKeepBalance.toObject(includeInstance, f),
bytecode: (f = msg.getBytecode()) && proto.massa.model.v1.SetOrKeepBytes.toObject(includeInstance, f),
datastoreList: jspb.Message.toObjectList(msg.getDatastoreList(),
    proto.massa.model.v1.SetOrDeleteDatastoreEntry.toObject, includeInstance)
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
 * @return {!proto.massa.model.v1.LedgerEntryUpdate}
 */
proto.massa.model.v1.LedgerEntryUpdate.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.massa.model.v1.LedgerEntryUpdate;
  return proto.massa.model.v1.LedgerEntryUpdate.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.massa.model.v1.LedgerEntryUpdate} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.massa.model.v1.LedgerEntryUpdate}
 */
proto.massa.model.v1.LedgerEntryUpdate.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.massa.model.v1.SetOrKeepBalance;
      reader.readMessage(value,proto.massa.model.v1.SetOrKeepBalance.deserializeBinaryFromReader);
      msg.setBalance(value);
      break;
    case 2:
      var value = new proto.massa.model.v1.SetOrKeepBytes;
      reader.readMessage(value,proto.massa.model.v1.SetOrKeepBytes.deserializeBinaryFromReader);
      msg.setBytecode(value);
      break;
    case 3:
      var value = new proto.massa.model.v1.SetOrDeleteDatastoreEntry;
      reader.readMessage(value,proto.massa.model.v1.SetOrDeleteDatastoreEntry.deserializeBinaryFromReader);
      msg.addDatastore(value);
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
proto.massa.model.v1.LedgerEntryUpdate.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.massa.model.v1.LedgerEntryUpdate.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.massa.model.v1.LedgerEntryUpdate} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.massa.model.v1.LedgerEntryUpdate.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getBalance();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      proto.massa.model.v1.SetOrKeepBalance.serializeBinaryToWriter
    );
  }
  f = message.getBytecode();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      proto.massa.model.v1.SetOrKeepBytes.serializeBinaryToWriter
    );
  }
  f = message.getDatastoreList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      3,
      f,
      proto.massa.model.v1.SetOrDeleteDatastoreEntry.serializeBinaryToWriter
    );
  }
};


/**
 * optional SetOrKeepBalance balance = 1;
 * @return {?proto.massa.model.v1.SetOrKeepBalance}
 */
proto.massa.model.v1.LedgerEntryUpdate.prototype.getBalance = function() {
  return /** @type{?proto.massa.model.v1.SetOrKeepBalance} */ (
    jspb.Message.getWrapperField(this, proto.massa.model.v1.SetOrKeepBalance, 1));
};


/**
 * @param {?proto.massa.model.v1.SetOrKeepBalance|undefined} value
 * @return {!proto.massa.model.v1.LedgerEntryUpdate} returns this
*/
proto.massa.model.v1.LedgerEntryUpdate.prototype.setBalance = function(value) {
  return jspb.Message.setWrapperField(this, 1, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.massa.model.v1.LedgerEntryUpdate} returns this
 */
proto.massa.model.v1.LedgerEntryUpdate.prototype.clearBalance = function() {
  return this.setBalance(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.massa.model.v1.LedgerEntryUpdate.prototype.hasBalance = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional SetOrKeepBytes bytecode = 2;
 * @return {?proto.massa.model.v1.SetOrKeepBytes}
 */
proto.massa.model.v1.LedgerEntryUpdate.prototype.getBytecode = function() {
  return /** @type{?proto.massa.model.v1.SetOrKeepBytes} */ (
    jspb.Message.getWrapperField(this, proto.massa.model.v1.SetOrKeepBytes, 2));
};


/**
 * @param {?proto.massa.model.v1.SetOrKeepBytes|undefined} value
 * @return {!proto.massa.model.v1.LedgerEntryUpdate} returns this
*/
proto.massa.model.v1.LedgerEntryUpdate.prototype.setBytecode = function(value) {
  return jspb.Message.setWrapperField(this, 2, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.massa.model.v1.LedgerEntryUpdate} returns this
 */
proto.massa.model.v1.LedgerEntryUpdate.prototype.clearBytecode = function() {
  return this.setBytecode(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.massa.model.v1.LedgerEntryUpdate.prototype.hasBytecode = function() {
  return jspb.Message.getField(this, 2) != null;
};


/**
 * repeated SetOrDeleteDatastoreEntry datastore = 3;
 * @return {!Array<!proto.massa.model.v1.SetOrDeleteDatastoreEntry>}
 */
proto.massa.model.v1.LedgerEntryUpdate.prototype.getDatastoreList = function() {
  return /** @type{!Array<!proto.massa.model.v1.SetOrDeleteDatastoreEntry>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.massa.model.v1.SetOrDeleteDatastoreEntry, 3));
};


/**
 * @param {!Array<!proto.massa.model.v1.SetOrDeleteDatastoreEntry>} value
 * @return {!proto.massa.model.v1.LedgerEntryUpdate} returns this
*/
proto.massa.model.v1.LedgerEntryUpdate.prototype.setDatastoreList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 3, value);
};


/**
 * @param {!proto.massa.model.v1.SetOrDeleteDatastoreEntry=} opt_value
 * @param {number=} opt_index
 * @return {!proto.massa.model.v1.SetOrDeleteDatastoreEntry}
 */
proto.massa.model.v1.LedgerEntryUpdate.prototype.addDatastore = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 3, opt_value, proto.massa.model.v1.SetOrDeleteDatastoreEntry, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.massa.model.v1.LedgerEntryUpdate} returns this
 */
proto.massa.model.v1.LedgerEntryUpdate.prototype.clearDatastoreList = function() {
  return this.setDatastoreList([]);
};



/**
 * Oneof group definitions for this message. Each group defines the field
 * numbers belonging to that group. When of these fields' value is set, all
 * other fields in the group are cleared. During deserialization, if multiple
 * fields are encountered for a group, only the last value seen will be kept.
 * @private {!Array<!Array<number>>}
 * @const
 */
proto.massa.model.v1.SetOrKeepBalance.oneofGroups_ = [[1,2]];

/**
 * @enum {number}
 */
proto.massa.model.v1.SetOrKeepBalance.ChangeCase = {
  CHANGE_NOT_SET: 0,
  SET: 1,
  KEEP: 2
};

/**
 * @return {proto.massa.model.v1.SetOrKeepBalance.ChangeCase}
 */
proto.massa.model.v1.SetOrKeepBalance.prototype.getChangeCase = function() {
  return /** @type {proto.massa.model.v1.SetOrKeepBalance.ChangeCase} */(jspb.Message.computeOneofCase(this, proto.massa.model.v1.SetOrKeepBalance.oneofGroups_[0]));
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
proto.massa.model.v1.SetOrKeepBalance.prototype.toObject = function(opt_includeInstance) {
  return proto.massa.model.v1.SetOrKeepBalance.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.massa.model.v1.SetOrKeepBalance} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.massa.model.v1.SetOrKeepBalance.toObject = function(includeInstance, msg) {
  var f, obj = {
set: (f = msg.getSet()) && massa_model_v1_amount_pb.NativeAmount.toObject(includeInstance, f),
keep: (f = msg.getKeep()) && massa_model_v1_commons_pb.Empty.toObject(includeInstance, f)
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
 * @return {!proto.massa.model.v1.SetOrKeepBalance}
 */
proto.massa.model.v1.SetOrKeepBalance.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.massa.model.v1.SetOrKeepBalance;
  return proto.massa.model.v1.SetOrKeepBalance.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.massa.model.v1.SetOrKeepBalance} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.massa.model.v1.SetOrKeepBalance}
 */
proto.massa.model.v1.SetOrKeepBalance.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new massa_model_v1_amount_pb.NativeAmount;
      reader.readMessage(value,massa_model_v1_amount_pb.NativeAmount.deserializeBinaryFromReader);
      msg.setSet(value);
      break;
    case 2:
      var value = new massa_model_v1_commons_pb.Empty;
      reader.readMessage(value,massa_model_v1_commons_pb.Empty.deserializeBinaryFromReader);
      msg.setKeep(value);
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
proto.massa.model.v1.SetOrKeepBalance.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.massa.model.v1.SetOrKeepBalance.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.massa.model.v1.SetOrKeepBalance} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.massa.model.v1.SetOrKeepBalance.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getSet();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      massa_model_v1_amount_pb.NativeAmount.serializeBinaryToWriter
    );
  }
  f = message.getKeep();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      massa_model_v1_commons_pb.Empty.serializeBinaryToWriter
    );
  }
};


/**
 * optional NativeAmount set = 1;
 * @return {?proto.massa.model.v1.NativeAmount}
 */
proto.massa.model.v1.SetOrKeepBalance.prototype.getSet = function() {
  return /** @type{?proto.massa.model.v1.NativeAmount} */ (
    jspb.Message.getWrapperField(this, massa_model_v1_amount_pb.NativeAmount, 1));
};


/**
 * @param {?proto.massa.model.v1.NativeAmount|undefined} value
 * @return {!proto.massa.model.v1.SetOrKeepBalance} returns this
*/
proto.massa.model.v1.SetOrKeepBalance.prototype.setSet = function(value) {
  return jspb.Message.setOneofWrapperField(this, 1, proto.massa.model.v1.SetOrKeepBalance.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.massa.model.v1.SetOrKeepBalance} returns this
 */
proto.massa.model.v1.SetOrKeepBalance.prototype.clearSet = function() {
  return this.setSet(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.massa.model.v1.SetOrKeepBalance.prototype.hasSet = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional Empty keep = 2;
 * @return {?proto.massa.model.v1.Empty}
 */
proto.massa.model.v1.SetOrKeepBalance.prototype.getKeep = function() {
  return /** @type{?proto.massa.model.v1.Empty} */ (
    jspb.Message.getWrapperField(this, massa_model_v1_commons_pb.Empty, 2));
};


/**
 * @param {?proto.massa.model.v1.Empty|undefined} value
 * @return {!proto.massa.model.v1.SetOrKeepBalance} returns this
*/
proto.massa.model.v1.SetOrKeepBalance.prototype.setKeep = function(value) {
  return jspb.Message.setOneofWrapperField(this, 2, proto.massa.model.v1.SetOrKeepBalance.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.massa.model.v1.SetOrKeepBalance} returns this
 */
proto.massa.model.v1.SetOrKeepBalance.prototype.clearKeep = function() {
  return this.setKeep(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.massa.model.v1.SetOrKeepBalance.prototype.hasKeep = function() {
  return jspb.Message.getField(this, 2) != null;
};



/**
 * Oneof group definitions for this message. Each group defines the field
 * numbers belonging to that group. When of these fields' value is set, all
 * other fields in the group are cleared. During deserialization, if multiple
 * fields are encountered for a group, only the last value seen will be kept.
 * @private {!Array<!Array<number>>}
 * @const
 */
proto.massa.model.v1.SetOrDeleteDatastoreEntry.oneofGroups_ = [[1,2]];

/**
 * @enum {number}
 */
proto.massa.model.v1.SetOrDeleteDatastoreEntry.ChangeCase = {
  CHANGE_NOT_SET: 0,
  SET: 1,
  DELETE: 2
};

/**
 * @return {proto.massa.model.v1.SetOrDeleteDatastoreEntry.ChangeCase}
 */
proto.massa.model.v1.SetOrDeleteDatastoreEntry.prototype.getChangeCase = function() {
  return /** @type {proto.massa.model.v1.SetOrDeleteDatastoreEntry.ChangeCase} */(jspb.Message.computeOneofCase(this, proto.massa.model.v1.SetOrDeleteDatastoreEntry.oneofGroups_[0]));
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
proto.massa.model.v1.SetOrDeleteDatastoreEntry.prototype.toObject = function(opt_includeInstance) {
  return proto.massa.model.v1.SetOrDeleteDatastoreEntry.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.massa.model.v1.SetOrDeleteDatastoreEntry} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.massa.model.v1.SetOrDeleteDatastoreEntry.toObject = function(includeInstance, msg) {
  var f, obj = {
set: (f = msg.getSet()) && massa_model_v1_commons_pb.BytesMapFieldEntry.toObject(includeInstance, f),
pb_delete: (f = msg.getDelete()) && massa_model_v1_commons_pb.Empty.toObject(includeInstance, f)
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
 * @return {!proto.massa.model.v1.SetOrDeleteDatastoreEntry}
 */
proto.massa.model.v1.SetOrDeleteDatastoreEntry.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.massa.model.v1.SetOrDeleteDatastoreEntry;
  return proto.massa.model.v1.SetOrDeleteDatastoreEntry.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.massa.model.v1.SetOrDeleteDatastoreEntry} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.massa.model.v1.SetOrDeleteDatastoreEntry}
 */
proto.massa.model.v1.SetOrDeleteDatastoreEntry.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new massa_model_v1_commons_pb.BytesMapFieldEntry;
      reader.readMessage(value,massa_model_v1_commons_pb.BytesMapFieldEntry.deserializeBinaryFromReader);
      msg.setSet(value);
      break;
    case 2:
      var value = new massa_model_v1_commons_pb.Empty;
      reader.readMessage(value,massa_model_v1_commons_pb.Empty.deserializeBinaryFromReader);
      msg.setDelete(value);
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
proto.massa.model.v1.SetOrDeleteDatastoreEntry.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.massa.model.v1.SetOrDeleteDatastoreEntry.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.massa.model.v1.SetOrDeleteDatastoreEntry} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.massa.model.v1.SetOrDeleteDatastoreEntry.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getSet();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      massa_model_v1_commons_pb.BytesMapFieldEntry.serializeBinaryToWriter
    );
  }
  f = message.getDelete();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      massa_model_v1_commons_pb.Empty.serializeBinaryToWriter
    );
  }
};


/**
 * optional BytesMapFieldEntry set = 1;
 * @return {?proto.massa.model.v1.BytesMapFieldEntry}
 */
proto.massa.model.v1.SetOrDeleteDatastoreEntry.prototype.getSet = function() {
  return /** @type{?proto.massa.model.v1.BytesMapFieldEntry} */ (
    jspb.Message.getWrapperField(this, massa_model_v1_commons_pb.BytesMapFieldEntry, 1));
};


/**
 * @param {?proto.massa.model.v1.BytesMapFieldEntry|undefined} value
 * @return {!proto.massa.model.v1.SetOrDeleteDatastoreEntry} returns this
*/
proto.massa.model.v1.SetOrDeleteDatastoreEntry.prototype.setSet = function(value) {
  return jspb.Message.setOneofWrapperField(this, 1, proto.massa.model.v1.SetOrDeleteDatastoreEntry.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.massa.model.v1.SetOrDeleteDatastoreEntry} returns this
 */
proto.massa.model.v1.SetOrDeleteDatastoreEntry.prototype.clearSet = function() {
  return this.setSet(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.massa.model.v1.SetOrDeleteDatastoreEntry.prototype.hasSet = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional Empty delete = 2;
 * @return {?proto.massa.model.v1.Empty}
 */
proto.massa.model.v1.SetOrDeleteDatastoreEntry.prototype.getDelete = function() {
  return /** @type{?proto.massa.model.v1.Empty} */ (
    jspb.Message.getWrapperField(this, massa_model_v1_commons_pb.Empty, 2));
};


/**
 * @param {?proto.massa.model.v1.Empty|undefined} value
 * @return {!proto.massa.model.v1.SetOrDeleteDatastoreEntry} returns this
*/
proto.massa.model.v1.SetOrDeleteDatastoreEntry.prototype.setDelete = function(value) {
  return jspb.Message.setOneofWrapperField(this, 2, proto.massa.model.v1.SetOrDeleteDatastoreEntry.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.massa.model.v1.SetOrDeleteDatastoreEntry} returns this
 */
proto.massa.model.v1.SetOrDeleteDatastoreEntry.prototype.clearDelete = function() {
  return this.setDelete(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.massa.model.v1.SetOrDeleteDatastoreEntry.prototype.hasDelete = function() {
  return jspb.Message.getField(this, 2) != null;
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.massa.model.v1.ReadOnlyExecutionCall.repeatedFields_ = [2];

/**
 * Oneof group definitions for this message. Each group defines the field
 * numbers belonging to that group. When of these fields' value is set, all
 * other fields in the group are cleared. During deserialization, if multiple
 * fields are encountered for a group, only the last value seen will be kept.
 * @private {!Array<!Array<number>>}
 * @const
 */
proto.massa.model.v1.ReadOnlyExecutionCall.oneofGroups_ = [[3,4]];

/**
 * @enum {number}
 */
proto.massa.model.v1.ReadOnlyExecutionCall.TargetCase = {
  TARGET_NOT_SET: 0,
  BYTECODE_CALL: 3,
  FUNCTION_CALL: 4
};

/**
 * @return {proto.massa.model.v1.ReadOnlyExecutionCall.TargetCase}
 */
proto.massa.model.v1.ReadOnlyExecutionCall.prototype.getTargetCase = function() {
  return /** @type {proto.massa.model.v1.ReadOnlyExecutionCall.TargetCase} */(jspb.Message.computeOneofCase(this, proto.massa.model.v1.ReadOnlyExecutionCall.oneofGroups_[0]));
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
proto.massa.model.v1.ReadOnlyExecutionCall.prototype.toObject = function(opt_includeInstance) {
  return proto.massa.model.v1.ReadOnlyExecutionCall.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.massa.model.v1.ReadOnlyExecutionCall} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.massa.model.v1.ReadOnlyExecutionCall.toObject = function(includeInstance, msg) {
  var f, obj = {
maxGas: jspb.Message.getFieldWithDefault(msg, 1, 0),
callStackList: jspb.Message.toObjectList(msg.getCallStackList(),
    proto.massa.model.v1.ExecutionStackElement.toObject, includeInstance),
bytecodeCall: (f = msg.getBytecodeCall()) && proto.massa.model.v1.BytecodeExecution.toObject(includeInstance, f),
functionCall: (f = msg.getFunctionCall()) && proto.massa.model.v1.FunctionCall.toObject(includeInstance, f),
callerAddress: (f = msg.getCallerAddress()) && google_protobuf_wrappers_pb.StringValue.toObject(includeInstance, f),
fee: (f = msg.getFee()) && massa_model_v1_amount_pb.NativeAmount.toObject(includeInstance, f)
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
 * @return {!proto.massa.model.v1.ReadOnlyExecutionCall}
 */
proto.massa.model.v1.ReadOnlyExecutionCall.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.massa.model.v1.ReadOnlyExecutionCall;
  return proto.massa.model.v1.ReadOnlyExecutionCall.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.massa.model.v1.ReadOnlyExecutionCall} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.massa.model.v1.ReadOnlyExecutionCall}
 */
proto.massa.model.v1.ReadOnlyExecutionCall.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readUint64());
      msg.setMaxGas(value);
      break;
    case 2:
      var value = new proto.massa.model.v1.ExecutionStackElement;
      reader.readMessage(value,proto.massa.model.v1.ExecutionStackElement.deserializeBinaryFromReader);
      msg.addCallStack(value);
      break;
    case 3:
      var value = new proto.massa.model.v1.BytecodeExecution;
      reader.readMessage(value,proto.massa.model.v1.BytecodeExecution.deserializeBinaryFromReader);
      msg.setBytecodeCall(value);
      break;
    case 4:
      var value = new proto.massa.model.v1.FunctionCall;
      reader.readMessage(value,proto.massa.model.v1.FunctionCall.deserializeBinaryFromReader);
      msg.setFunctionCall(value);
      break;
    case 5:
      var value = new google_protobuf_wrappers_pb.StringValue;
      reader.readMessage(value,google_protobuf_wrappers_pb.StringValue.deserializeBinaryFromReader);
      msg.setCallerAddress(value);
      break;
    case 7:
      var value = new massa_model_v1_amount_pb.NativeAmount;
      reader.readMessage(value,massa_model_v1_amount_pb.NativeAmount.deserializeBinaryFromReader);
      msg.setFee(value);
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
proto.massa.model.v1.ReadOnlyExecutionCall.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.massa.model.v1.ReadOnlyExecutionCall.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.massa.model.v1.ReadOnlyExecutionCall} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.massa.model.v1.ReadOnlyExecutionCall.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getMaxGas();
  if (f !== 0) {
    writer.writeUint64(
      1,
      f
    );
  }
  f = message.getCallStackList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      2,
      f,
      proto.massa.model.v1.ExecutionStackElement.serializeBinaryToWriter
    );
  }
  f = message.getBytecodeCall();
  if (f != null) {
    writer.writeMessage(
      3,
      f,
      proto.massa.model.v1.BytecodeExecution.serializeBinaryToWriter
    );
  }
  f = message.getFunctionCall();
  if (f != null) {
    writer.writeMessage(
      4,
      f,
      proto.massa.model.v1.FunctionCall.serializeBinaryToWriter
    );
  }
  f = message.getCallerAddress();
  if (f != null) {
    writer.writeMessage(
      5,
      f,
      google_protobuf_wrappers_pb.StringValue.serializeBinaryToWriter
    );
  }
  f = message.getFee();
  if (f != null) {
    writer.writeMessage(
      7,
      f,
      massa_model_v1_amount_pb.NativeAmount.serializeBinaryToWriter
    );
  }
};


/**
 * optional uint64 max_gas = 1;
 * @return {number}
 */
proto.massa.model.v1.ReadOnlyExecutionCall.prototype.getMaxGas = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.massa.model.v1.ReadOnlyExecutionCall} returns this
 */
proto.massa.model.v1.ReadOnlyExecutionCall.prototype.setMaxGas = function(value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};


/**
 * repeated ExecutionStackElement call_stack = 2;
 * @return {!Array<!proto.massa.model.v1.ExecutionStackElement>}
 */
proto.massa.model.v1.ReadOnlyExecutionCall.prototype.getCallStackList = function() {
  return /** @type{!Array<!proto.massa.model.v1.ExecutionStackElement>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.massa.model.v1.ExecutionStackElement, 2));
};


/**
 * @param {!Array<!proto.massa.model.v1.ExecutionStackElement>} value
 * @return {!proto.massa.model.v1.ReadOnlyExecutionCall} returns this
*/
proto.massa.model.v1.ReadOnlyExecutionCall.prototype.setCallStackList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 2, value);
};


/**
 * @param {!proto.massa.model.v1.ExecutionStackElement=} opt_value
 * @param {number=} opt_index
 * @return {!proto.massa.model.v1.ExecutionStackElement}
 */
proto.massa.model.v1.ReadOnlyExecutionCall.prototype.addCallStack = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 2, opt_value, proto.massa.model.v1.ExecutionStackElement, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.massa.model.v1.ReadOnlyExecutionCall} returns this
 */
proto.massa.model.v1.ReadOnlyExecutionCall.prototype.clearCallStackList = function() {
  return this.setCallStackList([]);
};


/**
 * optional BytecodeExecution bytecode_call = 3;
 * @return {?proto.massa.model.v1.BytecodeExecution}
 */
proto.massa.model.v1.ReadOnlyExecutionCall.prototype.getBytecodeCall = function() {
  return /** @type{?proto.massa.model.v1.BytecodeExecution} */ (
    jspb.Message.getWrapperField(this, proto.massa.model.v1.BytecodeExecution, 3));
};


/**
 * @param {?proto.massa.model.v1.BytecodeExecution|undefined} value
 * @return {!proto.massa.model.v1.ReadOnlyExecutionCall} returns this
*/
proto.massa.model.v1.ReadOnlyExecutionCall.prototype.setBytecodeCall = function(value) {
  return jspb.Message.setOneofWrapperField(this, 3, proto.massa.model.v1.ReadOnlyExecutionCall.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.massa.model.v1.ReadOnlyExecutionCall} returns this
 */
proto.massa.model.v1.ReadOnlyExecutionCall.prototype.clearBytecodeCall = function() {
  return this.setBytecodeCall(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.massa.model.v1.ReadOnlyExecutionCall.prototype.hasBytecodeCall = function() {
  return jspb.Message.getField(this, 3) != null;
};


/**
 * optional FunctionCall function_call = 4;
 * @return {?proto.massa.model.v1.FunctionCall}
 */
proto.massa.model.v1.ReadOnlyExecutionCall.prototype.getFunctionCall = function() {
  return /** @type{?proto.massa.model.v1.FunctionCall} */ (
    jspb.Message.getWrapperField(this, proto.massa.model.v1.FunctionCall, 4));
};


/**
 * @param {?proto.massa.model.v1.FunctionCall|undefined} value
 * @return {!proto.massa.model.v1.ReadOnlyExecutionCall} returns this
*/
proto.massa.model.v1.ReadOnlyExecutionCall.prototype.setFunctionCall = function(value) {
  return jspb.Message.setOneofWrapperField(this, 4, proto.massa.model.v1.ReadOnlyExecutionCall.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.massa.model.v1.ReadOnlyExecutionCall} returns this
 */
proto.massa.model.v1.ReadOnlyExecutionCall.prototype.clearFunctionCall = function() {
  return this.setFunctionCall(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.massa.model.v1.ReadOnlyExecutionCall.prototype.hasFunctionCall = function() {
  return jspb.Message.getField(this, 4) != null;
};


/**
 * optional google.protobuf.StringValue caller_address = 5;
 * @return {?proto.google.protobuf.StringValue}
 */
proto.massa.model.v1.ReadOnlyExecutionCall.prototype.getCallerAddress = function() {
  return /** @type{?proto.google.protobuf.StringValue} */ (
    jspb.Message.getWrapperField(this, google_protobuf_wrappers_pb.StringValue, 5));
};


/**
 * @param {?proto.google.protobuf.StringValue|undefined} value
 * @return {!proto.massa.model.v1.ReadOnlyExecutionCall} returns this
*/
proto.massa.model.v1.ReadOnlyExecutionCall.prototype.setCallerAddress = function(value) {
  return jspb.Message.setWrapperField(this, 5, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.massa.model.v1.ReadOnlyExecutionCall} returns this
 */
proto.massa.model.v1.ReadOnlyExecutionCall.prototype.clearCallerAddress = function() {
  return this.setCallerAddress(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.massa.model.v1.ReadOnlyExecutionCall.prototype.hasCallerAddress = function() {
  return jspb.Message.getField(this, 5) != null;
};


/**
 * optional NativeAmount fee = 7;
 * @return {?proto.massa.model.v1.NativeAmount}
 */
proto.massa.model.v1.ReadOnlyExecutionCall.prototype.getFee = function() {
  return /** @type{?proto.massa.model.v1.NativeAmount} */ (
    jspb.Message.getWrapperField(this, massa_model_v1_amount_pb.NativeAmount, 7));
};


/**
 * @param {?proto.massa.model.v1.NativeAmount|undefined} value
 * @return {!proto.massa.model.v1.ReadOnlyExecutionCall} returns this
*/
proto.massa.model.v1.ReadOnlyExecutionCall.prototype.setFee = function(value) {
  return jspb.Message.setWrapperField(this, 7, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.massa.model.v1.ReadOnlyExecutionCall} returns this
 */
proto.massa.model.v1.ReadOnlyExecutionCall.prototype.clearFee = function() {
  return this.setFee(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.massa.model.v1.ReadOnlyExecutionCall.prototype.hasFee = function() {
  return jspb.Message.getField(this, 7) != null;
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
proto.massa.model.v1.BytecodeExecution.prototype.toObject = function(opt_includeInstance) {
  return proto.massa.model.v1.BytecodeExecution.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.massa.model.v1.BytecodeExecution} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.massa.model.v1.BytecodeExecution.toObject = function(includeInstance, msg) {
  var f, obj = {
bytecode: msg.getBytecode_asB64(),
operationDatastore: msg.getOperationDatastore_asB64()
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
 * @return {!proto.massa.model.v1.BytecodeExecution}
 */
proto.massa.model.v1.BytecodeExecution.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.massa.model.v1.BytecodeExecution;
  return proto.massa.model.v1.BytecodeExecution.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.massa.model.v1.BytecodeExecution} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.massa.model.v1.BytecodeExecution}
 */
proto.massa.model.v1.BytecodeExecution.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setBytecode(value);
      break;
    case 2:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setOperationDatastore(value);
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
proto.massa.model.v1.BytecodeExecution.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.massa.model.v1.BytecodeExecution.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.massa.model.v1.BytecodeExecution} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.massa.model.v1.BytecodeExecution.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getBytecode_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      1,
      f
    );
  }
  f = message.getOperationDatastore_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      2,
      f
    );
  }
};


/**
 * optional bytes bytecode = 1;
 * @return {string}
 */
proto.massa.model.v1.BytecodeExecution.prototype.getBytecode = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * optional bytes bytecode = 1;
 * This is a type-conversion wrapper around `getBytecode()`
 * @return {string}
 */
proto.massa.model.v1.BytecodeExecution.prototype.getBytecode_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getBytecode()));
};


/**
 * optional bytes bytecode = 1;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getBytecode()`
 * @return {!Uint8Array}
 */
proto.massa.model.v1.BytecodeExecution.prototype.getBytecode_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getBytecode()));
};


/**
 * @param {!(string|Uint8Array)} value
 * @return {!proto.massa.model.v1.BytecodeExecution} returns this
 */
proto.massa.model.v1.BytecodeExecution.prototype.setBytecode = function(value) {
  return jspb.Message.setProto3BytesField(this, 1, value);
};


/**
 * optional bytes operation_datastore = 2;
 * @return {string}
 */
proto.massa.model.v1.BytecodeExecution.prototype.getOperationDatastore = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * optional bytes operation_datastore = 2;
 * This is a type-conversion wrapper around `getOperationDatastore()`
 * @return {string}
 */
proto.massa.model.v1.BytecodeExecution.prototype.getOperationDatastore_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getOperationDatastore()));
};


/**
 * optional bytes operation_datastore = 2;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getOperationDatastore()`
 * @return {!Uint8Array}
 */
proto.massa.model.v1.BytecodeExecution.prototype.getOperationDatastore_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getOperationDatastore()));
};


/**
 * @param {!(string|Uint8Array)} value
 * @return {!proto.massa.model.v1.BytecodeExecution} returns this
 */
proto.massa.model.v1.BytecodeExecution.prototype.setOperationDatastore = function(value) {
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
proto.massa.model.v1.FunctionCall.prototype.toObject = function(opt_includeInstance) {
  return proto.massa.model.v1.FunctionCall.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.massa.model.v1.FunctionCall} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.massa.model.v1.FunctionCall.toObject = function(includeInstance, msg) {
  var f, obj = {
targetAddress: jspb.Message.getFieldWithDefault(msg, 1, ""),
targetFunction: jspb.Message.getFieldWithDefault(msg, 2, ""),
parameter: msg.getParameter_asB64(),
coins: (f = msg.getCoins()) && massa_model_v1_amount_pb.NativeAmount.toObject(includeInstance, f)
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
 * @return {!proto.massa.model.v1.FunctionCall}
 */
proto.massa.model.v1.FunctionCall.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.massa.model.v1.FunctionCall;
  return proto.massa.model.v1.FunctionCall.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.massa.model.v1.FunctionCall} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.massa.model.v1.FunctionCall}
 */
proto.massa.model.v1.FunctionCall.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setTargetAddress(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setTargetFunction(value);
      break;
    case 3:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setParameter(value);
      break;
    case 4:
      var value = new massa_model_v1_amount_pb.NativeAmount;
      reader.readMessage(value,massa_model_v1_amount_pb.NativeAmount.deserializeBinaryFromReader);
      msg.setCoins(value);
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
proto.massa.model.v1.FunctionCall.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.massa.model.v1.FunctionCall.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.massa.model.v1.FunctionCall} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.massa.model.v1.FunctionCall.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getTargetAddress();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getTargetFunction();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getParameter_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      3,
      f
    );
  }
  f = message.getCoins();
  if (f != null) {
    writer.writeMessage(
      4,
      f,
      massa_model_v1_amount_pb.NativeAmount.serializeBinaryToWriter
    );
  }
};


/**
 * optional string target_address = 1;
 * @return {string}
 */
proto.massa.model.v1.FunctionCall.prototype.getTargetAddress = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.massa.model.v1.FunctionCall} returns this
 */
proto.massa.model.v1.FunctionCall.prototype.setTargetAddress = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string target_function = 2;
 * @return {string}
 */
proto.massa.model.v1.FunctionCall.prototype.getTargetFunction = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.massa.model.v1.FunctionCall} returns this
 */
proto.massa.model.v1.FunctionCall.prototype.setTargetFunction = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional bytes parameter = 3;
 * @return {string}
 */
proto.massa.model.v1.FunctionCall.prototype.getParameter = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * optional bytes parameter = 3;
 * This is a type-conversion wrapper around `getParameter()`
 * @return {string}
 */
proto.massa.model.v1.FunctionCall.prototype.getParameter_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getParameter()));
};


/**
 * optional bytes parameter = 3;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getParameter()`
 * @return {!Uint8Array}
 */
proto.massa.model.v1.FunctionCall.prototype.getParameter_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getParameter()));
};


/**
 * @param {!(string|Uint8Array)} value
 * @return {!proto.massa.model.v1.FunctionCall} returns this
 */
proto.massa.model.v1.FunctionCall.prototype.setParameter = function(value) {
  return jspb.Message.setProto3BytesField(this, 3, value);
};


/**
 * optional NativeAmount coins = 4;
 * @return {?proto.massa.model.v1.NativeAmount}
 */
proto.massa.model.v1.FunctionCall.prototype.getCoins = function() {
  return /** @type{?proto.massa.model.v1.NativeAmount} */ (
    jspb.Message.getWrapperField(this, massa_model_v1_amount_pb.NativeAmount, 4));
};


/**
 * @param {?proto.massa.model.v1.NativeAmount|undefined} value
 * @return {!proto.massa.model.v1.FunctionCall} returns this
*/
proto.massa.model.v1.FunctionCall.prototype.setCoins = function(value) {
  return jspb.Message.setWrapperField(this, 4, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.massa.model.v1.FunctionCall} returns this
 */
proto.massa.model.v1.FunctionCall.prototype.clearCoins = function() {
  return this.setCoins(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.massa.model.v1.FunctionCall.prototype.hasCoins = function() {
  return jspb.Message.getField(this, 4) != null;
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
proto.massa.model.v1.ReadOnlyExecutionOutput.prototype.toObject = function(opt_includeInstance) {
  return proto.massa.model.v1.ReadOnlyExecutionOutput.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.massa.model.v1.ReadOnlyExecutionOutput} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.massa.model.v1.ReadOnlyExecutionOutput.toObject = function(includeInstance, msg) {
  var f, obj = {
out: (f = msg.getOut()) && proto.massa.model.v1.ExecutionOutput.toObject(includeInstance, f),
usedGas: jspb.Message.getFieldWithDefault(msg, 2, 0),
callResult: msg.getCallResult_asB64()
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
 * @return {!proto.massa.model.v1.ReadOnlyExecutionOutput}
 */
proto.massa.model.v1.ReadOnlyExecutionOutput.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.massa.model.v1.ReadOnlyExecutionOutput;
  return proto.massa.model.v1.ReadOnlyExecutionOutput.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.massa.model.v1.ReadOnlyExecutionOutput} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.massa.model.v1.ReadOnlyExecutionOutput}
 */
proto.massa.model.v1.ReadOnlyExecutionOutput.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.massa.model.v1.ExecutionOutput;
      reader.readMessage(value,proto.massa.model.v1.ExecutionOutput.deserializeBinaryFromReader);
      msg.setOut(value);
      break;
    case 2:
      var value = /** @type {number} */ (reader.readUint64());
      msg.setUsedGas(value);
      break;
    case 3:
      var value = /** @type {!Uint8Array} */ (reader.readBytes());
      msg.setCallResult(value);
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
proto.massa.model.v1.ReadOnlyExecutionOutput.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.massa.model.v1.ReadOnlyExecutionOutput.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.massa.model.v1.ReadOnlyExecutionOutput} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.massa.model.v1.ReadOnlyExecutionOutput.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getOut();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      proto.massa.model.v1.ExecutionOutput.serializeBinaryToWriter
    );
  }
  f = message.getUsedGas();
  if (f !== 0) {
    writer.writeUint64(
      2,
      f
    );
  }
  f = message.getCallResult_asU8();
  if (f.length > 0) {
    writer.writeBytes(
      3,
      f
    );
  }
};


/**
 * optional ExecutionOutput out = 1;
 * @return {?proto.massa.model.v1.ExecutionOutput}
 */
proto.massa.model.v1.ReadOnlyExecutionOutput.prototype.getOut = function() {
  return /** @type{?proto.massa.model.v1.ExecutionOutput} */ (
    jspb.Message.getWrapperField(this, proto.massa.model.v1.ExecutionOutput, 1));
};


/**
 * @param {?proto.massa.model.v1.ExecutionOutput|undefined} value
 * @return {!proto.massa.model.v1.ReadOnlyExecutionOutput} returns this
*/
proto.massa.model.v1.ReadOnlyExecutionOutput.prototype.setOut = function(value) {
  return jspb.Message.setWrapperField(this, 1, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.massa.model.v1.ReadOnlyExecutionOutput} returns this
 */
proto.massa.model.v1.ReadOnlyExecutionOutput.prototype.clearOut = function() {
  return this.setOut(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.massa.model.v1.ReadOnlyExecutionOutput.prototype.hasOut = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional uint64 used_gas = 2;
 * @return {number}
 */
proto.massa.model.v1.ReadOnlyExecutionOutput.prototype.getUsedGas = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 2, 0));
};


/**
 * @param {number} value
 * @return {!proto.massa.model.v1.ReadOnlyExecutionOutput} returns this
 */
proto.massa.model.v1.ReadOnlyExecutionOutput.prototype.setUsedGas = function(value) {
  return jspb.Message.setProto3IntField(this, 2, value);
};


/**
 * optional bytes call_result = 3;
 * @return {string}
 */
proto.massa.model.v1.ReadOnlyExecutionOutput.prototype.getCallResult = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * optional bytes call_result = 3;
 * This is a type-conversion wrapper around `getCallResult()`
 * @return {string}
 */
proto.massa.model.v1.ReadOnlyExecutionOutput.prototype.getCallResult_asB64 = function() {
  return /** @type {string} */ (jspb.Message.bytesAsB64(
      this.getCallResult()));
};


/**
 * optional bytes call_result = 3;
 * Note that Uint8Array is not supported on all browsers.
 * @see http://caniuse.com/Uint8Array
 * This is a type-conversion wrapper around `getCallResult()`
 * @return {!Uint8Array}
 */
proto.massa.model.v1.ReadOnlyExecutionOutput.prototype.getCallResult_asU8 = function() {
  return /** @type {!Uint8Array} */ (jspb.Message.bytesAsU8(
      this.getCallResult()));
};


/**
 * @param {!(string|Uint8Array)} value
 * @return {!proto.massa.model.v1.ReadOnlyExecutionOutput} returns this
 */
proto.massa.model.v1.ReadOnlyExecutionOutput.prototype.setCallResult = function(value) {
  return jspb.Message.setProto3BytesField(this, 3, value);
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.massa.model.v1.ExecutionStackElement.repeatedFields_ = [3,4];



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
proto.massa.model.v1.ExecutionStackElement.prototype.toObject = function(opt_includeInstance) {
  return proto.massa.model.v1.ExecutionStackElement.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.massa.model.v1.ExecutionStackElement} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.massa.model.v1.ExecutionStackElement.toObject = function(includeInstance, msg) {
  var f, obj = {
address: jspb.Message.getFieldWithDefault(msg, 1, ""),
coins: (f = msg.getCoins()) && massa_model_v1_amount_pb.NativeAmount.toObject(includeInstance, f),
ownedAddressesList: (f = jspb.Message.getRepeatedField(msg, 3)) == null ? undefined : f,
operationDatastoreList: jspb.Message.toObjectList(msg.getOperationDatastoreList(),
    massa_model_v1_commons_pb.BytesMapFieldEntry.toObject, includeInstance)
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
 * @return {!proto.massa.model.v1.ExecutionStackElement}
 */
proto.massa.model.v1.ExecutionStackElement.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.massa.model.v1.ExecutionStackElement;
  return proto.massa.model.v1.ExecutionStackElement.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.massa.model.v1.ExecutionStackElement} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.massa.model.v1.ExecutionStackElement}
 */
proto.massa.model.v1.ExecutionStackElement.deserializeBinaryFromReader = function(msg, reader) {
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
      var value = new massa_model_v1_amount_pb.NativeAmount;
      reader.readMessage(value,massa_model_v1_amount_pb.NativeAmount.deserializeBinaryFromReader);
      msg.setCoins(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.addOwnedAddresses(value);
      break;
    case 4:
      var value = new massa_model_v1_commons_pb.BytesMapFieldEntry;
      reader.readMessage(value,massa_model_v1_commons_pb.BytesMapFieldEntry.deserializeBinaryFromReader);
      msg.addOperationDatastore(value);
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
proto.massa.model.v1.ExecutionStackElement.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.massa.model.v1.ExecutionStackElement.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.massa.model.v1.ExecutionStackElement} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.massa.model.v1.ExecutionStackElement.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getAddress();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getCoins();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      massa_model_v1_amount_pb.NativeAmount.serializeBinaryToWriter
    );
  }
  f = message.getOwnedAddressesList();
  if (f.length > 0) {
    writer.writeRepeatedString(
      3,
      f
    );
  }
  f = message.getOperationDatastoreList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      4,
      f,
      massa_model_v1_commons_pb.BytesMapFieldEntry.serializeBinaryToWriter
    );
  }
};


/**
 * optional string address = 1;
 * @return {string}
 */
proto.massa.model.v1.ExecutionStackElement.prototype.getAddress = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.massa.model.v1.ExecutionStackElement} returns this
 */
proto.massa.model.v1.ExecutionStackElement.prototype.setAddress = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional NativeAmount coins = 2;
 * @return {?proto.massa.model.v1.NativeAmount}
 */
proto.massa.model.v1.ExecutionStackElement.prototype.getCoins = function() {
  return /** @type{?proto.massa.model.v1.NativeAmount} */ (
    jspb.Message.getWrapperField(this, massa_model_v1_amount_pb.NativeAmount, 2));
};


/**
 * @param {?proto.massa.model.v1.NativeAmount|undefined} value
 * @return {!proto.massa.model.v1.ExecutionStackElement} returns this
*/
proto.massa.model.v1.ExecutionStackElement.prototype.setCoins = function(value) {
  return jspb.Message.setWrapperField(this, 2, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.massa.model.v1.ExecutionStackElement} returns this
 */
proto.massa.model.v1.ExecutionStackElement.prototype.clearCoins = function() {
  return this.setCoins(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.massa.model.v1.ExecutionStackElement.prototype.hasCoins = function() {
  return jspb.Message.getField(this, 2) != null;
};


/**
 * repeated string owned_addresses = 3;
 * @return {!Array<string>}
 */
proto.massa.model.v1.ExecutionStackElement.prototype.getOwnedAddressesList = function() {
  return /** @type {!Array<string>} */ (jspb.Message.getRepeatedField(this, 3));
};


/**
 * @param {!Array<string>} value
 * @return {!proto.massa.model.v1.ExecutionStackElement} returns this
 */
proto.massa.model.v1.ExecutionStackElement.prototype.setOwnedAddressesList = function(value) {
  return jspb.Message.setField(this, 3, value || []);
};


/**
 * @param {string} value
 * @param {number=} opt_index
 * @return {!proto.massa.model.v1.ExecutionStackElement} returns this
 */
proto.massa.model.v1.ExecutionStackElement.prototype.addOwnedAddresses = function(value, opt_index) {
  return jspb.Message.addToRepeatedField(this, 3, value, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.massa.model.v1.ExecutionStackElement} returns this
 */
proto.massa.model.v1.ExecutionStackElement.prototype.clearOwnedAddressesList = function() {
  return this.setOwnedAddressesList([]);
};


/**
 * repeated BytesMapFieldEntry operation_datastore = 4;
 * @return {!Array<!proto.massa.model.v1.BytesMapFieldEntry>}
 */
proto.massa.model.v1.ExecutionStackElement.prototype.getOperationDatastoreList = function() {
  return /** @type{!Array<!proto.massa.model.v1.BytesMapFieldEntry>} */ (
    jspb.Message.getRepeatedWrapperField(this, massa_model_v1_commons_pb.BytesMapFieldEntry, 4));
};


/**
 * @param {!Array<!proto.massa.model.v1.BytesMapFieldEntry>} value
 * @return {!proto.massa.model.v1.ExecutionStackElement} returns this
*/
proto.massa.model.v1.ExecutionStackElement.prototype.setOperationDatastoreList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 4, value);
};


/**
 * @param {!proto.massa.model.v1.BytesMapFieldEntry=} opt_value
 * @param {number=} opt_index
 * @return {!proto.massa.model.v1.BytesMapFieldEntry}
 */
proto.massa.model.v1.ExecutionStackElement.prototype.addOperationDatastore = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 4, opt_value, proto.massa.model.v1.BytesMapFieldEntry, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.massa.model.v1.ExecutionStackElement} returns this
 */
proto.massa.model.v1.ExecutionStackElement.prototype.clearOperationDatastoreList = function() {
  return this.setOperationDatastoreList([]);
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
proto.massa.model.v1.TargetAmount.prototype.toObject = function(opt_includeInstance) {
  return proto.massa.model.v1.TargetAmount.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.massa.model.v1.TargetAmount} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.massa.model.v1.TargetAmount.toObject = function(includeInstance, msg) {
  var f, obj = {
amount: (f = msg.getAmount()) && massa_model_v1_amount_pb.NativeAmount.toObject(includeInstance, f),
address: jspb.Message.getFieldWithDefault(msg, 2, "")
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
 * @return {!proto.massa.model.v1.TargetAmount}
 */
proto.massa.model.v1.TargetAmount.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.massa.model.v1.TargetAmount;
  return proto.massa.model.v1.TargetAmount.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.massa.model.v1.TargetAmount} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.massa.model.v1.TargetAmount}
 */
proto.massa.model.v1.TargetAmount.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new massa_model_v1_amount_pb.NativeAmount;
      reader.readMessage(value,massa_model_v1_amount_pb.NativeAmount.deserializeBinaryFromReader);
      msg.setAmount(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setAddress(value);
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
proto.massa.model.v1.TargetAmount.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.massa.model.v1.TargetAmount.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.massa.model.v1.TargetAmount} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.massa.model.v1.TargetAmount.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getAmount();
  if (f != null) {
    writer.writeMessage(
      1,
      f,
      massa_model_v1_amount_pb.NativeAmount.serializeBinaryToWriter
    );
  }
  f = message.getAddress();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
};


/**
 * optional NativeAmount amount = 1;
 * @return {?proto.massa.model.v1.NativeAmount}
 */
proto.massa.model.v1.TargetAmount.prototype.getAmount = function() {
  return /** @type{?proto.massa.model.v1.NativeAmount} */ (
    jspb.Message.getWrapperField(this, massa_model_v1_amount_pb.NativeAmount, 1));
};


/**
 * @param {?proto.massa.model.v1.NativeAmount|undefined} value
 * @return {!proto.massa.model.v1.TargetAmount} returns this
*/
proto.massa.model.v1.TargetAmount.prototype.setAmount = function(value) {
  return jspb.Message.setWrapperField(this, 1, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.massa.model.v1.TargetAmount} returns this
 */
proto.massa.model.v1.TargetAmount.prototype.clearAmount = function() {
  return this.setAmount(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.massa.model.v1.TargetAmount.prototype.hasAmount = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional string address = 2;
 * @return {string}
 */
proto.massa.model.v1.TargetAmount.prototype.getAddress = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.massa.model.v1.TargetAmount} returns this
 */
proto.massa.model.v1.TargetAmount.prototype.setAddress = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
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
proto.massa.model.v1.AsyncMessageExecution.prototype.toObject = function(opt_includeInstance) {
  return proto.massa.model.v1.AsyncMessageExecution.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.massa.model.v1.AsyncMessageExecution} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.massa.model.v1.AsyncMessageExecution.toObject = function(includeInstance, msg) {
  var f, obj = {
success: jspb.Message.getBooleanFieldWithDefault(msg, 1, false),
sender: jspb.Message.getFieldWithDefault(msg, 2, ""),
destination: jspb.Message.getFieldWithDefault(msg, 3, ""),
coins: (f = msg.getCoins()) && massa_model_v1_amount_pb.NativeAmount.toObject(includeInstance, f)
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
 * @return {!proto.massa.model.v1.AsyncMessageExecution}
 */
proto.massa.model.v1.AsyncMessageExecution.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.massa.model.v1.AsyncMessageExecution;
  return proto.massa.model.v1.AsyncMessageExecution.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.massa.model.v1.AsyncMessageExecution} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.massa.model.v1.AsyncMessageExecution}
 */
proto.massa.model.v1.AsyncMessageExecution.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setSuccess(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setSender(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setDestination(value);
      break;
    case 4:
      var value = new massa_model_v1_amount_pb.NativeAmount;
      reader.readMessage(value,massa_model_v1_amount_pb.NativeAmount.deserializeBinaryFromReader);
      msg.setCoins(value);
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
proto.massa.model.v1.AsyncMessageExecution.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.massa.model.v1.AsyncMessageExecution.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.massa.model.v1.AsyncMessageExecution} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.massa.model.v1.AsyncMessageExecution.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getSuccess();
  if (f) {
    writer.writeBool(
      1,
      f
    );
  }
  f = message.getSender();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getDestination();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
  f = message.getCoins();
  if (f != null) {
    writer.writeMessage(
      4,
      f,
      massa_model_v1_amount_pb.NativeAmount.serializeBinaryToWriter
    );
  }
};


/**
 * optional bool success = 1;
 * @return {boolean}
 */
proto.massa.model.v1.AsyncMessageExecution.prototype.getSuccess = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 1, false));
};


/**
 * @param {boolean} value
 * @return {!proto.massa.model.v1.AsyncMessageExecution} returns this
 */
proto.massa.model.v1.AsyncMessageExecution.prototype.setSuccess = function(value) {
  return jspb.Message.setProto3BooleanField(this, 1, value);
};


/**
 * optional string sender = 2;
 * @return {string}
 */
proto.massa.model.v1.AsyncMessageExecution.prototype.getSender = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.massa.model.v1.AsyncMessageExecution} returns this
 */
proto.massa.model.v1.AsyncMessageExecution.prototype.setSender = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional string destination = 3;
 * @return {string}
 */
proto.massa.model.v1.AsyncMessageExecution.prototype.getDestination = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.massa.model.v1.AsyncMessageExecution} returns this
 */
proto.massa.model.v1.AsyncMessageExecution.prototype.setDestination = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};


/**
 * optional NativeAmount coins = 4;
 * @return {?proto.massa.model.v1.NativeAmount}
 */
proto.massa.model.v1.AsyncMessageExecution.prototype.getCoins = function() {
  return /** @type{?proto.massa.model.v1.NativeAmount} */ (
    jspb.Message.getWrapperField(this, massa_model_v1_amount_pb.NativeAmount, 4));
};


/**
 * @param {?proto.massa.model.v1.NativeAmount|undefined} value
 * @return {!proto.massa.model.v1.AsyncMessageExecution} returns this
*/
proto.massa.model.v1.AsyncMessageExecution.prototype.setCoins = function(value) {
  return jspb.Message.setWrapperField(this, 4, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.massa.model.v1.AsyncMessageExecution} returns this
 */
proto.massa.model.v1.AsyncMessageExecution.prototype.clearCoins = function() {
  return this.setCoins(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.massa.model.v1.AsyncMessageExecution.prototype.hasCoins = function() {
  return jspb.Message.getField(this, 4) != null;
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
proto.massa.model.v1.DeferredCallExecution.prototype.toObject = function(opt_includeInstance) {
  return proto.massa.model.v1.DeferredCallExecution.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.massa.model.v1.DeferredCallExecution} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.massa.model.v1.DeferredCallExecution.toObject = function(includeInstance, msg) {
  var f, obj = {
success: jspb.Message.getBooleanFieldWithDefault(msg, 1, false),
sender: jspb.Message.getFieldWithDefault(msg, 2, ""),
targetAddress: jspb.Message.getFieldWithDefault(msg, 3, ""),
targetFunction: jspb.Message.getFieldWithDefault(msg, 4, ""),
coins: (f = msg.getCoins()) && massa_model_v1_amount_pb.NativeAmount.toObject(includeInstance, f)
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
 * @return {!proto.massa.model.v1.DeferredCallExecution}
 */
proto.massa.model.v1.DeferredCallExecution.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.massa.model.v1.DeferredCallExecution;
  return proto.massa.model.v1.DeferredCallExecution.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.massa.model.v1.DeferredCallExecution} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.massa.model.v1.DeferredCallExecution}
 */
proto.massa.model.v1.DeferredCallExecution.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setSuccess(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setSender(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setTargetAddress(value);
      break;
    case 4:
      var value = /** @type {string} */ (reader.readString());
      msg.setTargetFunction(value);
      break;
    case 5:
      var value = new massa_model_v1_amount_pb.NativeAmount;
      reader.readMessage(value,massa_model_v1_amount_pb.NativeAmount.deserializeBinaryFromReader);
      msg.setCoins(value);
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
proto.massa.model.v1.DeferredCallExecution.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.massa.model.v1.DeferredCallExecution.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.massa.model.v1.DeferredCallExecution} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.massa.model.v1.DeferredCallExecution.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getSuccess();
  if (f) {
    writer.writeBool(
      1,
      f
    );
  }
  f = message.getSender();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getTargetAddress();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
  f = message.getTargetFunction();
  if (f.length > 0) {
    writer.writeString(
      4,
      f
    );
  }
  f = message.getCoins();
  if (f != null) {
    writer.writeMessage(
      5,
      f,
      massa_model_v1_amount_pb.NativeAmount.serializeBinaryToWriter
    );
  }
};


/**
 * optional bool success = 1;
 * @return {boolean}
 */
proto.massa.model.v1.DeferredCallExecution.prototype.getSuccess = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 1, false));
};


/**
 * @param {boolean} value
 * @return {!proto.massa.model.v1.DeferredCallExecution} returns this
 */
proto.massa.model.v1.DeferredCallExecution.prototype.setSuccess = function(value) {
  return jspb.Message.setProto3BooleanField(this, 1, value);
};


/**
 * optional string sender = 2;
 * @return {string}
 */
proto.massa.model.v1.DeferredCallExecution.prototype.getSender = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.massa.model.v1.DeferredCallExecution} returns this
 */
proto.massa.model.v1.DeferredCallExecution.prototype.setSender = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional string target_address = 3;
 * @return {string}
 */
proto.massa.model.v1.DeferredCallExecution.prototype.getTargetAddress = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.massa.model.v1.DeferredCallExecution} returns this
 */
proto.massa.model.v1.DeferredCallExecution.prototype.setTargetAddress = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};


/**
 * optional string target_function = 4;
 * @return {string}
 */
proto.massa.model.v1.DeferredCallExecution.prototype.getTargetFunction = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 4, ""));
};


/**
 * @param {string} value
 * @return {!proto.massa.model.v1.DeferredCallExecution} returns this
 */
proto.massa.model.v1.DeferredCallExecution.prototype.setTargetFunction = function(value) {
  return jspb.Message.setProto3StringField(this, 4, value);
};


/**
 * optional NativeAmount coins = 5;
 * @return {?proto.massa.model.v1.NativeAmount}
 */
proto.massa.model.v1.DeferredCallExecution.prototype.getCoins = function() {
  return /** @type{?proto.massa.model.v1.NativeAmount} */ (
    jspb.Message.getWrapperField(this, massa_model_v1_amount_pb.NativeAmount, 5));
};


/**
 * @param {?proto.massa.model.v1.NativeAmount|undefined} value
 * @return {!proto.massa.model.v1.DeferredCallExecution} returns this
*/
proto.massa.model.v1.DeferredCallExecution.prototype.setCoins = function(value) {
  return jspb.Message.setWrapperField(this, 5, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.massa.model.v1.DeferredCallExecution} returns this
 */
proto.massa.model.v1.DeferredCallExecution.prototype.clearCoins = function() {
  return this.setCoins(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.massa.model.v1.DeferredCallExecution.prototype.hasCoins = function() {
  return jspb.Message.getField(this, 5) != null;
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
proto.massa.model.v1.ExecTransferInfo.prototype.toObject = function(opt_includeInstance) {
  return proto.massa.model.v1.ExecTransferInfo.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.massa.model.v1.ExecTransferInfo} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.massa.model.v1.ExecTransferInfo.toObject = function(includeInstance, msg) {
  var f, obj = {
id: jspb.Message.getFieldWithDefault(msg, 1, ""),
fromAddress: (f = msg.getFromAddress()) && google_protobuf_wrappers_pb.StringValue.toObject(includeInstance, f),
toAddress: (f = msg.getToAddress()) && google_protobuf_wrappers_pb.StringValue.toObject(includeInstance, f),
value: (f = msg.getValue()) && proto.massa.model.v1.TransferValue.toObject(includeInstance, f),
origin: jspb.Message.getFieldWithDefault(msg, 5, 0),
operationId: (f = msg.getOperationId()) && google_protobuf_wrappers_pb.StringValue.toObject(includeInstance, f),
asyncMsgId: (f = msg.getAsyncMsgId()) && google_protobuf_wrappers_pb.StringValue.toObject(includeInstance, f),
deferredCallId: (f = msg.getDeferredCallId()) && google_protobuf_wrappers_pb.StringValue.toObject(includeInstance, f),
denunciationIndex: (f = msg.getDenunciationIndex()) && massa_model_v1_denunciation_pb.DenunciationIndex.toObject(includeInstance, f)
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
 * @return {!proto.massa.model.v1.ExecTransferInfo}
 */
proto.massa.model.v1.ExecTransferInfo.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.massa.model.v1.ExecTransferInfo;
  return proto.massa.model.v1.ExecTransferInfo.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.massa.model.v1.ExecTransferInfo} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.massa.model.v1.ExecTransferInfo}
 */
proto.massa.model.v1.ExecTransferInfo.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setId(value);
      break;
    case 2:
      var value = new google_protobuf_wrappers_pb.StringValue;
      reader.readMessage(value,google_protobuf_wrappers_pb.StringValue.deserializeBinaryFromReader);
      msg.setFromAddress(value);
      break;
    case 3:
      var value = new google_protobuf_wrappers_pb.StringValue;
      reader.readMessage(value,google_protobuf_wrappers_pb.StringValue.deserializeBinaryFromReader);
      msg.setToAddress(value);
      break;
    case 4:
      var value = new proto.massa.model.v1.TransferValue;
      reader.readMessage(value,proto.massa.model.v1.TransferValue.deserializeBinaryFromReader);
      msg.setValue(value);
      break;
    case 5:
      var value = /** @type {!proto.massa.model.v1.CoinOrigin} */ (reader.readEnum());
      msg.setOrigin(value);
      break;
    case 6:
      var value = new google_protobuf_wrappers_pb.StringValue;
      reader.readMessage(value,google_protobuf_wrappers_pb.StringValue.deserializeBinaryFromReader);
      msg.setOperationId(value);
      break;
    case 7:
      var value = new google_protobuf_wrappers_pb.StringValue;
      reader.readMessage(value,google_protobuf_wrappers_pb.StringValue.deserializeBinaryFromReader);
      msg.setAsyncMsgId(value);
      break;
    case 8:
      var value = new google_protobuf_wrappers_pb.StringValue;
      reader.readMessage(value,google_protobuf_wrappers_pb.StringValue.deserializeBinaryFromReader);
      msg.setDeferredCallId(value);
      break;
    case 9:
      var value = new massa_model_v1_denunciation_pb.DenunciationIndex;
      reader.readMessage(value,massa_model_v1_denunciation_pb.DenunciationIndex.deserializeBinaryFromReader);
      msg.setDenunciationIndex(value);
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
proto.massa.model.v1.ExecTransferInfo.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.massa.model.v1.ExecTransferInfo.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.massa.model.v1.ExecTransferInfo} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.massa.model.v1.ExecTransferInfo.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getId();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getFromAddress();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      google_protobuf_wrappers_pb.StringValue.serializeBinaryToWriter
    );
  }
  f = message.getToAddress();
  if (f != null) {
    writer.writeMessage(
      3,
      f,
      google_protobuf_wrappers_pb.StringValue.serializeBinaryToWriter
    );
  }
  f = message.getValue();
  if (f != null) {
    writer.writeMessage(
      4,
      f,
      proto.massa.model.v1.TransferValue.serializeBinaryToWriter
    );
  }
  f = message.getOrigin();
  if (f !== 0.0) {
    writer.writeEnum(
      5,
      f
    );
  }
  f = message.getOperationId();
  if (f != null) {
    writer.writeMessage(
      6,
      f,
      google_protobuf_wrappers_pb.StringValue.serializeBinaryToWriter
    );
  }
  f = message.getAsyncMsgId();
  if (f != null) {
    writer.writeMessage(
      7,
      f,
      google_protobuf_wrappers_pb.StringValue.serializeBinaryToWriter
    );
  }
  f = message.getDeferredCallId();
  if (f != null) {
    writer.writeMessage(
      8,
      f,
      google_protobuf_wrappers_pb.StringValue.serializeBinaryToWriter
    );
  }
  f = message.getDenunciationIndex();
  if (f != null) {
    writer.writeMessage(
      9,
      f,
      massa_model_v1_denunciation_pb.DenunciationIndex.serializeBinaryToWriter
    );
  }
};


/**
 * optional string id = 1;
 * @return {string}
 */
proto.massa.model.v1.ExecTransferInfo.prototype.getId = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.massa.model.v1.ExecTransferInfo} returns this
 */
proto.massa.model.v1.ExecTransferInfo.prototype.setId = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional google.protobuf.StringValue from_address = 2;
 * @return {?proto.google.protobuf.StringValue}
 */
proto.massa.model.v1.ExecTransferInfo.prototype.getFromAddress = function() {
  return /** @type{?proto.google.protobuf.StringValue} */ (
    jspb.Message.getWrapperField(this, google_protobuf_wrappers_pb.StringValue, 2));
};


/**
 * @param {?proto.google.protobuf.StringValue|undefined} value
 * @return {!proto.massa.model.v1.ExecTransferInfo} returns this
*/
proto.massa.model.v1.ExecTransferInfo.prototype.setFromAddress = function(value) {
  return jspb.Message.setWrapperField(this, 2, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.massa.model.v1.ExecTransferInfo} returns this
 */
proto.massa.model.v1.ExecTransferInfo.prototype.clearFromAddress = function() {
  return this.setFromAddress(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.massa.model.v1.ExecTransferInfo.prototype.hasFromAddress = function() {
  return jspb.Message.getField(this, 2) != null;
};


/**
 * optional google.protobuf.StringValue to_address = 3;
 * @return {?proto.google.protobuf.StringValue}
 */
proto.massa.model.v1.ExecTransferInfo.prototype.getToAddress = function() {
  return /** @type{?proto.google.protobuf.StringValue} */ (
    jspb.Message.getWrapperField(this, google_protobuf_wrappers_pb.StringValue, 3));
};


/**
 * @param {?proto.google.protobuf.StringValue|undefined} value
 * @return {!proto.massa.model.v1.ExecTransferInfo} returns this
*/
proto.massa.model.v1.ExecTransferInfo.prototype.setToAddress = function(value) {
  return jspb.Message.setWrapperField(this, 3, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.massa.model.v1.ExecTransferInfo} returns this
 */
proto.massa.model.v1.ExecTransferInfo.prototype.clearToAddress = function() {
  return this.setToAddress(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.massa.model.v1.ExecTransferInfo.prototype.hasToAddress = function() {
  return jspb.Message.getField(this, 3) != null;
};


/**
 * optional TransferValue value = 4;
 * @return {?proto.massa.model.v1.TransferValue}
 */
proto.massa.model.v1.ExecTransferInfo.prototype.getValue = function() {
  return /** @type{?proto.massa.model.v1.TransferValue} */ (
    jspb.Message.getWrapperField(this, proto.massa.model.v1.TransferValue, 4));
};


/**
 * @param {?proto.massa.model.v1.TransferValue|undefined} value
 * @return {!proto.massa.model.v1.ExecTransferInfo} returns this
*/
proto.massa.model.v1.ExecTransferInfo.prototype.setValue = function(value) {
  return jspb.Message.setWrapperField(this, 4, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.massa.model.v1.ExecTransferInfo} returns this
 */
proto.massa.model.v1.ExecTransferInfo.prototype.clearValue = function() {
  return this.setValue(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.massa.model.v1.ExecTransferInfo.prototype.hasValue = function() {
  return jspb.Message.getField(this, 4) != null;
};


/**
 * optional CoinOrigin origin = 5;
 * @return {!proto.massa.model.v1.CoinOrigin}
 */
proto.massa.model.v1.ExecTransferInfo.prototype.getOrigin = function() {
  return /** @type {!proto.massa.model.v1.CoinOrigin} */ (jspb.Message.getFieldWithDefault(this, 5, 0));
};


/**
 * @param {!proto.massa.model.v1.CoinOrigin} value
 * @return {!proto.massa.model.v1.ExecTransferInfo} returns this
 */
proto.massa.model.v1.ExecTransferInfo.prototype.setOrigin = function(value) {
  return jspb.Message.setProto3EnumField(this, 5, value);
};


/**
 * optional google.protobuf.StringValue operation_id = 6;
 * @return {?proto.google.protobuf.StringValue}
 */
proto.massa.model.v1.ExecTransferInfo.prototype.getOperationId = function() {
  return /** @type{?proto.google.protobuf.StringValue} */ (
    jspb.Message.getWrapperField(this, google_protobuf_wrappers_pb.StringValue, 6));
};


/**
 * @param {?proto.google.protobuf.StringValue|undefined} value
 * @return {!proto.massa.model.v1.ExecTransferInfo} returns this
*/
proto.massa.model.v1.ExecTransferInfo.prototype.setOperationId = function(value) {
  return jspb.Message.setWrapperField(this, 6, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.massa.model.v1.ExecTransferInfo} returns this
 */
proto.massa.model.v1.ExecTransferInfo.prototype.clearOperationId = function() {
  return this.setOperationId(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.massa.model.v1.ExecTransferInfo.prototype.hasOperationId = function() {
  return jspb.Message.getField(this, 6) != null;
};


/**
 * optional google.protobuf.StringValue async_msg_id = 7;
 * @return {?proto.google.protobuf.StringValue}
 */
proto.massa.model.v1.ExecTransferInfo.prototype.getAsyncMsgId = function() {
  return /** @type{?proto.google.protobuf.StringValue} */ (
    jspb.Message.getWrapperField(this, google_protobuf_wrappers_pb.StringValue, 7));
};


/**
 * @param {?proto.google.protobuf.StringValue|undefined} value
 * @return {!proto.massa.model.v1.ExecTransferInfo} returns this
*/
proto.massa.model.v1.ExecTransferInfo.prototype.setAsyncMsgId = function(value) {
  return jspb.Message.setWrapperField(this, 7, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.massa.model.v1.ExecTransferInfo} returns this
 */
proto.massa.model.v1.ExecTransferInfo.prototype.clearAsyncMsgId = function() {
  return this.setAsyncMsgId(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.massa.model.v1.ExecTransferInfo.prototype.hasAsyncMsgId = function() {
  return jspb.Message.getField(this, 7) != null;
};


/**
 * optional google.protobuf.StringValue deferred_call_id = 8;
 * @return {?proto.google.protobuf.StringValue}
 */
proto.massa.model.v1.ExecTransferInfo.prototype.getDeferredCallId = function() {
  return /** @type{?proto.google.protobuf.StringValue} */ (
    jspb.Message.getWrapperField(this, google_protobuf_wrappers_pb.StringValue, 8));
};


/**
 * @param {?proto.google.protobuf.StringValue|undefined} value
 * @return {!proto.massa.model.v1.ExecTransferInfo} returns this
*/
proto.massa.model.v1.ExecTransferInfo.prototype.setDeferredCallId = function(value) {
  return jspb.Message.setWrapperField(this, 8, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.massa.model.v1.ExecTransferInfo} returns this
 */
proto.massa.model.v1.ExecTransferInfo.prototype.clearDeferredCallId = function() {
  return this.setDeferredCallId(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.massa.model.v1.ExecTransferInfo.prototype.hasDeferredCallId = function() {
  return jspb.Message.getField(this, 8) != null;
};


/**
 * optional DenunciationIndex denunciation_index = 9;
 * @return {?proto.massa.model.v1.DenunciationIndex}
 */
proto.massa.model.v1.ExecTransferInfo.prototype.getDenunciationIndex = function() {
  return /** @type{?proto.massa.model.v1.DenunciationIndex} */ (
    jspb.Message.getWrapperField(this, massa_model_v1_denunciation_pb.DenunciationIndex, 9));
};


/**
 * @param {?proto.massa.model.v1.DenunciationIndex|undefined} value
 * @return {!proto.massa.model.v1.ExecTransferInfo} returns this
*/
proto.massa.model.v1.ExecTransferInfo.prototype.setDenunciationIndex = function(value) {
  return jspb.Message.setWrapperField(this, 9, value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.massa.model.v1.ExecTransferInfo} returns this
 */
proto.massa.model.v1.ExecTransferInfo.prototype.clearDenunciationIndex = function() {
  return this.setDenunciationIndex(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.massa.model.v1.ExecTransferInfo.prototype.hasDenunciationIndex = function() {
  return jspb.Message.getField(this, 9) != null;
};



/**
 * Oneof group definitions for this message. Each group defines the field
 * numbers belonging to that group. When of these fields' value is set, all
 * other fields in the group are cleared. During deserialization, if multiple
 * fields are encountered for a group, only the last value seen will be kept.
 * @private {!Array<!Array<number>>}
 * @const
 */
proto.massa.model.v1.TransferValue.oneofGroups_ = [[1,2,3]];

/**
 * @enum {number}
 */
proto.massa.model.v1.TransferValue.ValueCase = {
  VALUE_NOT_SET: 0,
  ROLLS: 1,
  COINS: 2,
  DEFERRED_CREDITS: 3
};

/**
 * @return {proto.massa.model.v1.TransferValue.ValueCase}
 */
proto.massa.model.v1.TransferValue.prototype.getValueCase = function() {
  return /** @type {proto.massa.model.v1.TransferValue.ValueCase} */(jspb.Message.computeOneofCase(this, proto.massa.model.v1.TransferValue.oneofGroups_[0]));
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
proto.massa.model.v1.TransferValue.prototype.toObject = function(opt_includeInstance) {
  return proto.massa.model.v1.TransferValue.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.massa.model.v1.TransferValue} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.massa.model.v1.TransferValue.toObject = function(includeInstance, msg) {
  var f, obj = {
rolls: (f = jspb.Message.getField(msg, 1)) == null ? undefined : f,
coins: (f = msg.getCoins()) && massa_model_v1_amount_pb.NativeAmount.toObject(includeInstance, f),
deferredCredits: (f = msg.getDeferredCredits()) && massa_model_v1_amount_pb.NativeAmount.toObject(includeInstance, f)
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
 * @return {!proto.massa.model.v1.TransferValue}
 */
proto.massa.model.v1.TransferValue.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.massa.model.v1.TransferValue;
  return proto.massa.model.v1.TransferValue.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.massa.model.v1.TransferValue} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.massa.model.v1.TransferValue}
 */
proto.massa.model.v1.TransferValue.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readUint64());
      msg.setRolls(value);
      break;
    case 2:
      var value = new massa_model_v1_amount_pb.NativeAmount;
      reader.readMessage(value,massa_model_v1_amount_pb.NativeAmount.deserializeBinaryFromReader);
      msg.setCoins(value);
      break;
    case 3:
      var value = new massa_model_v1_amount_pb.NativeAmount;
      reader.readMessage(value,massa_model_v1_amount_pb.NativeAmount.deserializeBinaryFromReader);
      msg.setDeferredCredits(value);
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
proto.massa.model.v1.TransferValue.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.massa.model.v1.TransferValue.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.massa.model.v1.TransferValue} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.massa.model.v1.TransferValue.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = /** @type {number} */ (jspb.Message.getField(message, 1));
  if (f != null) {
    writer.writeUint64(
      1,
      f
    );
  }
  f = message.getCoins();
  if (f != null) {
    writer.writeMessage(
      2,
      f,
      massa_model_v1_amount_pb.NativeAmount.serializeBinaryToWriter
    );
  }
  f = message.getDeferredCredits();
  if (f != null) {
    writer.writeMessage(
      3,
      f,
      massa_model_v1_amount_pb.NativeAmount.serializeBinaryToWriter
    );
  }
};


/**
 * optional uint64 rolls = 1;
 * @return {number}
 */
proto.massa.model.v1.TransferValue.prototype.getRolls = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.massa.model.v1.TransferValue} returns this
 */
proto.massa.model.v1.TransferValue.prototype.setRolls = function(value) {
  return jspb.Message.setOneofField(this, 1, proto.massa.model.v1.TransferValue.oneofGroups_[0], value);
};


/**
 * Clears the field making it undefined.
 * @return {!proto.massa.model.v1.TransferValue} returns this
 */
proto.massa.model.v1.TransferValue.prototype.clearRolls = function() {
  return jspb.Message.setOneofField(this, 1, proto.massa.model.v1.TransferValue.oneofGroups_[0], undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.massa.model.v1.TransferValue.prototype.hasRolls = function() {
  return jspb.Message.getField(this, 1) != null;
};


/**
 * optional NativeAmount coins = 2;
 * @return {?proto.massa.model.v1.NativeAmount}
 */
proto.massa.model.v1.TransferValue.prototype.getCoins = function() {
  return /** @type{?proto.massa.model.v1.NativeAmount} */ (
    jspb.Message.getWrapperField(this, massa_model_v1_amount_pb.NativeAmount, 2));
};


/**
 * @param {?proto.massa.model.v1.NativeAmount|undefined} value
 * @return {!proto.massa.model.v1.TransferValue} returns this
*/
proto.massa.model.v1.TransferValue.prototype.setCoins = function(value) {
  return jspb.Message.setOneofWrapperField(this, 2, proto.massa.model.v1.TransferValue.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.massa.model.v1.TransferValue} returns this
 */
proto.massa.model.v1.TransferValue.prototype.clearCoins = function() {
  return this.setCoins(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.massa.model.v1.TransferValue.prototype.hasCoins = function() {
  return jspb.Message.getField(this, 2) != null;
};


/**
 * optional NativeAmount deferred_credits = 3;
 * @return {?proto.massa.model.v1.NativeAmount}
 */
proto.massa.model.v1.TransferValue.prototype.getDeferredCredits = function() {
  return /** @type{?proto.massa.model.v1.NativeAmount} */ (
    jspb.Message.getWrapperField(this, massa_model_v1_amount_pb.NativeAmount, 3));
};


/**
 * @param {?proto.massa.model.v1.NativeAmount|undefined} value
 * @return {!proto.massa.model.v1.TransferValue} returns this
*/
proto.massa.model.v1.TransferValue.prototype.setDeferredCredits = function(value) {
  return jspb.Message.setOneofWrapperField(this, 3, proto.massa.model.v1.TransferValue.oneofGroups_[0], value);
};


/**
 * Clears the message field making it undefined.
 * @return {!proto.massa.model.v1.TransferValue} returns this
 */
proto.massa.model.v1.TransferValue.prototype.clearDeferredCredits = function() {
  return this.setDeferredCredits(undefined);
};


/**
 * Returns whether this field is set.
 * @return {boolean}
 */
proto.massa.model.v1.TransferValue.prototype.hasDeferredCredits = function() {
  return jspb.Message.getField(this, 3) != null;
};


/**
 * @enum {number}
 */
proto.massa.model.v1.ScExecutionEventStatus = {
  SC_EXECUTION_EVENT_STATUS_UNSPECIFIED: 0,
  SC_EXECUTION_EVENT_STATUS_FINAL: 1,
  SC_EXECUTION_EVENT_STATUS_READ_ONLY: 2,
  SC_EXECUTION_EVENT_STATUS_CANDIDATE: 3
};

/**
 * @enum {number}
 */
proto.massa.model.v1.ExecutionOutputStatus = {
  EXECUTION_OUTPUT_STATUS_UNSPECIFIED: 0,
  EXECUTION_OUTPUT_STATUS_CANDIDATE: 1,
  EXECUTION_OUTPUT_STATUS_FINAL: 2,
  EXECUTION_OUTPUT_STATUS_UNKNOWN: 3
};

/**
 * @enum {number}
 */
proto.massa.model.v1.OperationExecutionStatus = {
  OPERATION_EXECUTION_STATUS_UNSPECIFIED: 0,
  OPERATION_EXECUTION_STATUS_SUCCESS: 1,
  OPERATION_EXECUTION_STATUS_FAILED: 2
};

/**
 * @enum {number}
 */
proto.massa.model.v1.AsyncPoolChangeType = {
  ASYNC_POOL_CHANGE_TYPE_UNSPECIFIED: 0,
  ASYNC_POOL_CHANGE_TYPE_SET: 1,
  ASYNC_POOL_CHANGE_TYPE_UPDATE: 2,
  ASYNC_POOL_CHANGE_TYPE_DELETE: 3
};

/**
 * @enum {number}
 */
proto.massa.model.v1.LedgerChangeType = {
  LEDGER_CHANGE_TYPE_UNSPECIFIED: 0,
  LEDGER_CHANGE_TYPE_SET: 1,
  LEDGER_CHANGE_TYPE_UPDATE: 2,
  LEDGER_CHANGE_TYPE_DELETE: 3
};

/**
 * @enum {number}
 */
proto.massa.model.v1.CoinOrigin = {
  COIN_ORIGIN_UNSPECIFIED: 0,
  COIN_ORIGIN_BLOCK_REWARD: 1,
  COIN_ORIGIN_DEFERRED_CALL_FAIL: 2,
  COIN_ORIGIN_DEFERRED_CALL_CANCEL: 3,
  COIN_ORIGIN_DEFERRED_CALL_COINS: 4,
  COIN_ORIGIN_DEFERRED_CALL_REGISTER: 5,
  COIN_ORIGIN_DEFERRED_CALL_STORAGE_REFUND: 6,
  COIN_ORIGIN_ENDORSEMENT_REWARD: 7,
  COIN_ORIGIN_ENDORSED_REWARD: 8,
  COIN_ORIGIN_SLASH: 9,
  COIN_ORIGIN_OP_ROLL_BUY: 10,
  COIN_ORIGIN_OP_ROLL_SELL: 11,
  COIN_ORIGIN_OP_CALLSC_COINS: 12,
  COIN_ORIGIN_READ_ONLY_FN_CALL_FEES: 13,
  COIN_ORIGIN_READ_ONLY_FN_CALL_COINS: 14,
  COIN_ORIGIN_READ_ONLY_BYTECODE_EXEC_FEES: 15,
  COIN_ORIGIN_SET_BYTECODE_STORAGE: 16,
  COIN_ORIGIN_ABI_CALL_COINS: 17,
  COIN_ORIGIN_ABI_TRANSFER_COINS: 18,
  COIN_ORIGIN_ABI_TRANSFER_FOR_COINS: 19,
  COIN_ORIGIN_ABI_SEND_MSG_COINS: 20,
  COIN_ORIGIN_ABI_SEND_MSG_FEES: 21,
  COIN_ORIGIN_OP_ROLL_SELL_DEFERRED_MAS: 22,
  COIN_ORIGIN_OP_EXECUTESC_FEES: 23,
  COIN_ORIGIN_OP_TRANSACTION_COINS: 24,
  COIN_ORIGIN_OP_TRANSACTION_FEES: 25,
  COIN_ORIGIN_ASYNC_MSG_COINS: 26,
  COIN_ORIGIN_ASYNC_MSG_CANCEL: 27,
  COIN_ORIGIN_CREATE_SC_STORAGE: 28,
  COIN_ORIGIN_DATASTORE_STORAGE: 29,
  COIN_ORIGIN_DEFERRED_CREDIT: 30
};

goog.object.extend(exports, proto.massa.model.v1);
