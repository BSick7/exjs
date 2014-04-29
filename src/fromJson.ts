interface Function {
    fromJson<T>(o: any, mappingOverrides?: any): T;
}

Function.prototype.fromJson = function<T>(o: any, mappingOverrides?: any): T {
    var rv = new this();

    var mapped: string[] = [];

    for (var key in mappingOverrides) {
        var j = mapSubProperty(o[key], mappingOverrides[key]);
        if (j === undefined)
            continue;
        rv[key] = j;
        mapped.push(key);
    }

    for (var key in this.$jsonMappings) {
        if (mapped.indexOf(key) > -1)
            continue;
        var j = mapSubProperty(o[key], this.$jsonMappings[key]);
        if (j === undefined)
            continue;
        rv[key] = j;
        mapped.push(key);
    }

    for (var key in o) {
        if (mapped.indexOf(key) > -1)
            continue;
        rv[key] = o[key];
    }

    return rv;

    function mapSubProperty(j: any, mapping: any): any {
        if (j == null)
            return j;
        if (mapping instanceof Function)
            return mapping(j);
        if (mapping instanceof Array) {
            mapping = mapping[0];
            if (!(mapping instanceof Function) || !(j instanceof Array))
                return undefined;
            var arr = [];
            for (var i = 0; i < j.length; i++) {
                arr.push(mapping(j[i]));
            }
            return arr;
        }
        return undefined;
    }
};