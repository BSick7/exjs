/// <reference path="enumerable.ts" />

namespace exjs {
    function zipEnumerator<T, TSecond, TResult>(prev: IEnumerable<T>, second: IEnumerable<TSecond>, resultSelector: (f: T, s: TSecond) => TResult): IEnumerator<TResult> {
        var s: IEnumerator<T>;
        var t: IEnumerator<TSecond>;
        var e = {
            current: undefined,
            moveNext: function (): boolean {
                if (!s) s = prev.getEnumerator();
                if (!t) t = second.getEnumerator();
                e.current = undefined;
                if (!s.moveNext() || !t.moveNext())
                    return false;
                e.current = resultSelector(s.current, t.current);
                return true;
            }
        };
        return e;
    }

    Enumerable.prototype.zip = function<T, TSecond,TResult>(second: any, resultSelector: (f: T, s: TSecond) => TResult): IEnumerableEx<TResult> {
        var en: IEnumerable<TSecond> = second instanceof Array ? second.en() : second;
        var e = new Enumerable<TResult>();
        e.getEnumerator = () => zipEnumerator<T, TSecond, TResult>(<IEnumerable<T>>this, en, resultSelector);
        return e;
    };
    if (List)
        List.prototype.zip = Enumerable.prototype.zip;
}