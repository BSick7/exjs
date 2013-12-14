module arrayexjs {
    export function reverseEnumerator<T>(prev: IEnumerable<T>): IEnumerator<T> {
        var a: T[];
        var i = 0;
        var e = {
            current: undefined,
            moveNext: function (): boolean {
                if (!a) {
                    a = prev.toArray();
                    i = a.length;
                }
                i--;
                e.current = a[i];
                return i >= 0;
            }
        };
        return e;
    }
}