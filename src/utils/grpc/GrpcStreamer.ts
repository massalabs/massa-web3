import * as AsyncLock from 'async-lock';
import { EventEmitter } from 'events';
import { wait } from '../time';
import * as uuid from 'uuid';
import { IGrpcStream } from '../../interfaces/IGrpcStream';

const EVENTS = {
  DATA: 'onData',
  ON_RESET_STARTED: 'onResetStarted',
  ON_RESET_SUCCESS: 'onResetSuccess',
  ON_RESET_ERROR: 'onResetError',
  ON_STREAM_CLOSED: 'onStreamClosed',
  ON_STATUS_UPDATED: 'onStatusUpdated',
  ON_STREAM_ERROR: 'onStreamError',
};

const MANDATORY_EVENTS = [
  EVENTS.DATA,
  EVENTS.ON_RESET_ERROR,
  EVENTS.ON_STREAM_ERROR,
];

export default abstract class GrpcStreamer<RespType> {
  constructor(name: string) {
    this.name = name;
    this.isRunning = false;
    this.resetInProgress = false;
    this.resetLock = new AsyncLock();
    // This is just a safety measure, considering the blackbox nature of the async lock, just to be future safe
    this.uniqueId = uuid();
    this.eventEmitter = new EventEmitter();

    this.start = this.start.bind(this);
    this.resetStream = this.resetStream.bind(this);
    this.onStreamError = this.onStreamError.bind(this);
    this.onResetStarted = this.onResetStarted.bind(this);
    this.onResetSuccess = this.onResetSuccess.bind(this);
    this.onStreamClosed = this.onStreamClosed.bind(this);
    this.onResetError = this.onResetError.bind(this);
    this.onStatusUpdated = this.onStatusUpdated.bind(this);
    this.handleStreamError = this.handleStreamError.bind(this);
    this.handleResetStarted = this.handleResetStarted.bind(this);
    this.handleResetSuccess = this.handleResetSuccess.bind(this);
    this.handleStreamClosed = this.handleStreamClosed.bind(this);
    this.handleResetError = this.handleResetError.bind(this);
    this.handleStatusUpdated = this.handleStatusUpdated.bind(this);
    this.getStream = this.getStream.bind(this);
    this.stop = this.stop.bind(this);
  }

  protected name: string;
  private eventEmitter: EventEmitter;
  private bindedEvents: Set<string> = new Set<string>();
  private uniqueId: string;
  protected isRunning: boolean;
  protected resetInProgress: boolean;
  private resetLock: AsyncLock = new AsyncLock();
  protected stream: IGrpcStream | null;

  private handleData(data: RespType): void {
    this.eventEmitter.emit(EVENTS.DATA, data);
  }

  private handleResetStarted(): void {
    this.eventEmitter.emit(EVENTS.ON_RESET_STARTED);
  }

  private handleResetSuccess(): void {
    this.eventEmitter.emit(EVENTS.ON_RESET_SUCCESS);
  }

  private handleStatusUpdated(status: any): void {
    this.eventEmitter.emit(EVENTS.ON_STATUS_UPDATED, status);
  }

  private handleResetError(
    ex: Error,
    additionalInfo?: string,
    currentAttempt?: number,
  ): void {
    this.eventEmitter.emit(
      EVENTS.ON_RESET_ERROR,
      ex,
      additionalInfo,
      currentAttempt,
    );
  }

  private handleStreamError(ex: Error): void {
    this.eventEmitter.emit(EVENTS.ON_STREAM_ERROR, ex);

    if (!this.isRunning) return;

    wait(200).then(() => this.resetStream());
  }

  public onData(handler: (data: RespType) => void): GrpcStreamer<RespType> {
    this.eventEmitter.on(EVENTS.DATA, handler);
    this.bindedEvents.add(EVENTS.DATA);
    return this;
  }

  public onResetStarted(handler: () => void): GrpcStreamer<RespType> {
    this.eventEmitter.on(EVENTS.ON_RESET_STARTED, handler);
    this.bindedEvents.add(EVENTS.ON_RESET_STARTED);
    return this;
  }

  public onResetSuccess(handler: () => void): GrpcStreamer<RespType> {
    this.eventEmitter.on(EVENTS.ON_RESET_SUCCESS, handler);
    this.bindedEvents.add(EVENTS.ON_RESET_SUCCESS);
    return this;
  }

  public onStatusUpdated(
    handler: (status: any) => void,
  ): GrpcStreamer<RespType> {
    this.eventEmitter.on(EVENTS.ON_STATUS_UPDATED, handler);
    this.bindedEvents.add(EVENTS.ON_STATUS_UPDATED);
    return this;
  }

  public onResetError(
    handler: (
      ex: Error,
      additionalInfo?: string,
      currentAttempt?: number,
    ) => void,
  ): GrpcStreamer<RespType> {
    this.eventEmitter.on(EVENTS.ON_RESET_ERROR, handler);
    this.bindedEvents.add(EVENTS.ON_RESET_ERROR);
    return this;
  }

  public onStreamError(handler: (ex: Error) => void): GrpcStreamer<RespType> {
    this.eventEmitter.on(EVENTS.ON_STREAM_ERROR, handler);
    this.bindedEvents.add(EVENTS.ON_STREAM_ERROR);
    return this;
  }

  public onStreamClosed(handler: () => void): GrpcStreamer<RespType> {
    this.eventEmitter.on(EVENTS.ON_STREAM_CLOSED, handler);
    this.bindedEvents.add(EVENTS.ON_STREAM_CLOSED);
    return this;
  }

  public async start(): Promise<void> {
    if (this.isRunning) return;

    for (const event of MANDATORY_EVENTS) {
      if (!this.bindedEvents.has(event))
        throw new Error(`Event ${event} must be binded to before starting.`);
    }

    await this.resetStream();

    this.isRunning = true;
  }

  protected async resetStream(): Promise<void> {
    // Leveraging the js's single threaded nature
    if (this.resetInProgress) {
      return;
    }

    this.resetInProgress = true;

    await this.resetLock.acquire('s' + this.uniqueId, async () => {
      try {
        if (this.stream) await this.stream.cancel();
      } catch (ex) {
        this.handleResetError(
          ex,
          'Tried to cancel the stream before resetting, but it failed with an error. It might be ok as the stream might be dead already.',
        );
      }

      let retryCounter = 0;
      while (true) {
        try {
          this.handleResetStarted();

          this.stream = await this.getStream();

          this.stream.on('data', (data) => {
            if (!data)
              this.handleStreamError(
                new Error('Received null value for the stream.'),
              );
            else if (data.toObject) this.handleData(data.toObject());
            else this.handleData(data);
          });

          this.stream.on('error', this.handleStreamError);

          this.stream.on('end', (e: Error) => {
            this.handleStreamClosed(e);
          });

          this.stream.on('status', this.handleStatusUpdated);

          this.handleResetSuccess();

          break;
        } catch (ex) {
          this.handleResetError(
            ex,
            'Resetting the stream after cancelling or unexpectedly closing got intrrupted with error.',
            ++retryCounter,
          );
          await wait(200);
        }
      }

      this.resetInProgress = false;
    });
  }

  protected handleStreamClosed(ex?: Error): void {
    this.eventEmitter.emit(EVENTS.ON_STREAM_CLOSED);
    if (ex) this.eventEmitter.emit(EVENTS.ON_STREAM_ERROR, ex);

    if (!this.isRunning) return;

    wait(200).then(() => this.resetStream());
  }

  protected abstract getStream(): Promise<IGrpcStream>;

  public async stop(): Promise<void> {
    this.isRunning = false;

    if (this.stream) {
      this.stream.cancel();
      this.stream = null;
    }
  }
}
