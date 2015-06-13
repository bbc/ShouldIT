/*jslint node: true */
'use strict';

var events = require('./events');

/**
 * Run App.
 */
function run(config) {

    var specCollector = require('./specCollector'),
        fileCollector = require('./fileCollector'),
        resultCollector = require('./resultCollector'),
        inspector = require('./inspector'),
        spitterOuter = require('./spitterOuter'),
        summariser = require('./summariser'),
        XmlWriter = require('./junitXmlWriter'),
        fs = require('fs'),
        prepareNodeData = require('./visualiser/prepareNodeData');

    function compareOutputFiles(specFile, resultsFile) {

        /**
         * Use the collector to get the content of each file
         */
        fileCollector(specFile, resultsFile, function(files) {

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
                prepareNodeData(config, events);
            } catch (e) {
                if (config.watch) {
                    console.log("Still watching... carry on BDD'ing!");
                }
            }
        });
    }

    /**
     * Get the specs from the spec collector
     */
    specCollector(config.specs, config.tags, function(specs) {

        fs.writeFile(config.specsOut, JSON.stringify(specs, null, 4), function(err) {
            /**
             * Get the result results from the result collector
             */
            resultCollector(config.results, function(results) {

                fs.writeFile(config.resultsOut, JSON.stringify(results, null, 4), function(err) {
                    compareOutputFiles(config.specsOut, config.resultsOut);

                });

            });
        });
    });
}

module.exports = run;