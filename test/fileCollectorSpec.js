var fileCollector = require('../lib/fileCollector'),
    assert = require('assert');

describe("File Collector", function() {
    it("should take 2 add them to a list", function(done) {
        var inputFile = files()[0];
        var comparisonFile = files()[1];
        fileCollector(inputFile, comparisonFile, function(files){
            assert.equal(files.length, 2);
            done();
        });
    });

    describe("Input files contents", function(){
        it("should be that of the feature spec", function(done) {
            var inputFile = files()[0];
            var comparisonFile = files()[1];
            fileCollector(inputFile, comparisonFile, function(files){
                assert.equal(JSON.stringify(files[0]), JSON.stringify(fileContent("inputFile")));
                done();
            });
        });
    });

    describe("Second files contents", function(){
        it("should be that of the feature spec", function(done) {
            var inputFile = files()[0];
            var comparisonFile = files()[1];
            fileCollector(inputFile, comparisonFile, function(files){
                assert.equal(JSON.stringify(files[1]), JSON.stringify(fileContent("comparisonFile")));
                done();
            });
        });
    });
});


// * Local methods  * //

function files() {
    return [
        "test/fixtures/test-output/output.json",
        "test/fixtures/test-output/jasmine-output1.json"
    ]
}

function fileContent(key) {
    var content = {
        "inputFile": {
            "describe something" : {
                "should do something" : "test/fixtures/spec/exampleSpec.feature:1"
            }
        },
        "comparisonFile": {
            "describe something" : {
                "should do something" : "PASSED"
            }
        }
    }

    return content[key];
}