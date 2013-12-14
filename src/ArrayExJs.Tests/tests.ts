/// <reference path="scripts/typings/qunit/qunit.d.ts" />
/// <reference path="scripts/typings/arrayex/arrayex.d.ts" />

QUnit.module("arrayexjs");

test("array", () => {
    var arr = [1, 2, 3, 4, 5];
    var arr2 = _(arr).toArray();
    notStrictEqual(arr2, arr);
    strictEqual(arr2.length, 5);
    strictEqual(arr2[0], 1);
    strictEqual(arr2[1], 2);
    strictEqual(arr2[2], 3);
    strictEqual(arr2[3], 4);
    strictEqual(arr2[4], 5);
});

test("all", () => {
    var arr = [];
    ok(_(arr).all(n => n > 0));

    arr = [1, 2, 3];
    ok(_(arr).all(n => n > 0));

    arr = [-1, 0, 1];
    ok(!_(arr).all(n => n > 0));

    arr = [0, 1, 2, 3];
    ok(_(arr).all((n, i?) => n === i));
});

test("any", () => {
    var arr = [];
    ok(_(arr).any());
    ok(_(arr).any(n => n > 0));

    arr = [1, 2, 3];
    ok(_(arr).any(n => n < 2));

    arr = [-1, 0, 1];
    ok(_(arr).any(n => n < 0));

    arr = [0, 2, 3, 4];
    ok(_(arr).any((n, i?) => n === i));
});

test("at", () => {
    var arr = [];
    strictEqual(_(arr).at(1), undefined);

    arr = [1, 2, 3];
    strictEqual(_(arr).at(1), 2);
    strictEqual(_(arr).at(3), undefined);
});

test("average", () => {
    var arr = [];
    strictEqual(_(arr).average(), 0);

    arr = [1, 2, 3];
    strictEqual(_(arr).average(), 2);

    var arr2: IMock[] = [{ i: 1 }, { i: 2 }, { i: 3 }];
    strictEqual(_<IMock>(arr2).average(t => t.i), 2);
});

test("count", () => {
    var arr = [];
    strictEqual(_(arr).count(), 0);

    arr = [1, 2, 3];
    strictEqual(_(arr).count(), 3);

    arr = [1, 2, 3];
    strictEqual(_(arr).count(n => n > 1), 2);
});

test("first", () => {
    var arr = [];
    strictEqual(_(arr).first(), undefined);

    arr = [1, 2, 3, 4];
    strictEqual(_(arr).first(), 1);
    strictEqual(_<number>(arr).first(n => n % 2 === 0), 2);
    strictEqual(_<number>(arr).first(n => n > 5), undefined);
});

test("last", () => {
    var arr = [];
    strictEqual(_(arr).last(), undefined);

    arr = [1, 2, 3, 4];
    strictEqual(_(arr).last(), 4);
    strictEqual(_<number>(arr).last(n => n % 2 === 1), 3);
    strictEqual(_<number>(arr).last(n => n > 5), undefined);
});

test("max", () => {
    var arr = [];
    strictEqual(_(arr).max(), 0);

    arr = [1, 2, 3];
    strictEqual(_(arr).max(), 3);

    var arr2: IMock[] = [{ i: 1 }, { i: 2 }, { i: 3 }];
    strictEqual(_<IMock>(arr2).max(t => t.i), 3);
});

test("min", () => {
    var arr = [];
    strictEqual(_(arr).min(), 0);

    arr = [1, 2, 3];
    strictEqual(_(arr).min(), 1);

    var arr2: IMock[] = [{ i: 1 }, { i: 2 }, { i: 3 }];
    strictEqual(_<IMock>(arr2).min(t => t.i), 1);
});

test("sum", () => {
    var arr = [];
    strictEqual(_(arr).sum(), 0);

    arr = [1, 2, 3];
    strictEqual(_(arr).sum(), 6);

    var arr2: IMock[] = [{ i: 1 }, { i: 2 }, { i: 3 }];
    strictEqual(_<IMock>(arr2).sum(t => t.i), 6);
});

test("where", () => {
    var arr = [1, 2, 3];
    var r = _(arr).where(t => t > 1).toArray();
    strictEqual(r.length, 2);
    strictEqual(r[0], 2);
    strictEqual(r[1], 3);
});

interface IMock { i: number; }