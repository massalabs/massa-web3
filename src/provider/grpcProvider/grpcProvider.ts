import { Address } from '../../basicElements'
import { EventFilter } from '../../client'
import { OutputEvents } from '../../generated/client-types'
import { OperationStatus, OperationOptions, Operation } from '../../operation'
import { SmartContract } from '../../smartContracts'
import { Network } from '../../utils'
import {
    CallSCParams,
    DeploySCParams,
    ExecuteScParams,
    NodeStatusInfo,
    Provider,
    ReadSCData,
    ReadSCParams,
    SignedData,
    SignOptions,
} from '..'
import { Account } from '../../account'
import { GrpcWebFetchTransport } from '@protobuf-ts/grpcweb-transport'
import { fromNanoMas, Mas } from '../../basicElements/mas'
import { PublicServiceClient } from 'src/generated/grpc/apis/massa/api/v1/public.client'
import { ExecutionQueryRequestItem } from 'src/generated/grpc/apis/massa/api/v1/public'

export class GrpcProvider implements Provider {
    private readonly publicClient: PublicServiceClient

    constructor(
        url: string,
        public account: Account
    ) {
        const transport = new GrpcWebFetchTransport({
            baseUrl: url,
        })
        this.publicClient = new PublicServiceClient(transport)
    }

    async balanceOf(
        addresses: string[],
        final?: boolean
    ): Promise<{ address: string; balance: bigint }[]> {
        const queries: ExecutionQueryRequestItem[] = addresses.map((address) => {
            if (final) {
                return {
                    requestItem: {
                        oneofKind: 'addressBalanceFinal',
                        addressBalanceFinal: { address },
                    },
                }
            }
            return {
                requestItem: {
                    oneofKind: 'addressBalanceCandidate',
                    addressBalanceCandidate: { address },
                },
            }
        })

        const response = await this.publicClient.queryState({ queries: queries })

        const balances = response.response.responses.map((item, index) => {
            const responseItem = item.response

            if (!responseItem) {
                throw new Error('Empty response received')
            }

            if (responseItem.oneofKind === 'error') {
                throw new Error(
                    `Error for address ${addresses[index]}: ${responseItem.error?.message}`
                )
            }

            if (
                responseItem.oneofKind !== 'result' ||
                responseItem.result?.responseItem?.oneofKind !== 'amount'
            ) {
                throw new Error(
                    `Unexpected response format for address ${addresses[index]}`
                )
            }

            const balance = fromNanoMas(
                responseItem.result.responseItem.amount.mantissa
            )
            return { address: addresses[index], balance }
        })

        return balances
    }
    async networkInfos(): Promise<Network> {
        let status = await this.publicClient.getStatus({});

        status.response?.status?.chainId;

        // let name = 'Unknown'
        // if (chainId === CHAIN_ID.Mainnet) {
        //     name = NetworkName.Mainnet
        // } else if (chainId === CHAIN_ID.Buildnet) {
        //     name = NetworkName.Buildnet
        // }

        return {
            name: "toto",
            chainId: 2n,
            url: "this.client.url",
            minimalFee: 0n,
        }


    }
    getOperationStatus(opId: string): Promise<OperationStatus> {
        // const response = await this.publicClient.searchOperations({operationIds: [opId]});
        throw new Error('Method not implemented.')
    }
    getEvents(filter: EventFilter): Promise<OutputEvents> {
        throw new Error('Method not implemented.')
    }
    getNodeStatus(): Promise<NodeStatusInfo> {
        throw new Error('Method not implemented.')
    }
    readSC(params: ReadSCParams): Promise<ReadSCData> {
        throw new Error('Method not implemented.')
    }
    getStorageKeys(
        address: string,
        filter?: Uint8Array | string,
        final?: boolean
    ): Promise<Uint8Array[]> {
        throw new Error('Method not implemented.')
    }
    readStorage(
        address: string,
        keys: Uint8Array[] | string[],
        final?: boolean
    ): Promise<(Uint8Array | null)[]> {
        throw new Error('Method not implemented.')
    }
    get address(): string {
        throw new Error('Method not implemented.')
    }
    get accountName(): string {
        throw new Error('Method not implemented.')
    }
    get providerName(): string {
        throw new Error('Method not implemented.')
    }
    balance(final: boolean): Promise<bigint> {
        throw new Error('Method not implemented.')
    }
    sign(
        data: Uint8Array | string,
        signOptions?: SignOptions
    ): Promise<SignedData> {
        throw new Error('Method not implemented.')
    }
    buyRolls(amount: Mas, opts?: OperationOptions): Promise<Operation> {
        throw new Error('Method not implemented.')
    }
    sellRolls(amount: Mas, opts?: OperationOptions): Promise<Operation> {
        throw new Error('Method not implemented.')
    }
    transfer(
        to: Address | string,
        amount: Mas,
        opts?: OperationOptions
    ): Promise<Operation> {
        throw new Error('Method not implemented.')
    }
    callSC(params: CallSCParams): Promise<Operation> {
        throw new Error('Method not implemented.')
    }
    executeSC(params: ExecuteScParams): Promise<Operation> {
        throw new Error('Method not implemented.')
    }
    deploySC(params: DeploySCParams): Promise<SmartContract> {
        throw new Error('Method not implemented.')
    }
}
