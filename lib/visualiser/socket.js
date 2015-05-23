/*jslint node: true */
'use strict';

function socket(server, events) {
    var io = require('socket.io')(server);

    var initialData;

    events.on('node-data.prepared', function(data) {
        initialData = data;
    });

    io.on('connection', function(socket) {
        socket.emit('update', initialData);

        events.on('node-data.prepared', function(data) {
            socket.emit('update', data);
        });

    });
}

module.exports = socket;