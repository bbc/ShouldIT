describe("Junit output", function() {

    it("should be able to put results into a file", function(done) {
        var inputFile = "test/fixtures/junit/output.json";
        markdownParser(inputFile, function(spec) {
            assert.equal(spec.description, "should do something");
            done();
        });
    });

});