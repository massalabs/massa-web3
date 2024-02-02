export function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/**
 * A class representing a timeout that triggers a callback function after a specified time interval.
 */
export class Timeout {
  /**
   * Constructs a new Timeout instance with the given timeout duration and callback function.
   *
   * @param timeoutMil - The timeout duration in milliseconds.
   * @param callback - The function to be called when the timeout is triggered.
   */
  constructor(timeoutMil: number, callback: () => void) {
    this.clear = this.clear.bind(this)

    const that = this
    this.isCleared = false
    this.isCalled = false
    this.timeoutHook = setTimeout(() => {
      if (!that.isCleared) {
        this.isCalled = true
        callback()
      }
    }, timeoutMil)
  }
  private isCleared: boolean
  private isCalled: boolean
  private timeoutHook: ReturnType<typeof setTimeout>

  /**
   * Clears the timeout so that the callback function is not called.
   */
  public clear(): void {
    if (!this.isCleared) {
      clearTimeout(this.timeoutHook)
      this.isCleared = true
    }
  }
}

/**
 * A class representing an interval that triggers a callback function repeatedly
 * at a specified time interval.
 */
export class Interval {
  /**
   * Constructs a new Interval instance with the given interval duration and callback function.
   *
   * @param timeoutMil - The interval duration in milliseconds.
   * @param callback - The function to be called when the interval is triggered.
   */
  constructor(timeoutMil: number, callback: () => void) {
    this.clear = this.clear.bind(this)

    const that = this
    this.isCleared = false
    this.isCalled = false
    this.intervalHook = setInterval(() => {
      if (!that.isCleared) {
        this.isCalled = true
        callback()
      }
    }, timeoutMil)
  }
  private isCleared: boolean
  private isCalled: boolean
  private intervalHook: NodeJS.Timeout

  /**
   * Clears the interval so that the callback function is not called anymore.
   */
  public clear(): void {
    if (!this.isCleared) {
      clearInterval(this.intervalHook)
      this.isCleared = true
    }
  }
}

/**
 * Returns a promise that resolves after the specified time interval and throws an error if the
 * specified promise does not resolve before the timeout interval.
 *
 * @param promise - The promise to be resolved.
 * @param timeoutMs - The time interval in milliseconds.
 *
 * @throws if the specified promise does not resolve before the timeout interval.
 *
 * @returns A promise that resolves after the specified time interval.
 */
export async function withTimeoutRejection<T>(
  promise: Promise<T>,
  timeoutMs: number
): Promise<T> {
  const sleep = new Promise((resolve, reject) =>
    setTimeout(
      () =>
        reject(
          new Error(
            `Timeout of ${timeoutMs} has passed and promise did not resolve`
          )
        ),
      timeoutMs
    )
  )
  return Promise.race([promise, sleep]) as Promise<T>
}
