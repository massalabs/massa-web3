import { Provider } from '../../../src/provider'
import { blockchainClientMock } from './blockchainClient.mock'

export const providerMock = {
  getOperationStatus: blockchainClientMock.getOperationStatus,
  getEvents: blockchainClientMock.getEvents,
  networkInfos: jest.fn().mockResolvedValue({}),
} as any as Provider
