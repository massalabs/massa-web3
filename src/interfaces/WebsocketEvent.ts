/**
 * Enum for representing websocket events
 */
export enum WebsocketEvent {
	/**
     * Connection opened
     */
    ON_OPEN = "open",
	/**
     * Connection closed
     */
    ON_CLOSED = "closed",
	/**
     * Socket is connecting
     */
    ON_CONNECTING = "connecting",
	/**
     * Socket is closing
     */
    ON_CLOSING = "closing",
	/**
     * Socket received a message
     */
    ON_MESSAGE = "message",
	/**
     * Error on socket
     */
    ON_ERROR = "error",
	/**
     * Socket ping
     */
    ON_PING = "ping",
}