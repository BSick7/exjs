/// <reference path="../enumerable.ts" />

namespace exjs {
    var sym = (<any>window).Symbol;
    if (sym && sym.iterator) {
        Enumerable.prototype[sym.iterator] = function (): Iterator<any> {
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