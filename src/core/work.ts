import { DateTime } from "./datetime";
import { Duration } from "./duration";

export class Work {
    private startTime: DateTime = null;
    private endTime: DateTime = null;
    private salaryPerHour: number = 1;

    constructor(start?: DateTime) {
        this.startTime = start || null;
    }

    start() {
        this.startTime = new DateTime();
    }

    stop() {
        this.endTime = new DateTime();
    }

    setStartTime(time: DateTime) {
        if (this.endTime == null || (time && time.compare(this.endTime) === -1)) {
            this.startTime = time;
            return true;
        }
        return false;
    }

    setEndTime(time: DateTime) {
        if (this.startTime != null && this.startTime.compare(time) === -1) {
            this.endTime = time;
            return true;
        }
        return false;
    }

    getDuration(): Duration {
        return this.isStopped() ? this.startTime.getDuration(this.endTime) : this.startTime.getDuration(new DateTime());
    }

    calculateSalary(): number {
        let d = this.getDuration();
        return d.getHours() * this.salaryPerHour + d.getDecimalMinutes() * this.salaryPerHour;
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

    setSalaryPerHour(salary: number) {
        this.salaryPerHour = salary;
    }
}