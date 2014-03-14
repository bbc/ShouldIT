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
        output.last = false;
        output.description = convertLine(lineIsIt(line)[0], "IT");
        callback(output);
        return;
    }
    if (lineIsDescribe(line)) {
        output.suite.push(convertLine(lineIsDescribe(line)[0], "DESCRIBE"));
        return;
    }
    if (lineIsEnd(line)) {
        output.suite.pop();
    }
    if(output.last) {
        output.description = null;
        callback(output);
    }

}

function convertLine(line, replace) {
    var regex = new RegExp( '('+ replace +')', 'i' );
    return line.replace(regex, "").trim();
}

function lineIsIt(line) {
    return line.match(/IT ([^\n]*)/gi)
}

function lineIsDescribe(line) {
    return line.match(/DESCRIBE ([^\n]*)/gi)
}

function lineIsEnd(line) {
    return (line.match(/END/gi) || line === "");
}

function getDescriptiveLine(file, lineCount) {
    return file + ":" + lineCount;
}

module.exports = parseFeature;