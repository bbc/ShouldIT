/* jslint node: true */
"use strict";

var configBuilder = require('./lib/configBuilder'),
    featureTransformer = require('./lib/featureTransformer'),
    glob = require('glob'),
    config = configBuilder(process.argv),
    fullSpec;

glob(config.glob, {}, function (err, files) {
    if(err) throw new Error("Error processing glob");

    processFiles(files);
  // files is an array of filenames.
  // If the `nonull` option is set, and nothing
  // was found, then files is ["**/*.js"]
  // er is an error object or null.
});

function processFile(files) {
    var i = 0;
    for(i; i < files.length; i++) {
        featureTransformer(files[i], collectSpecs);
    }
}

function collectSpecs(spec) {

}