var viewBuilder = require('../lib/viewBuilder'),
    assert = require('assert');

describe("View Builder", function() {
    it("should take nested examples and pull out the node name", function() {
        var input = {
            'A Description': 'some assertion',
            'A Description I am nested': 'some assertion'
        }

        var view = viewBuilder.build(input);
        assert.equal(Object.keys(view.nodes).length, 2);
        assert.equal(view.nodes[0].name, 'A Description');
        assert.equal(view.nodes[1].name, 'I am nested');
    });

    it("should provide links between nodes", function() {
        var input = {
            'A Description': 'some assertion',
            'A Description I am nested': 'some assertion'
        }

        var view = viewBuilder.build(input);
        assert.deepEqual(view.links[0], {source: 0, target: 1});
    });

    it("should supply shoulds", function() {
        var input = {
            'A Description': 'some assertion'
        }

        var view = viewBuilder.build(input);
        assert.deepEqual(view.nodes[0].shoulds, 'some assertion');
    });

    it("correctly link fuzzy items", function() {
        var input = {
            'A Description': 'some assertion',
            'A Description With Something': 'some assertion',
            'A Description With Something Else': 'some assertion',
            'A Description Not Deep As Elsy': 'some assertion'
        }

        var view = viewBuilder.build(input);
        assert.equal(view.nodes[2].name, 'With Something');
        assert.deepEqual(view.links[2], { source: 2, target: 3 });
    });


});