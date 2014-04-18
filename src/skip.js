/// <reference path="enumerable.ts" />
var arrayexjs;
(function (arrayexjs) {
    function skipEnumerator(prev, count) {
        var t;
        var e = {
            current: undefined,
            moveNext: function () {
                if (!t) {
                    t = prev.getEnumerator();
                    for (var i = 0; i < count; i++) {
                        if (!t.moveNext())
                            return false;
                    }
                }

                if (!t.moveNext()) {
                    e.current = undefined;
                    return false;
                }

                e.current = t.current;
                return true;
            }
        };
        return e;
    }

    function skipWhileEnumerator(prev, predicate) {
        var t;
        var e = {
            current: undefined,
            moveNext: function () {
                if (!t) {
                    t = prev.getEnumerator();
                    for (var i = 0; t.moveNext(); i++) {
                        if (!predicate(e.current = t.current, i))
                            return true;
                    }
                    e.current = undefined;
                    return false;
                }

                if (!t.moveNext()) {
                    e.current = undefined;
                    return false;
                }

                e.current = t.current;
                return true;
            }
        };
        return e;
    }

    arrayexjs.Enumerable.prototype.skip = function (count) {
        var _this = this;
        var e = new arrayexjs.Enumerable();
        e.getEnumerator = function () {
            return skipEnumerator(_this, count);
        };
        return e;
    };
    arrayexjs.Enumerable.prototype.skipWhile = function (predicate) {
        var _this = this;
        var e = new arrayexjs.Enumerable();
        e.getEnumerator = function () {
            return skipWhileEnumerator(_this, predicate);
        };
        return e;
    };
})(arrayexjs || (arrayexjs = {}));
//# sourceMappingURL=skip.js.map
