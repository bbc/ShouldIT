(function(require){

    var inspector = require('../lib/inspector'),
    assert = require('assert');


    describe("Inspector", function() {
        it("should tell when a match is found", function() {
            var expected = responseObject();
            expected.passed = [{
                "describe something should do something": "test/fixtures/spec/exampleSpec.feature:1"
            }];
            objectsEqual(inspector(filesContent()), expected);
        });

        it("should tell when a match is not found", function() {

            var expected = responseObject();
            expected.pending = [{
                "describe something should do something": "test/fixtures/spec/exampleSpec.feature:1"
            }];
            files = filesContent();
            files[1]["describe something"] = {"should do something else" : "PASSED"};
            objectsEqual(inspector(files), expected);
        });

        it("should tell when a match is found but has a failing test", function() {

            var expected = responseObject();
            expected.failed =[{
                    "describe something should do something": "test/fixtures/spec/exampleSpec.feature:1"
            }];
            files = filesContent();
            files[1]["describe something"] = {"should do something" : "FAILED"};
            objectsEqual(inspector(files), expected);
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
})(require);