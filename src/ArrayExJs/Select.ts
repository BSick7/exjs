module arrayexjs {
    export function selectEnumerator<T, TResult>(prev: IEnumerable<T>, selector: (t: T, index?: number) => TResult): IEnumerator<TResult> {
        var t: IEnumerator<T>;
        var i = 0;
        var e = {
            current: undefined,
            moveNext: function (): boolean {
                if (!t) t = prev.getEnumerator();
                if (!t.moveNext()) return false;
                e.current = selector(t.current, i);
                i++;
                return true;
            }
        };
        return e;
    }
}