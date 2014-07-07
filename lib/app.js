/*jslint node: true */
'use strict';

exports.run = function(argv) {

    var configBuilder = require('../lib/configBuilder'),
        featureTransformer = require('../lib/featureTransformer'),
        specCollector = require('../lib/specCollector'),
        fileCollector = require('../lib/fileCollector'),
        resultCollector = require('../lib/resultCollector'),
        inspector = require('../lib/inspector'),
        spitterOuter = require('../lib/spitterOuter'),
        XmlWriter = require('../lib/junitXmlWriter'),
        jf = require('jsonfile'),
        fs = require('fs'),
        config = configBuilder(argv);

    function compareOutputFiles(specFile, resultsFile) {

        /**
         * Use the collector to get the content of each file
         */
        fileCollector(specFile, resultsFile, function(files){
            var results = inspector(files);
            var writer = new XmlWriter();
            writer.writeResults(results);
            var output = spitterOuter(results);
            for (var i = 0; i < output.length; i++) {
                console.log(output[i]);
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

};