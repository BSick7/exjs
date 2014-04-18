interface Function {
    fromJson<T>(o:any, mappingOverrides?:any): T;
}

Function.prototype.fromJson = function<T>(o:any, mappingOverrides?:any):T {
    var rv = new this();

    var mapped:string[] = [];

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