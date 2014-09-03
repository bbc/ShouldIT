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

## Others
