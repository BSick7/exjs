module exjs {
    export function round(value: number, digits?: number) {
        digits = digits || 0;
        if (digits === 0)
            return Math.round(value);
        var shift = Math.pow(10, digits);
        return Math.round(value * shift) / shift;
    }
}