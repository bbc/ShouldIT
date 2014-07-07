var buildConfig = require("../lib/configBuilder"),
    assert = require('assert');


describe ("Config Builder", function () {

    beforeEach(function(){
        args = ['node', '/mocha', '--specs=exampleSpec.feature', '--results=results.json,results.xml'];
    });

    it("should be able to take a set input file", function(){
        var glob = "tests/fixtures/spec/exampleSpec.feature";
        args[2] = '--specs=' + glob;
        assert.equal(buildConfig(args).specs, glob);
    });

    it("should be able to take a set file to compare to", function(){
        var comparisonFile = "tests/fixtures/spec/exampleSpec.feature";
        args[3] = '--results=' + comparisonFile;
        assert.equal(buildConfig(args).results, comparisonFile);
    });

    it("should raise an exeption if the input file isnt passed", function() {
        args[2] = undefined;
        assert.equal(buildConfig(args).message, "A specs glob such as path/*.feature must be specified.");
    });

    it("should raise an exeption if the comparison file isnt passed", function() {
        args[3] = undefined;
        assert.equal(buildConfig(args).message, "A results file must be specified.");
    });

    it("should be able to add a comma deliminated tag", function() {
        args[4] = "--tags=richard,john";
        assert.equal(buildConfig(args).tags, ['richard', 'john']);
    });

});