'use strict';

describe("dateToString test", function() {
    var d;
    var result;
    beforeEach(function() {
        d = new Date();
        result = dateToString(d);
    });

    it("should return a string", function() {
        expect(typeof result).toBe('string');
    });

    it("should return a string in the format of mm/dd/yyyy", function() {
        expect(result).toMatch(/\d\d\/\d\d\/\d\d\d\d/);
    });

    it("should return an empty string if the date object is null", function() {
        d = null;
        result = dateToString(d);
        expect(result).toBe("");
    });

    it("should return an empty string if the date object is undefined", function() {
        d = undefined;
        result = dateToString(d);
        expect(result).toBe("");
    });

    it("should return an empty string if the object is not a date object", function() {
        d = {foo:'bar'};
        result = dateToString(d);
        expect(result).toBe("");
    });

    it("should return an empty string if the date is not valid", function() {
        var x = Date.parse("234234234234");
        result = dateToString(x);
        expect(result).toBe("");
    });
});