(function(require){

    var inspector = require('../lib/inspector'),
        assert = require('assert'),
        fs = require("fs"),
        feature = JSON.parse(fs.readFileSync("test/fixtures/results/results-example.json",'utf8'));

    describe("Inspector full", function() {
        it("should match top level specs", function() {
             var expected = [
                {"spec 1": "test/fixtures/spec/multiIt.feature:1"},
                {"spec 2": "test/fixtures/spec/multiIt.feature:2"}
            ];
            testResult = {
                "spec 1": "PASSED",
                "spec 2": "PASSED"
            };
            objectsEqual(inspector([feature, testResult]).passed, expected);
        });

        it("should match first level specs", function() {
             var expected = [
                {"open description should do something": "test/fixtures/spec/closedDescribeNewline.feature:4"},
                {"first description should do something": "test/fixtures/spec/fullNewlineDelimiter.feature:2"},
            ];
            testResult = {
                "open description": {
                    "should do something": "PASSED"
                },
                "first description": {
                    "should do something": "PASSED"
                }
            }
            objectsEqual(inspector([feature, testResult]).passed, expected);
        });
    });

    function responseObject() {
        return {
            passed: [],
            failed: [],
            pending: []
        }
    }

    function objectsEqual(obj1, obj2) {
        assert.equal(
            JSON.stringify(obj1), JSON.stringify(obj2)
        );
    }


})(require);