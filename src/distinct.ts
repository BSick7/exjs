/// <reference path="enumerable.ts" />

module arrayexjs {
    function distinctEnumerator<T>(prev: IEnumerable<T>, comparer?: (f: T, s: T) => boolean): IEnumerator<T> {
        var t: IEnumerator<T>;
        var visited = [];
        var e = {
            current: undefined,
            moveNext: function (): boolean {
                if (!t) t = prev.getEnumerator();
                e.current = undefined;
                if (!comparer) {
                    while (t.moveNext()) {
                        if (visited.indexOf(t.current) < 0) {
                            visited.push(e.current = t.current);
                            return true;
                        }
                    }
                    return false;
                }

                while (t.moveNext()) {
                    for (var i = 0, len = visited.length, hit = false; i < len && !hit; i++) {
                        hit = !!comparer(visited[i], t.current);
                    }
                    if (!hit) {
                        visited.push(e.current = t.current);
                        return true;
                    }
                }
                return false;
            }
        };
        return e;
    }

    Enumerable.prototype.distinct = function<T>(comparer?: (f: T, s: T) => boolean): IEnumerable<T> {
        var e = new Enumerable<T>();
        e.getEnumerator = () => distinctEnumerator(<IEnumerable<T>>this, comparer);
        return e;
    };
}