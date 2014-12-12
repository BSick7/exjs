QUnit.module("misc");

test("round", () => {
    strictEqual(exjs.round(10.4566666678), 10);
    strictEqual(exjs.round(10.4566666678, 0), 10);
    strictEqual(exjs.round(10.4566666678, 1), 10.5);
    strictEqual(exjs.round(10.4566666678, 2), 10.46);
    strictEqual(exjs.round(10.4566666678, 3), 10.457);
});