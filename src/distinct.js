/// <reference path="enumerable.ts" />
var arrayexjs;
(function (arrayexjs) {
    function distinctEnumerator(prev, comparer) {
        var t;
        var visited = [];
        var e = {
            current: undefined,
            moveNext: function () {
                if (!t)
                    t = prev.getEnumerator();
                e.current = undefined;
                if (!comparer) {
                    while (t.moveNext()) {
                        if (visited.indexOf(t.current) < 0) {
                            visited.push(e.current = t.current);
                            return true;
                        }
                    }
                    return false;
                }

                while (t.moveNext()) {
                    for (var i = 0, len = visited.length, hit = false; i < len && !hit; i++) {
                        hit = !!comparer(visited[i], t.current);
                    }
                    if (!hit) {
                        visited.push(e.current = t.current);
                        return true;
                    }
                }
                return false;
            }
        };
        return e;
    }

    arrayexjs.Enumerable.prototype.distinct = function (comparer) {
        var _this = this;
        var e = new arrayexjs.Enumerable();
        e.getEnumerator = function () {
            return distinctEnumerator(_this, comparer);
        };
        return e;
    };
})(arrayexjs || (arrayexjs = {}));
//# sourceMappingURL=distinct.js.map
