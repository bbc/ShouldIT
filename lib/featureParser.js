var fs = require('fs');

function parseFeature(file) {
    fs.readFile(file, function (err, data) {
        if (err) {
        	console.log(err)
            return;
        }
        return data.match(/IT should([^\n]*)/)
    });
}

module.exports = parseFeature;