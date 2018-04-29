import { TimeEntry } from "./time-entry";
import { DateTime } from "./datetime";

export abstract class DataStorage {

    constructor() {

    }

    abstract getTimeEntrys(): Promise<TimeEntry[]>;

    abstract getTimeEntry(id: string): Promise<TimeEntry>;

    abstract addTimeEntry(entry: TimeEntry): Promise<string>;

    abstract removeTimeEntry(id: string): Promise<{}>;

    abstract findTimeEntrysForDate(dt: DateTime): Promise<TimeEntry[]>;

}