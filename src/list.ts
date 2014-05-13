/// <reference path="enumerable.ts" />
/// <reference path="fromJson.ts" />

module exjs {
    Enumerable.prototype.toList = function<T>() {
        var l = new List<T>();

        var enumerator = this.getEnumerator();
        while (enumerator.moveNext()) {
            l.push(enumerator.current);
        }

        return <IList<T>>l;
    };


    export class List<T> extends Enumerable<T> implements IList<T> {
        toString (): string { throw new Error("Not implemented"); }
        toLocaleString (): string { throw new Error("Not implemented"); }
        pop (): T { throw new Error("Not implemented"); }
        push (...items: T[]): number { throw new Error("Not implemented"); }
        shift (): T { throw new Error("Not implemented"); }
        slice (start: number, end?: number): T[] { throw new Error("Not implemented"); }
        sort (compareFn?: (a: T, b: T) => number): T[] { throw new Error("Not implemented"); }

        splice (start: number): T[];
        splice (start: number, deleteCount: number, ...items: T[]): T[];
        splice (): T[] { throw new Error("Not implemented"); }

        unshift (...items: T[]): number { throw new Error("Not implemented"); }
        indexOf (searchElement: T, fromIndex?: number): number { throw new Error("Not implemented"); }
        lastIndexOf (searchElement: T, fromIndex?: number): number { throw new Error("Not implemented"); }
        every (callbackfn: (value: T, index: number, array: T[]) => boolean, thisArg?: any): boolean { throw new Error("Not implemented"); }
        some (callbackfn: (value: T, index: number, array: T[]) => boolean, thisArg?: any): boolean { throw new Error("Not implemented"); }
        forEach (callbackfn: (value: T, index: number, array: T[]) => void, thisArg?: any): void { throw new Error("Not implemented"); }
        map<U>(callbackfn: (value: T, index: number, array: T[]) => U, thisArg?: any): U[] { throw new Error("Not implemented"); }
        filter (callbackfn: (value: T, index: number, array: T[]) => boolean, thisArg?: any): T[] { throw new Error("Not implemented"); }
        reduce<U>(callbackfn: (previousValue: U, currentValue: T, currentIndex: number, array: T[]) => U, initialValue: U): U { throw new Error("Not implemented"); }
        reduceRight<U>(callbackfn: (previousValue: U, currentValue: T, currentIndex: number, array: T[]) => U, initialValue: U): U { throw new Error("Not implemented"); }
        length: number;
        [n: number]: T;
    }

    for (var p in Array) if (List.hasOwnProperty(p)) List[p] = Array[p];
    function __ () { this.constructor = List; }
    __.prototype = Array.prototype;
    List.prototype = new __();
    for (var key in Enumerable.prototype) {
        if (key === "getEnumerator")
            continue;
        List.prototype[key] = Enumerable.prototype[key];
    }

    List.prototype.getEnumerator = function<T>(): IEnumerator<T> {
        var list = this;
        var len = list.length;
        var e = { moveNext: undefined, current: undefined };
        var index = -1;
        e.moveNext = function () {
            index++;
            if (index >= len) {
                e.current = undefined;
                return false;
            }
            e.current = list[index];
            return true;
        };
        return e;
    };
}