---
layout: default
title:  "ShouldIT - Installation"

---

# Installation

Run the following command to install ShouldIT? globally:

```bash
    sudo npm install -g shouldit
```

## Configuration file

A default configuration file will be automatically found when named `shouldit.conf.json` and saved in your current working directory.

In its simplist form it would look something like the following:

```
{
    "specs": "specs/*.md",
    "results": "karma-specs.json,phpunit-test-results.xml,rspec.xml"
}
```

This tells ShouldIT? to look for spec feature files in `specs/*.md` and look for output test results in `karma-specs.json,phpunit-test-results.xml,rspec.xml`

# Running ShouldIt

To run in normal mode once you have saved your configuration file enter:

```bash
    shouldit
```