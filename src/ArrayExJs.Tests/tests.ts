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

test("concat", () => {
    var arr1 = [1];
    var arr2 = [];
    var res = _(arr1).concat(_(arr2)).toArray();
    strictEqual(res.length, 1);
    strictEqual(res[0], 1);

    arr1 = [];
    arr2 = [1];
    res = _(arr1).concat(_(arr2)).toArray();
    strictEqual(res.length, 1);
    strictEqual(res[0], 1);

    arr1 = [1, 2];
    arr2 = [3, 4];
    res = _(arr1).concat(_(arr2)).toArray();
    strictEqual(res.length, 4);
    strictEqual(res[0], 1);
    strictEqual(res[1], 2);
    strictEqual(res[2], 3);
    strictEqual(res[3], 4);
});

test("count", () => {
    var arr = [];
    strictEqual(_(arr).count(), 0);

    arr = [1, 2, 3];
    strictEqual(_(arr).count(), 3);

    arr = [1, 2, 3];
    strictEqual(_(arr).count(n => n > 1), 2);
});

test("distinct", () => {
    var arr = [];
    var res = _(arr).distinct().toArray();
    strictEqual(res.length, 0);

    arr = [1, 1, 2, 2, 3, 3, 4];
    res = _(arr).distinct().toArray();
    strictEqual(res.length, 4);
    strictEqual(res[0], 1);
    strictEqual(res[1], 2);
    strictEqual(res[2], 3);
    strictEqual(res[3], 4);

    var arr2: IMock[] = [{ i: 0 }, { i: 0 }, { i: 1 }];
    var res2 = _<IMock>(arr2).distinct((f, s) => f.i === s.i).toArray();
    strictEqual(res2.length, 2);
    strictEqual(res2[0].i, 0);
    strictEqual(res2[1].i, 1);
});

test("except", () => {
    var arr1 = [];
    var arr2 = [1, 2, 3];
    var res = _(arr1).except(_(arr2)).toArray();
    strictEqual(res.length, 0);

    arr1 = [1, 2, 3];
    arr2 = [];
    res = _(arr1).except(_(arr2)).toArray();
    strictEqual(res.length, 3);
    strictEqual(res[0], 1);
    strictEqual(res[1], 2);
    strictEqual(res[2], 3);

    arr1 = [1, 2, 3, 4];
    arr2 = [1, 4];
    res = _(arr1).except(_(arr2)).toArray();
    strictEqual(res.length, 2);
    strictEqual(res[0], 2);
    strictEqual(res[1], 3);

    var ar1: IMock[] = [{ i: 1 }, { i: 2 }, { i: 3 }, { i: 4 }];
    var ar2: IMock[] = [{ i: 1 }, { i: 4 }];
    var res2 = _<IMock>(ar1).except(_<IMock>(ar2), (f, s) => f.i === s.i).toArray();
    strictEqual(res2.length, 2);
    strictEqual(res2[0].i, 2);
    strictEqual(res2[1].i, 3);
});

test("first", () => {
    var arr = [];
    strictEqual(_(arr).first(), undefined);

    arr = [1, 2, 3, 4];
    strictEqual(_(arr).first(), 1);
    strictEqual(_<number>(arr).first(n => n % 2 === 0), 2);
    strictEqual(_<number>(arr).first(n => n > 5), undefined);
});

test("intersect", () => {
    var arr1 = [1];
    var arr2 = [];
    var res = _(arr1).intersect(_(arr2)).toArray();
    strictEqual(res.length, 0);

    arr1 = [];
    arr2 = [1];
    res = _(arr1).intersect(_(arr2)).toArray();
    strictEqual(res.length, 0);

    arr1 = [1, 2, 3, 4, 5];
    arr2 = [4, 5, 6, 7, 8];
    res = _(arr1).intersect(_(arr2)).toArray();
    strictEqual(res.length, 2);
    strictEqual(res[0], 4);
    strictEqual(res[1], 5);

    var ar1: IMock[] = [{ i: 0 }, { i: 1 }, { i: 2 }];
    var ar2: IMock[] = [{ i: 1 }, { i: 2 }, { i: 3 }];
    var res2 = _<IMock>(ar1).intersect(_<IMock>(ar2), (f, s) => f.i === s.i).toArray();
    strictEqual(res2.length, 2);
    strictEqual(res2[0].i, 1);
    strictEqual(res2[1].i, 2);
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

test("reverse", () => {
    var arr = [];
    var res = _(arr).reverse().toArray();
    strictEqual(res.length, 0);

    arr = [1, 2, 3];
    res = _(arr).reverse().toArray();
    strictEqual(res.length, 3);
    strictEqual(res[0], 3);
    strictEqual(res[1], 2);
    strictEqual(res[2], 1);
});

test("select", () => {
    var arr = [];
    var res = _(arr).select(t => t).toArray();
    strictEqual(res.length, 0);

    arr = [1, 2, 3];
    res = _<number>(arr).select(t => t * 2).toArray();
    strictEqual(res.length, 3);
    strictEqual(res[0], 2);
    strictEqual(res[1], 4);
    strictEqual(res[2], 6);
});

test("selectMany", () => {
    var arr = [];
    var res = _<IMock2>(arr).selectMany(t => _(t.i)).toArray();
    strictEqual(res.length, 0);

    var arr2: IMock2[] = [
        { i: [1, 2, 3] },
        { i: [] },
        { i: [4] },
        { i: [] },
        { i: [5, 6] }
    ];
    var res2  = _<IMock2>(arr2).selectMany(t => _(t.i)).toArray();
    strictEqual(res2.length, 6);
    strictEqual(res2[0], 1);
    strictEqual(res2[1], 2);
    strictEqual(res2[2], 3);
    strictEqual(res2[3], 4);
    strictEqual(res2[4], 5);
    strictEqual(res2[5], 6);
});

test("skip", () => {
    var arr = [];
    var res = _(arr).skip(1).toArray();
    strictEqual(res.length, 0);

    arr = [1, 2, 3];
    res = _(arr).skip(1).toArray();
    strictEqual(res.length, 2);
    strictEqual(res[0], 2);
    strictEqual(res[1], 3);
});

test("skipWhile", () => {
    var arr = [];
    var res = _(arr).skipWhile(t => false).toArray();
    strictEqual(res.length, 0);

    arr = [1, 2, 3];
    res = _(arr).skipWhile(t => t < 0).toArray();
    strictEqual(res.length, 3);
    strictEqual(res[0], 1);
    strictEqual(res[1], 2);
    strictEqual(res[2], 3);

    arr = [1, 2, 3];
    res = _(arr).skipWhile(t => t < 2).toArray();
    strictEqual(res.length, 2);
    strictEqual(res[0], 2);
    strictEqual(res[1], 3);
});

test("sum", () => {
    var arr = [];
    strictEqual(_(arr).sum(), 0);

    arr = [1, 2, 3];
    strictEqual(_(arr).sum(), 6);

    var arr2: IMock[] = [{ i: 1 }, { i: 2 }, { i: 3 }];
    strictEqual(_<IMock>(arr2).sum(t => t.i), 6);
});

test("take", () => {
    var arr = [];
    var res = _(arr).take(1).toArray();
    strictEqual(res.length, 0);

    arr = [1, 2, 3];
    res = _(arr).take(2).toArray();
    strictEqual(res.length, 2);
    strictEqual(res[0], 1);
    strictEqual(res[1], 2);
});

test("takeWhile", () => {
    var arr = [];
    var res = _(arr).takeWhile(t => true).toArray();
    strictEqual(res.length, 0);

    arr = [1, 2, 3];
    res = _(arr).takeWhile(t => t > 0).toArray();
    strictEqual(res.length, 3);
    strictEqual(res[0], 1);
    strictEqual(res[1], 2);
    strictEqual(res[2], 3);

    arr = [1, 2, 3];
    res = _(arr).takeWhile(t => t < 3).toArray();
    strictEqual(res.length, 2);
    strictEqual(res[0], 1);
    strictEqual(res[1], 2);
});

test("where", () => {
    var arr = [1, 2, 3];
    var r = _(arr).where(t => t > 1).toArray();
    strictEqual(r.length, 2);
    strictEqual(r[0], 2);
    strictEqual(r[1], 3);
});

interface IMock { i: number; }
interface IMock2 { i: number[] }