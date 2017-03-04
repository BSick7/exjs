namespace exjs {
    export function anonymous<T>(iterator: (en: IEnumerator<T>) => boolean): IEnumerableEx<T> {
        var enumerable = new Enumerable<T>();
        enumerable.getEnumerator = () => {
            var enumerator = {
                current: undefined,
                moveNext: () => iterator(enumerator)
            };
            return enumerator;
        };
        return enumerable;
    }
}