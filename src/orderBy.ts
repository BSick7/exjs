/// <reference path="enumerable.ts" />

module arrayexjs {
    function orderByEnumerable<T, TKey>(source: IEnumerable<T>, keySelector: (t: T) => TKey, isDescending: boolean, comparer?: (f: TKey, s: TKey) => number): IOrderedEnumerable<T> {
        return new OrderedEnumerable<T, TKey>(source, keySelector, isDescending, comparer);
    }

    class OrderedEnumerable<T, TKey> extends Enumerable<T> implements IOrderedEnumerable<T> {
        Source: IEnumerable<T>;
        Sorter: (a: T, b: T) => number;

        constructor (source: IEnumerable<T>, keySelector: (t: T) => TKey, isDescending: boolean, keyComparer: (f: TKey, s: TKey) => number) {
            super();

            this.Source = source;
            keyComparer = keyComparer || function (f: TKey, s: TKey) {
                return f > s ? 1 : (f < s ? -1 : 0);
            };
            var factor = (isDescending == true) ? -1 : 1;
            this.Sorter = (a, b) => factor * keyComparer(keySelector(a), keySelector(b));
        }

        getEnumerator (): IEnumerator<T> {
            var source = this.Source;
            var sorter = this.Sorter;
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
        }

        thenBy<TInnerKey>(keySelector: (t: T) => TInnerKey, comparer?: (f: TInnerKey, s: TInnerKey) => number): IOrderedEnumerable<T> {
            return new ThenEnumerable<T, TKey, TInnerKey>(this, keySelector, false, comparer);
        }

        thenByDescending<TInnerKey>(keySelector: (t: T) => TInnerKey, comparer?: (f: TInnerKey, s: TInnerKey) => number): IOrderedEnumerable<T> {
            return new ThenEnumerable<T, TKey, TInnerKey>(this, keySelector, true, comparer);
        }
    }

    class ThenEnumerable<T, TParentKey, TKey> extends OrderedEnumerable<T, TKey> {
        constructor (source: OrderedEnumerable<T, TParentKey>, keySelector: (t: T) => TKey, isDescending: boolean, keyComparer: (f: TKey, s: TKey) => number) {
            super(source, keySelector, isDescending, keyComparer);

            var parentSorter = source.Sorter;
            var thisSorter = this.Sorter;
            this.Sorter = (a, b) => parentSorter(a, b) || thisSorter(a, b);
        }
    }

    var fn = Enumerable.prototype;
    fn.orderBy = function<T,TKey>(keySelector: (t: T) => TKey, comparer?: (f: TKey, s: TKey) => number): IOrderedEnumerable<T> {
        return orderByEnumerable(<IEnumerable<T>>this, keySelector, false, comparer);
    };
    fn.orderByDescending = function<T,TKey>(keySelector: (t: T) => TKey, comparer?: (f: TKey, s: TKey) => number): IOrderedEnumerable<T> {
        return orderByEnumerable(<IEnumerable<T>>this, keySelector, true, comparer);
    };
} 