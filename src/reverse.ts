/// <reference path="enumerable.ts" />

module arrayexjs {
    function reverseEnumerator<T>(prev: IEnumerable<T>): IEnumerator<T> {
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

    Enumerable.prototype.reverse = function<T>(): IEnumerable<T> {
        var e = new Enumerable<T>();
        e.getEnumerator = () => reverseEnumerator(<IEnumerable<T>>this);
        return e;
    };
}