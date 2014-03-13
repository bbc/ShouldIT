(function(require){

    var spitterOuter = require('../lib/spitterOuter'),
        assert = require('assert');

    describe("Spitter Outer", function() {
        it("colorise output into an array of console messages", function() {
            var input = {
                passed: ["This has passed"],
                failed: ["This has failed"],
                pending: ["This is pending"]
            },
            result = spitterOuter(input);

            assert.equal(result[0], "\u001b[32mThis has passed\u001b[39m");
            assert.equal(result[1], "\u001b[31mThis has failed\u001b[39m");
            assert.equal(result[2], "\u001b[33mThis is pending\u001b[39m");

        });
    });
})(require);