/* eslint-disable @typescript-eslint/no-unused-vars */
import { OperationStatus } from '../../../../src/experimental/basicElements/operation'
import {
  BlockchainClient,
  EventFilter,
  SCOutputEvent,
  SendOperationInput,
} from '../../../../src/experimental/client/interfaces'

import { NodeStatus } from '../../../../src/experimental/generated/client'

export const blockchainClientMock: BlockchainClient = {
  sendOperation: jest.fn((data: SendOperationInput) =>
    Promise.resolve('operationId')
  ),
  fetchPeriod: jest.fn(() => Promise.resolve(1)),
  getOperationStatus: jest.fn((operationId: string) =>
    Promise.resolve(OperationStatus.Success)
  ),
  getBalance: jest.fn((address: string, speculative?: boolean) =>
    Promise.resolve(BigInt(1000))
  ),
  getEvents: jest.fn((filter: EventFilter) =>
    Promise.resolve([] as SCOutputEvent[])
  ),
  getChainId: jest.fn(() => Promise.resolve(BigInt(1))),
  getMinimalFee: jest.fn(() => Promise.resolve(BigInt(1))),
  executeReadOnlyCall: jest.fn(() =>
    Promise.resolve({
      value: new Uint8Array(),
      info: {
        events: [],
        stateChanges: {},
      },
    } as any)
  ),
  status: {} as NodeStatus,
}
