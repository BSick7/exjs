namespace exjs {
    export function en<T>(enu: IEnumerable<T>): IEnumerableEx<T> {
        var x = new Enumerable<T>();
        x.getEnumerator = function (): IEnumerator<T> {
            return wrapEnumerator<T>(enu);
        };
        return <IEnumerableEx<T>>x;
    }

    function wrapEnumerator<T>(enu: IEnumerable<T>): IEnumerator<T> {
        var wrapped = enu.getEnumerator();
        var x = <IEnumerator<T>>{ current: undefined, moveNext: undefined };
        x.moveNext = function (): boolean {
            if (wrapped.moveNext()) {
                x.current = wrapped.current;
                return true;
            }
            x.current = undefined;
            return false;
        };
        return x;
    }
}
var ex = exjs.en;