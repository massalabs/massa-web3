import { OperationStatus, PublicAPI } from '../../src'

type OpFields = {
  in_pool: boolean
  op_exec_status: boolean | null
  is_operation_final: boolean | null
}

/* A PublicAPI whose node answers get_operations with the given operation fields */
function apiWithOperation(op: OpFields | undefined): PublicAPI {
  const api = new PublicAPI('http://localhost')
  api.connector = {
    get_operations: jest
      .fn()
      .mockResolvedValue(op ? [{ id: 'O1', ...op }] : []),
  } as unknown as PublicAPI['connector']
  return api
}

describe('PublicAPI.getOperationStatus', () => {
  it.each`
    case                                          | in_pool  | op_exec_status | is_operation_final | expected
    ${'not executed yet, in pool'}                | ${true}  | ${null}        | ${null}            | ${OperationStatus.NotFound}
    ${'not executed, not in pool'}                | ${false} | ${null}        | ${null}            | ${OperationStatus.NotFound}
    ${'speculative success, kept in pool (5.1+)'} | ${true}  | ${true}        | ${false}           | ${OperationStatus.SpeculativeSuccess}
    ${'speculative error, kept in pool (5.1+)'}   | ${true}  | ${false}       | ${false}           | ${OperationStatus.SpeculativeError}
    ${'speculative success, out of pool (<5.1)'}  | ${false} | ${true}        | ${false}           | ${OperationStatus.SpeculativeSuccess}
    ${'speculative error, out of pool (<5.1)'}    | ${false} | ${false}       | ${false}           | ${OperationStatus.SpeculativeError}
    ${'final success'}                            | ${false} | ${true}        | ${true}            | ${OperationStatus.Success}
    ${'final error'}                              | ${false} | ${false}       | ${true}            | ${OperationStatus.Error}
    ${'final success, not yet evicted from pool'} | ${true}  | ${true}        | ${true}            | ${OperationStatus.Success}
  `(
    'returns $expected when $case',
    async ({ in_pool, op_exec_status, is_operation_final, expected }) => {
      const api = apiWithOperation({
        in_pool,
        op_exec_status,
        is_operation_final,
      })
      expect(await api.getOperationStatus('O1')).toBe(expected)
    }
  )

  it('returns NotFound when the node does not know the operation', async () => {
    const api = apiWithOperation(undefined)
    expect(await api.getOperationStatus('O1')).toBe(OperationStatus.NotFound)
  })
})
