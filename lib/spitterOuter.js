var colors = require('colors'),
    
    stateColors = {
        passed: "green",
        failed: "red",
        pending: "yellow"
    };

/**
 * "spitterOuter"
 *
 * Renders output of passes, failures, unimplemented and line numbers.
 */
function spitterOuter(input, config) {
    var status,
        response = [],
        callback = function (output) {
            response.push(output);
        };

    for (status in stateColors) {
        if( config.outputDetails.indexOf(status) < 0 ){ continue; }
        if( stateColors.hasOwnProperty( status ) ) {
            coloriseInput(stateColors[status], input[status], callback);
        } 
    }
    return response;
}

function coloriseInput(color, states, callback) {

    var spec,
        line;

    for (i = 0; i < states.length; i += 1) {
        for(var key in states[i]) {

            if (typeof states[i][key] === "string") {
                spec = key;
                line = states[i][key];
            } else {
                for (var suite in states[i][key]) {
                    if (states[i][key].hasOwnProperty( suite )) {
                        spec = key + " " + suite;
                        line = states[i][key][suite];
                    }
                }
            }
            callback(
                spec[color]
            );
            callback(
                line.grey
            );
        }

    }

}

module.exports = spitterOuter;