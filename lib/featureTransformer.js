var featureParser = require('./featureParser'),
    fs = require("fs");

function transformFeature(input, outputFile, callback) {
    var output = {};
    featureParser(input, function(spec){
        console.log("INPUT: ", input);
        console.log("OUTPUT: ", output);
        console.log("SPEC: ", spec);
        handleSpec(spec, output, callback, outputFile);
    });
}

function handleSpec(spec, output, callback, outputFile) {

    var current = getCurrentOutputPointer(spec.suite, output);
    if(spec.description) {
        current[spec.description] = spec.line;
    }
    if(spec.last) {
        console.log("LAST SPEC");
        writeOutput(output, callback, outputFile);
    }
}

function getCurrentOutputPointer(suite, output) {
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

function writeOutput(output, callback, outputFile) {
    console.log("writeOutput")
    var jsonOutput = JSON.stringify(output, null, 4);
    fs.writeFileSync(outputFile, jsonOutput);
    console.log(callback);
    callback(jsonOutput);
}

module.exports = transformFeature;