export class Testing {

    public static assertTrue(value: boolean) {
        if (!value) {
            throw ("[FAILED] " + Testing.getErrorCaller());
        } else {
            console.info("[SUCCESS] " + Testing.getErrorCaller());
        }
    }

    public static assertEquals(a: any, b: any) {
        if (a !== b) {
            throw ("[FAILED] " + Testing.getErrorCaller());
        } else {
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