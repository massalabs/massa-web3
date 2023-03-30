// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var protos_orderbookservice_pb = require('../protos/orderbookservice_pb.js');

function serialize_orderbook_AddOrderRequest(arg) {
  if (!(arg instanceof protos_orderbookservice_pb.AddOrderRequest)) {
    throw new Error('Expected argument of type orderbook.AddOrderRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_orderbook_AddOrderRequest(buffer_arg) {
  return protos_orderbookservice_pb.AddOrderRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_orderbook_AddOrderResponse(arg) {
  if (!(arg instanceof protos_orderbookservice_pb.AddOrderResponse)) {
    throw new Error('Expected argument of type orderbook.AddOrderResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_orderbook_AddOrderResponse(buffer_arg) {
  return protos_orderbookservice_pb.AddOrderResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_orderbook_CancelOrderRequest(arg) {
  if (!(arg instanceof protos_orderbookservice_pb.CancelOrderRequest)) {
    throw new Error('Expected argument of type orderbook.CancelOrderRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_orderbook_CancelOrderRequest(buffer_arg) {
  return protos_orderbookservice_pb.CancelOrderRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_orderbook_CancelOrderResponse(arg) {
  if (!(arg instanceof protos_orderbookservice_pb.CancelOrderResponse)) {
    throw new Error('Expected argument of type orderbook.CancelOrderResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_orderbook_CancelOrderResponse(buffer_arg) {
  return protos_orderbookservice_pb.CancelOrderResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_orderbook_CreateOrderbookRequest(arg) {
  if (!(arg instanceof protos_orderbookservice_pb.CreateOrderbookRequest)) {
    throw new Error('Expected argument of type orderbook.CreateOrderbookRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_orderbook_CreateOrderbookRequest(buffer_arg) {
  return protos_orderbookservice_pb.CreateOrderbookRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_orderbook_CreateOrderbookResponse(arg) {
  if (!(arg instanceof protos_orderbookservice_pb.CreateOrderbookResponse)) {
    throw new Error('Expected argument of type orderbook.CreateOrderbookResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_orderbook_CreateOrderbookResponse(buffer_arg) {
  return protos_orderbookservice_pb.CreateOrderbookResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_orderbook_DeleteOderbookRequest(arg) {
  if (!(arg instanceof protos_orderbookservice_pb.DeleteOderbookRequest)) {
    throw new Error('Expected argument of type orderbook.DeleteOderbookRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_orderbook_DeleteOderbookRequest(buffer_arg) {
  return protos_orderbookservice_pb.DeleteOderbookRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_orderbook_DeleteOrderbookResponse(arg) {
  if (!(arg instanceof protos_orderbookservice_pb.DeleteOrderbookResponse)) {
    throw new Error('Expected argument of type orderbook.DeleteOrderbookResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_orderbook_DeleteOrderbookResponse(buffer_arg) {
  return protos_orderbookservice_pb.DeleteOrderbookResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_orderbook_GetOrderRequest(arg) {
  if (!(arg instanceof protos_orderbookservice_pb.GetOrderRequest)) {
    throw new Error('Expected argument of type orderbook.GetOrderRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_orderbook_GetOrderRequest(buffer_arg) {
  return protos_orderbookservice_pb.GetOrderRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_orderbook_GetOrderResponse(arg) {
  if (!(arg instanceof protos_orderbookservice_pb.GetOrderResponse)) {
    throw new Error('Expected argument of type orderbook.GetOrderResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_orderbook_GetOrderResponse(buffer_arg) {
  return protos_orderbookservice_pb.GetOrderResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_orderbook_GetStatsRequest(arg) {
  if (!(arg instanceof protos_orderbookservice_pb.GetStatsRequest)) {
    throw new Error('Expected argument of type orderbook.GetStatsRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_orderbook_GetStatsRequest(buffer_arg) {
  return protos_orderbookservice_pb.GetStatsRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_orderbook_GetStatsResponse(arg) {
  if (!(arg instanceof protos_orderbookservice_pb.GetStatsResponse)) {
    throw new Error('Expected argument of type orderbook.GetStatsResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_orderbook_GetStatsResponse(buffer_arg) {
  return protos_orderbookservice_pb.GetStatsResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


// Service Definition
var OrderbookService = exports.OrderbookService = {
  // / create and delete orderbooks
createOrderbook: {
    path: '/orderbook.Orderbook/createOrderbook',
    requestStream: false,
    responseStream: false,
    requestType: protos_orderbookservice_pb.CreateOrderbookRequest,
    responseType: protos_orderbookservice_pb.CreateOrderbookResponse,
    requestSerialize: serialize_orderbook_CreateOrderbookRequest,
    requestDeserialize: deserialize_orderbook_CreateOrderbookRequest,
    responseSerialize: serialize_orderbook_CreateOrderbookResponse,
    responseDeserialize: deserialize_orderbook_CreateOrderbookResponse,
  },
  deleteOrderbook: {
    path: '/orderbook.Orderbook/deleteOrderbook',
    requestStream: false,
    responseStream: false,
    requestType: protos_orderbookservice_pb.DeleteOderbookRequest,
    responseType: protos_orderbookservice_pb.DeleteOrderbookResponse,
    requestSerialize: serialize_orderbook_DeleteOderbookRequest,
    requestDeserialize: deserialize_orderbook_DeleteOderbookRequest,
    responseSerialize: serialize_orderbook_DeleteOrderbookResponse,
    responseDeserialize: deserialize_orderbook_DeleteOrderbookResponse,
  },
  // / add an order, returning immediately an event indicating the result.
addOrder: {
    path: '/orderbook.Orderbook/addOrder',
    requestStream: false,
    responseStream: false,
    requestType: protos_orderbookservice_pb.AddOrderRequest,
    responseType: protos_orderbookservice_pb.AddOrderResponse,
    requestSerialize: serialize_orderbook_AddOrderRequest,
    requestDeserialize: deserialize_orderbook_AddOrderRequest,
    responseSerialize: serialize_orderbook_AddOrderResponse,
    responseDeserialize: deserialize_orderbook_AddOrderResponse,
  },
  // / cancel order, which removes the order with the specified ID from the order book.
cancelOrder: {
    path: '/orderbook.Orderbook/cancelOrder',
    requestStream: false,
    responseStream: false,
    requestType: protos_orderbookservice_pb.CancelOrderRequest,
    responseType: protos_orderbookservice_pb.CancelOrderResponse,
    requestSerialize: serialize_orderbook_CancelOrderRequest,
    requestDeserialize: deserialize_orderbook_CancelOrderRequest,
    responseSerialize: serialize_orderbook_CancelOrderResponse,
    responseDeserialize: deserialize_orderbook_CancelOrderResponse,
  },
  // / returns the order data and status
getOrder: {
    path: '/orderbook.Orderbook/getOrder',
    requestStream: false,
    responseStream: false,
    requestType: protos_orderbookservice_pb.GetOrderRequest,
    responseType: protos_orderbookservice_pb.GetOrderResponse,
    requestSerialize: serialize_orderbook_GetOrderRequest,
    requestDeserialize: deserialize_orderbook_GetOrderRequest,
    responseSerialize: serialize_orderbook_GetOrderResponse,
    responseDeserialize: deserialize_orderbook_GetOrderResponse,
  },
  // / returns the stats
getStats: {
    path: '/orderbook.Orderbook/getStats',
    requestStream: false,
    responseStream: false,
    requestType: protos_orderbookservice_pb.GetStatsRequest,
    responseType: protos_orderbookservice_pb.GetStatsResponse,
    requestSerialize: serialize_orderbook_GetStatsRequest,
    requestDeserialize: deserialize_orderbook_GetStatsRequest,
    responseSerialize: serialize_orderbook_GetStatsResponse,
    responseDeserialize: deserialize_orderbook_GetStatsResponse,
  },
};

exports.OrderbookClient = grpc.makeGenericClientConstructor(OrderbookService);
