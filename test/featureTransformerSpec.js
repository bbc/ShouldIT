var featureTransformer = require('../lib/featureTransformer'),
    fs = require('fs'),
    chai = require('chai'),
    assert = require('chai').assert;
chai.use(require('chai-fuzzy'));;

describe("Tranformation", function() {

    it("transforms a single IT", function(done) {
        var inputFile = "test/fixtures/spec/exampleSpec.feature";
        var tempOut =  "test/fixtures/test-output/tmp.json"
        var expectedOutput = {
            "should do something" : "test/fixtures/spec/exampleSpec.feature:1"
        }

        featureTransformer(inputFile, tempOut, function() {
            fs.readFile(tempOut, 'utf8', function (err, data) {
                if (err) throw err;
                assert.notEqual(data, "");
                assert.like(JSON.parse(data), expectedOutput);
                done();
            });
        });
        
    });

    it("transforms a describe", function(done) {
        var inputFile = "test/fixtures/spec/describe.feature";
        var tempOut =  "test/fixtures/test-output/tmp.json";
        var expectedOutput = {
            "a description" : {
                "should do something" : "test/fixtures/spec/describe.feature:2"
            }
        }

        featureTransformer(inputFile, tempOut, function() {
            fs.readFile(tempOut, 'utf8', function (err, data) {
                if (err) throw err;
                assert.notEqual(data, "");
                assert.like(JSON.parse(data), expectedOutput);
                done();
            });
        });
        
    });
});