/// <reference path="enumerable.ts" />

module exjs {
    function appendEnumerator<T>(prev: IEnumerable<T>, items: T[]): IEnumerator<T> {
        var stage = 1;
        var firstit: IEnumerator<T>;
        var secondit: IEnumerator<T>;
        var e = {
            current: undefined,
            moveNext: function (): boolean {
                if (stage < 2) {
                    firstit = firstit || prev.getEnumerator();
                    if (firstit.moveNext()) {
                        e.current = firstit.current;
                        return true;
                    }
                    stage++;
                }

                secondit = secondit || items.en().getEnumerator();
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

    Enumerable.prototype.append = function<T>(...items: T[]): IEnumerableEx<T> {
        var e = new Enumerable<T>();
        e.getEnumerator = () => appendEnumerator<T>(<IEnumerable<T>>this, items);
        return e;
    };
    if (List)
        List.prototype.append = Enumerable.prototype.append;
}