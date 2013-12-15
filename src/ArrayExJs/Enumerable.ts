module arrayexjs {
    export interface IEnumerable<T> {
        getEnumerator(): IEnumerator<T>;
        all(predicate?: (t: T, index?: number) => boolean): boolean;
        any(predicate?: (t: T, index?: number) => boolean): boolean;
        at(index: number): T;
        average(selector?: (t: T) => number): number;
        //concat(): IEnumerable<T>;
        count(predicate?: (t: T) => boolean): number;
        distinct(comparer?: (f: T, s: T) => boolean): IEnumerable<T>;
        //except(second: IEnumerable<T>, comparer?: (f: T, s: T) => boolean): IEnumerable<T>;
        first(match?: (t: T) => boolean): T;
        //groupBy<TKey>(): IGrouping<TKey, T>;
        //intersect(second: IEnumerable<T>, comparer?: (f: T, s: T) => boolean): IEnumerable<T>;
        //join<TInner, TKey, TResult>(inner: IEnumerable<TInner>, outerKeySelector: (t: T) => TKey, innerKeySelector: (t: TInner) => TKey, resultSelector: (o: T, i: TInner) => TResult): IEnumerable<TResult>;
        last(match?: (t: T) => boolean): T;
        max(selector?: (t: T) => number): number;
        min(selector?: (t: T) => number): number;
        //orderBy<TKey>(keySelector: (t: T) => TKey, comparer?: (f: TKey, s: TKey) => number): IOrderedEnumerable<T>;
        //orderByDescending<TKey>(keySelector: (t: T) => TKey, comparer?: (f: TKey, s: TKey) => number): IOrderedEnumerable<T>;
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
        //union<TSecond>(second: IEnumerable<TSecond>, comparer?: (f: T, s: TSecond) => boolean);
        where(filter: (t: T) => boolean): IEnumerable<T>;
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
        //concat(): IEnumerable<T> {
        //}
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
        //except(second: IEnumerable<T>, comparer?: (f: T, s: T) => boolean): IEnumerable<T> {
        //}
        first(match?: (t: T) => boolean): T {
            var e = this.getEnumerator();
            while (e.moveNext()) {
                if (!match || match(e.current))
                    return e.current;
            }
            return undefined;
        }
        //groupBy<TKey>(): IGrouping<TKey, T> {
        //}
        //intersect(second: IEnumerable<T>, comparer?: (f: T, s: T) => boolean): IEnumerable<T> {
        //}
        //join<TInner, TKey, TResult>(inner: IEnumerable<TInner>, outerKeySelector: (t: T) => TKey, innerKeySelector: (t: TInner) => TKey, resultSelector: (o: T, i: TInner) => TResult): IEnumerable<TResult> {
        //}
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
        //orderBy<TKey>(keySelector: (t: T) => TKey, comparer?: (f: TKey, s: TKey) => number): IOrderedEnumerable<T> {
        //}
        //orderByDescending<TKey>(keySelector: (t: T) => TKey, comparer?: (f: TKey, s: TKey) => number): IOrderedEnumerable<T> {
        //}
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
        //union<TSecond>(second: IEnumerable<TSecond>, comparer?: (f: T, s: TSecond) => boolean) {
        //}
        where(filter: (t: T) => boolean): IEnumerable<T> {
            var e = new Enumerable<T>();
            e.getEnumerator = () => whereEnumerator(this, filter);
            return e;
        }
        //zip<TSecond, TResult>(second: IEnumerable<TSecond>, resultSelector: (f: T, s: TSecond) => TResult): IEnumerable<TResult> {
        //}
    }

    export function _<T>(o: any): IEnumerable<T> {
        if (o && o instanceof Array)
            return new ArrayEnumerable<T>(o);
        return new Enumerable<T>();
    }
}

var _ = arrayexjs._;