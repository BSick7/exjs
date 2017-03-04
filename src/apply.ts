/// <reference path="enumerable.ts" />

namespace exjs {
    function applyEnumerator<T>(prev: IEnumerable<T>, action: IProjectionIndexFunc<T, any>): IEnumerator<T> {
        var t: IEnumerator<T>;
        var i = 0;
        var e = {
            current: undefined,
            moveNext: function (): boolean {
                if (!t) t = prev.getEnumerator();
                if (!t.moveNext()) return false;
                action(e.current = t.current, i);
                i++;
                return true;
            }
        };
        return e;
    }

    Enumerable.prototype.apply = function<T>(action: IProjectionIndexFunc<T, any>): IEnumerableEx<T> {
        var e = new Enumerable<T>();
        e.getEnumerator = () => applyEnumerator(<IEnumerable<T>>this, action);
        return e;
    };
    if (List)
        List.prototype.apply = Enumerable.prototype.apply;
}