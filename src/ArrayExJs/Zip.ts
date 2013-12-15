module arrayexjs {
    export function zipEnumerator<T, TSecond, TResult>(prev: IEnumerable<T>, second: IEnumerable<TSecond>, resultSelector: (f: T, s: TSecond) => TResult): IEnumerator<TResult> {
        var s: IEnumerator<T>;
        var t: IEnumerator<TSecond>;
        var e = {
            current: undefined,
            moveNext: function (): boolean {
                if (!s) s = prev.getEnumerator();
                if (!t) t = second.getEnumerator();
                e.current = undefined;
                if (!s.moveNext() || !t.moveNext())
                    return false;
                e.current = resultSelector(s.current, t.current);
                return true;
            }
        };
        return e;
    }
}