var lineReader = require('line-reader');
var output = {};

function parseFeature(file, callback) {
    lineReader.eachLine(file, function(line, last) {
        handleLine(line);
        callback(output);
        if(last){
        // or check if it's the last one
        }
    });
}


function handleLine(line) {
    if(lineIsIt(line)) {
        var it = line.match(/IT should([^\n]*)/g)[0];
        it = it.replace("IT", "").trim();
        output.description = it;
    }
}

function lineIsIt(line) {
    return line.match(/IT should([^\n]*)/)
}

module.exports = parseFeature;