/// <reference path="../lib/qunit/qunit.d.ts" />
/// <reference path="../dist/arrayex.d.ts" />

QUnit.module("json");

var msToYears = 31536000000;
class Person {
    birthdate: number;
    get age(): number {
        var agems = new Date().getTime() - this.birthdate;
        return Math.floor(agems / msToYears);
    }
    address: Address;
}
class Address {
    street: string;
}

test("fromJson", () => {
    var bdate =  new Date().getTime() - (35.5 * msToYears);
    var person = Person.fromJson<Person>({ 'birthdate': bdate, 'address': { 'street': '123 Noob Lane' } }, { address: Address });
    ok(person instanceof Person);
    ok(person.address instanceof Address);
    strictEqual(person.age, 35);
    strictEqual(person.address.street, '123 Noob Lane');

    var person = Person.fromJson<Person>({ 'birthdate': bdate, 'address': { 'street': '123 Noob Lane' } });
    ok(!(person instanceof Address));
});