/*jslint node: true */
'use strict';

function buildConfig(args) {
    var config = {};

    if (args[2] === undefined) {
        throw new Error("A specs glob such as path/*.feature must be specified");
    }
    if (args[3] === undefined) {
        throw new Error("A comparison file must be specified");
    }

    config.specGlob = args[2];
    config.resultsGlob = args[3];
    config.specFile = 'spec-file.json';
    config.resultsFile = 'results-file.json';
    return config;
}

module.exports = buildConfig;