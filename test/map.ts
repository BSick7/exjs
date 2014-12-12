QUnit.module("map");

test("toMap", () => {
    var m1 = new exjs.Map<string,number>();
    m1.set('a', 1);
    m1.set('b', 2);
    m1.set('c', 3);
    m1.set('d', 3);

    var arr = m1.entries().toArray();
    var m2 = arr.en().toMap(o => o[1], o => o[0]);
    strictEqual(m2.size, 3);
    strictEqual(m2.get(1), 'a');
    strictEqual(m2.get(2), 'b');
    strictEqual(m2.get(3), 'd');
});

test("basic", () => {
    var m1 = new exjs.Map<number, number>();

    m1.set(1, 2);
    strictEqual(m1.get(1), 2, 'set #1');
    strictEqual(m1.size, 1, 'set #1');

    m1.set(1, 4);
    strictEqual(m1.get(1), 4, 'set #2');
    strictEqual(m1.size, 1, 'set #2');

    m1.clear();
    strictEqual(m1.get(1), undefined, 'clear #1');
    strictEqual(m1.size, 0, 'clear #1');

    var m2 = new exjs.Map<any, number>();
    var x1 = {};
    var x2 = {};

    m2.set(x1, 5);
    ok(m2.has(x1), 'set #3');
    strictEqual(m2.size, 1, 'set #3');
    strictEqual(m2.get(x1), 5, 'set #3');
    strictEqual(m2.get(x2), undefined, 'set #3');

    m2.set(x1, 10);
    ok(m2.has(x1), 'set #4');
    strictEqual(m2.size, 1, 'set #4');
    strictEqual(m2.get(x1), 10, 'set #4');

    m2.delete(x2);
    strictEqual(m2.get(x1), 10, 'delete #1');
    strictEqual(m2.size, 1, 'delete #1');

    m2.delete(x1);
    strictEqual(m2.get(x1), undefined, 'delete #2');
    strictEqual(m2.size, 0, 'delete #2');
});

test("ctor", () => {
    var m1 = new exjs.Map<string, number>([
        ['a', 1],
        ['b', 2],
        ['c', 3]
    ]);
    strictEqual(m1.get('a'), 1);
    strictEqual(m1.get('b'), 2);
    strictEqual(m1.get('c'), 3);
});

test("entries", () => {
    var m1 = new exjs.Map<string, number>();
    m1.set('a', 1);
    m1.set('b', 2);
    m1.set('c', 3);

    var e = m1.entries().toArray();
    strictEqual(e.length, 3);
    strictEqual(e[0][0], 'a');
    strictEqual(e[0][1], 1);
    strictEqual(e[1][0], 'b');
    strictEqual(e[1][1], 2);
    strictEqual(e[2][0], 'c');
    strictEqual(e[2][1], 3);
});

test("forEach", () => {
    var m1 = new exjs.Map<string, number>();
    m1.set('a', 1);
    m1.set('b', 2);
    m1.set('c', 3);

    var hit_a = false;
    var hit_b = false;
    var hit_c = false;

    m1.forEach((v, k) => {
        if (k === 'a')
            hit_a = true;
        if (k === 'b')
            hit_b = true;
        if (k === 'c')
            hit_c = true;
    });
    ok(hit_a);
    ok(hit_b);
    ok(hit_c);
});

test("keys", () => {
    var m1 = new exjs.Map<string, number>();
    m1.set('a', 1);
    m1.set('b', 2);
    m1.set('c', 3);

    var k = m1.keys().toArray();
    strictEqual(k[0], 'a');
    strictEqual(k[1], 'b');
    strictEqual(k[2], 'c');
});

test("values", () => {
    var m1 = new exjs.Map<string, number>();
    m1.set('a', 1);
    m1.set('b', 2);
    m1.set('c', 3);

    var v = m1.values().toArray();
    strictEqual(v[0], 1);
    strictEqual(v[1], 2);
    strictEqual(v[2], 3);
});