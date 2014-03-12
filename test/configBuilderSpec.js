var buildConfig = require("../lib/configBuilder"),
	assert = require('assert');


describe ("Config Builder", function () {

	beforeEach(function(){
		args = ["", "", "", "", ""];
	});

	it("should be able to take a set input file", function(){
		var inputFile = "tests/fixtures/spec/exampleSpec.feature";
		args[2] = inputFile;
		assert.equal(buildConfig(args).inputFile, inputFile);
	});

	it("should be able to take a set file to compare to", function(){
		var comparisonFile = "tests/fixtures/spec/exampleSpec.feature";
		args[3] = comparisonFile;
		assert.equal(buildConfig(args).comparisonFile, comparisonFile);
	});

	it("should be able to have an output file when set", function(){
		var outputFile = "tests/fixtures/test-output/output.tmp.json";
		args[4] = outputFile;
		assert.equal(buildConfig(args).outputFile, outputFile);
	});

	it("should raise an exeption if the input file isnt passed", function() {
		args[2] = undefined;
		assert.throws(function() {buildConfig(args)}, Error, "An input file must be specified");
	});

	it("should raise an exeption if the comparison file isnt passed", function() {
		args[3] = undefined;
		assert.throws(function() {buildConfig(args)}, Error, "A comparison file must be specified");
	});

	it("should raise an exeption if the output file isnt passed", function() {
		args[4] = undefined;
		assert.throws(function() {buildConfig(args)}, Error, "An output file must be specified");
	});
});