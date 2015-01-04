/*jslint node: true */
'use strict';

var express = require('express'),
    web = express(),
    viewBuilder = require('../lib/viewBuilder'),
    fs = require('fs'),
    router = express.Router();

function preProcess(specFile) {
    var file = fs.readFileSync(specFile)
    var nodes = viewBuilder.build(JSON.parse(file));
    fs.writeFileSync('www/public/graph.json', JSON.stringify(nodes, null, 4));
}

function run(config) {
    preProcess(config['specs-out']);

    web.use(express.static(__dirname + '/../www/public'));

    var server = web.listen(3000, function () {
        var host = server.address().address
        var port = server.address().port
    })
}

module.exports = {run: run}