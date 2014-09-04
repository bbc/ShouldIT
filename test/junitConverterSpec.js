var Converter = require("../lib/formats/junitConverter"),
    assert = require('assert');


describe ("JUnit Converter", function () {

    it ("should be able to normalise the testsuite name", function() {
        converter = new Converter("");
        assert.equal(converter.getSuiteName("company.dept.product.api.CoverageApiTest"), "Coverage Api");
        assert.equal(converter.getSuiteName("Company_Dept_Builder_ComponentPresenter_ComponentItemTest"), "Component Item");
        assert.equal(converter.getSuiteName("PhpUnitExampleTest"), "Php Unit Example");
        
        assert.equal(converter.getSuiteName("MyAPI"), "My API");
    });

    it ("should be able to normalise the testcase name", function() {
        converter = new Converter("");
        assert.equal(converter.getTestName("testInstantiation"), "instantiation");
        assert.equal(converter.getTestName("getReturnsWith400StatusIfIdParameterIsUndefined"), "get returns with 400 status if id parameter is undefined");
        assert.equal(converter.getTestName("shouldBeAbleToAddAnItemToACart"), "should be able to add an item to a cart");
    });

    it("should be able parse a javaservices JUnit file", function(){
        var file = "test/fixtures/junit/javaservice.xml";
        converter = new Converter(file);
        converter.exec(function (results) {
            assert.equal(JSON.stringify(results), JSON.stringify({ 'Coverage Api':
                {
                    'get returns with 200 status on successful request': 'PASSED',
                    'get returns with 500 status if repository failure exception': 'PASSED',
                    'live request in moments repository contains the correct request uri': 'PASSED',
                    'get returns with 503 status if resource not available exception': 'PASSED',
                    'get returns with 400 status if id parameter is undefined': 'PASSED',
                    'get returns transformed response from moment repository': 'PASSED',
                    'get from content api returns 404': 'PASSED',
                    'get returns with 400 status if id parameter is empty': 'PASSED'
                }
            }));
        });
    });

    it("should be able parse a nexted JUnit file that has failures", function(){
        var file = "test/fixtures/junit/phpunit.xml";
        converter = new Converter(file);
        converter.exec(function (results) {
            assert.equal(JSON.stringify(results), JSON.stringify({ "Component Def": 
                {
                    "instantiation":"PASSED",
                    "new collection instance of ltc collection":"FAILED"
                }
            }));
        });
    });

});