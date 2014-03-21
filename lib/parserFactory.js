var featureParser = require('./featureParser'),
    markdownParser = require('./markdownParser');

function ParserFactory() {

    this.getParserForString = function(string) {
        var parts = string.split('.');
        var extension = parts[parts.length - 1];
        switch(extension) {
            case 'md':
                return markdownParser;

            default:
                return featureParser;
        }
    }
}

module.exports = ParserFactory;