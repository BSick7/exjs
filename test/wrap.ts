QUnit.module("wrap");

module wrap {
    class TestCollection<T> implements exjs.IEnumerable<T> {
        private _ht: any[] = [];

        constructor (values: any[]) {
            this._ht = values.slice(0);
        }

        getEnumerator (): exjs.IEnumerator<T> {
            return this._ht.en().getEnumerator();
        }
    }

    test("en", () => {
        var t = new TestCollection<number>([1, 2, 3, 4, 5, 6, 7, 8, 9]);
        strictEqual(ex(t).sum(), 45);
    });
}