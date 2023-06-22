import { EventFilter } from './EventFilter';

/**
 * Allows you to filter events by their name using regular expressions.
 *
 * @see eventsNameRegex of type `string` represents the regular expression to match the event name.
 */
export interface EventRegexFilter extends EventFilter {
  eventsNameRegex: null | string;
}
