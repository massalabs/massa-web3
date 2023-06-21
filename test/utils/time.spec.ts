import {
  Timeout,
  Interval,
  wait,
  withTimeoutRejection,
} from '../../src/utils/time';

describe('Timer utilities', () => {
  jest.useFakeTimers();

  beforeAll(() => {
    const consoleSpy = jest.spyOn(console, 'error');
    consoleSpy.mockImplementation(() => null);
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  describe('Timeout class', () => {
    it('should call the callback after the specified timeout', () => {
      const callback = jest.fn();
      new Timeout(1000, callback);

      expect(callback).not.toBeCalled();
      jest.advanceTimersByTime(1000);
      expect(callback).toBeCalled();
    });

    it('should not call the callback if clear is called before the timeout', () => {
      const callback = jest.fn();
      const timeout = new Timeout(1000, callback);
      jest.advanceTimersByTime(500);
      timeout.clear();

      expect(callback).not.toBeCalled();
    });
  });

  describe('Interval class', () => {
    it('should call the callback every interval', () => {
      const callback = jest.fn();
      new Interval(1000, callback);

      jest.advanceTimersByTime(3000);
      expect(callback).toBeCalledTimes(3);
    });

    it('should stop calling the callback if clear is called', () => {
      const callback = jest.fn();
      const interval = new Interval(1000, callback);
      interval.clear();

      jest.advanceTimersByTime(3000);
      expect(callback).not.toBeCalled();
    });
  });

  describe('wait function', () => {
    it('should resolve after the specified time', async () => {
      const promise = wait(1000);
      jest.advanceTimersByTime(1000);

      await expect(promise).resolves.toBeUndefined();
    });
  });

  describe('withTimeoutRejection function', () => {
    it('should resolve with the value of the promise if it resolves before the timeout', async () => {
      const promise = Promise.resolve('success');
      const result = withTimeoutRejection(promise, 1000);
      jest.advanceTimersByTime(500);

      await expect(result).resolves.toBe('success');
    });

    it('should reject if the promise does not resolve before the timeout', async () => {
      const promise = new Promise((resolve) =>
        setTimeout(resolve, 2000, 'success'),
      );
      const result = withTimeoutRejection(promise, 1000);
      jest.advanceTimersByTime(1000);

      await expect(result).rejects.toThrow(
        `Timeout of 1000 has passed and promise did not resolve`,
      );
    });
  });

  afterEach(() => {
    jest.clearAllTimers();
  });
});
