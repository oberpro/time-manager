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

    getAmountOfDaysOfMonth() {
        let d = new Date(this.year, this.month, 0);
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
            this.year += Math.floor((this.month + months) / 12);
        }
        this.month = (this.month + months) % 12;
    }

    addDays(days: number, incrementMonths?: boolean, incrementYears?: boolean) {
        let dif = 0
        do {
            dif = Math.floor((this.day + days) / this.getAmountOfDaysOfMonth());
            this.day = (this.day + days) % this.getAmountOfDaysOfMonth();
            if ((incrementMonths == true || incrementMonths == null) && dif > 0) {
                this.addMonths(1, incrementYears);
            }
        } while (dif > 0);
    }


}