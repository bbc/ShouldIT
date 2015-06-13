/*jslint node: true */
'use strict';

/**
 * Get tht results from a glob and merges the results into a single object
 */
function collectResults(resultsGlob) {
    var glob = require("glob"),
        fs = require("fs"),
        Q = require('q'),
        JunitConverter = require("./formats/junitConverter"),
        response = {},
        count = 0,
        specs,
        files = [],
        converter,
        result;

    for (var i = 0; i < resultsGlob.length; i++) {
        files = files.concat(glob.sync(resultsGlob[i]));
    }

    var converterCallback = function(output) {
        result = output;
    };

    for (i = 0; i < files.length; i++) {
        if (files[i].indexOf(".xml") !== -1) {
            converter = new JunitConverter(files[i]);
            converter.exec(converterCallback);
        } else {
            try {
                result = JSON.parse(fs.readFileSync(files[i]));
            } catch (err) {
                console.log('Error parsing JSON of ' + files[i]);
                result = {};
            }
        }
        response = mergeResults(result, response);
        count++;
    }
    // Return promise
    return Q.fcall(function () {
        return response;
    });
}

/**
 * Merge the results
 */
function mergeResults(spec, response) {
    for (var key in spec) {
        if (spec.hasOwnProperty(key)) {
            if (!response[key]) {
                response[key] = {};
            }

            for (var test in spec[key]) {
                if (spec[key].hasOwnProperty(test)) {
                    response[key][test] = spec[key][test];
                }
            }
        }
    }
    return response;
}

module.exports = collectResults;