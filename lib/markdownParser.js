var lineReader = require('line-reader');

function parseMarkdown(file, callback) {
    var output = {suite: [], last: false};
    var lineTypes = {
        'SPEC' : {
            tokens: ['*', '+'],
            match: function(line) {
                for(var i = 0; i < this.tokens.length; i++) {
                    var regex = new RegExp('\\' + this.tokens[i] + ' ([^\n]*)');
                    if(line.match(regex)) {
                        return line.match(regex);
                    }
                }
                return false;
            },
            strip: function(line) {
                return this.match(line)[1].replace('it ', '');
            }
        },
        'DESCRIBE' : {
            tokens: ['#'],
            match: function(line) {
                for(var i = 0; i < this.tokens.length; i++) {
                    var regex = new RegExp('\\' + this.tokens[i] + ' ([^\n]*)');
                    if(line.match(regex)) {
                        return line.match(regex);
                    }
                }
                return false;
            },
            strip: function(line) {
                return this.match(line)[1].replace('it ', '');
            },
            level: function(line) {
                return line.split("#").length - 1;
            }
        }
    }


    var lineCount =  0;
    lineReader.eachLine(file, function(line, last) {
        lineCount++;
        if(last){
            output.last = true;
        }
        output.line = getDescriptiveLine(file, lineCount);
        handleLine(line, callback);

    });

    function handleLine(line, callback) {
        var type = getLineType(line);
        var typeObject = lineTypes[type];
        switch(type) {
            case 'SPEC':
                output.description = typeObject.strip(line);
                callback(output);
                break;
            case 'DESCRIBE':
                //place the describe at the correct level
                output.suite[typeObject.level(line) -1] = typeObject.strip(line);
                //strip describes that are closed
                output.suite = output.suite.splice(0, typeObject.level(line));
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
}

module.exports = parseMarkdown;