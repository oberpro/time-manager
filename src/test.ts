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
        this.addDateTest_2();
        this.removeDateTest_2();
        //time
        this.addTimeTest_1();
        this.removeTimeTest_1();
        this.addTimeTest_2();
        this.removeTimeTest_2();
        this.addTimeTest_3();
        this.removeTimeTest_3();
        this.addTimeTest_4();
        this.removeTimeTest_4();

        this.equalityAndCompareDateTimeTest_1();
        this.equalityAndCompareDateTimeTest_2();
        this.equalityAndCompareDateTimeTest_3();

        this.durationTest_DateTime_1();
        this.durationTest_DateTime_2();

        this.daysBetweeTest_1();
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

    addTimeTest_2() {
        let d = new DateTime(2018, 4, 3, 17, 12, 1);//3.4.2018 17:12:01
        d.addMinutes(12);
        Testing.assertEquals(d.getMinutes(), 24);
        Testing.assertEquals(d.getHours(), 17);
        d.addMinutes(72, false);
        Testing.assertEquals(d.getMinutes(), 36);
        Testing.assertEquals(d.getHours(), 17);
        d.setTime(17, 11, 2);//17:11:02
        d.addMinutes(55);
        Testing.assertEquals(d.getMinutes(), 6);
        Testing.assertEquals(d.getHours(), 18);
        d.set(2018, 4, 3, 17, 11, 2);//3.4.2018 17:11:02
        d.addMinutes(555, true, true, true, true);
        Testing.assertEquals(d.getMinutes(), 26);
        Testing.assertEquals(d.getHours(), 2);
        Testing.assertEquals(d.getDay(), 4);
    }

    removeTimeTest_2() {
        let d = new DateTime(2018, 4, 3, 17, 12, 1);//3.4.2018 17:12:01
        d.removeMinutes(10);
        Testing.assertEquals(d.getMinutes(), 2);
        d.removeMinutes(12);
        Testing.assertEquals(d.getMinutes(), 50);
        Testing.assertEquals(d.getHours(), 16);
        d.setTime(4, 11, 2);// 4:11:02
        d.removeMinutes(555, true, true, true, true);
        Testing.assertEquals(d.getMinutes(), 56);
        Testing.assertEquals(d.getHours(), 18);
        Testing.assertEquals(d.getDay(), 2);
    }

    addTimeTest_3() {
        let d = new DateTime(2018, 4, 3, 17, 12, 5);//3.4.2018 17:12:05
        d.addSeconds(25);
        Testing.assertEquals(d.getSeconds(), 30);
        d.addSeconds(90);
        Testing.assertEquals(d.getSeconds(), 0);
        Testing.assertEquals(d.getMinutes(), 14);
        d.addSeconds(6722);
        Testing.assertEquals(d.getSeconds(), 2);
        Testing.assertEquals(d.getMinutes(), 6);
        Testing.assertEquals(d.getHours(), 19);

    }

    removeTimeTest_3() {
        let d = new DateTime(2018, 4, 3, 17, 12, 5);//3.4.2018 17:12:05
        d.removeSeconds(4);
        Testing.assertEquals(d.getSeconds(), 1);
        d.removeSeconds(30);
        Testing.assertEquals(d.getSeconds(), 31);
        Testing.assertEquals(d.getMinutes(), 11);
        d.setTime(11, 11, 11);
        d.removeSeconds(6722);
        Testing.assertEquals(d.getSeconds(), 9);
        Testing.assertEquals(d.getMinutes(), 19);
        Testing.assertEquals(d.getHours(), 9);
    }

    addTimeTest_4() {
        let a = new DateTime(2018, 4, 3, 17, 12, 5);
        let b = new DateTime();
        b.setTime(1, 59, 5);
        a.addTime(b);
        Testing.assertEquals(a.getHours(), 19);
        Testing.assertEquals(a.getMinutes(), 11);
        Testing.assertEquals(a.getSeconds(), 10);
    }

    removeTimeTest_4() {
        let a = new DateTime(2018, 4, 3, 17, 12, 5);
        let b = new DateTime();
        b.setTime(1, 59, 5);
        a.removeTime(b);
        Testing.assertEquals(a.getHours(), 15);
        Testing.assertEquals(a.getMinutes(), 13);
        Testing.assertEquals(a.getSeconds(), 0);
    }

    addDateTest_2() {
        let a = new DateTime(2018, 1, 1);
        let b = new DateTime(1, 5, 12);
        a.addDate(b);
        Testing.assertEquals(a.getYear(), 2019);
        Testing.assertEquals(a.getMonth(), 6);
        Testing.assertEquals(a.getDay(), 13);
    }

    removeDateTest_2() {
        let a = new DateTime(2018, 1, 1);
        let b = new DateTime(1, 5, 12);
        a.removeDate(b, true, true);
        Testing.assertEquals(a.getYear(), 2016);
        Testing.assertEquals(a.getMonth(), 7);
        Testing.assertEquals(a.getDay(), 20);
    }

    equalityAndCompareDateTimeTest_1() {
        let a = new DateTime(2018, 1, 1);
        let b = new DateTime(2018, 1, 2);
        Testing.assertEquals(a.compareDate(b), -1);
        b.setDate(2017, 1, 1);
        Testing.assertEquals(a.compareDate(b), 1);
        b.setDate(2018, 5, 1);
        Testing.assertEquals(a.compareDate(b), -1);
        a.setDate(2018, 4, 5);
        Testing.assertEquals(a.compareDate(b), -1);
        b.setDate(2018, 4, 2);
        Testing.assertEquals(a.compareDate(b), 1);
        b.setDate(2018, 1, 1);
        a.setDate(2018, 1, 1);
        Testing.assertTrue(a.equalsDate(b));
    }

    equalityAndCompareDateTimeTest_2() {
        let a = new DateTime();
        let b = new DateTime();
        a.setTime(17, 30, 0);
        b.setTime(18, 30, 0);
        Testing.assertEquals(a.compareTime(b), -1);
        b.setTime(17, 31, 0);
        Testing.assertEquals(a.compareTime(b), -1);
        b.setTime(17, 29, 5);
        Testing.assertEquals(a.compareTime(b), 1);
        a.setTime(17, 0, 20);
        b.setTime(17, 0, 21);
        Testing.assertEquals(a.compareTime(b), -1);
        Testing.assertTrue(a.equalsTime(b, true));
        b.setTime(17, 0, 20);
        Testing.assertTrue(a.equalsTime(b));
    }

    equalityAndCompareDateTimeTest_3() {
        let a = new DateTime(2018, 1, 1, 17, 30, 1);
        let b = new DateTime(2018, 1, 1, 17, 30, 0);
        Testing.assertEquals(a.compare(b), 1);
        a.setTime(17, 30, 0);
        Testing.assertTrue(a.equals(b));
    }

    durationTest_DateTime_1() {
        let a = new DateTime(2018, 1, 1, 11, 30, 0);//11:30
        let b = new DateTime(2018, 1, 1, 16, 55, 0);//16:55
        let d = a.getDuration(b);// 11:30 to 16:55 -> 5:25 h
        Testing.assertEquals(d.getHours(), 5);
        Testing.assertEquals(d.getMinutes(), 25);
        a.setTime(11, 45, 0);
        b.setTime(14, 3, 0);
        d = a.getDuration(b); // 11:45 to 14:03 -> 2:18
        Testing.assertEquals(d.getHours(), 2);
        Testing.assertEquals(d.getMinutes(), 18);
    }

    daysBetweeTest_1() {
        let a = new DateTime(2018, 1, 1, 11, 30, 0);// 1.1.2018
        let b = new DateTime(2018, 3, 1, 16, 55, 0);// 1.3.2018
        let days = a.getDaysBetween(b);
        Testing.assertEquals(days, 59);

        a = new DateTime(2017, 1, 1, 11, 30, 0);// 1.1.2018
        b = new DateTime(2018, 3, 1, 16, 55, 0);// 1.3.2018
        days = a.getDaysBetween(b);
        Testing.assertEquals(days, 424);
    }

    durationTest_DateTime_2() {
        let a = new DateTime(2018, 1, 1, 11, 30, 0);//11:30
        let b = new DateTime(2018, 1, 2, 16, 55, 0);//16:55
        let d = a.getDuration(b);// 11:30 to 16:55 + 1 day -> 29:25 h
        Testing.assertEquals(d.getHours(), 29);
        Testing.assertEquals(d.getMinutes(), 25);
        b.setDate(2018, 2, 2);//1.2.2018
        d = a.getDuration(b);// 11:30 to 16:55 + 32 days -> 749:25 h
        Testing.assertEquals(d.getHours(), 773);
        Testing.assertEquals(d.getMinutes(), 25);

        a = new DateTime(2017, 1, 1, 11, 30, 0);// 1.1.2018
        b = new DateTime(2018, 3, 1, 16, 55, 0);// 1.3.2018
        d = a.getDuration(b);// 11:30 - 16:55 + 424 days -> 10181:25;
        Testing.assertEquals(d.getHours(), 10181);
        Testing.assertEquals(d.getMinutes(), 25);
    }
}

new MainClassTest();