import { Testing } from "./testing";
import { Duration } from "./core/duration";

// TESTS HERE
class DurationClassTest {

    constructor() {
        //LIST ALL TEST CASES HERE
        this.addHoursTest_1();
    }

    addHoursTest_1() {
        let d = new Duration(1, 30);// 1 hour, 30 mins
        d.addHours(2);
        Testing.assertEquals(d.getHours(), 3);
        Testing.assertEquals(d.getMinutes(), 30);
        Testing.assertEquals(d.getDecimalMinutes(), 0.5);
    }
}

new DurationClassTest();