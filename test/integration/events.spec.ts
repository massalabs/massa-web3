import { EventFilter, EventPoller } from '../../src'
import { MRC20 } from '../../src/contracts-wrappers'
import { OutputEvents } from '../../src/generated/client-types'
import { provider } from './setup'
import waitForExpect from 'wait-for-expect'

const USDC = 'AS12k8viVmqPtRuXzCm6rKXjLgpQWqbuMjc37YHhB452KSUUb9FgL'

let usdcContract: MRC20

describe('SC Event tests', () => {
  beforeAll(async () => {
    usdcContract = new MRC20(provider, USDC)
  })

  test('poll transfer event from caller and contract addr', async () => {
    const amount = 1_000n
    const currentSlot = await provider.client.getCurrentSlot()
    const operation = await usdcContract.transfer(
      'AU1wN8rn4SkwYSTDF3dHFY4U28KtsqKL1NnEjDZhHnHEy6cEQm53',
      amount
    )
    await operation.waitSpeculativeExecution()

    let events: OutputEvents = []

    const filter = {
      smartContractAddress: USDC,
      callerAddress: provider.address,
      start: currentSlot,
    }

    const { stopPolling } = EventPoller.start(provider, filter, (data) => {
      events = data
    })

    await waitForExpect(() => {
      expect(events.length).toEqual(1)
      expect(events[0].data).toEqual('TRANSFER SUCCESS')
    })
    stopPolling()
  })

  test('poll transfer event from operationId', async () => {
    const amount = 1_000n
    const { lastSlot: currentSlot } = await provider.getNodeStatus()

    const operation = await usdcContract.transfer(
      'AU1wN8rn4SkwYSTDF3dHFY4U28KtsqKL1NnEjDZhHnHEy6cEQm53',
      amount
    )
    await operation.waitSpeculativeExecution()

    let events: OutputEvents = []

    const filter: EventFilter = {
      operationId: operation.id,
      start: currentSlot,
    }

    const { stopPolling } = EventPoller.start(provider, filter, (data) => {
      events = data
    })

    await waitForExpect(() => {
      expect(events.length).toEqual(1)
      expect(events[0].data).toEqual('TRANSFER SUCCESS')
    })
    stopPolling()
  })

  test('poll transfer event without start slot', async () => {
    const amount = 1_000n

    const operation = await usdcContract.transfer(
      'AU1wN8rn4SkwYSTDF3dHFY4U28KtsqKL1NnEjDZhHnHEy6cEQm53',
      amount
    )
    await operation.waitSpeculativeExecution()

    let events: OutputEvents = []

    const filter: EventFilter = {
      operationId: operation.id,
    }

    const { stopPolling } = EventPoller.start(provider, filter, (data) => {
      events = data
    })

    await waitForExpect(() => {
      expect(events.length).toEqual(1)
      expect(events[0].data).toEqual('TRANSFER SUCCESS')
    })
    stopPolling()
  })
})
