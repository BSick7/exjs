/// <reference path="enumerable.ts" />

interface Array<T> {
    en(): exjs.IEnumerableEx<T>;
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

    Array.prototype.en = function<T>(): IEnumerableEx<T> {
        if (this && this instanceof Array)
            return new ArrayEnumerable<T>(this);
        return new Enumerable<T>();
    };
}