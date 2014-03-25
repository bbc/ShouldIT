var fs = require('fs'),
    builder = require('xmlbuilder');

function JunitXmlWriter() {

    this.writeResults = function(results) {
        var xml = builder.create('testsuite').att('tests', countTests(results));

        fs.writeFileSync('../junit-output.xml', xml);
    };

    function countTests(results) {
        var merged = [].concat(results.passed, results.failed, results.pending);
        var flattened = flattenObject(merged);
        console.log(flattened);
        return Object.keys(flattened).length;
    }

    //completely flatten an object
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
}

module.exports = JunitXmlWriter;

//JUNIT XML FORMAT
//<testsuite tests="3">
//    <testcase classname="Football table boundaries" name="should be in the right place"/>
//    <testcase classname="foo" name="AnotherSuccessfulTest">
//        <skipped />
//    </testcase>
//    <testcase classname="foo" name="AFailingTest">
//        <failure type="NotEnoughFoo"> someFile.md:6 </failure>
//    </testcase>
//</testsuite>