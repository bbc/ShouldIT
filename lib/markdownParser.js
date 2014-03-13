var lineReader = require('line-reader');

var lineTypes = {
    'SPEC' : {
        match: function(line) {
            return line.match(/\* ([^\n]*)/);
        },
        strip: function(line) {
            return line.match(/\* ([^\n]*)/)[1].replace('it ', '');
        }
    },
    'DESCRIBE' : {
        match: function(line) {
            return line.match(/\# ([^\n]*)/);
        },
        strip: function(line) {
            return line.match(/\# ([^\n]*)/)[1];
        }
    }
}
var output = {};

function parseMarkdown(file, callback) {
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

    var type = getLineType(line);
    
    switch(type) {
        case 'SPEC':
            output.description = lineTypes[type].strip(line);
            callback(output);
            break;
        case 'DESCRIBE':
            output.suite.push(lineTypes[type].strip(line));
            break;
    }

}

function getLineType(line) {
    for (var type in lineTypes) {
        if (lineTypes.hasOwnProperty(type)) {
            if(lineTypes[type].match(line)) {
                return type;
            }
            
        }
    }
}


function getDescriptiveLine(file, lineCount) {
    return file + ":" + lineCount;
}

module.exports = parseMarkdown;