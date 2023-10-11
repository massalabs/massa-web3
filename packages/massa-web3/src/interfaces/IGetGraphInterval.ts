/**
 * Interface for the getGraphInterval function
 *
 * @see start of type `number` represents the start of the time interval (Unix Timestamp in milliseconds).
 * @see end of type `number` represents the end of the time interval (Unix Timestamp in milliseconds).
 */
export interface IGetGraphInterval {
  start: number; // Unix Timestamp (milliseconds)
  end: number; // Unix Timestamp (milliseconds)
}
