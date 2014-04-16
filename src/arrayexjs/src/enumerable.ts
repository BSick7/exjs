/// <reference path="array.ts" />
/// <reference path="concat.ts" />
/// <reference path="distinct.ts" />
/// <reference path="except.ts" />
/// <reference path="groupBy.ts" />
/// <reference path="intersect.ts" />
/// <reference path="join.ts" />
/// <reference path="orderBy.ts" />
/// <reference path="reverse.ts" />
/// <reference path="orderBy.ts" />
/// <reference path="reverse.ts" />
/// <reference path="select.ts" />
/// <reference path="skip.ts" />
/// <reference path="take.ts" />
/// <reference path="union.ts" />
/// <reference path="where.ts" />
/// <reference path="zip.ts" />

module arrayexjs {
    export interface IEnumerable<T> {
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
        //toDictionary();
        union(second: IEnumerable<T>, comparer?: (f: T, s: T) => boolean): IEnumerable<T>;
        where(filter: (t: T) => boolean): IEnumerable<T>;
        zip<TSecond, TResult>(second: IEnumerable<TSecond>, resultSelector: (f: T, s: TSecond) => TResult): IEnumerable<TResult>;
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
        key: TKey;
    }

    export class Enumerable<T> implements IEnumerable<T> {
        getEnumerator(): IEnumerator<T> {
            return {
                moveNext: function () {
                    return false;
                },
                current: undefined
            };
        }
        all(predicate?: (t: T, index?: number) => boolean): boolean {
            if (predicate) {
                var e = this.getEnumerator();
                var i = 0;
                while (e.moveNext()) {
                    if (!predicate(e.current, i))
                        return false;
                    i++;
                }
            }
            return true;
        }
        any(predicate?: (t: T, index?: number) => boolean): boolean {
            predicate = predicate || function () { return true; };
            var e = this.getEnumerator();
            var i = 0;
            while (e.moveNext()) {
                if (predicate(e.current, i))
                    return true;
                i++;
            }
            return i === 0;
        }
        at(index: number): T {
            var e = this.getEnumerator();
            var i = 0;
            while (e.moveNext()) {
                if (i === index)
                    return e.current;
                i++;
            }
            return undefined;
        }
        average(selector?: (t: T) => number): number {
            var count = 0;
            var total = 0;
            selector = selector || function (t: T): number {
                if (typeof t !== "number") throw new Error("Object is not a number.");
                return <number><any>t;
            };
            var e = this.getEnumerator();
            while (e.moveNext()) {
                total += selector(e.current);
                count++;
            }
            if (count === 0) return 0;
            return total / count;
        }
        concat(second: IEnumerable<T>): IEnumerable<T> {
            var e = new Enumerable<T>();
            e.getEnumerator = () => concatEnumerator(this, second);
            return e;
        }
        count(predicate?: (t: T) => boolean): number {
            var count = 0;
            var e = this.getEnumerator();
            while (e.moveNext()) {
                if (!predicate || predicate(e.current))
                    count++;
            }
            return count;
        }
        distinct(comparer?: (f: T, s: T) => boolean): IEnumerable<T> {
            var e = new Enumerable<T>();
            e.getEnumerator = () => distinctEnumerator(this, comparer);
            return e;
        }
        except(second: IEnumerable<T>, comparer?: (f: T, s: T) => boolean): IEnumerable<T> {
            var e = new Enumerable<T>();
            e.getEnumerator = () => exceptEnumerator(this, second, comparer);
            return e;
        }
        first(match?: (t: T) => boolean): T {
            var e = this.getEnumerator();
            while (e.moveNext()) {
                if (!match || match(e.current))
                    return e.current;
            }
            return undefined;
        }
        groupBy<TKey>(keySelector: (t: T) => TKey, comparer?: (k1: TKey, k2: TKey) => boolean): IEnumerable<IGrouping<TKey, T>> {
            var e = new Enumerable<IGrouping<TKey, T>>();
            e.getEnumerator = () => groupByEnumerator<T, TKey>(this, keySelector, comparer);
            return e;
        }
        intersect(second: IEnumerable<T>, comparer?: (f: T, s: T) => boolean): IEnumerable<T> {
            var e = new Enumerable<T>();
            e.getEnumerator = () => intersectEnumerator(this, second, comparer);
            return e;
        }
        join<TInner, TKey, TResult>(inner: IEnumerable<TInner>, outerKeySelector: (t: T) => TKey, innerKeySelector: (t: TInner) => TKey, resultSelector: (o: T, i: TInner) => TResult, comparer?: (k1: TKey, k2: TKey) => boolean): IEnumerable<TResult> {
            var e = new Enumerable<TResult>();
            e.getEnumerator = () => joinEnumerator<T, TInner, TKey, TResult>(this, inner, outerKeySelector, innerKeySelector, resultSelector, comparer);
            return e;
        }
        last(match?: (t: T) => boolean): T {
            var e = this.getEnumerator();
            var l: T;
            while (e.moveNext()) {
                if (!match || match(e.current))
                    l = e.current;
            }
            return l;
        }
        max(selector?: (t: T) => number): number {
            var e = this.getEnumerator();
            if (!e.moveNext())
                return 0;
            selector = selector || function (t: T): number {
                if (typeof t !== "number") throw new Error("Object is not a number.");
                return <number><any>t;
            };
            var max = selector(e.current);
            while (e.moveNext()) {
                max = Math.max(max, selector(e.current));
            }
            return max;
        }
        min(selector?: (t: T) => number): number {
            var e = this.getEnumerator();
            if (!e.moveNext())
                return 0;
            selector = selector || function (t: T): number {
                if (typeof t !== "number") throw new Error("Object is not a number.");
                return <number><any>t;
            };
            var min = selector(e.current);
            while (e.moveNext()) {
                min = Math.min(min, selector(e.current));
            }
            return min;
        }
        orderBy<TKey>(keySelector: (t: T) => TKey, comparer?: (f: TKey, s: TKey) => number): IOrderedEnumerable<T> {
            return orderByEnumerable(this, keySelector, false, comparer);
        }
        orderByDescending<TKey>(keySelector: (t: T) => TKey, comparer?: (f: TKey, s: TKey) => number): IOrderedEnumerable<T> {
            return orderByEnumerable(this, keySelector, true, comparer);
        }
        reverse(): IEnumerable<T> {
            var e = new Enumerable<T>();
            e.getEnumerator = () => reverseEnumerator(this);
            return e;
        }
        select<TResult>(selector: (t: T, index?: number) => TResult): IEnumerable<TResult> {
            var e = new Enumerable<TResult>();
            e.getEnumerator = () => selectEnumerator(this, selector);
            return e;
        }
        selectMany<TResult>(selector: (t: T) => IEnumerable<TResult>): IEnumerable<TResult> {
            var e = new Enumerable<TResult>();
            e.getEnumerator = () => selectManyEnumerator<T, TResult>(this, selector);
            return e;
        }
        skip(count: number): IEnumerable<T> {
            var e = new Enumerable<T>();
            e.getEnumerator = () => skipEnumerator(this, count);
            return e;
        }
        skipWhile(predicate: (t: T, index?: number) => boolean): IEnumerable<T> {
            var e = new Enumerable<T>();
            e.getEnumerator = () => skipWhileEnumerator(this, predicate);
            return e;
        }
        sum(selector?: (t: T) => number): number {
            var sum = 0;
            selector = selector || function (t: T): number {
                if (typeof t !== "number") throw new Error("Object is not a number.");
                return <number><any>t;
            };
            var e = this.getEnumerator();
            while (e.moveNext()) {
                sum += selector(e.current);
            }
            return sum;
        }
        take(count: number): IEnumerable<T> {
            var e = new Enumerable<T>();
            e.getEnumerator = () => takeEnumerator(this, count);
            return e;
        }
        takeWhile(predicate: (t: T, index?: number) => boolean): IEnumerable<T> {
            var e = new Enumerable<T>();
            e.getEnumerator = () => takeWhileEnumerator(this, predicate);
            return e;
        }
        toArray(): T[] {
            var arr: T[] = [];
            var enumerator = this.getEnumerator();
            while (enumerator.moveNext()) {
                arr.push(enumerator.current);
            }
            return arr;
        }
        //toDictionary() {
        //}
        union(second: IEnumerable<T>, comparer?: (f: T, s: T) => boolean): IEnumerable<T> {
            var e = new Enumerable<T>();
            e.getEnumerator = () => unionEnumerator(this, second, comparer);
            return e;
        }
        where(filter: (t: T) => boolean): IEnumerable<T> {
            var e = new Enumerable<T>();
            e.getEnumerator = () => whereEnumerator(this, filter);
            return e;
        }
        zip<TSecond, TResult>(second: IEnumerable<TSecond>, resultSelector: (f: T, s: TSecond) => TResult): IEnumerable<TResult> {
            var e = new Enumerable<TResult>();
            e.getEnumerator = () => zipEnumerator<T, TSecond, TResult>(this, second, resultSelector);
            return e;
        }
    }

    export function _<T>(o: any): IEnumerable<T> {
        if (o && o instanceof Array)
            return new ArrayEnumerable<T>(o);
        return new Enumerable<T>();
    }
}

var _ = arrayexjs._;