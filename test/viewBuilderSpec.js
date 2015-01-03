var viewBuilder = require('../lib/viewBuilder'),
    assert = require('assert');

describe("View Builder", function() {

    var index;

    beforeEach(function () {
        input = {
            'A Description': {
                '_parents': ['A Description'],
                'specs': {
                    'some assertion': 'somewhere'
                }
            },
            'A Description I am nested': {
                '_parents': ['A Description', 'I am nested'],
                'specs': {
                    'some assertion': 'somewhere'
                }
            }
        };
    });

    it("should take nested examples and pull out the node name", function() {
        var view = viewBuilder.build(input);

        assert.equal(Object.keys(view.nodes).length, 2);
        assert.equal(view.nodes[0].name, 'A Description');
        assert.equal(view.nodes[1].name, 'I am nested');

    });

    it("should provide links between nodes", function() {
        var view = viewBuilder.build(input);
        assert.deepEqual(view.links[0], {source: 0, target: 1});
    });

    it("should supply shoulds", function() {
        var view = viewBuilder.build(input);
        assert.deepEqual(view.nodes[0].shoulds,  {"some assertion":"somewhere"});
    });

    it("correctly link deeply nested items", function() {
        delete input['A Description'];
        input['A Description I am nested']._parents.push('And More Deeply Nested');

        var view = viewBuilder.build(input);
        assert.equal(Object.keys(view.nodes).length, 3);
        assert.deepEqual(view.links[0], {source: 0, target: 1});
        assert.deepEqual(view.links[1], {source: 1, target: 2});
    });


});