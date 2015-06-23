/*jslint node: true */
'use strict';

/**
 * Get the specs from a glob and merges the specs
 */
var merge = require("merge"),
    Q = require("q"),
    deferred;

function setUpPromise() {
    deferred = Q.defer();
}

function collectSpecs(specsGlob, tags) {
    var featureTransformer = require('./featureTransformer'),
        glob = require("glob"),
        response = {},
        count = 0;

    setUpPromise();

    glob(specsGlob, {}, function(er, files) {
        var i,
            fileTransformerCallback = function(spec) {
                response = mergeSpecs(spec, response);
                count++;
                fileTransformed(files, count, response);
            };
        for (i = 0; i < files.length; i++) {
            featureTransformer(files[i], tags, fileTransformerCallback);
        }
    });

    return deferred.promise;
}

function fileTransformed(files, count, response) {
    if (files.length === count) {
        deferred.resolve(response);
    }
}

function mergeSpecs(spec, response) {
    spec = JSON.parse(spec);
    for (var key in spec) {
        if (spec.hasOwnProperty(key)) {
            if (response.hasOwnProperty(key)) {
                response[key] = merge.recursive(response[key], spec[key]);
            } else {
                response[key] = spec[key];
            }
        }
    }
    return response;
}

module.exports = collectSpecs;