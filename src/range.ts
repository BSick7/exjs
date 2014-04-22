/// <reference path="enumerable.ts" />

module exjs {
    function rangeEnumerator (start: number, end: number, increment: number): IEnumerator<number> {
        var i = start - increment;
        var e = {
            current: undefined,
            moveNext: function (): boolean {
                i += increment;
                if (i >= end)
                    return false;
                e.current = i;
                return true;
            }
        };
        return e;
    }

    export function range (start: number, end: number, increment?: number): IEnumerable<number> {
        start = start || 0;
        end = end || 0;
        if (start > end)
            throw new Error("Start cannot be greater than end.");
        if (increment == null)
            increment = 1;
        var e = new Enumerable<number>();
        e.getEnumerator = () => rangeEnumerator(start, end, increment);
        return e;
    }
}