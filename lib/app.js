/*jslint node: true */
'use strict';

/**
 * Trigger App.
 */
function shouldItRun(config) {

    var specCollector = require('./specCollector'),
        fileCollector = require('./fileCollector'),
        resultCollector = require('./resultCollector'),
        inspector = require('./inspector'),
        spitterOuter = require('./spitterOuter'),
        summariser = require('./summariser'),
        XmlWriter = require('./junitXmlWriter'),
        www = require('./visualiser/www'),
        fs = require('fs');

    function compareOutputFiles(specFile, resultsFile) {

        /**
         * Use the collector to get the content of each file
         */
        fileCollector(specFile, resultsFile, function(files){

            try{
                var results = inspector(files, config);
                var writer = new XmlWriter(config);
                writer.writeResults(results);
                var output = spitterOuter(results,config);
                for (var i = 0; i < output.length; i++) {
                    console.log(output[i]);
                }
                if( config.outputSummary ) {
                    var summary = summariser(results);
                    for(var j = 0; j < summary.length; j++) {
                        console.log(summary[j]);
                    }
                }

                /**
                 * A recursive function to find nested results
                 */
                if (config.serve) {
                    www.run(config);
                }
            } catch(e) {
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

        fs.writeFile(config['specs-out'], JSON.stringify(specs, null, 4), function (err) {
            /**
             * Get the result results from the result collector
             */
            resultCollector(config.results, function(results) {

                fs.writeFile(config['results-out'], JSON.stringify(results, null, 4), function (err) {
                    compareOutputFiles(config['specs-out'], config['results-out']);

                });

            });
        });
    });
}

/**
 * Run!
 *
 * Listen to changes when watch option set, if not run once.
 */
exports.run = function(argv) {
    var configBuilder = require('../lib/configBuilder'),
        gaze = require('gaze'),
        config = configBuilder(argv),
        files = config.results.concat([config.specs]);


    shouldItRun(config);
    if (config.watch) {
        gaze(files, function() {
            this.watched(function(watched) {
                console.log("ShouldIt? - Watching for spec, result changes...");
            });
            this.on('changed', function(filepath) {
                console.log("----- File Changed -----");
                console.log(filepath);
                console.log("--- Running ShouldIt ---\n");
                shouldItRun(config);
            });
        });
        return;
    }
};