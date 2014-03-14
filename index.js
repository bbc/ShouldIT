/* jslint node: true */
"use strict";

var configBuilder = require('./lib/configBuilder'),
    featureTransformer = require('./lib/featureTransformer'),
    specCollector = require('./lib/specCollector'),
    jf = require('jsonfile'),
    config = configBuilder(process.argv),
    fullSpec;

specCollector(config.glob, function(specs) {
    fs.writeFile(config.specFile, JSON.stringify(specs), function (err) {
        if (err) throw err;
        fileCollector(config.specFile, config.comparisonFile, function(files){
            var results = inspector(files);
            output = spitterOuter(results);
            for (var i = output.length - 1; i >= 0; i--) {
                console.log(output[i]);
            }
        });
    });
});