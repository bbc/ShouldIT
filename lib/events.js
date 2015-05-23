/*jslint node: true */
'use strict';

var callbacks = {};

function subscribe(event, callback) {
    if (!callbacks[event]) {
        callbacks[event] = [];
    }
    callbacks[event].push(callback);
}

function publish(event, data) {
    if (!callbacks[event]) {
        return;
    }
    for (var i = callbacks[event].length - 1; i >= 0; i--) {
        callbacks[event][i](data);
    }
}

module.exports = {
    emit: publish,
    on: subscribe
};