export class Timeout {
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

export const wait = async (timeMilli: number): Promise<void> => {
  return new Promise<void>((resolve, reject) => {
    const timeout = new Timeout(timeMilli, () => {
      timeout.clear();
      return resolve();
    });
  });
};

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
