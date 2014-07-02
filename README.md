# Spec Detective

This is a BDD tool for checking and specking tests against beautiful looking feature files written in MarkDown.

## The Feature File

You can write feature files in markdown. You can add any information you want in any way to describe your features. However adding the following style of syntax.


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
