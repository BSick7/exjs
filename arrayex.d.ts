declare module arrayexjs {
    class ArrayEnumerable<T> extends Enumerable<T> {
        constructor(arr: T[]);
    }
}
declare module arrayexjs {
    function concatEnumerator<T>(prev: IEnumerable<T>, second: IEnumerable<T>): IEnumerator<T>;
}
declare module arrayexjs {
    function distinctEnumerator<T>(prev: IEnumerable<T>, comparer?: (f: T, s: T) => boolean): IEnumerator<T>;
}
declare module arrayexjs {
    function exceptEnumerator<T>(prev: IEnumerable<T>, second: IEnumerable<T>, comparer?: (f: T, s: T) => boolean): IEnumerator<T>;
}
declare module arrayexjs {
    function groupByEnumerator<T, TKey>(prev: IEnumerable<T>, keySelector: (t: T) => TKey, comparer?: (k1: TKey, k2: TKey) => boolean): IEnumerator<IGrouping<TKey, T>>;
}
declare module arrayexjs {
    function intersectEnumerator<T>(prev: IEnumerable<T>, second: IEnumerable<T>, comparer?: (f: T, s: T) => boolean): IEnumerator<T>;
}
declare module arrayexjs {
    function joinEnumerator<TOuter, TInner, TKey, TResult>(prev: IEnumerable<TOuter>, inner: IEnumerable<TInner>, outerKeySelector: (t: TOuter) => TKey, innerKeySelector: (t: TInner) => TKey, resultSelector: (tout: TOuter, tin: TInner) => TResult, comparer?: (k1: TKey, k2: TKey) => boolean): IEnumerator<TResult>;
}
declare module arrayexjs {
    function orderByEnumerable<T, TKey>(source: IEnumerable<T>, keySelector: (t: T) => TKey, isDescending: boolean, comparer?: (f: TKey, s: TKey) => number): IOrderedEnumerable<T>;
}
declare module arrayexjs {
    function reverseEnumerator<T>(prev: IEnumerable<T>): IEnumerator<T>;
}
declare module arrayexjs {
    function selectEnumerator<T, TResult>(prev: IEnumerable<T>, selector: (t: T, index?: number) => TResult): IEnumerator<TResult>;
    function selectManyEnumerator<T, TResult>(prev: IEnumerable<T>, selector: (t: T) => IEnumerable<TResult>): IEnumerator<TResult>;
}
declare module arrayexjs {
    function skipEnumerator<T>(prev: IEnumerable<T>, count: number): IEnumerator<T>;
    function skipWhileEnumerator<T>(prev: IEnumerable<T>, predicate: (t: T, index?: number) => boolean): IEnumerator<T>;
}
declare module arrayexjs {
    function takeEnumerator<T>(prev: IEnumerable<T>, count: number): IEnumerator<T>;
    function takeWhileEnumerator<T>(prev: IEnumerable<T>, predicate: (t: T, index?: number) => boolean): IEnumerator<T>;
}
declare module arrayexjs {
    function unionEnumerator<T>(prev: IEnumerable<T>, second: IEnumerable<T>, comparer?: (f: T, s: T) => boolean): IEnumerator<T>;
}
declare module arrayexjs {
    function whereEnumerator<T>(prev: IEnumerable<T>, filter: (t: T) => boolean): IEnumerator<T>;
}
declare module arrayexjs {
    function zipEnumerator<T, TSecond, TResult>(prev: IEnumerable<T>, second: IEnumerable<TSecond>, resultSelector: (f: T, s: TSecond) => TResult): IEnumerator<TResult>;
}
declare module arrayexjs {
    interface IEnumerable<T> {
        getEnumerator(): IEnumerator<T>;
        all(predicate?: (t: T, index?: number) => boolean): boolean;
        any(predicate?: (t: T, index?: number) => boolean): boolean;
        at(index: number): T;
        average(selector?: (t: T) => number): number;
        concat(second: IEnumerable<T>): IEnumerable<T>;
        count(predicate?: (t: T) => boolean): number;
        distinct(comparer?: (f: T, s: T) => boolean): IEnumerable<T>;
        except(second: IEnumerable<T>, comparer?: (f: T, s: T) => boolean): IEnumerable<T>;
        first(match?: (t: T) => boolean): T;
        groupBy<TKey>(keySelector: (t: T) => TKey, comparer?: (k1: TKey, k2: TKey) => boolean): IEnumerable<IGrouping<TKey, T>>;
        intersect(second: IEnumerable<T>, comparer?: (f: T, s: T) => boolean): IEnumerable<T>;
        join<TInner, TKey, TResult>(inner: IEnumerable<TInner>, outerKeySelector: (t: T) => TKey, innerKeySelector: (t: TInner) => TKey, resultSelector: (o: T, i: TInner) => TResult, comparer?: (k1: TKey, k2: TKey) => boolean): IEnumerable<TResult>;
        last(match?: (t: T) => boolean): T;
        max(selector?: (t: T) => number): number;
        min(selector?: (t: T) => number): number;
        orderBy<TKey>(keySelector: (t: T) => TKey, comparer?: (f: TKey, s: TKey) => number): IOrderedEnumerable<T>;
        orderByDescending<TKey>(keySelector: (t: T) => TKey, comparer?: (f: TKey, s: TKey) => number): IOrderedEnumerable<T>;
        reverse(): IEnumerable<T>;
        select<TResult>(selector: (t: T, index?: number) => TResult): IEnumerable<TResult>;
        selectMany<TResult>(selector: (t: T) => IEnumerable<TResult>): IEnumerable<TResult>;
        skip(count: number): IEnumerable<T>;
        skipWhile(predicate: (t: T, index?: number) => boolean): IEnumerable<T>;
        sum(selector?: (t: T) => number): number;
        take(count: number): IEnumerable<T>;
        takeWhile(predicate: (t: T, index?: number) => boolean): IEnumerable<T>;
        toArray(): T[];
        union(second: IEnumerable<T>, comparer?: (f: T, s: T) => boolean): IEnumerable<T>;
        where(filter: (t: T) => boolean): IEnumerable<T>;
        zip<TSecond, TResult>(second: IEnumerable<TSecond>, resultSelector: (f: T, s: TSecond) => TResult): IEnumerable<TResult>;
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
        public at(index: number): T;
        public average(selector?: (t: T) => number): number;
        public concat(second: IEnumerable<T>): IEnumerable<T>;
        public count(predicate?: (t: T) => boolean): number;
        public distinct(comparer?: (f: T, s: T) => boolean): IEnumerable<T>;
        public except(second: IEnumerable<T>, comparer?: (f: T, s: T) => boolean): IEnumerable<T>;
        public first(match?: (t: T) => boolean): T;
        public groupBy<TKey>(keySelector: (t: T) => TKey, comparer?: (k1: TKey, k2: TKey) => boolean): IEnumerable<IGrouping<TKey, T>>;
        public intersect(second: IEnumerable<T>, comparer?: (f: T, s: T) => boolean): IEnumerable<T>;
        public join<TInner, TKey, TResult>(inner: IEnumerable<TInner>, outerKeySelector: (t: T) => TKey, innerKeySelector: (t: TInner) => TKey, resultSelector: (o: T, i: TInner) => TResult, comparer?: (k1: TKey, k2: TKey) => boolean): IEnumerable<TResult>;
        public last(match?: (t: T) => boolean): T;
        public max(selector?: (t: T) => number): number;
        public min(selector?: (t: T) => number): number;
        public orderBy<TKey>(keySelector: (t: T) => TKey, comparer?: (f: TKey, s: TKey) => number): IOrderedEnumerable<T>;
        public orderByDescending<TKey>(keySelector: (t: T) => TKey, comparer?: (f: TKey, s: TKey) => number): IOrderedEnumerable<T>;
        public reverse(): IEnumerable<T>;
        public select<TResult>(selector: (t: T, index?: number) => TResult): IEnumerable<TResult>;
        public selectMany<TResult>(selector: (t: T) => IEnumerable<TResult>): IEnumerable<TResult>;
        public skip(count: number): IEnumerable<T>;
        public skipWhile(predicate: (t: T, index?: number) => boolean): IEnumerable<T>;
        public sum(selector?: (t: T) => number): number;
        public take(count: number): IEnumerable<T>;
        public takeWhile(predicate: (t: T, index?: number) => boolean): IEnumerable<T>;
        public toArray(): T[];
        public union(second: IEnumerable<T>, comparer?: (f: T, s: T) => boolean): IEnumerable<T>;
        public where(filter: (t: T) => boolean): IEnumerable<T>;
        public zip<TSecond, TResult>(second: IEnumerable<TSecond>, resultSelector: (f: T, s: TSecond) => TResult): IEnumerable<TResult>;
    }
    function _<T>(o: any): IEnumerable<T>;
}
declare var _: typeof arrayexjs._;
