/*jslint node: true */
'use strict';

function getShouldStatus(should, results) {
    if (results && results[should]) {
        return results[should] === 'PASSED'? 'green' : 'red'; 
    }
    return 'yellow';
}

function addTestStatusForNode(node, results) {
    var should;
    var nodeStatus = node.shoulds? 'green' : 'yellow';

    for (should in node.shoulds) {
        var currentShould = node.shoulds[should];
        var status = getShouldStatus(should, results);
        node.shoulds[should] = {
            ref: currentShould,
            status: status
        };
        nodeStatus = (nodeStatus === 'yellow')? nodeStatus : status;
    }
    node.status = nodeStatus;
}

function contextStatus(nodes, results) {
    for (var i = 0; i < nodes.nodes.length; i++) {
        addTestStatusForNode(nodes.nodes[i], results[nodes.nodes[i].key]);
    }
    return nodes;
}

module.exports = { create: contextStatus };