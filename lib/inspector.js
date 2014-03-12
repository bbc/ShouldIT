var response;

/**
 * Compares the results of 2 files which are:
 * - A spec output json file
 * - A test result file to compare it to
 */
function inspector(files) {
    var spec = files[0],
        comparison = files[1],
        object;

    response = { passed: [], failed: [], pending: []};
    searchAndCompare(spec, comparison, []);
    return response;
}

/**
 * A recursive function to find nested results
 */
function searchAndCompare(specObject, comparisonObject, currentDescription) {

    if (comparisonObject === undefined) {
        comparisonObject = {};
    }

    for (key in specObject) {
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


/**
 * Compare results and build the response
 */
function compare(specValue, comparisonValue, currentDescription) {

    object = {};
    object[currentDescription.join(' ')] = specValue;

    if (typeof (specValue) !== 'undefined' && typeof (comparisonValue) !== 'undefined') {
        if (comparisonValue === "PASSED") {
            response.passed.push(object);
        } else {
            response.failed.push(object);
        }
    } else {
        response.pending.push(object);
    }

}

module.exports = inspector;