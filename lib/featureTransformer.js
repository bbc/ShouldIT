var featureParser = require('./featureParser'),
    fs = require('fs');

var output = {},
    outputFile = "",
    doneCallback;

function transformFeature(input, out, callback) {
    output = {};
    outputFile = out;
    doneCallback = callback;
    featureParser(input, handleSpec);
}

function handleSpec(spec) {
    var current = getCurrentOutputPointer(spec.suite);
    current[spec.description] = spec.line;
    if(spec.last) {
        writeOutput();
    }
}

function getCurrentOutputPointer(suite) {
    var current = output,
        i;
    for (i = 0; i < suite.length; i += 1) {
        if (current[suite[i]] === undefined) {
            current[suite[i]] = {};
        }
        current = current[suite[i]];
    }
    return current;
}

function writeOutput() {
    var jsonOutput = JSON.stringify(output, null, 4);
    fs.writeFileSync(outputFile, jsonOutput);
    doneCallback();
}

module.exports = transformFeature;