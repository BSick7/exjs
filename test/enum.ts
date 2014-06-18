/// <reference path="../lib/qunit/qunit.d.ts" />
/// <reference path="../dist/ex.d.ts" />

QUnit.module("enumerable");

interface IMock { i: number;
}
interface IMock2 { i: number[];
}
interface IMock3 { i: number; j: string;
}
interface IMock4 { i1: number; i2: number;
}
interface IMock5 { i: number; j: string; k: Date;
}

test("array", () => {
    var arr = [1, 2, 3, 4, 5];
    var arr2 = arr.en().toArray();
    notStrictEqual(arr2, arr);
    strictEqual(arr2.length, 5);
    strictEqual(arr2[0], 1);
    strictEqual(arr2[1], 2);
    strictEqual(arr2[2], 3);
    strictEqual(arr2[3], 4);
    strictEqual(arr2[4], 5);
});

test("range", () => {
    var arr = exjs.range(0, 1).toArray();
    strictEqual(arr.length, 1, "#1");
    strictEqual(arr[0], 0, "#1");

    arr = exjs.range(5, 10).toArray();
    strictEqual(arr.length, 5, "#2");
    strictEqual(arr[0], 5, "#2");
    strictEqual(arr[1], 6, "#2");
    strictEqual(arr[2], 7, "#2");
    strictEqual(arr[3], 8, "#2");
    strictEqual(arr[4], 9, "#2");

    arr = exjs.range(1, 36, 5).toArray();
    strictEqual(arr.length, 7);
    strictEqual(arr[0], 1, "#3");
    strictEqual(arr[1], 6, "#3");
    strictEqual(arr[2], 11, "#3");
    strictEqual(arr[3], 16, "#3");
    strictEqual(arr[4], 21, "#3");
    strictEqual(arr[5], 26, "#3");
    strictEqual(arr[6], 31, "#3");
});

test("aggregate", () => {
    var arr = [1, 2, 3, 4, 5, 6, 7, 8];
    strictEqual(arr.en().aggregate(0, (acc, cur) => acc + cur), 36);
    strictEqual(arr.en().aggregate(1, (acc, cur) => acc * cur), 40320);
});

test("all", () => {
    var arr = [];
    ok(arr.en().all(n => n > 0));

    arr = [1, 2, 3];
    ok(arr.en().all(n => n > 0));

    arr = [-1, 0, 1];
    ok(!arr.en().all(n => n > 0));

    arr = [0, 1, 2, 3];
    ok(arr.en().all((n, i?) => n === i));
});

test("any", () => {
    ok(![].en().any());
    ok([1].en().any());

    var arr = [];
    ok(!arr.en().any());
    ok(!arr.en().any(n => n > 0));

    arr = [1, 2, 3];
    ok(arr.en().any(n => n < 2));

    arr = [-1, 0, 1];
    ok(arr.en().any(n => n < 0));

    arr = [0, 2, 3, 4];
    ok(arr.en().any((n, i?) => n === i));
});

test("apply", () => {
    var arr: IMock3[] = [
        { i: 0, j: "0" },
        { i: 1, j: "0" },
        { i: 2, j: "0" },
        { i: 3, j: "0" },
        { i: 4, j: "0" },
        { i: 5, j: "0" }
    ];
    arr.en().apply((m: IMock3) => m.j = m.i.toString()).toArray();
    strictEqual(arr[0].j, "0");
    strictEqual(arr[1].j, "1");
    strictEqual(arr[2].j, "2");
    strictEqual(arr[3].j, "3");
    strictEqual(arr[4].j, "4");
    strictEqual(arr[5].j, "5");
});

test("at", () => {
    var arr = [];
    strictEqual(arr.en().at(1), undefined);

    arr = [1, 2, 3];
    strictEqual(arr.en().at(1), 2);
    strictEqual(arr.en().at(3), undefined);
});

test("average", () => {
    var arr = [];
    strictEqual(arr.en().average(), 0);

    arr = [1, 2, 3];
    strictEqual(arr.en().average(), 2);

    var arr2: IMock[] = [
        { i: 1 },
        { i: 2 },
        { i: 3 }
    ];
    strictEqual(arr2.en().average(t => t.i), 2);
});

test("concat", () => {
    var arr1 = [1];
    var arr2 = [];
    var res = arr1.en().concat(arr2).toArray();
    strictEqual(res.length, 1);
    strictEqual(res[0], 1);

    arr1 = [];
    arr2 = [1];
    res = arr1.en().concat(arr2).toArray();
    strictEqual(res.length, 1);
    strictEqual(res[0], 1);

    arr1 = [1, 2];
    arr2 = [3, 4];
    res = arr1.en().concat(arr2).toArray();
    strictEqual(res.length, 4);
    strictEqual(res[0], 1);
    strictEqual(res[1], 2);
    strictEqual(res[2], 3);
    strictEqual(res[3], 4);
});

test("count", () => {
    var arr = [];
    strictEqual(arr.en().count(), 0);

    arr = [1, 2, 3];
    strictEqual(arr.en().count(), 3);

    arr = [1, 2, 3];
    strictEqual(arr.en().count(n => n > 1), 2);
});

test("difference", () => {
    var arr1 = [1, 2, 3, 4, 5];
    var arr2 = [4, 5, 6, 7, 8];
    var diff = arr1.en().difference(arr2);

    strictEqual(diff.intersection.count(), 2);
    strictEqual(diff.intersection.at(0), 4);
    strictEqual(diff.intersection.at(1), 5);

    strictEqual(diff.aNotB.count(), 3);
    strictEqual(diff.aNotB.at(0), 1);
    strictEqual(diff.aNotB.at(1), 2);
    strictEqual(diff.aNotB.at(2), 3);

    strictEqual(diff.bNotA.count(), 3);
    strictEqual(diff.bNotA.at(0), 6);
    strictEqual(diff.bNotA.at(1), 7);
    strictEqual(diff.bNotA.at(2), 8);
});

test("distinct", () => {
    var arr = [];
    var res = arr.en().distinct().toArray();
    strictEqual(res.length, 0);

    arr = [1, 1, 2, 2, 3, 3, 4];
    res = arr.en().distinct().toArray();
    strictEqual(res.length, 4);
    strictEqual(res[0], 1);
    strictEqual(res[1], 2);
    strictEqual(res[2], 3);
    strictEqual(res[3], 4);

    var arr2: IMock[] = [
        { i: 0 },
        { i: 0 },
        { i: 1 }
    ];
    var res2 = arr2.en().distinct((f, s) => f.i === s.i).toArray();
    strictEqual(res2.length, 2);
    strictEqual(res2[0].i, 0);
    strictEqual(res2[1].i, 1);
});

test("except", () => {
    var arr1 = [];
    var arr2 = [1, 2, 3];
    var res = arr1.en().except(arr2).toArray();
    strictEqual(res.length, 0);

    arr1 = [1, 2, 3];
    arr2 = [];
    res = arr1.en().except(arr2).toArray();
    strictEqual(res.length, 3);
    strictEqual(res[0], 1);
    strictEqual(res[1], 2);
    strictEqual(res[2], 3);

    arr1 = [1, 2, 3, 4];
    arr2 = [1, 4];
    res = arr1.en().except(arr2).toArray();
    strictEqual(res.length, 2);
    strictEqual(res[0], 2);
    strictEqual(res[1], 3);

    var ar1: IMock[] = [
        { i: 1 },
        { i: 2 },
        { i: 3 },
        { i: 4 }
    ];
    var ar2: IMock[] = [
        { i: 1 },
        { i: 4 }
    ];
    var res2 = ar1.en().except(ar2,(f, s) => f.i === s.i).toArray();
    strictEqual(res2.length, 2);
    strictEqual(res2[0].i, 2);
    strictEqual(res2[1].i, 3);
});

test("first", () => {
    var arr = [];
    strictEqual(arr.en().first(), undefined);

    arr = [1, 2, 3, 4];
    strictEqual(arr.en().first(), 1);
    strictEqual(arr.en().first(n => n % 2 === 0), 2);
    strictEqual(arr.en().first(n => n > 5), undefined);
});

test("groupBy", () => {
    var arr: IMock3[] = [
        { i: 0, j: "a" },
        { i: 0, j: "b" },
        { i: 0, j: "c" },
        { i: 1, j: "d" }
    ];
    var res = arr.en().groupBy<number>(t => t.i).toArray();
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
    res = arr.en().groupBy<number>(t => t.i,(k1, k2) => k1 % 2 === k2 % 2).toArray();
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
    var res = arr1.en().intersect(arr2).toArray();
    strictEqual(res.length, 0);

    arr1 = [];
    arr2 = [1];
    res = arr1.en().intersect(arr2).toArray();
    strictEqual(res.length, 0);

    arr1 = [1, 2, 3, 4, 5];
    arr2 = [4, 5, 6, 7, 8];
    res = arr1.en().intersect(arr2).toArray();
    strictEqual(res.length, 2);
    strictEqual(res[0], 4);
    strictEqual(res[1], 5);

    var ar1: IMock[] = [
        { i: 0 },
        { i: 1 },
        { i: 2 }
    ];
    var ar2: IMock[] = [
        { i: 1 },
        { i: 2 },
        { i: 3 }
    ];
    var res2 = ar1.en().intersect(ar2,(f, s) => f.i === s.i).toArray();
    strictEqual(res2.length, 2);
    strictEqual(res2[0].i, 1);
    strictEqual(res2[1].i, 2);
});

test("join", () => {
    var arr1: IMock3[] = [];
    var arr2: IMock3[] = [
        { i: 0, j: "a" }
    ];
    var res = arr1.en().join(arr2,t => t.j,t => t.j,(o, i) => {
        return { i1: o.i, i2: i.i };
    }).toArray();
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
    res = arr1.en().join(arr2,t => t.j,t => t.j,(o, i) => {
        return { i1: o.i, i2: i.i };
    }).toArray();
    strictEqual(res.length, 2);
    strictEqual(res[0].i1, 9);
    strictEqual(res[0].i2, 1);
    strictEqual(res[1].i1, 7);
    strictEqual(res[1].i2, 2);
});

test("last", () => {
    var arr = [];
    strictEqual(arr.en().last(), undefined);

    arr = [1, 2, 3, 4];
    strictEqual(arr.en().last(), 4);
    strictEqual(arr.en().last(n => n % 2 === 1), 3);
    strictEqual(arr.en().last(n => n > 5), undefined);
});

test("orderBy", () => {
    var arr = [5, 12, 5, 6346, 2, 1];
    var res = arr.en().orderBy(x => x).toArray();
    strictEqual(res.length, 6);
    strictEqual(res[0], 1);
    strictEqual(res[1], 2);
    strictEqual(res[2], 5);
    strictEqual(res[3], 5);
    strictEqual(res[4], 12);
    strictEqual(res[5], 6346);

    var arr2: IMock[] = [
        { i: 5 },
        { i: 12 },
        { i: 5 },
        { i: 6346 },
        { i: 2 },
        { i: 1 }
    ];
    var res2 = arr2.en().orderBy(x => x.i).toArray();
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
    strictEqual(arr.en().max(), 0);

    arr = [1, 2, 3];
    strictEqual(arr.en().max(), 3);

    var arr2: IMock[] = [
        { i: 1 },
        { i: 2 },
        { i: 3 }
    ];
    strictEqual(arr2.en().max(t => t.i), 3);
});

test("min", () => {
    var arr = [];
    strictEqual(arr.en().min(), 0);

    arr = [1, 2, 3];
    strictEqual(arr.en().min(), 1);

    var arr2: IMock[] = [
        { i: 1 },
        { i: 2 },
        { i: 3 }
    ];
    strictEqual(arr2.en().min(t => t.i), 1);
});

test("reverse", () => {
    var arr = [];
    var res = arr.en().reverse().toArray();
    strictEqual(res.length, 0);

    arr = [1, 2, 3];
    res = arr.en().reverse().toArray();
    strictEqual(res.length, 3);
    strictEqual(res[0], 3);
    strictEqual(res[1], 2);
    strictEqual(res[2], 1);
});

test("select", () => {
    var arr = [];
    var res = arr.en().select(t => t).toArray();
    strictEqual(res.length, 0);

    arr = [1, 2, 3];
    res = arr.en().select(t => t * 2).toArray();
    strictEqual(res.length, 3);
    strictEqual(res[0], 2);
    strictEqual(res[1], 4);
    strictEqual(res[2], 6);
});

test("selectMany", () => {
    var arr = [];
    var res = arr.en().selectMany(t => t.i.en()).toArray();
    strictEqual(res.length, 0);

    var arr2: IMock2[] = [
        { i: [1, 2, 3] },
        { i: [] },
        { i: [4] },
        { i: [] },
        { i: [5, 6] }
    ];
    var res2 = arr2.en().selectMany(t => t.i.en()).toArray();
    strictEqual(res2.length, 6);
    strictEqual(res2[0], 1);
    strictEqual(res2[1], 2);
    strictEqual(res2[2], 3);
    strictEqual(res2[3], 4);
    strictEqual(res2[4], 5);
    strictEqual(res2[5], 6);

    res2 = arr2.en().selectMany(t => t.i).toArray();
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
    var res = arr.en().skip(1).toArray();
    strictEqual(res.length, 0);

    arr = [1, 2, 3];
    res = arr.en().skip(1).toArray();
    strictEqual(res.length, 2);
    strictEqual(res[0], 2);
    strictEqual(res[1], 3);
});

test("skipWhile", () => {
    var arr = [];
    var res = arr.en().skipWhile(t => false).toArray();
    strictEqual(res.length, 0);

    arr = [1, 2, 3];
    res = arr.en().skipWhile(t => t < 0).toArray();
    strictEqual(res.length, 3);
    strictEqual(res[0], 1);
    strictEqual(res[1], 2);
    strictEqual(res[2], 3);

    arr = [1, 2, 3];
    res = arr.en().skipWhile(t => t < 2).toArray();
    strictEqual(res.length, 2);
    strictEqual(res[0], 2);
    strictEqual(res[1], 3);
});

test("standardDeviation", () => {
    var arr = [1, 3, 4, 5, 76, 345, 123, 12, 1, 2, 3];
    strictEqual(arr.en().standardDeviation(), 100.0373483973869);
});

test("sum", () => {
    var arr = [];
    strictEqual(arr.en().sum(), 0);

    arr = [1, 2, 3];
    strictEqual(arr.en().sum(), 6);

    var arr2: IMock[] = [
        { i: 1 },
        { i: 2 },
        { i: 3 }
    ];
    strictEqual(arr2.en().sum(t => t.i), 6);
});

test("take", () => {
    var arr = [];
    var res = arr.en().take(1).toArray();
    strictEqual(res.length, 0);

    arr = [1, 2, 3];
    res = arr.en().take(2).toArray();
    strictEqual(res.length, 2);
    strictEqual(res[0], 1);
    strictEqual(res[1], 2);
});

test("takeWhile", () => {
    var arr = [];
    var res = arr.en().takeWhile(t => true).toArray();
    strictEqual(res.length, 0);

    arr = [1, 2, 3];
    res = arr.en().takeWhile(t => t > 0).toArray();
    strictEqual(res.length, 3);
    strictEqual(res[0], 1);
    strictEqual(res[1], 2);
    strictEqual(res[2], 3);

    arr = [1, 2, 3];
    res = arr.en().takeWhile(t => t < 3).toArray();
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
    var res = arr.en()
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
    var res = arr1.en().union(arr2).toArray();
    strictEqual(res.length, 4);
    strictEqual(res[0], 1);
    strictEqual(res[1], 2);
    strictEqual(res[2], 3);
    strictEqual(res[3], 4);

    arr1 = [1, 2, 2, 3];
    arr2 = [2, 3, 4, 4];
    var res = arr1.en().union(arr2).toArray();
    strictEqual(res.length, 4);
    strictEqual(res[0], 1);
    strictEqual(res[1], 2);
    strictEqual(res[2], 3);
    strictEqual(res[3], 4);

    var ar1: IMock[] = [
        { i: 0 },
        { i: 1 }
    ];
    var ar2: IMock[] = [
        { i: 1 },
        { i: 2 }
    ];
    var res2 = ar1.en().union(ar2,(f, s) => f.i === s.i).toArray();
    strictEqual(res2.length, 3);
    strictEqual(res2[0].i, 0);
    strictEqual(res2[1].i, 1);
    strictEqual(res2[2].i, 2);
});

test("where", () => {
    var arr = [1, 2, 3];
    var r = arr.en().where(t => t > 1).toArray();
    strictEqual(r.length, 2);
    strictEqual(r[0], 2);
    strictEqual(r[1], 3);
});

test("zip", () => {
    var arr1 = [1, 2, 3];
    var arr2 = ["a"];
    var res = arr1.en().zip<string, IMock3>(arr2,(f, s) => ({ i: f, j: s })).toArray();
    strictEqual(res.length, 1);
    strictEqual(res[0].i, 1);
    strictEqual(res[0].j, "a");

    arr1 = [1];
    arr2 = ["a", "b", "c"];
    res = arr1.en().zip<string, IMock3>(arr2,(f, s) => ({ i: f, j: s })).toArray();
    strictEqual(res.length, 1);
    strictEqual(res[0].i, 1);
    strictEqual(res[0].j, "a");

    arr1 = [1, 2, 3];
    arr2 = ["a", "b", "c"];
    res = arr1.en().zip<string, IMock3>(arr2,(f, s) => ({ i: f, j: s })).toArray();
    strictEqual(res.length, 3);
    strictEqual(res[0].i, 1);
    strictEqual(res[0].j, "a");
    strictEqual(res[1].i, 2);
    strictEqual(res[1].j, "b");
    strictEqual(res[2].i, 3);
    strictEqual(res[2].j, "c");
});