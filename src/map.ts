module exjs {
    export interface IMap<TKey, TValue> {
        size: number;
        clear();
        delete(key: TKey): boolean;
        entries(): IEnumerableEx<any[]>;
        forEach(callbackFn: (value: TValue, key: TKey, map?: IMap<TKey, TValue>) => void, thisArg?: any);
        get(key: TKey): TValue;
        has(key: TKey): boolean;
        keys(): IEnumerableEx<TKey>;
        set(key: TKey, value: TValue): any;
        values(): IEnumerableEx<TValue>;
    }

    export class Map<TKey, TValue> implements IMap<TKey, TValue> {
        private _keys: TKey[] = [];
        private _values: TValue[] = [];

        get size (): number {
            return this._keys.length;
        }

        constructor ();
        constructor (enumerable: any[][]);
        constructor (enumerable: IEnumerable<any[]>);
        constructor (enumerable?: any) {
            var enu: IEnumerable<any[]>;
            if (enumerable instanceof Array) {
                enu = (<Array<any[]>>enumerable).en();
            } else if (enumerable && enumerable.getEnumerator instanceof Function) {
                enu = <IEnumerable<any[]>>enumerable;
            }

            if (!enu)
                return;
            for (var en = enu.getEnumerator(); en && en.moveNext();) {
                this.set(en.current[0], en.current[1]);
            }
        }

        clear () {
            this._keys.length = 0;
            this._values.length = 0;
        }

        delete (key: TKey): boolean {
            var index = this._keys.indexOf(key);
            if (!(index > -1))
                return false;
            this._keys.splice(index, 1);
            this._values.splice(index, 1);
            return true;
        }

        entries (): IEnumerableEx<any[]> {
            return exjs.range(0, this.size).select(i => [this._keys[i], this._values[i]]);
        }

        forEach (callbackFn: (value: TValue, key: TKey, map?: IMap<TKey, TValue>) => void, thisArg?: any) {
            if (thisArg == null)
                thisArg = this;
            for (var i = 0, keys = this._keys, vals = this._values, len = keys.length; i < len; i++) {
                callbackFn.call(thisArg, vals[i], keys[i], this);
            }
        }

        get (key: TKey): TValue {
            var index = this._keys.indexOf(key);
            return this._values[index];
        }

        has (key: TKey): boolean {
            return this._keys.indexOf(key) > -1;
        }

        keys (): IEnumerableEx<TKey> {
            return this._keys.en();
        }

        set (key: TKey, value: TValue): any {
            var index = this._keys.indexOf(key);
            if (index > -1) {
                this._values[index] = value;
            } else {
                this._keys.push(key);
                this._values.push(value);
            }
            return undefined;
        }

        values (): IEnumerableEx<TValue> {
            return this._values.en();
        }
    }
    if (!(<any>window).Map)
        (<any>window).Map = Map;
}