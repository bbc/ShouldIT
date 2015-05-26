(function(require){

    var spitterOuter = require('../lib/spitterOuter'),
        assert = require('assert');

    describe("Spitter Outer", function() {
        it("colorise output into an array of console messages", function() {
            var input = {
                passed: [{"This has passed" : "line"}, {"This Suite": {"has also passed": "line"}}],
                failed: [{"This has failed" : "line"}],
                pending: [{"This is pending" : "line"}]
            }, config = {
                "outputDetails": ["failed","passed","pending"]
            },
            result = spitterOuter(input,config);

            assert.equal(result[0], "\u001b[32mThis has passed\u001b[39m");
            assert.equal(result[1], "\u001b[90mline\u001b[39m");

            assert.equal(result[2], "\u001b[32mThis Suite has also passed\u001b[39m");
            assert.equal(result[3], "\u001b[90mline\u001b[39m");

            assert.equal(result[4], "\u001b[31mThis has failed\u001b[39m");
            assert.equal(result[5], "\u001b[90mline\u001b[39m");

            assert.equal(result[6], "\u001b[33mThis is pending\u001b[39m");
            assert.equal(result[7], "\u001b[90mline\u001b[39m");

        });
        it("show failed only when selected", function() {
            var input = {
                passed: [{"This has passed" : "line"}, {"This Suite": {"has also passed": "line"}}],
                failed: [{"This has failed" : "line"}],
                pending: [{"This is pending" : "line"}]
            }, config = {
                "outputDetails": ["passed","pending"]
            },
            result = spitterOuter(input,config);

            assert.equal(result.length,6);
            
            assert.equal(result[0], "\u001b[32mThis has passed\u001b[39m");
            assert.equal(result[1], "\u001b[90mline\u001b[39m");

            assert.equal(result[2], "\u001b[32mThis Suite has also passed\u001b[39m");
            assert.equal(result[3], "\u001b[90mline\u001b[39m");

            assert.equal(result[4], "\u001b[33mThis is pending\u001b[39m");
            assert.equal(result[5], "\u001b[90mline\u001b[39m");
        });
        it("show passed only when selected", function() {
            var input = {
                        passed: [{"This has passed": "line"}, {"This Suite": {"has also passed": "line"}}],
                        failed: [{"This has failed": "line"}],
                        pending: [{"This is pending": "line"}]
                    }, config = {
                        "outputDetails": ["failed", "pending"]
                    }, result = spitterOuter(input, config);

            assert.equal(result.length, 4);
            
            assert.equal(result[0], "\u001b[31mThis has failed\u001b[39m");
            assert.equal(result[1], "\u001b[90mline\u001b[39m");

            assert.equal(result[2], "\u001b[33mThis is pending\u001b[39m");
            assert.equal(result[3], "\u001b[90mline\u001b[39m");

        });
        it("show pending only when selected", function() {
            var input = {
                        passed: [{"This has passed": "line"}, {"This Suite": {"has also passed": "line"}}],
                        failed: [{"This has failed": "line"}],
                        pending: [{"This is pending": "line"}]
                    }, config = {
                        "outputDetails": ["failed", "passed"]
                    }, result = spitterOuter(input, config);

            assert.equal(result.length, 6);
            
            assert.equal(result[0], "\u001b[32mThis has passed\u001b[39m");
            assert.equal(result[1], "\u001b[90mline\u001b[39m");

            assert.equal(result[2], "\u001b[32mThis Suite has also passed\u001b[39m");
            assert.equal(result[3], "\u001b[90mline\u001b[39m");

            assert.equal(result[4], "\u001b[31mThis has failed\u001b[39m");
            assert.equal(result[5], "\u001b[90mline\u001b[39m");

        });
        it("show nothing when no options selected", function() {
            var input = {
                        passed: [{"This has passed": "line"}, {"This Suite": {"has also passed": "line"}}],
                        failed: [{"This has failed": "line"}],
                        pending: [{"This is pending": "line"}]
                    }, config = {
                        "outputDetails": []
                    }, result = spitterOuter(input, config);

            assert.equal(result.length, 0);
            
        });
    });
})(require);