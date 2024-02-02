/* eslint-disable @typescript-eslint/no-explicit-any */
import { PublicApiClient } from '../../src/web3/PublicApiClient'
import { JSON_RPC_REQUEST_METHOD } from '../../src/interfaces/JsonRpcMethods'
import { IClientConfig } from '../../src/interfaces/IClientConfig'
import { ProviderType, IProvider } from '../../src/interfaces/IProvider'
import {
  mockAddresses,
  mockAddressesInfo,
  mockGraphInterval,
  mockNodeStatusInfo,
  mockBlockIds,
  mockBlockData,
  mockEndorsementIds,
  mockEndorsementData,
  mockOperationData,
  mockStackersData,
  mockDatastoreEntryInput,
  mockDatastoreEntries,
  mockOpIds,
} from './mockData'

export const PERIOD_OFFSET = 5

describe('PublicApiClient', () => {
  let client: PublicApiClient
  let mockSendJsonRPCRequest: jest.SpyInstance

  // Function to generate tests for a set of similar operations to avoid code duplication
  function generateAPITests(
    operation: string,
    mockData: any,
    mockResponse: any,
    jsonRpcRequestMethod: JSON_RPC_REQUEST_METHOD,
    wrapArgsInArray: boolean
  ) {
    test(`should call sendJsonRPCRequest with correct arguments`, async () => {
      mockSendJsonRPCRequest.mockResolvedValue(Promise.resolve(mockResponse))

      await (client as any)[operation](mockData)

      let rpcArgs

      if (wrapArgsInArray) {
        rpcArgs = [Array.isArray(mockData) ? mockData : []]
      } else {
        rpcArgs = Array.isArray(mockData) ? mockData : []
      }

      expect(mockSendJsonRPCRequest).toHaveBeenCalledWith(
        jsonRpcRequestMethod,
        rpcArgs
      )
    })

    test(`should return the correct result`, async () => {
      mockSendJsonRPCRequest.mockResolvedValue(Promise.resolve(mockResponse))

      const result = await (client as any)[operation](mockData)

      expect(result).toEqual(mockResponse)
    })

    test(`should handle errors correctly`, async () => {
      const mockError = new Error('Error message')
      mockSendJsonRPCRequest.mockRejectedValue(mockError)

      await expect((client as any)[operation](mockData)).rejects.toThrow(
        mockError
      )
    })

    test(`should call trySafeExecute if retryStrategyOn is true`, async () => {
      // Enable retry strategy
      const originalRetryStrategy = (client as any).clientConfig.retryStrategyOn
      ;(client as any).clientConfig.retryStrategyOn = true

      mockSendJsonRPCRequest.mockResolvedValue(Promise.resolve(mockResponse))

      const result = await (client as any)[operation](mockData)

      let rpcArgs
      if (wrapArgsInArray) {
        rpcArgs = [Array.isArray(mockData) ? mockData : []]
      } else {
        rpcArgs = Array.isArray(mockData) ? mockData : []
      }

      expect(mockSendJsonRPCRequest).toHaveBeenCalledWith(
        jsonRpcRequestMethod,
        rpcArgs
      )

      expect(result).toEqual(mockResponse)

      // Restore retry strategy
      ;(client as any).clientConfig.retryStrategyOn = originalRetryStrategy
    })
  }

  beforeEach(() => {
    const clientConfig: IClientConfig = {
      providers: [
        {
          url: 'https://mock-public-api.com',
          type: ProviderType.PUBLIC,
        } as IProvider,
        {
          url: 'https://mock-private-api.com',
          type: ProviderType.PRIVATE,
        } as IProvider,
      ],
      periodOffset: PERIOD_OFFSET,
    }
    client = new PublicApiClient(clientConfig)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mockSendJsonRPCRequest = jest.spyOn(client as any, 'sendJsonRPCRequest')
  })

  describe('getGraphInterval', () => {
    generateAPITests(
      'getGraphInterval',
      [],
      mockGraphInterval,
      JSON_RPC_REQUEST_METHOD.GET_GRAPH_INTERVAL,
      true
    )
  })

  describe('getBlockcliqueBlockBySlot', () => {
    generateAPITests(
      'getBlockcliqueBlockBySlot',
      [],
      mockBlockData,
      JSON_RPC_REQUEST_METHOD.GET_BLOCKCLIQUE_BLOCK_BY_SLOT,
      true
    )
  })

  describe('getNodeStatus', () => {
    generateAPITests(
      'getNodeStatus',
      [],
      mockNodeStatusInfo,
      JSON_RPC_REQUEST_METHOD.GET_STATUS,
      false
    )
  })

  describe('getAddresses', () => {
    generateAPITests(
      'getAddresses',
      mockAddresses,
      mockAddressesInfo,
      JSON_RPC_REQUEST_METHOD.GET_ADDRESSES,
      true
    )
  })

  describe('getBlocks', () => {
    generateAPITests(
      'getBlocks',
      mockBlockIds,
      mockBlockData,
      JSON_RPC_REQUEST_METHOD.GET_BLOCKS,
      true
    )
  })

  describe('getEndorsements', () => {
    generateAPITests(
      'getEndorsements',
      mockEndorsementIds,
      mockEndorsementData,
      JSON_RPC_REQUEST_METHOD.GET_ENDORSEMENTS,
      true
    )
  })

  describe('getOperations', () => {
    generateAPITests(
      'getOperations',
      mockOpIds,
      mockOperationData,
      JSON_RPC_REQUEST_METHOD.GET_OPERATIONS,
      true
    )
  })

  describe('getCliques', () => {
    generateAPITests(
      'getCliques',
      [],
      mockEndorsementData,
      JSON_RPC_REQUEST_METHOD.GET_CLIQUES,
      false
    )
  })

  describe('getStakers', () => {
    generateAPITests(
      'getStakers',
      [],
      mockStackersData,
      JSON_RPC_REQUEST_METHOD.GET_STAKERS,
      false
    )
  })

  describe('getDatastoreEntries', () => {
    const transformedInput = mockDatastoreEntryInput.map((input) => ({
      address: input.address,
      key: Array.prototype.slice.call(Buffer.from(input.key)),
    }))

    test('should call sendJsonRPCRequest with correct arguments', async () => {
      mockSendJsonRPCRequest.mockResolvedValue(
        Promise.resolve(mockDatastoreEntries)
      )

      await client.getDatastoreEntries(mockDatastoreEntryInput)

      expect(mockSendJsonRPCRequest).toHaveBeenCalledWith(
        JSON_RPC_REQUEST_METHOD.GET_DATASTORE_ENTRIES,
        [transformedInput]
      )
    })

    test('should return correct result', async () => {
      mockSendJsonRPCRequest.mockResolvedValue(
        Promise.resolve(mockDatastoreEntries)
      )

      const result = await client.getDatastoreEntries(mockDatastoreEntryInput)

      expect(result).toEqual(mockDatastoreEntries)
    })

    test('should handle errors correctly', async () => {
      const mockError = new Error('Error message')
      mockSendJsonRPCRequest.mockRejectedValue(mockError)

      await expect(
        client.getDatastoreEntries(mockDatastoreEntryInput)
      ).rejects.toThrow(mockError)
    })

    test('should call trySafeExecute if retryStrategyOn is true', async () => {
      const originalRetryStrategy = (client as any).clientConfig.retryStrategyOn
      ;(client as any).clientConfig.retryStrategyOn = true

      mockSendJsonRPCRequest.mockResolvedValue(
        Promise.resolve(mockDatastoreEntries)
      )

      const result = await client.getDatastoreEntries(mockDatastoreEntryInput)

      expect(mockSendJsonRPCRequest).toHaveBeenCalledWith(
        JSON_RPC_REQUEST_METHOD.GET_DATASTORE_ENTRIES,
        [transformedInput]
      )
      expect(result).toEqual(mockDatastoreEntries)
      ;(client as any).clientConfig.retryStrategyOn = originalRetryStrategy
    })
  })
})
