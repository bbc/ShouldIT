var inspector = require('../lib/inspector'),
    assert = require('assert');

describe("Inspector", function() {
    it("should take 2 files content in a list", function(done) {
        var inputFile = "test/fixtures/test-output/jasmine-output1.json";
        var comparisonFile = "test/fixtures/test-output/jasmine-output1.json";
        inspector(inputFile, comparisonFile, function(files){
            assert.equal(files.length, 2);
            done();
        });
    });
});