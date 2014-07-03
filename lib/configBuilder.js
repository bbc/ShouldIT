/*jslint node: true */
'use strict';

function buildConfig(args) {
    var fs = require('fs'),
        config = {},
        content;

    config.specFile = 'spec-file.json';
    config.resultsFile = 'results-file.json';

    if (fs.existsSync("spec-detective.conf.json")) {
        content = fs.readFileSync("spec-detective.conf.json", {encoding:"utf8"});
        config = JSON.parse(content);
    }

    if (args[2] !== undefined) {
        config.specGlob = args[2];
    }

    if (args[3] !== undefined) {
        config.resultsGlob = args[3];
    }

    if (config.specGlob === undefined) {
        throw new Error("A specs glob such as path/*.feature must be specified");
    }
    if (config.resultsGlob === undefined) {
        throw new Error("A results file must be specified");
    }

    return config;
}

module.exports = buildConfig;