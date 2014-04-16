 module arrayexjs {
    export function skipEnumerator<T>(prev: IEnumerable<T>, count: number): IEnumerator<T> {
        var t: IEnumerator<T>;
        var e = {
            current: undefined,
            moveNext: function (): boolean {
                if (!t) {
                    t = prev.getEnumerator();
                    for (var i = 0; i < count; i++) {
                        if (!t.moveNext()) return false;
                    }
                }

                if (!t.moveNext()) {
                    e.current = undefined;
                    return false;
                }

                e.current = t.current;
                return true;
            }
        };
        return e;
    }

     export function skipWhileEnumerator<T>(prev: IEnumerable<T>, predicate: (t: T, index?: number) => boolean): IEnumerator<T> {
        var t: IEnumerator<T>;
        var e = {
            current: undefined,
            moveNext: function (): boolean {
                if (!t) {
                    t = prev.getEnumerator();
                    for (var i = 0; t.moveNext(); i++) {
                        if (!predicate(e.current = t.current, i))
                            return true;
                    }
                    e.current = undefined;
                    return false;
                }

                if (!t.moveNext()) {
                    e.current = undefined;
                    return false;
                }

                e.current = t.current;
                return true;
            }
        };
        return e;
     }
}