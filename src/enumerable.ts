module exjs {
    export interface IEnumerable<T> {
        getEnumerator(): IEnumerator<T>;
        aggregate<TAccumulate>(seed: TAccumulate, accumulator: (acc: TAccumulate, cur: T) => TAccumulate): TAccumulate;
        all(predicate?: (t: T, index?: number) => boolean): boolean;
        any(predicate?: (t: T, index?: number) => boolean): boolean;
        apply<T>(action: (t: T, index?: number) => void): IEnumerable<T>;
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
        selectMany<TResult>(selector: (t: T) => TResult[]): IEnumerable<TResult>;
        skip(count: number): IEnumerable<T>;
        skipWhile(predicate: (t: T, index?: number) => boolean): IEnumerable<T>;
        sum(selector?: (t: T) => number): number;
        take(count: number): IEnumerable<T>;
        takeWhile(predicate: (t: T, index?: number) => boolean): IEnumerable<T>;
        toArray(): T[];
        toList(): IList<T>;
        //toDictionary();
        union(second: IEnumerable<T>, comparer?: (f: T, s: T) => boolean): IEnumerable<T>;
        union(second: T[], comparer?: (f: T, s: T) => boolean): IEnumerable<T>;
        where(filter: (t: T) => boolean): IEnumerable<T>;
        zip<TSecond, TResult>(second: IEnumerable<TSecond>, resultSelector: (f: T, s: TSecond) => TResult): IEnumerable<TResult>;
        zip<TSecond, TResult>(second: TSecond[], resultSelector: (f: T, s: TSecond) => TResult): IEnumerable<TResult>;
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

    export interface IList<T> extends IEnumerable<T> {
        length: number;
        [n: number]: T;
    }

    export class Enumerable<T> implements IEnumerable<T> {
        constructor() { }

        getEnumerator(): IEnumerator<T> {
            return {
                moveNext: function () {
                    return false;
                },
                current: undefined
            };
        }

        aggregate<TAccumulate>(seed: TAccumulate, accumulator: (acc: TAccumulate, cur: T) => TAccumulate): TAccumulate {
            var active = seed;
            for (var enumerator = this.getEnumerator(); enumerator.moveNext(); ) {
                active = accumulator(active, enumerator.current);
            }
            return active;
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
        apply<T>(action: (t: T, index?: number) => void): IEnumerable<T> { throw new Error("Not implemented"); }
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

        concat(second: IEnumerable<T>): IEnumerable<T>;
        concat(second: T[]): IEnumerable<T>;
        concat(second: any): IEnumerable<T> { throw new Error("Not implemented"); }

        count(predicate?: (t: T) => boolean): number {
            var count = 0;
            var e = this.getEnumerator();
            while (e.moveNext()) {
                if (!predicate || predicate(e.current))
                    count++;
            }
            return count;
        }
        distinct(comparer?: (f: T, s: T) => boolean): IEnumerable<T> { throw new Error("Not implemented"); }

        except(second: IEnumerable<T>, comparer?: (f: T, s: T) => boolean): IEnumerable<T>;
        except(second: T[], comparer?: (f: T, s: T) => boolean): IEnumerable<T>;
        except(second: any, comparer?: (f: T, s: T) => boolean): IEnumerable<T> { throw new Error("Not implemented"); }

        first(match?: (t: T) => boolean): T {
            var e = this.getEnumerator();
            while (e.moveNext()) {
                if (!match || match(e.current))
                    return e.current;
            }
            return undefined;
        }
        groupBy<TKey>(keySelector: (t: T) => TKey, comparer?: (k1: TKey, k2: TKey) => boolean): IEnumerable<IGrouping<TKey, T>> { throw new Error("Not implemented"); }

        intersect(second: IEnumerable<T>, comparer?: (f: T, s: T) => boolean): IEnumerable<T>;
        intersect(second: T[], comparer?: (f: T, s: T) => boolean): IEnumerable<T>;
        intersect(second: any, comparer?: (f: T, s: T) => boolean): IEnumerable<T> { throw new Error("Not implemented"); }

        join<TInner, TKey, TResult>(inner: IEnumerable<TInner>, outerKeySelector: (t: T) => TKey, innerKeySelector: (t: TInner) => TKey, resultSelector: (o: T, i: TInner) => TResult, comparer?: (k1: TKey, k2: TKey) => boolean): IEnumerable<TResult>;
        join<TInner, TKey, TResult>(inner: TInner[], outerKeySelector: (t: T) => TKey, innerKeySelector: (t: TInner) => TKey, resultSelector: (o: T, i: TInner) => TResult, comparer?: (k1: TKey, k2: TKey) => boolean): IEnumerable<TResult>;
        join<TInner, TKey, TResult>(inner: any, outerKeySelector: (t: T) => TKey, innerKeySelector: (t: TInner) => TKey, resultSelector: (o: T, i: TInner) => TResult, comparer?: (k1: TKey, k2: TKey) => boolean): IEnumerable<TResult> { throw new Error("Not implemented"); }

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
        orderBy<TKey>(keySelector: (t: T) => TKey, comparer?: (f: TKey, s: TKey) => number): IOrderedEnumerable<T> { throw new Error("Not implemented"); }
        orderByDescending<TKey>(keySelector: (t: T) => TKey, comparer?: (f: TKey, s: TKey) => number): IOrderedEnumerable<T> { throw new Error("Not implemented"); }
        reverse(): IEnumerable<T> { throw new Error("Not implemented"); }
        select<TResult>(selector: (t: T, index?: number) => TResult): IEnumerable<TResult> { throw new Error("Not implemented"); }

        selectMany<TResult>(selector: (t: T) => IEnumerable<TResult>): IEnumerable<TResult>;
        selectMany<TResult>(selector: (t: T) => TResult[]): IEnumerable<TResult>;
        selectMany<TResult>(selector: (t: T) => any): IEnumerable<TResult> { throw new Error("Not implemented"); }

        skip(count: number): IEnumerable<T> { throw new Error("Not implemented"); }
        skipWhile(predicate: (t: T, index?: number) => boolean): IEnumerable<T> { throw new Error("Not implemented"); }
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
        take(count: number): IEnumerable<T> { throw new Error("Not implemented"); }
        takeWhile(predicate: (t: T, index?: number) => boolean): IEnumerable<T> { throw new Error("Not implemented"); }
        toArray(): T[] {
            var arr: T[] = [];
            var enumerator = this.getEnumerator();
            while (enumerator.moveNext()) {
                arr.push(enumerator.current);
            }
            return arr;
        }
        toList(): IList<T> { throw new Error("Not implemented"); }
        //toDictionary() {
        //}

        union(second: IEnumerable<T>, comparer?: (f: T, s: T) => boolean): IEnumerable<T>;
        union(second: T[], comparer?: (f: T, s: T) => boolean): IEnumerable<T>;
        union(second: any, comparer?: (f: T, s: T) => boolean): IEnumerable<T> { throw new Error("Not implemented"); }

        where(filter: (t: T) => boolean): IEnumerable<T> { throw new Error("Not implemented"); }

        zip<TSecond, TResult>(second: IEnumerable<TSecond>, resultSelector: (f: T, s: TSecond) => TResult): IEnumerable<TResult>;
        zip<TSecond, TResult>(second: TSecond[], resultSelector: (f: T, s: TSecond) => TResult): IEnumerable<TResult>;
        zip<TSecond, TResult>(second: any, resultSelector: (f: T, s: TSecond) => TResult): IEnumerable<TResult> { throw new Error("Not implemented"); }
    }
}