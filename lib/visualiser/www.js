/*jslint node: true */
'use strict';

var express = require('express'),
    web = express(),
    viewBuilder = require('./viewBuilder'),
    contextStatus = require('./contextStatus'),
    fs = require('fs'),
    router = express.Router(),
    yaml = require('yamljs');

function preProcess(specFile, map, resultsFile) {
    var specs = JSON.parse(fs.readFileSync(specFile));
    var results = JSON.parse(fs.readFileSync(resultsFile));
    var joins = map? yaml.load(map) : undefined;

    var nodes = viewBuilder.build(specs, joins);
    nodes = contextStatus.create(nodes, results);
    fs.writeFileSync(__dirname + '/../../www/public/graph.json', JSON.stringify(nodes, null, 4));
}

function run(config) {
    preProcess(config['specs-out'], config.map, config['results-out']);

    web.use(express.static(__dirname + '/../../www/public'));

    web.use('/feature/*', function(req, res){
        var file = req.baseUrl.replace('/feature/', '').replace('.json', '');
        
        fs.readFile(file, 'utf-8', function (err, data) {
            if (err) throw err;
            res.send(JSON.stringify({feature: data}));
        });
    });

    web.use(express.static('features'));

    var server = web.listen(config.port, function () {
        var host = server.address().address;
        var port = server.address().port;
    });
}

module.exports = {run: run};