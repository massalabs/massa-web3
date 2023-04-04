// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var protos_massaservice_pb = require('../protos/massaservice_pb.js');

function serialize_massa_AddOrderRequest(arg) {
  if (!(arg instanceof protos_massaservice_pb.AddOrderRequest)) {
    throw new Error('Expected argument of type massa.AddOrderRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_massa_AddOrderRequest(buffer_arg) {
  return protos_massaservice_pb.AddOrderRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_massa_AddOrderResponse(arg) {
  if (!(arg instanceof protos_massaservice_pb.AddOrderResponse)) {
    throw new Error('Expected argument of type massa.AddOrderResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_massa_AddOrderResponse(buffer_arg) {
  return protos_massaservice_pb.AddOrderResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_massa_CancelOrderRequest(arg) {
  if (!(arg instanceof protos_massaservice_pb.CancelOrderRequest)) {
    throw new Error('Expected argument of type massa.CancelOrderRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_massa_CancelOrderRequest(buffer_arg) {
  return protos_massaservice_pb.CancelOrderRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_massa_CancelOrderResponse(arg) {
  if (!(arg instanceof protos_massaservice_pb.CancelOrderResponse)) {
    throw new Error('Expected argument of type massa.CancelOrderResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_massa_CancelOrderResponse(buffer_arg) {
  return protos_massaservice_pb.CancelOrderResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

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

function serialize_massa_GetOrderRequest(arg) {
  if (!(arg instanceof protos_massaservice_pb.GetOrderRequest)) {
    throw new Error('Expected argument of type massa.GetOrderRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_massa_GetOrderRequest(buffer_arg) {
  return protos_massaservice_pb.GetOrderRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_massa_GetOrderResponse(arg) {
  if (!(arg instanceof protos_massaservice_pb.GetOrderResponse)) {
    throw new Error('Expected argument of type massa.GetOrderResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_massa_GetOrderResponse(buffer_arg) {
  return protos_massaservice_pb.GetOrderResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_massa_GetStatsRequest(arg) {
  if (!(arg instanceof protos_massaservice_pb.GetStatsRequest)) {
    throw new Error('Expected argument of type massa.GetStatsRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_massa_GetStatsRequest(buffer_arg) {
  return protos_massaservice_pb.GetStatsRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_massa_GetStatsResponse(arg) {
  if (!(arg instanceof protos_massaservice_pb.GetStatsResponse)) {
    throw new Error('Expected argument of type massa.GetStatsResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_massa_GetStatsResponse(buffer_arg) {
  return protos_massaservice_pb.GetStatsResponse.deserializeBinary(new Uint8Array(buffer_arg));
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
  // / add an order, returning immediately an event indicating the result.
addOrder: {
    path: '/massa.Massa/addOrder',
    requestStream: false,
    responseStream: false,
    requestType: protos_massaservice_pb.AddOrderRequest,
    responseType: protos_massaservice_pb.AddOrderResponse,
    requestSerialize: serialize_massa_AddOrderRequest,
    requestDeserialize: deserialize_massa_AddOrderRequest,
    responseSerialize: serialize_massa_AddOrderResponse,
    responseDeserialize: deserialize_massa_AddOrderResponse,
  },
  // / cancel order, which removes the order with the specified ID from the order book.
cancelOrder: {
    path: '/massa.Massa/cancelOrder',
    requestStream: false,
    responseStream: false,
    requestType: protos_massaservice_pb.CancelOrderRequest,
    responseType: protos_massaservice_pb.CancelOrderResponse,
    requestSerialize: serialize_massa_CancelOrderRequest,
    requestDeserialize: deserialize_massa_CancelOrderRequest,
    responseSerialize: serialize_massa_CancelOrderResponse,
    responseDeserialize: deserialize_massa_CancelOrderResponse,
  },
  // / returns the order data and status
getOrder: {
    path: '/massa.Massa/getOrder',
    requestStream: false,
    responseStream: false,
    requestType: protos_massaservice_pb.GetOrderRequest,
    responseType: protos_massaservice_pb.GetOrderResponse,
    requestSerialize: serialize_massa_GetOrderRequest,
    requestDeserialize: deserialize_massa_GetOrderRequest,
    responseSerialize: serialize_massa_GetOrderResponse,
    responseDeserialize: deserialize_massa_GetOrderResponse,
  },
  // / returns the stats
getStats: {
    path: '/massa.Massa/getStats',
    requestStream: false,
    responseStream: false,
    requestType: protos_massaservice_pb.GetStatsRequest,
    responseType: protos_massaservice_pb.GetStatsResponse,
    requestSerialize: serialize_massa_GetStatsRequest,
    requestDeserialize: deserialize_massa_GetStatsRequest,
    responseSerialize: serialize_massa_GetStatsResponse,
    responseDeserialize: deserialize_massa_GetStatsResponse,
  },
};

exports.MassaClient = grpc.makeGenericClientConstructor(MassaService);
