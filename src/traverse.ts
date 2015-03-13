/// <reference path="enumerable.ts" />

module exjs {
    function traverseEnumerator<T>(prev: IEnumerable<T>, selector: (t: T) => IEnumerable<T>): IEnumerator<T> {
        var started = false;
        var enstack: IEnumerator<T>[] = [];
        var t: IEnumerator<T>;
        var e = {
            current: undefined,
            moveNext (): boolean {
                if (!started) {
                    t = prev.getEnumerator();
                    started = true;
                } else if (t == null) {
                    return false;
                } else {
                    enstack.push(t);
                    t = selectorEnumerator<T, T>(selector(e.current));
                }

                while (!t || !t.moveNext()) {
                    if (enstack.length < 1)
                        break;
                    t = enstack.pop();
                }

                if (t == null || t.current === undefined) {
                    e.current = undefined;
                    return false;
                }
                e.current = t.current;
                return true;
            }
        };
        return e;
    }

    Enumerable.prototype.traverse = function<T>(selector: any): IEnumerableEx<T> {
        var e = new Enumerable<T>();
        e.getEnumerator = () => traverseEnumerator(<IEnumerable<T>>this, selector);
        return e;
    };
    if (List) {
        List.prototype.traverse = Enumerable.prototype.traverse;
    }
}