(function(require){

    var inspector = require('../lib/inspector'),
        assert = require('assert'),
        fs = require("fs"),
        feature = JSON.parse(fs.readFileSync("test/fixtures/results/results-example.json",'utf8'));

    describe.only("Inspector full", function() {
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
            };
            objectsEqual(inspector([feature, testResult]).passed, expected);
        });

        it("should match second level specs", function() {
             var expected = [
                {"a description another description should match 2 descriptions": "test/fixtures/spec/twoDescribes.feature:3"},
                {"second description nested description should do something else": "test/fixtures/spec/fullNewlineDelimiter.feature:6"},
            ];
            testResult = {
                "a description": {
                    "another description": {
                        "should match 2 descriptions": "PASSED"
                    }
                },
                "second description": {
                    "nested description": {
                        "should do something else": "PASSED"
                    }
                }
            };
            objectsEqual(inspector([feature, testResult]).passed, expected);
        });

        it("should match nested and non nested specs", function() {
             var expected = [
                {"second description nested description should do something else": "test/fixtures/spec/fullNewlineDelimiter.feature:6"},
                {"should only be displayed if the \"Live Page Cross Promo\" module is present.": "test/fixtures/spec/realSpec.feature:26"}
            ];
            testResult = {
                "second description": {
                    "nested description": {
                        "should do something else": "PASSED"
                    }
                },
                "should only be displayed if the \"Live Page Cross Promo\" module is present.": "PASSED",
            };
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