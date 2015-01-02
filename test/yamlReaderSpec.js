var buildConfig = require("../lib/configBuilder"),
    assert = require('assert'),
    yaml = require("../lib/createMap");


describe ("Yaml Reader", function () {

    it("Should be able to get mappings from a Yaml file", function() {

        yaml("test/fixtures/maps/map.yml");

    });


});
