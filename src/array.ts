/// <reference path="enumerable.ts" />

interface Array<T> {
    en(): exjs.IEnumerableEx<T>;
}

namespace exjs {
    function arrayEnumerator<T>(arr: T[]): IEnumerator<T> {
        var len = arr.length;
        var e = {moveNext: undefined, current: undefined};
        var index = -1;
        e.moveNext = function () {
            index++;
            if (index >= len) {
                e.current = undefined;
                return false;
            }
            e.current = arr[index];
            return true;
        };
        return e;
    }

    class ArrayEnumerable<T> extends Enumerable<T> {
        constructor(arr: T[]) {
            super();

            this.getEnumerator = function () {
                return arrayEnumerator(arr);
            };
            this.toArray = function () {
                return arr.slice(0);
            };
        }
    }

    function en<T>(): IEnumerableEx<T> {
        if (this && Array.isArray(this))
            return new ArrayEnumerable<T>(this);
        return new Enumerable<T>();
    }

    try {
        Object.defineProperty(Array.prototype, "en", {
            value: en,
            enumerable: false,
            writable: false,
            configurable: false
        });
    } catch (e) {
        //IE8 supports Object.defineProperty only for DOM objects
        (<any>Array.prototype).en = en;
    }
}