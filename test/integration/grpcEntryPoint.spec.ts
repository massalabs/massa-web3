import { CHAIN_ID, USDCe } from '../../src'
import {
  AddressBalanceCandidate,
  ExecutionQueryRequestItem,
} from '../../src/generated/grpc/public_pb'
import { grpcProvider } from './setup'

/* Loaded by package name, so they resolve to the build in dist/ through the
 * `exports` map, as they would in an app. (TypeScript can't resolve a package
 * by its own name here, hence `require`.) */
/* eslint-disable @typescript-eslint/no-var-requires */
const web3: typeof import('../../src') = require('@massalabs/massa-web3')
const {
  GrpcProvider: PublishedGrpcProvider,
}: typeof import('../../src/grpc') = require('@massalabs/massa-web3/grpc')
/* eslint-enable @typescript-eslint/no-var-requires */

describe('Published gRPC entry point', () => {
  test('is the only one exposing the gRPC API', () => {
    expect(web3).not.toHaveProperty('GrpcProvider')
    expect(web3).not.toHaveProperty('GrpcPublicProvider')
    expect(web3).not.toHaveProperty('PublicServiceClient')
  })

  test('reaches the node', async () => {
    const status = await PublishedGrpcProvider.buildnet().getNodeStatus()
    expect(status.chainId).toBe(Number(CHAIN_ID.Buildnet))
  })
})

/* Apps that generate the Massa protos themselves register their classes on
 * the global `proto` namespace. massa-web3 must keep working whatever they
 * register there. */
describe('gRPC with another copy of the protos on the global namespace', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const global = globalThis as any
  let previous: unknown

  beforeAll(() => {
    previous = global.proto
    const fail = () => {
      throw new Error('used a class registered globally by another copy')
    }
    const broken = {
      toObject: fail,
      serializeBinaryToWriter: fail,
      deserializeBinaryFromReader: fail,
    }
    global.proto = {
      massa: {
        api: {
          v1: {
            QueryStateRequest: broken,
            QueryStateResponse: broken,
            ExecutionQueryRequestItem: broken,
            ExecutionQueryResponse: broken,
            GetStatusRequest: broken,
            GetStatusResponse: broken,
          },
        },
      },
    }
  })

  afterAll(() => {
    global.proto = previous
  })

  test('queryState', async () => {
    const USDC = await USDCe.fromProvider(grpcProvider)
    const request = new ExecutionQueryRequestItem().setAddressBalanceCandidate(
      new AddressBalanceCandidate().setAddress(USDC.address)
    )
    const state = await grpcProvider.queryState([request])
    const result = state.getResponsesList()[0].getResult()
    expect(result?.getAmount()?.getScale()).toBe(9)
  })

  test('getNodeStatus', async () => {
    const status = await grpcProvider.getNodeStatus()
    expect(status.chainId).toBe(Number(CHAIN_ID.Buildnet))
  })
})
