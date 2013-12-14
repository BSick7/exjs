module arrayexjs {
    export interface IEnumerable<T> {
        //getEnumerator(): IEnumerator<T>;
        //all(predicate?: (t: T, index?: number) => boolean): boolean;
        //any(predicate?: (t: T, index?: number) => boolean): boolean;
        //average(selector?: (t: T) => number): number;
        //concat(): IEnumerable<T>;
        //count(selector?: (t: T) => number): number;
        //distinct(): IEnumerable<T>;
        //at(index: number): T;
        //except(second: IEnumerable<T>, comparer?: (f: T, s: T) => boolean): IEnumerable<T>;
        //first(match?: (t: T) => boolean): T;
        //groupBy<TKey>(): IGrouping<TKey, T>;
        //intersect(second: IEnumerable<T>, comparer?: (f: T, s: T) => boolean): IEnumerable<T>;
        //join<TInner, TKey, TResult>(inner: IEnumerable<TInner>, outerKeySelector: (t: T) => TKey, innerKeySelector: (t: TInner) => TKey, resultSelector: (o: T, i: TInner) => TResult): IEnumerable<TResult>;
        //last(match?: (t: T) => boolean): T;
        //max(selector?: (t: T) => number): number;
        //min(selector?: (t: T) => number): number;
        //orderBy<TKey>(keySelector: (t: T) => TKey, comparer?: (f: TKey, s: TKey) => number): IOrderedEnumerable<T>;
        //orderByDescending<TKey>(keySelector: (t: T) => TKey, comparer?: (f: TKey, s: TKey) => number): IOrderedEnumerable<T>;
        //reverse(): IEnumerable<T>;
        //select<TResult>(selector: (t: T, index?: number) => TResult): IEnumerable<TResult>;
        //selectMany(): IEnumerable<T>;
        //skip(count: number): IEnumerable<T>;
        //skipWhile(predicate: (t: T, index?: number) => boolean): IEnumerable<T>;
        //sum(selector?: (t: T) => number): number;
        //take(count: number): IEnumerable<T>;
        //takeWhile(predicate: (t: T, index?: number) => boolean): IEnumerable<T>;
        //toArray(): T[];
        //toDictionary();
        //union<TSecond>(second: IEnumerable<TSecond>, comparer?: (f: T, s: TSecond) => boolean);
        //where(comparer: (t: T) => boolean): IEnumerable<T>;
        //zip<TSecond, TResult>(second: IEnumerable<TSecond>, resultSelector: (f: T, s: TSecond) => TResult): IEnumerable<TResult>;
    }
    export interface IEnumerator<T> {
        current: T;
        moveNext(): boolean;
    }

    export interface IOrderedEnumerable<T> extends IEnumerable<T> {
        thenBy<TKey>(keySelector: (t: T) => TKey, comparer?: (f: TKey, s: TKey) => number): IOrderedEnumerable<T>;
        thenByDescending<TKey>(keySelector: (t: T) => TKey, comparer?: (f: TKey, s: TKey) => number): IOrderedEnumerable<T>;
    }
    
    export interface IGrouping<TKey, TElement> extends IEnumerable<TElement> {
        //...
    }

    export class Enumerable<T> implements IEnumerable<T> {
        //getEnumerator(): IEnumerator<T> {
        //}
        //all(predicate?: (t: T, index?: number) => boolean): boolean {
        //}
        //any(predicate?: (t: T, index?: number) => boolean): boolean {
        //}
        //average(selector?: (t: T) => number): number {
        //}
        //concat(): IEnumerable<T> {
        //}
        //count(selector?: (t: T) => number): number {
        //}
        //distinct(): IEnumerable<T> {
        //}
        //at(index: number): T {
        //}
        //except(second: IEnumerable<T>, comparer?: (f: T, s: T) => boolean): IEnumerable<T> {
        //}
        //first(match?: (t: T) => boolean): T {
        //}
        //groupBy<TKey>(): IGrouping<TKey, T> {
        //}
        //intersect(second: IEnumerable<T>, comparer?: (f: T, s: T) => boolean): IEnumerable<T> {
        //}
        //join<TInner, TKey, TResult>(inner: IEnumerable<TInner>, outerKeySelector: (t: T) => TKey, innerKeySelector: (t: TInner) => TKey, resultSelector: (o: T, i: TInner) => TResult): IEnumerable<TResult> {
        //}
        //last(match?: (t: T) => boolean): T {
        //}
        //max(selector?: (t: T) => number): number {
        //}
        //min(selector?: (t: T) => number): number {
        //}
        //orderBy<TKey>(keySelector: (t: T) => TKey, comparer?: (f: TKey, s: TKey) => number): IOrderedEnumerable<T> {
        //}
        //orderByDescending<TKey>(keySelector: (t: T) => TKey, comparer?: (f: TKey, s: TKey) => number): IOrderedEnumerable<T> {
        //}
        //reverse(): IEnumerable<T> {
        //}
        //select<TResult>(selector: (t: T, index?: number) => TResult): IEnumerable<TResult> {
        //}
        //selectMany(): IEnumerable<T> {
        //}
        //skip(count: number): IEnumerable<T> {
        //}
        //skipWhile(predicate: (t: T, index?: number) => boolean): IEnumerable<T> {
        //}
        //sum(selector?: (t: T) => number): number {
        //}
        //take(count: number): IEnumerable<T> {
        //}
        //takeWhile(predicate: (t: T, index?: number) => boolean): IEnumerable<T> {
        //}
        //toArray(): T[] {
        //}
        //toDictionary() {
        //}
        //union<TSecond>(second: IEnumerable<TSecond>, comparer?: (f: T, s: TSecond) => boolean) {
        //}
        //where(comparer: (t: T) => boolean): IEnumerable<T> {
        //}
        //zip<TSecond, TResult>(second: IEnumerable<TSecond>, resultSelector: (f: T, s: TSecond) => TResult): IEnumerable<TResult> {
        //}
    }
}

var _ = arrayexjs.Enumerable;