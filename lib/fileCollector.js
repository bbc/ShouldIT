/*jslint node: true */
'use strict';

/**
 * Grabs contents from 2 file sets, creates JSON data
 */
var fs = require('fs');

function fileCollector(spec, comparison, callback) {
    var i,
        fileNames = [spec, comparison],
        files = [];

    for (i = 0; i < fileNames.length; i++) {
        grabFile(fileNames[i]);
    }
    callback(files);

    function grabFile(fileName) {
        var contents = fs.readFileSync(fileName);
        files.push(JSON.parse(contents));
    }
}

module.exports = fileCollector;