module arrayexjs {
    export function whereEnumerator<T>(prev: IEnumerable<T>, filter: (t: T) => boolean): IEnumerator<T> {
        var t: IEnumerator<T>;
        var e = {
            current: undefined,
            moveNext: function (): boolean {
                if (!t) t = prev.getEnumerator();
                var c: T;
                while (t.moveNext()) {
                    if (filter(c = t.current)) {
                        e.current = c;
                        return true;
                    }
                }
                return false;
            }
        };
        return e;
    }
}