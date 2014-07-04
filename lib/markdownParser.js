var lineReader = require('line-reader');

function parseMarkdown(file, limitMarkers, callback) {
    var output = {suite: [], last: false, currentMarker: false};

    //TODO: Refactor these into modules to by DRY
    var lineTypes = {
        'SPEC' : {
            tokens: ['+'],
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
                var regex = new RegExp('(it )', 'gi' );
                return this.match(line)[1].replace(regex, '');
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
        },
        'SKIP' : {
            tokens: ['> skip', '>skip'],
            match: function(line) {
                for(var i = 0; i < this.tokens.length; i++) {
                    var regex = new RegExp('\\' + this.tokens[i] + '([^\n]*)', 'i');
                    if(line.match(regex)) {
                        return line.match(regex);
                    }
                }
                return false;
            }
        },
        'MARKER' : {
            tokens: ['> @', '>@'],
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
                var regex = new RegExp('(> @ )', 'gi' );
                return this.match(line)[1].replace(regex, '');
            }
        }
    };


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
        if(!output.skip) {
            var type = getLineType(line);
            var typeObject = lineTypes[type];
            switch(type) {
                case 'SPEC':
                    // if (
                    //     output.currentMarker ||
                    //     limitMarkers.indexOf(output.currentMarker) !== -1
                    // ) {
                        output.description = typeObject.strip(line);
                        callback(output);
                    // }
                    
                    return;
                case 'DESCRIBE':
                    //place the describe at the correct level
                    output.suite[typeObject.level(line) -1] = typeObject.strip(line);
                    //strip describes that are closed
                    output.suite = output.suite.splice(0, typeObject.level(line));
                    return;
                case 'SKIP' :
                    output.skip = true;
                    output.last = true;
                case 'MARKER' :
                    output.currentMarker = typeObject.strip(line);
            }
            if(output.last) {
                output.description = null;
                output.last = true;
                callback(output);
            }

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
        return null;
    }

    function getDescriptiveLine(file, lineCount) {
        return file + ":" + lineCount;
    }
}

module.exports = parseMarkdown;