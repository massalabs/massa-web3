/* eslint-disable @typescript-eslint/no-unused-vars */
import { PublicAPI } from '../../../src/client'
import { NodeStatus } from '../../../src/generated/client'
import { SCOutputEvent } from '../../../src/provider'

export const blockchainClientMock = {
  sendOperation: jest.fn().mockResolvedValue('operationId'),
  fetchPeriod: jest.fn().mockResolvedValue(1),
  getOperationStatus: jest.fn(),
  getBalance: jest.fn().mockResolvedValue(123_456_789n),
  getEvents: jest.fn().mockResolvedValue([] as SCOutputEvent[]),
  getChainId: jest.fn().mockResolvedValue(1n),
  getMinimalFee: jest.fn().mockResolvedValue(100_000n),
  executeReadOnlyCall: jest.fn().mockResolvedValue({
    value: new Uint8Array(),
    info: {
      events: [],
      stateChanges: {},
    },
  }),
  status: jest.fn().mockResolvedValue({} as NodeStatus),
} as any as PublicAPI
