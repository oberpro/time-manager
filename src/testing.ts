export class Testing {

    private static runs: number = 0;
    private static successcnt: number = 0;
    public static init() {
        Testing.runs = 0;
        Testing.successcnt = 0;
    }

    private static success() {
        Testing.runs += 1;
        Testing.successcnt += 1;
    }

    private static failue() {
        Testing.runs += 1;
    }

    public static logResult() {
        let v = (Testing.successcnt / Testing.runs) * 100;
        console.log(Testing.successcnt + " of " + Testing.runs + " runs Successfull (" + v.toFixed(2) + "%)");
    }

    public static assertTrue(value: boolean) {
        if (!value) {
            Testing.failue();
            console.log("[FAILED] " + Testing.getErrorCaller());
        } else {
            Testing.success();
            console.info("[SUCCESS] " + Testing.getErrorCaller());
        }
    }

    public static assertEquals(a: any, b: any) {
        if (a !== b) {
            Testing.failue();
            console.log("[FAILED] " + Testing.getErrorCaller());
        } else {
            Testing.success();
            console.info("[SUCCESS] " + Testing.getErrorCaller());
        }
    }

    public static getErrorCaller() {
        var e = new Error();
        var stack = e.stack.toString().split(/\r\n|\n/);
        if (stack.length < 3) {
            return "NULL";
        }
        var line = stack[3];
        return line;
    }
}