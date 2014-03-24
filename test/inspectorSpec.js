(function(require){

    var inspector = require('../lib/inspector'),
    assert = require('assert');


    describe("Inspector", function() {
        it("should tell when a match is found", function() {
            var expected = responseObject();
            expected.passed = [{
                "describe something": {
                    "should do something": "test/fixtures/spec/exampleSpec.feature:1"
                }
            }];
            objectsEqual(inspector(filesContent()), expected);
        });

        it("should tell when a match is not found", function() {

            var expected = responseObject();
            expected.pending = [{
                "describe something": {
                    "should do something": "test/fixtures/spec/exampleSpec.feature:1"
                }
            }];
            files = filesContent();
            files[1]["describe something"] = {"should do something else" : "PASSED"};
            objectsEqual(inspector(files), expected);
        });

        it("should tell when a non suite-ed match is found", function() {

            var expected = responseObject(),
                files;

            expected.passed = [{
                "should do something": "test/fixtures/spec/exampleSpec.feature:1"
            }];

            files = [
                {"should do something" : "test/fixtures/spec/exampleSpec.feature:1"},
                {"should do something" : "PASSED"}
            ];
            objectsEqual(inspector(files), expected);
        });

        it("should handle the spec not matching the output", function() {
            var expected = responseObject();
            expected.pending = 
            [
                {"first description": {
                    "should do something" : 'test/fixtures/spec/full.feature:2'
                    }
                },
                {"second description nested description" : {
                    "should do something else" : "test/fixtures/spec/full.feature:6"
                    }
                }
            ];

            files = [];
            files[0] = 
            {
                "first description": {
                    "should do something": "test/fixtures/spec/full.feature:2"
                },
                "second description nested description": {
                    "should do something else": "test/fixtures/spec/full.feature:6"
                }
            };

            files[1] = { 'describe something': { 'should do something': 'PASSED' } };

            objectsEqual(inspector(files), expected);

        });

        it("should handle multiple ITS inside a describe", function() {
            var expected = responseObject();
            expected.pending = 
            [
                { "first description": {"should do something" : "test/fixtures/spec/full.feature:2"}},
                { "second description nested description": {"should do something else" : "test/fixtures/spec/full.feature:6"}},
                { "second description nested description": {"should do a final thing" : "test/fixtures/spec/full.feature:7"}}
            ];

            files = [];
            files[0] = 
            {
                "first description": {
                    "should do something": "test/fixtures/spec/full.feature:2"
                },
                "second description nested description": {
                    "should do something else": "test/fixtures/spec/full.feature:6",
                    "should do a final thing": "test/fixtures/spec/full.feature:7"
                }
            };

            files[1] = { 'describe something': { 'should do something': 'PASSED' } };

            objectsEqual(inspector(files), expected);
        });

        it("should tell when a match is found but has a failing test", function() {

            var expected = responseObject();
            expected.failed =[{
                    "describe something": {"should do something": "test/fixtures/spec/exampleSpec.feature:1"}
            }];
            files = filesContent();
            files[1]["describe something"] = {"should do something" : "FAILED"};
            objectsEqual(inspector(files), expected);
        });

        it("should tell when a nested match is found", function() {
            var expected = responseObject();
            expected.passed = [{
                "describe something else": {"should do something": "test/fixtures/spec/exampleSpec.feature:1"}
            }];
            objectsEqual(inspector(nestedFilesContent()), expected);
        });
    });

    /* Local Methods */

    function objectsEqual(obj1, obj2) {
        assert.equal(
            JSON.stringify(obj1), JSON.stringify(obj2)
        );
    }

    function responseObject() {
        return {
            passed: [],
            failed: [],
            pending: []
        }
    }

    function filesContent() {
        return [{
            "describe something" : {
                "should do something" : "test/fixtures/spec/exampleSpec.feature:1"
            }
        },
        {
            "describe something" : {
                "should do something" : "PASSED"
            }
        }];
    }

    function nestedFilesContent() {
        return [{
            "describe something else" : {
                "should do something" : "test/fixtures/spec/exampleSpec.feature:1"
            }
        },
        {
            "describe something else" : {
                "should do something" : "PASSED"
            }
        }];
    }
})(require);