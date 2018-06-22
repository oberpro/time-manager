import { DateTime } from "./datetime";

export class Duration {

    constructor(private hours: number, private minutes: number) {

    }

    setHours(hours: number) {
        this.hours = hours;
    }

    setMinutes(minutes: number) {
        this.minutes = minutes % 60;
    }

    set(hours: number, minutes: number) {
        this.setHours(hours);
        this.setMinutes(minutes);
    }

    addHours(h: number) {
        this.hours += h;
    }

    addMinutes(m: number) {
        this.hours += Math.floor((this.minutes + m) / 60);
        this.minutes = (this.minutes + m) % 60;
    }

    addDuration(d: Duration) {
        this.addHours(d.getHours());
        this.addMinutes(d.getMinutes());
    }

    removeMinutes(m: number) {
        if (this.minutes - m < 0) {
            this.hours -= Math.ceil((Math.abs(this.minutes - m)) / 60);
        }
        this.minutes = ((this.minutes - m) % 60);
        if (this.minutes < 0) {
            this.minutes += 60;
        }
    }

    removeHours(h: number) {
        this.hours -= h;
    }

    removeDuration(d: Duration) {
        this.removeHours(d.getHours());
        this.removeMinutes(d.getMinutes());
    }

    getMinutes(): number {
        return this.minutes;
    }

    getDecimalMinutes(): number {
        return this.minutes / 60;
    }

    getHours(): number {
        return this.hours;
    }

    toString(): string {
        return this.hours + ':' + this.minutes;
    }

    // Advanced Functionality
    calculateEndDateBasedOnStartDate(startDate: DateTime): DateTime {
        let end = DateTime.copy(startDate);
        end.addHours(this.getHours(), true, true, true);
        end.addMinutes(this.getMinutes(), true, true, true, true);
        return end;
    }
}