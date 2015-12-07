/// <reference path="enumerable.ts" />

module exjs {
    function prependEnumerator<T>(prev: IEnumerable<T>, item: T): IEnumerator<T> {
        var inited = false;
        var previt = prev.getEnumerator();
        var e = {
            current: undefined,
            moveNext: function (): boolean {
                if (!inited) {
                    inited = true;
                    e.current = item;
                    if (e.current !== undefined)
                        return true;
                }
                var success = previt.moveNext();
                e.current = previt.current;
                return success;
            }
        };
        return e;
    }

    Enumerable.prototype.prepend = function<T>(item: T): IEnumerableEx<T> {
        var e = new Enumerable<T>();
        e.getEnumerator = () => prependEnumerator<T>(<IEnumerable<T>>this, item);
        return e;
    };
    if (List)
        List.prototype.prepend = Enumerable.prototype.prepend;
}