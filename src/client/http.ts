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
      const response = await withRetry(() => {
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
        return fetch(url, init)
      }, opts.retry!)

      const data = await response.json()

      if (!response.ok || !!data.error) {
        throw new Error(data.error?.message)
      }
      return data.result
    },
  }
}
