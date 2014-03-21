var ParserFactory = require('../lib/parserFactory'),
    featureParser = require('../lib/featureParser'),
    markdownParser = require('../lib/markdownParser'),
    assert = require('assert');

describe.only("parserFactory", function() {
    var factory;
    beforeEach(function() {
        factory = new ParserFactory();
    });

    it("returns the feature parser by default", function() {
        assert.equal(factory.getParserForString("something"), featureParser);
    });

    it("returns the markdown parser for file with an md extension", function() {
        assert.equal(factory.getParserForString("file.md"), markdownParser);
    });

    it("takes the file extensions from the characters after the last period in a string", function() {
        assert.equal(factory.getParserForString("some.kind.of.file.md"), markdownParser);
    });
});