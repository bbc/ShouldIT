/**
 * Creates fresh heirarchy from files
 */
function viewBuilder(contexts) {
  var heirarchy = {};
  var graph = {
    nodes: [],
    links: []
  };
  var nodeMap = {};

  function addNode(name, specs) {
    var index = graph.nodes.length;
    graph.nodes.push({
      name: name,
      shoulds: specs
    });
    return index;
  }

  function addLink(source, target) {
    var match;
    for (var i = 0; i < graph.links.length; i++) {
      if (graph.links[i].source == source && graph.links[i].target == target) {
        match = true;
      }
    };

    if (!match) {
      graph.links.push({ source: source, target: target });
    }
  }

  function traverseMap(map, parents, node) {
    var mapPointer = map[parents[0]];
    if (mapPointer) {
      parents.splice(0, 1);
      return traverseMap(mapPointer, parents, node);
    }
    var currentContext = parents[0];
    mapPointer = map;
    mapPointer[currentContext] = {
      '_index': addNode(currentContext, (parents.length > 1)? [] : node.specs)
    }
    if (map._index != undefined) {
      addLink(map._index, mapPointer[currentContext]._index)
    }
    if (parents.length > 1) {
      parents.splice(0, 1);
      return traverseMap(mapPointer[currentContext], parents, node);
    }
  }

  function addContext(node) {
    for (var i = 0; i < node._parents.length; i++) {
      traverseMap(nodeMap, node._parents, node);
    };
  }

  for (var key in contexts) {
    addContext(contexts[key]);
  };
  return graph;
}

module.exports = { build: viewBuilder };