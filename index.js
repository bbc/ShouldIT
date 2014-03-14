/* jslint node: true */
"use strict";

var configBuilder = require('./lib/configBuilder'),
    featureTransformer = require('./lib/featureTransformer'),
    specCollector = require('./lib/specCollector'),
    fileCollector = require('./lib/fileCollector'),
    inspector = require('./lib/inspector'),
    spitterOuter = require('./lib/spitterOuter'),
    jf = require('jsonfile'),
    fs = require('fs'),
    config = configBuilder(process.argv);

specCollector(config.glob, function(specs) {
    fs.writeFile(config.specFile, JSON.stringify(specs, null, 4), function (err) {
        if (err) throw err;
        fileCollector(config.specFile, config.comparisonFile, function(files){
            var results = inspector(files.reverse());
            output = spitterOuter(results);
            for (var i = 0; i < output.length; i++) {
                console.log(output[i]);
            }
        });
    });
});