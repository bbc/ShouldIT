describe ("Config", function () {

	beforeEach(function(){
		process.argv = ["", "", "", ""];
	});

	it("should be able to have where the input file is set", function(){
		var inputFile = "tests/fixtures/spec/exampleSpec.feature";
		process.argv[2] = inputFile;
		expect(buildConfig().inputFile).toBe(inputFile);
	});

	it("should be able to have an output file when set", function(){
		var outputFile = "tests/fixtures/test-output/output.tmp.json";
		process.argv[3] = outputFile;
		expect(buildConfig().outputFile).toBe(outputFile);
	});

	it("should raise an exeption if the input file isnt passed", function() {
		process.argv[2] = undefined;
		expect(function() {buildConfig()}).toThrow(new Error("An input file must be specified"));
	});

	it("should raise an exeption if the output file isnt passed", function() {
		process.argv[3] = undefined;
		expect(function() {buildConfig()}).toThrow(new Error("An output file must be specified"));
	});
});

describe("Feature parsing", function() {
	it("should return a list with a size equal to the number of specs parsed", function() {
		var inputFile = "tests/fixtures/spec/exampleSpec.feature";
		expect(parseFeature(inputFile).length).toBe(1);
	});
});