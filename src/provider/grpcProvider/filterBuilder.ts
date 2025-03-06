import { NewSlotExecutionOutputsFilter } from "src/generated/grpc/apis/massa/api/v1/public_pb"
import { AsyncPoolChangeType, ExecutionOutputStatus } from "src/generated/grpc/massa/model/v1/execution_pb"
import { SlotRange } from "src/generated/grpc/massa/model/v1/slot_pb"

export class FilterBuilder {
    private filters: NewSlotExecutionOutputsFilter[] = []

    addStatus(status: ExecutionOutputStatus): FilterBuilder {
        this.filters.push({
            filter: {
                oneofKind: 'status',
                status,
            },
        })
        return this
    }

    addSlotRange(slotRange: SlotRange): FilterBuilder {
        this.filters.push({
            filter: {
                oneofKind: 'slotRange',
                slotRange,
            },
        })
        return this
    }

    addAsyncPoolChangesFilter(filter: {
        empty?: boolean
        type?: AsyncPoolChangeType
        handler?: string
        destinationAddress?: string
        emitterAddress?: string
        canBeExecuted?: boolean
    }): FilterBuilder {
        if (filter.empty) {
            this.filters.push({
                filter: {
                    oneofKind: 'asyncPoolChangesFilter',
                    asyncPoolChangesFilter: { filter: { oneofKind: 'none', none: {} } },
                },
            })
        }

        if (filter.type) {
            this.filters.push({
                filter: {
                    oneofKind: 'asyncPoolChangesFilter',
                    asyncPoolChangesFilter: {
                        filter: {
                            oneofKind: 'type',
                            type: filter.type,
                        },
                    },
                },
            })
        }

        if (filter.handler) {
            this.filters.push({
                filter: {
                    oneofKind: 'asyncPoolChangesFilter',
                    asyncPoolChangesFilter: {
                        filter: {
                            oneofKind: 'handler',
                            handler: filter.handler,
                        },
                    },
                },
            })
        }

        if (filter.destinationAddress) {
            this.filters.push({
                filter: {
                    oneofKind: 'asyncPoolChangesFilter',
                    asyncPoolChangesFilter: {
                        filter: {
                            oneofKind: 'destinationAddress',
                            destinationAddress: filter.destinationAddress,
                        },
                    },
                },
            })
        }

        if (filter.emitterAddress) {
            this.filters.push({
                filter: {
                    oneofKind: 'asyncPoolChangesFilter',
                    asyncPoolChangesFilter: {
                        filter: {
                            oneofKind: 'emitterAddress',
                            emitterAddress: filter.emitterAddress,
                        },
                    },
                },
            })
        }

        if (filter.canBeExecuted !== undefined) {
            this.filters.push({
                filter: {
                    oneofKind: 'asyncPoolChangesFilter',
                    asyncPoolChangesFilter: {
                        filter: {
                            oneofKind: 'canBeExecuted',
                            canBeExecuted: filter.canBeExecuted,
                        },
                    },
                },
            })
        }

        return this
    }

    addEmptyExecutedDenounciationFilter(): FilterBuilder {
        this.filters.push({
            filter: {
                oneofKind: 'executedDenounciationFilter',
                executedDenounciationFilter: {
                    filter: {
                        oneofKind: 'none',
                        none: {},
                    },
                },
            },
        })
        return this
    }

    addEventFilter(filter: {
        empty?: boolean
        callerAddress?: string
        emitterAddress?: string
        originalOperationId?: string
        isFailure?: boolean
    }): FilterBuilder {
        if (filter.empty) {
            this.filters.push({
                filter: {
                    oneofKind: 'eventFilter',
                    eventFilter: { filter: { oneofKind: 'none', none: {} } },
                },
            })
        }

        if (filter.callerAddress) {
            this.filters.push({
                filter: {
                    oneofKind: 'eventFilter',
                    eventFilter: {
                        filter: {
                            oneofKind: 'callerAddress',
                            callerAddress: filter.callerAddress,
                        },
                    },
                },
            })
        }

        if (filter.emitterAddress) {
            this.filters.push({
                filter: {
                    oneofKind: 'eventFilter',
                    eventFilter: {
                        filter: {
                            oneofKind: 'emitterAddress',
                            emitterAddress: filter.emitterAddress,
                        },
                    },
                },
            })
        }

        if (filter.originalOperationId) {
            this.filters.push({
                filter: {
                    oneofKind: 'eventFilter',
                    eventFilter: {
                        filter: {
                            oneofKind: 'originalOperationId',
                            originalOperationId: filter.originalOperationId,
                        },
                    },
                },
            })
        }

        if (filter.isFailure !== undefined) {
            this.filters.push({
                filter: {
                    oneofKind: 'eventFilter',
                    eventFilter: {
                        filter: {
                            oneofKind: 'isFailure',
                            isFailure: filter.isFailure,
                        },
                    },
                },
            })
        }

        return this
    }

    addExecutedOpsChangesFilter(filter: {
        empty?: boolean
        operationId?: string
    }): FilterBuilder {
        if (filter.empty) {
            this.filters.push({
                filter: {
                    oneofKind: 'executedOpsChangesFilter',
                    executedOpsChangesFilter: { filter: { oneofKind: 'none', none: {} } },
                },
            })
        }

        if (filter.operationId) {
            this.filters.push({
                filter: {
                    oneofKind: 'executedOpsChangesFilter',
                    executedOpsChangesFilter: {
                        filter: {
                            oneofKind: 'operationId',
                            operationId: filter.operationId,
                        },
                    },
                },
            })
        }

        return this
    }

    addLedgerChangesFilter(filter: {
        empty?: boolean
        address?: string
    }): FilterBuilder {
        if (filter.empty) {
            this.filters.push({
                filter: {
                    oneofKind: 'ledgerChangesFilter',
                    ledgerChangesFilter: { filter: { oneofKind: 'none', none: {} } },
                },
            })
        }

        if (filter.address) {
            this.filters.push({
                filter: {
                    oneofKind: 'ledgerChangesFilter',
                    ledgerChangesFilter: {
                        filter: {
                            oneofKind: 'address',
                            address: filter.address,
                        },
                    },
                },
            })
        }

        return this
    }

    build(): NewSlotExecutionOutputsFilter[] {
        return this.filters
    }
}
