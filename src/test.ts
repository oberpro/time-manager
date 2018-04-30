import { Testing } from "./testing";
import { Duration } from "./core/duration";

// TESTS HERE
class DurationClassTest {

    constructor() {
        Testing.init();
        //LIST ALL TEST CASES HERE
        this.durationTest();
        Testing.logResult();
    }

    durationTest() {
        //Duration.ts Test
        this.addHoursTest_1();
        this.addMinutesTest_1();
        this.addDurationTest_1();
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

    addDurationTest_1() {
        let a = new Duration(1, 11);
        let b = new Duration(10, 70);
        a.addDuration(b);
        Testing.assertEquals(a.getHours(), 12);
        Testing.assertEquals(a.getMinutes(), 21);

    }
}

new DurationClassTest();