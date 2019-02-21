# cypress-teamcity-reporter

[![NPM version](https://badge.fury.io/js/cypress-teamcity-reporter.svg)](http://badge.fury.io/js/cypress-teamcity-reporter)
[![Build Status](https://travis-ci.org/prma85/cypress-teamcity-reporter.svg?branch=master)](https://travis-ci.org/prma85/cypress-teamcity-reporter)
<a href="https://greenkeeper.io">
<img alt="Greenkeeper" src="https://badges.greenkeeper.io/semantic-release/semantic-release.svg">
</a>
[![Waffle.io - Columns and their card count](https://badge.waffle.io/prma85/cypress-teamcity-reporter.svg?columns=all)](http://waffle.io/prma85/cypress-teamcity-reporter)

cypress-teamcity-reporter is a Teamcity reporter which makes it possible to display test results in real-time, makes test information
available on the Tests tab of the Build Results page. It is based on the package `@cypress/mocha-teamcity-reporter` and was improved with new informations and support to the newer versions of mocha.

## Version 2.x changes

-   Breaking change, support node4.x+ only
-   Support flowId's
    -   Why use flowIds? Flow tracking is necessary, for example, to distinguish separate processes running in parallel
    -   This defaults to process.pid, so it works with concurrent task runners (Gulp/Grunt etc)
-   other small bug fixes
-   Functional tests

## Requirements

-   NodeJs 4+
-   Web Browser supporting ES5

## To Install

In your project run a npm install command:

`npm install cypress-teamcity-reporter --save-dev`

Basically, have your project's package.json be like:

```js
{
  "devDependencies": {
    "cypress-teamcity-reporter": ">=2.0.0"
  }
}
```

## Usage

https://github.com/visionmedia/mocha/wiki/Third-party-reporters describes using third party reporters in mocha.

Then call mocha with:

`mocha --reporter cypress-teamcity-reporter test`

To use it in the TeamCity, you can call:

`cypress run --reporter cypress-teamcity-reporter`

## Running In Browser

-   Use `lib/teamcityBrowser`
-   Has option parsing stripped out for the moment
-   Example use can be found in `test\browser`
-   Custom log function can be set with window.customLogFunction

## Customisation:

### TeamCity flowId

Can set flowId like:
`mocha test --reporter mocha-teamcity-reporter --reporter-options flowId=gobbledygook`

### Top-level suite name

Can set a top-level suite name, which will wrap all other suites.  
This is useful for reading test output when running multiple suites in a single build

-   Environment variable: `MOCHA_TEAMCITY_TOP_LEVEL_SUITE=<suiteName>`
-   Reporter option: `topLevelSuite=<suiteName>`

### log test failures with std error

To enable this please
Please note this will probaly be made default in the next major version

-   Environment variable: `USE_STD_ERROR=true`
-   Reporter option: `useStdError=true`

### Record hook failures

Record failures for hooks such as before/after etc
Please note this will probably be made default in the next major version

-   Environment variable: `RECORD_HOOK_FAILURES=true`
-   Reporter option: `recordHookFailures=true`

### Setting options

-   Set with reporter-options:

`mocha test --reporter mocha-teamcity-reporter --reporter-options topLevelSuite=top-level-suite-name`

`mocha test --reporter mocha-teamcity-reporter --reporter-options useStdError=true`

`mocha test --reporter mocha-teamcity-reporter --reporter-options useStdError=true`

-   Set with environment variable

`MOCHA_TEAMCITY_TOP_LEVEL_SUITE='top-level-suite-name' mocha test --reporter mocha-teamcity-reporter`
