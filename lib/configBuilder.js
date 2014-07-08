/*jslint node: true */
'use strict';

var colors = require('colors');

/**
 * "buildConfig"
 *
 * Collects input options from console or a config file.
 */
function buildConfig(args) {
    var fs = require('fs'),
        argv = require('minimist')(args.slice(2)),
        config,
        content,
        configFile,
        key;

    /**
     * Below are some of the example inputs.
     *
     * --config=file.conf
     * --specs=.feature.md
     * --results=output.json,test.xml
     * --watch
     * --junit-out=junit-output.json
     * --specs-out=spec-file.json,
     * --results-out=results-file.json
     */

    /**
     * Default config.
     */
    config = {
        config: (argv.config !== undefined)? argv.config : 'spec-detective.conf.json',
        watch: false,
        specs: false,
        results: false,
        tags: [],
        'junit-out': 'junit-output.xml',
        'specs-out': 'spec-file.json',
        'results-out': 'results-file.json'
    };

    /**
     * Overrides from config file.
     */
    if (fs.existsSync(config.config)) {
        content = fs.readFileSync(config.config, {encoding:"utf8"});
        configFile = JSON.parse(content);
        for (key in configFile) {
            if (configFile.hasOwnProperty(key)) {
                config[key] = configFile[key];
            }
        }
    }

    /**
     * Overrides from input.
     */
    for (key in argv) {
        if (argv.hasOwnProperty(key)) {
            config[key] = argv[key];
        }
    }

    /**
     * Help.
     */
    if (argv.h || argv.help || args.length === 2) {
          console.log(
            '\nSpec Detective: A BDD tool minus the pain\n\n'.green +
            'Usage:\n' +
            '  spec-detective <arguments>\n\n' +
            'Arguments:\n' +
            '  --start=<configFile> Set a config file location.\n' +
            '  --watch Start in watch mode.\n' +
            '  --specs="<glob>" Feature files to read (eg "*/**/*.feature.md").\n' +
            '  --results="<glob>" Comma-deliminated list of test output (eg "tests/*.xml,tests/*.json").\n' +
            '  --tags=<tags> Comma-delinated list of tagged features to read.\n' +
            '  --junit-out=<file> File name for junit output (default: junit-output.xml).\n' +
            '  --specs-out=<file> File name for spec json output (default: spec-file.json).\n' +
            '  --results-out=<file> File name for results json output (default: results-file.json).\n'

        );
        process.exit();
    }

    /**
     * Enrichment.
     */
    if (config.tags && config.tags.indexOf(',') !== -1) {
        config.tags = config.tags.split(',');
    }

    if (config.results && config.results.indexOf(',') !== -1) {
        config.results = config.results.split(',');
    }
    if (config.results && typeof config.results === 'string') {
        config.results = [config.results];
    }

    /**
     * We ALWAYS need spec files and tests results.
     */
    if (!config.specs) {
        print("A specs glob such as path/*.feature must be specified.", "red");
    }

    if (!config.results) {
        print("A results file must be specified.", "red");
    }


    /**
     * Abstract print for tests.
     */
    function print (message, color) {
        if (args[1].indexOf('spec-detective') !== -1 || args[1].indexOf('shouldit') !== -1) {
            if (color === undefined) {
                console.log(message);
                return;
            }
            console.log(message[color]);
        } else {
            config.message = message;
        }
    }

    return config;
}

module.exports = buildConfig;