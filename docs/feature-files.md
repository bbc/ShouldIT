---
layout: default
title:  "ShouldIT - Writing Feature Files"

---

# Writing Feature Files

## Contexts

Feature files can be written freely as you want in mark down. ShouldIT? will follow the context from your titles so you could write your titles as:

```
# My Feature

## My context
```

This could also be written as:

```
# My Feature My context
```

In Javascript where tests can have mutiple contexts would map to tests that would look like either or the following:

```
describe("My Feature", function() {
    describe("My context", function() {
        ...
    });
});
```
or
```
describe("My Feature My Context", function() {
    ...
});
```

In a language where tests with multiple contexts are not supported it might look something like this:

```
public class MyFeatureMyContext {

}
```

## Tests

Tests are depicted by using `+ IT` at the start of the sentence. Example:

```
+ IT Should have a feature that works
```

If you want to skip a test for any reason just add a `-`

```
+ IT Should have a feature that works
- IT Might have a feature that is exempt from tests
```

Your JavaScript test might then look something like:

```
describe("My Feature My Context", function() {
    it("Should have a feature that works", function() {
        ...
    });
});
```

## Tags

Tags can be added by adding a comment with the tag name like as follows

```
> @mytagname
```

Then any context below that tag will then be run when triggered with that tag:

```
    shouldit --tags=mytagname
``` 
