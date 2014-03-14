var featureParser = require('./featureParser');

function transformFeature(input, callback) {
    var output = {};
    featureParser(input, function(spec){
        handleSpec(spec, output, callback);
    });
}

function handleSpec(spec, output, callback) {
    var current = getCurrentOutputPointer(spec.suite, output);
    if(spec.description) {
        current[spec.description] = spec.line;
    }
    if(spec.last) {
        console.log("LAST SPEC");
        writeOutput(output, callback);
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

function writeOutput(output, callback) {
    console.log("writeOutput")
    var jsonOutput = JSON.stringify(output, null, 4);
    // fs.writeFileSync(outputFile, jsonOutput);
    callback(jsonOutput);
}

module.exports = transformFeature;