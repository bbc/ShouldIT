var featureTransformer = require('./featureTransformer'),
    glob = require("glob"),
    response;

function collectSpecs(specsGlob, callback) {
    response = {};
    glob(specsGlob, {}, function (er, files) {
        var i;
        for (i = 0; i < files.length; i++) {
            if (i == files.length -1) {
                featureTransformer(files[i], function (data){
                    mergeSpecs(data);
                    callback(response);
                });
            } else {
                featureTransformer(files[i], mergeSpecs);
            }
        }
    })
}

function mergeSpecs(spec) {
    spec = JSON.parse(spec);
    for(key in spec) {
        if (spec.hasOwnProperty(key)) {
            response[key] = spec[key];
        }
    }
}

module.exports = collectSpecs;