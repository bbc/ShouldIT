var colors = require('colors');

/**
 * "summariser"
 *
 * Renders summary output of passes, failures, unimplemented and line numbers.
 */
function summariser(results) {
    var response = [],
        callback = function(output) {
            response.push(output);
        };

    var passed = 0;  
    if( results.hasOwnProperty('passed') ) {
        passed = countSpecs(results.passed);
    }
    var failed = 0;
    if(results.hasOwnProperty('failed')) {
       failed = countSpecs(results.failed);
    }
    var pending = 0 ;
    
    if(results.hasOwnProperty('pending')) {
        pending = countSpecs(results.pending);
    }
    var total = passed+failed+pending;

    coloriseOutput(total+' Specs defined','bold',callback);
    if(total > 0) {
        coloriseOutput(passed+' Passed' + displayPercentage(total, passed),'green', callback);
        coloriseOutput(failed + ' Failed' + displayPercentage(total, failed),'red', callback);
        coloriseOutput(pending + ' Pending' + displayPercentage(total, pending),'yellow', callback);
    }
    return response;
}

function displayPercentage(total, value){
    if( total < 1 ){ return ''; }
    return ' (' + ( (value/total) *100).toFixed(1) + '%)';
}

function coloriseOutput(string,colour,callback){
    callback(string[colour]);
}

function countSpecs(specList) {
    var count = 0;
    for(i = 0; i < specList.length; i += 1) {
        for(var key in specList[i]) {
            if(typeof specList[i][key] === "string") {
                count++;
            } else {
                for(var suite in specList[i][key]) {
                    if(specList[i][key].hasOwnProperty(suite)) {
                        count++;
                    }
                }
            }
        }
    }
    return count;
}

module.exports = summariser;