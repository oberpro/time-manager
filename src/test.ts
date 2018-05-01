import { Testing } from "./testing";
import { Duration } from "./core/duration";
import { DateTime } from "./core/datetime";

// TESTS HERE
class MainClassTest {

    constructor() {
        Testing.init();
        //LIST ALL TEST CASES HERE
        this.durationTest();
        this.dateTimeTests();
        Testing.logResult();
    }

    durationTest() {
        //Duration.ts Test
        this.addHoursTest_1();
        this.addMinutesTest_1();
        this.addDurationTest_1();
        this.removeMinutesTest_1();
    }

    addHoursTest_1() {
        let d = new Duration(1, 30);// 1 hour, 30 mins
        d.addHours(2);
        Testing.assertEquals(d.getHours(), 3);
        Testing.assertEquals(d.getMinutes(), 30);
        Testing.assertEquals(d.getDecimalMinutes(), 0.5);
    }

    addMinutesTest_1() {
        let d = new Duration(0, 10);
        d.addMinutes(5);
        Testing.assertEquals(d.getMinutes(), 15);
        Testing.assertEquals(d.getDecimalMinutes(), 0.25);
    }

    removeMinutesTest_1() {
        let d = new Duration(0, 20);
        d.removeMinutes(10);
        Testing.assertEquals(d.getMinutes(), 10);
        d.set(1, 23);
        d.removeMinutes(24);
        Testing.assertEquals(d.getHours(), 0);
        Testing.assertEquals(d.getMinutes(), 59);
        d.set(5, 10);
        d.removeMinutes(135);
        Testing.assertEquals(d.getHours(), 2);
        Testing.assertEquals(d.getMinutes(), 55);
    }

    addDurationTest_1() {
        let a = new Duration(1, 11);
        let b = new Duration(10, 70);
        a.addDuration(b);
        Testing.assertEquals(a.getHours(), 12);
        Testing.assertEquals(a.getMinutes(), 21);
    }

    dateTimeTests() {
        //DateTime.ts tests
        //date
        this.basicDateTimeTest_1();
        this.addDateTimeTest_1();
        this.removeDateTimeTest_1();
        //time
        this.addTimeTest_1();
        this.removeTimeTest_1();
    }

    basicDateTimeTest_1() {
        let d = new DateTime(2018, 1, 1);//1.1.2018
        Testing.assertEquals(d.getAmountOfDays(), 31);
        d.setDay(0);
        Testing.assertEquals(d.getDay(), 31);
        d.setDay(12);//12.1.2018
        Testing.assertEquals(d.getRemainingAmountOfDays(), 19);
    }

    addDateTimeTest_1() {
        let d = new DateTime(2018, 1, 1);//1.1.2018
        d.addYears(2);
        Testing.assertEquals(d.getYear(), 2020);
        d.addMonths(11);
        Testing.assertEquals(d.getMonth(), 12);
        d.addMonths(1);
        Testing.assertEquals(d.getYear(), 2021);
        Testing.assertEquals(d.getMonth(), 1);
        Testing.assertEquals(d.getDay(), 1);
        d.addDays(20);
        Testing.assertEquals(d.getDay(), 21);
        d.addDays(11);
        Testing.assertEquals(d.getDay(), 1);
        Testing.assertEquals(d.getMonth(), 2);
        d.addDays(27);
        Testing.assertEquals(d.getDay(), 28);
        Testing.assertEquals(d.getMonth(), 2);
        d.addDays(31);//28.2.2021 + 31 days = 31.3.2021
        Testing.assertEquals(d.getDay(), 31);
        Testing.assertEquals(d.getMonth(), 3);
        d.setDate(2018, 1, 1);
        d.addDays(32, false);
        Testing.assertEquals(d.getMonth(), 1);
        Testing.assertEquals(d.getDay(), 2);
    }

    removeDateTimeTest_1() {
        let d = new DateTime(2018, 1, 1);//1.1.2018
        //years
        d.removeYears(1);
        Testing.assertEquals(d.getYear(), 2017);
        //month
        d.removeMonths(5);
        Testing.assertEquals(d.getMonth(), 8);
        Testing.assertEquals(d.getYear(), 2016);
        d.setDate(2017, 1, 1);
        d.removeMonths(20);
        Testing.assertEquals(d.getMonth(), 5);
        Testing.assertEquals(d.getYear(), 2015);
        //days
        d.setDate(2018, 1, 1);//1.1.2018
        d.removeDays(20);// 12.12.2017
        Testing.assertEquals(d.getDay(), 12);
        Testing.assertEquals(d.getMonth(), 12);
        Testing.assertEquals(d.getYear(), 2017);

    }

    addTimeTest_1() {
        let d = new DateTime(2018, 1, 1);//1.1.2018
        d.setTime(12, 11, 1);//12:11:01
        d.addHours(5);
        Testing.assertEquals(d.getHours(), 17);
        d.addHours(7);
        Testing.assertEquals(d.getHours(), 0);
        d.setHours(17);
        d.addHours(8);
        Testing.assertEquals(d.getHours(), 1);
        d.setTime(11, 11, 11);//11:11:11
        d.addHours(20, true, true, true);
        Testing.assertEquals(d.getHours(), 7);
        Testing.assertEquals(d.getDay(), 2);
        d.setDate(2018, 1, 31);
        d.setTime(11, 11, 11);
        d.addHours(20, true, true, true);
        Testing.assertEquals(d.getHours(), 7);
        Testing.assertEquals(d.getDay(), 1);
        Testing.assertEquals(d.getMonth(), 2);
    }

    removeTimeTest_1() {
        let d = new DateTime(2018, 1, 2);//2.1.2018
        d.setTime(11, 11, 11);
        d.removeHours(5);
        Testing.assertEquals(d.getHours(), 6);
        d.set(2018, 1, 2, 11, 11, 11);
        d.removeHours(20, true);
        Testing.assertEquals(d.getHours(), 15);
        Testing.assertEquals(d.getDay(), 1);
        d.set(2018, 1, 5, 11, 11, 11);//5.1.2018 11:11:11
        d.removeHours(135, true, true, true);
        Testing.assertEquals(d.getHours(), 20);
        Testing.assertEquals(d.getDay(), 30);
        Testing.assertEquals(d.getMonth(), 12);
        Testing.assertEquals(d.getYear(), 2017);
    }
}

new MainClassTest();