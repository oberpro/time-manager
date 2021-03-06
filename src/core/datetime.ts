import { Duration } from "./duration";

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

        this.hour = hour == null ? d.getHours() : hour;
        this.minute = minute == null ? d.getMinutes() : minute;
        this.second = second == null ? d.getSeconds() : second;
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

    static getDaysOfYear(year: number): number {
        return DateTime.isLeapYear(year) ? 366 : 365;
    }

    static isLeapYear(year: number): boolean {
        return year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0);
    }

    /*
    Adds the amount of years to the current year
    @example this.year=2018. years=1 Result: this.year=2019
    @return returns the new year
    @param years >= 1
    */
    addYears(years: number) {
        this.year += years;
        return this.year;
    }

    /*
    Adds the amount of months to the current month.
    if @param incrementYears is set to true (default: true),
    the amount of years will be incremented.
    @param months >= 1
    */
    addMonths(months: number, incrementYears?: boolean) {
        if (incrementYears === true || incrementYears == null) {
            this.year += Math.floor((this.month - 1 + months) / 12);
        }
        this.month = (((this.month - 1) + months) % 12) + 1;
        return this.month;
    }

    /*
    @param days >= 1
    */
    addDays(days: number, incrementMonths?: boolean, incrementYears?: boolean) {
        let allDays = this.day + days;
        while (allDays > this.getAmountOfDays()) {
            allDays -= this.getAmountOfDays();
            if (incrementMonths === true || incrementMonths == null) {
                this.addMonths(1, incrementYears);
            }
        }
        this.day = allDays;
        return this.day;
    }

    /*
    @param years >= 1
    */
    removeYears(years: number) {
        this.year -= years;
        return this.year;
    }

    public static copyDate(date: DateTime): DateTime {
        let t = new DateTime();
        t.setYear(date.getYear());
        t.setMonth(date.getMonth());
        t.setDay(date.getDay());
        t.setTime(0, 0, 0);
        return t;
    }

    public static copyTime(time: DateTime): DateTime {
        let t = new DateTime();
        t.setHours(time.getHours());
        t.setMinutes(time.getMinutes());
        t.setSeconds(time.getSeconds());
        return t;
    }

    public static copy(date: DateTime): DateTime {
        let t = new DateTime();
        t.setYear(date.getYear());
        t.setMonth(date.getMonth());
        t.setDay(date.getDay());
        t.setTime(date.getHours(), date.getMinutes(), date.getSeconds());
        return t;
    }

    /*
    @param months >= 1
    */
    removeMonths(months: number, decrementYears?: boolean) {
        let m = this.month - (months + 1);
        if (m < 0) {
            this.month = (m % 12) + 13;
            let years = Math.ceil(Math.abs(m / 12));
            if (years > 0 && decrementYears === true || decrementYears == null) {
                this.removeYears(years);
            }
        } else {
            this.month = this.month - months;
        }
        return this.month;
    }

    /*
    @param days >= 1
    */
    removeDays(days: number, decrementMonths?: boolean, decrementYears?: boolean) {
        let allDays = this.day - days;
        while (allDays < 1) {
            if (decrementMonths === true || decrementMonths == null) {
                this.removeMonths(1, decrementYears);
            }
            allDays += this.getAmountOfDays();
        }
        this.day = allDays;
        return this.day;
    }

    /*
    @param hours >= 1
    @param incrementDays set to true if allowed (default: false)
    @param incrementMonths set to true if allowed (default: false)
    @param incrementYears set to true if allowed (default: false)
    */
    addHours(hours: number, incrementDays?: boolean, incrementMonths?: boolean, incrementYears?: boolean) {
        if (incrementDays === true) {
            let days = Math.floor((this.hour + hours) / 24);
            if (days > 0) {
                this.addDays(days, incrementMonths == null ? false : incrementMonths, incrementYears == null ? false : incrementYears);
            }
        }
        this.hour = (this.hour + hours) % 24;
        return this.hour;
    }
    /*
    @param hours >= 1
    @param decrementDays set to true if allowed (default: false)
    @param decrementMonths set to true if allowed (default: false)
    @param decrementYears set to true if allowed (default: false)
    */
    removeHours(hours: number, decrementDays?: boolean, decrementMonths?: boolean, decrementYears?: boolean) {
        if (decrementDays === true && this.hour - hours < 0) {
            let days = Math.abs(Math.floor((this.hour - hours) / 24));
            if (days > 0) {
                this.removeDays(days, decrementMonths == null ? false : decrementMonths, decrementYears == null ? false : decrementYears);
            }
        }
        this.hour = (this.hour - hours) % 24;
        if (this.hour < 0) {
            this.hour += 24;
        }
        return this.hour;
    }

    /*
    @param minutes >= 1
    @param incrementHours set to true if allowed (default: true)
    @param incrementDays set to true if allowed (default: false)
    @param incrementMonths set to true if allowed (default: false)
    @param incrementYears set to true if allowed (default: false)
    */
    addMinutes(minutes: number, incrementHours?: boolean, incrementDays?: boolean, incrementMonths?: boolean, incrementYears?: boolean) {
        if (this.minute + minutes >= 60 && (incrementHours === true || incrementHours == null)) {
            this.addHours(Math.floor((this.minute + minutes) / 60), incrementDays, incrementMonths, incrementYears);
        }
        this.minute = (this.minute + minutes) % 60;
        return this.minute;
    }

    /*
    @param minutes >= 1
    @param decrementHours set to true if allowed (default: true)
    @param decrementDays set to true if allowed (default: false)
    @param decrementMonths set to true if allowed (default: false)
    @param decrementYears set to true if allowed (default: false)
    */
    removeMinutes(minutes: number, decrementHours?: boolean, decrementDays?: boolean, decrementMonth?: boolean, decrementYears?: boolean) {
        if (this.minute - minutes < 0 && (decrementHours === true || decrementHours == null)) {
            let hours = Math.abs(Math.floor((this.minute - minutes) / 60));
            if (hours > 0) {
                this.removeHours(hours, decrementDays, decrementMonth, decrementYears);
            }
        }
        this.minute = (this.minute - minutes) % 60;
        if (this.minute < 0) {
            this.minute += 60;
        }
        return this.minute;
    }

    /*
    @param seconds >= 1
    @param incrementMinutes set to true if allowed (default:true)
    @param incrementHours set to true if allowed (default: true)
    @param incrementDays set to true if allowed (default: false)
    @param incrementMonths set to true if allowed (default: false)
    @param incrementYears set to true if allowed (default: false)
    */
    addSeconds(seconds: number, incrementMinutes?: boolean, incrementHours?: boolean, incrementDays?: boolean, incrementMonths?: boolean, incrementYears?: boolean) {
        if (this.second + seconds >= 60 && (incrementMinutes === true || incrementMinutes == null)) {
            this.addMinutes(Math.floor((this.second + seconds) / 60), incrementHours, incrementDays, incrementMonths, incrementYears);
        }
        this.second = (this.second + seconds) % 60;
        return this.second;
    }

    /*
    @param seconds >= 1
    @param decrement set to true if allowed (default: true)
    @param decrementHours set to true if allowed (default: true)
    @param decrementDays set to true if allowed (default: false)
    @param decrementMonths set to true if allowed (default: false)
    @param decrementYears set to true if allowed (default: false)
    */
    removeSeconds(seconds: number, decrementMinutes?: boolean, decrementHours?: boolean, decrementDays?: boolean, decrementMonths?: boolean, decrementYears?: boolean) {
        if (this.second - seconds < 0 && (decrementMinutes === true || decrementMinutes == null)) {
            let minutes = Math.abs(Math.floor((this.second - seconds) / 60));
            if (minutes > 0) {
                this.removeMinutes(minutes, decrementHours, decrementDays, decrementMonths, decrementYears);
            }
        }
        this.second = (this.second - seconds) % 60;
        if (this.second < 0) {
            this.second += 60;
        }
        return this.second;
    }

    /*
    @param time the time of the datetime object is used
    @param incrementDays set to true if allowed (default: false)
    @param incrementMonths set to true if allowed (default: false)
    @param incrementYears set to true if allowed (default: false)
    */
    addTime(time: DateTime, incrementDays?: boolean, incrementMonths?: boolean, incrementYears?: boolean) {
        this.addSeconds(time.getSeconds(), true, true, incrementDays, incrementMonths, incrementYears);
        this.addMinutes(time.getMinutes(), true, incrementDays, incrementMonths, incrementYears);
        this.addHours(time.getHours(), incrementDays, incrementMonths, incrementYears);
        return this;
    }

    /*
    @param time the time of the datetime object is used
    @param decrementDays set to true if allowed (default: false)
    @param decrementMonths set to true if allowed (default: false)
    @param decrementYears set to true if allowed (default: false)
    */
    removeTime(time: DateTime, decrementDays?: boolean, decrementMonths?: boolean, decrementYears?: boolean) {
        this.removeSeconds(time.getSeconds(), true, true, decrementDays, decrementMonths, decrementYears);
        this.removeMinutes(time.getMinutes(), true, decrementDays, decrementMonths, decrementYears);
        this.removeHours(time.getHours(), decrementDays, decrementMonths, decrementYears);
        return this;
    }

    /*
    @param date the date of the datetime object is used
    @param incrementMonths set to true if allowed (default: true)
    @param incrementYears set to true if allowed (default: true)
    */
    addDate(date: DateTime, incremenMonths?: boolean, incrementYears?: boolean) {
        this.addDays(date.getDay(), incremenMonths, incrementYears);
        this.addMonths(date.getMonth(), incrementYears);
        this.addYears(date.getYear());
        return this;
    }

    /*
    @param date the date of the datetime object is used
    @param decrementMonths set to true if allowed (default: true)
    @param decrementYears set to true if allowed (default: true)
    */
    removeDate(date: DateTime, decrementMonths?: boolean, decrementYears?: boolean) {
        this.removeDays(date.getDay(), decrementMonths, decrementYears);
        this.removeMonths(date.getMonth(), decrementYears);
        this.removeYears(date.getYear());
        return this;
    }


    /*
    @return -1 if other DateTime is greater -> 1.1.2017 and 1.1.2018 = -1 because 2018 is greater than 2017
    @return 1 if the other DateTime is smaller
    @return 0 if the Date and Time are equals
    */
    compare(dateTime: DateTime): number {
        let d = this.compareDate(dateTime);
        if (d === 0) {
            return this.compareTime(dateTime);
        }
        return d;
    }

    /*
    @param time the date of the DateTime class will be used
    @param ignoreDays if set to true, only month and year is checked. (default: false) 
    */
    compareDate(date: DateTime, ignoreDays?: boolean): number {
        // 2018 > 2017
        if (this.year > date.getYear()) {
            return 1;
        }
        // 2017 < 2018
        if (this.year < date.getYear()) {
            return -1;
        }
        //2018 == 2018 -> years are equal
        if (this.year === date.getYear()) {
            // februar > januar (2 > 1)
            if (this.month > date.getMonth()) {
                return 1;
            }
            //januar < februar (1 < 2)
            if (this.month < date.getMonth()) {
                return -1;
            }
            //januar == januar
            if (this.month === date.getMonth()) {
                if (ignoreDays === true) {
                    return 0;
                } else {
                    // 17. > 12.
                    if (this.day > date.getDay()) {
                        return 1;
                    }
                    // 12. < 17.
                    if (this.day < date.getDay()) {
                        return -1;
                    }
                }
            }
        }
        return 0;
    }

    /*
    @param time the time of the DateTime class will be used
    @param ignoreSeconds if set to true, only hours and minutes are checked. (default: false) 
    */
    compareTime(time: DateTime, ignoreSeconds?: boolean): number {
        //17 > 12
        if (this.hour > time.getHours()) {
            return 1;
        }
        // 12 < 17
        if (this.hour < time.getHours()) {
            return -1;
        }
        // 17 == 17
        if (this.hour === time.getHours()) {
            if (this.minute > time.getMinutes()) {
                return 1;
            }
            if (this.minute < time.getMinutes()) {
                return -1;
            }
            if (this.minute === time.getMinutes()) {
                if (ignoreSeconds === true) {
                    return 0;
                } else {
                    if (this.second > time.getSeconds()) {
                        return 1;
                    }
                    if (this.second < time.getSeconds()) {
                        return -1;
                    }
                }
            }
        }
        return 0;
    }

    equals(dateTime: DateTime): boolean {
        return this.equalsDate(dateTime) && this.equalsTime(dateTime);
    }

    equalsDate(date: DateTime, ignoreDays?: boolean): boolean {
        return this.compareDate(date, ignoreDays) === 0;
    }

    equalsTime(time: DateTime, ignoreSeconds?: boolean): boolean {
        return this.compareTime(time, ignoreSeconds) === 0;
    }

    getDaysBetween(other: DateTime): number {
        let days = 0;
        for (let y = this.year; y <= other.getYear(); y++) {
            let ms = y == this.year ? this.month : 1;
            let md = y == other.getYear() ? other.getMonth() : 12;
            for (let m = ms; m <= md; m++) {
                if ((m == ms && y == this.year)) {

                    let v = DateTime.getAmountOfDaysForMonth(y, m) - this.day;
                    if (m == md) {
                        v = this.day;
                    }
                    days += v;
                } else if ((m == md && y == other.getYear())) {
                    let v = other.getDay();
                    days += v;
                } else {
                    let v = DateTime.getAmountOfDaysForMonth(y, m);
                    days += v;
                }
            }
        }
        return days;
    }

    getDuration(other: DateTime): Duration {
        if (this.equalsDate(other)) {
            //Date is the same, only calculate with time
            let tmp = DateTime.copy(other);
            tmp.removeTime(this);
            return new Duration(tmp.getHours(), tmp.getMinutes());
        } else {
            //calculate days
            let tmp = DateTime.copy(other);
            let days = this.getDaysBetween(other);
            tmp.removeTime(this);
            return new Duration(tmp.getHours() + (days * 24), tmp.getMinutes());
        }
    }
}