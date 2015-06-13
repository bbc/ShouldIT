/*jslint node: true */
'use strict';

var fs = require('fs'),
    viewBuilder = require('./viewBuilder'),
    contextStatus = require('./contextStatus'),
    yaml = require('yamljs');

function prepareNodeData(config, events) {

    var specs = JSON.parse(fs.readFileSync(config.specsOut));
    var results = JSON.parse(fs.readFileSync(config.resultsOut));
    var joins = config.map ? yaml.load(config.map) : undefined;
    var nodes = viewBuilder.build(specs, joins);

    nodes = contextStatus.create(nodes, results);
    events.emit('node-data.prepared', nodes);
}

module.exports = prepareNodeData;