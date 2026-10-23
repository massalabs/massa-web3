import { getHttpRpcClient } from '../../src/client/http'
import { DEFAULT_RETRY_OPTS, withRetry } from '../../src/client/retry'

const retry = { retries: 2, delay: 1 }
const networkError = (): Error => new TypeError('fetch failed')
const jsonResponse = (result: unknown): Response =>
  new Response(JSON.stringify({ jsonrpc: '2.0', id: 0, result }), {
    status: 200,
  })
const gatewayError = (status: number): Response =>
  new Response('<html><h1>Service Temporarily Unavailable</h1></html>', {
    status,
    statusText: 'Service Temporarily Unavailable',
  })

describe('withRetry', () => {
  test('retries until the call succeeds', async () => {
    const fn = jest
      .fn()
      .mockRejectedValueOnce(networkError())
      .mockResolvedValue('ok')

    expect(await withRetry(fn, retry)).toBe('ok')
    expect(fn).toHaveBeenCalledTimes(2)
  })

  test('throws the last error once out of retries', async () => {
    const fn = jest.fn().mockRejectedValue(networkError())

    await expect(withRetry(fn, retry)).rejects.toThrow('fetch failed')
    expect(fn).toHaveBeenCalledTimes(3)
  })

  test('gives each call the whole retry budget', async () => {
    const opts = { ...retry }
    const failing = jest.fn().mockRejectedValue(networkError())
    await expect(withRetry(failing, opts)).rejects.toThrow()

    // A later call is still retried
    const flaky = jest
      .fn()
      .mockRejectedValueOnce(networkError())
      .mockResolvedValue('ok')
    expect(await withRetry(flaky, opts)).toBe('ok')
    expect(opts).toEqual(retry)
  })
})

describe('HTTP RPC client', () => {
  const fetchMock = jest.fn()
  const originalFetch = global.fetch

  beforeEach(() => {
    fetchMock.mockReset()
    global.fetch = fetchMock
  })
  afterAll(() => {
    global.fetch = originalFetch
  })

  test('keeps retrying after other requests failed', async () => {
    const client = getHttpRpcClient('http://node')
    fetchMock.mockRejectedValue(networkError())
    for (let i = 0; i < 3; i++) {
      await expect(client.request('get_status', [])).rejects.toThrow()
    }

    fetchMock.mockReset()
    fetchMock
      .mockRejectedValueOnce(networkError())
      .mockResolvedValue(jsonResponse('ok'))
    expect(await client.request('get_status', [])).toBe('ok')
    expect(DEFAULT_RETRY_OPTS.retries).toBe(3)
  })

  test.each([429, 502, 503, 504])(
    'retries a %d response of an overloaded node',
    async (status) => {
      fetchMock
        .mockResolvedValueOnce(gatewayError(status))
        .mockResolvedValue(jsonResponse('ok'))
      const client = getHttpRpcClient('http://node', { retry })

      expect(await client.request('get_status', [])).toBe('ok')
      expect(fetchMock).toHaveBeenCalledTimes(2)
    }
  )

  test('reports the HTTP status once out of retries', async () => {
    fetchMock.mockImplementation(async () => gatewayError(503))
    const client = getHttpRpcClient('http://node', { retry })

    await expect(client.request('get_status', [])).rejects.toThrow(
      'get_status failed: HTTP 503 Service Temporarily Unavailable'
    )
    expect(fetchMock).toHaveBeenCalledTimes(3)
  })
})
