var lineReader = require('line-reader');

function parseFeature(file, callback) {
    output = {suite: [], last: false};
    lineCount =  0;
    lineReader.eachLine(file, function(line, last) {
        lineCount++;
        if(last){
            output.last = true;
        }
        output.line = getDescriptiveLine(file, lineCount);
        handleLine(line, callback);

    });
}


function handleLine(line, callback) {
    if(lineIsIt(line)) {
        output.description = convertLine(line, "IT");
        callback(output);
    } else if (lineIsDescribe(line)) {
        output.suite.push(convertLine(line, "DESCRIBE"));
    } else if (lineIsEnd(line)) {
        output.suite.pop();
    }
}

function convertLine(line, replace) {
    var regex = new RegExp( '('+ replace +')', 'gi' );
    return line.replace(regex, "").trim();
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

function getDescriptiveLine(file, lineCount) {
    return file + ":" + lineCount;
}

module.exports = parseFeature;