/*jslint node: true */
'use strict';

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
        prepareNodeData = require('./visualiser/prepareNodeData'),
        allSpecs;

    function outputFileComparison(specs, results) {

        /**
         * Use the collector to get the content of each file
         */
        var files = [specs, results];

        try {
            results = inspector(files, config);
            var writer = new XmlWriter(config);
            writer.writeResults(results);
            var output = spitterOuter(results, config);
            output.forEach(function(line) {
                console.log(line);
            });
            if (config.outputSummary) {
                var summary = summariser(results);
                summary.forEach(function(summaryItem) {
                    console.log(summaryItem);
                });
            }
            prepareNodeData(config, files);
        } catch (e) {
            if (config.watch) {
                console.log("Still watching... carry on BDD'ing!");
            }
        }
    }

    function collectResults(specs) {
        allSpecs = specs;
        return resultCollector(config.results);
    }

    function compareOutputFiles(results) {
        outputFileComparison(allSpecs, results);
    }

    /**
     * Get the specs from the spec collector
     */
    specCollector(config.specs, config.tags)
        .then(collectResults)
        .then(compareOutputFiles);
}

module.exports = run;