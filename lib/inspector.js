var response, 
    config,
    templates = require("../lib/templateRenderer");

/**
 * Compares the results of 2 files which are:
 * - A spec output json file
 * - A test result file to compare it to
 */
function inspector(files, options) {
    var spec = files[0],
        comparison = files[1],
        object;

    config = options || {};
    response = { passed: [], failed: [], pending: []};
    searchAndCompare(spec, comparison, [], config);
    return response;
}

/**
 * A recursive function to find nested results
 */
function searchAndCompare(specObject, comparisonObject, currentDescription) {

    if (comparisonObject === undefined) {
        comparisonObject = {};
    }

    for (var key in specObject) {
        if (specObject.hasOwnProperty(key)) {
            currentDescription.push(key);
            if (typeof(specObject[key]) === "string") {
                compare(specObject[key], comparisonObject[key], currentDescription);
            } else {
                searchAndCompare(specObject[key], comparisonObject[key], currentDescription);
            }
            currentDescription.pop();
        }
    }
}

function firstKey(obj) {
    for (var a in obj) return a;
}

/**
 * Compare results and build the response
 */
function compare(specValue, comparisonValue, currentDescription) {

    var lengthIndex = currentDescription.length - 1;
        suite =  currentDescription.slice(0, (lengthIndex)).join(" ");
        spec = currentDescription[lengthIndex];
        object = {};

    if (suite === "") {
        object[spec] = specValue;
    } else {
        object[suite] = {};
        object[suite][spec] = specValue;
    }

    if (typeof (specValue) !== 'undefined' && typeof (comparisonValue) !== 'undefined') {
        if (comparisonValue === "PASSED") {
            response.passed.push(object);
        } else {
            response.failed.push(object);
        }
    } else {
        if (config.hint) {
                        console.log(("ShouldIt? is running in " + config.hint + " hint mode.\n").green);
            console.log("One of your features has not been implelented.");
            console.log((object[suite][spec] + '\n').grey);
            console.log("The recommended test for you to implement is below:\n");
            var describe = firstKey(object);
            console.log(templates(config.hint, suite, spec).yellow);
            process.exit();
        }
        response.pending.push(object);
    }

}

module.exports = inspector;