var featureParser = require('../lib/featureParser'),
	assert = require('assert');

describe("Feature parsing", function(done) {

    beforeEach(function() {
        featureParser = require('../lib/featureParser');
    });

	it("callsback with the first spec found", function(done) {
		var inputFile = "test/fixtures/spec/exampleSpec.feature";
		featureParser(inputFile, function(spec) {
            assert.equal(spec.description, "should do something");
            done();
        });
	});

    it("handles lowercase it", function(done) {
        var inputFile = "test/fixtures/spec/exampleSpecLc.feature";
        featureParser(inputFile, function(spec) {
            assert.equal(spec.description, "should do something");
            done();
        });
    });

    it("adds describe that the spec is nested in", function(done) {
        var inputFile = "test/fixtures/spec/describe.feature";
        featureParser(inputFile, function(spec) {
            assert.equal(spec.description, "should do something");
            assert.equal(spec.suite.length, 1);
            assert.equal(spec.suite[0], "a description");
            done();
        });
    });

    it("can add multiple levels of describes", function(done) {
        var inputFile = "test/fixtures/spec/twoDescribes.feature";
        featureParser(inputFile, function(spec) {
            assert.equal(spec.description, "should match 2 descriptions");
            assert.equal(spec.suite.length, 2);
            assert.equal(spec.suite[0], "a description");
            assert.equal(spec.suite[1], "another description");
            done();
        });
    });

    it("can remove a describe when it is closed", function(done) {
        var inputFile = "test/fixtures/spec/closedDescribe.feature";
        featureParser(inputFile, function(spec) {
            assert.equal(spec.description, "should do something");
            assert.equal(spec.suite.length, 1);
            assert.equal(spec.suite[0], "open description");
            done();
        });
    });

    it("calls the callback for each IT", function(done) {
        var inputFile = "test/fixtures/spec/multiIt.feature";
        var callcount = 0;
        featureParser(inputFile, function(spec) {
            callcount++;
            assert.equal(spec.description, "spec " + callcount);
            if(callcount == 2) {done()};
        });
    });

});