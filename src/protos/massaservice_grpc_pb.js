// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var protos_massaservice_pb = require('../protos/massaservice_pb.js');

function serialize_massa_CreateOrderbookRequest(arg) {
  if (!(arg instanceof protos_massaservice_pb.CreateOrderbookRequest)) {
    throw new Error('Expected argument of type massa.CreateOrderbookRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_massa_CreateOrderbookRequest(buffer_arg) {
  return protos_massaservice_pb.CreateOrderbookRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_massa_CreateOrderbookResponse(arg) {
  if (!(arg instanceof protos_massaservice_pb.CreateOrderbookResponse)) {
    throw new Error('Expected argument of type massa.CreateOrderbookResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_massa_CreateOrderbookResponse(buffer_arg) {
  return protos_massaservice_pb.CreateOrderbookResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_massa_DeleteOderbookRequest(arg) {
  if (!(arg instanceof protos_massaservice_pb.DeleteOderbookRequest)) {
    throw new Error('Expected argument of type massa.DeleteOderbookRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_massa_DeleteOderbookRequest(buffer_arg) {
  return protos_massaservice_pb.DeleteOderbookRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_massa_DeleteOrderbookResponse(arg) {
  if (!(arg instanceof protos_massaservice_pb.DeleteOrderbookResponse)) {
    throw new Error('Expected argument of type massa.DeleteOrderbookResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_massa_DeleteOrderbookResponse(buffer_arg) {
  return protos_massaservice_pb.DeleteOrderbookResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


// Service Definition
var MassaService = exports.MassaService = {
  // / create and delete orderbooks
createOrderbook: {
    path: '/massa.Massa/createOrderbook',
    requestStream: false,
    responseStream: false,
    requestType: protos_massaservice_pb.CreateOrderbookRequest,
    responseType: protos_massaservice_pb.CreateOrderbookResponse,
    requestSerialize: serialize_massa_CreateOrderbookRequest,
    requestDeserialize: deserialize_massa_CreateOrderbookRequest,
    responseSerialize: serialize_massa_CreateOrderbookResponse,
    responseDeserialize: deserialize_massa_CreateOrderbookResponse,
  },
  deleteOrderbook: {
    path: '/massa.Massa/deleteOrderbook',
    requestStream: false,
    responseStream: false,
    requestType: protos_massaservice_pb.DeleteOderbookRequest,
    responseType: protos_massaservice_pb.DeleteOrderbookResponse,
    requestSerialize: serialize_massa_DeleteOderbookRequest,
    requestDeserialize: deserialize_massa_DeleteOderbookRequest,
    responseSerialize: serialize_massa_DeleteOrderbookResponse,
    responseDeserialize: deserialize_massa_DeleteOrderbookResponse,
  },
};

exports.MassaClient = grpc.makeGenericClientConstructor(MassaService);
