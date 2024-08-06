import { ZERO } from '../utils'

const DEFAULT_RETRIES = 3
const DEFAULT_DELAY = 300

export const DEFAULT_RETRY_OPTS = {
  retries: DEFAULT_RETRIES,
  delay: DEFAULT_DELAY,
}

// Wrapped rpc call with retry strategy
export function withRetry<T>(
  fn: () => Promise<T>,
  opt: { retries: number; delay: number }
): Promise<T> {
  return new Promise((resolve, reject) => {
    function attempt(): void {
      fn()
        .then(resolve)
        .catch((error) => {
          if (opt.retries === ZERO) {
            reject(error)
          } else {
            opt.retries--
            setTimeout(attempt, opt.delay)
          }
        })
    }
    attempt()
  })
}
