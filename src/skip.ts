/// <reference path="enumerable.ts" />

module exjs {
    function skipEnumerator<T>(prev: IEnumerable<T>, count: number): IEnumerator<T> {
        var t: IEnumerator<T>;
        var e = {
            current: undefined,
            moveNext: function (): boolean {
                if (!t) {
                    t = prev.getEnumerator();
                    for (var i = 0; i < count; i++) {
                        if (!t.moveNext()) return false;
                    }
                }

                if (!t.moveNext()) {
                    e.current = undefined;
                    return false;
                }

                e.current = t.current;
                return true;
            }
        };
        return e;
    }

    function skipWhileEnumerator<T>(prev: IEnumerable<T>, predicate: (t: T, index?: number) => boolean): IEnumerator<T> {
        var t: IEnumerator<T>;
        var e = {
            current: undefined,
            moveNext: function (): boolean {
                if (!t) {
                    t = prev.getEnumerator();
                    for (var i = 0; t.moveNext(); i++) {
                        if (!predicate(e.current = t.current, i))
                            return true;
                    }
                    e.current = undefined;
                    return false;
                }

                if (!t.moveNext()) {
                    e.current = undefined;
                    return false;
                }

                e.current = t.current;
                return true;
            }
        };
        return e;
    }

    Enumerable.prototype.skip = function<T>(count: number): IEnumerable<T> {
        var e = new Enumerable<T>();
        e.getEnumerator = () => skipEnumerator(<IEnumerable<T>>this, count);
        return e;
    };
    Enumerable.prototype.skipWhile = function<T>(predicate: (t: T, index?: number) => boolean): IEnumerable<T> {
        var e = new Enumerable<T>();
        e.getEnumerator = () => skipWhileEnumerator(<IEnumerable<T>>this, predicate);
        return e;
    };
}