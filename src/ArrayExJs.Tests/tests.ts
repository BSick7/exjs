/// <reference path="scripts/typings/qunit/qunit.d.ts" />
/// <reference path="scripts/typings/arrayex/arrayex.d.ts" />

QUnit.module("arrayexjs");

interface IMock { i: number; }
interface IMock2 { i: number[]; }
interface IMock3 { i: number; j: string; }
interface IMock4 { i1: number; i2: number; }
interface IMock5 { i: number; j: string; k: Date; }

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

test("groupBy", () => {
    var arr: IMock3[] = [
        { i: 0, j: "a" },
        { i: 0, j: "b" },
        { i: 0, j: "c" },
        { i: 1, j: "d" }
    ];
    var res = _<IMock3>(arr).groupBy<number>(t => t.i).toArray();
    strictEqual(res.length, 2);
    var r1 = res[0].toArray();
    var r2 = res[1].toArray();
    strictEqual(r1.length, 3);
    strictEqual(r1[0].j, "a");
    strictEqual(r1[1].j, "b");
    strictEqual(r1[2].j, "c");
    strictEqual(r2.length, 1);
    strictEqual(r2[0].j, "d");

    arr = [
        { i: 0, j: "a" },
        { i: 1, j: "b" },
        { i: 2, j: "c" },
        { i: 3, j: "d" }
    ];
    res = _<IMock3>(arr).groupBy<number>(t => t.i, (k1,k2) => k1 % 2 === k2 % 2).toArray();
    strictEqual(res.length, 2);
    r1 = res[0].toArray();
    r2 = res[1].toArray();
    strictEqual(r1.length, 2);
    strictEqual(r1[0].j, "a");
    strictEqual(r1[1].j, "c");
    strictEqual(r2.length, 2);
    strictEqual(r2[0].j, "b");
    strictEqual(r2[1].j, "d");
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

test("join", () => {
    var arr1: IMock3[] = [];
    var arr2: IMock3[] = [{ i: 0, j: "a" }];
    var res = _<IMock3>(arr1).join(_<IMock3>(arr2), t => t.j, t => t.j, (o, i) => { return { i1: o.i, i2: i.i }; }).toArray();
    strictEqual(res.length, 0);
    
    arr1 = [
        { i: 9, j: "a" },
        { i: 8, j: "b" },
        { i: 7, j: "c" },
        { i: 6, j: "d" }
    ];
    arr2 = [
        { i: 1, j: "a" },
        { i: 2, j: "c" },
        { i: 3, j: "e" }
    ];
    res = _<IMock3>(arr1).join(_<IMock3>(arr2), t => t.j, t => t.j, (o, i) => { return { i1: o.i, i2: i.i }; }).toArray();
    strictEqual(res.length, 2);
    strictEqual(res[0].i1, 9);
    strictEqual(res[0].i2, 1);
    strictEqual(res[1].i1, 7);
    strictEqual(res[1].i2, 2);
});

test("last", () => {
    var arr = [];
    strictEqual(_(arr).last(), undefined);

    arr = [1, 2, 3, 4];
    strictEqual(_(arr).last(), 4);
    strictEqual(_<number>(arr).last(n => n % 2 === 1), 3);
    strictEqual(_<number>(arr).last(n => n > 5), undefined);
});

test("orderBy", () => {
    var arr = [5, 12, 5, 6346, 2, 1];
    var res = _<number>(arr).orderBy(x => x).toArray();
    strictEqual(res.length, 6);
    strictEqual(res[0], 1);
    strictEqual(res[1], 2);
    strictEqual(res[2], 5);
    strictEqual(res[3], 5);
    strictEqual(res[4], 12);
    strictEqual(res[5], 6346);

    var arr2: IMock[] = [{ i: 5 }, { i: 12 }, { i: 5 }, { i: 6346 }, { i: 2 }, { i: 1 }];
    var res2 = _<IMock>(arr2).orderBy(x => x.i).toArray();
    strictEqual(res2.length, 6);
    strictEqual(res2[0].i, 1);
    strictEqual(res2[1].i, 2);
    strictEqual(res2[2].i, 5);
    strictEqual(res2[3].i, 5);
    strictEqual(res2[4].i, 12);
    strictEqual(res2[5].i, 6346);
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

test("thenBy", () => {
    var m0: IMock5 = { i: 5, j: "aa", k: new Date("1/1/2013") };
    var m1: IMock5 = { i: 12, j: "a", k: new Date("6/1/2013") };
    var m2: IMock5 = { i: 5, j: "a", k: new Date("1/1/2013") };
    var m3: IMock5 = { i: 12, j: "a", k: new Date("12/1/2013") };
    var m4: IMock5 = { i: 2, j: "aa", k: new Date("1/1/2013") };
    var m5: IMock5 = { i: 2, j: "a", k: new Date("1/1/2013") };
    var m6: IMock5 = { i: 12, j: "a", k: new Date("1/1/2013") };
    var arr: IMock5[] = [m0, m1, m2, m3, m4, m5, m6];
    var res = _<IMock5>(arr)
        .orderBy(x => x.i)
        .thenBy(x => x.j, (f, s) => f.length - s.length)
        .thenByDescending(x => x.k)
        .toArray();
    strictEqual(res.length, 7);
    strictEqual(res[0], m5);
    strictEqual(res[1], m4);
    strictEqual(res[2], m2);
    strictEqual(res[3], m0);
    strictEqual(res[4], m3);
    strictEqual(res[5], m1);
    strictEqual(res[6], m6);
});

test("union", () => {
    var arr1 = [1, 2];
    var arr2 = [3, 4];
    var res = _(arr1).union(_(arr2)).toArray();
    strictEqual(res.length, 4);
    strictEqual(res[0], 1);
    strictEqual(res[1], 2);
    strictEqual(res[2], 3);
    strictEqual(res[3], 4);

    arr1 = [1, 2, 2, 3];
    arr2 = [2, 3, 4, 4];
    var res = _(arr1).union(_(arr2)).toArray();
    strictEqual(res.length, 4);
    strictEqual(res[0], 1);
    strictEqual(res[1], 2);
    strictEqual(res[2], 3);
    strictEqual(res[3], 4);

    var ar1: IMock[] = [{ i: 0 }, { i: 1 }];
    var ar2: IMock[] = [{ i: 1 }, { i: 2 }];
    var res2 = _<IMock>(ar1).union(_<IMock>(ar2), (f, s) => f.i === s.i).toArray();
    strictEqual(res2.length, 3);
    strictEqual(res2[0].i, 0);
    strictEqual(res2[1].i, 1);
    strictEqual(res2[2].i, 2);
});

test("where", () => {
    var arr = [1, 2, 3];
    var r = _(arr).where(t => t > 1).toArray();
    strictEqual(r.length, 2);
    strictEqual(r[0], 2);
    strictEqual(r[1], 3);
});

test("zip", () => {
    var arr1 = [1, 2, 3];
    var arr2 = ["a"];
    var res = _<number>(arr1).zip<string, IMock3>(_<string>(arr2), (f, s) => { return { i: f, j: s }; }).toArray();
    strictEqual(res.length, 1);
    strictEqual(res[0].i, 1);
    strictEqual(res[0].j, "a");

    arr1 = [1];
    arr2 = ["a", "b", "c"];
    res = _<number>(arr1).zip<string, IMock3>(_<string>(arr2), (f, s) => { return { i: f, j: s }; }).toArray();
    strictEqual(res.length, 1);
    strictEqual(res[0].i, 1);
    strictEqual(res[0].j, "a");

    arr1 = [1, 2, 3];
    arr2 = ["a", "b", "c"];
    res = _<number>(arr1).zip<string, IMock3>(_<string>(arr2), (f, s) => { return { i: f, j: s }; }).toArray();
    strictEqual(res.length, 3);
    strictEqual(res[0].i, 1);
    strictEqual(res[0].j, "a");
    strictEqual(res[1].i, 2);
    strictEqual(res[1].j, "b");
    strictEqual(res[2].i, 3);
    strictEqual(res[2].j, "c");
});