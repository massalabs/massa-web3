/* eslint-disable @typescript-eslint/no-var-requires */
import { IClientConfig } from '../interfaces/IClientConfig';
import { EventEmitter } from 'events';
import { WebsocketEvent } from '../interfaces/WebsocketEvent';
const NodeWebSocket = require('ws');
import { WebSocket as INodeWebSocket } from 'ws';
import { IProvider, ProviderType } from '../interfaces/IProvider';
let IINodeWebSocket: typeof INodeWebSocket;

export const WS_PING_TIMEOUT_MS = 30000;

/**
 * Convert an array buffer to a base64 string
 *
 * @param array  - The array buffer to convert
 * @return a base64 string
 */
export const arrayBufferToBase64 = (
  array: Buffer | ArrayBuffer | Buffer[],
): string => {
  return array.toString('utf-8');
};

declare global {
  /**
   * The window WebSocket interface provides the API for creating and managing a WebSocket connection to a node
   */
  interface Window {
    WebSocket: typeof WebSocket;
    MozWebSocket: typeof MozWebSocket;
  }
}

/**
 * The Mozilla WebSocket interface provides the API for creating and managing a WebSocket connection to a node
 */
declare var MozWebSocket: {
  prototype: WebSocket;
  new (url: string): WebSocket;
  new (url: string, prototcol: string): WebSocket;
  new (url: string, prototcol: string[]): WebSocket;
  /**
   * Returns a string that indicates how binary data from the WebSocket object is exposed to scripts:
   *
   * Can be set, to change how binary data is returned. The default is "blob".
   */
  binaryType: BinaryType;
  /**
   * Returns the number of bytes of application data (UTF-8 text and binary data) that have been queued using send() but not yet been transmitted to the network.
   *
   * If the WebSocket connection is closed, this attribute's value will only increase with each call to the send() method. (The number does not reset to zero once the connection closes.)
   */
  readonly bufferedAmount: number;
  /** Returns the extensions selected by the server, if any. */
  readonly extensions: string;
  onclose: ((this: WebSocket, ev: CloseEvent) => any) | null;
  onerror: ((this: WebSocket, ev: Event) => any) | null;
  onmessage: ((this: WebSocket, ev: MessageEvent) => any) | null;
  onopen: ((this: WebSocket, ev: Event) => any) | null;
  /** Returns the subprotocol selected by the server, if any. It can be used in conjunction with the array form of the constructor's second argument to perform subprotocol negotiation. */
  readonly protocol: string;
  /** Returns the state of the WebSocket object's connection. It can have the values described below. */
  readonly readyState: number;
  /** Returns the URL that was used to establish the WebSocket connection. */
  readonly url: string;
  /** Closes the WebSocket connection, optionally using code as the the WebSocket connection close code and reason as the the WebSocket connection close reason. */
  close(code?: number, reason?: string): void;
  /** Transmits data using the WebSocket connection. data can be a string, a Blob, an ArrayBuffer, or an ArrayBufferView. */
  send(data: string | ArrayBufferLike | Blob | ArrayBufferView): void;
  readonly OPEN: number;
  readonly CLOSING: number;
  readonly CONNECTING: number;
  readonly CLOSED: number;
  addEventListener<K extends keyof WebSocketEventMap>(
    type: K,
    listener: (this: WebSocket, ev: WebSocketEventMap[K]) => any,
    options?: boolean | AddEventListenerOptions,
  ): void;
  addEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | AddEventListenerOptions,
  ): void;
  removeEventListener<K extends keyof WebSocketEventMap>(
    type: K,
    listener: (this: WebSocket, ev: WebSocketEventMap[K]) => any,
    options?: boolean | EventListenerOptions,
  ): void;
  removeEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | EventListenerOptions,
  ): void;
};

/**
 * Check if the current environment is a browser and if so, pick the right WebSocket interface
 * @return - A boolean indicating if the current environment is a browser
 */
export const checkForBrowserWs = (): {
  isBrowser: boolean;
  Ws: typeof WebSocket | typeof MozWebSocket;
} => {
  let Ws: typeof WebSocket | typeof MozWebSocket | null | undefined = null;
  if (typeof WebSocket !== 'undefined') {
    Ws = WebSocket;
  } else if (typeof MozWebSocket !== 'undefined') {
    Ws = MozWebSocket;
  } else if (typeof global !== 'undefined') {
    Ws = global.WebSocket || global.MozWebSocket;
  } else if (typeof window !== 'undefined') {
    Ws = window.WebSocket || window.MozWebSocket;
  } else if (typeof self !== 'undefined') {
    Ws = self.WebSocket || self.MozWebSocket;
  }
  return {
    isBrowser: Ws !== null && Ws !== undefined,
    Ws,
  };
};

/**
 * Base Ws Client for interacting with the massa network
 */
export abstract class WsBaseClient extends EventEmitter {
  protected clientConfig: IClientConfig;
  protected wss:
    | typeof WebSocket
    | typeof MozWebSocket
    | typeof NodeWebSocket
    | typeof IINodeWebSocket
    | null
    | undefined = null;
  protected isConnected = false;
  protected isBrowserWs = false;
  private pingTimeout: NodeJS.Timer;

  /**
   * Constructor for the {@link WsBaseClient} class
   *
   * @param clientConfig - The client configuration object
   */
  public constructor(clientConfig: IClientConfig) {
    super();
    this.clientConfig = clientConfig;
    if (
      !clientConfig.providers.find(
        (provider) => provider.type === ProviderType.WS,
      )
    ) {
      throw new Error('No ws provider provided');
    }
    this.clientConfig.pingTimeoutMs =
      this.clientConfig.pingTimeoutMs | WS_PING_TIMEOUT_MS;

    this.connect = this.connect.bind(this);
    this.closeConnection = this.closeConnection.bind(this);
    this.connectNodeWs = this.connectNodeWs.bind(this);
    this.connectBrowserWs = this.connectBrowserWs.bind(this);
    this.checkNextHeartbeat = this.checkNextHeartbeat.bind(this);
    this.getReadyState = this.getReadyState.bind(this);
    this.getBinaryType = this.getBinaryType.bind(this);
    this.getUrl = this.getUrl.bind(this);
    this.getProtocol = this.getProtocol.bind(this);
    this.getExtensions = this.getExtensions.bind(this);
    this.getBufferedAmount = this.getBufferedAmount.bind(this);
    this.setProviders = this.setProviders.bind(this);
    this.getWsProviders = this.getWsProviders.bind(this);
  }

  /**
   * Set new providers
   *
   * @param providers - The new providers
   */
  public setProviders(providers: Array<IProvider>): void {
    this.clientConfig.providers = providers;
  }

  /**
   * Get all ws providers
   *
   * @return - The ws providers as an {@link IProvider} array
   */
  protected getWsProviders(): Array<IProvider> {
    return this.clientConfig.providers.filter(
      (provider) => provider.type === ProviderType.WS,
    );
  }

  /**
   * Parses a message received from the websocket connection
   */
  protected abstract parseWsMessage(
    message: string | Buffer | ArrayBuffer | Buffer[],
  ): void;

  /**
   * Opens a websocket connection
   *
   * @return A promise that resolves when the connection is opened
   */
  public async connect(): Promise<void> {
    if (this.wss || this.isConnected) {
      return;
    }
    const browserWs = checkForBrowserWs();
    const provider: IProvider = this.clientConfig.providers.find(
      (provider) => provider.type === ProviderType.WS,
    );
    this.wss = browserWs.isBrowser
      ? new browserWs.Ws(provider.url)
      : new NodeWebSocket(provider.url, {
          perMessageDeflate: false,
        });
    this.isBrowserWs = browserWs.isBrowser;
    return browserWs.isBrowser ? this.connectBrowserWs() : this.connectNodeWs();
  }

  /**
   * Get the ready state of the websocket connection
   *
   * @return - The ready state of the websocket (number) or null if not connected
   */
  public getReadyState(): number | null {
    if (this.wss && this.isConnected) {
      return this.wss.readyState;
    }
    return null;
  }

  /**
   * Get the binary type of the websocket connection
   *
   * @return The binary type of the websocket (string) or null if not connected
   */
  public getBinaryType(): string | null {
    if (this.wss && this.isConnected) {
      return this.wss.binaryType;
    }
    return null;
  }

  /**
   * Get the url of the websocket connection
   *
   * @return The url of the websocket (string) or null if not connected
   */
  public getUrl(): string | null {
    if (this.wss && this.isConnected) {
      return this.wss.url;
    }
    return null;
  }

  /**
   * Get the protocol of the websocket connection
   *
   * @return The protocol of the websocket (string) or null if not connected
   */
  public getProtocol(): string | null {
    if (this.wss && this.isConnected) {
      return this.wss.protocol;
    }
    return null;
  }

  /**
   * Get the extensions of the websocket connection
   *
   * @return The extensions of the websocket (object) or null if not connected
   */
  public getExtensions(): object | null {
    if (this.wss && this.isConnected) {
      return this.wss.extensions;
    }
    return null;
  }

  /**
   * Get the buffered amount of the websocket connection
   *
   * @return The buffered amount of the websocket (number) or null if not connected
   */
  public getBufferedAmount(): number | null {
    if (this.wss && this.isConnected) {
      return this.wss.bufferedAmount;
    }
    return null;
  }

  /**
   * Closes the websocket connection
   *
   * @return True if the connection was closed, false if not
   */
  public closeConnection(): boolean {
    // check for undrained connection
    if (this.wss && this.isConnected && this.wss.bufferedAmount === 0) {
      this.wss.close();
      return true;
    }
    return false;
  }

  /**
   * Opens a websocket connection
   *
   * @return A promise that resolves when the connection is opened
   */
  private connectNodeWs(): Promise<void> {
    this.wss.on(WebsocketEvent.ON_CLOSED, () => {
      this.isConnected = false;
      this.emit(WebsocketEvent.ON_CLOSED);
    });

    this.wss.on(WebsocketEvent.ON_CONNECTING, () => {
      this.emit(WebsocketEvent.ON_CONNECTING);
    });

    this.wss.on(WebsocketEvent.ON_CLOSING, () => {
      this.emit(WebsocketEvent.ON_CLOSING);
    });

    this.wss.on(WebsocketEvent.ON_PING, () => {
      this.emit(WebsocketEvent.ON_PING);
      this.checkNextHeartbeat();
    });

    this.wss.on(WebsocketEvent.ON_MESSAGE, (data) => {
      this.parseWsMessage(data);
    });

    return new Promise<void>((resolve, reject) => {
      this.wss.on(WebsocketEvent.ON_OPEN, () => {
        this.isConnected = true;
        this.emit(WebsocketEvent.ON_OPEN);
        return resolve();
      });
    });
  }

  /**
   * Opens a websocket connection in the browser
   *
   * @returns A promise that resolves when the connection is opened
   */
  private connectBrowserWs(): Promise<void> {
    const wss = this.wss as WebSocket | typeof MozWebSocket;
    wss.onclose = () => {
      this.isConnected = false;
      this.emit(WebsocketEvent.ON_CLOSED);
    };

    wss.onerror = (errorMessage) => {
      this.isConnected = false;
      this.emit(WebsocketEvent.ON_ERROR, errorMessage.toString());
    };

    wss.onmessage = (data) => {
      this.parseWsMessage(data.data);
    };

    return new Promise<void>((resolve, reject) => {
      wss.onopen = () => {
        this.isConnected = true;
        this.emit(WebsocketEvent.ON_OPEN);
        return resolve();
      };
    });
  }

  /**
   * Checks the next heartbeat
   */
  private checkNextHeartbeat() {
    clearTimeout(this.pingTimeout);

    // We Use `WebSocket#terminate()`, which immediately destroys the connection,
    // Delay should be equal to the interval at which your server
    // sends out pings plus a conservative assumption of the latency.
    // Here we don't need to check for bufferedAmounts the connection is obviously stale
    this.pingTimeout = setTimeout(() => {
      this.wss.terminate();
    }, 30000 + this.clientConfig.pingTimeoutMs);
  }
}
