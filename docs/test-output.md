---
layout: default
title:  "ShouldIT - Options"

---

# Test Output

There currently 2 formats of test output that 'ShoultIT?' can read to match with your feature files. `JUnit XML` and a JSON pritriority format that looks something like the following.

```
{
    "Discussion": {
        "should be interesting": "FAILED"
    },
    "My Feature My context": {
        "should have another passing test": "FAILED"
    }
}
```

This format is most convenient when using JavaScript for your testing.

# Languages

## Ruby

'ShouldIT?' works awesomely with RSpec. In order to get a JUnit XML format that ShouldIT? understands you need to install a custom formatter. Add the following to your Gemfile.

```
gem 'rspec_junit_formatter', :git => 'https://github.com/mackstar/rspec_junit_formatter.git'
```

Then when you run your RSpec tests, do so with:

```
bundle install
bundle exec rspec --format RspecJunitFormatter  --out rspec.xml
```

## JavaScript

'ShouldIT?' has full support for `Jasmine` and `Mocha` test frameworks. Both of of these can output `JSON` data that 'ShouldIT?' understands. 

### Jasmine

In order to use Jasmine, please install the [Karma Spec JSON Reporter](https://www.npmjs.org/package/karma-spec-json-reporter) and have Karma drive your tests for you.

Please see installation instructions on the link above.

### Mocha

Similarly for mocha you can install the [Mocha Spec JSON Reporter](https://www.npmjs.org/package/mocha-spec-json-reporter).

To install this run:

```
sudo npm -g install mocha-spec-json-reporter
```

Running your tests can then produce 'ShouldIT?' friendly output:

```
mocha -R mocha-spec-json-reporter
```

## PHP

### PHPUnit

'ShouldIT?' Supports PHPUnit straight out of the box.

## Java

The best way to use 'ShouldIT?' with Java is to install the [ShouldIT? Java tools](https://github.com/mackstar/ShouldIT-JavaTools)

It plays along with JUnit to allow you to tag your tests with `@ShouldItContext` and `@It` annotations.

First add the following repo to your `pom.xml` file.

```
<repositories>
    <repository>
        <id>shouldit-mvn-repo</id>
        <url>https://raw.github.com/mackstar/ShouldIT-JavaTools/mvn-repo/</url>
        <snapshots>
            <enabled>true</enabled>
            <updatePolicy>always</updatePolicy>
        </snapshots>
    </repository>
</repositories>
```

Then the tools are available through dependency:

```
<dependency>
    <groupId>mackstar</groupId>
    <artifactId>shouldit</artifactId>
    <version>0.0.1</version>
</dependency>
```

What this gives you are rules and annotations that when your unit tests are run then a result file that ShouldIT? understands is generated. (By default this will be `shouldit-report.json` in the directory your tests are run from.)

So if there was a feature file with the following contents:

```
# A new Feature
## My Scenario

+ IT should have a passing test
```

This should correspond to a a test that looks something like the following:

```
import mackstar.shouldit.annotations.*;
import mackstar.shouldit.rules.ShouldIt;
import org.junit.Rule;
import org.junit.Test;

@ShouldItContext("A new Feature My Scenario")
public class YeahTest {


   @Rule
   public ShouldIt shouldItRule = new ShouldIt();

    @Test
    @It("should have a passing test")
    public void testName() throws Exception {
        assert(true);
    }
}
```

Notice the line:
```
public ShouldIt shouldItRule = new ShouldIt();
```

This is what allows us to generate the output file that should be added to the [options file](installation.html) when you run `ShouldIT`. Without it no file will be generated.

If you would like to override the output files location you can do by using the rule's `setOutputFile` method.

## Others

Very keen to get ShouldIT? working with a number of other technologies, particulary `go`, `Scala`, `Clojure`, `Groovy` and `Elixir`. Please get in touch if you are interested.
