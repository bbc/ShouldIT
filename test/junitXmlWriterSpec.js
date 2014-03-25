var JunitXmlWriter = require('../lib/junitXmlWriter'),
    assert = require('assert'),
    fs = require('fs'),
    outputPath = '../junit-output.xml',
    parseString = require('xml2js').parseString;


describe("junit XML writer", function () {
    var xmlWriter;
    beforeEach(function () {
        if(fs.existsSync(outputPath)) {
            fs.unlinkSync(outputPath);
        }
        xmlWriter = new JunitXmlWriter();
    });

    it("should write to an output file", function () {
        var results = {"a describe": {"a spec": "PASSED"}};

        xmlWriter.writeResults(results);
        assert(fs.existsSync(outputPath));
    });

    describe("counting the specs", function() {

        it("specifies the correct number of tests in a suite", function(done) {
            var results = responseObject();
            results.passed.push({"a describe": {"a spec": "PASSED"}});
            xmlWriter.writeResults(results);

            var output = fs.readFileSync(outputPath, 'utf8');
            parseString(output, function (err, result) {
                assert.equal(result.testsuite.$.tests, 1);
                done();
            });
        });

        it("counts the number of specs including failing and pending", function(done) {
            var results = responseObject();
            results.passed.push(complexObject());
            results.failed.push(simpleObject());
            results.pending.push(simpleObject());
            xmlWriter.writeResults(results);

            var output = fs.readFileSync(outputPath, 'utf8');
            parseString(output, function (err, result) {
                assert.equal(result.testsuite.$.tests, 5);
                done();
            });
        });

    });


    function responseObject() {
        return {
            passed: [],
            failed: [],
            pending: []
        }
    }

    function complexObject() {
        return [{
            "a describe": {
                "a spec": "line",
                "another spec": "line"
            }
        },
        {
            "another passing describe": {
                "a final spec" : "line"
            }
        }]
    }

    function simpleObject() {
        return {
            "describe" : { "spec": "line"}
        }
    }
});