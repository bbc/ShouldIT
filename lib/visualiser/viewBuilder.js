/*jslint node: true */
'use strict';

/**
 * Creates fresh heirarchy from files
 */
function viewBuilder(contexts, joins) {

  var merge = require('merge');
  var heirarchy = {};
  var graph = {
    nodes: [],
    links: []
  };
  var nodeMap = {};
  var depth;
  var fullContext;

  function createJoinNodes(joins, parent) {

    if(joins instanceof Array) {
      for (var i = 0; i < joins.length; i++) {
        createJoinNodes(joins[i], parent);
      }
    }
    if(joins instanceof Object && !(joins instanceof Array)) {

      for (var key in joins) {
        var parentIndex = getParentNode(key);
        if (typeof parent === 'number') {
          addLink(parent, parentIndex);
        }
        createJoinNodes(joins[key], parentIndex);
      }
    }
    if (typeof joins === 'string') {
      addJoinNode(parent, joins);
    }
  }

  function getParentNode(name) {
    for (var i = 0; i < graph.nodes.length; i++) {
      if (graph.nodes[i].key === name) {
        return i;
      }
    }
    graph.nodes.push({
      name: name,
      key: name
    });
    return i++;
  }


  function addJoinNode(parent, name) {
    var nodeIndex;
    for (var i = 0; i < graph.nodes.length; i++) {
      if (graph.nodes[i].key === name) {
        nodeIndex = i;
      }
    }
    addLink(parent, nodeIndex);
  }

  function createNode(name, specs) {
    return {
      name: name, 
      shoulds: specs, 
      depth: depth, 
      key: fullContext.match(new RegExp(name+'$')) ? fullContext : name
    };
  }

  function addNode(name, specs) {
    var index = graph.nodes.length;
    graph.nodes.push(createNode(name, specs));
    return index;
  }
  
  function mergeNode(index, name, specs) {
    graph.nodes[index] = merge.recursive(graph.nodes[index],createNode(name,specs));
  }

  function addLink(source, target) {
    var match;
    for (var i = 0; i < graph.links.length; i++) {
      if (graph.links[i].source == source && graph.links[i].target == target) {
        match = true;
      }
    }

    if (!match) {
      graph.links.push({ source: source, target: target });
    }
  }

  function traverseMap(map, parents, node) {
    depth++;
    var mapPointer = map[parents[0]];
    if ( mapPointer && parents.length > 1) {
      parents.splice(0, 1);
      return traverseMap(mapPointer, parents, node);
    } 
    var currentContext = parents[0];
    mapPointer = map;
    if( mapPointer.hasOwnProperty(currentContext)){
      mergeNode(mapPointer[currentContext]._index,currentContext, node.specs);
    } else {
      mapPointer[currentContext] = {
        '_index': addNode(currentContext, (parents.length > 1) ? [] : node.specs)
      };
      if(map._index !== undefined) {
        addLink(map._index, mapPointer[currentContext]._index);
      }
    }

    if (parents.length > 1) {
      parents.splice(0, 1);
      return traverseMap(mapPointer[currentContext], parents, node);
    }
  }

  function addContext(node) {
    for (var i = 0; i < node._parents.length; i++) {
      depth = -1;
      traverseMap(nodeMap, node._parents, node);
    }
  }

  for (var key in contexts) {
    fullContext = key;
    addContext(contexts[key], key);
  }
  createJoinNodes(joins);
  return graph;
}

module.exports = { build: viewBuilder };