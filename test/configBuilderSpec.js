var buildConfig = require("../lib/configBuilder"),
    assert = require('assert'),
    fs = require('fs');


describe ("Config Builder", function () {

    var args;

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
        assert.deepEqual(buildConfig(args).results, [comparisonFile]);
    });

    it("should be able to add a comma deliminated tag", function() {
        args[4] = "--tags=richard,john";
        assert.deepEqual(buildConfig(args).tags, ['richard', 'john']);
    });

    it("should be turn results into an array", function() {
        args[3] = "--results=richard,john";
        assert.deepEqual(buildConfig(args).results, ['richard', 'john']);
    });

    it("should be able to read config from a default file", function() {
        var data = { specs: "spec-file-specs", results: "spec-file-results"};
        fs.writeFileSync('shouldit.conf.json', JSON.stringify(data));
        assert.equal(buildConfig(['node', '/mocha']).specs, "spec-file-specs");
        assert.equal(buildConfig(['node', '/mocha']).results, "spec-file-results");
        fs.unlinkSync('shouldit.conf.json');
    });

    it("should be able to read config from a specified file", function() {
        var data = { specs: "myfile-specs", results: "myfile-results"};
        fs.writeFileSync('myfile.json', JSON.stringify(data));
        assert.equal(buildConfig(['node', '/mocha', '--config=myfile.json']).specs, "myfile-specs");
        fs.unlinkSync('myfile.json');
    });

    it("should be able take instruction on outputting summary information", function() {
        assert.equal(buildConfig(args).outputSummary, undefined);
        args[4] = '--output-summary=1';
        assert.equal(buildConfig(args).outputSummary, true);
    });
    
    it("should be able to add a comma deliminated outputDetails", function() {
        args[4] = "--output-details=passed,failed";
        assert.deepEqual(buildConfig(args).outputDetails, ['passed','failed']);
    });

});