[![Build Status](https://secure.travis-ci.org/bbc-sport/ShouldIT.png?branch=master)](http://travis-ci.org/bbc-sport/ShouldIT)

# ShouldIT?

This is a BDD tool for checking and specking tests against beautiful looking feature files written in MarkDown.

### How it works...

Rather than this tool driving your tests it is a test output parser which means you can test natively in various programming languages freely. This tool will watch for the test output files or feature file to be saved at which point shows you what specs have and haven't been implemented. 

## The Feature File

You can write feature files in markdown. You can add any information you want in any way to describe your features. However adding the following style of syntax.

```
# My Feature

This can contain explanations and other details about your feature

## My Context

+ IT should have a test that passes
- IT may not have a test that is skipped

## My Other Context

+ IT should also have other tests passing in other contexts
    - You can add other ignored meta-data
```
## Using Javascript Tests

This tool particularly likes Javascript testing frameworks (Jasmine or Mocha). 

The above specks you can write in a JS test as follows:


```javascript
describe("My Feature", function () {
    describe("My Context", function () {
        it("should have a test that passes", function () {
            ...
        });
    });
    describe("My Other Context", function () {
        it("should also have other tests passing in other contexts", function () {
            ...
        });
    });
});
```

### Test output files

#### Jasmine/Karma

You can get the test output in a format that `spec-detective` understands by using a custom Karma reporter called `karma-spec-json-reporter`. This is an NPM package that can be [found here](https://www.npmjs.org/package/karma-spec-json-reporter). 

Please follow the instructions there to install it.

#### Mocha

Similarly to Karma there is a `mocha-spec-json-reporter`. This is also an NPM package that can be [found here](https://www.npmjs.org/package/mocha-spec-json-reporter).

### Using JUnit output

Take the following test written in Java
```java
package com.example.foo;

import org.junit.Test;
import org.junit.Ignore;
import org.junit.runner.RunWith;
import org.junit.runners.JUnit4;
import org.junit.Assert.assertTrue;

/**
 * Tests for {@link Foo}.
 */
public class ContextSubcontextTest {

    @Test
    public void shouldAlwaysPass() {
        assertTrue("failure - should be true", true);
    }

}
```
This will then output JUnitXML similar to the below:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<testsuite name="com.example.foo.ContextSubcontextTest" time="0.005" tests="1" errors="0" skipped="0" failures="0">
  <properties>
    <property name="java.runtime.name" value="Java(TM) SE Runtime Environment"/>
  </properties>
  <testcase name="shouldAlwaysPass" classname="com.example.foo.ContextSubcontextTest" time="0"/>
</testsuite>
```
This we can then line up to a feature file that looks like the following.

```
# Context

## Subscontext

+ IT should always pass
```
So you can also use anything that also outputs similar JUnitXML including PHPUnit and the likes.

## Running ShouldIT
 
When you have output files available you can do a comparison run using the following command
```
./node_modules/shouldit/bin/shouldit --specs="path-to-features/*.md" --results="path-to-json/*.json,path-to-junit/*.xml"
```

You will then see some pretty output and a `junit-output.xml` file that will give you a coverage summary.

# Example app

If it is easier to a working example please have a look at [this sample app](git@github.com:bbc-sport/ShouldIT.git)
