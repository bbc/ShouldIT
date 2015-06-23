var assert = require('assert'),
    mockery = require('mockery'),
    sinon = require('sinon');

describe("Result collector", function() {
    var calls = [],
        globStub,
        resultCollector,
        i;

    beforeEach(function() {
        i = 0;
        var object,
            transformer = function (file, callback) {
                i++;
                object = {};
                object['some data' + i] = 'some value';
                callback(JSON.stringify(object));
            };

        resultCollector = require('../lib/resultCollector');
    });

    afterEach(function() {
        calls = [];
        mockery.disable();
    });

    it("should fire a callback passing in an object made up of merged objects", function(done) {
        resultCollector(['test/fixtures/multiple_results/*.json']).then(function(data) {
            assert.equal(JSON.stringify(data), JSON.stringify({
                "Results1": {
                    "should be able to have tests": "PASSED",
                    "should be able to merge tests": "PASSED"
                },
                "Results2": {
                    "should be able to other context based tests": "PASSED"
                }
            }));
            done();
        });
        
    });
});