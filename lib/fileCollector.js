var fs = require('fs');

function fileCollector(spec, comparison, callback) {
    var i,
        fileNames = [spec, comparison],
        files = [];

    for (i = 0; i < fileNames.length; i ++) {
        grabFile(fileNames[i], callback, i, files);
    }
}

function grabFile(fileName, callback, count, files) {
    fs.readFile(fileName, function (err, data) {
        if (err) {
            console.log(err);
            finishedParsing();
            return;
        }
        files.push(JSON.parse(data));
        if (count == 1) {
            callback(files);
        }
    });
}

module.exports = fileCollector;