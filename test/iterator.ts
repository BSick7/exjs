QUnit.module("iterator");

test("iterator", (assert) => {
    if (!Symbol || !Symbol.iterator) {
        assert.ok(true, "Not testing iterator as browser does not support.");
        console.warn("Not testing iterator as browser does not support.");
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