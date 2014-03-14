var response,
    currentDescription = [];

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
    searchAndCompare(spec, comparison);
    return response;
}

/**
 * A recursive function to find nested results
 */
function searchAndCompare(specObject, comparisonObject) {
    if(comparisonObject === undefined) {
        comparisonObject = {};
    }
    for (key in specObject) {
        currentDescription.push(key);
       
        object = {}
        
        if (typeof specObject[key] !== 'object') {
            if(comparisonObject === undefined) {
                object[currentDescription.join(' ')] = specObject[key];
                return compare(specObject[key], undefined, object);
            }
            var specKeys = Object.keys(specObject);
            for(var i = 0; i < specKeys.length; i++) {

                object = {};
                currentDescription.pop();
                currentDescription.push(specKeys[i]);
                object[currentDescription.join(' ')] = specObject[specKeys[i]];
                compare(specObject[specKeys[i]], comparisonObject[specKeys[i]], object);

            }
            currentDescription = [];
            return;
        }
        
        searchAndCompare(specObject[key], comparisonObject[key]);
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