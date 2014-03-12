function buildConfig(args) {
    config = {}

    if (args[2]===undefined) {
         throw new Error("An input file must be specified");
    }
    if (args[3] === undefined) {
        throw new Error("A comparison file must be specified")
    }
    if (args[4] === undefined) {
        throw new Error("An output file must be specified")
    }

    
    config.inputFile = args[2];
    config.comparisonFile = args[3];
    config.outputFile = args[4];
    return config;
}

module.exports = buildConfig;