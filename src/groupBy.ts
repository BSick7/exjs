/// <reference path="enumerable.ts" />
/// <reference path="array.ts" />

module exjs {
    function groupByEnumerator<T, TKey>(prev: IEnumerable<T>, keySelector: (t: T) => TKey, comparer?: (k1: TKey, k2: TKey) => boolean): IEnumerator<IGrouping<TKey, T>> {
        var grps: IGrouping<TKey, T>[];
        var i = 0;
        var e = {
            current: undefined,
            moveNext: function (): boolean {
                if (!grps) grps = createGroups<TKey, T>(prev, keySelector, comparer);
                e.current = undefined;
                if (i >= grps.length)
                    return false;
                e.current = grps[i];
                i++;
                return true;
            }
        };
        return e;
    }

    function createGroups<TKey, TElement>(prev: IEnumerable<TElement>, keySelector: (t: TElement) => TKey, comparer?: (k1: TKey, k2: TKey) => boolean): IGrouping<TKey, TElement>[] {
        comparer = comparer || function (k1, k2) {
            return k1 === k2;
        };
        var grps: Group<TKey, TElement>[] = [];
        var keys: TKey[] = [];

        var e = prev.getEnumerator();
        var key: TKey;
        while (e.moveNext()) {
            key = keySelector(e.current);
            var index = -1;
            for (var i = 0, len = keys.length; i < len; i++) {
                if (comparer(key, keys[i])) {
                    index = i;
                    break;
                }
            }
            var grp: Group<TKey, TElement>;
            if (index < 0) {
                keys.push(key);
                grps.push(grp = new Group<TKey, TElement>(key));
            } else {
                grp = grps[index];
            }
            grp._add(e.current);
        }

        return grps;
    }

    class Group<TKey, TElement> extends Enumerable<TElement> implements IGrouping<TKey, TElement> {
        private _arr: TElement[] = [];

        constructor (public key: TKey) {
            super();
            this.getEnumerator = () => this._arr.en().getEnumerator();
        }

        _add (e: TElement) {
            this._arr.push(e);
        }
    }

    var fn = Enumerable.prototype;
    fn.groupBy = function<T, TKey>(keySelector: (t: T) => TKey, comparer?: (k1: TKey, k2: TKey) => boolean): IEnumerable<IGrouping<TKey, T>> {
        var e = new Enumerable<IGrouping<TKey, T>>();
        e.getEnumerator = () => groupByEnumerator<T, TKey>(<IEnumerable<T>>this, keySelector, comparer);
        return e;
    };
}