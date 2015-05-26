/*jslint node: true */
'use strict';

function transformFeature(input, tags, callback) {
    var parser = require('./markdownParser'),
        output = {};

    parser(input, tags, function(spec) {
        handleSpec(spec, output, callback);
    });
}

function handleSpec(spec, output, callback) {

    var current;
    if (spec.description) {
        current = getCurrentOutputPointer(spec.suite, output);
        current[spec.description] = spec.line;
    }
    if (spec.last) {
        writeOutput(output, callback);
    }
}

function getCurrentOutputPointer(suite, output) {
    var key = suite.join(" ");

    if (key === "") {
        return output;
    }

    if (output[key] === undefined) {

        output[key] = {
            '_parents': [],
            'specs': {}
        };
        for (var i = 0; i < suite.length; i++) {
            output[key]._parents.push(suite[i]);
        }
    }
    return output[key].specs;
}

function writeOutput(output, callback) {
    var jsonOutput = JSON.stringify(output, null, 4);
    callback(jsonOutput);
}

module.exports = transformFeature;