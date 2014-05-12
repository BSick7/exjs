/// <reference path="enumerable.ts" />
/// <reference path="fromJson.ts" />

module exjs {
    Enumerable.prototype.toList = function<T>(): IList<T> {
        var list = <any><IList<T>>this.toArray();
        for (var key in Enumerable.prototype) {
            list.prototype = Enumerable.prototype[key];
        }
        return list;
    };
}