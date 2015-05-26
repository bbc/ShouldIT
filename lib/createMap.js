/*jslint node: true */
'use strict';

var yaml = require('yamljs');

function createMap(path, specs) {

    try {
        var object = yaml.load(path);
    } catch (e) {
        console.log("I don't exist");
    }
}

module.exports = createMap;