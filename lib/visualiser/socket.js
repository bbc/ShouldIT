/*jslint node: true */
'use strict';

var events = require('./../events');

function socket(server) {
    var io = require('socket.io')(server);

    var initialData;

    events.on('node-data.prepared', function(data) {
        initialData = data;
    });

    io.on('connection', function(socket) {
        socket.emit('update', initialData);

        events.on('node-data.prepared', function(data) {
            console.log(data.links);
            socket.emit('update', data);
        });

    });
}

module.exports = socket;