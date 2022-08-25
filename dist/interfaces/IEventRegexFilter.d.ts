import { IEventFilter } from "./IEventFilter";
export interface IEventRegexFilter extends IEventFilter {
    eventsNameRegex: null | string;
}
