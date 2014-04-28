var exjs;
(function (exjs) {
    var Enumerable = (function () {
        function Enumerable() {
        }
        Enumerable.prototype.getEnumerator = function () {
            return {
                moveNext: function () {
                    return false;
                },
                current: undefined
            };
        };

        Enumerable.prototype.aggregate = function (seed, accumulator) {
            var active = seed;
            for (var enumerator = this.getEnumerator(); enumerator.moveNext();) {
                active = accumulator(active, enumerator.current);
            }
            return active;
        };

        Enumerable.prototype.all = function (predicate) {
            if (predicate) {
                var e = this.getEnumerator();
                var i = 0;
                while (e.moveNext()) {
                    if (!predicate(e.current, i))
                        return false;
                    i++;
                }
            }
            return true;
        };
        Enumerable.prototype.any = function (predicate) {
            predicate = predicate || function () {
                return true;
            };
            var e = this.getEnumerator();
            var i = 0;
            while (e.moveNext()) {
                if (predicate(e.current, i))
                    return true;
                i++;
            }
            return i === 0;
        };
        Enumerable.prototype.apply = function (action) {
            throw new Error("Not implemented");
        };
        Enumerable.prototype.at = function (index) {
            var e = this.getEnumerator();
            var i = 0;
            while (e.moveNext()) {
                if (i === index)
                    return e.current;
                i++;
            }
            return undefined;
        };
        Enumerable.prototype.average = function (selector) {
            var count = 0;
            var total = 0;
            selector = selector || function (t) {
                if (typeof t !== "number")
                    throw new Error("Object is not a number.");
                return t;
            };
            var e = this.getEnumerator();
            while (e.moveNext()) {
                total += selector(e.current);
                count++;
            }
            if (count === 0)
                return 0;
            return total / count;
        };

        Enumerable.prototype.concat = function (second) {
            throw new Error("Not implemented");
        };

        Enumerable.prototype.count = function (predicate) {
            var count = 0;
            var e = this.getEnumerator();
            while (e.moveNext()) {
                if (!predicate || predicate(e.current))
                    count++;
            }
            return count;
        };
        Enumerable.prototype.distinct = function (comparer) {
            throw new Error("Not implemented");
        };

        Enumerable.prototype.except = function (second, comparer) {
            throw new Error("Not implemented");
        };

        Enumerable.prototype.first = function (match) {
            var e = this.getEnumerator();
            while (e.moveNext()) {
                if (!match || match(e.current))
                    return e.current;
            }
            return undefined;
        };
        Enumerable.prototype.groupBy = function (keySelector, comparer) {
            throw new Error("Not implemented");
        };

        Enumerable.prototype.intersect = function (second, comparer) {
            throw new Error("Not implemented");
        };

        Enumerable.prototype.join = function (inner, outerKeySelector, innerKeySelector, resultSelector, comparer) {
            throw new Error("Not implemented");
        };

        Enumerable.prototype.last = function (match) {
            var e = this.getEnumerator();
            var l;
            while (e.moveNext()) {
                if (!match || match(e.current))
                    l = e.current;
            }
            return l;
        };
        Enumerable.prototype.max = function (selector) {
            var e = this.getEnumerator();
            if (!e.moveNext())
                return 0;
            selector = selector || function (t) {
                if (typeof t !== "number")
                    throw new Error("Object is not a number.");
                return t;
            };
            var max = selector(e.current);
            while (e.moveNext()) {
                max = Math.max(max, selector(e.current));
            }
            return max;
        };
        Enumerable.prototype.min = function (selector) {
            var e = this.getEnumerator();
            if (!e.moveNext())
                return 0;
            selector = selector || function (t) {
                if (typeof t !== "number")
                    throw new Error("Object is not a number.");
                return t;
            };
            var min = selector(e.current);
            while (e.moveNext()) {
                min = Math.min(min, selector(e.current));
            }
            return min;
        };
        Enumerable.prototype.orderBy = function (keySelector, comparer) {
            throw new Error("Not implemented");
        };
        Enumerable.prototype.orderByDescending = function (keySelector, comparer) {
            throw new Error("Not implemented");
        };
        Enumerable.prototype.reverse = function () {
            throw new Error("Not implemented");
        };
        Enumerable.prototype.select = function (selector) {
            throw new Error("Not implemented");
        };

        Enumerable.prototype.selectMany = function (selector) {
            throw new Error("Not implemented");
        };

        Enumerable.prototype.skip = function (count) {
            throw new Error("Not implemented");
        };
        Enumerable.prototype.skipWhile = function (predicate) {
            throw new Error("Not implemented");
        };
        Enumerable.prototype.sum = function (selector) {
            var sum = 0;
            selector = selector || function (t) {
                if (typeof t !== "number")
                    throw new Error("Object is not a number.");
                return t;
            };
            var e = this.getEnumerator();
            while (e.moveNext()) {
                sum += selector(e.current);
            }
            return sum;
        };
        Enumerable.prototype.take = function (count) {
            throw new Error("Not implemented");
        };
        Enumerable.prototype.takeWhile = function (predicate) {
            throw new Error("Not implemented");
        };
        Enumerable.prototype.toArray = function () {
            var arr = [];
            var enumerator = this.getEnumerator();
            while (enumerator.moveNext()) {
                arr.push(enumerator.current);
            }
            return arr;
        };

        Enumerable.prototype.union = function (second, comparer) {
            throw new Error("Not implemented");
        };

        Enumerable.prototype.where = function (filter) {
            throw new Error("Not implemented");
        };

        Enumerable.prototype.zip = function (second, resultSelector) {
            throw new Error("Not implemented");
        };
        return Enumerable;
    })();
    exjs.Enumerable = Enumerable;
})(exjs || (exjs = {}));
var exjs;
(function (exjs) {
    function applyEnumerator(prev, action) {
        var t;
        var i = 0;
        var e = {
            current: undefined,
            moveNext: function () {
                if (!t)
                    t = prev.getEnumerator();
                if (!t.moveNext())
                    return false;
                action(e.current = t.current, i);
                i++;
                return true;
            }
        };
        return e;
    }

    exjs.Enumerable.prototype.apply = function (action) {
        var _this = this;
        var e = new exjs.Enumerable();
        e.getEnumerator = function () {
            return applyEnumerator(_this, action);
        };
        return e;
    };
})(exjs || (exjs = {}));
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};

var exjs;
(function (exjs) {
    function arrayEnumerator(arr) {
        var len = arr.length;
        var e = { moveNext: undefined, current: undefined };
        var index = -1;
        e.moveNext = function () {
            index++;
            if (index >= len) {
                e.current = undefined;
                return false;
            }
            e.current = arr[index];
            return true;
        };
        return e;
    }

    var ArrayEnumerable = (function (_super) {
        __extends(ArrayEnumerable, _super);
        function ArrayEnumerable(arr) {
            _super.call(this);

            this.getEnumerator = function () {
                return arrayEnumerator(arr);
            };
            this.toArray = function () {
                return arr.slice(0);
            };
        }
        return ArrayEnumerable;
    })(exjs.Enumerable);

    function _(o) {
        if (o && o instanceof Array)
            return new ArrayEnumerable(o);
        return new exjs.Enumerable();
    }
    exjs._ = _;

    Array.prototype.en = function () {
        if (this && this instanceof Array)
            return new ArrayEnumerable(this);
        return new exjs.Enumerable();
    };
})(exjs || (exjs = {}));
var exjs;
(function (exjs) {
    function concatEnumerator(prev, second) {
        var t;
        var s = false;
        var e = {
            current: undefined,
            moveNext: function () {
                if (!t)
                    t = prev.getEnumerator();
                e.current = undefined;
                if (t.moveNext()) {
                    e.current = t.current;
                    return true;
                }
                if (s)
                    return false;
                s = true;
                t = second.getEnumerator();
                if (!t.moveNext())
                    return false;
                e.current = t.current;
                return true;
            }
        };
        return e;
    }

    exjs.Enumerable.prototype.concat = function (second) {
        var _this = this;
        var en = second instanceof Array ? second.en() : second;
        var e = new exjs.Enumerable();
        e.getEnumerator = function () {
            return concatEnumerator(_this, en);
        };
        return e;
    };
})(exjs || (exjs = {}));
var exjs;
(function (exjs) {
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

    exjs.Enumerable.prototype.distinct = function (comparer) {
        var _this = this;
        var e = new exjs.Enumerable();
        e.getEnumerator = function () {
            return distinctEnumerator(_this, comparer);
        };
        return e;
    };
})(exjs || (exjs = {}));
var exjs;
(function (exjs) {
    function exceptEnumerator(prev, second, comparer) {
        comparer = comparer || function (f, s) {
            return f === s;
        };
        var t;
        var e = {
            current: undefined,
            moveNext: function () {
                if (!t)
                    t = prev.getEnumerator();
                e.current = undefined;
                while (t.moveNext()) {
                    for (var hit = false, x = second.getEnumerator(); x.moveNext() && !hit;) {
                        hit = comparer(t.current, x.current);
                    }
                    if (!hit) {
                        e.current = t.current;
                        return true;
                    }
                }
                return false;
            }
        };
        return e;
    }

    exjs.Enumerable.prototype.except = function (second, comparer) {
        var _this = this;
        var en = second instanceof Array ? second.en() : second;
        var e = new exjs.Enumerable();
        e.getEnumerator = function () {
            return exceptEnumerator(_this, en, comparer);
        };
        return e;
    };
})(exjs || (exjs = {}));
Function.prototype.fromJson = function (o, mappingOverrides) {
    var rv = new this();

    var mapped = [];

    for (var key in mappingOverrides) {
        var j = o[key];
        if (j === null)
            rv[key] = null;
        else if (j !== undefined)
            rv[key] = mappingOverrides[key].fromJson(j);
        mapped.push(key);
    }

    for (var key in o) {
        if (mapped.indexOf(key) > -1)
            continue;
        rv[key] = o[key];
    }

    return rv;
};
var exjs;
(function (exjs) {
    function groupByEnumerator(prev, keySelector, comparer) {
        var grps;
        var i = 0;
        var e = {
            current: undefined,
            moveNext: function () {
                if (!grps)
                    grps = createGroups(prev, keySelector, comparer);
                e.current = undefined;
                if (i >= grps.length)
                    return false;
                e.current = grps[i];
                i++;
                return true;
            }
        };
        return e;
    }

    function createGroups(prev, keySelector, comparer) {
        comparer = comparer || function (k1, k2) {
            return k1 === k2;
        };
        var grps = [];
        var keys = [];

        var e = prev.getEnumerator();
        var key;
        while (e.moveNext()) {
            key = keySelector(e.current);
            var index = -1;
            for (var i = 0, len = keys.length; i < len; i++) {
                if (comparer(key, keys[i])) {
                    index = i;
                    break;
                }
            }
            var grp;
            if (index < 0) {
                keys.push(key);
                grps.push(grp = new Group(key));
            } else {
                grp = grps[index];
            }
            grp._add(e.current);
        }

        return grps;
    }

    var Group = (function (_super) {
        __extends(Group, _super);
        function Group(key) {
            var _this = this;
            _super.call(this);
            this.key = key;
            this._arr = [];
            this.getEnumerator = function () {
                return _this._arr.en().getEnumerator();
            };
        }
        Group.prototype._add = function (e) {
            this._arr.push(e);
        };
        return Group;
    })(exjs.Enumerable);

    var fn = exjs.Enumerable.prototype;
    fn.groupBy = function (keySelector, comparer) {
        var _this = this;
        var e = new exjs.Enumerable();
        e.getEnumerator = function () {
            return groupByEnumerator(_this, keySelector, comparer);
        };
        return e;
    };
})(exjs || (exjs = {}));
var exjs;
(function (exjs) {
    function intersectEnumerator(prev, second, comparer) {
        comparer = comparer || function (f, s) {
            return f === s;
        };
        var t;
        var e = {
            current: undefined,
            moveNext: function () {
                if (!t)
                    t = prev.distinct().getEnumerator();
                e.current = undefined;
                while (t.moveNext()) {
                    for (var hit = false, x = second.getEnumerator(); x.moveNext() && !hit;) {
                        hit = comparer(t.current, x.current);
                    }
                    if (hit) {
                        e.current = t.current;
                        return true;
                    }
                }
                return false;
            }
        };
        return e;
    }

    exjs.Enumerable.prototype.intersect = function (second, comparer) {
        var _this = this;
        var en = second instanceof Array ? second.en() : second;
        var e = new exjs.Enumerable();
        e.getEnumerator = function () {
            return intersectEnumerator(_this, en, comparer);
        };
        return e;
    };
})(exjs || (exjs = {}));
var exjs;
(function (exjs) {
    function joinEnumerator(prev, inner, outerKeySelector, innerKeySelector, resultSelector, comparer) {
        comparer = comparer || function (k1, k2) {
            return k1 === k2;
        };
        var s;
        var ins;
        var j = 0;
        var e = {
            current: undefined,
            moveNext: function () {
                e.current = undefined;
                if (!s) {
                    s = prev.getEnumerator();
                    if (!s.moveNext())
                        return false;
                    ins = inner.toArray();
                }

                var cur;
                do {
                    for (; j < ins.length; j++) {
                        cur = ins[j];
                        if (comparer(outerKeySelector(s.current), innerKeySelector(cur))) {
                            j++;
                            e.current = resultSelector(s.current, cur);
                            return true;
                        }
                    }
                    j = 0;
                } while(s.moveNext());
                return false;
            }
        };
        return e;
    }

    exjs.Enumerable.prototype.join = function (inner, outerKeySelector, innerKeySelector, resultSelector, comparer) {
        var _this = this;
        var en = inner instanceof Array ? inner.en() : inner;
        var e = new exjs.Enumerable();
        e.getEnumerator = function () {
            return joinEnumerator(_this, en, outerKeySelector, innerKeySelector, resultSelector, comparer);
        };
        return e;
    };
})(exjs || (exjs = {}));
var exjs;
(function (exjs) {
    function orderByEnumerable(source, keySelector, isDescending, comparer) {
        return new OrderedEnumerable(source, keySelector, isDescending, comparer);
    }

    var OrderedEnumerable = (function (_super) {
        __extends(OrderedEnumerable, _super);
        function OrderedEnumerable(source, keySelector, isDescending, keyComparer) {
            _super.call(this);

            this.Source = source;
            keyComparer = keyComparer || function (f, s) {
                return f > s ? 1 : (f < s ? -1 : 0);
            };
            var factor = (isDescending == true) ? -1 : 1;
            this.Sorter = function (a, b) {
                return factor * keyComparer(keySelector(a), keySelector(b));
            };
        }
        OrderedEnumerable.prototype.getEnumerator = function () {
            var source = this.Source;
            var sorter = this.Sorter;
            var arr;
            var i = 0;
            var e = {
                current: undefined,
                moveNext: function () {
                    if (!arr) {
                        arr = source.toArray();
                        arr.sort(sorter);
                    }
                    e.current = undefined;
                    if (i >= arr.length)
                        return false;
                    e.current = arr[i];
                    i++;
                    return true;
                }
            };
            return e;
        };

        OrderedEnumerable.prototype.thenBy = function (keySelector, comparer) {
            return new ThenEnumerable(this, keySelector, false, comparer);
        };

        OrderedEnumerable.prototype.thenByDescending = function (keySelector, comparer) {
            return new ThenEnumerable(this, keySelector, true, comparer);
        };
        return OrderedEnumerable;
    })(exjs.Enumerable);

    var ThenEnumerable = (function (_super) {
        __extends(ThenEnumerable, _super);
        function ThenEnumerable(source, keySelector, isDescending, keyComparer) {
            _super.call(this, source, keySelector, isDescending, keyComparer);

            var parentSorter = source.Sorter;
            var thisSorter = this.Sorter;
            this.Sorter = function (a, b) {
                return parentSorter(a, b) || thisSorter(a, b);
            };
        }
        return ThenEnumerable;
    })(OrderedEnumerable);

    var fn = exjs.Enumerable.prototype;
    fn.orderBy = function (keySelector, comparer) {
        return orderByEnumerable(this, keySelector, false, comparer);
    };
    fn.orderByDescending = function (keySelector, comparer) {
        return orderByEnumerable(this, keySelector, true, comparer);
    };
})(exjs || (exjs = {}));
var exjs;
(function (exjs) {
    function rangeEnumerator(start, end, increment) {
        var i = start - increment;
        var e = {
            current: undefined,
            moveNext: function () {
                i += increment;
                if (i >= end)
                    return false;
                e.current = i;
                return true;
            }
        };
        return e;
    }

    function range(start, end, increment) {
        start = start || 0;
        end = end || 0;
        if (start > end)
            throw new Error("Start cannot be greater than end.");
        if (increment == null)
            increment = 1;
        var e = new exjs.Enumerable();
        e.getEnumerator = function () {
            return rangeEnumerator(start, end, increment);
        };
        return e;
    }
    exjs.range = range;
})(exjs || (exjs = {}));
var exjs;
(function (exjs) {
    function reverseEnumerator(prev) {
        var a;
        var i = 0;
        var e = {
            current: undefined,
            moveNext: function () {
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

    exjs.Enumerable.prototype.reverse = function () {
        var _this = this;
        var e = new exjs.Enumerable();
        e.getEnumerator = function () {
            return reverseEnumerator(_this);
        };
        return e;
    };
})(exjs || (exjs = {}));
var exjs;
(function (exjs) {
    function selectEnumerator(prev, selector) {
        var t;
        var i = 0;
        var e = {
            current: undefined,
            moveNext: function () {
                if (!t)
                    t = prev.getEnumerator();
                if (!t.moveNext())
                    return false;
                e.current = selector(t.current, i);
                i++;
                return true;
            }
        };
        return e;
    }

    function selectManyEnumerator(prev, selector) {
        var t;
        var active;
        var e = {
            current: undefined,
            moveNext: function () {
                e.current = undefined;
                if (!t)
                    t = prev.getEnumerator();
                while (!active || !active.moveNext()) {
                    if (!t.moveNext())
                        return false;
                    var selected = selector(t.current);
                    var en = selected;
                    if (en instanceof Array)
                        en = en.en();
                    active = en.getEnumerator();
                }
                e.current = active.current;
                return true;
            }
        };
        return e;
    }

    exjs.Enumerable.prototype.select = function (selector) {
        var _this = this;
        var e = new exjs.Enumerable();
        e.getEnumerator = function () {
            return selectEnumerator(_this, selector);
        };
        return e;
    };
    exjs.Enumerable.prototype.selectMany = function (selector) {
        var _this = this;
        var e = new exjs.Enumerable();
        e.getEnumerator = function () {
            return selectManyEnumerator(_this, selector);
        };
        return e;
    };
})(exjs || (exjs = {}));
var exjs;
(function (exjs) {
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

    exjs.Enumerable.prototype.skip = function (count) {
        var _this = this;
        var e = new exjs.Enumerable();
        e.getEnumerator = function () {
            return skipEnumerator(_this, count);
        };
        return e;
    };
    exjs.Enumerable.prototype.skipWhile = function (predicate) {
        var _this = this;
        var e = new exjs.Enumerable();
        e.getEnumerator = function () {
            return skipWhileEnumerator(_this, predicate);
        };
        return e;
    };
})(exjs || (exjs = {}));
var exjs;
(function (exjs) {
    function takeEnumerator(prev, count) {
        var t;
        var i = 0;
        var e = {
            current: undefined,
            moveNext: function () {
                if (!t)
                    t = prev.getEnumerator();
                i++;
                if (i > count)
                    return false;
                e.current = undefined;
                if (!t.moveNext())
                    return false;
                e.current = t.current;
                return true;
            }
        };
        return e;
    }

    function takeWhileEnumerator(prev, predicate) {
        var t;
        var i = 0;
        var e = {
            current: undefined,
            moveNext: function () {
                if (!t)
                    t = prev.getEnumerator();

                if (!t.moveNext() || !predicate(t.current, i)) {
                    e.current = undefined;
                    return false;
                }
                i++;

                e.current = t.current;
                return true;
            }
        };
        return e;
    }

    exjs.Enumerable.prototype.take = function (count) {
        var _this = this;
        var e = new exjs.Enumerable();
        e.getEnumerator = function () {
            return takeEnumerator(_this, count);
        };
        return e;
    };
    exjs.Enumerable.prototype.takeWhile = function (predicate) {
        var _this = this;
        var e = new exjs.Enumerable();
        e.getEnumerator = function () {
            return takeWhileEnumerator(_this, predicate);
        };
        return e;
    };
})(exjs || (exjs = {}));
var exjs;
(function (exjs) {
    function unionEnumerator(prev, second, comparer) {
        comparer = comparer || function (f, s) {
            return f === s;
        };
        var t;
        var visited = [];
        var s;
        var e = {
            current: undefined,
            moveNext: function () {
                if (!t)
                    t = prev.distinct().getEnumerator();
                e.current = undefined;
                if (!s && t.moveNext()) {
                    visited.push(e.current = t.current);
                    return true;
                }
                s = s || second.distinct().getEnumerator();
                while (s.moveNext()) {
                    for (var i = 0, hit = false, len = visited.length; i < len && !hit; i++) {
                        hit = comparer(visited[i], s.current);
                    }
                    if (!hit) {
                        e.current = s.current;
                        return true;
                    }
                }
                return false;
            }
        };
        return e;
    }

    exjs.Enumerable.prototype.union = function (second, comparer) {
        var _this = this;
        var en = second instanceof Array ? second.en() : second;
        var e = new exjs.Enumerable();
        e.getEnumerator = function () {
            return unionEnumerator(_this, en, comparer);
        };
        return e;
    };
})(exjs || (exjs = {}));
var exjs;
(function (exjs) {
    function whereEnumerator(prev, filter) {
        var t;
        var e = {
            current: undefined,
            moveNext: function () {
                if (!t)
                    t = prev.getEnumerator();
                var c;
                while (t.moveNext()) {
                    if (filter(c = t.current)) {
                        e.current = c;
                        return true;
                    }
                }
                return false;
            }
        };
        return e;
    }

    exjs.Enumerable.prototype.where = function (filter) {
        var _this = this;
        var e = new exjs.Enumerable();
        e.getEnumerator = function () {
            return whereEnumerator(_this, filter);
        };
        return e;
    };
})(exjs || (exjs = {}));
var exjs;
(function (exjs) {
    function zipEnumerator(prev, second, resultSelector) {
        var s;
        var t;
        var e = {
            current: undefined,
            moveNext: function () {
                if (!s)
                    s = prev.getEnumerator();
                if (!t)
                    t = second.getEnumerator();
                e.current = undefined;
                if (!s.moveNext() || !t.moveNext())
                    return false;
                e.current = resultSelector(s.current, t.current);
                return true;
            }
        };
        return e;
    }

    exjs.Enumerable.prototype.zip = function (second, resultSelector) {
        var _this = this;
        var en = second instanceof Array ? second.en() : second;
        var e = new exjs.Enumerable();
        e.getEnumerator = function () {
            return zipEnumerator(_this, en, resultSelector);
        };
        return e;
    };
})(exjs || (exjs = {}));
//# sourceMappingURL=ex.js.map
