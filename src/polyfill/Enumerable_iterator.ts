/// <reference path="../enumerable.ts" />
/// <reference path="../../node_modules/typescript/lib/lib.es6.d.ts"/>  

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