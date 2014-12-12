QUnit.module("list");

test("toList", () => {
    var arr = [1, 2, 3, 4, 5];
    var list = arr.en().toList();
    notStrictEqual(arr, list);
    ok(list instanceof exjs.List);
    ok(list instanceof Array);
    strictEqual(list.length, 5);
    strictEqual(list[0], 1);
    strictEqual(list[1], 2);
    strictEqual(list[2], 3);
    strictEqual(list[3], 4);
    strictEqual(list[4], 5);

    ok(list.select instanceof Function);
    var n = list.select(i => i).toArray();
    ok(n instanceof Array);
    notStrictEqual(arr, n);
    notStrictEqual(list, n);
    strictEqual(n.length, 5);
    strictEqual(n[0], 1);
    strictEqual(n[1], 2);
    strictEqual(n[2], 3);
    strictEqual(n[3], 4);
    strictEqual(n[4], 5);
});

test("remove", () => {
    var arr = [1, 2, 3, 4, 5];
    var list = arr.en().toList();

    ok(list.remove(1));
    strictEqual(list.length, 4);
    strictEqual(list[0], 2);
    strictEqual(list[1], 3);
    strictEqual(list[2], 4);
    strictEqual(list[3], 5);

    ok(!list.remove(<any>'2'));
    strictEqual(list.length, 4);
    strictEqual(list[0], 2);
    strictEqual(list[1], 3);
    strictEqual(list[2], 4);
    strictEqual(list[3], 5);

    ok(!list.remove(10));
    strictEqual(list.length, 4);
    strictEqual(list[0], 2);
    strictEqual(list[1], 3);
    strictEqual(list[2], 4);
    strictEqual(list[3], 5);
});

test("removeWhere", () => {
    var arr = [1, 2, 3, 4, 5];
    var list = arr.en().toList();

    var removed = list.removeWhere(n => n === 1).toArray();
    strictEqual(removed.length, 1);
    strictEqual(removed[0], 1);
    strictEqual(list.length, 4);
    strictEqual(list[0], 2);
    strictEqual(list[1], 3);
    strictEqual(list[2], 4);
    strictEqual(list[3], 5);

    removed = list.removeWhere((n, index) => index % 2 === 0).toArray();
    strictEqual(removed.length, 2);
    strictEqual(removed[0], 2);
    strictEqual(removed[1], 4);
    strictEqual(list.length, 2);
    strictEqual(list[0], 3);
    strictEqual(list[1], 5);
});