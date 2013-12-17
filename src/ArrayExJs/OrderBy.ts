module arrayexjs {
    export function orderByEnumerable<T, TKey>(source:IEnumerable<T>, keySelector: (t: T) => TKey, isDescending: boolean, comparer?: (f: TKey, s: TKey) => number): IOrderedEnumerable<T> {
        return new OrderedEnumerable<T, TKey>(source, keySelector, isDescending, comparer);
    }

    class OrderedEnumerable<T, TKey> extends Enumerable<T> implements IOrderedEnumerable<T> {
        constructor(source: IEnumerable<T>, keySelector: (t: T) => TKey, isDescending: boolean, comparer?: (f: TKey, s: TKey) => number) {
            super();

            comparer = comparer || function (f: TKey, s: TKey) { return f > s ? 1 : (f < s ? -1 : 0); };
            var sorter: (a: T, b: T) => number;
            if (isDescending === true) {
                sorter = (a, b) => -1 * comparer(keySelector(a), keySelector(b));
            } else {
                sorter = (a, b) => comparer(keySelector(a), keySelector(b));
            }

            this.group = () => {
                var grps = source.groupBy(keySelector).toArray();
                if (isDescending)
                    grps.sort((grp1, grp2) => -1 * comparer(grp1.key, grp2.key));
                else
                    grps.sort((grp1, grp2) => comparer(grp1.key, grp2.key));
                return grps;
            };
            this.getEnumerator = () => {
                var arr: T[];
                var i = 0;
                var e = {
                    current: undefined,
                    moveNext: function (): boolean {
                        if (!arr) {
                            arr = source.toArray();
                            arr.sort(sorter);
                        }
                        e.current = undefined;
                        if (i >= arr.length)
                            return false;
                        e.current = arr[i];
                        i++;
                        return true;
                    }
                };
                return e;
            };
        }

        group(): IGrouping<TKey, T>[] { return []; }
        getEnumerator(): IEnumerator<T> { return null; }

        thenBy<TKey>(keySelector: (t: T) => TKey, comparer?: (f: TKey, s: TKey) => number): IOrderedEnumerable<T> {
            return null;
        }

        thenByDescending<TKey>(keySelector: (t: T) => TKey, comparer?: (f: TKey, s: TKey) => number): IOrderedEnumerable<T> {
            return null;
        }
    }
} 