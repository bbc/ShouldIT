/*jslint node: true */
'use strict';

var express = require('express'),
    web = express()

function run() {
    web.get('/', function (req, res) {
        res.send('Hello World!')
    })

    var server = web.listen(3000, function () {
        var host = server.address().address
        var port = server.address().port
    })
}

module.exports = {run: run}