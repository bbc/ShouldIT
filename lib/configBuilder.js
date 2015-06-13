/*jslint node: true */
'use strict';

var colors = require('colors'),
    program = require('commander'),
    fs = require('fs');

function buildConfig(args) {

    program
      .version(getVersion())
      .usage('[options]')
      .description('A fantastic way to drive BDD')
      .option('-c, --config <path>', 'Set a config file location  (default "shouldit.conf.json")', 'shouldit.conf.json')
      .option('--specs <paths>', 'Feature file(s) to read (eg "*/**/*.feature.md")')
      .option('--results <paths>', 'Comma-deliminated list of test output (eg "tests/*.xml,tests/*.json")')
      .option('-t, --tags <tags>', 'Comma-delinated list of tagged features to read', [])
      .option('-h, --hint <mode>', 'Hints how the next test implementation might look (options "php/javascript/java/rspec/junit")')
      .option('-w, --watch', 'Start in watch mode')
      .option('-s, --serve', 'Project visualisation view your progress through your web browser')
      .option('-p, --port <n>', 'The desired port for visualisation (default 3000)', parseInt, 3000)
      .option('--junit-out <file>', 'File name for junit output (default: junit-output.xml)', 'junit-output.xml')
      .option('--output-summary', 'Enable output summary')
      .option('--output-details <states>', 'Comma-delinated list of test states to display', 'failed,passed,pending')
      .parse(args);

    var response = enrich(overrideConfig(program));
    validate(response);

    return response;
}

function getVersion() {
    var pjson = require('./../package.json');
    return pjson.version;
}

/**
 * Config options override.
 */
function overrideConfig(config) {
    if (fs.existsSync(config.config)) {
        var content = fs.readFileSync(config.config, {
            encoding: "utf8"
        });
        var configFile = JSON.parse(content);
        for (var key in configFile) {
            if (configFile.hasOwnProperty(key)) {
                config[key] = configFile[key];
            }
        }
    }
    return config;
}

/**
 * Enrichment.
 */
function enrich(config) {
    if (config.tags && config.tags.indexOf(',') !== -1) {
        config.tags = config.tags.split(',');
    }

    if (config.results && config.results.indexOf(',') !== -1) {
        config.results = config.results.split(',');
    }
    if (config.results && typeof config.results === 'string') {
        config.results = [config.results];
    }
    if (config.outputDetails && typeof config.outputDetails != 'object') {
        config.outputDetails = config.outputDetails.split(',');
    }
    config.outputSumary = !!config.outputSummary;

    return config;
}

/**
 * Validation
 */
function validate(config) {
    if (!config.specs) {
        error("A specs glob such as path/*.feature must be specified.");
    }

    if (!config.results) {
        error("A results file must be specified.");
    }
}

/**
 * Print error and exit.
 */
function error(message) {
    console.log(message.red);
    process.exit();
}

module.exports = buildConfig;