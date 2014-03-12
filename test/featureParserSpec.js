var featureParser = require('../lib/featureParser'),
	assert = require('assert');

describe("Feature parsing", function(done) {

	it("callsback with the first spec found", function(done) {
		var inputFile = "test/fixtures/spec/exampleSpec.feature";
		featureParser(inputFile, function(spec) {
            assert.equal(spec.description, "should do something");
            done();
        });
	});

});