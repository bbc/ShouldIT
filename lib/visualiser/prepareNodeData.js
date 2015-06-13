/*jslint node: true */
'use strict';

var fs = require('fs'),
    viewBuilder = require('./viewBuilder'),
    contextStatus = require('./contextStatus'),
    yaml = require('yamljs'),
    events = require('./../events');

function prepareNodeData(config, files) {

    var specs = files[0];
    var results = files[1];
    var joins = config.map ? yaml.load(config.map) : undefined;
    var nodes = viewBuilder.build(specs, joins);

    nodes = contextStatus.create(nodes, results);
    events.emit('node-data.prepared', nodes);
}

module.exports = prepareNodeData;