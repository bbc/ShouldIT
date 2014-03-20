// var markdownParser = require('../lib/markdownParser'),
//     assert = require('assert');

// describe("Markdown parser", function() {

//     it("callsback with the first spec found", function(done) {
//         var inputFile = "test/fixtures/markdown/exampleSpec.md";
//         markdownParser(inputFile, function(spec) {
//             assert.equal(spec.description, "should do something");
//             done();
//         });
//     });

//     it("adds describe that the spec is nested in", function(done) {
//         var inputFile = "test/fixtures/markdown/describe.md";
//         markdownParser(inputFile, function(spec) {
//             assert.equal(spec.description, "should do something");
//             assert.equal(spec.suite.length, 1);
//             assert.equal(spec.suite[0], "a description");
//             done();
//         });
//     });
// });