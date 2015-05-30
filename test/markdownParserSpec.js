var markdownParser = require('../lib/markdownParser'),
    assert = require('assert');

describe("Markdown parser", function() {

    it("callsback with the first spec found", function(done) {
        var inputFile = "test/fixtures/markdown/exampleSpec.md";
        markdownParser(inputFile, [], function(spec) {
            assert.equal(spec.description, "should do something");
            done();
        });
    });

    it("adds describe that the spec is nested in", function(done) {
        var inputFile = "test/fixtures/markdown/describe.md";
        markdownParser(inputFile, [], function(spec) {
            assert.equal(spec.description, "should do something");
            assert.equal(spec.suite.length, 1);
            assert.equal(spec.suite[0], "a description");
            done();
        });
    });

    it("replaces the suite if a header is found at the same level", function(done) {
        var inputFile = "test/fixtures/markdown/full.md";
        var count = 0;
        markdownParser(inputFile, [], function(spec) {
            count++;
            if(count == 2) {
                assert.equal(spec.description, "a second spec");
                assert.equal(spec.suite.length, 3);
                assert.equal(spec.suite[1], "a third description");
                done();
            }
        });
    });

    // # a describe
    // ## another description
    // * a spec         --------> this has two suites, 'a desribe' and 'another describe'
    // # reset describe
    // * a second spec   ------> this should only have the suite of 'reset describe'
    it("removes any suites that have been closed by a smaller level of header", function(done) {
        var inputFile = "test/fixtures/markdown/describeReset.md";
        var count = 0;
        markdownParser(inputFile, [], function(spec) {
            count++;
            if(count == 2) {
                assert.equal(spec.description, "a second spec");
                assert.equal(spec.suite.length, 1);
                assert.equal(spec.suite[0], "reset describe");
                done();
            }
        });
    });

    // + a spec ----> should be treated as a spec
    it("handles specs defined with a +", function(done) {
        var inputFile = "test/fixtures/markdown/skipStep.md";
        markdownParser(inputFile, [], function(spec) {
            assert.equal(spec.description, "a second spec");
            assert.equal(spec.suite.length, 1);
            assert.equal(spec.suite[0], "a description");
            done();
        });
    });
    //+ a spec
    ///            -----> empty last line
    it("handles files with extra returns", function(done) {
        var inputFile = "test/fixtures/markdown/emptyLast.md";
        var count = 0;
        markdownParser(inputFile, [], function(spec) {
            count++;
            if(count == 2) {
                assert.equal(spec.last, true);
                assert.equal(spec.description, null);
                done();
            }
        });
    });

    it("skips a file with a chevron on the first line", function(done) {
        var inputFile = "test/fixtures/markdown/skipFile.md";
        markdownParser(inputFile, [], function(spec) {
            assert.equal(spec.last, true);
            assert.equal(spec.skip, true);
            assert.equal(spec.description, null);
            done();
        });
    });

    it("skips a file with a skip regardless of case", function(done){
        var inputFile = "test/fixtures/markdown/upperSkip.md";
        markdownParser(inputFile, [], function(spec) {
            assert.equal(spec.last, true);
            assert.equal(spec.skip, true);
            assert.equal(spec.description, null);
            done();
        });
    });

    it("matches skips with no space between the chevron and skip keyword", function(done) {
        var inputFile = "test/fixtures/markdown/skipNoSpace.md";
        markdownParser(inputFile, [], function(spec) {
            assert.equal(spec.last, true);
            assert.equal(spec.skip, true);
            assert.equal(spec.description, null);
            done();
        });
    });

    it("skips everything after a skip", function(done) {
        var inputFile = "test/fixtures/markdown/skipPart.md";
        var count = 0;
        markdownParser(inputFile, [], function(spec) {
            count++;
            if(count >= 2) {
                assert.equal(spec.skip, true);
                done();
            }
        });
    });

    it("strips its from the matched spec", function(done) {
        var inputFile = "test/fixtures/markdown/upperIT.md";
        markdownParser(inputFile, [], function(spec) {
            assert.equal(spec.description, "should do something");
            done();
        });
    });

    it("matches markers and returns only those specs when a marker is supplied", function(done) {
        var inputFile = "test/fixtures/markdown/markered.md",
            count = 0;

        markdownParser(inputFile, ["mymark"], function(spec) {
            count++;
            switch (count) {
                case 1:
                    assert.deepEqual(spec.currentTag, ["ignoremark"]);
                    assert.equal(spec.description, false);
                    break;
                case 2:
                    assert.deepEqual(spec.currentTag, ["mymark"]);
                    assert.equal(spec.description, "also has a spec on the sub-sub feature");
                    break;
                case 3:
                    assert.deepEqual(spec.currentTag, ["mymark"]);
                    assert.equal(spec.description, "also has a spec on another sub-sub feature");
                    break;
                case 4:
                    assert.equal(spec.currentTag, false, 'current tag should be false');
                    assert.equal(spec.description, false, 'description shoulkd be false');
                    done();
            }
        });
    });

    it("matches multiple markers", function() {
        var inputFile = "test/fixtures/markdown/multipleMarkered.md",
            count = 0;

        markdownParser(inputFile, ['mymark2'], function(spec) {
            if (count < 2) {
                assert.notEqual(spec.description, false);
            }
            if (count >= 2) {
                assert.equal(spec.description, false);
            }
            count++;
        });

    });

    it("does not match fuzzy markers markers", function() {
        var inputFile = "test/fixtures/markdown/multipleMarkered.md",
            count = 0;

        markdownParser(inputFile, ['mark'], function(spec) {
            assert.equal(spec.description, false);
        });

    });

});