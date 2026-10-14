import { GrpcPublicProvider } from '../../src/provider/grpcProvider/grpcPublicProvider'
import { PublicServiceClient } from '../../src/generated/grpc/PublicServiceClientPb'
import { ExecuteReadOnlyCallRequest } from '../../src/generated/grpc/public_pb'
import { Mas } from '../../src'

/* A provider whose node answers every read-only call with an empty output */
function providerCapturingReadOnlyCalls(): {
  provider: GrpcPublicProvider
  executeReadOnlyCall: jest.Mock
} {
  const executeReadOnlyCall = jest.fn().mockResolvedValue({
    getOutput: () => ({
      getCallResult_asU8: () => new Uint8Array(),
      getUsedGas: () => 0,
      getOut: () => undefined,
    }),
  })
  const provider = new GrpcPublicProvider(
    { executeReadOnlyCall } as unknown as PublicServiceClient,
    'http://localhost'
  )
  return { provider, executeReadOnlyCall }
}

function sentFunctionCall(executeReadOnlyCall: jest.Mock) {
  const request: ExecuteReadOnlyCallRequest =
    executeReadOnlyCall.mock.calls[0][0]
  return request.getCall()!.getFunctionCall()!
}

describe('GrpcPublicProvider.readSC', () => {
  const params = {
    target: 'AS12k8viVmqPtRuXzCm6rKXjLgpQWqbuMjc37YHhB452KSUUb9FgL',
    func: 'sendCoins',
    fee: Mas.fromString('0.01'),
  }

  it('sends the coins with the function call', async () => {
    const { provider, executeReadOnlyCall } = providerCapturingReadOnlyCalls()

    await provider.readSC({ ...params, coins: Mas.fromString('1.5') })

    const coins = sentFunctionCall(executeReadOnlyCall).getCoins()
    expect(coins?.getMantissa()).toBe(1_500_000_000)
    expect(coins?.getScale()).toBe(Mas.NB_DECIMALS)
  })

  it('sends no coins when none are given', async () => {
    const { provider, executeReadOnlyCall } = providerCapturingReadOnlyCalls()

    await provider.readSC(params)

    expect(sentFunctionCall(executeReadOnlyCall).hasCoins()).toBe(false)
  })
})
