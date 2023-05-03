/**
 * A class representing a timeout that triggers a callback function after a specified time interval
 */
export class Timeout {
  /**
   * Constructs a new Timeout instance with the given timeout duration and callback function.
   *
   * @param timeoutMil - The timeout duration in milliseconds.
   * @param callback - The function to be called when the timeout is triggered.
   */
  constructor(timeoutMil: number, callback: () => void) {
    this.clear = this.clear.bind(this);

    const that = this;
    this.isCleared = false;
    this.isCalled = false;
    this.timeoutHook = setTimeout(() => {
      if (!that.isCleared) {
        this.isCalled = true;
        callback();
      }
    }, timeoutMil);
  }
  private isCleared: boolean;
  private isCalled: boolean;
  private timeoutHook: NodeJS.Timer;

  public clear(): void {
    if (!this.isCleared) {
      clearTimeout(this.timeoutHook);
      this.isCleared = true;
    }
  }
}

/**
 * A class representing an interval
 */
export class Interval {
  constructor(timeoutMil: number, callback: () => void) {
    this.clear = this.clear.bind(this);

    const that = this;
    this.isCleared = false;
    this.isCalled = false;
    this.intervalHook = setInterval(() => {
      if (!that.isCleared) {
        this.isCalled = true;
        callback();
      }
    }, timeoutMil);
  }
  private isCleared: boolean;
  private isCalled: boolean;
  private intervalHook: NodeJS.Timer;

  public clear(): void {
    if (!this.isCleared) {
      clearInterval(this.intervalHook);
      this.isCleared = true;
    }
  }
}

/**
 * This function returns a promise that resolves after the specified time interval.
 *
 * @param timeMilli - The time interval in milliseconds.
 * @return A promise that resolves after the specified time interval.
 */
export const wait = async (timeMilli: number): Promise<void> => {
  return new Promise<void>((resolve, reject) => {
    const timeout = new Timeout(timeMilli, () => {
      timeout.clear();
      return resolve();
    });
  });
};

/**
 * This function returns a promise that resolves after the specified time interval and throws
 * if the promise passed as an argument does not resolve before the specified time interval.
 *
 * @throws An error if the promise passed as an argument does not resolve before the specified time interval.
 *
 * @param promise - The promise to be resolved.
 * @param timeoutMs - The time interval in milliseconds.
 * @return A promise that resolves after the specified time interval.
 */
export async function withTimeoutRejection<T>(
  promise: Promise<T>,
  timeoutMs: number,
): Promise<T> {
  const sleep = new Promise((resolve, reject) =>
    setTimeout(
      () =>
        reject(
          new Error(
            `Timeout of ${timeoutMs} has passed and promise did not resolve`,
          ),
        ),
      timeoutMs,
    ),
  );
  return Promise.race([promise, sleep]) as Promise<T>;
}
