var markdownParser = require('../lib/markdownParser'),
    assert = require('assert');

describe("Markdown parser", function() {

    it("callsback with the first spec found", function(done) {
        var inputFile = "test/fixtures/markdown/exampleSpec.md";
        markdownParser(inputFile, function(spec) {
            assert.equal(spec.description, "should do something");
            done();
        });
    });
});