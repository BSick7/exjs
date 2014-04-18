declare module arrayexjs {
    interface IEnumerable<T> {
        getEnumerator(): IEnumerator<T>;
        all(predicate?: (t: T, index?: number) => boolean): boolean;
        any(predicate?: (t: T, index?: number) => boolean): boolean;
        at(index: number): T;
        average(selector?: (t: T) => number): number;
        concat(second: IEnumerable<T>): IEnumerable<T>;
        concat(second: T[]): IEnumerable<T>;
        count(predicate?: (t: T) => boolean): number;
        distinct(comparer?: (f: T, s: T) => boolean): IEnumerable<T>;
        except(second: IEnumerable<T>, comparer?: (f: T, s: T) => boolean): IEnumerable<T>;
        except(second: T[], comparer?: (f: T, s: T) => boolean): IEnumerable<T>;
        first(match?: (t: T) => boolean): T;
        groupBy<TKey>(keySelector: (t: T) => TKey, comparer?: (k1: TKey, k2: TKey) => boolean): IEnumerable<IGrouping<TKey, T>>;
        intersect(second: IEnumerable<T>, comparer?: (f: T, s: T) => boolean): IEnumerable<T>;
        intersect(second: T[], comparer?: (f: T, s: T) => boolean): IEnumerable<T>;
        join<TInner, TKey, TResult>(inner: IEnumerable<TInner>, outerKeySelector: (t: T) => TKey, innerKeySelector: (t: TInner) => TKey, resultSelector: (o: T, i: TInner) => TResult, comparer?: (k1: TKey, k2: TKey) => boolean): IEnumerable<TResult>;
        join<TInner, TKey, TResult>(inner: TInner[], outerKeySelector: (t: T) => TKey, innerKeySelector: (t: TInner) => TKey, resultSelector: (o: T, i: TInner) => TResult, comparer?: (k1: TKey, k2: TKey) => boolean): IEnumerable<TResult>;
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
        union(second: T[], comparer?: (f: T, s: T) => boolean): IEnumerable<T>;
        where(filter: (t: T) => boolean): IEnumerable<T>;
        zip<TSecond, TResult>(second: IEnumerable<TSecond>, resultSelector: (f: T, s: TSecond) => TResult): IEnumerable<TResult>;
        zip<TSecond, TResult>(second: TSecond[], resultSelector: (f: T, s: TSecond) => TResult): IEnumerable<TResult>;
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
        constructor();
        public getEnumerator(): IEnumerator<T>;
        public all(predicate?: (t: T, index?: number) => boolean): boolean;
        public any(predicate?: (t: T, index?: number) => boolean): boolean;
        public at(index: number): T;
        public average(selector?: (t: T) => number): number;
        public concat(second: IEnumerable<T>): IEnumerable<T>;
        public concat(second: T[]): IEnumerable<T>;
        public count(predicate?: (t: T) => boolean): number;
        public distinct(comparer?: (f: T, s: T) => boolean): IEnumerable<T>;
        public except(second: IEnumerable<T>, comparer?: (f: T, s: T) => boolean): IEnumerable<T>;
        public except(second: T[], comparer?: (f: T, s: T) => boolean): IEnumerable<T>;
        public first(match?: (t: T) => boolean): T;
        public groupBy<TKey>(keySelector: (t: T) => TKey, comparer?: (k1: TKey, k2: TKey) => boolean): IEnumerable<IGrouping<TKey, T>>;
        public intersect(second: IEnumerable<T>, comparer?: (f: T, s: T) => boolean): IEnumerable<T>;
        public intersect(second: T[], comparer?: (f: T, s: T) => boolean): IEnumerable<T>;
        public join<TInner, TKey, TResult>(inner: IEnumerable<TInner>, outerKeySelector: (t: T) => TKey, innerKeySelector: (t: TInner) => TKey, resultSelector: (o: T, i: TInner) => TResult, comparer?: (k1: TKey, k2: TKey) => boolean): IEnumerable<TResult>;
        public join<TInner, TKey, TResult>(inner: TInner[], outerKeySelector: (t: T) => TKey, innerKeySelector: (t: TInner) => TKey, resultSelector: (o: T, i: TInner) => TResult, comparer?: (k1: TKey, k2: TKey) => boolean): IEnumerable<TResult>;
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
        public union(second: T[], comparer?: (f: T, s: T) => boolean): IEnumerable<T>;
        public where(filter: (t: T) => boolean): IEnumerable<T>;
        public zip<TSecond, TResult>(second: IEnumerable<TSecond>, resultSelector: (f: T, s: TSecond) => TResult): IEnumerable<TResult>;
        public zip<TSecond, TResult>(second: TSecond[], resultSelector: (f: T, s: TSecond) => TResult): IEnumerable<TResult>;
    }
}
interface Array<T> {
    en(): arrayexjs.IEnumerable<T>;
}
declare module arrayexjs {
    function _<T>(o: any): IEnumerable<T>;
}
declare module arrayexjs {
}
declare module arrayexjs {
}
declare module arrayexjs {
}
declare module arrayexjs {
}
declare module arrayexjs {
}
declare module arrayexjs {
}
declare module arrayexjs {
}
declare module arrayexjs {
}
declare module arrayexjs {
}
declare module arrayexjs {
}
declare module arrayexjs {
}
declare module arrayexjs {
}
declare module arrayexjs {
}
declare module arrayexjs {
}
