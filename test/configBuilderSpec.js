var buildConfig = require("../lib/configBuilder"),
    assert = require('assert');


describe ("Config Builder", function () {

    beforeEach(function(){
        args = ["", "", "", ""];
    });

    it("should be able to take a set input file", function(){
        var glob = "tests/fixtures/spec/exampleSpec.feature";
        args[2] = glob;
        assert.equal(buildConfig(args).specGlob, glob);
    });

    it("should be able to take a set file to compare to", function(){
        var comparisonFile = "tests/fixtures/spec/exampleSpec.feature";
        args[3] = comparisonFile;
        assert.equal(buildConfig(args).resultsGlob, comparisonFile);
    });

    it("should raise an exeption if the input file isnt passed", function() {
        args[2] = undefined;
        assert.throws(function() {buildConfig(args)}, Error, "A glob must be specified");
    });

    it("should raise an exeption if the comparison file isnt passed", function() {
        args[3] = undefined;
        assert.throws(function() {buildConfig(args)}, Error, "A comparison file must be specified");
    });

    // it("should be able to add a comma deliminated marker", function() {
    //     args[4] = undefined;
    //     assert.throws(function() {buildConfig(args)}, Error, "A comparison file must be specified");
    // });

});