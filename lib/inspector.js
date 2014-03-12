var response;

/**
 * Compares the results of 2 files which are:
 * - A spec output json file
 * - A test result file to compare it to
 */
function inspector(files) {
    var spec = files[0],
        comparison = files[1],
        currentDescription,
        object;

    response = { passed: [], failed: [], pending: []};

    searchAndCompare(spec, comparison, "");
    return response;
}

/**
 * A recursive function to find nested results
 */
function searchAndCompare(specObject, comparisonObject, currentDescription) {
    
    for (key in specObject) {
        currentDescription = (currentDescription + ' ' + key).trim();
        object = {}
        object[currentDescription] = specObject[key];
        if (typeof specObject[key] !== 'object') {
            return compare(specObject[key], comparisonObject[key], object);
        }
        searchAndCompare(specObject[key], comparisonObject[key], currentDescription);
    }
}


/**
 * Compare results and build the response
 */
function compare(specValue, comparisonValue, object) {

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