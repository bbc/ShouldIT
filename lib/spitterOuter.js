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
        callback(
            states[i][color]
        );
    };

}

module.exports = spitterOuter;