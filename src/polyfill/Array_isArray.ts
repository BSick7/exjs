module exjs {
    if (!Array.isArray) {
        Array.isArray = function (arg): arg is Array<any> {
            return Object.prototype.toString.call(arg) === '[object Array]';
        };
    }
}