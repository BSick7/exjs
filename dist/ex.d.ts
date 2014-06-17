declare module exjs {
    interface IEnumerable<T> {
        getEnumerator(): IEnumerator<T>;
        aggregate<TAccumulate>(seed: TAccumulate, accumulator: (acc: TAccumulate, cur: T) => TAccumulate): TAccumulate;
        all(predicate: (t: T, index?: number) => boolean): boolean;
        any(predicate?: (t: T, index?: number) => boolean): boolean;
        apply<T>(action: (t: T, index?: number) => void): IEnumerable<T>;
        at(index: number): T;
        average(selector?: (t: T) => number): number;
        concat(second: IEnumerable<T>): IEnumerable<T>;
        concat(second: T[]): IEnumerable<T>;
        count(predicate?: (t: T) => boolean): number;
        difference(second: IEnumerable<T>, comparer?: (f: T, s: T) => boolean): IDifference<T>;
        difference(second: T[], comparer?: (f: T, s: T) => boolean): IDifference<T>;
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
        standardDeviation(selector?: (t: T) => number): number;
        sum(selector?: (t: T) => number): number;
        take(count: number): IEnumerable<T>;
        takeWhile(predicate: (t: T, index?: number) => boolean): IEnumerable<T>;
        toArray(): T[];
        toList(): IList<T>;
        toMap<TKey, TValue>(keySelector: (t: T) => TKey, valueSelector: (t: T) => TValue): IMap<TKey, TValue>;
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
    interface IDifference<T> {
        intersection: IEnumerable<T>;
        aNotB: IEnumerable<T>;
        bNotA: IEnumerable<T>;
    }
    interface IList<T> extends IEnumerable<T> {
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
        remove(item: T): boolean;
        removeWhere(predicate: (t: T, index?: number) => boolean): IEnumerable<T>;
    }
    class Enumerable<T> implements IEnumerable<T> {
        constructor();
        public getEnumerator(): IEnumerator<T>;
        public aggregate<TAccumulate>(seed: TAccumulate, accumulator: (acc: TAccumulate, cur: T) => TAccumulate): TAccumulate;
        public all(predicate: (t: T, index?: number) => boolean): boolean;
        public any(predicate?: (t: T, index?: number) => boolean): boolean;
        public apply<T>(action: (t: T, index?: number) => void): IEnumerable<T>;
        public at(index: number): T;
        public average(selector?: (t: T) => number): number;
        public concat(second: IEnumerable<T>): IEnumerable<T>;
        public concat(second: T[]): IEnumerable<T>;
        public count(predicate?: (t: T) => boolean): number;
        public difference(second: IEnumerable<T>, comparer?: (f: T, s: T) => boolean): IDifference<T>;
        public difference(second: T[], comparer?: (f: T, s: T) => boolean): IDifference<T>;
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
        public selectMany<TResult>(selector: (t: T) => TResult[]): IEnumerable<TResult>;
        public skip(count: number): IEnumerable<T>;
        public skipWhile(predicate: (t: T, index?: number) => boolean): IEnumerable<T>;
        public standardDeviation(selector?: (t: T) => number): number;
        public sum(selector?: (t: T) => number): number;
        public take(count: number): IEnumerable<T>;
        public takeWhile(predicate: (t: T, index?: number) => boolean): IEnumerable<T>;
        public toArray(): T[];
        public toMap<TKey, TValue>(keySelector: (t: T) => TKey, valueSelector: (t: T) => TValue): Map<TKey, TValue>;
        public toList(): IList<T>;
        public union(second: IEnumerable<T>, comparer?: (f: T, s: T) => boolean): IEnumerable<T>;
        public union(second: T[], comparer?: (f: T, s: T) => boolean): IEnumerable<T>;
        public where(filter: (t: T) => boolean): IEnumerable<T>;
        public zip<TSecond, TResult>(second: IEnumerable<TSecond>, resultSelector: (f: T, s: TSecond) => TResult): IEnumerable<TResult>;
        public zip<TSecond, TResult>(second: TSecond[], resultSelector: (f: T, s: TSecond) => TResult): IEnumerable<TResult>;
    }
}
declare module exjs {
}
interface Array<T> {
    en(): exjs.IEnumerable<T>;
}
declare module exjs {
    function _<T>(o: any): IEnumerable<T>;
}
declare module exjs {
}
declare module exjs {
}
declare module exjs {
}
interface Function {
    fromJson<T>(o: any, mappingOverrides?: any): T;
}
declare module exjs {
}
declare module exjs {
}
declare module exjs {
}
declare module exjs {
    class List<T> extends Enumerable<T> implements IList<T> {
        public toString(): string;
        public toLocaleString(): string;
        public pop(): T;
        public push(...items: T[]): number;
        public shift(): T;
        public slice(start: number, end?: number): T[];
        public sort(compareFn?: (a: T, b: T) => number): T[];
        public splice(start: number): T[];
        public splice(start: number, deleteCount: number, ...items: T[]): T[];
        public unshift(...items: T[]): number;
        public indexOf(searchElement: T, fromIndex?: number): number;
        public lastIndexOf(searchElement: T, fromIndex?: number): number;
        public every(callbackfn: (value: T, index: number, array: T[]) => boolean, thisArg?: any): boolean;
        public some(callbackfn: (value: T, index: number, array: T[]) => boolean, thisArg?: any): boolean;
        public forEach(callbackfn: (value: T, index: number, array: T[]) => void, thisArg?: any): void;
        public map<U>(callbackfn: (value: T, index: number, array: T[]) => U, thisArg?: any): U[];
        public filter(callbackfn: (value: T, index: number, array: T[]) => boolean, thisArg?: any): T[];
        public reduce<U>(callbackfn: (previousValue: U, currentValue: T, currentIndex: number, array: T[]) => U, initialValue: U): U;
        public reduceRight<U>(callbackfn: (previousValue: U, currentValue: T, currentIndex: number, array: T[]) => U, initialValue: U): U;
        public length: number;
        [n: number]: T;
        public remove(item: T): boolean;
        public removeWhere(predicate: (t: T, index?: number) => boolean): IEnumerable<T>;
    }
}
declare module exjs {
    interface IMap<TKey, TValue> {
        size: number;
        clear(): any;
        delete(key: TKey): boolean;
        entries(): IEnumerable<any[]>;
        forEach(callbackFn: (value: TValue, key: TKey, map?: IMap<TKey, TValue>) => void, thisArg?: any): any;
        get(key: TKey): TValue;
        has(key: TKey): boolean;
        keys(): IEnumerable<TKey>;
        set(key: TKey, value: TValue): any;
        values(): IEnumerable<TValue>;
    }
    class Map<TKey, TValue> implements IMap<TKey, TValue> {
        private _keys;
        private _values;
        public size : number;
        constructor();
        constructor(enumerable: any[][]);
        constructor(enumerable: IEnumerable<any[]>);
        public clear(): void;
        public delete(key: TKey): boolean;
        public entries(): IEnumerable<any[]>;
        public forEach(callbackFn: (value: TValue, key: TKey, map?: IMap<TKey, TValue>) => void, thisArg?: any): void;
        public get(key: TKey): TValue;
        public has(key: TKey): boolean;
        public keys(): IEnumerable<TKey>;
        public set(key: TKey, value: TValue): any;
        public values(): IEnumerable<TValue>;
    }
}
declare module exjs {
}
declare module exjs {
    function range(start: number, end: number, increment?: number): IEnumerable<number>;
}
declare module exjs {
}
declare module exjs {
    function round(value: number, digits?: number): number;
}
declare module exjs {
}
declare module exjs {
}
declare module exjs {
}
declare module exjs {
}
declare module exjs {
}
declare module exjs {
}
