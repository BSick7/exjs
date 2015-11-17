QUnit.module("anonymous");

QUnit.test("iterate", () => {
    var test = exjs.anonymous<number>((en) => {
        if (en.current == null)
            en.current = -1;
        en.current++;
        return en.current < 5;
    });
    strictEqual(test.count(), 5);
    strictEqual(test.sum(), 10);
});