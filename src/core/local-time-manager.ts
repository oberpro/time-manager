import { DataStorage } from "./data-storage";
import { TimeEntry } from "./time-entry";
import { DateTime } from "./datetime";

/*
(c) 2018 Kevin Kirch
*/
export class LocalTimeManager extends DataStorage {

    getTimeEntrys(): Promise<TimeEntry[]> {
        throw new Error("Method not implemented.");
    }
    getTimeEntry(id: string): Promise<TimeEntry> {
        throw new Error("Method not implemented.");
    }
    addTimeEntry(entry: TimeEntry): Promise<string> {
        throw new Error("Method not implemented.");
    }
    removeTimeEntry(id: string): Promise<{}> {
        throw new Error("Method not implemented.");
    }
    findTimeEntrysForDate(dt: DateTime): Promise<TimeEntry[]> {
        throw new Error("Method not implemented.");
    }
}