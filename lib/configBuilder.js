function buildConfig(args) {
    config = {}

    if (args[2]===undefined) {
         throw new Error("An input file must be specified");
    }
    if (args[3] === undefined) {
        throw new Error("An output file must be specified")
    }
    config.inputFile = args[2];
    config.outputFile = args[3];
    return config;
}

module.exports = buildConfig;