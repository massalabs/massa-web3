import { IEventFilter } from './IEventFilter';

/**
 * Allows you to filter events by their name using regular expressions.
 *
 * @see eventsNameRegex of type `string` represents the regular expression to match the event name.
 */
export interface IEventRegexFilter extends IEventFilter {
  eventsNameRegex: null | string;
}
