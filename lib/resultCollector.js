/**
 * Get tht results from a glob and merges the results into a single object
 */
function collectResults(resultsGlob, callback) {
    var glob = require("glob"),
        fs = require("fs"),
        JunitConverter = require("./formats/junitConverter"),
        response = {},
        count = 0,
        specs,
        files = [],
        converter;

    for (var i = 0; i < resultsGlob.length; i++) {
        files = files.concat(glob.sync(resultsGlob[i]));
    };

    var i,
        result;
    for (i = 0; i < files.length; i++) {
        if (files[i].indexOf(".xml") !== -1) {
            converter = new JunitConverter(files[i]);
            converter.exec(function (output) {
                result = output;
            });
        } else {
            result = JSON.parse(fs.readFileSync(files[i]));
        }
        response = mergeResults(result, response);
        count++;
    }
    callback(response);
}

/**
 * Merge the results
 */
function mergeResults(spec, response) {
    for(var key in spec) {
        if (spec.hasOwnProperty(key)) {
            if (!response[key]) {
                response[key] = {};
            }
            
            for(var test in spec[key]) {
                if (spec[key].hasOwnProperty(test)) {
                    response[key][test] = spec[key][test];
                }
            }
        }
    }
    return response;
}

module.exports = collectResults;