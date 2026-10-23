import {
  ExecutionQueryRequestItem,
  OpExecutionStatusCandidate,
  QueryStateRequest,
} from '../../src/generated/grpc/public_pb'

/* Apps that generate the Massa protos themselves register their classes on
 * the global `proto` namespace. The generated code of massa-web3 must neither
 * replace them nor use them (see scripts/private-proto-namespace.mjs). */
describe('Generated protobuf code', () => {
  it('does not register its classes on the global proto namespace', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const globalProto = (globalThis as any).proto
    expect(globalProto?.massa).toBeUndefined()
  })

  it('does not use classes registered globally by another copy', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const global = globalThis as any
    const previous = global.proto
    const fail = () => {
      throw new Error('used the global ExecutionQueryRequestItem')
    }
    global.proto = {
      massa: {
        api: {
          v1: {
            ExecutionQueryRequestItem: {
              toObject: fail,
              serializeBinaryToWriter: fail,
              deserializeBinaryFromReader: fail,
            },
          },
        },
      },
    }
    try {
      const request = new QueryStateRequest().setQueriesList([
        new ExecutionQueryRequestItem().setOpExecutionStatusCandidate(
          new OpExecutionStatusCandidate().setOperationId(
            'O1232a33MvDFJmu8f1Hra7PxLc1zNsUthgcCKFRQ3B6VD1uSKi2C'
          )
        ),
      ])
      const decoded = QueryStateRequest.deserializeBinary(
        request.serializeBinary()
      )
      expect(decoded.toObject()).toEqual(request.toObject())
    } finally {
      global.proto = previous
    }
  })
})
