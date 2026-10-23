const DEFAULT_RETRIES = 3
const DEFAULT_DELAY = 300

export const DEFAULT_RETRY_OPTS = {
  retries: DEFAULT_RETRIES,
  delay: DEFAULT_DELAY,
}

/**
 * Wrapped rpc call with retry strategy.
 *
 * Each call gets the whole retry budget: `opt` is shared by every request of a
 * client and is never modified.
 *
 * @param fn - The call to make.
 * @param opt - The number of retries and the delay between two attempts.
 * @returns The result of the first successful attempt.
 * @throws The error of the last attempt.
 */
export function withRetry<T>(
  fn: () => Promise<T>,
  opt: { retries: number; delay: number }
): Promise<T> {
  return new Promise((resolve, reject) => {
    let retriesLeft = opt.retries
    function attempt(): void {
      fn()
        .then(resolve)
        .catch((error) => {
          if (retriesLeft <= 0) {
            reject(error)
          } else {
            retriesLeft--
            setTimeout(attempt, opt.delay)
          }
        })
    }
    attempt()
  })
}
