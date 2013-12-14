declare module arrayexjs {
    interface IEnumerable<T> {
        getEnumerator(): IEnumerator<T>;
        all(predicate?: (t: T, index?: number) => boolean): boolean;
        any(predicate?: (t: T, index?: number) => boolean): boolean;
        average(selector?: (t: T) => number): number;
        toArray(): T[];
    }
    interface IEnumerator<T> {
        current: T;
        moveNext(): boolean;
    }
    interface IOrderedEnumerable<T> extends IEnumerable<T> {
        thenBy<TKey>(keySelector: (t: T) => TKey, comparer?: (f: TKey, s: TKey) => number): IOrderedEnumerable<T>;
        thenByDescending<TKey>(keySelector: (t: T) => TKey, comparer?: (f: TKey, s: TKey) => number): IOrderedEnumerable<T>;
    }
    interface IGrouping<TKey, TElement> extends IEnumerable<TElement> {
        key: TKey;
    }
    class Enumerable<T> implements IEnumerable<T> {
        public getEnumerator(): IEnumerator<T>;
        public all(predicate?: (t: T, index?: number) => boolean): boolean;
        public any(predicate?: (t: T, index?: number) => boolean): boolean;
        public average(selector?: (t: T) => number): number;
        public toArray(): T[];
    }
    function _<T>(o: any): IEnumerable<T>;
}
declare var _: typeof arrayexjs._;
declare module arrayexjs {
    class ArrayEnumerable<T> extends arrayexjs.Enumerable<T> {
        constructor(arr: T[]);
    }
}
