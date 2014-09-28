var assert = require('assert'),
    mockery = require('mockery'),
    sinon = require('sinon');

describe("Template Renderer", function() {
    var templateRenderer = require('../lib/templateRenderer');

    it("should be able to render a JS template", function() {
        var result = templateRenderer("javascript", "The Main Feature", "should do something nice"),
            expected = 'describe("The Main Feature", function() {\n\n' +
                '    it("should do something nice", function() {\n' +
                '        ...\n' +
                '    });\n\n' +
                '});';

        assert.equal(result, expected);
    });

    it("should be able to render a java template", function() {
        var result = templateRenderer("java", "The Main Feature", "should do something nice"),
            expected = 'public class TheMainFeatureTest {\n\n' +
                '    @Test\n' +
                '    public void shouldDoSomethingNice() {\n' +
                '        ...\n' +
                '    }\n\n' +
                '}';

        assert.equal(result, expected);
    });

    it("should be able to render a php template", function() {
        var result = templateRenderer("php", "The Main Feature", "should do something nice"),
            expected = '<?php\n\n' +
                'class TheMainFeatureTest extends PHPUnit_Framework_TestCase\n' +
                '{\n' +
                '    public function testShouldDoSomethingNice()\n' +
                '    {\n' +
                '        ...\n' +
                '    }\n' +
                '}';

        assert.equal(result, expected);
    });

    it("should be able to render a phpspec template", function() {
        var result = templateRenderer("phpspec", "The Main Feature", "should do something nice"),
            expected = '<?php\n\n' +
                'use PhpSpec\\ObjectBehavior;\n' +
                'use Prophecy\\Argument;\n\n' +
                'class TheMainFeatureSpec extends ObjectBehavior\n' +
                '{\n' +
                '    function it_should_do_something_nice()\n' +
                '    {\n' +
                '        ...\n' +
                '    }\n' +
                '}';

        assert.equal(result, expected);
    });
});