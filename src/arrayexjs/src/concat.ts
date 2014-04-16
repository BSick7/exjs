module arrayexjs {
    export function concatEnumerator<T>(prev: IEnumerable<T>, second: IEnumerable<T>): IEnumerator<T> {
        var t: IEnumerator<T>;
        var s = false;
        var e = {
            current: undefined,
            moveNext: function (): boolean {
                if (!t) t = prev.getEnumerator();
                e.current = undefined;
                if (t.moveNext()) {
                    e.current = t.current;
                    return true;
                }
                if (s) return false;
                s = true;
                t = second.getEnumerator();
                if (!t.moveNext())
                    return false;
                e.current = t.current;
                return true;
            }
        };
        return e;
    }
}