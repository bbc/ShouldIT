var buildConfig = require("../lib/configBuilder"),
	assert = require('assert');


describe ("Config Builder", function () {

	beforeEach(function(){
		args = ["", "", "", ""];
	});

	it("should be able to have where the input file is set", function(){
		var inputFile = "tests/fixtures/spec/exampleSpec.feature";
		args[2] = inputFile;
		assert.equal(buildConfig(args).inputFile, inputFile);
	});

	it("should be able to have an output file when set", function(){
		var outputFile = "tests/fixtures/test-output/output.tmp.json";
		args[3] = outputFile;
		assert.equal(buildConfig(args).outputFile, outputFile);
	});

	it("should raise an exeption if the input file isnt passed", function() {
		args[2] = undefined;
		assert.throws(function() {buildConfig(args)}, Error, "An input file must be specified");
	});

	it("should raise an exeption if the output file isnt passed", function() {
		args[3] = undefined;
		assert.throws(function() {buildConfig(args)}, Error, "An output file must be specified");
	});
});