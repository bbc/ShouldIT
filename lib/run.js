/*jslint node: true */
'use strict';

var events = require('./events');

/**
 * Run App.
 */
function run(config) {

    var specCollector = require('./specCollector'),
        resultCollector = require('./resultCollector'),
        inspector = require('./inspector'),
        spitterOuter = require('./spitterOuter'),
        summariser = require('./summariser'),
        XmlWriter = require('./junitXmlWriter'),
        fs = require('fs'),
        prepareNodeData = require('./visualiser/prepareNodeData');

    function compareOutputFiles(specs, results) {

        /**
         * Use the collector to get the content of each file
         */
        var files = [specs, results];

        try {
            var results = inspector(files, config);
            var writer = new XmlWriter(config);
            writer.writeResults(results);
            var output = spitterOuter(results, config);
            for (var i = 0; i < output.length; i++) {
                console.log(output[i]);
            }
            if (config.outputSummary) {
                var summary = summariser(results);
                for (var j = 0; j < summary.length; j++) {
                    console.log(summary[j]);
                }
            }
            prepareNodeData(config, files, events);
        } catch (e) {
            if (config.watch) {
                console.log("Still watching... carry on BDD'ing!");
            }
        }
    }

    /**
     * Get the specs from the spec collector
     */
    specCollector(config.specs, config.tags, function(specs) {

        /**
         * Get the result results from the result collector
         */
        resultCollector(config.results, function(results) {

            compareOutputFiles(specs, results);

        });
    });
}

module.exports = run;