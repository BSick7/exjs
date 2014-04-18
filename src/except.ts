/// <reference path="enumerable.ts" />

module arrayexjs {
    function exceptEnumerator<T>(prev: IEnumerable<T>, second: IEnumerable<T>, comparer?: (f: T, s: T) => boolean): IEnumerator<T> {
        comparer = comparer || function (f: T, s: T) {
            return f === s;
        };
        var t: IEnumerator<T>;
        var e = {
            current: undefined,
            moveNext: function (): boolean {
                if (!t) t = prev.getEnumerator();
                e.current = undefined;
                while (t.moveNext()) {
                    for (var hit = false, x = second.getEnumerator(); x.moveNext() && !hit;) {
                        hit = comparer(t.current, x.current);
                    }
                    if (!hit) {
                        e.current = t.current;
                        return true;
                    }
                }
                return false;
            }
        };
        return e;
    }

    var fn = Enumerable.prototype;
    fn.except = function<T>(second: IEnumerable<T>, comparer?: (f: T, s: T) => boolean): IEnumerable<T> {
        var e = new Enumerable<T>();
        e.getEnumerator = () => exceptEnumerator(<IEnumerable<T>>this, second, comparer);
        return e;
    };
} 