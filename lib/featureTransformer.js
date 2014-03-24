var ParserFactory = require('./parserFactory');

function transformFeature(input, callback) {
    var output = {};
    var factory = new ParserFactory();
    var parser = factory.getParserForString(input);
    parser(input, function(spec){
        handleSpec(spec, output, callback);
    });
}

function handleSpec(spec, output, callback) {

    var current = getCurrentOutputPointer(spec.suite, output);
    if(spec.description) {
        current[spec.description] = spec.line;
    }
    if(spec.last) {
        writeOutput(output, callback);
    }
}

function getCurrentOutputPointer(suite, output) {
    var current = output,
        key = suite.join(" ");

    if (key === "") {
        return current;
    }

    if (current[key] === undefined) {
        current[key] = {};
    }
    return current[key];
}

function writeOutput(output, callback) {
    var jsonOutput = JSON.stringify(output, null, 4);
    callback(jsonOutput);
}

module.exports = transformFeature;