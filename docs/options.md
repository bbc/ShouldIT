---
layout: default
title:  "ShouldIT - Options"

---

# Options

The following options can be either added as arguments. To see a list of the supported arguments type:

```bash
    shouldit --h
```
## List of options

### config

> default: shouldit.conf.json

The location of your config file. 

### watch

> default: false

Starts ShoultIT? in watch mode. This means it will watch the file system for changes in either the spec files or test result files. As soon as any of these files are updated ShouldIT? will run again.

### specs

> required

Tells ShouldIT? where to look for feature files. E.g `specs/*.md` When adding this through the command instead of the config file this might need to be in quotation marks.

```bash
    shouldit --specs="specs/*.md"
```

### results

> required

This is where the test result files are to be found. The files can be in a mixture of json files that might look something like the following:

```
{
    "Discussion": {
        "should be interesting": "FAILED"
    },
    "My Feature My context": {
        "should have another passing test": "PASSED"
    }
}

```

Or JUnit XML files.

### hint

> Values: `javascript`, `rspec`, `php`, `java`, `phpspec`

At the moment when setting the value of hint to one of the above available hint languages ShouldIT? will prompt you the next test you should write. This will make writing your test somewhat easier.
