var assert = require('assert'),
    mockery = require('mockery'),
    sinon = require('sinon');



describe("Spec collector", function() {
    var calls = [],
        transformerSpy,
        globStub,
        specCollector,
        i;

    beforeEach(function() {
        i = 0;
        var object,
            transformer = function (file, tags, callback) {
                i++;
                object = {};
                object['some data' + i] = 'some value';
                callback(JSON.stringify(object));
            }
        mockery.enable();
        mockery.warnOnReplace(false);
        mockery.warnOnUnregistered(false);
        transformerSpy = sinon.spy(transformer);


        globStub = function(glob, options, callback) {
            callback(null,[1,2,3]);
        };
        mockery.registerMock('./featureTransformer', transformerSpy);
        mockery.registerMock('glob', globStub);
        specCollector = require('../lib/specCollector');

    });

    afterEach(function() {
        calls = [];
        mockery.disable();
    });

    it("resolves the glob and calls the feature transformer for each file", function() {

        specCollector('test/fixtures/markdown/*.md', [], function(){});
        assert.equal(transformerSpy.callCount, 3);
    });

    it("should fire a callback passing in an object made up of merged objects", function(done) {
        specCollector('test/fixtures/markdown/*.md', [], function(data) {
            assert.equal(JSON.stringify(data), JSON.stringify({
                'some data1': 'some value',
                'some data2': 'some value',
                'some data3': 'some value'
            }));
            done();
        });
        
    });
});

describe("Spec collector", function() {
    var calls = [], transformerSpy, globStub, specCollector, i;

    beforeEach(function() {
        i = 0;
        var object, transformer = function(file, tags, callback) {
                    i++;
                    switch(i) {
                        case 1:
                            object = {
                                "top middle bottom": {
                                    "_parents": ["top", "middle", "bottom"], "specs": {
                                        "should bottom 1": "test/fixtures/markdown/describe.md:2",
                                        "should bottom 2": "test/fixtures/markdown/describe.md:3"
                                    }
                                }
                            };
                            break;
                        case 2:
                            object = {
                                "top middle": {
                                    "_parents": ["top", "middle"], "specs": {
                                        "should middle": "test/fixtures/markdown/describe.md:2",
                                        "should middle 2": "test/fixtures/markdown/describe.md:3"
                                    }
                                }
                            };
                            break;
                        case 3:
                            object = {
                                "top middle": {
                                    "_parents": ["top", "middle"], "specs": {
                                        "should middle 3": "test/fixtures/markdown/describe2.md:3",
                                        "should middle 4": "test/fixtures/markdown/describe2.md:4"
                                    }
                                }
                            };
                            break;
                    }

                    callback(JSON.stringify(object));
                }
        mockery.enable();
        mockery.warnOnReplace(false);
        mockery.warnOnUnregistered(false);
        transformerSpy = sinon.spy(transformer);

        globStub = function(glob, options, callback) {
            callback(null, [1, 2, 3]);
        };
        mockery.registerMock('./featureTransformer', transformerSpy);
        mockery.registerMock('glob', globStub);
        specCollector = require('../lib/specCollector');

    });

    afterEach(function() {
        calls = [];
        mockery.disable();
    });

    it("should merge structures", function(done) {
        specCollector('test/fixtures/markdown/*.md', [], function(data) {
            assert.equal(JSON.stringify(data), JSON.stringify({
                "top middle bottom": {
                    "_parents": ["top", "middle", "bottom"], "specs": {
                        "should bottom 1": "test/fixtures/markdown/describe.md:2",
                        "should bottom 2": "test/fixtures/markdown/describe.md:3"
                    }
                }, "top middle": {
                    "_parents": ["top", "middle"], "specs": {
                        "should middle": "test/fixtures/markdown/describe.md:2",
                        "should middle 2": "test/fixtures/markdown/describe.md:3",
                        "should middle 3": "test/fixtures/markdown/describe2.md:3",
                        "should middle 4": "test/fixtures/markdown/describe2.md:4"
                    }
                }
            }));
            done();
        });

    });
});