/// <reference path="enumerable.ts" />

module arrayexjs {
    function selectEnumerator<T, TResult>(prev: IEnumerable<T>, selector: (t: T, index?: number) => TResult): IEnumerator<TResult> {
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

    function selectManyEnumerator<T, TResult>(prev: IEnumerable<T>, selector: (t: T) => IEnumerable<TResult>): IEnumerator<TResult> {
        var t: IEnumerator<T>;
        var j = 0;
        var active: IEnumerator<TResult>;
        var e = {
            current: undefined,
            moveNext: function (): boolean {
                e.current = undefined;
                if (!t) t = prev.getEnumerator();
                while (!active || !active.moveNext()) {
                    if (!t.moveNext())
                        return false;
                    active = selector(t.current).getEnumerator();
                }
                e.current = active.current;
                return true;
            }
        };
        return e;
    }

    Enumerable.prototype.select = function<T,TResult>(selector: (t: T, index?: number) => TResult): IEnumerable<TResult> {
        var e = new Enumerable<TResult>();
        e.getEnumerator = () => selectEnumerator(<IEnumerable<T>>this, selector);
        return e;
    };
    Enumerable.prototype.selectMany = function<T,TResult>(selector: (t: T) => IEnumerable<TResult>): IEnumerable<TResult> {
        var e = new Enumerable<TResult>();
        e.getEnumerator = () => selectManyEnumerator<T, TResult>(<IEnumerable<T>>this, selector);
        return e;
    };
}