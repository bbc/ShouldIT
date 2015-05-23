/*jslint node: true */
'use strict';

/**
 * Init!
 *
 * Listen to changes when watch option set, if not run once.
 */
var configBuilder = require('../lib/configBuilder'),
    gaze = require('gaze'),
    runShouldIt = require('./run'),
    events = require('./events'),
    www = require('./visualiser/www'),
    socket = require('./visualiser/socket');


function serve(config){
    if (config.serve) {
        var server = www(config);
        socket(server, events);
    }
}

function watchFiles(config, files) { 
    if (!config.watch) {
        return;
    }
    gaze(files, function() {
        this.watched(function(watched) {
            console.log("ShouldIt? - Watching for spec, result changes...");
        });
        this.on('changed', function(filepath) {
            console.log("----- File Changed -----");
            console.log(filepath);
            console.log("--- Running ShouldIt ---\n");
            runShouldIt(config);
        });
    });
}

exports.init = function(argv) {

    var config = configBuilder(argv),
    files = config.results.concat([config.specs]);

    serve(config);
    runShouldIt(config);
    watchFiles(config, files);
};