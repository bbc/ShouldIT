function inspector(files) {
    var spec = files[0],
        comparison = files[1],
        response = { passed: [], pending: []},
        currentDescription,
        object;

    for(key in spec) {
        if( spec.hasOwnProperty( key ) ) {
            currentDescription = key;
            for (describe in spec[key]) {
                object = {}
                object[currentDescription + " " + describe] = spec[key][describe];
                if (typeof (spec[key][describe]) !== 'undefined' && typeof (comparison[key][describe]) !== 'undefined') {
                    should = spec[key][describe];
                    //if (comparison[key][describe] === "PASSED") {
                        response.passed.push(object);
                    //} else {
                        //response.passed.push(object);
                    //}
                } else {
                    response.pending.push(object);
                }
            }
        }
    }
    return response;
}

module.exports = inspector;