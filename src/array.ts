/// <reference path="enumerable.ts" />

interface Array<T> {
    en():exjs.IEnumerable<T>;
}

module exjs {
    function arrayEnumerator<T>(arr: T[]): IEnumerator<T> {
        var len = arr.length;
        var e = { moveNext: undefined, current: undefined };
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
        constructor (arr: T[]) {
            super();

            this.getEnumerator = function () {
                return arrayEnumerator(arr);
            };
            this.toArray = function () {
                return arr.slice(0);
            };
        }
    }

    export function _<T>(o: any): IEnumerable<T> {
        if (o && o instanceof Array)
            return new ArrayEnumerable<T>(o);
        return new Enumerable<T>();
    }

    Array.prototype.en = function<T>() {
        if (this && this instanceof Array)
            return new ArrayEnumerable<T>(this);
        return new Enumerable<T>();
    };
}