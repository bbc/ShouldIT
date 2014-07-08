/*jslint node: true */
"use strict";

/**
 * "templateRenderer"
 *
 * Renders test suite specific templates for hint mode.
 */
function templateRenderer(language, describe, spec) {

    var template,
        fs = require('fs');

    /**
     * Return when no language specified.
     */
    if (!language) {
        return;
    }

    /**
     * Converts to CamelCase.
     *
     * 'This is my test' -> ThisIsMyTest
     */
    function toCamelCase(str)
    {
        return str.replace(/\w\S*/g, function(txt){
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }).replace(/\s/g, '');
    }

    /**
     * Converts first char to lower case.
     */
    function firstToLowerCase( str ) {
        return str.substr(0, 1).toLowerCase() + str.substr(1);
    }

    /**
     * Converts describes and specks to language specific derivative.
     */
    switch (language) {
        case 'java':
            describe = toCamelCase(describe) + 'Test';
            spec = firstToLowerCase(toCamelCase(spec));
            break;
        case 'php':
            describe = toCamelCase(describe) + 'Test';
            spec = 'test' + toCamelCase(spec);
            break;
    }

    /**
     * Get template replace DESCRIBE/SPEC.
     */
    template = String(fs.readFileSync(__dirname + "/templates/" + language + ".tpl"));
    return template.replace("{{DESCRIBE}}", describe).replace("{{SPEC}}", spec);

}

module.exports = templateRenderer;