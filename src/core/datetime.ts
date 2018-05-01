export class DateTime {
    private year: number;
    private month: number;
    private day: number;

    private hour: number;
    private minute: number;
    private second: number;

    /*
    @param year Year as an Integer value eg. 2018
    @param month Month as an Integer Value between 1 and 12 
    @param day Day as an Integer Value between 1 and 31
    @param hour Hour as an Integer Value between 0 and 23
    @param minute Minute as an Integer Value between 0 and 59
    @param second Second as an Integer Value between 0 and 59
    */
    constructor(year?: number, month?: number, day?: number, hour?: number, minute?: number, second?: number) {
        let d = new Date();
        this.year = year || d.getFullYear();
        this.month = month || d.getMonth() + 1;
        this.day = day || d.getDate();

        this.hour = hour || d.getHours();
        this.minute = minute || d.getMinutes();
        this.second = second || d.getSeconds();
    }

    set(year: number, month: number, day: number, hour: number, minute: number, second: number) {
        this.setDate(year, month, day);
        this.setTime(hour, minute, second);
    }

    /*
    Sets the date
    @param month the month between 1 and 12
    @param day the day between 1 and 31
        If the Amount of days is bigger than allowed or 0, the value is set to the max
    */
    setDate(year: number, month: number, day: number) {
        this.setYear(year);
        this.setMonth(month);
        this.setDay(day);
    }

    setYear(year: number) {
        this.year = year;
    }

    setMonth(month: number) {
        this.month = month % 12;
    }


    setDay(day: number) {
        let max = this.getAmountOfDays();
        if (day == 0) {
            this.day = max;
        } else {
            this.day = Math.min(day, max);
        }
    }

    setTime(hours: number, minutes: number, seconds: number) {
        this.setHours(hours);
        this.setMinutes(minutes);
        this.setSeconds(seconds);
    }

    setHours(hours: number) {
        this.hour = hours % 24;
    }

    setMinutes(minutes: number) {
        this.minute = minutes % 60;
    }

    setSeconds(seconds: number) {
        this.second = seconds % 60;
    }

    getYear() {
        return this.year;
    }

    getMonth() {
        return this.month;
    }

    getDay() {
        return this.day;
    }

    getHours() {
        return this.hour;
    }

    getMinutes() {
        return this.minute;
    }

    getSeconds() {
        return this.second;
    }

    /*
    Sets the time to 00:00:00
    */
    resetTime() {
        this.hour = 0;
        this.minute = 0;
        this.second = 0;
    }

    /*
    Sets the time to the current time.
    */
    setCurrentTime() {
        let d = new Date();
        this.hour = d.getHours();
        this.minute = d.getMinutes();
        this.second = d.getSeconds();
    }

    /**
     Sets the date to the current date
     */
    setCurrentDate() {
        let d = new Date();
        this.year = d.getFullYear();
        this.month = d.getMonth() + 1;
        this.day = d.getDate();
    }

    getAmountOfDays() {
        let d = new Date(this.year, this.month, 0);
        return d.getDate();
    }


    getRemainingAmountOfDays() {
        return this.getAmountOfDays() - this.day;
    }

    static getAmountOfDaysForMonth(year: number, month: number): number {
        let d = new Date(year, month, 0);
        return d.getDate();
    }

    /*
    Adds the amount of years to the current year
    @example this.year=2018. years=1 Result: this.year=2019
    @return returns the new year
    */
    addYears(years: number) {
        this.year += years;
        return this.year;
    }

    /*
    Adds the amount of months to the current month.
    if @param incrementYears is set to true (default: true),
    the amount of years will be incremented.
    */
    addMonths(months: number, incrementYears?: boolean) {
        if (incrementYears == true || incrementYears == null) {
            this.year += Math.floor((this.month - 1 + months) / 12);
        }
        this.month = (((this.month - 1) + months) % 12) + 1;
        return this.month;
    }

    addDays(days: number, incrementMonths?: boolean, incrementYears?: boolean) {
        let allDays = this.day + days;
        while (allDays > this.getAmountOfDays()) {
            allDays -= this.getAmountOfDays();
            if (incrementMonths == true || incrementMonths == null) {
                this.addMonths(1, incrementYears);
            }
        }
        this.day = allDays;
        return this.day;
    }

    removeYears(years: number) {
        this.year -= years;
        return this.year;
    }

    removeMonths(months: number, decrementYears?: boolean) {
        let m = this.month - (months + 1);
        if (m < 0) {
            this.month = (m % 12) + 13;
            let years = Math.ceil(Math.abs(m / 12));
            if (years > 0 && decrementYears == true || decrementYears == null) {
                this.removeYears(years);
            }
        }
        return this.month;
    }

    removeDays(days: number, decrementMonths?: boolean, decrementYears?: boolean) {
        let allDays = this.day - days;
        while (allDays < 1) {
            if (decrementMonths == true || decrementMonths == null) {
                this.removeMonths(1, decrementYears);
            }
            allDays += this.getAmountOfDays();
        }
        this.day = allDays;
        return this.day;
    }


}