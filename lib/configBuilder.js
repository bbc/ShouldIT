function buildConfig(args) {
    config = {}

    if (args[2]===undefined) {
         throw new Error("A specs glob such as path/*.feature must be specified");
    }
    if (args[3] === undefined) {
        throw new Error("A comparison file must be specified");
    }

    
    config.glob = args[2];
    config.comparisonFile = args[3];
    config.specFile = (args[4] === undefined)? 'spec-file.json' : args[4];
    return config;
}

module.exports = buildConfig;

// "./bin/spec-detective directory/*.feature path/jasmine-output.json"
// set config
// parse features
// create json
// compare
// output
