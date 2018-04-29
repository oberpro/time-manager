export class Duration {

    constructor(private hours: number, private minutes: number) {

    }

    addHours(h: number) {
        this.hours += h;
    }

    addMinutes(m: number) {
        this.hours += Math.ceil(m / 60);
        this.minutes += m % 60;
    }

    addDuration(d: Duration) {
        this.addHours(d.getHours());
        this.addMinutes(d.getMinutes());
    }

    removeMinutes(m: number) {
        this.hours -= Math.ceil(m / 60);
        this.minutes -= m % 60;
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
}