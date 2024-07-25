import { Provider } from '../../../src/provider'
import { blockchainClientMock } from './blockchainClient.mock'

export const providerMock = {
  getOperationStatus: blockchainClientMock.getOperationStatus,
  getOperationEvents: async (operationId: string, waitFinal: boolean) =>
    blockchainClientMock.getEvents({
      operationId,
      isFinal: waitFinal,
    }),
} as any as Provider
