var files = [],
    fs = require('fs');;

function collectFiles(spec, comparison, callback) {
    var i,
        fileNames = [spec, comparison];

    for (i = 0; i < fileNames.length; i ++) {
        if (i == fileNames.length - 1) {
            grabFile(fileNames[i], callback);
            return;
        }
        grabFile(fileNames[i]);
    }
}

function grabFile(fileName, callback) {

    fs.readFile(fileName, function (err, data) {
        if (err) {
            console.log(err)
            return;
        }
        files.push(JSON.parse(data));
        if (typeof callback === 'function') {
            callback(files);
        }

    });

}

module.exports = collectFiles;