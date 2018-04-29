import { DateTime } from "./datetime";

export class Work {
    private start: DateTime;
    private end: DateTime;
    constructor(start: DateTime, end: DateTime) {
        this.start = start;
        this.end = end;
    }

    getStart(): DateTime {
        return this.start;
    }

    getEnd(): DateTime {
        return this.end;
    }
}