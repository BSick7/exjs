/// <reference path="enumerable.ts" />

module exjs {
    function prependEnumerator<T>(prev: IEnumerable<T>, items: T[]): IEnumerator<T> {
        var stage = 1;
        var firstit: IEnumerator<T>;
        var secondit: IEnumerator<T>;
        var e = {
            current: undefined,
            moveNext: function (): boolean {
                if (stage < 2) {
                    firstit = firstit || items.en().getEnumerator();
                    if (firstit.moveNext()) {
                        e.current = firstit.current;
                        return true;
                    }
                    stage++;
                }

                secondit = secondit || prev.getEnumerator();
                if (secondit.moveNext()) {
                    e.current = secondit.current;
                    return true;
                }
                e.current = undefined;
                return false;
            }
        };
        return e;
    }

    Enumerable.prototype.prepend = function<T>(...items: T[]): IEnumerableEx<T> {
        var e = new Enumerable<T>();
        e.getEnumerator = () => prependEnumerator<T>(<IEnumerable<T>>this, items);
        return e;
    };
    if (List)
        List.prototype.prepend = Enumerable.prototype.prepend;
}