var JunitXmlWriter = require('../lib/junitXmlWriter'),
    assert = require('assert'),
    fs = require('fs'),
    outputPath = 'junit-output.xml',
    parseString = require('xml2js').parseString;


describe("junit XML writer", function () {
    var xmlWriter;

    beforeEach(function () {
        if(fs.existsSync(outputPath)) {
            fs.unlinkSync(outputPath);
        }
        xmlWriter = new JunitXmlWriter();
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
            results.passed = complexObject();
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

    it("creates a passing testcase for a spec", function(done) {
        var results = responseObject();
        results.passed.push(simpleObject());

        xmlWriter.writeResults(results);
        var output = fs.readFileSync(outputPath, 'utf8');
        parseString(output, function (err, result) {
            assert.equal(result.testsuite.testcase[0].$.classname, 'describe');
            assert.equal(result.testsuite.testcase[0].$.name, 'spec');
            done();
        });
    });

    it("handles multiple passing specs", function(done) {
        var results = responseObject();
        results.passed = complexObject();

        xmlWriter.writeResults(results);
        var output = fs.readFileSync(outputPath, 'utf8');
        parseString(output, function (err, result) {
            assert.equal(result.testsuite.testcase[0].$.classname, 'a describe');
            assert.equal(result.testsuite.testcase[0].$.name, 'a spec');
            assert.equal(result.testsuite.testcase[1].$.classname, 'a describe');
            assert.equal(result.testsuite.testcase[1].$.name, 'another spec');
            assert.equal(result.testsuite.testcase[2].$.classname, 'another passing describe');
            assert.equal(result.testsuite.testcase[2].$.name, 'a final spec');
            done();
        });
    });

    it("adds a skipped node for pending specs", function(done) {
        var results = responseObject();
        results.pending.push(simpleObject());

        xmlWriter.writeResults(results);
        var output = fs.readFileSync(outputPath, 'utf8');
        parseString(output, function (err, result) {
            assert.equal(result.testsuite.testcase[0].$.classname, 'describe');
            assert.equal(result.testsuite.testcase[0].$.name, 'spec');
            assert.equal(result.testsuite.testcase[0].skipped, 'pending');
            done();
        });
    });

    it("adds a failure node for failing specs", function(done){
        var results = responseObject();
        results.failed.push(simpleObject());

        xmlWriter.writeResults(results);
        var output = fs.readFileSync(outputPath, 'utf8');
        parseString(output, function (err, result) {
            assert.equal(result.testsuite.testcase[0].$.classname, 'describe');
            assert.equal(result.testsuite.testcase[0].$.name, 'spec');
            assert.equal(result.testsuite.testcase[0].failure, 'line');
            done();
        });
    });

    it("handles a spec that isnt nested in a describe", function(done) {
        var results = responseObject();
        results.passed.push(specWithoutDescribe());

        xmlWriter.writeResults(results);
        var output = fs.readFileSync(outputPath, 'utf8');
        parseString(output, function (err, result) {
            assert.equal(result.testsuite.testcase[0].$.classname, '');
            assert.equal(result.testsuite.testcase[0].$.name, 'a spec');
            done();

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

    function specWithoutDescribe() {
        return  {"a spec": "line"}
    }
});