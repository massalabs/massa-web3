import { Address } from '../../basicElements'
import { EventFilter } from '../../client'
import { EventExecutionContext, OutputEvents, SCOutputEvent } from '../../generated/client-types'
import { OperationStatus, OperationOptions, Operation } from '../../operation'
import { SmartContract } from '../../smartContracts'
import { CHAIN_ID, Network, NetworkName } from '../../utils'
import {
    CallSCParams,
    DeploySCParams,
    ExecuteScParams,
    Provider,
    ReadSCData,
    ReadSCParams,
    SignedData,
    SignOptions,
} from '..'
import { Account } from '../../account'
import { GrpcWebFetchTransport } from '@protobuf-ts/grpcweb-transport'
import { fromNanoMas, Mas } from '../../basicElements/mas'
import { PublicServiceClient } from '../../generated/grpc/apis/massa/api/v1/public.client'
import { ExecutionQueryExecutionStatus, ExecutionQueryRequestItem, ScExecutionEventsFilter } from '../../generated/grpc/apis/massa/api/v1/public'
import { ScExecutionEventStatus } from '../../generated/grpc/massa/model/v1/execution'
import { PublicStatus } from '../../generated/grpc/massa/model/v1/node'

export class GrpcProvider implements Provider {
    private readonly publicClient: PublicServiceClient
    private readonly url: string
    constructor(
        url: string,
        public account: Account
    ) {
        const transport = new GrpcWebFetchTransport({
            baseUrl: url,
        })
        this.publicClient = new PublicServiceClient(transport);
        this.url = url;
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

        const balances = response.response.responses
            .map((item, index) => {
                const responseItem = item.response

                if (!responseItem) {
                    console.warn(`Empty response received for address ${addresses[index]}`)
                    return null
                }

                if (responseItem.oneofKind === 'error') {
                    console.warn(`Error for address ${addresses[index]}: ${responseItem.error?.message}`)
                    return null
                }

                if (
                    responseItem.oneofKind !== 'result' ||
                    responseItem.result?.responseItem?.oneofKind !== 'amount'
                ) {
                    console.warn(`Unexpected response format for address ${addresses[index]}`)
                    return null
                }

                const balance = fromNanoMas(
                    responseItem.result.responseItem.amount.mantissa
                )
                return { address: addresses[index], balance }
            })
            .filter((item): item is { address: string; balance: bigint } => item !== null)

        return balances
    }
    async networkInfos(): Promise<Network> {
        let status = await this.publicClient.getStatus({});
        const chainId = status.response?.status?.chainId;
        let networkName;
        if (chainId === CHAIN_ID.Mainnet) {
            networkName = NetworkName.Mainnet;
        } else if (chainId === CHAIN_ID.Buildnet) {
            networkName = NetworkName.Buildnet;
        }

        return {
            name: networkName,
            chainId: CHAIN_ID.Buildnet,
            url: this.url,
            minimalFee: 0n,
        }
    }
    async getOperationStatus(opId: string): Promise<OperationStatus> {

        const queries: ExecutionQueryRequestItem[] = [
            {
                requestItem: {
                    oneofKind: 'opExecutionStatusCandidate',
                    opExecutionStatusCandidate: { operationId: opId }
                }
            }
        ];

        const response = await this.publicClient.queryState({ queries: queries });

        if (response.response.responses.length === 0) {
            throw new Error('Operation not found')
        }

        const operation = response.response.responses[0].response;
        if (operation.oneofKind === 'error') {
            throw new Error('error in queryState');
        }

        if (operation.oneofKind === 'result') {
            if (operation.result.responseItem.oneofKind === 'executionStatus') {
                switch (operation.result.responseItem.executionStatus) {
                    case ExecutionQueryExecutionStatus.ALREADY_EXECUTED_WITH_FAILURE:
                        return OperationStatus.Error;
                    case ExecutionQueryExecutionStatus.ALREADY_EXECUTED_WITH_SUCCESS:
                        return OperationStatus.Success;
                    case ExecutionQueryExecutionStatus.EXECUTABLE_OR_EXPIRED:
                        return OperationStatus.NotFound;
                    case ExecutionQueryExecutionStatus.UNSPECIFIED:
                        return OperationStatus.NotFound;
                }
            }
        }


        return OperationStatus.NotFound;
    }

    /// only events with context are returned
    async getEvents(filter: EventFilter): Promise<OutputEvents> {
        const filters: ScExecutionEventsFilter[] = [];

        if (filter.start !== undefined && filter.end !== undefined) {
            filters.push({
                filter: {
                    oneofKind: "slotRange",
                    slotRange: {
                        startSlot: {
                            period: BigInt(filter.start.period),
                            thread: filter.start.thread
                        },
                        endSlot: {
                            period: BigInt(filter.end.period),
                            thread: filter.end.thread
                        }
                    }
                }
            });
        } else if (filter.callerAddress !== undefined) {
            filters.push({
                filter: {
                    oneofKind: "callerAddress",
                    callerAddress: filter.callerAddress
                }
            });
        } else if (filter.smartContractAddress !== undefined) {
            filters.push({
                filter: {
                    oneofKind: "emitterAddress",
                    emitterAddress: filter.smartContractAddress
                }
            });
        } else if (filter.operationId !== undefined) {
            filters.push({
                filter: {
                    oneofKind: "originalOperationId",
                    originalOperationId: filter.operationId
                }
            });
        } else if (filter.isError !== undefined) {
            filters.push({
                filter: {
                    oneofKind: "isFailure",
                    isFailure: filter.isError
                }
            });
        } else if (filter.status !== undefined) {
            filters.push({
                filter: {
                    oneofKind: "status",
                    status: filter.status
                }
            });
        }

        const response = await this.publicClient.getScExecutionEvents({ filters: filters });
        const outputEvents: OutputEvents = response.response.events.filter((event) => event.context !== null).map((event) => {
            const context = {
                slot: {
                    period: Number(event.context?.originSlot?.period ?? 0),
                    thread: Number(event.context?.originSlot?.thread ?? 0)
                },
                read_only: event.context?.status === ScExecutionEventStatus.READ_ONLY ? true : false,
                call_stack: event.context?.callStack ?? [],
                index_in_slot: Number(event.context?.indexInSlot ?? 0),
                is_final: event.context?.status === ScExecutionEventStatus.FINAL ? true : false,
            };
            const outputEvent: SCOutputEvent = {
                data: event.data.toString(),
                context,
            };
            return outputEvent;
        });
        return outputEvents;
    }

    async getNodeStatus(): Promise<PublicStatus> {
        const response = await this.publicClient.getStatus({});
        const status = response.response?.status;
        if (!status) {
            throw new Error('Empty response received')
        }
        return status;
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
