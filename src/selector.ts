namespace exjs {
    export function selectorEnumerator<T, TResult>(en: IEnumerable<T>): IEnumerator<TResult>;
    export function selectorEnumerator<T, TResult>(arr: T[]): IEnumerator<TResult>;
    export function selectorEnumerator<T, TResult>(obj: any) {
        if (Array.isArray(obj))
            return (<T[]>obj).en().getEnumerator();
        if (obj != null && typeof obj.getEnumerator === "function")
            return obj.getEnumerator();
        return null;
    }
}