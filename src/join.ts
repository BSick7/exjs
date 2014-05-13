/// <reference path="enumerable.ts" />

module exjs {
    function joinEnumerator<TOuter, TInner, TKey, TResult>(prev: IEnumerable<TOuter>, inner: IEnumerable<TInner>, outerKeySelector: (t: TOuter) => TKey, innerKeySelector: (t: TInner) => TKey, resultSelector: (tout: TOuter, tin: TInner) => TResult, comparer?: (k1: TKey, k2: TKey) => boolean): IEnumerator<TResult> {
        comparer = comparer || function (k1, k2) {
            return k1 === k2;
        };
        var s: IEnumerator<TOuter>;
        var ins: TInner[];
        var j = 0;
        var e = {
            current: undefined,
            moveNext: function (): boolean {
                e.current = undefined;
                if (!s) {
                    s = prev.getEnumerator();
                    if (!s.moveNext())
                        return false;
                    ins = inner.toArray();
                }

                var cur: TInner;
                do {
                    for (; j < ins.length; j++) {
                        cur = ins[j];
                        if (comparer(outerKeySelector(s.current), innerKeySelector(cur))) {
                            j++;
                            e.current = resultSelector(s.current, cur);
                            return true;
                        }
                    }
                    j = 0;
                } while (s.moveNext());
                return false;
            }
        };
        return e;
    }

    Enumerable.prototype.join = function<T,TInner,TKey,TResult>(inner: any, outerKeySelector: (t: T) => TKey, innerKeySelector: (t: TInner) => TKey, resultSelector: (o: T, i: TInner) => TResult, comparer?: (k1: TKey, k2: TKey) => boolean): IEnumerable<TResult> {
        var en:IEnumerable<TInner> = inner instanceof Array ? inner.en() : inner;
        var e = new Enumerable<TResult>();
        e.getEnumerator = () => joinEnumerator<T, TInner, TKey, TResult>(<IEnumerable<T>>this, en, outerKeySelector, innerKeySelector, resultSelector, comparer);
        return e;
    };
    if (List)
        List.prototype.join = Enumerable.prototype.join;
}