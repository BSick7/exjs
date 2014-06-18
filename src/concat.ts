/// <reference path="enumerable.ts" />

module exjs {
    function concatEnumerator<T>(prev:IEnumerable<T>, second:IEnumerable<T>):IEnumerator<T> {
        var t:IEnumerator<T>;
        var s = false;
        var e = {
            current: undefined,
            moveNext: function ():boolean {
                if (!t) t = prev.getEnumerator();
                e.current = undefined;
                if (t.moveNext()) {
                    e.current = t.current;
                    return true;
                }
                if (s) return false;
                s = true;
                t = second.getEnumerator();
                if (!t.moveNext())
                    return false;
                e.current = t.current;
                return true;
            }
        };
        return e;
    }

    Enumerable.prototype.concat = function<T>(second:any):IEnumerableEx<T> {
        var en:IEnumerable<T> = second instanceof Array ? second.en() : second;
        var e = new Enumerable<T>();
        e.getEnumerator = () => concatEnumerator<T>(<IEnumerable<T>>this, en);
        return e;
    };
    if (List)
        List.prototype.concat = Enumerable.prototype.concat;
}