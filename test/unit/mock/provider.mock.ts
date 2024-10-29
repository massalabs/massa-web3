import { Provider } from '../../../src/provider'
import { blockchainClientMock } from './blockchainClient.mock'

export const providerMock = {
  getOperationStatus: blockchainClientMock.getOperationStatus,
  getEvents: blockchainClientMock.getEvents,
} as any as Provider
