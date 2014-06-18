/// <reference path="enumerable.ts" />

module exjs {
    function intersectEnumerator<T>(prev: IEnumerable<T>, second: IEnumerable<T>, comparer?: (f: T, s: T) => boolean): IEnumerator<T> {
        comparer = comparer || function (f: T, s: T) { return f === s; };
        var t: IEnumerator<T>;
        var e = {
            current: undefined,
            moveNext: function (): boolean {
                if (!t) t = en(prev).distinct().getEnumerator();
                e.current = undefined;
                while (t.moveNext()) {
                    for (var hit = false, x = second.getEnumerator(); x.moveNext() && !hit;) {
                        hit = comparer(t.current, x.current);
                    }
                    if (hit) {
                        e.current = t.current;
                        return true;
                    }
                }
                return false;
            }
        };
        return e;
    }

    Enumerable.prototype.intersect = function<T>(second: any, comparer?: (f: T, s: T) => boolean): IEnumerableEx<T> {
        var en: IEnumerable<T> = second instanceof Array ? second.en() : second;
        var e = new Enumerable<T>();
        e.getEnumerator = () => intersectEnumerator(<IEnumerable<T>>this, en, comparer);
        return e;
    };
    if (List)
        List.prototype.intersect = Enumerable.prototype.intersect;
}  