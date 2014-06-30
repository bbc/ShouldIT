/**
 * Get tht results from a glob and merges the results into a single object
 */
function collectResults(resultsGlob, callback) {
    var glob = require("glob"),
        fs = require("fs"),
        response = {},
        count = 0,
        specs,
        files;


    glob(resultsGlob, {}, function (err, files) {
        var i,
            result;
        for (i = 0; i < files.length; i++) {
            result = fs.readFileSync(files[i]);
            response = mergeResults(result, response);
            count++;
            fileTransformed(files, count, response, callback);
        }
    });
}

/**
 * Once all of the files have been collected fire the callback
 */
function fileTransformed(files, count, response, callback) {
    if(files.length === count) {
        callback(response);
    }
}

/**
 * Merge the results
 */
function mergeResults(spec, response) {
    spec = JSON.parse(spec);
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