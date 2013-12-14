var arrayexjs;
(function (arrayexjs) {
    var Enumerable = (function () {
        function Enumerable() {
        }
        Enumerable.prototype.getEnumerator = function () {
            return {
                moveNext: function () {
                    return false;
                },
                current: undefined
            };
        };
        Enumerable.prototype.all = function (predicate) {
            if (predicate) {
                var e = this.getEnumerator();
                var i = 0;
                while (e.moveNext()) {
                    if (!predicate(e.current, i))
                        return false;
                    i++;
                }
            }
            return true;
        };
        Enumerable.prototype.any = function (predicate) {
            predicate = predicate || function () {
                return true;
            };
            var e = this.getEnumerator();
            var i = 0;
            while (e.moveNext()) {
                if (predicate(e.current, i))
                    return true;
                i++;
            }
            return i === 0;
        };
        Enumerable.prototype.average = function (selector) {
            var count = 0;
            var total = 0;
            selector = selector || function (t) {
                if (typeof t !== "number")
                    throw new Error("Object is not a number.");
                return t;
            };
            var e = this.getEnumerator();
            while (e.moveNext()) {
                total += selector(e.current);
                count++;
            }
            if (count === 0)
                return 0;
            return total / count;
        };

        //concat(): IEnumerable<T> {
        //}
        //count(selector?: (t: T) => number): number {
        //}
        //distinct(): IEnumerable<T> {
        //}
        //at(index: number): T {
        //}
        //except(second: IEnumerable<T>, comparer?: (f: T, s: T) => boolean): IEnumerable<T> {
        //}
        //first(match?: (t: T) => boolean): T {
        //}
        //groupBy<TKey>(): IGrouping<TKey, T> {
        //}
        //intersect(second: IEnumerable<T>, comparer?: (f: T, s: T) => boolean): IEnumerable<T> {
        //}
        //join<TInner, TKey, TResult>(inner: IEnumerable<TInner>, outerKeySelector: (t: T) => TKey, innerKeySelector: (t: TInner) => TKey, resultSelector: (o: T, i: TInner) => TResult): IEnumerable<TResult> {
        //}
        //last(match?: (t: T) => boolean): T {
        //}
        //max(selector?: (t: T) => number): number {
        //}
        //min(selector?: (t: T) => number): number {
        //}
        //orderBy<TKey>(keySelector: (t: T) => TKey, comparer?: (f: TKey, s: TKey) => number): IOrderedEnumerable<T> {
        //}
        //orderByDescending<TKey>(keySelector: (t: T) => TKey, comparer?: (f: TKey, s: TKey) => number): IOrderedEnumerable<T> {
        //}
        //reverse(): IEnumerable<T> {
        //}
        //select<TResult>(selector: (t: T, index?: number) => TResult): IEnumerable<TResult> {
        //}
        //selectMany(): IEnumerable<T> {
        //}
        //skip(count: number): IEnumerable<T> {
        //}
        //skipWhile(predicate: (t: T, index?: number) => boolean): IEnumerable<T> {
        //}
        //sum(selector?: (t: T) => number): number {
        //}
        //take(count: number): IEnumerable<T> {
        //}
        //takeWhile(predicate: (t: T, index?: number) => boolean): IEnumerable<T> {
        //}
        Enumerable.prototype.toArray = function () {
            var arr = [];
            var enumerator = this.getEnumerator();
            while (enumerator.moveNext()) {
                arr.push(enumerator.current);
            }
            return arr;
        };
        return Enumerable;
    })();
    arrayexjs.Enumerable = Enumerable;

    function _(o) {
        if (o && o instanceof Array)
            return new arrayexjs.ArrayEnumerable(o);
        return new Enumerable();
    }
    arrayexjs._ = _;
})(arrayexjs || (arrayexjs = {}));

var _ = arrayexjs._;
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var arrayexjs;
(function (arrayexjs) {
    function arrayEnumerator(arr) {
        var len = arr.length;
        var e = { moveNext: undefined, current: undefined };
        var index = -1;
        e.moveNext = function () {
            index++;
            if (index >= len) {
                e.current = undefined;
                return false;
            }
            e.current = arr[index];
            return true;
        };
        return e;
    }

    var ArrayEnumerable = (function (_super) {
        __extends(ArrayEnumerable, _super);
        function ArrayEnumerable(arr) {
            _super.call(this);

            this.getEnumerator = function () {
                return arrayEnumerator(arr);
            };
            this.toArray = function () {
                return arr.slice(0);
            };
        }
        return ArrayEnumerable;
    })(arrayexjs.Enumerable);
    arrayexjs.ArrayEnumerable = ArrayEnumerable;
})(arrayexjs || (arrayexjs = {}));
//# sourceMappingURL=arrayex.js.map
