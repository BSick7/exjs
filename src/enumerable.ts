module exjs {
    export interface IProjectionFunc<T, TResult> {
        (t: T): TResult;
    }
    export interface IProjectionIndexFunc<T, TResult> {
        (t: T, index: number): TResult;
    }
    export interface IEnumerable<T> {
        getEnumerator(): IEnumerator<T>;
    }
    export interface IEnumerableEx<T> extends IEnumerable<T> {
        aggregate<TAccumulate>(seed: TAccumulate, accumulator: (acc: TAccumulate, cur: T) => TAccumulate): TAccumulate;
        all(predicate: IProjectionFunc<T, boolean>): boolean;
        all(predicate: IProjectionIndexFunc<T, boolean>): boolean;
        any(predicate?: IProjectionFunc<T, boolean>): boolean;
        any(predicate?: IProjectionIndexFunc<T, boolean>): boolean;
        append(...items: T[]): IEnumerableEx<T>;
        apply<T>(action: IProjectionFunc<T, any>): IEnumerableEx<T>;
        apply<T>(action: IProjectionIndexFunc<T, any>): IEnumerableEx<T>;
        at(index: number): T;
        average(selector?: (t: T) => number): number;
        concat(second: IEnumerable<T>): IEnumerableEx<T>;
        concat(second: T[]): IEnumerableEx<T>;
        count(predicate?: (t: T) => boolean): number;
        difference(second: IEnumerable<T>, comparer?: (f: T, s: T) => boolean): IDifference<T>;
        difference(second: T[], comparer?: (f: T, s: T) => boolean): IDifference<T>;
        distinct(comparer?: (f: T, s: T) => boolean): IEnumerableEx<T>;
        except(second: IEnumerable<T>, comparer?: (f: T, s: T) => boolean): IEnumerableEx<T>;
        except(second: T[], comparer?: (f: T, s: T) => boolean): IEnumerableEx<T>;
        first(match?: (t: T) => boolean): T;
        firstIndex(match?: (t: T) => boolean): number;
        forEach (action: (t: T) => any);
        groupBy<TKey>(keySelector: (t: T) => TKey, comparer?: (k1: TKey, k2: TKey) => boolean): IEnumerableEx<IGrouping<TKey, T>>;
        intersect(second: IEnumerable<T>, comparer?: (f: T, s: T) => boolean): IEnumerableEx<T>;
        intersect(second: T[], comparer?: (f: T, s: T) => boolean): IEnumerableEx<T>;
        join<TInner, TKey, TResult>(inner: IEnumerable<TInner>, outerKeySelector: (t: T) => TKey, innerKeySelector: (t: TInner) => TKey, resultSelector: (o: T, i: TInner) => TResult, comparer?: (k1: TKey, k2: TKey) => boolean): IEnumerableEx<TResult>;
        join<TInner, TKey, TResult>(inner: TInner[], outerKeySelector: (t: T) => TKey, innerKeySelector: (t: TInner) => TKey, resultSelector: (o: T, i: TInner) => TResult, comparer?: (k1: TKey, k2: TKey) => boolean): IEnumerableEx<TResult>;
        last(match?: (t: T) => boolean): T;
        lastIndex(match?: (t: T) => boolean): number;
        max(selector?: (t: T) => number): number;
        min(selector?: (t: T) => number): number;
        orderBy<TKey>(keySelector: (t: T) => TKey, comparer?: (f: TKey, s: TKey) => number): IOrderedEnumerable<T>;
        orderByDescending<TKey>(keySelector: (t: T) => TKey, comparer?: (f: TKey, s: TKey) => number): IOrderedEnumerable<T>;
        prepend(...items: T[]): IEnumerableEx<T>;
        reverse(): IEnumerableEx<T>;
        select<TResult>(selector: IProjectionFunc<T, TResult>): IEnumerableEx<TResult>;
        select<TResult>(selector: IProjectionIndexFunc<T, TResult>): IEnumerableEx<TResult>;
        selectMany<TResult>(selector: (t: T) => IEnumerable<TResult>): IEnumerableEx<TResult>;
        selectMany<TResult>(selector: (t: T) => TResult[]): IEnumerableEx<TResult>;
        skip(count: number): IEnumerableEx<T>;
        skipWhile(predicate: IProjectionFunc<T, boolean>): IEnumerableEx<T>;
        skipWhile(predicate: IProjectionIndexFunc<T, boolean>): IEnumerableEx<T>;
        standardDeviation(selector?: (t: T) => number): number;
        sum(selector?: (t: T) => number): number;
        take(count: number): IEnumerableEx<T>;
        takeWhile(predicate: IProjectionFunc<T, boolean>): IEnumerableEx<T>;
        takeWhile(predicate: IProjectionIndexFunc<T, boolean>): IEnumerableEx<T>;
        toArray(): T[];
        toList(): IList<T>;
        toMap<TKey, TValue>(keySelector: (t: T) => TKey, valueSelector: (t: T) => TValue): IMap<TKey, TValue>;
        //toDictionary();
        traverse (selector: (t: T) => T[]): IEnumerableEx<T>;
        traverse (selector: (t: T) => IEnumerable<T>): IEnumerableEx<T>;
        traverseUnique (selector: (t: T) => T[], matcher?: (t1: T, t2: T) => boolean): IEnumerableEx<T>;
        traverseUnique (selector: (t: T) => IEnumerable<T>, matcher?: (t1: T, t2: T) => boolean): IEnumerableEx<T>;
        union(second: IEnumerable<T>, comparer?: (f: T, s: T) => boolean): IEnumerableEx<T>;
        union(second: T[], comparer?: (f: T, s: T) => boolean): IEnumerableEx<T>;
        where(filter: (t: T) => boolean): IEnumerableEx<T>;
        zip<TSecond, TResult>(second: IEnumerable<TSecond>, resultSelector: (f: T, s: TSecond) => TResult): IEnumerableEx<TResult>;
        zip<TSecond, TResult>(second: TSecond[], resultSelector: (f: T, s: TSecond) => TResult): IEnumerableEx<TResult>;
    }
    export interface IEnumerator<T> {
        current: T;
        moveNext(): boolean;
    }

    export interface IOrderedEnumerable<T> extends IEnumerableEx<T> {
        thenBy<TKey>(keySelector: (t: T) => TKey, comparer?: (f: TKey, s: TKey) => number): IOrderedEnumerable<T>;
        thenByDescending<TKey>(keySelector: (t: T) => TKey, comparer?: (f: TKey, s: TKey) => number): IOrderedEnumerable<T>;
    }

    export interface IGrouping<TKey, TElement> extends IEnumerableEx<TElement> {
        key: TKey;
    }

    export interface IDifference<T> {
        intersection: IEnumerableEx<T>;
        aNotB: IEnumerableEx<T>;
        bNotA: IEnumerableEx<T>;
    }

    export interface IList<T> extends IEnumerableEx<T> {
        //Array<T> methods
        toString(): string;
        toLocaleString(): string;
        pop(): T;
        push(...items: T[]): number;
        shift(): T;
        slice(start: number, end?: number): T[];
        sort(compareFn?: (a: T, b: T) => number): T[];
        splice(start: number): T[];
        splice(start: number, deleteCount: number, ...items: T[]): T[];
        unshift(...items: T[]): number;
        indexOf(searchElement: T, fromIndex?: number): number;
        lastIndexOf(searchElement: T, fromIndex?: number): number;
        every(callbackfn: (value: T, index: number, array: T[]) => boolean, thisArg?: any): boolean;
        some(callbackfn: (value: T, index: number, array: T[]) => boolean, thisArg?: any): boolean;
        forEach(callbackfn: (value: T, index: number, array: T[]) => void, thisArg?: any): void;
        map<U>(callbackfn: (value: T, index: number, array: T[]) => U, thisArg?: any): U[];
        filter(callbackfn: (value: T, index: number, array: T[]) => boolean, thisArg?: any): T[];
        reduce(callbackfn: (previousValue: T, currentValue: T, currentIndex: number, array: T[]) => T, initialValue?: T): T;
        reduce<U>(callbackfn: (previousValue: U, currentValue: T, currentIndex: number, array: T[]) => U, initialValue: U): U;
        reduceRight(callbackfn: (previousValue: T, currentValue: T, currentIndex: number, array: T[]) => T, initialValue?: T): T;
        reduceRight<U>(callbackfn: (previousValue: U, currentValue: T, currentIndex: number, array: T[]) => U, initialValue: U): U;
        length: number;
        [n: number]: T;

        //List<T> methods
        /**
         * Removes item from list.
         * @param item - item to remove
         */
        remove(item: T): boolean;
        /**
         * Removes items that match predicate.
         * Returns items that were removed.
         * @param predicate - function to match items that should be removed (index parameter is based on original list)
         */
        removeWhere(predicate: (t: T, index?: number) => boolean): IEnumerableEx<T>;
    }

    export class Enumerable<T> implements IEnumerableEx<T> {
        constructor () {
        }

        getEnumerator (): IEnumerator<T> {
            return {
                moveNext: function () {
                    return false;
                },
                current: undefined
            };
        }

        aggregate<TAccumulate>(seed: TAccumulate, accumulator: (acc: TAccumulate, cur: T) => TAccumulate): TAccumulate {
            var active = seed;
            for (var enumerator = this.getEnumerator(); enumerator.moveNext();) {
                active = accumulator(active, enumerator.current);
            }
            return active;
        }

        all (predicate: IProjectionIndexFunc<T, boolean>): boolean {
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

        any (predicate?: IProjectionIndexFunc<T, boolean>): boolean {
            var e = this.getEnumerator();
            var i = 0;
            while (e.moveNext()) {
                if (!predicate)
                    return true;
                if (predicate(e.current, i))
                    return true;
                i++;
            }
            return false;
        }

        append(...items: T[]): IEnumerableEx<T> {
            throw new Error("Not implemented");
        }

        apply<T>(action: IProjectionIndexFunc<T, any>): IEnumerableEx<T> {
            throw new Error("Not implemented");
        }

        at (index: number): T {
            var e = this.getEnumerator();
            var i = 0;
            while (e.moveNext()) {
                if (i === index)
                    return e.current;
                i++;
            }
            return undefined;
        }

        average (selector?: (t: T) => number): number {
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

        concat (second: IEnumerable<T>): IEnumerableEx<T>;
        concat (second: T[]): IEnumerableEx<T>;
        concat (second: any): IEnumerableEx<T> {
            throw new Error("Not implemented");
        }

        count (predicate?: (t: T) => boolean): number {
            var count = 0;
            var e = this.getEnumerator();
            while (e.moveNext()) {
                if (!predicate || predicate(e.current))
                    count++;
            }
            return count;
        }

        difference (second: IEnumerable<T>, comparer?: (f: T, s: T) => boolean): IDifference<T>;
        difference (second: T[], comparer?: (f: T, s: T) => boolean): IDifference<T>;
        difference (second: any, comparer?: (f: T, s: T) => boolean): IDifference<T> {
            comparer = comparer || function (f2: T, s2: T) {
                    return f2 === s2;
                };
            if (second instanceof Array)
                second = second.en();
            return {
                intersection: this.intersect(second, comparer).toArray().en(),
                aNotB: this.except(second, comparer).toArray().en(),
                bNotA: second.except(this, comparer).toArray().en()
            };
        }

        distinct (comparer?: (f: T, s: T) => boolean): IEnumerableEx<T> {
            throw new Error("Not implemented");
        }

        except (second: IEnumerable<T>, comparer?: (f: T, s: T) => boolean): IEnumerableEx<T>;
        except (second: T[], comparer?: (f: T, s: T) => boolean): IEnumerableEx<T>;
        except (second: any, comparer?: (f: T, s: T) => boolean): IEnumerableEx<T> {
            throw new Error("Not implemented");
        }

        first (match?: (t: T) => boolean): T {
            var e = this.getEnumerator();
            while (e.moveNext()) {
                if (!match || match(e.current))
                    return e.current;
            }
            return undefined;
        }

        firstIndex (match?: (t: T) => boolean): number {
            for (var e = this.getEnumerator(), i = 0; e.moveNext(); i++) {
                if (!match || match(e.current))
                    return i;
            }
            return -1;
        }

        forEach (action: (t: T) => any) {
            for (var en = this.getEnumerator(); en.moveNext();) {
                action(en.current);
            }
        }

        groupBy<TKey>(keySelector: (t: T) => TKey, comparer?: (k1: TKey, k2: TKey) => boolean): IEnumerableEx<IGrouping<TKey, T>> {
            throw new Error("Not implemented");
        }

        intersect (second: IEnumerable<T>, comparer?: (f: T, s: T) => boolean): IEnumerableEx<T>;
        intersect (second: T[], comparer?: (f: T, s: T) => boolean): IEnumerableEx<T>;
        intersect (second: any, comparer?: (f: T, s: T) => boolean): IEnumerableEx<T> {
            throw new Error("Not implemented");
        }

        join<TInner, TKey, TResult>(inner: IEnumerable<TInner>, outerKeySelector: (t: T) => TKey, innerKeySelector: (t: TInner) => TKey, resultSelector: (o: T, i: TInner) => TResult, comparer?: (k1: TKey, k2: TKey) => boolean): IEnumerableEx<TResult>;
        join<TInner, TKey, TResult>(inner: TInner[], outerKeySelector: (t: T) => TKey, innerKeySelector: (t: TInner) => TKey, resultSelector: (o: T, i: TInner) => TResult, comparer?: (k1: TKey, k2: TKey) => boolean): IEnumerableEx<TResult>;
        join<TInner, TKey, TResult>(inner: any, outerKeySelector: (t: T) => TKey, innerKeySelector: (t: TInner) => TKey, resultSelector: (o: T, i: TInner) => TResult, comparer?: (k1: TKey, k2: TKey) => boolean): IEnumerableEx<TResult> {
            throw new Error("Not implemented");
        }

        last (match?: (t: T) => boolean): T {
            var e = this.getEnumerator();
            var l: T;
            while (e.moveNext()) {
                if (!match || match(e.current))
                    l = e.current;
            }
            return l;
        }

        lastIndex (match?: (t: T) => boolean): number {
            var j = -1;
            for (var e = this.getEnumerator(), i = 0; e.moveNext(); i++) {
                if (!match || match(e.current))
                    j = i;
            }
            return j;
        }

        max (selector?: (t: T) => number): number {
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

        min (selector?: (t: T) => number): number {
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
            throw new Error("Not implemented");
        }

        orderByDescending<TKey>(keySelector: (t: T) => TKey, comparer?: (f: TKey, s: TKey) => number): IOrderedEnumerable<T> {
            throw new Error("Not implemented");
        }

        prepend(...items: T[]): IEnumerableEx<T> {
            throw new Error("Not implemented");
        }

        reverse(): IEnumerableEx<T> {
            throw new Error("Not implemented");
        }

        select<TResult>(selector: IProjectionIndexFunc<T, TResult>): IEnumerableEx<TResult> {
            throw new Error("Not implemented");
        }

        selectMany<TResult>(selector: (t: T) => IEnumerable<TResult>): IEnumerableEx<TResult>;
        selectMany<TResult>(selector: (t: T) => TResult[]): IEnumerableEx<TResult>;
        selectMany<TResult>(selector: (t: T) => any): IEnumerableEx<TResult> {
            throw new Error("Not implemented");
        }

        skip (count: number): IEnumerableEx<T> {
            throw new Error("Not implemented");
        }

        skipWhile (predicate: IProjectionIndexFunc<T, boolean>): IEnumerableEx<T> {
            throw new Error("Not implemented");
        }

        standardDeviation (selector?: (t: T) => number): number {
            var avg = this.average(selector);
            var sum = 0;
            var count = 0;
            selector = selector || function (t: T): number {
                    if (typeof t !== "number") throw new Error("Object is not a number.");
                    return <number><any>t;
                };
            var e = this.getEnumerator();
            while (e.moveNext()) {
                var diff = selector(e.current) - avg;
                sum += (diff * diff);
                count++;
            }
            return Math.sqrt(sum / count);
        }

        sum (selector?: (t: T) => number): number {
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

        take (count: number): IEnumerableEx<T> {
            throw new Error("Not implemented");
        }

        takeWhile (predicate: IProjectionIndexFunc<T, boolean>): IEnumerableEx<T> {
            throw new Error("Not implemented");
        }

        traverse (selector: (t: T) => T[]): IEnumerableEx<T>;
        traverse (selector: (t: T) => IEnumerable<T>): IEnumerableEx<T>;
        traverse (selector: any): IEnumerableEx<T> {
            throw new Error("Not implemented");
        }

        traverseUnique (selector: (t: T) => T[], uniqueMatch?: (t1: T, t2: T) => boolean): IEnumerableEx<T>;
        traverseUnique (selector: (t: T) => IEnumerable<T>, matcher?: (t1: T, t2: T) => boolean): IEnumerableEx<T>;
        traverseUnique (selector: any, matcher?: (t1: T, t2: T) => boolean): IEnumerableEx<T> {
            throw new Error("Not implemented");
        }

        toArray (): T[] {
            var arr: T[] = [];
            var enumerator = this.getEnumerator();
            while (enumerator.moveNext()) {
                arr.push(enumerator.current);
            }
            return arr;
        }

        toMap<TKey, TValue>(keySelector: (t: T) => TKey, valueSelector: (t: T) => TValue): IMap<TKey, TValue> {
            throw new Error("Not implemented");
        }

        toList (): IList<T> {
            throw new Error("Not implemented");
        }

        //toDictionary() {
        //}

        union (second: IEnumerable<T>, comparer?: (f: T, s: T) => boolean): IEnumerableEx<T>;
        union (second: T[], comparer?: (f: T, s: T) => boolean): IEnumerableEx<T>;
        union (second: any, comparer?: (f: T, s: T) => boolean): IEnumerableEx<T> {
            throw new Error("Not implemented");
        }

        where (filter: (t: T) => boolean): IEnumerableEx<T> {
            throw new Error("Not implemented");
        }

        zip<TSecond, TResult>(second: IEnumerable<TSecond>, resultSelector: (f: T, s: TSecond) => TResult): IEnumerableEx<TResult>;
        zip<TSecond, TResult>(second: TSecond[], resultSelector: (f: T, s: TSecond) => TResult): IEnumerableEx<TResult>;
        zip<TSecond, TResult>(second: any, resultSelector: (f: T, s: TSecond) => TResult): IEnumerableEx<TResult> {
            throw new Error("Not implemented");
        }
    }
}