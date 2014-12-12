/// <reference path="enumerable.ts" />
/// <reference path="array.ts" />

module exjs {
    function selectEnumerator<T, TResult>(prev: IEnumerable<T>, selector: IProjectionIndexFunc<T, TResult>): IEnumerator<TResult> {
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

    function selectManyEnumerator<T, TResult>(prev: IEnumerable<T>, selector: (t: T) => any): IEnumerator<TResult> {
        var t: IEnumerator<T>;
        var active: IEnumerator<TResult>;
        var e = {
            current: undefined,
            moveNext: function (): boolean {
                e.current = undefined;
                if (!t) t = prev.getEnumerator();
                while (!active || !active.moveNext()) {
                    if (!t.moveNext())
                        return false;
                    var selected = selector(t.current);
                    var en: IEnumerable<TResult> = selected;
                    if (en instanceof Array)
                        en = (<TResult[]><any>en).en();
                    active = en.getEnumerator();
                }
                e.current = active.current;
                return true;
            }
        };
        return e;
    }

    Enumerable.prototype.select = function<T,TResult>(selector: IProjectionIndexFunc<T, TResult>): IEnumerableEx<TResult> {
        var e = new Enumerable<TResult>();
        e.getEnumerator = () => selectEnumerator(<IEnumerable<T>>this, selector);
        return e;
    };
    Enumerable.prototype.selectMany = function<T,TResult>(selector: (t: T) => any): IEnumerableEx<TResult> {
        var e = new Enumerable<TResult>();
        e.getEnumerator = () => selectManyEnumerator<T, TResult>(<IEnumerable<T>>this, selector);
        return e;
    };
    if (List) {
        List.prototype.select = Enumerable.prototype.select;
        List.prototype.selectMany = Enumerable.prototype.selectMany;
    }
}