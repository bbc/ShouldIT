/*jslint node: true */
'use strict';

var express = require('express'),
    web = express();

function init(config) {

    web.use(express.static(__dirname + '/../../www/public'));

    web.use('/feature/*', function(req, res){
        var file = req.baseUrl.replace('/feature/', '').replace('.json', '');
        
        fs.readFile(file, 'utf-8', function (err, data) {
            if (err) throw err;
            res.send(JSON.stringify({feature: data}));
        });
    });
    web.route('/javascript/config.js').get(function(req, res) {
        res.send('var config = ' + JSON.stringify(config, null, 4));
    });
    web.use("/stylesheets", express.static(__dirname + '/../../www/public/stylesheets'));
    web.use("/javascript", express.static(__dirname + '/../../www/public/javascript'));

    web.use(express.static('features'));

    var server = web.listen(config.port, function () {
        var host = server.address().address;
        var port = server.address().port;
    });

    return server;

}

module.exports = init;