/// <reference path="../enumerable.ts" />

var Symbol;

interface Iterator<T> {
    next(): IteratorResult<T>;
}
interface IteratorResult<T> {
    done: boolean;
    value: T;
}

module exjs {
    if (Symbol && Symbol.iterator) {
        Enumerable.prototype[Symbol.iterator] = function (): Iterator<any> {
            return iteratorFromEnumerable<any>(this);
        };
    }

    function iteratorFromEnumerable<T>(enu: IEnumerable<T>): Iterator<T> {
        var en: IEnumerator<T>;
        return {
            next (): IteratorResult<T> {
                var res = <IteratorResult<T>>{
                    done: true,
                    value: undefined
                };
                if (!enu)
                    return res;
                en = en || enu.getEnumerator();
                if (!en)
                    return res;
                res.done = !en.moveNext();
                res.value = en.current;
                return res;
            }
        };
    }
}