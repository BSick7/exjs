QUnit.module("arrayexjs");

test("array", function () {
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

test("all", function () {
    var arr = [];
    ok(arr.en().all(function (n) {
        return n > 0;
    }));

    arr = [1, 2, 3];
    ok(arr.en().all(function (n) {
        return n > 0;
    }));

    arr = [-1, 0, 1];
    ok(!arr.en().all(function (n) {
        return n > 0;
    }));

    arr = [0, 1, 2, 3];
    ok(arr.en().all(function (n, i) {
        return n === i;
    }));
});

test("any", function () {
    var arr = [];
    ok(arr.en().any());
    ok(arr.en().any(function (n) {
        return n > 0;
    }));

    arr = [1, 2, 3];
    ok(arr.en().any(function (n) {
        return n < 2;
    }));

    arr = [-1, 0, 1];
    ok(arr.en().any(function (n) {
        return n < 0;
    }));

    arr = [0, 2, 3, 4];
    ok(arr.en().any(function (n, i) {
        return n === i;
    }));
});

test("at", function () {
    var arr = [];
    strictEqual(arr.en().at(1), undefined);

    arr = [1, 2, 3];
    strictEqual(arr.en().at(1), 2);
    strictEqual(arr.en().at(3), undefined);
});

test("average", function () {
    var arr = [];
    strictEqual(arr.en().average(), 0);

    arr = [1, 2, 3];
    strictEqual(arr.en().average(), 2);

    var arr2 = [{ i: 1 }, { i: 2 }, { i: 3 }];
    strictEqual(arr2.en().average(function (t) {
        return t.i;
    }), 2);
});

test("concat", function () {
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

test("count", function () {
    var arr = [];
    strictEqual(arr.en().count(), 0);

    arr = [1, 2, 3];
    strictEqual(arr.en().count(), 3);

    arr = [1, 2, 3];
    strictEqual(arr.en().count(function (n) {
        return n > 1;
    }), 2);
});

test("distinct", function () {
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

    var arr2 = [{ i: 0 }, { i: 0 }, { i: 1 }];
    var res2 = arr2.en().distinct(function (f, s) {
        return f.i === s.i;
    }).toArray();
    strictEqual(res2.length, 2);
    strictEqual(res2[0].i, 0);
    strictEqual(res2[1].i, 1);
});

test("except", function () {
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

    var ar1 = [{ i: 1 }, { i: 2 }, { i: 3 }, { i: 4 }];
    var ar2 = [{ i: 1 }, { i: 4 }];
    var res2 = ar1.en().except(ar2, function (f, s) {
        return f.i === s.i;
    }).toArray();
    strictEqual(res2.length, 2);
    strictEqual(res2[0].i, 2);
    strictEqual(res2[1].i, 3);
});

test("first", function () {
    var arr = [];
    strictEqual(arr.en().first(), undefined);

    arr = [1, 2, 3, 4];
    strictEqual(arr.en().first(), 1);
    strictEqual(arr.en().first(function (n) {
        return n % 2 === 0;
    }), 2);
    strictEqual(arr.en().first(function (n) {
        return n > 5;
    }), undefined);
});

test("groupBy", function () {
    var arr = [
        { i: 0, j: "a" },
        { i: 0, j: "b" },
        { i: 0, j: "c" },
        { i: 1, j: "d" }
    ];
    var res = arr.en().groupBy(function (t) {
        return t.i;
    }).toArray();
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
    res = arr.en().groupBy(function (t) {
        return t.i;
    }, function (k1, k2) {
        return k1 % 2 === k2 % 2;
    }).toArray();
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

test("intersect", function () {
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

    var ar1 = [{ i: 0 }, { i: 1 }, { i: 2 }];
    var ar2 = [{ i: 1 }, { i: 2 }, { i: 3 }];
    var res2 = ar1.en().intersect(ar2, function (f, s) {
        return f.i === s.i;
    }).toArray();
    strictEqual(res2.length, 2);
    strictEqual(res2[0].i, 1);
    strictEqual(res2[1].i, 2);
});

test("join", function () {
    var arr1 = [];
    var arr2 = [{ i: 0, j: "a" }];
    var res = arr1.en().join(arr2, function (t) {
        return t.j;
    }, function (t) {
        return t.j;
    }, function (o, i) {
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
    res = arr1.en().join(arr2, function (t) {
        return t.j;
    }, function (t) {
        return t.j;
    }, function (o, i) {
        return { i1: o.i, i2: i.i };
    }).toArray();
    strictEqual(res.length, 2);
    strictEqual(res[0].i1, 9);
    strictEqual(res[0].i2, 1);
    strictEqual(res[1].i1, 7);
    strictEqual(res[1].i2, 2);
});

test("last", function () {
    var arr = [];
    strictEqual(arr.en().last(), undefined);

    arr = [1, 2, 3, 4];
    strictEqual(arr.en().last(), 4);
    strictEqual(arr.en().last(function (n) {
        return n % 2 === 1;
    }), 3);
    strictEqual(arr.en().last(function (n) {
        return n > 5;
    }), undefined);
});

test("orderBy", function () {
    var arr = [5, 12, 5, 6346, 2, 1];
    var res = arr.en().orderBy(function (x) {
        return x;
    }).toArray();
    strictEqual(res.length, 6);
    strictEqual(res[0], 1);
    strictEqual(res[1], 2);
    strictEqual(res[2], 5);
    strictEqual(res[3], 5);
    strictEqual(res[4], 12);
    strictEqual(res[5], 6346);

    var arr2 = [{ i: 5 }, { i: 12 }, { i: 5 }, { i: 6346 }, { i: 2 }, { i: 1 }];
    var res2 = arr2.en().orderBy(function (x) {
        return x.i;
    }).toArray();
    strictEqual(res2.length, 6);
    strictEqual(res2[0].i, 1);
    strictEqual(res2[1].i, 2);
    strictEqual(res2[2].i, 5);
    strictEqual(res2[3].i, 5);
    strictEqual(res2[4].i, 12);
    strictEqual(res2[5].i, 6346);
});

test("max", function () {
    var arr = [];
    strictEqual(arr.en().max(), 0);

    arr = [1, 2, 3];
    strictEqual(arr.en().max(), 3);

    var arr2 = [{ i: 1 }, { i: 2 }, { i: 3 }];
    strictEqual(arr2.en().max(function (t) {
        return t.i;
    }), 3);
});

test("min", function () {
    var arr = [];
    strictEqual(arr.en().min(), 0);

    arr = [1, 2, 3];
    strictEqual(arr.en().min(), 1);

    var arr2 = [{ i: 1 }, { i: 2 }, { i: 3 }];
    strictEqual(arr2.en().min(function (t) {
        return t.i;
    }), 1);
});

test("reverse", function () {
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

test("select", function () {
    var arr = [];
    var res = arr.en().select(function (t) {
        return t;
    }).toArray();
    strictEqual(res.length, 0);

    arr = [1, 2, 3];
    res = arr.en().select(function (t) {
        return t * 2;
    }).toArray();
    strictEqual(res.length, 3);
    strictEqual(res[0], 2);
    strictEqual(res[1], 4);
    strictEqual(res[2], 6);
});

test("selectMany", function () {
    var arr = [];
    var res = arr.en().selectMany(function (t) {
        return t.i.en();
    }).toArray();
    strictEqual(res.length, 0);

    var arr2 = [
        { i: [1, 2, 3] },
        { i: [] },
        { i: [4] },
        { i: [] },
        { i: [5, 6] }
    ];
    var res2 = arr2.en().selectMany(function (t) {
        return t.i.en();
    }).toArray();
    strictEqual(res2.length, 6);
    strictEqual(res2[0], 1);
    strictEqual(res2[1], 2);
    strictEqual(res2[2], 3);
    strictEqual(res2[3], 4);
    strictEqual(res2[4], 5);
    strictEqual(res2[5], 6);
});

test("skip", function () {
    var arr = [];
    var res = arr.en().skip(1).toArray();
    strictEqual(res.length, 0);

    arr = [1, 2, 3];
    res = arr.en().skip(1).toArray();
    strictEqual(res.length, 2);
    strictEqual(res[0], 2);
    strictEqual(res[1], 3);
});

test("skipWhile", function () {
    var arr = [];
    var res = arr.en().skipWhile(function (t) {
        return false;
    }).toArray();
    strictEqual(res.length, 0);

    arr = [1, 2, 3];
    res = arr.en().skipWhile(function (t) {
        return t < 0;
    }).toArray();
    strictEqual(res.length, 3);
    strictEqual(res[0], 1);
    strictEqual(res[1], 2);
    strictEqual(res[2], 3);

    arr = [1, 2, 3];
    res = arr.en().skipWhile(function (t) {
        return t < 2;
    }).toArray();
    strictEqual(res.length, 2);
    strictEqual(res[0], 2);
    strictEqual(res[1], 3);
});

test("sum", function () {
    var arr = [];
    strictEqual(arr.en().sum(), 0);

    arr = [1, 2, 3];
    strictEqual(arr.en().sum(), 6);

    var arr2 = [{ i: 1 }, { i: 2 }, { i: 3 }];
    strictEqual(arr2.en().sum(function (t) {
        return t.i;
    }), 6);
});

test("take", function () {
    var arr = [];
    var res = arr.en().take(1).toArray();
    strictEqual(res.length, 0);

    arr = [1, 2, 3];
    res = arr.en().take(2).toArray();
    strictEqual(res.length, 2);
    strictEqual(res[0], 1);
    strictEqual(res[1], 2);
});

test("takeWhile", function () {
    var arr = [];
    var res = arr.en().takeWhile(function (t) {
        return true;
    }).toArray();
    strictEqual(res.length, 0);

    arr = [1, 2, 3];
    res = arr.en().takeWhile(function (t) {
        return t > 0;
    }).toArray();
    strictEqual(res.length, 3);
    strictEqual(res[0], 1);
    strictEqual(res[1], 2);
    strictEqual(res[2], 3);

    arr = [1, 2, 3];
    res = arr.en().takeWhile(function (t) {
        return t < 3;
    }).toArray();
    strictEqual(res.length, 2);
    strictEqual(res[0], 1);
    strictEqual(res[1], 2);
});

test("thenBy", function () {
    var m0 = { i: 5, j: "aa", k: new Date("1/1/2013") };
    var m1 = { i: 12, j: "a", k: new Date("6/1/2013") };
    var m2 = { i: 5, j: "a", k: new Date("1/1/2013") };
    var m3 = { i: 12, j: "a", k: new Date("12/1/2013") };
    var m4 = { i: 2, j: "aa", k: new Date("1/1/2013") };
    var m5 = { i: 2, j: "a", k: new Date("1/1/2013") };
    var m6 = { i: 12, j: "a", k: new Date("1/1/2013") };
    var arr = [m0, m1, m2, m3, m4, m5, m6];
    var res = arr.en().orderBy(function (x) {
        return x.i;
    }).thenBy(function (x) {
        return x.j;
    }, function (f, s) {
        return f.length - s.length;
    }).thenByDescending(function (x) {
        return x.k;
    }).toArray();
    strictEqual(res.length, 7);
    strictEqual(res[0], m5);
    strictEqual(res[1], m4);
    strictEqual(res[2], m2);
    strictEqual(res[3], m0);
    strictEqual(res[4], m3);
    strictEqual(res[5], m1);
    strictEqual(res[6], m6);
});

test("union", function () {
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

    var ar1 = [{ i: 0 }, { i: 1 }];
    var ar2 = [{ i: 1 }, { i: 2 }];
    var res2 = ar1.en().union(ar2, function (f, s) {
        return f.i === s.i;
    }).toArray();
    strictEqual(res2.length, 3);
    strictEqual(res2[0].i, 0);
    strictEqual(res2[1].i, 1);
    strictEqual(res2[2].i, 2);
});

test("where", function () {
    var arr = [1, 2, 3];
    var r = arr.en().where(function (t) {
        return t > 1;
    }).toArray();
    strictEqual(r.length, 2);
    strictEqual(r[0], 2);
    strictEqual(r[1], 3);
});

test("zip", function () {
    var arr1 = [1, 2, 3];
    var arr2 = ["a"];
    var res = arr1.en().zip(arr2, function (f, s) {
        return ({ i: f, j: s });
    }).toArray();
    strictEqual(res.length, 1);
    strictEqual(res[0].i, 1);
    strictEqual(res[0].j, "a");

    arr1 = [1];
    arr2 = ["a", "b", "c"];
    res = arr1.en().zip(arr2, function (f, s) {
        return ({ i: f, j: s });
    }).toArray();
    strictEqual(res.length, 1);
    strictEqual(res[0].i, 1);
    strictEqual(res[0].j, "a");

    arr1 = [1, 2, 3];
    arr2 = ["a", "b", "c"];
    res = arr1.en().zip(arr2, function (f, s) {
        return ({ i: f, j: s });
    }).toArray();
    strictEqual(res.length, 3);
    strictEqual(res[0].i, 1);
    strictEqual(res[0].j, "a");
    strictEqual(res[1].i, 2);
    strictEqual(res[1].j, "b");
    strictEqual(res[2].i, 3);
    strictEqual(res[2].j, "c");
});
