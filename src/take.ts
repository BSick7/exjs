/// <reference path="enumerable.ts" />

module exjs {
    function takeEnumerator<T>(prev: IEnumerable<T>, count: number): IEnumerator<T> {
        var t: IEnumerator<T>;
        var i = 0;
        var e = {
            current: undefined,
            moveNext: function (): boolean {
                if (!t) t = prev.getEnumerator();
                i++;
                if (i > count)
                    return false;
                e.current = undefined;
                if (!t.moveNext())
                    return false;
                e.current = t.current;
                return true;
            }
        };
        return e;
    }

    function takeWhileEnumerator<T>(prev: IEnumerable<T>, predicate: (t: T, index?: number) => boolean): IEnumerator<T> {
        var t: IEnumerator<T>;
        var i = 0;
        var e = {
            current: undefined,
            moveNext: function (): boolean {
                if (!t) t = prev.getEnumerator();

                if (!t.moveNext() || !predicate(t.current, i)) {
                    e.current = undefined;
                    return false;
                }
                i++;

                e.current = t.current;
                return true;
            }
        };
        return e;
    }

    Enumerable.prototype.take = function<T>(count: number): IEnumerableEx<T> {
        var e = new Enumerable<T>();
        e.getEnumerator = () => takeEnumerator(<IEnumerable<T>>this, count);
        return e;
    };
    Enumerable.prototype.takeWhile = function<T>(predicate: (t: T, index?: number) => boolean): IEnumerableEx<T> {
        var e = new Enumerable<T>();
        e.getEnumerator = () => takeWhileEnumerator(<IEnumerable<T>>this, predicate);
        return e;
    };
    if (List) {
        List.prototype.take = Enumerable.prototype.take;
        List.prototype.takeWhile = Enumerable.prototype.takeWhile;
    }
}