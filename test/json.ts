/// <reference path="../lib/qunit/qunit.d.ts" />
/// <reference path="../dist/ex.d.ts" />

QUnit.module("json");

var msToYears = 31536000000;
class Person {
    birthdate: number;

    get age (): number {
        var agems = new Date().getTime() - this.birthdate;
        return Math.floor(agems / msToYears);
    }

    address: Address;

    private _note: string;
    get note (): string {
        return this._note;
    }

    set note (value: string) {
        this._note = value;
        this.onNoteChanged && this.onNoteChanged(value);
    }
    onNoteChanged: (note: string) => void;
}
class Address {
    street: string;
}

class Entry {
    id: number;
}
class Batch {
    static $jsonMappings = {
        'entries': [Entry]
    };

    entries: Entry[] = [];
}

test("fromJson", () => {
    var bdate = new Date().getTime() - (35.5 * msToYears);
    var person = Person.fromJson<Person>({ 'birthdate': bdate, 'address': { 'street': '123 Noob Lane' } }, { address: Address });
    ok(person instanceof Person);
    ok(person.address instanceof Address);
    strictEqual(person.age, 35);
    strictEqual(person.address.street, '123 Noob Lane');

    person = Person.fromJson<Person>({ 'birthdate': bdate, 'address': { 'street': '123 Noob Lane' }});
    ok(!(person instanceof Address));

    person = Person.fromJson<Person>({ 'birthdate': bdate, 'note': 'test', 'address': { 'street': '123 Noob Lane' }});
    strictEqual(person.note, 'test');
    var flag = false;
    person.onNoteChanged = () => flag = true;
    person.note = 'new';
    strictEqual(person.note, 'new');
    ok(flag, 'should be notified of note change');


    //tests default mappings
    //also tests array mappings
    var batch = Batch.fromJson<Batch>({ 'entries': [{ id: 1 }, { id: 2 }] });
    ok(batch instanceof Batch);
    strictEqual(batch.entries.length, 2);
    ok(batch.entries[0] instanceof Entry);
    strictEqual(batch.entries[0].id, 1);
    ok(batch.entries[1] instanceof Entry);
    strictEqual(batch.entries[1].id, 2);
});