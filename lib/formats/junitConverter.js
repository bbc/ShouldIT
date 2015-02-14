/*jshint node: true */
'use strict';

var fs = require('fs'),
    xml2js = require('xml2js');

function junitConverter(file) {
    /*jshint validthis: true */
    this.parser = new xml2js.Parser();
    this.file = file;    
}

junitConverter.prototype = {

    parseTestSuite: function (testSuite) {
        var testName,
            suiteName,
            object = {};

        if (testSuite.testsuite) {
            if (testSuite.testsuite.constructor === Array) {
                return this.parseTestSuites(testSuite);
            }
            return this.parseTestSuite(testSuite.testsuite);
        }

        suiteName = this.getSuiteName(testSuite.$.name);

        object[suiteName] = {};
        if (!testSuite.testcase) {
            return object;
        }
        for (var i = 0; i < testSuite.testcase.length; i++) {
            testName = this.getTestName(testSuite.testcase[i].$.name);
            object[suiteName][testName] = 'PASSED';
            if (testSuite.testcase[i].failure) {
                object[suiteName][testName] = 'FAILED';
            }
        }
        return object;
    },

    parseTestSuites: function (testSuites) {
        var results = {}, 
            testSuiteResult;

        for (var i = 0; i < testSuites.testsuite.length; i++) {
            testSuiteResult = this.parseTestSuite(testSuites.testsuite[i]);
            for(var key in testSuiteResult) {
                if (!results[key]) {
                    results[key] = {};
                }
                for(var test in testSuiteResult[key]) {
                    results[key][test] = testSuiteResult[key][test];
                }
            }
        }
        return results;
    },

    getSuiteName: function (inputName) {
        var separator,
            name,
            nameArray;

        if (inputName.indexOf(".") !== -1) {
            separator = ".";
        }
        if (inputName.indexOf("_") !== -1) {
            separator = "_";
        }
        if (inputName.indexOf("\\") !== -1) {
            separator = "\\";
        }
        nameArray = inputName.split(separator);
        // Remove last name if it is 'Test'
        name = nameArray.splice((nameArray.length - 1), 1);
        name = name[0].replace(/([a-z](?=[A-Z]))/g, '$1 ').trim();
        if (name.substring(name.length - 5) == ' Test') {
            name = name.substring(0, name.length - 5);
        }
        if (name.substring(name.length - 5) == ' Spec') {
            name = name.substring(0, name.length - 5);
        }
        return name;
    },

    getTestName: function (name) {

        if (name.match(/\s/g)) {
            return name;
        }

        name = name.replace(/[_]/g, ' ');
        name = name.replace(/([A-Z])([A-Z0-9])/g, '$1 $2');
        name = name.replace(/([a-z](?=[A-Z0-9]))|([0-9](?=[A-Z]))/g, '$1$2 ').trim().toLowerCase();
        
        if (name.substring(0, 5) == 'test ') {
            name = name.substring(5);
        }

        if (name.substring(0, 3) == 'it ') {
            name = name.substring(3);
        }
        return name;
    },

    exec: function (callback) {
        var data = fs.readFileSync(this.file),
            result;

        this.parser.parseString(data, function (err, result) {
            if (result.testsuite) {
                result = this.parseTestSuite(result.testsuite);
            }
            if (result.testsuites) {
                result = this.parseTestSuites(result.testsuites);
            }
            callback(result);
        }.bind(this));
    }
};

module.exports = junitConverter;