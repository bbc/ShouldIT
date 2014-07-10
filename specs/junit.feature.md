# JUnit

## Converter
+ IT should be able to normalise the testsuite name
+ IT should be able to normalise the testcase name
+ IT should be able parse a javaservices JUnit file
+ IT should be able parse a nexted JUnit file that has failures

## XML writer

+ IT creates a passing testcase for a spec
+ IT handles multiple passing specs
+ IT adds a skipped node for pending specs
+ IT adds a failure node for failing specs
+ IT handles a spec that isnt nested in a describe

### Spec Counting

+ IT specifies the correct number of tests in a suite
+ IT counts the number of specs including failing and pending
