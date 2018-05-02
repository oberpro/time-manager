import { DateTime } from "./datetime";
import { Duration } from "./duration";

export class Work {
    private startTime: DateTime = null;
    private endTime: DateTime = null;
    private salaryPerHour: number;

    constructor(start?: DateTime) {
        this.startTime = start || null;
    }

    start() {
        this.startTime = new DateTime();
    }

    stop() {
        this.endTime = new DateTime();
    }

    getDuration(): Duration {
        return null;
    }

    isStopped(): boolean {
        return this.endTime != null;
    }

    getStartTime(): DateTime {
        return this.startTime;
    }

    getEndTime(): DateTime {
        return this.endTime;
    }
}