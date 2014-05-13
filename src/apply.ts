/// <reference path="enumerable.ts" />

module exjs {
    function applyEnumerator<T>(prev: IEnumerable<T>, action: (t: T, index?: number) => void): IEnumerator<T> {
        var t: IEnumerator<T>;
        var i = 0;
        var e = {
            current: undefined,
            moveNext: function (): boolean {
                if (!t) t = prev.getEnumerator();
                if (!t.moveNext()) return false;
                action(e.current = t.current, i)
                i++;
                return true;
            }
        };
        return e;
    }

    Enumerable.prototype.apply = function<T>(action: (t: T, index?: number) => void): IEnumerable<T> {
        var e = new Enumerable<T>();
        e.getEnumerator = () => applyEnumerator(<IEnumerable<T>>this, action);
        return e;
    };
    if (List)
        List.prototype.apply = Enumerable.prototype.apply;
}