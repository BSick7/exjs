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

                e.current = t == null ? undefined : t.current;
                return e.current !== undefined;
            }
        };
        return e;
    }

    function traverseUniqueEnumerator<T>(prev: IEnumerable<T>, selector: (t: T)=>IEnumerable<T>, turnstile: (t: T) => boolean): IEnumerator<T> {
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

                do {
                    while (!t || !t.moveNext()) {
                        if (enstack.length < 1)
                            break;
                        t = enstack.pop();
                    }
                    e.current = t == null ? undefined : t.current;
                } while (turnstile(e.current));

                return e.current !== undefined;
            }
        };
        return e;
    }

    Enumerable.prototype.traverse = function<T>(selector: any): IEnumerableEx<T> {
        var e = new Enumerable<T>();
        e.getEnumerator = () => traverseEnumerator(<IEnumerable<T>>this, selector);
        return e;
    };
    Enumerable.prototype.traverseUnique = function<T>(selector: any, matcher?: (t1: T, t2: T) => boolean): IEnumerableEx<T> {
        var existing: T[] = [];
        var e = new Enumerable<T>();
        if (matcher) {
            e.getEnumerator = () => traverseUniqueEnumerator(<IEnumerable<T>>this, selector, (x: T) => {
                if (existing.some(e => matcher(x, e)))
                    return true;
                existing.push(x);
                return false;
            });
        } else {
            e.getEnumerator = () => traverseUniqueEnumerator(<IEnumerable<T>>this, selector, (x: T) => {
                if (existing.indexOf(x) > -1)
                    return true;
                existing.push(x);
                return false;
            });
        }
        return e;
    };
    if (List) {
        List.prototype.traverse = Enumerable.prototype.traverse;
        List.prototype.traverseUnique = Enumerable.prototype.traverseUnique;
    }
}