QUnit.module("iterator");

test("iterator", (assert) => {
    if (!Symbol || !Symbol.iterator) {
        assert.ok(true, "Browser does not support Symbol.iterator, not testing.");
        console.warn("Browser does not support Symbol.iterator, not testing.");
        return;
    }
    var enu = [1, 2, 3].en();
    var result = [];
    for (var it = enu[Symbol.iterator](), cur = it.next(); !cur.done; cur = it.next()) {
        result.push(cur.value);
    }
    assert.strictEqual(result[0], 1);
    assert.strictEqual(result[1], 2);
    assert.strictEqual(result[2], 3);
});