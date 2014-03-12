var lineReader = require('line-reader');
var output = {suite: []};

function parseFeature(file, callback) {
    output = {suite: []};
    lineReader.eachLine(file, function(line, last) {
        handleLine(line, callback);
        if(last){
        // or check if it's the last one
        }
    });
}


function handleLine(line, callback) {
    if(lineIsIt(line)) {
        var regex = new RegExp("IT ([^\n]*)", "gi");
        output.description = convertLine(line, regex, "IT");
        callback(output);
    } else if (lineIsDescribe(line)) {
        var regex = new RegExp("DESCRIBE ([^\n]*)", "gi");
        output.suite.push(convertLine(line, regex, "DESCRIBE"));
    } else if (lineIsEnd(line)) {
        output.suite.pop();
    }
}

function convertLine(line, matcher, replace) {
    var match = line.match(matcher)[0];
    var regex = new RegExp( '('+ replace +')', 'gi' );
    return match.replace(regex, "").trim();
}

function lineIsIt(line) {
    return line.match(/IT ([^\n]*)/gi)
}

function lineIsDescribe(line) {
    return line.match(/DESCRIBE ([^\n]*)/gi)
}

function lineIsEnd(line) {
    return line.match(/END/gi);
}

module.exports = parseFeature;