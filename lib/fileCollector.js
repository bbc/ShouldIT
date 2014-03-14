var files = [],
    parsedCount = 0,
    onFilesCollected,
    fs = require('fs');

function fileCollector(spec, comparison, callback) {
    var i,
        fileNames = [spec, comparison];
    onFilesCollected = callback;

    for (i = 0; i < fileNames.length; i ++) {
        grabFile(fileNames[i]);
    }
}

function grabFile(fileName) {
    fs.readFile(fileName, function (err, data) {
        if (err) {
            console.log(err);
            finishedParsing();
            return;
        }
        files.push(JSON.parse(data));
        finishedParsing();
    });

}

function finishedParsing() {
    parsedCount++;
    //have both files been parsed
    if(parsedCount == 2) {
        onFilesCollected(files);
    }
}

module.exports = fileCollector;