var colors = require('colors'),
    stateColors = {
        passed: "green",
        failed: "red",
        pending: "yellow"
    };

function spitterOuter(input) {
    var status,
        response = [],
        callback = function (output) {
            response.push(output);
        };

    for (status in stateColors) {
        if( stateColors.hasOwnProperty( status ) ) {
            coloriseInput(stateColors[status], input[status], callback);
        } 
    }
    return response;
}

function coloriseInput(color, states, callback) {

    for (i = 0; i < states.length; i += 1) {
        for(key in states[i]) {
            callback(
                key[color]
            );
            callback(
                states[i][key].grey
            );
        }

    };

}

module.exports = spitterOuter;