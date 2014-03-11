/* jslint node: true */
"use strict";

var config = buildConfig(),
    fs = require('fs');

function buildConfig() {
    var config = {}

    if (process.argv[2]===undefined) {
         throw new Error("An input file must be specified");
    }
    if (process.argv[3] === undefined) {
        throw new Error("An output file must be specified")
    }
    config.inputFile = process.argv[2];
    config.outputFile = process.argv[3];
    return config;
}

function parseFeature(file) {
    var output;
    fs.readFile(file, function (err, data) {
        if (err) {
            return;
        }
        return data.match(/IT should([^\n]*)/)
    });
}