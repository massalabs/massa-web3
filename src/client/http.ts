/* eslint-disable  @typescript-eslint/naming-convention, @typescript-eslint/no-non-null-assertion*/

import { DEFAULT_RETRY_OPTS, withRetry } from './retry'
import { ClientOptions } from './types'

export type HttpRpcClient = {
  request<HttpRequestParameters, HttpRequestResult>(
    endpoint: string,
    params: HttpRequestParameters
  ): Promise<HttpRequestResult>
}

const headers = {
  'Content-Type': 'application/json',
}

function createIdStore(): { current: number; take(): number; reset(): void } {
  return {
    current: 0,
    take(): number {
      return this.current++
    },
    reset(): void {
      this.current = 0
    },
  }
}

const idCache = createIdStore()

// HTTP statuses of an overloaded node or of a failing gateway in front of it
const HTTP_TOO_MANY_REQUESTS = 429
const HTTP_BAD_GATEWAY = 502
const HTTP_SERVICE_UNAVAILABLE = 503
const HTTP_GATEWAY_TIMEOUT = 504
const RETRYABLE_HTTP_STATUSES = [
  HTTP_TOO_MANY_REQUESTS,
  HTTP_BAD_GATEWAY,
  HTTP_SERVICE_UNAVAILABLE,
  HTTP_GATEWAY_TIMEOUT,
]

class RetryableResponseError extends Error {
  constructor(public response: Response) {
    super(`HTTP ${response.status} ${response.statusText}`)
  }
}

export function getHttpRpcClient(
  url: string,
  opts: Partial<ClientOptions> = {}
): HttpRpcClient {
  if (!opts.retry) {
    opts.retry = DEFAULT_RETRY_OPTS
  }
  return {
    async request<HttpRequestParameters, HttpRequestResult>(
      endpoint: string,
      params: HttpRequestParameters
    ): Promise<HttpRequestResult> {
      const response = await withRetry(async () => {
        const init: RequestInit = {
          body: JSON.stringify({
            jsonrpc: '2.0',
            method: endpoint,
            params: [params],
            id: idCache.take(),
          }),
          headers,
          method: 'POST',
        }
        const response = await fetch(url, init)
        if (RETRYABLE_HTTP_STATUSES.includes(response.status)) {
          throw new RetryableResponseError(response)
        }
        return response
      }, opts.retry!).catch((error) => {
        // Out of retries: report the HTTP status rather than failing to parse
        // the error page of the gateway as JSON
        if (error instanceof RetryableResponseError) {
          throw new Error(`${endpoint} failed: ${error.message}`)
        }
        throw error
      })

      const data = await response.json()

      if (!response.ok || !!data.error) {
        throw new Error(data.error?.message)
      }
      return data.result
    },
  }
}
