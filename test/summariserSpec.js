(function(require){

    var summariser = require('../lib/summariser'),
        assert = require('assert');

    describe("Summmariser", function() {
        it("summarise and colorise results into an array of console messages", function() {
            var input = {
                passed: [{"This has passed" : "line"}, {"This Suite": {"has also passed": "line"}}],
                failed: [{"This has failed" : "line"}],
                pending: [{"This is pending" : "line"}]
            },
            result = summariser(input);

            assert.equal(result.length, 4);
            
            assert.equal(result[0], "\u001b[1m4 Specs defined\u001b[22m");
            assert.equal(result[1], "\u001b[32m2 Passed (50.0%)\u001b[39m");
            assert.equal(result[2], "\u001b[31m1 Failed (25.0%)\u001b[39m");
            assert.equal(result[3], "\u001b[33m1 Pending (25.0%)\u001b[39m");

        });
    });
})(require);