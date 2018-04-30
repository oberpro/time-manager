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
        this.basicDateTimeTest_1();
        this.addDateTimeTest_1();
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
        d.addDays(31);//28.2.2021 + 32 days = 1.4.2021
        Testing.assertEquals(d.getDay(), 1);
        Testing.assertEquals(d.getMonth(), 4);
    }
}

new MainClassTest();