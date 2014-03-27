var fs = require('fs'),
    builder = require('xmlbuilder');

function JunitXmlWriter() {

    this.writeResults = function(results) {
        var xml = builder.create('testsuite').att('tests', countTests(results));
        var testcases = [];
        testcases.push(parseTestCases(results.passed));
        testcases.push(parseTestCases(results.failed, {type: 'failure'}));
        testcases.push(parseTestCases(results.pending, {type: 'pending'}));
        testcases = flattenArray(testcases);
        if(testcases.length > 0) {
            xml.ele(testcases);
        }
        fs.writeFileSync('junit-output.xml', xml.end({pretty: true}));
    };


    function parseTestCases(tests, options) {
        var testcases = [];
        options = options || {};
        if(tests && tests.length > 0) {
            for(var i = 0; i < tests.length; i++) {
                for(var key in tests[i]) {
                    var describe = tests[i][key];
                    //is it a describe
                    if(typeof describe != 'string') {
                        for(var spec in describe) {
                            var line = tests[i][key][spec];
                            testcases.push(buildTestCase(key, spec, line, options));
                        }
                    //its a spec without a describe
                    } else {
                        var line = tests[i][key];
                        testcases.push(buildTestCase("", key, line, options));
                    }
                }
            }
        }
        return testcases;
    }

    function buildTestCase(classname, name, line, options) {
        var testcase = {
            testcase: {
                '@classname': classname,
                '@name': name
            }
        };
        if(options.type === 'pending') {
            testcase.testcase.skipped = 'pending';
        }
        if(options.type === 'failure') {
            testcase.testcase.failure = line
        }
        return testcase;
    }

    function countTests(results) {
        var merged = [].concat(results.passed, results.failed, results.pending);
        var flattened = flattenObject(merged);
        return Object.keys(flattened).length;
    }

    function flattenObject(ob) {
        var toReturn = {};

        for (var i in ob) {
            if (!ob.hasOwnProperty(i)) continue;

            if ((typeof ob[i]) == 'object') {
                var flatObject = flattenObject(ob[i]);
                for (var x in flatObject) {
                    if (!flatObject.hasOwnProperty(x)) continue;

                    toReturn[i + ' ' + x] = flatObject[x];
                }
            } else {
                toReturn[i] = ob[i];
            }
        }
        return toReturn;
    }

    function flattenArray(array) {
        var result = [];
        array.forEach(function(item) {
            Array.prototype.push.apply(
                result,
                Array.isArray(item) ? flattenArray(item) : [item]
            );
        });
        return result;
    }
}

module.exports = JunitXmlWriter;