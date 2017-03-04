/// <reference path="enumerable.ts" />

namespace exjs {
    function unionEnumerator<T>(prev: IEnumerable<T>, second: IEnumerable<T>, comparer?: (f: T, s: T) => boolean): IEnumerator<T> {
        comparer = comparer || function (f: T, s: T) {
            return f === s;
        };
        var t: IEnumerator<T>;
        var visited: T[] = [];
        var s: IEnumerator<T>;
        var e = {
            current: undefined,
            moveNext: function (): boolean {
                if (!t) t = en(prev).distinct().getEnumerator();
                e.current = undefined;
                if (!s && t.moveNext()) {
                    visited.push(e.current = t.current);
                    return true;
                }
                s = s || en(second).distinct().getEnumerator();
                while (s.moveNext()) {
                    for (var i = 0, hit = false, len = visited.length; i < len && !hit; i++) {
                        hit = comparer(visited[i], s.current);
                    }
                    if (!hit) {
                        e.current = s.current;
                        return true;
                    }
                }
                return false;
            }
        };
        return e;
    }

    Enumerable.prototype.union = function<T>(second: any, comparer?: (f: T, s: T) => boolean): IEnumerableEx<T> {
        var en:IEnumerable<T> = second instanceof Array ? second.en() : second;
        var e = new Enumerable<T>();
        e.getEnumerator = () => unionEnumerator(<IEnumerable<T>>this, en, comparer);
        return e;
    };
    if (List)
        List.prototype.union = Enumerable.prototype.union;
}